import { Bold, Medium } from '@utils/fonts'
import { Image, View } from 'react-native'

export function DoctorCard() {
  const doctorData = {
    name: 'Dr. John Doe',
    specialty: 'Cardiologist',
    qualification: 'MBBS, MD, DM (Cardiology)',
    experience: '21+ Years of Experience',
    image:
      'https://st4.depositphotos.com/7877830/25337/v/450/depositphotos_253374286-stock-illustration-vector-illustration-male-doctor-avatar.jpg',
  }

  return (
    <View className='w-full overflow-hidden rounded-3xl bg-white p-6 shadow-sm dark:bg-zinc-900'>
      <View className='flex-row'>
        <Image source={{ uri: doctorData.image }} className='mr-4 size-20 rounded-2xl' resizeMode='cover' />
        <View className='flex-1'>
          <Bold className='text text-xl'>{doctorData.name}</Bold>
          <Medium className='mt-1 text-sm text-accent'>{doctorData.specialty}</Medium>
          <Medium className='text mt-2 text-sm opacity-70'>{doctorData.qualification}</Medium>
          <Medium className='text-sm text-neutral-500 dark:text-neutral-400'>{doctorData.experience}</Medium>
        </View>
      </View>
    </View>
  )
}
