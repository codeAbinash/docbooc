import Doctor01Icon from '@assets/icons/hugeicons/Doctor01Icon'
import InfoCard from '@components/InfoCard'
import Colors from '@utils/colors'
import { Bold, Medium } from '@utils/fonts'
import { Image, View } from 'react-native'

type Doctor = {
  name: string
  specialty: string
  qualification?: string
  experience?: string
  image: string
}

type DoctorInfoCardProps = {
  doctor: Doctor
}

export default function DoctorInfoCard({ doctor }: DoctorInfoCardProps) {
  const icon = (
    <View className='mr-3 rounded-full bg-blue-50 p-2 dark:bg-blue-900/20'>
      <Doctor01Icon size={24} color={Colors.accent} />
    </View>
  )

  return (
    <InfoCard title='Doctor Information' icon={icon}>
      <View className='flex-row'>
        <Image source={{ uri: doctor.image }} className='mr-4 size-20 rounded-2xl' resizeMode='cover' />
        <View className='flex-1'>
          <Bold className='text text-xl'>{doctor.name}</Bold>
          <Medium className='mt-1 text-sm text-accent'>{doctor.specialty}</Medium>
          {doctor.qualification && <Medium className='text mt-2 text-sm opacity-70'>{doctor.qualification}</Medium>}
          {doctor.experience && (
            <Medium className='text-sm text-neutral-500 dark:text-neutral-400'>{doctor.experience}</Medium>
          )}
        </View>
      </View>
    </InfoCard>
  )
}
