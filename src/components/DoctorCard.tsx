import { doctors } from '@/constants'
import { Black, Medium, SemiBold } from '@utils/fonts'
import { Image, TouchableOpacity, TouchableOpacityProps, View } from 'react-native'

type DoctorCardProps = {
  doctor: (typeof doctors)[0]
} & TouchableOpacityProps

export function DoctorCard({ doctor, ...rest }: DoctorCardProps) {
  return (
    <TouchableOpacity className='rounded-3xl bg-white p-4 dark:bg-neutral-900' activeOpacity={0.7} {...rest}>
      <View>
        <View className='mb-3 flex-row items-center justify-between'>
          <View className='flex-row items-center'>
            <Image
              source={{
                uri: 'https://st4.depositphotos.com/7877830/25337/v/450/depositphotos_253374286-stock-illustration-vector-illustration-male-doctor-avatar.jpg',
              }}
              className='size-16 rounded-xl'
              resizeMode='cover'
            />
            <View className='ml-4'>
              <SemiBold className='text-lg'>{doctor.name}</SemiBold>
              <Medium className='text-sm text-accent'>General Physician</Medium>
            </View>
          </View>
          {/* <View className='items-end'>
            <Black className='text text-right text-2xl opacity-20'>Doc{'\n'}Book</Black>
          </View> */}
        </View>

        <View className='rounded-xl bg-neutral-100 p-3 dark:bg-neutral-800'>
          <View className='flex-row items-center justify-between'>
            <View>
              <Medium className='mb-1 text-xs text-neutral-500 dark:text-neutral-400'>Qualification</Medium>
              <SemiBold className='text-sm text-neutral-700 dark:text-neutral-200'>
                MBBS, MD (General Medicine)
              </SemiBold>
            </View>
            <View className='items-end'>
              <Medium className='mb-1 text-xs text-neutral-500 dark:text-neutral-400'>Experience</Medium>
              <SemiBold className='text-sm text-neutral-700 dark:text-neutral-200'>20+ years</SemiBold>
            </View>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  )
}
