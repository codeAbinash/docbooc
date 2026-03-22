import Add01Icon from '@assets/icons/hugeicons/Add01Icon'
import { PaddingBottom } from '@components/SafePadding'
import Calendar01Icon from '@hugeicons/Calendar01Icon'
import ChevronDownIcon from '@hugeicons/ArrowRight01Icon'
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

export default function Weekly({ onScheduleChange, recurrenceData, onSlotCreated }: WeeklyProps) {
  // Screen dimensions for card sizing
  const { width: screenWidth } = useWindowDimensions()

  // State management
  const [selectedDays, setSelectedDays] = useState<string[]>([])
  const [weekSchedule, setWeekSchedule] = useState<WeekSchedule>({})
  const [expandedDays, setExpandedDays] = useState<Set<string>>(new Set())
  const [focusSlot, setFocusSlot] = useState<{ day: string; slotId: string } | null>(null)

  // References for scroll animation
  const scrollRefs = useRef<{ [day: string]: ScrollView | null }>({})
  const cardWidth = screenWidth - 80

  // Auto-scroll to newly created slot
  useLayoutEffect(() => {
    if (!focusSlot || !scrollRefs.current[focusSlot.day]) return

    const daySchedule = weekSchedule[focusSlot.day]
    if (!daySchedule) return

    const slotIndex = daySchedule.slots.findIndex((slot) => slot.id === focusSlot.slotId)
    if (slotIndex !== -1) {
      const offset = slotIndex * (cardWidth + 12) + 20
      setTimeout(() => {
        scrollRefs.current[focusSlot.day]?.scrollTo({ x: offset, animated: true })
      }, 50)
    }
  }, [focusSlot, cardWidth, weekSchedule])

  // Create slot when recurrence data is triggered
  useEffect(() => {
    if (recurrenceData && selectedDays.length > 0) {
      const firstDay = selectedDays[0]
      if (!firstDay) return

      setWeekSchedule((prevSchedule) => {
        const daySchedule = prevSchedule[firstDay]
        if (!daySchedule) return prevSchedule

        const newSlot = createDefaultSlot()
        const newSchedule = {
          ...prevSchedule,
          [firstDay]: {
            slots: [...daySchedule.slots, newSlot],
          },
        }
        onScheduleChange?.(newSchedule)
        setFocusSlot({ day: firstDay, slotId: newSlot.id })
        return newSchedule
      })
      onSlotCreated?.()
    }
  }, [recurrenceData, selectedDays, onSlotCreated, onScheduleChange])

  // Update parent component with schedule changes
  const updateSchedule = (newSchedule: WeekSchedule) => {
    setWeekSchedule(newSchedule)
    onScheduleChange?.(newSchedule)
  }

  // Toggle day selection
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
        [day]: { slots: [] },
      })
    }
  }

  // Add new time slot for a day
  const addTimeSlot = (day: string) => {
    const daySchedule = weekSchedule[day]
    if (!daySchedule) return

    const newSlot = createDefaultSlot()
    updateSchedule({
      ...weekSchedule,
      [day]: {
        slots: [...daySchedule.slots, newSlot],
      },
    })
    setFocusSlot({ day, slotId: newSlot.id })
  }

  // Delete a time slot
  const removeTimeSlot = (day: string, slotId: string) => {
    const daySchedule = weekSchedule[day]
    if (!daySchedule) return

    const deletedIndex = daySchedule.slots.findIndex((slot) => slot.id === slotId)
    const remaining = daySchedule.slots.filter((slot) => slot.id !== slotId)

    if (remaining.length > 0) {
      // Scroll to adjacent slot after deletion
      const nextIndex = Math.max(deletedIndex - 1, 0)
      const offset = nextIndex * (cardWidth + 12) + 20
      scrollRefs.current[day]?.scrollTo({ x: offset, animated: true })

      setTimeout(() => {
        updateSchedule({
          ...weekSchedule,
          [day]: { slots: remaining },
        })
        const nextCard = remaining[nextIndex]
        if (nextCard) {
          setFocusSlot({ day, slotId: nextCard.id })
        }
      }, 50)
    } else {
      // Last slot deleted
      updateSchedule({
        ...weekSchedule,
        [day]: { slots: remaining },
      })
    }
  }

  // Update time picker values
  const updateTime = (
    day: string,
    id: string,
    type: 'start' | 'end' | 'startDate' | 'endDate',
    event: DateTimePickerEvent,
    date?: Date,
  ) => {
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
                [type === 'start' ? 'startTime' : type === 'end' ? 'endTime' : type]: date,
                ...(Platform.OS === 'android' && { showPicker: undefined }),
              }
            : slot,
        ),
      },
    })
  }

  // Toggle date/time picker visibility
  const togglePicker = (day: string, id: string, type: 'start' | 'end' | 'startDate' | 'endDate') => {
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

  // Update slot numeric fields (max bookings, window, fees)
  const handleFieldChange = (day: string, id: string, field: keyof TimeSlot, value: any) => {
    const daySchedule = weekSchedule[day]
    if (!daySchedule) return

    updateSchedule({
      ...weekSchedule,
      [day]: {
        slots: daySchedule.slots.map((slot) => (slot.id === id ? { ...slot, [field]: value } : slot)),
      },
    })
  }

  // Toggle expand/collapse day section
  const toggleDayExpanded = (day: string) => {
    const newSet = new Set(expandedDays)
    newSet.has(day) ? newSet.delete(day) : newSet.add(day)
    setExpandedDays(newSet)
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

        const isExpanded = expandedDays.has(day)

        return (
          <View key={day}>
            <TouchableOpacity
              onPress={() => toggleDayExpanded(day)}
              activeOpacity={0.7}
              className='rounded-2xl border border-neutral-400 bg-white p-4 dark:border-neutral-700 dark:bg-neutral-800'
            >
              <View className='flex-row items-center justify-between'>
                <View className='flex-1 flex-row items-center gap-3'>
                  <View className='rounded-lg bg-blue-100/50 p-2.5 dark:bg-blue-900/20'>
                    <Calendar01Icon size={20} color='#3b82f6' strokeWidth={2} />
                  </View>
                  <View className='flex-1'>
                    <SemiBold className='text-lg text-neutral-800 dark:text-neutral-200'>{day}</SemiBold>
                    <Medium className='text-xs text-neutral-500'>{daySchedule.slots.length} slots scheduled</Medium>
                  </View>
                </View>
                <View className='flex-row items-center gap-2'>
                  <TouchableOpacity
                    onPress={() => addTimeSlot(day)}
                    activeOpacity={0.7}
                    className='rounded-lg bg-blue-100/50 p-2 dark:bg-blue-900/20'
                  >
                    <Add01Icon size={20} color='#3b82f6' />
                  </TouchableOpacity>
                  <ChevronDownIcon
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

            {isExpanded && daySchedule.slots.length > 0 && (
              <ScrollView
                ref={(ref) => {
                  scrollRefs.current[day] = ref
                }}
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerClassName='gap-3 py-3'
                className='mt-2'
              >
                {daySchedule.slots.map((slot, index) => (
                  <View key={slot.id} style={{ width: cardWidth }}>
                    <SlotCard
                      slot={slot}
                      index={index}
                      onRemove={(id) => removeTimeSlot(day, id)}
                      onTogglePicker={(id, type) => togglePicker(day, id, type)}
                      onTimeChange={(id, type, event, date) => updateTime(day, id, type, event, date)}
                      onFieldChange={(id, field, value) => handleFieldChange(day, id, field, value)}
                      isLastCard={index === daySchedule.slots.length - 1}
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
