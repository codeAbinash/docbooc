import Clock03Icon from '@hugeicons/Clock03Icon'
import TimeScheduleIcon from '@hugeicons/TimeScheduleIcon'
import DateTimePicker, { DateTimePickerEvent } from '@react-native-community/datetimepicker'
import Colors from '@utils/colors'
import { Medium, SemiBold } from '@utils/fonts'
import CustomTimePicker from '@/HPScreens/components/CustomTimePicker'
import { useState, useCallback } from 'react'
import { Platform, TouchableOpacity, View } from 'react-native'

export type TimeSlot = {
  id: string
  startTime: Date
  endTime: Date
  showPicker?: 'start' | 'end'
}

import { formatTime } from '@/HPScreens/components/CustomTimePicker'

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
  const [showPicker, setShowPicker] = useState(false)

  const handleTimeChange = useCallback(
    (date: Date) => {
      onTimeChange(slot.id, type, { type: 'set' } as DateTimePickerEvent, date)
    },
    [slot.id, type, onTimeChange],
  )

  const handleClose = useCallback(() => {
    setShowPicker(false)
    onTimeChange(slot.id, type, { type: 'dismissed' } as DateTimePickerEvent, undefined)
  }, [slot.id, type, onTimeChange])

  return (
    <View className='flex-1'>
      <TouchableOpacity onPress={() => setShowPicker(true)} activeOpacity={0.8}>
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
      <CustomTimePicker
        isVisible={showPicker}
        currentTime={time}
        onClose={handleClose}
        onSelectTime={handleTimeChange}
      />
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

  const handleStartTimeChange = useCallback(
    (date: Date) => {
      onStartTimeChange(date)
      setShowStartPicker(false)
    },
    [onStartTimeChange],
  )

  const handleEndTimeChange = useCallback(
    (date: Date) => {
      onEndTimeChange(date)
      setShowEndPicker(false)
    },
    [onEndTimeChange],
  )

  const handleStartClose = useCallback(() => {
    setShowStartPicker(false)
  }, [])

  const handleEndClose = useCallback(() => {
    setShowEndPicker(false)
  }, [])

  return (
    <View className='flex-row gap-3'>
      <View className='flex-1'>
        <TouchableOpacity onPress={() => setShowStartPicker(true)} activeOpacity={0.8}>
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
        <CustomTimePicker
          isVisible={showStartPicker}
          currentTime={startTime}
          onClose={handleStartClose}
          onSelectTime={handleStartTimeChange}
        />
      </View>

      <View className='flex-1'>
        <TouchableOpacity onPress={() => setShowEndPicker(true)} activeOpacity={0.8}>
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
        <CustomTimePicker
          isVisible={showEndPicker}
          currentTime={endTime}
          onClose={handleEndClose}
          onSelectTime={handleEndTimeChange}
        />
      </View>
    </View>
  )
}
