import Clock03Icon from '@hugeicons/Clock03Icon'
import TimeScheduleIcon from '@hugeicons/TimeScheduleIcon'
import DateTimePicker, { DateTimePickerEvent } from '@react-native-community/datetimepicker'
import Colors from '@utils/colors'
import { Medium, SemiBold } from '@utils/fonts'
import { useState } from 'react'
import { Platform, TouchableOpacity, View } from 'react-native'

export type TimeSlot = {
  id: string
  startTime: Date
  endTime: Date
  showPicker?: 'start' | 'end'
}

export const formatTime = (date: Date) =>
  date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true })

type TimeButtonProps = {
  slot: TimeSlot
  type: 'start' | 'end'
  onTogglePicker: (id: string, type: 'start' | 'end') => void
  onTimeChange: (id: string, type: 'start' | 'end', event: DateTimePickerEvent, date?: Date) => void
}

export function TimeButton({ slot, type, onTogglePicker, onTimeChange }: TimeButtonProps) {
  const isStart = type === 'start'
  const time = isStart ? slot.startTime : slot.endTime
  const label = isStart ? 'Start' : 'End'

  return (
    <View className='flex-1'>
      <TouchableOpacity onPress={() => onTogglePicker(slot.id, type)} activeOpacity={0.8}>
        <View className='flex-row items-center rounded-xl bg-black/5 p-3 dark:bg-white/5'>
          <View className='mr-3 p-1'>
            {type === 'start' ? (
              <TimeScheduleIcon size={20} color={Colors.accent} strokeWidth={1.9} />
            ) : (
              <Clock03Icon size={20} color={Colors.accent} strokeWidth={1.9} />
            )}
          </View>
          <View>
            <Medium className='text-sm text-neutral-500 dark:text-neutral-400'>{label}</Medium>
            <SemiBold className='text-md text-neutral-900 dark:text-white'>{formatTime(time)}</SemiBold>
          </View>
        </View>
      </TouchableOpacity>
      {slot.showPicker === type && (
        <DateTimePicker
          value={time}
          mode='time'
          is24Hour={false}
          onChange={(e, d) => onTimeChange(slot.id, type, e, d)}
        />
      )}
    </View>
  )
}

type TimeSelectorProps = {
  startTime: Date
  endTime: Date
  onStartTimeChange: (date: Date) => void
  onEndTimeChange: (date: Date) => void
}

export default function TimeSelector({ startTime, endTime, onStartTimeChange, onEndTimeChange }: TimeSelectorProps) {
  const [showStartPicker, setShowStartPicker] = useState(false)
  const [showEndPicker, setShowEndPicker] = useState(false)

  const handleStartTimeChange = (event: DateTimePickerEvent, date?: Date) => {
    if (event.type === 'set' && date) {
      onStartTimeChange(date)
    }
    if (Platform.OS === 'android') {
      setShowStartPicker(false)
    }
  }

  const handleEndTimeChange = (event: DateTimePickerEvent, date?: Date) => {
    if (event.type === 'set' && date) {
      onEndTimeChange(date)
    }
    if (Platform.OS === 'android') {
      setShowEndPicker(false)
    }
  }

  return (
    <View className='flex-row gap-3'>
      <View className='flex-1'>
        <TouchableOpacity onPress={() => setShowStartPicker(!showStartPicker)} activeOpacity={0.8}>
          <View className='flex-row items-center rounded-xl bg-black/5 p-3 dark:bg-white/5'>
            <View className='mr-3 p-1'>
              <TimeScheduleIcon size={20} color={Colors.accent} strokeWidth={1.9} />
            </View>
            <View>
              <Medium className='text-sm text-neutral-500 dark:text-neutral-400'>Start</Medium>
              <SemiBold className='text-md text-neutral-900 dark:text-white'>{formatTime(startTime)}</SemiBold>
            </View>
          </View>
        </TouchableOpacity>
        {showStartPicker && (
          <DateTimePicker value={startTime} mode='time' is24Hour={false} onChange={handleStartTimeChange} />
        )}
      </View>

      <View className='flex-1'>
        <TouchableOpacity onPress={() => setShowEndPicker(!showEndPicker)} activeOpacity={0.8}>
          <View className='flex-row items-center rounded-xl bg-black/5 p-3 dark:bg-white/5'>
            <View className='mr-3 p-1'>
              <Clock03Icon size={20} color={Colors.accent} strokeWidth={1.9} />
            </View>
            <View>
              <Medium className='text-sm text-neutral-500 dark:text-neutral-400'>End</Medium>
              <SemiBold className='text-md text-neutral-900 dark:text-white'>{formatTime(endTime)}</SemiBold>
            </View>
          </View>
        </TouchableOpacity>
        {showEndPicker && (
          <DateTimePicker value={endTime} mode='time' is24Hour={false} onChange={handleEndTimeChange} />
        )}
      </View>
    </View>
  )
}
