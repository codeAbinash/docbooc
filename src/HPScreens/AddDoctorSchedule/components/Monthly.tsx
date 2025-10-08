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
  days: {
    [day: string]: DaySchedule
  }
}

type WeekWiseSchedule = {
  [week: number]: WeekSchedule
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

const WEEKS = [1, 2, 3, 4]

const ONE_HOUR = 60 * 60 * 1000

const createDefaultSlot = (): TimeSlot => ({
  id: Date.now().toString() + Math.random(),
  startTime: new Date(),
  endTime: new Date(Date.now() + ONE_HOUR),
})

type DateSchedule = {
  slots: TimeSlot[]
}

type DateWiseSchedule = {
  [date: number]: DateSchedule
}

type ScheduleType = 'weekwise' | 'datewise'

const DATES = Array.from({ length: 31 }, (_, i) => i + 1)

export default function Monthly() {
  const [scheduleType, setScheduleType] = useState<ScheduleType>('weekwise')
  const [selectedWeeks, setSelectedWeeks] = useState<number[]>([1, 3])
  const [weekWiseSchedule, setWeekWiseSchedule] = useState<WeekWiseSchedule>({
    1: {
      days: {
        Monday: { slots: [createDefaultSlot()] },
        Wednesday: { slots: [createDefaultSlot()] },
      },
    },
    3: {
      days: {
        Friday: { slots: [createDefaultSlot()] },
      },
    },
  })
  const [selectedDates, setSelectedDates] = useState<number[]>([1, 15])
  const [dateWiseSchedule, setDateWiseSchedule] = useState<DateWiseSchedule>({
    1: { slots: [createDefaultSlot()] },
    15: { slots: [createDefaultSlot()] },
  })

  const toggleWeek = (week: number) => {
    if (selectedWeeks.includes(week)) {
      setSelectedWeeks(selectedWeeks.filter((w) => w !== week))
      const newSchedule = { ...weekWiseSchedule }
      delete newSchedule[week]
      setWeekWiseSchedule(newSchedule)
    } else {
      setSelectedWeeks([...selectedWeeks, week].sort())
      setWeekWiseSchedule({
        ...weekWiseSchedule,
        [week]: {
          days: {},
        },
      })
    }
  }

  const toggleDay = (week: number, day: string) => {
    const weekSchedule = weekWiseSchedule[week]
    if (!weekSchedule) return

    const dayExists = weekSchedule.days[day]
    const newDays = { ...weekSchedule.days }

    if (dayExists) {
      delete newDays[day]
    } else {
      newDays[day] = { slots: [createDefaultSlot()] }
    }

    setWeekWiseSchedule({
      ...weekWiseSchedule,
      [week]: {
        days: newDays,
      },
    })
  }

  const addTimeSlot = (week: number, day: string) => {
    const weekSchedule = weekWiseSchedule[week]
    if (!weekSchedule) return

    const daySchedule = weekSchedule.days[day]
    if (!daySchedule) return

    setWeekWiseSchedule({
      ...weekWiseSchedule,
      [week]: {
        days: {
          ...weekSchedule.days,
          [day]: {
            slots: [...daySchedule.slots, createDefaultSlot()],
          },
        },
      },
    })
  }

  const removeTimeSlot = (week: number, day: string, slotId: string) => {
    const weekSchedule = weekWiseSchedule[week]
    if (!weekSchedule) return

    const daySchedule = weekSchedule.days[day]
    if (!daySchedule || daySchedule.slots.length <= 1) return

    setWeekWiseSchedule({
      ...weekWiseSchedule,
      [week]: {
        days: {
          ...weekSchedule.days,
          [day]: {
            slots: daySchedule.slots.filter((slot) => slot.id !== slotId),
          },
        },
      },
    })
  }

  const updateTime = (
    week: number,
    day: string,
    id: string,
    type: 'start' | 'end',
    event: DateTimePickerEvent,
    date?: Date,
  ) => {
    if (event.type !== 'set' || !date) return

    const weekSchedule = weekWiseSchedule[week]
    if (!weekSchedule) return

    const daySchedule = weekSchedule.days[day]
    if (!daySchedule) return

    setWeekWiseSchedule({
      ...weekWiseSchedule,
      [week]: {
        days: {
          ...weekSchedule.days,
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
        },
      },
    })
  }

  const togglePicker = (week: number, day: string, id: string, type: 'start' | 'end') => {
    const weekSchedule = weekWiseSchedule[week]
    if (!weekSchedule) return

    const daySchedule = weekSchedule.days[day]
    if (!daySchedule) return

    setWeekWiseSchedule({
      ...weekWiseSchedule,
      [week]: {
        days: {
          ...weekSchedule.days,
          [day]: {
            slots: daySchedule.slots.map((slot) => ({
              ...slot,
              showPicker: slot.id === id && slot.showPicker !== type ? type : undefined,
            })),
          },
        },
      },
    })
  }

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
      <View className='flex-row gap-2'>
        <TouchableOpacity
          onPress={() => setScheduleType('weekwise')}
          activeOpacity={0.7}
          className={`flex-1 rounded-xl px-4 py-3.5 ${
            scheduleType === 'weekwise' ? 'bg-accent' : 'bg-black/5 dark:bg-white/5'
          }`}
        >
          <SemiBold
            className={`text-center text-base ${
              scheduleType === 'weekwise' ? 'text-white' : 'text-neutral-700 dark:text-neutral-300'
            }`}
          >
            Week Wise
          </SemiBold>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => setScheduleType('datewise')}
          activeOpacity={0.7}
          className={`flex-1 rounded-xl px-4 py-3.5 ${
            scheduleType === 'datewise' ? 'bg-accent' : 'bg-black/5 dark:bg-white/5'
          }`}
        >
          <SemiBold
            className={`text-center text-base ${
              scheduleType === 'datewise' ? 'text-white' : 'text-neutral-700 dark:text-neutral-300'
            }`}
          >
            Date Wise
          </SemiBold>
        </TouchableOpacity>
      </View>

      {scheduleType === 'weekwise' && (
        <>
          <View className='flex-row gap-2'>
            {WEEKS.map((week) => (
              <TouchableOpacity
                key={week}
                onPress={() => toggleWeek(week)}
                activeOpacity={0.7}
                className={`flex-1 items-center rounded-xl py-4 ${
                  selectedWeeks.includes(week) ? 'bg-accent' : 'bg-black/5 dark:bg-white/5'
                }`}
              >
                <SemiBold
                  className={`text-lg ${
                    selectedWeeks.includes(week) ? 'text-white' : 'text-neutral-700 dark:text-neutral-300'
                  }`}
                >
                  {week}
                </SemiBold>
              </TouchableOpacity>
            ))}
          </View>

          {selectedWeeks.map((week) => {
            const weekSchedule = weekWiseSchedule[week]
            if (!weekSchedule) return null

            return (
              <View key={week} className='gap-4'>
                <View className='flex-row items-center gap-2'>
                  <Calendar01Icon size={24} strokeWidth={1.9} />
                  <SemiBold className='text-2xl text-neutral-800 dark:text-neutral-200'>Week {week}</SemiBold>
                </View>

                <View className='gap-2'>
                  <Medium className='text-sm text-neutral-600 dark:text-neutral-400'>Select Days</Medium>
                  <View className='flex-row flex-wrap gap-2'>
                    {DAYS.map((day) => (
                      <TouchableOpacity
                        key={day}
                        onPress={() => toggleDay(week, day)}
                        activeOpacity={0.7}
                        className={`flex-1 items-center rounded-xl px-3 py-3.5 ${
                          weekSchedule.days[day] ? 'bg-accent' : 'bg-black/5 dark:bg-white/5'
                        }`}
                      >
                        <SemiBold
                          className={`text-base ${
                            weekSchedule.days[day] ? 'text-white' : 'text-neutral-700 dark:text-neutral-300'
                          }`}
                        >
                          {CHAR_DAYS[day]}
                        </SemiBold>
                      </TouchableOpacity>
                    ))}
                  </View>
                </View>

                {Object.keys(weekSchedule.days).map((day) => {
                  const daySchedule = weekSchedule.days[day]
                  if (!daySchedule) return null

                  return (
                    <View key={day} className='gap-3'>
                      <Medium className='text-lg text-neutral-700 dark:text-neutral-300'>{day}</Medium>

                      {daySchedule.slots.map((slot, index) => (
                        <TouchableOpacity
                          activeOpacity={0.9}
                          key={slot.id}
                          className='overflow-hidden rounded-2xl bg-white p-5 pt-4 shadow-sm dark:bg-neutral-800'
                        >
                          <View className='mb-3 flex-row items-center justify-between'>
                            <SemiBold className='text text-xl'>Slot {index + 1}</SemiBold>
                            <TouchableOpacity
                              onPress={() => removeTimeSlot(week, day, slot.id)}
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
                              onTogglePicker={(id, type) => togglePicker(week, day, id, type)}
                              onTimeChange={(id, type, event, date) => updateTime(week, day, id, type, event, date)}
                            />
                            <TimeButton
                              slot={slot}
                              type='end'
                              onTogglePicker={(id, type) => togglePicker(week, day, id, type)}
                              onTimeChange={(id, type, event, date) => updateTime(week, day, id, type, event, date)}
                            />
                          </View>
                        </TouchableOpacity>
                      ))}

                      <TouchableOpacity onPress={() => addTimeSlot(week, day)} activeOpacity={0.7}>
                        <View className='flex-row items-center justify-center gap-2 rounded-2xl border-2 border-dashed border-accent bg-accent/10 py-4 dark:border-accent/20 dark:bg-accent/30'>
                          <Add01Icon size={20} color={Colors.accent} />
                          <Medium className='text-sm text-accent'>Add Time Slot</Medium>
                        </View>
                      </TouchableOpacity>
                    </View>
                  )
                })}
              </View>
            )
          })}
        </>
      )}

      {scheduleType === 'datewise' && (
        <>
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
        </>
      )}

      <PaddingBottom />
    </ScrollView>
  )
}
