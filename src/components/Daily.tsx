import Add01Icon from '@assets/icons/hugeicons/Add01Icon'
import { PaddingBottom } from '@components/SafePadding'
import Calendar01Icon from '@hugeicons/Calendar01Icon'
import { DateTimePickerEvent } from '@react-native-community/datetimepicker'
import { Medium, SemiBold } from '@utils/fonts'
import { useNavigation } from '@react-navigation/native'
import { useEffect, useState, useCallback, useRef, useLayoutEffect } from 'react'
import { ScrollView, TextInput, TouchableOpacity, View, useWindowDimensions } from 'react-native'
import DateTimePicker from '@react-native-community/datetimepicker'
import { HPStackNav } from '@utils/types'
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

type DailyProps = {
  onTimeSlotsChange?: (slots: TimeSlot[]) => void
  onScheduleChange?: (schedule: { slots: TimeSlot[] }) => void
}

const ONE_HOUR = 60 * 60 * 1000

const createDefaultSlot = (): TimeSlot => ({
  id: Date.now().toString(),
  startDate: new Date(),
  startTime: new Date(),
  endTime: new Date(Date.now() + ONE_HOUR),
  maxBookings: 20,
  bookingWindowDays: 0,
  fees: 0,
  endType: 'never',
})

export default function Daily({ onTimeSlotsChange, onScheduleChange }: DailyProps) {
  const navigation = useNavigation<HPStackNav>()
  const { width: screenWidth } = useWindowDimensions()
  const [timeSlots, setTimeSlots] = useState<TimeSlot[]>([])
  const cardWidth = screenWidth - 80
  const scrollViewRef = useRef<ScrollView>(null)
  const [focusCardId, setFocusCardId] = useState<string | null>(null)

  useEffect(() => {
    onTimeSlotsChange?.(timeSlots)
    onScheduleChange?.({ slots: timeSlots })
  }, [timeSlots]) // Only depend on timeSlots, not on callback references

  useLayoutEffect(() => {
    if (focusCardId && scrollViewRef.current) {
      const cardIndex = timeSlots.findIndex((slot) => slot.id === focusCardId)
      if (cardIndex !== -1) {
        const offset = cardIndex * (cardWidth + 16) + 20
        scrollViewRef.current.scrollTo({ x: offset, animated: true })
      }
    }
  }, [focusCardId, cardWidth])

  const updateSlots = (newSlots: TimeSlot[]) => {
    setTimeSlots(newSlots)
    onTimeSlotsChange?.(newSlots)
  }

  const addTimeSlot = () => {
    const newSlot = createDefaultSlot()
    const newSlots = [...timeSlots, newSlot]
    updateSlots(newSlots)

    const newCardIndex = newSlots.length - 1
    const offset = newCardIndex * (cardWidth + 16) + 20

    setTimeout(() => {
      if (scrollViewRef.current) {
        scrollViewRef.current.scrollTo({ x: offset, animated: true })
      }
      setFocusCardId(newSlot.id)
    }, 100)
  }

  const removeTimeSlot = (id: string) => {
    const deletedIndex = timeSlots.findIndex((slot) => slot.id === id)
    const remaining = timeSlots.filter((slot) => slot.id !== id)

    if (remaining.length > 0) {
      const nextFocusIndex = Math.max(deletedIndex - 1, 0)
      const offset = nextFocusIndex * (cardWidth + 16) + 20

      if (scrollViewRef.current) {
        scrollViewRef.current.scrollTo({ x: offset, animated: true })
      }

      setTimeout(() => {
        updateSlots(remaining)
        const nextCard = remaining[nextFocusIndex]
        if (nextCard) {
          setFocusCardId(nextCard.id)
        }
      }, 50)
    } else {
      updateSlots(remaining)
    }
  }

  const updateTime = (
    id: string,
    type: 'start' | 'end' | 'startDate' | 'endDate',
    event: DateTimePickerEvent,
    date?: Date,
  ) => {
    if (event.type !== 'set' || !date) return

    const updatedSlots = timeSlots.map((slot) => {
      if (slot.id !== id) return slot

      const updated = { ...slot, showPicker: undefined as any }
      if (type === 'start') {
        updated.startTime = date
      } else if (type === 'end') {
        updated.endTime = date
      } else if (type === 'startDate') {
        updated.startDate = date
      } else if (type === 'endDate') {
        updated.endDate = date
      }
      return updated
    })

    updateSlots(updatedSlots)
  }

  const togglePicker = (id: string, type: 'start' | 'end' | 'startDate' | 'endDate') => {
    setTimeSlots(
      timeSlots.map((slot) => ({
        ...slot,
        showPicker: slot.id === id && slot.showPicker !== type ? type : undefined,
      })),
    )
  }

  const handleFieldChange = (id: string, field: keyof TimeSlot, value: any) => {
    updateSlots(
      timeSlots.map((slot) =>
        slot.id === id
          ? {
              ...slot,
              [field]: value,
            }
          : slot,
      ),
    )
  }

  return (
    <View className='flex-1 px-5'>
      <View className='overflow-hidden rounded-3xl border border-neutral-400 bg-white dark:border-neutral-700 dark:bg-neutral-800'>
        <View className='p-3 dark:border-neutral-700'>
          <View className='flex-row items-center justify-between'>
            <View className='flex-row items-center gap-3'>
              <View className='rounded-lg bg-blue-100/50 p-2.5 dark:bg-blue-900/20'>
                <Calendar01Icon size={20} color='#3b82f6' strokeWidth={2} />
              </View>
              <View>
                <SemiBold className='text-lg text-neutral-800 dark:text-neutral-200'>Daily Schedule</SemiBold>
                <Medium className='text-xs text-neutral-500'>{timeSlots.length} slots scheduled</Medium>
              </View>
            </View>
            <TouchableOpacity
              onPress={addTimeSlot}
              activeOpacity={0.7}
              className='rounded-lg bg-blue-100/50 p-2 dark:bg-blue-900/20'
            >
              <Add01Icon size={20} color='#3b82f6' />
            </TouchableOpacity>
          </View>
        </View>
      </View>

      <ScrollView
        ref={scrollViewRef}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerClassName='px-5 gap-4 py-4'
        className='flex-1'
      >
        {timeSlots.length > 0 ? (
          timeSlots.map((slot, index) => (
            <View key={slot.id} style={{ width: cardWidth }}>
              <SlotCard
                slot={slot}
                index={index}
                onRemove={removeTimeSlot}
                onTogglePicker={togglePicker}
                onTimeChange={updateTime}
                onFieldChange={handleFieldChange}
                isLastCard={index === timeSlots.length - 1}
              />
            </View>
          ))
        ) : (
          <View className='flex-1 items-center justify-center'>
            <Medium className='text-neutral-500'>No slots added yet</Medium>
          </View>
        )}
      </ScrollView>
      <PaddingBottom />
    </View>
  )
}
