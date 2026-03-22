import Add01Icon from '@assets/icons/hugeicons/Add01Icon'
import { PaddingBottom } from '@components/SafePadding'
import Calendar01Icon from '@hugeicons/Calendar01Icon'
import ArrowRight01Icon from '@hugeicons/ArrowRight01Icon'
import { DateTimePickerEvent } from '@react-native-community/datetimepicker'
import { Medium, SemiBold } from '@utils/fonts'
import { useState, useEffect, useRef, useLayoutEffect } from 'react'
import { Platform, ScrollView, TouchableOpacity, View, TextInput, useWindowDimensions } from 'react-native'
import { SlotCard } from '@/HPScreens/components/SlotCard'

type RecurrenceType = 'never' | 'on' | 'after'

type TimeSlot = {
  id: string
  startDate: Date
  startTime: Date
  endTime: Date
  maxBookings: number
  bookingWindowDays: number
  fees: number
  endType: RecurrenceType
  endDate?: Date
  showPicker?: 'start' | 'end' | 'startDate' | 'endDate'
}

type DateSchedule = {
  slots: TimeSlot[]
}

type DateWiseSchedule = {
  [date: number]: DateSchedule
}

type MonthlyProps = {
  onScheduleChange?: (schedule: DateWiseSchedule) => void
  recurrenceData?: any
  onSlotCreated?: () => void
}

const ONE_HOUR = 60 * 60 * 1000

const createDefaultSlot = (): TimeSlot => ({
  id: Date.now().toString() + Math.random(),
  startDate: new Date(),
  startTime: new Date(),
  endTime: new Date(Date.now() + ONE_HOUR),
  maxBookings: 20,
  bookingWindowDays: 0,
  fees: 0,
  endType: 'never',
})

const DATES = Array.from({ length: 31 }, (_, i) => i + 1)

export default function Monthly({ onScheduleChange, recurrenceData, onSlotCreated }: MonthlyProps) {
  // Screen dimensions for card sizing
  const { width: screenWidth } = useWindowDimensions()

  // State management
  const [selectedDates, setSelectedDates] = useState<number[]>([])
  const [dateWiseSchedule, setDateWiseSchedule] = useState<DateWiseSchedule>({})
  const [expandedDates, setExpandedDates] = useState<Set<number>>(new Set())
  const [focusSlot, setFocusSlot] = useState<{ date: number; slotId: string } | null>(null)

  // References for scroll animation
  const scrollRefs = useRef<{ [date: number]: ScrollView | null }>({})
  const cardWidth = screenWidth - 80

  // Auto-scroll to newly created slot
  useLayoutEffect(() => {
    if (!focusSlot || !scrollRefs.current[focusSlot.date]) return

    const dateSchedule = dateWiseSchedule[focusSlot.date]
    if (!dateSchedule) return

    const slotIndex = dateSchedule.slots.findIndex((slot) => slot.id === focusSlot.slotId)
    if (slotIndex !== -1) {
      const offset = slotIndex * (cardWidth + 12) + 20
      setTimeout(() => {
        scrollRefs.current[focusSlot.date]?.scrollTo({ x: offset, animated: true })
      }, 50)
    }
  }, [focusSlot, cardWidth, dateWiseSchedule])

  // Create slot when recurrence data is triggered
  useEffect(() => {
    if (recurrenceData && selectedDates.length > 0) {
      const firstDate = selectedDates[0]
      if (!firstDate) return

      setDateWiseSchedule((prevSchedule) => {
        const dateSchedule = prevSchedule[firstDate]
        if (!dateSchedule) return prevSchedule

        const newSlot = createDefaultSlot()
        const newSchedule = {
          ...prevSchedule,
          [firstDate]: {
            slots: [...dateSchedule.slots, newSlot],
          },
        }
        onScheduleChange?.(newSchedule)
        setFocusSlot({ date: firstDate, slotId: newSlot.id })
        return newSchedule
      })
      onSlotCreated?.()
    }
  }, [recurrenceData, selectedDates, onSlotCreated, onScheduleChange])

  // Update parent component with schedule changes
  const updateSchedule = (newSchedule: DateWiseSchedule) => {
    setDateWiseSchedule(newSchedule)
    onScheduleChange?.(newSchedule)
  }

  // Toggle date selection
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
        [date]: { slots: [] },
      })
    }
  }

  // Add new time slot for a date
  const addDateTimeSlot = (date: number) => {
    const dateSchedule = dateWiseSchedule[date]
    if (!dateSchedule) return

    const newSlot = createDefaultSlot()
    updateSchedule({
      ...dateWiseSchedule,
      [date]: {
        slots: [...dateSchedule.slots, newSlot],
      },
    })
    setFocusSlot({ date, slotId: newSlot.id })
  }

  // Delete a time slot
  const removeDateTimeSlot = (date: number, slotId: string) => {
    const dateSchedule = dateWiseSchedule[date]
    if (!dateSchedule) return

    const deletedIndex = dateSchedule.slots.findIndex((slot) => slot.id === slotId)
    const remaining = dateSchedule.slots.filter((slot) => slot.id !== slotId)

    if (remaining.length > 0) {
      // Scroll to adjacent slot after deletion
      const nextIndex = Math.max(deletedIndex - 1, 0)
      const offset = nextIndex * (cardWidth + 12) + 20
      scrollRefs.current[date]?.scrollTo({ x: offset, animated: true })

      setTimeout(() => {
        updateSchedule({
          ...dateWiseSchedule,
          [date]: { slots: remaining },
        })
        const nextCard = remaining[nextIndex]
        if (nextCard) {
          setFocusSlot({ date, slotId: nextCard.id })
        }
      }, 50)
    } else {
      // Last slot deleted
      updateSchedule({
        ...dateWiseSchedule,
        [date]: { slots: remaining },
      })
    }
  }

  // Update time picker values
  const updateDateTime = (
    date: number,
    id: string,
    type: 'start' | 'end' | 'startDate' | 'endDate',
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
                [type === 'start' ? 'startTime' : type === 'end' ? 'endTime' : type]: dateVal,
                ...(Platform.OS === 'android' && { showPicker: undefined }),
              }
            : slot,
        ),
      },
    })
  }

  // Toggle date/time picker visibility
  const toggleDatePicker = (date: number, id: string, type: 'start' | 'end' | 'startDate' | 'endDate') => {
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

  // Update slot numeric fields (max bookings, window, fees)
  const handleFieldChange = (date: number, id: string, field: keyof TimeSlot, value: any) => {
    const dateSchedule = dateWiseSchedule[date]
    if (!dateSchedule) return

    updateSchedule({
      ...dateWiseSchedule,
      [date]: {
        slots: dateSchedule.slots.map((slot) => (slot.id === id ? { ...slot, [field]: value } : slot)),
      },
    })
  }

  // Toggle expand/collapse date section
  const toggleDateExpanded = (date: number) => {
    const newSet = new Set(expandedDates)
    newSet.has(date) ? newSet.delete(date) : newSet.add(date)
    setExpandedDates(newSet)
  }

  return (
    <ScrollView className='flex-1' contentContainerClassName='px-5 gap-6'>
      <View className='rounded-2xl border border-neutral-400 bg-white p-4 dark:bg-neutral-800'>
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
                    : 'border border-neutral-400 dark:border-neutral-700'
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

        const isExpanded = expandedDates.has(date)

        return (
          <View key={date}>
            <TouchableOpacity
              onPress={() => toggleDateExpanded(date)}
              activeOpacity={0.7}
              className='rounded-2xl border border-neutral-400 bg-white p-4 dark:border-neutral-700 dark:bg-neutral-800'
            >
              <View className='flex-row items-center justify-between'>
                <View className='flex-1 flex-row items-center gap-3'>
                  <View className='rounded-lg bg-blue-100/50 p-2.5 dark:bg-blue-900/20'>
                    <Calendar01Icon size={20} color='#3b82f6' strokeWidth={2} />
                  </View>
                  <View className='flex-1'>
                    <SemiBold className='text-lg text-neutral-800 dark:text-neutral-200'>Date {date}</SemiBold>
                    <Medium className='text-xs text-neutral-500'>{dateSchedule.slots.length} slots scheduled</Medium>
                  </View>
                </View>
                <View className='flex-row items-center gap-2'>
                  <TouchableOpacity
                    onPress={() => addDateTimeSlot(date)}
                    activeOpacity={0.7}
                    className='rounded-lg bg-blue-100/50 p-2 dark:bg-blue-900/20'
                  >
                    <Add01Icon size={20} color='#3b82f6' />
                  </TouchableOpacity>
                  <ArrowRight01Icon
                    size={20}
                    color='#6b7280'
                    strokeWidth={2}
                    style={{
                      transform: [{ rotate: isExpanded ? '-90deg' : '90deg' }],
                    }}
                  />
                </View>
              </View>
            </TouchableOpacity>

            {isExpanded && dateSchedule.slots.length > 0 && (
              <ScrollView
                ref={(ref) => {
                  scrollRefs.current[date] = ref
                }}
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerClassName='gap-3 py-3'
                className='mt-2'
              >
                {dateSchedule.slots.map((slot, index) => (
                  <View key={slot.id} style={{ width: cardWidth }}>
                    <SlotCard
                      slot={slot}
                      index={index}
                      onRemove={(id) => removeDateTimeSlot(date, id)}
                      onTogglePicker={(id, type) => toggleDatePicker(date, id, type)}
                      onTimeChange={(id, type, event, dateVal) => updateDateTime(date, id, type, event, dateVal)}
                      onFieldChange={(id, field, value) => handleFieldChange(date, id, field, value)}
                      isLastCard={index === dateSchedule.slots.length - 1}
                    />
                  </View>
                ))}
              </ScrollView>
            )}
          </View>
        )
      })}
      <PaddingBottom />
    </ScrollView>
  )
}
