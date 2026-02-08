import Add01Icon from '@assets/icons/hugeicons/Add01Icon'
import { PaddingBottom } from '@components/SafePadding'
import Calendar01Icon from '@hugeicons/Calendar01Icon'
import Time04Icon from '@assets/icons/hugeicons/Time04Icon'
import Cancel01Icon from '@hugeicons/Cancel01Icon'
import { DateTimePickerEvent } from '@react-native-community/datetimepicker'
import Colors from '@utils/colors'
import { Medium, SemiBold } from '@utils/fonts'
import { useNavigation } from '@react-navigation/native'
import { HPStackNav } from '@utils/types'
import { useState, useEffect } from 'react'
import { Platform, ScrollView, TouchableOpacity, View, TextInput } from 'react-native'
import { TimeButton } from '@components/TimeSelector'

type TimeSlot = {
  id: string
  startTime: Date
  endTime: Date
  maxBookings: number
  showPicker?: 'start' | 'end'
}

type DaySchedule = {
  slots: TimeSlot[]
}

type WeekSchedule = {
  [key: string]: DaySchedule
}

type WeeklyProps = {
  onScheduleChange?: (schedule: WeekSchedule) => void
  recurrenceData?: any
  onSlotCreated?: () => void
}

const DAYS = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']

const CHAR_DAYS: { [key: string]: string } = {
  Monday: 'Mo',
  Tuesday: 'Tu',
  Wednesday: 'We',
  Thursday: 'Th',
  Friday: 'Fr',
  Saturday: 'Sa',
  Sunday: 'Su',
}

const ONE_HOUR = 60 * 60 * 1000

const formatDateWithOrdinal = (date: Date): string => {
  const day = date.getDate()
  const month = date.toLocaleDateString('en-US', { month: 'short' })
  const year = date.getFullYear()

  const suffix =
    day % 100 >= 11 && day % 100 <= 13
      ? 'th'
      : day % 10 === 1
        ? 'st'
        : day % 10 === 2
          ? 'nd'
          : day % 10 === 3
            ? 'rd'
            : 'th'
  return `${day}${suffix} ${month}, ${year}`
}

const createDefaultSlot = (recurrence?: any): TimeSlot => ({
  id: Date.now().toString() + Math.random(),
  startTime: recurrence?.startTime || new Date(),
  endTime: recurrence?.endTime || new Date(Date.now() + ONE_HOUR),
  maxBookings: recurrence?.maxBookings || 20,
})

export default function Weekly({ onScheduleChange, recurrenceData, onSlotCreated }: WeeklyProps) {
  const navigation = useNavigation<HPStackNav>()
  const [selectedDays, setSelectedDays] = useState<string[]>([])
  const [weekSchedule, setWeekSchedule] = useState<WeekSchedule>({})

  useEffect(() => {
    if (recurrenceData && selectedDays.length > 0) {
      const firstDay = selectedDays[0]
      if (firstDay) {
        setWeekSchedule((prevSchedule) => {
          const daySchedule = prevSchedule[firstDay]
          if (daySchedule) {
            const newSlot = createDefaultSlot(recurrenceData)
            const newSchedule = {
              ...prevSchedule,
              [firstDay]: {
                slots: [...daySchedule.slots, newSlot],
              },
            }
            onScheduleChange?.(newSchedule)
            return newSchedule
          }
          return prevSchedule
        })
        onSlotCreated?.()
      }
    }
  }, [recurrenceData, selectedDays, onSlotCreated, onScheduleChange])

  const updateSchedule = (newSchedule: WeekSchedule) => {
    setWeekSchedule(newSchedule)
    onScheduleChange?.(newSchedule)
  }

  const toggleDay = (day: string) => {
    if (selectedDays.includes(day)) {
      setSelectedDays(selectedDays.filter((d) => d !== day))
      const newSchedule = { ...weekSchedule }
      delete newSchedule[day]
      updateSchedule(newSchedule)
    } else {
      setSelectedDays([...selectedDays, day])
      updateSchedule({
        ...weekSchedule,
        [day]: {
          slots: [],
        },
      })
    }
  }

  const addTimeSlot = (day: string) => {
    navigation.navigate('RecurrenceSchedule')
  }

  const removeTimeSlot = (day: string, slotId: string) => {
    const daySchedule = weekSchedule[day]
    if (!daySchedule) return

    updateSchedule({
      ...weekSchedule,
      [day]: {
        slots: daySchedule.slots.filter((slot) => slot.id !== slotId),
      },
    })
  }

  const updateTime = (day: string, id: string, type: 'start' | 'end', event: DateTimePickerEvent, date?: Date) => {
    if (event.type !== 'set' || !date) return

    const daySchedule = weekSchedule[day]
    if (!daySchedule) return

    updateSchedule({
      ...weekSchedule,
      [day]: {
        slots: daySchedule.slots.map((slot) =>
          slot.id === id
            ? {
                ...slot,
                [type === 'start' ? 'startTime' : 'endTime']: date,
                ...(Platform.OS === 'android' && { showPicker: undefined }),
              }
            : slot,
        ),
      },
    })
  }

  const togglePicker = (day: string, id: string, type: 'start' | 'end') => {
    const daySchedule = weekSchedule[day]
    if (!daySchedule) return

    setWeekSchedule({
      ...weekSchedule,
      [day]: {
        slots: daySchedule.slots.map((slot) => ({
          ...slot,
          showPicker: slot.id === id && slot.showPicker !== type ? type : undefined,
        })),
      },
    })
  }

  return (
    <ScrollView className='flex-1' contentContainerClassName='px-5 gap-4'>
      <View className='rounded-2xl border border-neutral-400 bg-white p-4 dark:bg-neutral-800'>
        <View className='mb-4 flex-row items-center justify-between'>
          <View className='flex-row items-center'>
            <View className='mr-3 rounded-lg p-1 dark:border-blue-800/30 dark:bg-blue-900/20'>
              <Calendar01Icon size={28} color='#3b82f6' strokeWidth={2} />
            </View>
            <SemiBold className='text-base text-neutral-800 dark:text-neutral-200'>Weekly Schedule</SemiBold>
          </View>
          <Medium className='text-xs text-neutral-500'>{selectedDays.length} days selected</Medium>
        </View>

        <View className='flex-row justify-between'>
          {DAYS.map((day) => (
            <TouchableOpacity key={day} onPress={() => toggleDay(day)} activeOpacity={0.7} className='items-center'>
              <View
                className={`h-12 w-12 items-center justify-center rounded-lg ${
                  selectedDays.includes(day)
                    ? 'bg-blue-100 dark:bg-blue-900/30'
                    : 'border border-neutral-400 dark:border-neutral-700'
                }`}
              >
                <SemiBold
                  className={`text-base ${
                    selectedDays.includes(day)
                      ? 'text-blue-600 dark:text-blue-400'
                      : 'text-neutral-600 dark:text-neutral-400'
                  }`}
                >
                  {CHAR_DAYS[day]}
                </SemiBold>
              </View>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      {DAYS.filter((day) => selectedDays.includes(day)).map((day) => {
        const daySchedule = weekSchedule[day]
        if (!daySchedule) return null

        return (
          <View
            key={day}
            className='overflow-hidden rounded-2xl border border-neutral-400 bg-white dark:border-neutral-700 dark:bg-neutral-800'
          >
            <View className='p-4 dark:border-neutral-700'>
              <View className='flex-row items-center justify-between'>
                <View className='flex-row items-center gap-3'>
                  <View className='rounded-lg bg-blue-100/50 p-2.5 dark:bg-blue-900/20'>
                    <Calendar01Icon size={20} color='#3b82f6' strokeWidth={2} />
                  </View>
                  <View>
                    <SemiBold className='text-lg text-neutral-800 dark:text-neutral-200'>{day}</SemiBold>
                    <Medium className='text-xs text-neutral-500'>{daySchedule.slots.length} slots scheduled</Medium>
                  </View>
                </View>
                <TouchableOpacity
                  onPress={() => addTimeSlot(day)}
                  activeOpacity={0.7}
                  className='rounded-lg bg-blue-100/50 p-2 dark:bg-blue-900/20'
                >
                  <View className='flex-row items-center gap-1.5'>
                    <Add01Icon size={20} color='#3b82f6' />
                  </View>
                </TouchableOpacity>
              </View>
            </View>

            <View>
              {daySchedule.slots.map((slot, index) => (
                <View key={slot.id}>
                  {index > 0 && <View className='h-[1px] bg-neutral-300 dark:bg-neutral-700' />}
                  <View className={`flex-row`}>
                    <View className='flex-1 border-t border-neutral-400 p-4'>
                      <View className='mb-4 flex-row items-center justify-between'>
                        <View className='flex-row items-center gap-3'>
                          <View>
                            <Medium>
                              <View className='size-10 items-center justify-center rounded-lg bg-accent/10'>
                                <SemiBold className='text-center text-xl text-accent'>
                                  {(index + 1).toString().padStart(2, '0')}
                                </SemiBold>
                              </View>
                            </Medium>
                          </View>
                          <View>
                            <SemiBold className='text-base text-neutral-800 dark:text-neutral-200'>
                              Slot {index + 1}
                            </SemiBold>
                            <Medium className='text-xs text-neutral-500 dark:text-neutral-400'>
                              {slot.startTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })} -{' '}
                              {slot.endTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                            </Medium>
                          </View>
                        </View>
                        <TouchableOpacity
                          onPress={() => removeTimeSlot(day, slot.id)}
                          activeOpacity={0.7}
                          className='items-center rounded-lg bg-red-100/50 p-2 dark:border-red-800/30 dark:bg-red-900/20'
                        >
                          <Cancel01Icon size={20} color='#ef4444' />
                        </TouchableOpacity>
                      </View>
                      <View className='gap-3'>
                        <View className='flex-row gap-3'>
                          <TimeButton
                            slot={slot}
                            type='start'
                            onTogglePicker={(id, type) => togglePicker(day, id, type)}
                            onTimeChange={(id, type, event, date) => updateTime(day, id, type, event, date)}
                          />
                          <TimeButton
                            slot={slot}
                            type='end'
                            onTogglePicker={(id, type) => togglePicker(day, id, type)}
                            onTimeChange={(id, type, event, date) => updateTime(day, id, type, event, date)}
                          />
                        </View>
                      </View>
                    </View>
                  </View>
                </View>
              ))}
            </View>
          </View>
        )
      })}
      <PaddingBottom />
    </ScrollView>
  )
}
