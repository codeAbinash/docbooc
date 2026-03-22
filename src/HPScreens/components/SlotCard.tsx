import Cancel01Icon from '@hugeicons/Cancel01Icon'
import Clock03Icon from '@hugeicons/Clock03Icon'

import { DateTimePickerEvent } from '@react-native-community/datetimepicker'
import { Medium, SemiBold } from '@utils/fonts'
import { TouchableOpacity, View, TextInput } from 'react-native'
import { TimeButton } from '@components/TimeSelector'
import DateTimePicker from '@react-native-community/datetimepicker'

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

type SlotCardProps = {
  slot: TimeSlot
  index: number
  onRemove: (id: string) => void
  onTogglePicker: (id: string, type: 'start' | 'end' | 'startDate' | 'endDate') => void
  onTimeChange: (
    id: string,
    type: 'start' | 'end' | 'startDate' | 'endDate',
    event: DateTimePickerEvent,
    date?: Date,
  ) => void
  onFieldChange: (id: string, field: keyof TimeSlot, value: any) => void
  isLastCard?: boolean
}

const ICON_BLUE = '#3b82f6'
const ICON_ORANGE = '#f97316'
const ICON_GREEN = '#16a34a'

export function SlotCard({
  slot,
  index,
  onRemove,
  onTogglePicker,
  onTimeChange,
  onFieldChange,
  isLastCard,
}: SlotCardProps) {
  const slotNumber = (index + 1).toString().padStart(2, '0')

  return (
    <View className='overflow-hidden rounded-2xl border border-neutral-200 bg-white dark:border-neutral-700 dark:bg-neutral-800'>
      <View className='border-b border-neutral-200 px-6 py-3 dark:border-neutral-700'>
        <View className='flex-row items-center justify-between'>
          <View className='flex-row items-center gap-3'>
            <View className='size-10 items-center justify-center rounded-lg bg-accent/15'>
              <SemiBold className='text-lg text-accent'>{slotNumber}</SemiBold>
            </View>
            <SemiBold className='text-base text-neutral-900 dark:text-white'>Slot {index + 1}</SemiBold>
          </View>
          {isLastCard && (
            <TouchableOpacity
              onPress={() => onRemove(slot.id)}
              activeOpacity={0.7}
              className='rounded-lg bg-red-100/50 p-2 dark:bg-red-900/20'
            >
              <Cancel01Icon size={18} color='#ef4444' strokeWidth={2} />
            </TouchableOpacity>
          )}
        </View>
      </View>

      <View className='gap-6 px-6 py-3'>
        <View>
          <View className='mb-3 flex-row items-center gap-2'>
            <View className='rounded-md bg-blue-100/50 p-2 dark:bg-blue-900/20'>
              <Clock03Icon size={16} color={ICON_BLUE} strokeWidth={2} />
            </View>
            <SemiBold className='text-sm text-neutral-700 dark:text-neutral-300'>Slot Time</SemiBold>
          </View>
          <View className='flex-row gap-3'>
            <TimeButton
              slot={{
                id: slot.id,
                startTime: slot.startTime,
                endTime: slot.endTime,
                showPicker: slot.showPicker as 'start' | 'end' | undefined,
              }}
              type='start'
              onTogglePicker={(id, type) => onTogglePicker(id, type as any)}
              onTimeChange={(id, type, event, date) => onTimeChange(id, type as any, event, date)}
            />
            <TimeButton
              slot={{
                id: slot.id,
                startTime: slot.startTime,
                endTime: slot.endTime,
                showPicker: slot.showPicker as 'start' | 'end' | undefined,
              }}
              type='end'
              onTogglePicker={(id, type) => onTogglePicker(id, type as any)}
              onTimeChange={(id, type, event, date) => onTimeChange(id, type as any, event, date)}
            />
          </View>
        </View>

        <View className='border-t border-neutral-200 pt-4 dark:border-neutral-700'>
          <View className='flex-row gap-3'>
            <View className='flex-1 gap-2'>
              <Medium className='text-xs text-neutral-600 dark:text-neutral-400'>Max Bookings</Medium>
              <TextInput
                value={slot.maxBookings.toString()}
                onChangeText={(text) => onFieldChange(slot.id, 'maxBookings', parseInt(text) || 0)}
                placeholderTextColor='#9ca3af'
                keyboardType='numeric'
                className='dark:bg-neutral-750 rounded-lg border border-neutral-300 bg-neutral-50 px-3 py-2 text-sm text-neutral-800 dark:border-neutral-600 dark:text-neutral-200'
              />
            </View>

            <View className='flex-1 gap-2'>
              <Medium className='text-xs text-neutral-600 dark:text-neutral-400'>Window (days)</Medium>
              <TextInput
                value={slot.bookingWindowDays.toString()}
                onChangeText={(text) => onFieldChange(slot.id, 'bookingWindowDays', parseInt(text) || 0)}
                placeholderTextColor='#9ca3af'
                keyboardType='numeric'
                className='dark:bg-neutral-750 rounded-lg border border-neutral-300 bg-neutral-50 px-3 py-2 text-sm text-neutral-800 dark:border-neutral-600 dark:text-neutral-200'
              />
            </View>

            <View className='flex-1 gap-2'>
              <Medium className='text-xs text-neutral-600 dark:text-neutral-400'>Fees</Medium>
              <TextInput
                value={slot.fees.toString()}
                onChangeText={(text) => onFieldChange(slot.id, 'fees', parseFloat(text) || 0)}
                placeholderTextColor='#9ca3af'
                keyboardType='decimal-pad'
                className='dark:bg-neutral-750 rounded-lg border border-neutral-300 bg-neutral-50 px-3 py-2 text-sm text-neutral-800 dark:border-neutral-600 dark:text-neutral-200'
              />
            </View>
          </View>
        </View>

        <View className='border-t border-neutral-200 pt-4 dark:border-neutral-700'>
          <View className='flex-row gap-3'>
            <View className='flex-1 gap-2'>
              <Medium className='text-xs text-neutral-600 dark:text-neutral-400'>Start Date</Medium>
              <TouchableOpacity
                onPress={() => onTogglePicker(slot.id, 'startDate')}
                activeOpacity={0.7}
                className='dark:bg-neutral-750 rounded-lg border border-neutral-300 bg-neutral-50 p-3 dark:border-neutral-600'
              >
                <SemiBold className='text-sm text-neutral-800 dark:text-neutral-200'>
                  {slot.startDate.toLocaleDateString('en-IN')}
                </SemiBold>
              </TouchableOpacity>
              {slot.showPicker === 'startDate' && (
                <DateTimePicker
                  value={slot.startDate}
                  mode='date'
                  onChange={(event, date) => onTimeChange(slot.id, 'startDate', event, date)}
                />
              )}
            </View>

            <View className='flex-1 gap-2'>
              <Medium className='text-xs text-neutral-600 dark:text-neutral-400'>End Date</Medium>
              <TouchableOpacity
                onPress={() => onTogglePicker(slot.id, 'endDate')}
                activeOpacity={0.7}
                className='dark:bg-neutral-750 rounded-lg border border-neutral-300 bg-neutral-50 p-3 dark:border-neutral-600'
              >
                <SemiBold className='text-sm text-neutral-800 dark:text-neutral-200'>
                  {slot.endDate?.toLocaleDateString('en-IN') || 'Select date'}
                </SemiBold>
              </TouchableOpacity>
              {slot.showPicker === 'endDate' && (
                <DateTimePicker
                  value={slot.endDate || new Date()}
                  mode='date'
                  onChange={(event, date) => onTimeChange(slot.id, 'endDate', event, date)}
                />
              )}
            </View>
          </View>
        </View>
      </View>
    </View>
  )
}
