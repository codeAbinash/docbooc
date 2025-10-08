import Add01Icon from '@assets/icons/hugeicons/Add01Icon'
import Press from '@components/Press'
import { PaddingBottom } from '@components/SafePadding'
import DateTimePicker, { DateTimePickerEvent } from '@react-native-community/datetimepicker'
import { Medium, SemiBold } from '@utils/fonts'
import { useState } from 'react'
import { Platform, ScrollView, TouchableOpacity, View } from 'react-native'
import { TimeButton as TimeButtonComponent } from './TimeSelector'

type TimeSlot = {
  id: string
  startTime: Date
  endTime: Date
  showPicker?: 'start' | 'end'
}

const ONE_HOUR = 60 * 60 * 1000

const createDefaultSlot = (): TimeSlot => ({
  id: Date.now().toString(),
  startTime: new Date(),
  endTime: new Date(Date.now() + ONE_HOUR),
})

type TimeButtonProps = {
  slot: TimeSlot
  type: 'start' | 'end'
  onTogglePicker: (id: string, type: 'start' | 'end') => void
  onTimeChange: (id: string, type: 'start' | 'end', event: DateTimePickerEvent, date?: Date) => void
}

function TimeButton({ slot, type, onTogglePicker, onTimeChange }: TimeButtonProps) {
  return <TimeButtonComponent slot={slot} type={type} onTogglePicker={onTogglePicker} onTimeChange={onTimeChange} />
}

export default function Daily() {
  const [timeSlots, setTimeSlots] = useState<TimeSlot[]>([createDefaultSlot()])

  const addTimeSlot = () => {
    setTimeSlots([...timeSlots, createDefaultSlot()])
  }

  const removeTimeSlot = (id: string) => {
    if (timeSlots.length > 1) {
      setTimeSlots(timeSlots.filter((slot) => slot.id !== id))
    }
  }

  const updateTime = (id: string, type: 'start' | 'end', event: DateTimePickerEvent, date?: Date) => {
    if (event.type !== 'set' || !date) return

    setTimeSlots(
      timeSlots.map((slot) =>
        slot.id === id
          ? {
              ...slot,
              [type === 'start' ? 'startTime' : 'endTime']: date,
              ...(Platform.OS === 'android' && { showPicker: undefined }),
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

  return (
    <ScrollView className='flex-1' contentContainerClassName='px-5 py-4 pt-2 gap-3.5'>
      {timeSlots.map((slot, index) => (
        <TouchableOpacity
          activeOpacity={0.9}
          key={slot.id}
          className='overflow-hidden rounded-2xl bg-white p-5 pt-4 shadow-sm dark:bg-neutral-800'
        >
          <View className='mb-3 flex-row items-center justify-between'>
            <SemiBold className='text text-xl'>Slot {index + 1}</SemiBold>
            <TouchableOpacity
              onPress={() => removeTimeSlot(slot.id)}
              activeOpacity={0.7}
              style={{ opacity: timeSlots.length > 1 ? 1 : 0.3 }}
            >
              <Medium className='rounded-full bg-red-500/20 px-3.5 py-1.5 text-sm text-red-600 dark:text-red-400'>
                Remove
              </Medium>
            </TouchableOpacity>
          </View>
          <View className='flex-row gap-3'>
            <TimeButton slot={slot} type='start' onTogglePicker={togglePicker} onTimeChange={updateTime} />
            <TimeButton slot={slot} type='end' onTogglePicker={togglePicker} onTimeChange={updateTime} />
          </View>
        </TouchableOpacity>
      ))}

      <Press onPress={addTimeSlot} activeScale={0.98}>
        <View className='flex-row items-center justify-center gap-2 rounded-2xl border-2 border-dashed border-blue-400 bg-blue-50 py-4 dark:border-blue-600 dark:bg-blue-950'>
          <Add01Icon size={20} color='#3b82f6' />
          <Medium className='text-sm text-blue-600 dark:text-blue-400'>Add Time Slot</Medium>
        </View>
      </Press>
      <PaddingBottom />
    </ScrollView>
  )
}
