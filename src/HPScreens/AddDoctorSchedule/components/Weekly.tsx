import Add01Icon from '@assets/icons/hugeicons/Add01Icon'
import { PaddingBottom } from '@components/SafePadding'
import Calendar01Icon from '@hugeicons/Calendar01Icon'
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
const SHORT_DAYS: { [key: string]: string } = {
  Monday: 'Mon',
  Tuesday: 'Tue',
  Wednesday: 'Wed',
  Thursday: 'Thu',
  Friday: 'Fri',
  Saturday: 'Sat',
  Sunday: 'Sun',
}
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
  const [selectedDays, setSelectedDays] = useState<string[]>(['Monday', 'Wednesday', 'Friday'])
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
    <ScrollView className='flex-1' contentContainerClassName='px-5 py-4 pt-2 gap-10'>
      <View className='flex-row flex-wrap gap-2'>
        {DAYS.map((day) => (
          <TouchableOpacity
            key={day}
            onPress={() => toggleDay(day)}
            activeOpacity={0.7}
            className={`flex-1 items-center rounded-xl px-3 py-4 ${
              selectedDays.includes(day) ? 'bg-accent' : 'bg-black/5 dark:bg-white/5'
            }`}
          >
            <SemiBold
              className={`text-lg ${
                selectedDays.includes(day) ? 'text-white' : 'text-neutral-700 dark:text-neutral-300'
              }`}
            >
              {CHAR_DAYS[day]}
            </SemiBold>
          </TouchableOpacity>
        ))}
      </View>

      {DAYS.filter((day) => selectedDays.includes(day)).map((day) => {
        const daySchedule = weekSchedule[day]
        if (!daySchedule) return null

        return (
          <View key={day} className='gap-3.5'>
            <View className='flex-row items-center gap-2'>
              <Calendar01Icon size={24} strokeWidth={1.9} />
              <SemiBold className='gap-4 text-2xl text-neutral-800 dark:text-neutral-200'>{day}</SemiBold>
            </View>

            {daySchedule.slots.map((slot, index) => (
              <TouchableOpacity
                activeOpacity={0.9}
                key={slot.id}
                className='overflow-hidden rounded-2xl bg-white p-5 pt-4 shadow-sm dark:bg-neutral-800'
              >
                <View className='mb-3 flex-row items-center justify-between'>
                  <SemiBold className='text text-xl'>Slot {index + 1}</SemiBold>
                  <TouchableOpacity
                    onPress={() => removeTimeSlot(day, slot.id)}
                    activeOpacity={0.7}
                    style={{ opacity: daySchedule.slots.length > 1 ? 1 : 0.3 }}
                  >
                    <Medium className='rounded-full bg-red-500/20 px-3.5 py-1.5 text-sm text-red-600 dark:text-red-400'>
                      Remove
                    </Medium>
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
              </TouchableOpacity>
            ))}

            <TouchableOpacity onPress={() => addTimeSlot(day)} activeOpacity={0.7}>
              <View className='flex-row items-center justify-center gap-2 rounded-2xl border-2 border-dashed border-accent bg-accent/10 py-4 dark:border-accent/20 dark:bg-accent/30'>
                <Add01Icon size={20} color={Colors.accent} />
                <Medium className='text-sm text-accent'>Add Time Slot</Medium>
              </View>
            </TouchableOpacity>
          </View>
        )
      })}
      <PaddingBottom />
    </ScrollView>
  )
}
