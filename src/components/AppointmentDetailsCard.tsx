import Calendar03Icon from '@assets/icons/hugeicons/Calendar03Icon'
import Time04Icon from '@assets/icons/hugeicons/Time04Icon'
import InfoCard from '@components/InfoCard'
import { Bold, Medium, SemiBold } from '@utils/fonts'
import { View } from 'react-native'

type AppointmentDetails = {
  date: string
  day?: string
  time: string
  queueNumber?: number
  status?: 'provisional' | 'confirmed'
}

type AppointmentDetailsCardProps = {
  appointment: AppointmentDetails
}

export default function AppointmentDetailsCard({ appointment }: AppointmentDetailsCardProps) {
  const icon = (
    <View className='mr-3 rounded-full bg-purple-50 p-2 dark:bg-purple-900/20'>
      <Calendar03Icon size={24} color='#a855f7' />
    </View>
  )

  return (
    <InfoCard title='Appointment Details' icon={icon}>
      <View className='gap-4'>
        <View className='flex-row items-center'>
          <View className='mr-3 rounded-full bg-purple-50 p-2 dark:bg-purple-900/20'>
            <Calendar03Icon size={18} color='#a855f7' />
          </View>
          <View className='flex-1'>
            <Medium className='text-xs text-neutral-500 dark:text-neutral-400'>Date</Medium>
            <SemiBold className='text text-base'>{appointment.date}</SemiBold>
            {appointment.day && (
              <Medium className='text-xs text-neutral-500 dark:text-neutral-400'>{appointment.day}</Medium>
            )}
          </View>
        </View>

        <View className='flex-row items-center'>
          <View className='mr-3 rounded-full bg-orange-50 p-2 dark:bg-orange-900/20'>
            <Time04Icon size={18} color='#f97316' />
          </View>
          <View className='flex-1'>
            <Medium className='text-xs text-neutral-500 dark:text-neutral-400'>Time</Medium>
            <SemiBold className='text text-base'>{appointment.time}</SemiBold>
          </View>
        </View>

        {appointment.status && (
          <View className='flex-row items-center justify-between rounded-2xl bg-blue-50 p-4 dark:bg-blue-900/20'>
            <Medium className='text-sm text-blue-700 dark:text-blue-400'>Status</Medium>
            <Bold
              className={`text-lg ${
                appointment.status === 'confirmed'
                  ? 'text-green-700 dark:text-green-400'
                  : 'text-orange-700 dark:text-orange-400'
              }`}
            >
              {appointment.status === 'confirmed' ? 'Confirmed' : 'Provisional'}
            </Bold>
          </View>
        )}

        {appointment.queueNumber && (
          <View className='flex-row items-center justify-between rounded-2xl bg-blue-50 p-4 dark:bg-blue-900/20'>
            <Medium className='text-sm text-blue-700 dark:text-blue-400'>Queue Number</Medium>
            <Bold className='text-lg text-blue-700 dark:text-blue-400'>#{appointment.queueNumber}</Bold>
          </View>
        )}
      </View>
    </InfoCard>
  )
}
