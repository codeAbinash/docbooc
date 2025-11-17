import { Medium, SemiBold } from '@utils/fonts'
import { View, TouchableOpacity, ScrollView } from 'react-native'
import Calendar01Icon from '@hugeicons/Calendar01Icon'
import Cancel01Icon from '@hugeicons/Cancel01Icon'
import { useColorScheme } from 'nativewind'
import { useState } from 'react'

type ScheduleCardProps = {
  type: 'weekly' | 'daily' | 'monthly'
  schedules: Array<{
    key: string
    id: string
    scheduleDayId?: string
    day?: string
    date?: number
    slots: string[]
    maxBookings?: number
  }>
  onDelete?: (id: string) => void
  onDeleteDay?: (scheduleDayId: string) => void
  onSelectSchedule?: (scheduleKey: string, slotIndex: number) => void
}

const CONFIG = {
  weekly: {
    title: 'Weekly Schedule',
    color: '#3b82f6',
    bgColor: 'bg-blue-100/50 dark:bg-blue-900/20',
    prefix: 'Every',
  },
  daily: {
    title: 'Daily Schedule',
    color: '#3b82f6',
    bgColor: 'bg-blue-100/50 dark:bg-blue-900/20',
    prefix: 'Every day',
  },
  monthly: {
    title: 'Monthly Schedule',
    color: '#3b82f6',
    bgColor: 'bg-blue-100/50 dark:bg-blue-900/20',
    prefix: 'Every month on',
  },
}

export default function ScheduleCard({ type, schedules, onDelete, onDeleteDay, onSelectSchedule }: ScheduleCardProps) {
  const config = CONFIG[type]
  const { colorScheme } = useColorScheme()
  const [selectedKey, setSelectedKey] = useState<string | null>(null)

  const handleSelection = (scheduleKey: string, slotIndex: number) => {
    const newKey = selectedKey === scheduleKey ? null : scheduleKey
    setSelectedKey(newKey)
    onSelectSchedule?.(scheduleKey, slotIndex)
  }

  const getScheduleFrequency = (type: string) => {
    switch (type) {
      case 'daily':
        return 'Every day'
      case 'weekly':
        return 'Every week'
      case 'monthly':
        return 'Every month'
      default:
        return ''
    }
  }
  const getScheduleDay = (type: string, schedule: any) => {
    switch (type) {
      case 'daily':
        return '-'
      case 'weekly':
        return schedule.day
      case 'monthly':
        return `${schedule.date}${getOrdinalSuffix(schedule.date)}`
      default:
        return ''
    }
  }
  const getOrdinalSuffix = (day: number) => {
    if (day > 3 && day < 21) return 'th'
    switch (day % 10) {
      case 1:
        return 'st'
      case 2:
        return 'nd'
      case 3:
        return 'rd'
      default:
        return 'th'
    }
  }
  const parseTimeSlot = (slot: string) => {
    const parts = slot.split(' to ')
    return {
      startTime: parts[0] || '',
      endTime: parts[1] || '',
    }
  }
  const getDeleteHandler = (schedule: any) => {
    if (type === 'daily') {
      return onDelete ? () => onDelete(schedule.id) : undefined
    } else if ((type === 'weekly' || type === 'monthly') && schedule.scheduleDayId && onDeleteDay) {
      return () => onDeleteDay(schedule.scheduleDayId)
    } else if (onDelete) {
      return () => onDelete(schedule.id)
    }
    return undefined
  }
  return (
    <View className='gap-4'>
      {/* Card with Heading and Rows */}
      <View className='overflow-hidden rounded-lg border border-neutral-200 bg-white dark:border-neutral-700 dark:bg-zinc-900'>
        {/* Heading */}
        <View className='border-b border-neutral-200 px-3 py-3 dark:border-neutral-700'>
          <View className='flex-row items-center gap-2'>
            <View className={`rounded-md p-2 ${config.bgColor}`}>
              <Calendar01Icon size={24} color={config.color} strokeWidth={2} />
            </View>
            <SemiBold className='text-lg text-neutral-800 dark:text-neutral-200'>{config.title}</SemiBold>
          </View>
        </View>
        {/* Table Header */}
        <View className='border-b border-neutral-200 bg-neutral-50/50 px-5 py-2 dark:border-neutral-700 dark:bg-neutral-800/30'>
          <View className='flex-row items-center gap-2'>
            <View className='mr-2 w-6' />
            <View style={{ flex: 0.5, minWidth: 80 }}>
              <Medium className='text-sm font-semibold text-neutral-600 dark:text-neutral-400'>Frequency</Medium>
            </View>
            <View style={{ flex: 0.5, minWidth: 60 }}>
              <Medium className='text-sm font-semibold text-neutral-600 dark:text-neutral-400'>Day</Medium>
            </View>
            <View style={{ flex: 0.5, minWidth: 30 }}>
              <Medium className='text-sm font-semibold text-neutral-600 dark:text-neutral-400'>Max</Medium>
            </View>
            <View style={{ flex: 1, minWidth: 125 }}>
              <Medium className='text-sm font-semibold text-neutral-600 dark:text-neutral-400'>Time</Medium>
            </View>
          </View>
        </View>
        {/* Table Rows */}
        <View>
          {schedules.map((schedule, scheduleIndex) => (
            <View key={schedule.key}>
              {schedule.slots.map((slot, slotIndex) => (
                <View key={slotIndex}>
                  {(scheduleIndex > 0 || slotIndex > 0) && (
                    <View className='h-[1px] bg-neutral-200 dark:bg-neutral-700' />
                  )}
                  <TouchableOpacity
                    onPress={() => handleSelection(schedule.key, slotIndex)}
                    activeOpacity={0.7}
                    className={
                      selectedKey === schedule.key ? 'bg-blue-100 dark:bg-blue-900/20' : 'bg-white dark:bg-zinc-900'
                    }
                  >
                    <View className='flex-row items-center gap-2 px-4 py-4'>
                      {/* HeroUI-inspired Radio Button */}
                      <TouchableOpacity
                        onPress={() => handleSelection(schedule.key, slotIndex)}
                        className='mr-2 w-7 items-center justify-center'
                      >
                        <View
                          className={`h-6 w-6 items-center justify-center rounded-full border-2 ${
                            selectedKey === schedule.key
                              ? 'border-blue-600 bg-blue-600'
                              : 'border-neutral-300 bg-white dark:border-neutral-600 dark:bg-zinc-800'
                          }`}
                        >
                          {selectedKey === schedule.key && <View className='h-2.5 w-2.5 rounded-full bg-white' />}
                        </View>
                      </TouchableOpacity>
                      {/* Frequency Column */}
                      <View style={{ flex: 0.5, minWidth: 80 }}>
                        <Medium className='text-sm text-neutral-700 dark:text-neutral-300' numberOfLines={1}>
                          {getScheduleFrequency(type)}
                        </Medium>
                      </View>
                      {/* Day Column */}
                      <View style={{ flex: 0.5, minWidth: 60 }}>
                        <Medium className='text-sm text-neutral-700 dark:text-neutral-300' numberOfLines={1}>
                          {getScheduleDay(type, schedule)}
                        </Medium>
                      </View>
                      {/* Max Column */}
                      <View style={{ flex: 0.5, minWidth: 30 }}>
                        <Medium className='text-sm text-neutral-700 dark:text-neutral-300' numberOfLines={1}>
                          {schedule.maxBookings || '-'}
                        </Medium>
                      </View>
                      {/* Time Column */}
                      <View style={{ flex: 1, minWidth: 125 }}>
                        <Medium className='text-sm text-neutral-700 dark:text-neutral-300' numberOfLines={1}>
                          {slot}
                        </Medium>
                      </View>
                    </View>
                  </TouchableOpacity>
                </View>
              ))}
            </View>
          ))}
        </View>
      </View>
    </View>
  )
}
