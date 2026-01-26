import { Medium, SemiBold } from '@utils/fonts'
import { View, TouchableOpacity, ScrollView } from 'react-native'
import Calendar01Icon from '@hugeicons/Calendar01Icon'
import Cancel01Icon from '@hugeicons/Cancel01Icon'
import { useColorScheme } from 'nativewind'
import { useState, memo } from 'react'
import { Skeleton } from '@components/Skeleton'

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
  showSelector?: boolean
  selectedKey?: string | null
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

export default function ScheduleCard({
  type,
  schedules,
  onDelete,
  onDeleteDay,
  onSelectSchedule,
  showSelector = true,
  selectedKey: externalSelectedKey = null,
}: ScheduleCardProps) {
  const config = CONFIG[type]
  const { colorScheme } = useColorScheme()
  const [internalSelectedKey, setInternalSelectedKey] = useState<string | null>(null)
  const selectedKey = externalSelectedKey !== null ? externalSelectedKey : internalSelectedKey

  const handleSelection = (scheduleKey: string, slotIndex: number) => {
    if (externalSelectedKey === null) {
      const newKey = internalSelectedKey === scheduleKey ? null : scheduleKey
      setInternalSelectedKey(newKey)
    }
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
        return 'Everyday'
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
      {/* Header with gradient */}
      <View className='px-0.5'>
        <SemiBold className='mb-1 text-lg text-neutral-900 dark:text-white'>{config.title}</SemiBold>
        <Medium className='text-sm text-neutral-500 dark:text-neutral-400'>
          {schedules.reduce((sum, s) => sum + s.slots.length, 0)} time slots
        </Medium>
      </View>

      {/* Slots as list view */}
      {schedules.length === 0 ? (
        <View className='items-center justify-center rounded-2xl bg-neutral-100 px-6 py-12 dark:bg-neutral-800/50'>
          <Calendar01Icon size={40} color='#a3a3a3' strokeWidth={1.5} />
          <Medium className='mt-3 text-neutral-500 dark:text-neutral-400'>No schedules available</Medium>
        </View>
      ) : (
        <View className='gap-2'>
          {schedules.map((schedule) =>
            schedule.slots.map((slot, slotIndex) => {
              const isSelected = selectedKey === schedule.key
              const timeSlot = parseTimeSlot(slot)
              const dayLabel = getScheduleDay(type, schedule)

              return (
                <TouchableOpacity
                  key={`${schedule.key}-${slotIndex}`}
                  onPress={() => handleSelection(schedule.key, slotIndex)}
                  activeOpacity={0.7}
                >
                  <View className='flex-row items-center gap-3 overflow-hidden rounded-lg border border-neutral-200 bg-white px-4 py-3 dark:border-neutral-700 dark:bg-neutral-800'>
                    {showSelector && (
                      <View
                        className='h-6 w-6 flex-shrink-0 items-center justify-center rounded-md border-2'
                        style={{
                          borderColor: isSelected ? '#3b82f6' : '#d1d5db',
                          backgroundColor: isSelected ? '#3b82f6' : 'transparent',
                        }}
                      >
                        {isSelected && <View className='h-3 w-3 rounded-sm bg-white' />}
                      </View>
                    )}

                    {/* Content */}
                    <View className='flex-1'>
                      <Medium className='text-base font-medium text-neutral-900 dark:text-white'>
                        {dayLabel} | {timeSlot.startTime}
                        {timeSlot.endTime}
                      </Medium>
                      {schedule.maxBookings && (
                        <Medium className='mt-1 text-sm text-neutral-500 dark:text-neutral-400'>
                          Max bookings {schedule.maxBookings}
                        </Medium>
                      )}
                    </View>

                    {getDeleteHandler(schedule) && (
                      <TouchableOpacity
                        onPress={getDeleteHandler(schedule)}
                        className='flex-shrink-0 p-1 active:opacity-70'
                        hitSlop={{ top: 6, bottom: 6, left: 6, right: 6 }}
                      >
                        <Cancel01Icon size={14} color='#ef4444' strokeWidth={2.5} />
                      </TouchableOpacity>
                    )}
                  </View>
                </TouchableOpacity>
              )
            }),
          )}
        </View>
      )}
    </View>
  )
}

export const ScheduleCardShimmer = memo(() => (
  <Skeleton>
    <View className='gap-4'>
      <View className='px-0.5'>
        <View className='mb-2 h-6 w-40 animate-pulse rounded-md bg-neutral-200 dark:bg-neutral-700' />
        <View className='h-4 w-24 animate-pulse rounded-md bg-neutral-200 dark:bg-neutral-700' />
      </View>

      <View className='gap-2'>
        {Array.from({ length: 3 }).map((_, index) => (
          <View
            key={index}
            className='flex-row items-center gap-3 rounded-lg border border-neutral-200 bg-white px-4 py-3 dark:border-neutral-700 dark:bg-neutral-800'
          >
            <View className='h-6 w-6 animate-pulse rounded-md bg-neutral-200 dark:bg-neutral-700' />
            <View className='flex-1 gap-2'>
              <View className='h-5 w-3/4 animate-pulse rounded-md bg-neutral-200 dark:bg-neutral-700' />
              <View className='h-4 w-1/2 animate-pulse rounded-md bg-neutral-200 dark:bg-neutral-700' />
            </View>
          </View>
        ))}
      </View>
    </View>
  </Skeleton>
))
