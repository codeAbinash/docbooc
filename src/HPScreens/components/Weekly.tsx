import Add01Icon from '@assets/icons/hugeicons/Add01Icon'
import { PaddingBottom } from '@components/SafePadding'
import Calendar01Icon from '@hugeicons/Calendar01Icon'
import Time04Icon from '@assets/icons/hugeicons/Time04Icon'
import Cancel01Icon from '@hugeicons/Cancel01Icon'
import { DateTimePickerEvent } from '@react-native-community/datetimepicker'
import Colors from '@utils/colors'
import { Medium, SemiBold } from '@utils/fonts'
import { useState } from 'react'
import { Platform, ScrollView, TouchableOpacity, View } from 'react-native'
import { TimeButton } from './TimeSelector'

type TimeSlot = {
  id: string
  startTime: Date
  endTime: Date
  showPicker?: 'start' | 'end'
}

type DaySchedule = {
  slots: TimeSlot[]
}

type WeekSchedule = {
  [key: string]: DaySchedule
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

const createDefaultSlot = (): TimeSlot => ({
  id: Date.now().toString() + Math.random(),
  startTime: new Date(),
  endTime: new Date(Date.now() + ONE_HOUR),
})

export default function Weekly() {
  const [selectedDays, setSelectedDays] = useState<string[]>(['Monday'])
  const [weekSchedule, setWeekSchedule] = useState<WeekSchedule>({
    Monday: { slots: [createDefaultSlot()] },
    Wednesday: { slots: [createDefaultSlot()] },
    Friday: { slots: [createDefaultSlot()] },
  })

  const toggleDay = (day: string) => {
    if (selectedDays.includes(day)) {
      setSelectedDays(selectedDays.filter((d) => d !== day))
      const newSchedule = { ...weekSchedule }
      delete newSchedule[day]
      setWeekSchedule(newSchedule)
    } else {
      setSelectedDays([...selectedDays, day])
      setWeekSchedule({
        ...weekSchedule,
        [day]: {
          slots: [createDefaultSlot()],
        },
      })
    }
  }

  const addTimeSlot = (day: string) => {
    const daySchedule = weekSchedule[day]
    if (!daySchedule) return

    setWeekSchedule({
      ...weekSchedule,
      [day]: {
        slots: [...daySchedule.slots, createDefaultSlot()],
      },
    })
  }

  const removeTimeSlot = (day: string, slotId: string) => {
    const daySchedule = weekSchedule[day]
    if (!daySchedule || daySchedule.slots.length <= 1) return

    setWeekSchedule({
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

    setWeekSchedule({
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
    <ScrollView className='flex-1' contentContainerClassName='px-5 py-4 pt-2 gap-6'>
      <View className='rounded-2xl bg-white p-4 dark:bg-neutral-800'>
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
                className={`mb-1.5 h-10 w-10 items-center justify-center rounded-lg ${
                  selectedDays.includes(day)
                    ? 'bg-blue-100 dark:bg-blue-900/30'
                    : 'border-2 border-neutral-100 dark:border-neutral-700'
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
              {/* <Medium
                className={`text-xs ${
                  selectedDays.includes(day)
                    ? 'text-blue-600 dark:text-blue-400'
                    : 'text-neutral-500 dark:text-neutral-400'
                }`}
              >
                {SHORT_DAYS[day]}
              </Medium> */}
            </TouchableOpacity>
          ))}
        </View>
      </View>

      {DAYS.filter((day) => selectedDays.includes(day)).map((day) => {
        const daySchedule = weekSchedule[day]
        if (!daySchedule) return null

        return (
          <View key={day} className='overflow-hidden rounded-2xl bg-white dark:bg-neutral-800'>
            <View className='border-b border-neutral-100 p-4 dark:border-neutral-700'>
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
                  {index > 0 && <View className='h-[1px] bg-neutral-100 dark:bg-neutral-700' />}
                  <View className='p-4'>
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
                          <SemiBold className='text text-lg'>Slot {index + 1}</SemiBold>
                        </View>
                      </View>
                      <TouchableOpacity
                        onPress={() => daySchedule.slots.length > 1 && removeTimeSlot(day, slot.id)}
                        activeOpacity={0.7}
                        className={`items-center rounded-lg p-2 ${
                          daySchedule.slots.length > 1
                            ? 'bg-red-100/50 dark:border-red-800/30 dark:bg-red-900/20'
                            : 'bg-neutral-100/50 dark:bg-neutral-700/20'
                        }`}
                      >
                        <Cancel01Icon size={20} color={daySchedule.slots.length > 1 ? '#ef4444' : '#9ca3af'} />
                      </TouchableOpacity>
                    </View>
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
              ))}
            </View>
          </View>
        )
      })}
      <PaddingBottom />
    </ScrollView>
  )
}
