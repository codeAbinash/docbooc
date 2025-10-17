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

type DateSchedule = {
  slots: TimeSlot[]
}

type DateWiseSchedule = {
  [date: number]: DateSchedule
}

const ONE_HOUR = 60 * 60 * 1000

const createDefaultSlot = (): TimeSlot => ({
  id: Date.now().toString() + Math.random(),
  startTime: new Date(),
  endTime: new Date(Date.now() + ONE_HOUR),
})

const DATES = Array.from({ length: 31 }, (_, i) => i + 1)

export default function Monthly() {
  const [selectedDates, setSelectedDates] = useState<number[]>([1, 15])
  const [dateWiseSchedule, setDateWiseSchedule] = useState<DateWiseSchedule>({
    1: { slots: [createDefaultSlot()] },
    15: { slots: [createDefaultSlot()] },
  })

  const toggleDate = (date: number) => {
    if (selectedDates.includes(date)) {
      setSelectedDates(selectedDates.filter((d) => d !== date))
      const newSchedule = { ...dateWiseSchedule }
      delete newSchedule[date]
      setDateWiseSchedule(newSchedule)
    } else {
      setSelectedDates([...selectedDates, date].sort((a, b) => a - b))
      setDateWiseSchedule({
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

    setDateWiseSchedule({
      ...dateWiseSchedule,
      [date]: {
        slots: [...dateSchedule.slots, createDefaultSlot()],
      },
    })
  }

  const removeDateTimeSlot = (date: number, slotId: string) => {
    const dateSchedule = dateWiseSchedule[date]
    if (!dateSchedule || dateSchedule.slots.length <= 1) return

    setDateWiseSchedule({
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

    setDateWiseSchedule({
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

  return (
    <ScrollView className='flex-1' contentContainerClassName='px-5 py-4 pt-2 gap-5'>
      <View className='flex-row flex-wrap gap-2'>
            {DATES.map((date) => (
              <TouchableOpacity
                key={date}
                onPress={() => toggleDate(date)}
                activeOpacity={0.7}
                className={`items-center rounded-xl py-3 ${
                  selectedDates.includes(date) ? 'bg-accent' : 'bg-black/5 dark:bg-white/5'
                }`}
                style={{ flexBasis: '15%' }}
              >
                <SemiBold
                  className={`text-base ${
                    selectedDates.includes(date) ? 'text-white' : 'text-neutral-700 dark:text-neutral-300'
                  }`}
                >
                  {date}
                </SemiBold>
              </TouchableOpacity>
            ))}
          </View>

          {selectedDates.map((date) => {
            const dateSchedule = dateWiseSchedule[date]
            if (!dateSchedule) return null

            return (
              <View key={date} className='gap-3.5'>
                <View className='flex-row items-center gap-2'>
                  <Calendar01Icon size={24} strokeWidth={1.9} />
                  <SemiBold className='text-2xl text-neutral-800 dark:text-neutral-200'>Date {date}</SemiBold>
                </View>

                {dateSchedule.slots.map((slot, index) => (
                  <TouchableOpacity
                    activeOpacity={0.9}
                    key={slot.id}
                    className='overflow-hidden rounded-2xl bg-white p-5 pt-4 shadow-sm dark:bg-neutral-800'
                  >
                    <View className='mb-3 flex-row items-center justify-between'>
                      <SemiBold className='text text-xl'>Slot {index + 1}</SemiBold>
                      <TouchableOpacity
                        onPress={() => removeDateTimeSlot(date, slot.id)}
                        activeOpacity={0.7}
                        style={{ opacity: dateSchedule.slots.length > 1 ? 1 : 0.3 }}
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
                  </TouchableOpacity>
                ))}

                <TouchableOpacity onPress={() => addDateTimeSlot(date)} activeOpacity={0.7}>
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
