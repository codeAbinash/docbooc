import Add01Icon from '@assets/icons/hugeicons/Add01Icon'
import { PaddingBottom } from '@components/SafePadding'
import Calendar01Icon from '@hugeicons/Calendar01Icon'
import Cancel01Icon from '@hugeicons/Cancel01Icon'
import { DateTimePickerEvent } from '@react-native-community/datetimepicker'
import { Medium, SemiBold } from '@utils/fonts'
import { useState } from 'react'
import { Platform, ScrollView, TouchableOpacity, View, TextInput } from 'react-native'
import { TimeButton } from '@components/TimeSelector'

type TimeSlot = {
  id: string
  startTime: Date
  endTime: Date
  maxBookings: number
  showPicker?: 'start' | 'end'
}

type DateSchedule = {
  slots: TimeSlot[]
}

type DateWiseSchedule = {
  [date: number]: DateSchedule
}

type MonthlyProps = {
  onScheduleChange?: (schedule: DateWiseSchedule) => void
}

const ONE_HOUR = 60 * 60 * 1000

const createDefaultSlot = (): TimeSlot => ({
  id: Date.now().toString() + Math.random(),
  startTime: new Date(),
  endTime: new Date(Date.now() + ONE_HOUR),
  maxBookings: 20,
})

const DATES = Array.from({ length: 31 }, (_, i) => i + 1)

export default function Monthly({ onScheduleChange }: MonthlyProps) {
  const [selectedDates, setSelectedDates] = useState<number[]>([])
  const [dateWiseSchedule, setDateWiseSchedule] = useState<DateWiseSchedule>({})

  const updateSchedule = (newSchedule: DateWiseSchedule) => {
    setDateWiseSchedule(newSchedule)
    onScheduleChange?.(newSchedule)
  }

  const toggleDate = (date: number) => {
    if (selectedDates.includes(date)) {
      setSelectedDates(selectedDates.filter((d) => d !== date))
      const newSchedule = { ...dateWiseSchedule }
      delete newSchedule[date]
      updateSchedule(newSchedule)
    } else {
      setSelectedDates([...selectedDates, date].sort((a, b) => a - b))
      updateSchedule({
        ...dateWiseSchedule,
        [date]: {
          slots: [createDefaultSlot()],
        },
      })
    }
  }

  const addDateTimeSlot = (date: number) => {
    const dateSchedule = dateWiseSchedule[date]
    if (!dateSchedule) return

    updateSchedule({
      ...dateWiseSchedule,
      [date]: {
        slots: [...dateSchedule.slots, createDefaultSlot()],
      },
    })
  }

  const removeDateTimeSlot = (date: number, slotId: string) => {
    const dateSchedule = dateWiseSchedule[date]
    if (!dateSchedule || dateSchedule.slots.length <= 1) return

    updateSchedule({
      ...dateWiseSchedule,
      [date]: {
        slots: dateSchedule.slots.filter((slot) => slot.id !== slotId),
      },
    })
  }

  const updateDateTime = (
    date: number,
    id: string,
    type: 'start' | 'end',
    event: DateTimePickerEvent,
    dateVal?: Date,
  ) => {
    if (event.type !== 'set' || !dateVal) return

    const dateSchedule = dateWiseSchedule[date]
    if (!dateSchedule) return

    updateSchedule({
      ...dateWiseSchedule,
      [date]: {
        slots: dateSchedule.slots.map((slot) =>
          slot.id === id
            ? {
                ...slot,
                [type === 'start' ? 'startTime' : 'endTime']: dateVal,
                ...(Platform.OS === 'android' && { showPicker: undefined }),
              }
            : slot,
        ),
      },
    })
  }

  const toggleDatePicker = (date: number, id: string, type: 'start' | 'end') => {
    const dateSchedule = dateWiseSchedule[date]
    if (!dateSchedule) return

    setDateWiseSchedule({
      ...dateWiseSchedule,
      [date]: {
        slots: dateSchedule.slots.map((slot) => ({
          ...slot,
          showPicker: slot.id === id && slot.showPicker !== type ? type : undefined,
        })),
      },
    })
  }

  const updateMaxBookings = (date: number, id: string, value: string) => {
    const dateSchedule = dateWiseSchedule[date]
    if (!dateSchedule) return

    const maxBookings = Math.max(0, Math.min(100, parseInt(value) || 0))

    updateSchedule({
      ...dateWiseSchedule,
      [date]: {
        slots: dateSchedule.slots.map((slot) => (slot.id === id ? { ...slot, maxBookings } : slot)),
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
            <SemiBold className='text-base text-neutral-800 dark:text-neutral-200'>Monthly Schedule</SemiBold>
          </View>
          <Medium className='text-xs text-neutral-500'>{selectedDates.length} dates selected</Medium>
        </View>

        <View className='flex-row flex-wrap gap-2'>
          {DATES.map((date) => (
            <TouchableOpacity
              key={date}
              onPress={() => toggleDate(date)}
              activeOpacity={0.7}
              style={{ width: '12.3%' }}
            >
              <View
                className={`items-center justify-center rounded-lg py-3 ${
                  selectedDates.includes(date)
                    ? 'bg-blue-100 dark:bg-blue-900/30'
                    : 'border-2 border-neutral-100 dark:border-neutral-700'
                }`}
              >
                <SemiBold
                  className={`text-base ${
                    selectedDates.includes(date)
                      ? 'text-blue-600 dark:text-blue-400'
                      : 'text-neutral-600 dark:text-neutral-400'
                  }`}
                >
                  {date}
                </SemiBold>
              </View>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      {selectedDates.map((date) => {
        const dateSchedule = dateWiseSchedule[date]
        if (!dateSchedule) return null

        return (
          <View key={date} className='overflow-hidden rounded-2xl bg-white dark:bg-neutral-800'>
            <View className='border-b border-neutral-100 p-4 dark:border-neutral-700'>
              <View className='flex-row items-center justify-between'>
                <View className='flex-row items-center gap-3'>
                  <View className='rounded-lg bg-blue-100/50 p-2.5 dark:bg-blue-900/20'>
                    <Calendar01Icon size={20} color='#3b82f6' strokeWidth={2} />
                  </View>
                  <View>
                    <SemiBold className='text-lg text-neutral-800 dark:text-neutral-200'>Date {date}</SemiBold>
                    <Medium className='text-xs text-neutral-500'>{dateSchedule.slots.length} slots scheduled</Medium>
                  </View>
                </View>
                <TouchableOpacity
                  onPress={() => addDateTimeSlot(date)}
                  activeOpacity={0.7}
                  className='rounded-lg bg-blue-100/50 p-2 dark:bg-blue-900/20'
                >
                  <Add01Icon size={20} color='#3b82f6' />
                </TouchableOpacity>
              </View>
            </View>

            <View>
              {dateSchedule.slots.map((slot, index) => (
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
                        onPress={() => dateSchedule.slots.length > 1 && removeDateTimeSlot(date, slot.id)}
                        activeOpacity={0.7}
                        className={`items-center rounded-lg p-2 ${
                          dateSchedule.slots.length > 1
                            ? 'bg-red-100/50 dark:border-red-800/30 dark:bg-red-900/20'
                            : 'bg-neutral-100/50 dark:bg-neutral-700/20'
                        }`}
                      >
                        <Cancel01Icon size={20} color={dateSchedule.slots.length > 1 ? '#ef4444' : '#9ca3af'} />
                      </TouchableOpacity>
                    </View>
                    <View className='gap-3'>
                      <View className='flex-row gap-3'>
                        <TimeButton
                          slot={slot}
                          type='start'
                          onTogglePicker={(id, type) => toggleDatePicker(date, id, type)}
                          onTimeChange={(id, type, event, dateVal) => updateDateTime(date, id, type, event, dateVal)}
                        />
                        <TimeButton
                          slot={slot}
                          type='end'
                          onTogglePicker={(id, type) => toggleDatePicker(date, id, type)}
                          onTimeChange={(id, type, event, dateVal) => updateDateTime(date, id, type, event, dateVal)}
                        />
                      </View>
                      <View>
                        <Medium className='mb-2 text-xs text-neutral-600 dark:text-neutral-400'>Max Bookings</Medium>
                        <TextInput
                          value={slot.maxBookings.toString()}
                          onChangeText={(value) => updateMaxBookings(date, slot.id, value)}
                          keyboardType='number-pad'
                          maxLength={3}
                          className='rounded-lg border border-neutral-200 bg-white px-4 py-3 text-center text-lg text-neutral-800 dark:border-neutral-700 dark:bg-neutral-800 dark:text-neutral-200'
                        />
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
