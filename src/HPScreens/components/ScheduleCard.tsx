import { Medium, SemiBold } from '@utils/fonts'
import { View, TouchableOpacity } from 'react-native'
import Calendar03Icon from '@hugeicons/Calendar03Icon'
import Colors from '@utils/colors'
import { useColorScheme } from 'nativewind'
import CallIcon from '@hugeicons/CallIcon'

type ScheduleCardProps = {
  type: 'weekly' | 'daily' | 'monthly'
  schedules: Array<{
    key: string
    id: string
    scheduleDayId?: string
    day?: string
    date?: number
    slots: string[]
  }>
  onDelete?: (id: string) => void
  onDeleteDay?: (scheduleDayId: string) => void
}

const CONFIG = {
  weekly: {
    title: 'Weekly Schedule',
    color: '#a855f7',
    bgColor: 'bg-purple-100/50 dark:bg-purple-900/20',
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
    color: '#22c55e',
    bgColor: 'bg-green-100/50 dark:bg-green-900/20',
    prefix: 'Every month on',
  },
}

export default function ScheduleCard({ type, schedules, onDelete, onDeleteDay }: ScheduleCardProps) {
  const config = CONFIG[type]
  const { colorScheme } = useColorScheme()

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
      <View className='flex-row items-center gap-3'>
        <View className={`rounded-lg p-2.5 ${config.bgColor}`}>
          <Calendar03Icon size={20} color={config.color} strokeWidth={2} />
        </View>
        <SemiBold className='text-lg'>{config.title}</SemiBold>
      </View>

      <View className='gap-3'>
        {schedules.map((schedule) => (
          <View
            key={schedule.key}
            className='overflow-hidden rounded-xl border border-neutral-100 bg-white dark:border-neutral-700 dark:bg-neutral-800'
          >
            {(type === 'weekly' || type === 'monthly') && (
              <View className='flex-row items-center justify-between border-b border-neutral-100 bg-neutral-50/50 px-4 py-2.5 dark:border-neutral-700 dark:bg-neutral-900/30'>
                <SemiBold className='text-sm text-neutral-700 dark:text-neutral-300'>
                  {type === 'weekly' && schedule.day}
                  {type === 'monthly' && `Day ${schedule.date}`}
                </SemiBold>
                {getDeleteHandler(schedule) && (
                  <TouchableOpacity
                    onPress={getDeleteHandler(schedule)}
                    className='rounded-lg bg-red-50 p-1.5 dark:bg-red-900/20'
                  >
                    <CallIcon size={18} color='#ef4444' strokeWidth={2} />
                  </TouchableOpacity>
                )}
              </View>
            )}
            {schedule.slots.map((slot, slotIndex) => (
              <View key={slotIndex}>
                <View className='flex-row items-center justify-between p-4'>
                  <Medium className='flex-1 text-base'>
                    {type === 'weekly' && `${config.prefix} ${schedule.day} ${slot}`}
                    {type === 'daily' && `${config.prefix} ${slot}`}
                    {type === 'monthly' && `${config.prefix} ${schedule.date}th ${slot}`}
                  </Medium>
                  {type === 'daily' && slotIndex === 0 && getDeleteHandler(schedule) && (
                    <TouchableOpacity
                      onPress={getDeleteHandler(schedule)}
                      className='ml-3 rounded-lg bg-red-50 p-2 dark:bg-red-900/20'
                    >
                      <CallIcon size={20} color='#ef4444' strokeWidth={2} />
                    </TouchableOpacity>
                  )}
                </View>
                {slotIndex !== schedule.slots.length - 1 && (
                  <View className='h-[1px] w-full bg-neutral-100 dark:bg-neutral-700' />
                )}
              </View>
            ))}
          </View>
        ))}
      </View>
    </View>
  )
}
