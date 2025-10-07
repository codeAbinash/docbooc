import { doctors } from '@/constants'
import { Medium, Regular, SemiBold } from '@utils/fonts'
import { Image, TouchableOpacity, TouchableOpacityProps, View } from 'react-native'

type DoctorCardProps = {
  doctor: (typeof doctors)[0]
} & TouchableOpacityProps

export function DoctorCard({ doctor, ...rest }: DoctorCardProps) {
  return (
    <TouchableOpacity className='rounded-3xl bg-white p-3 dark:bg-neutral-900' activeOpacity={0.7} {...rest}>
      <View className='flex-row items-center'>
        {/* <View className='mr-4 size-[80px] items-center justify-center rounded-2xl bg-accent/20'>
              <SemiBold className='text-xl text-accent'>{getInitials(doctor.name)}</SemiBold>
            </View> */}

        {/* <DoctorIcon width={80} height={80} style={{ marginRight: 16 }} /> */}
        <Image
          source={{
            uri: 'https://st4.depositphotos.com/7877830/25337/v/450/depositphotos_253374286-stock-illustration-vector-illustration-male-doctor-avatar.jpg',
          }}
          className='mr-4 size-20 rounded-2xl'
          resizeMode='cover'
        />
        <View className='flex-1'>
          <SemiBold className='text text-lg'>{doctor.name}</SemiBold>
          <Medium className='text text-sm opacity-70'>MBBS, MD (General Medicine)</Medium>
          <Medium className='text text-sm text-accent opacity-70'>General Physician</Medium>
          <Regular className='text-sm text-neutral-500 dark:text-neutral-400'>20+ years of experience</Regular>
        </View>
      </View>
    </TouchableOpacity>
  )
}
