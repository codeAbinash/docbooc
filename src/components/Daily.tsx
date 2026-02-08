import Add01Icon from '@assets/icons/hugeicons/Add01Icon'
import { PaddingBottom } from '@components/SafePadding'
import Calendar01Icon from '@hugeicons/Calendar01Icon'
import Cancel01Icon from '@hugeicons/Cancel01Icon'
import { DateTimePickerEvent } from '@react-native-community/datetimepicker'
import { Medium, SemiBold } from '@utils/fonts'
import { useNavigation, useFocusEffect, useRoute } from '@react-navigation/native'
import { useEffect, useState, useCallback } from 'react'
import { ScrollView, TextInput, TouchableOpacity, View } from 'react-native'
import { TimeButton } from '@components/TimeSelector'
import DateTimePicker from '@react-native-community/datetimepicker'
import RecurrenceModal, { RecurrenceData } from '@components/RecurrenceModal'
import { HPStackNav } from '@utils/types'

type TimeSlot = {
  id: string
  startTime: Date
  endTime: Date
  maxBookings: number
  showPicker?: 'start' | 'end'
  recurrence?: RecurrenceData
}

type DailyProps = {
  onTimeSlotsChange?: (slots: TimeSlot[]) => void
  recurrenceData?: RecurrenceData
  onScheduleChange?: (schedule: { slots: TimeSlot[] }) => void
  onSlotCreated?: () => void
}

const ONE_HOUR = 60 * 60 * 1000

const createDefaultSlot = (recurrence?: RecurrenceData): TimeSlot => ({
  id: Date.now().toString(),
  startTime: recurrence?.startTime || new Date(),
  endTime: recurrence?.endTime || new Date(Date.now() + ONE_HOUR),
  maxBookings: recurrence?.maxBookings || 20,
  recurrence,
})

export default function Daily({ onTimeSlotsChange, recurrenceData, onScheduleChange, onSlotCreated }: DailyProps) {
  const navigation = useNavigation<HPStackNav>()
  const [timeSlots, setTimeSlots] = useState<TimeSlot[]>([])
  const [selectedSlotForRecurrence, setSelectedSlotForRecurrence] = useState<string | null>(null)
  const [showRecurrenceModal, setShowRecurrenceModal] = useState(false)

  useEffect(() => {
    if (recurrenceData) {
      const newSlot = createDefaultSlot(recurrenceData)
      setTimeSlots((prev) => [...prev, newSlot])
      onSlotCreated?.()
    }
  }, [recurrenceData, onSlotCreated])

  useEffect(() => {
    onTimeSlotsChange?.(timeSlots)
    onScheduleChange?.({ slots: timeSlots })
  }, [timeSlots, onTimeSlotsChange, onScheduleChange])

  const updateSlots = (newSlots: TimeSlot[]) => {
    setTimeSlots(newSlots)
    onTimeSlotsChange?.(newSlots)
  }

  const addTimeSlot = () => {
    navigation.navigate('RecurrenceSchedule')
  }

  const removeTimeSlot = (id: string) => {
    updateSlots(timeSlots.filter((slot) => slot.id !== id))
  }

  const updateTime = (id: string, type: 'start' | 'end', event: DateTimePickerEvent, date?: Date) => {
    if (event.type !== 'set' || !date) return

    updateSlots(
      timeSlots.map((slot) =>
        slot.id === id
          ? {
              ...slot,
              [type === 'start' ? 'startTime' : 'endTime']: date,
              showPicker: undefined,
            }
          : slot,
      ),
    )
  }

  const togglePicker = (id: string, type: 'start' | 'end') => {
    setTimeSlots(
      timeSlots.map((slot) => ({
        ...slot,
        showPicker: slot.id === id && slot.showPicker !== type ? type : undefined,
      })),
    )
  }

  const handleAddRecurrence = (slotId: string) => {
    setSelectedSlotForRecurrence(slotId)
    setShowRecurrenceModal(true)
  }

  const handleRecurrenceConfirm = (data: RecurrenceData) => {
    if (selectedSlotForRecurrence) {
      updateSlots(
        timeSlots.map((slot) => (slot.id === selectedSlotForRecurrence ? { ...slot, recurrence: data } : slot)),
      )
      setSelectedSlotForRecurrence(null)
    } else {
      const newSlot = createDefaultSlot(data)
      updateSlots([...timeSlots, newSlot])
    }
  }

  return (
    <ScrollView className='flex-1' contentContainerClassName='px-5 gap-6'>
      <View className='overflow-hidden rounded-3xl border border-neutral-400 bg-white dark:border-neutral-700 dark:bg-neutral-800'>
        <View className='p-4 dark:border-neutral-700'>
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

        <View>
          {timeSlots.map((slot, index) => {
            const slotNumber = (index + 1).toString().padStart(2, '0')

            return (
              <View key={slot.id}>
                {index > 0 && <View className='h-[1px] bg-neutral-300 dark:bg-neutral-700' />}
                <View className={`flex-row`}>
                  <View className='flex-1 border-t border-neutral-400 p-4'>
                    <View className='mb-4 flex-row items-center justify-between'>
                      <View className='flex-row items-center gap-3'>
                        <View className='size-10 items-center justify-center rounded-lg bg-accent/10'>
                          <SemiBold className='text-xl text-accent'>{slotNumber}</SemiBold>
                        </View>
                        <View>
                          <SemiBold className='text-base text-neutral-800 dark:text-neutral-200'>
                            Slot {index + 1}
                          </SemiBold>
                        </View>
                      </View>
                      <TouchableOpacity
                        onPress={() => removeTimeSlot(slot.id)}
                        activeOpacity={0.7}
                        className='rounded-lg bg-red-100/50 p-2 dark:bg-red-900/20'
                      >
                        <Cancel01Icon size={20} color='#ef4444' />
                      </TouchableOpacity>
                    </View>
                    <View className='gap-3'>
                      <View className='flex-row gap-3'>
                        <TimeButton slot={slot} type='start' onTogglePicker={togglePicker} onTimeChange={updateTime} />
                        <TimeButton slot={slot} type='end' onTogglePicker={togglePicker} onTimeChange={updateTime} />
                      </View>
                    </View>
                  </View>
                </View>
              </View>
            )
          })}
        </View>
      </View>
      <PaddingBottom />
      
    </ScrollView>
  )
}
