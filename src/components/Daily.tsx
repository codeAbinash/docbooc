import Add01Icon from '@assets/icons/hugeicons/Add01Icon'
import { PaddingBottom } from '@components/SafePadding'
import Calendar01Icon from '@hugeicons/Calendar01Icon'
import Cancel01Icon from '@hugeicons/Cancel01Icon'
import { DateTimePickerEvent } from '@react-native-community/datetimepicker'
import { Medium, SemiBold } from '@utils/fonts'
import { useEffect, useState } from 'react'
import { ScrollView, TextInput, TouchableOpacity, View } from 'react-native'
import { TimeButton } from '@components/TimeSelector'

type TimeSlot = {
  id: string
  startTime: Date
  endTime: Date
  maxBookings: number
  showPicker?: 'start' | 'end'
}

type DailyProps = {
  onTimeSlotsChange?: (slots: TimeSlot[]) => void
}

const ONE_HOUR = 60 * 60 * 1000

const createDefaultSlot = (): TimeSlot => ({
  id: Date.now().toString(),
  startTime: new Date(),
  endTime: new Date(Date.now() + ONE_HOUR),
  maxBookings: 20,
})

export default function Daily({ onTimeSlotsChange }: DailyProps) {
  const [timeSlots, setTimeSlots] = useState<TimeSlot[]>([createDefaultSlot()])

  useEffect(() => {
    onTimeSlotsChange?.(timeSlots)
  }, [])

  const updateSlots = (newSlots: TimeSlot[]) => {
    setTimeSlots(newSlots)
    onTimeSlotsChange?.(newSlots)
  }

  const addTimeSlot = () => updateSlots([...timeSlots, createDefaultSlot()])

  const removeTimeSlot = (id: string) => {
    if (timeSlots.length > 1) {
      updateSlots(timeSlots.filter((slot) => slot.id !== id))
    }
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

  const updateMaxBookings = (id: string, value: string) => {
    const maxBookings = Math.max(0, Math.min(100, parseInt(value) || 0))
    updateSlots(timeSlots.map((slot) => (slot.id === id ? { ...slot, maxBookings } : slot)))
  }

  return (
    <ScrollView className='flex-1' contentContainerClassName='px-5 gap-6'>
      <View className='overflow-hidden rounded-3xl border border-neutral-400 bg-white dark:border-neutral-700 dark:bg-neutral-800'>
        <View className='border-b border-neutral-400 p-4 dark:border-neutral-700'>
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
            const canDelete = timeSlots.length > 1
            const slotNumber = (index + 1).toString().padStart(2, '0')

            return (
              <View key={slot.id}>
                {index > 0 && <View className='h-[1px]  bg-neutral-300 dark:bg-neutral-700' />}
                <View className={`flex-row `}>
                  <View className='flex-1 p-4'>
                    <View className='mb-4 flex-row items-center justify-between'>
                      <View className='flex-row items-center gap-3'>
                        <View className='size-10 items-center justify-center rounded-lg bg-accent/10'>
                          <SemiBold className='text-xl text-accent'>{slotNumber}</SemiBold>
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
                        onPress={() => canDelete && removeTimeSlot(slot.id)}
                        activeOpacity={0.7}
                        className={`rounded-lg p-2 ${
                          canDelete ? 'bg-red-100/50 dark:bg-red-900/20' : 'bg-neutral-100/50 dark:bg-neutral-700/20'
                        }`}
                      >
                        <Cancel01Icon size={20} color={canDelete ? '#ef4444' : '#9ca3af'} />
                      </TouchableOpacity>
                    </View>
                    <View className='gap-3'>
                      <View className='flex-row gap-3'>
                        <TimeButton slot={slot} type='start' onTogglePicker={togglePicker} onTimeChange={updateTime} />
                        <TimeButton slot={slot} type='end' onTogglePicker={togglePicker} onTimeChange={updateTime} />
                      </View>
                      <View className='flex-row items-center gap-3'>
                        <View className='flex-1'>
                          <Medium className='text-xs text-neutral-500 dark:text-neutral-400'>Max Bookings</Medium>
                          <Medium className='text-xs text-neutral-400 dark:text-neutral-500'>
                            Number of patients can visit during this slot
                          </Medium>
                        </View>
                        <View className='w-1/2'>
                          <TextInput
                            value={slot.maxBookings.toString()}
                            onChangeText={(value) => updateMaxBookings(slot.id, value)}
                            keyboardType='number-pad'
                            maxLength={3}
                            className='rounded-lg border border-neutral-200 bg-white px-4 py-3 text-center text-lg text-neutral-800 dark:border-neutral-700 dark:bg-neutral-800 dark:text-neutral-200'
                          />
                        </View>
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
