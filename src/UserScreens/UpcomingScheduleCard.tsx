import Gradient from '@components/Gradient'
import Press from '@components/Press'
import Calendar03Icon from '@hugeicons/Calendar03Icon'
import Call02Icon from '@hugeicons/Call02Icon'
import Time04Icon from '@hugeicons/Time04Icon'
import Colors from '@utils/colors'
import { Regular, SemiBold } from '@utils/fonts'
import { Image, View } from 'react-native'

interface UpcomingScheduleCardProps {
  data?: {
    doctorName: string
    specialization: string
    date: string
    time: string
    image?: string
  }
}

export default function UpcomingScheduleCard({ data }: UpcomingScheduleCardProps) {
  if (!data) return null

  return (
    <Gradient className='overflow-hidden rounded-3xl bg-accent p-5'>
      <View className='flex-row items-center justify-between'>
        <View className='flex-row items-center gap-4'>
          <View className='h-14 w-14 items-center justify-center rounded-full bg-white/20'>
            <Image
              source={{
                uri:
                  data.image ||
                  'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=100&h=100&fit=crop&crop=face',
              }}
              className='h-12 w-12 rounded-full'
              resizeMode='cover'
            />
          </View>

          <View>
            <SemiBold className='text-lg text-white'>{data.doctorName}</SemiBold>
            <Regular className='text-sm text-white/80'>{data.specialization}</Regular>
          </View>
        </View>

        <Press className='h-14 w-14 items-center justify-center rounded-full bg-white'>
          <Call02Icon color={Colors.accent} size={22} variant='solid-rounded' />
        </Press>
      </View>

      <View className='mt-3 flex-row items-center gap-6 px-2 py-1'>
        <View className='flex-row items-center gap-2'>
          <View className='h-8 w-8 items-center justify-center rounded-lg bg-white/20'>
            <Calendar03Icon color='white' size={16} strokeWidth={2} />
          </View>
          <Regular className='text-sm text-white'>{data.date}</Regular>
        </View>
        <View className='flex-row items-center gap-2'>
          <View className='h-8 w-8 items-center justify-center rounded-lg bg-white/20'>
            <Time04Icon color='white' size={16} strokeWidth={2} />
          </View>
          <Regular className='text-sm text-white'>{data.time}</Regular>
        </View>
      </View>
    </Gradient>
  )
}
