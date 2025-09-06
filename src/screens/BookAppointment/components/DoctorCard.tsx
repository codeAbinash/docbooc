import { Bold, Medium } from '@utils/fonts'
import { View } from 'react-native'

export function DoctorCard() {
  return (
    <View className='w-full gap-1 rounded-3xl bg-white p-7 dark:bg-zinc-900'>
      <Bold className='text text-2xl'>Dr. John Doe</Bold>
      <Medium className='text-accent'>Cardiologist</Medium>
      <Medium className='text gray mt-3 text-sm'>MBBS, MD, DM (Cardiology)</Medium>
      <Medium className='text gray text-sm'>21+ Years of Experience</Medium>
    </View>
  )
}
