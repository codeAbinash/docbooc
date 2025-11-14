import { Medium, SemiBold } from '@utils/fonts'
import { View, TouchableOpacity } from 'react-native'
import Calendar03Icon from '@hugeicons/Calendar03Icon'
import Colors from '@utils/colors'
import { useColorScheme } from 'nativewind'
import CallIcon from '@hugeicons/CallIcon'

type ScheduleCardProps = {
  type: 'weekly' | 'daily' | 'monthly'
  schedules: Array<{
    id: string
    day?: string
    date?: number
    slots: string[]
  }>
  onDelete?: (id: string) => void
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

export default function ScheduleCard({ type, schedules, onDelete }: ScheduleCardProps) {
  const config = CONFIG[type]
  const { colorScheme } = useColorScheme()

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
            key={schedule.id}
            className='overflow-hidden rounded-xl border border-neutral-100 bg-white dark:border-neutral-700 dark:bg-neutral-800'
          >
            {schedule.slots.map((slot, slotIndex) => (
              <View key={slotIndex}>
                <View className='flex-row items-center justify-between p-4'>
                  <Medium className='flex-1 text-base'>
                    {type === 'weekly' && `${config.prefix} ${schedule.day} ${slot}`}
                    {type === 'daily' && `${config.prefix} ${slot}`}
                    {type === 'monthly' && `${config.prefix} ${schedule.date}th ${slot}`}
                  </Medium>
                  {onDelete && slotIndex === 0 && (
                    <TouchableOpacity
                      onPress={() => onDelete(schedule.id)}
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
