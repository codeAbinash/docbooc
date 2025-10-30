import Add01Icon from '@assets/icons/hugeicons/Add01Icon'
import { PaddingBottom } from '@components/SafePadding'
import Calendar01Icon from '@hugeicons/Calendar01Icon'
import Cancel01Icon from '@hugeicons/Cancel01Icon'
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
    <ScrollView className='flex-1' contentContainerClassName='px-5 py-4 pt-2 gap-6'>
      <View className='overflow-hidden rounded-2xl bg-white dark:bg-neutral-800'>
        <View className='border-b border-neutral-100 p-4 dark:border-neutral-700'>
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
          {timeSlots.map((slot, index) => (
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
                    onPress={() => timeSlots.length > 1 && removeTimeSlot(slot.id)}
                    activeOpacity={0.7}
                    className={`items-center rounded-lg p-2 ${
                      timeSlots.length > 1
                        ? 'bg-red-100/50 dark:border-red-800/30 dark:bg-red-900/20'
                        : 'bg-neutral-100/50 dark:bg-neutral-700/20'
                    }`}
                  >
                    <Cancel01Icon size={20} color={timeSlots.length > 1 ? '#ef4444' : '#9ca3af'} />
                  </TouchableOpacity>
                </View>
                <View className='flex-row gap-3'>
                  <TimeButton slot={slot} type='start' onTogglePicker={togglePicker} onTimeChange={updateTime} />
                  <TimeButton slot={slot} type='end' onTogglePicker={togglePicker} onTimeChange={updateTime} />
                </View>
              </View>
            </View>
          ))}
        </View>
      </View>
      <PaddingBottom />
    </ScrollView>
  )
}
