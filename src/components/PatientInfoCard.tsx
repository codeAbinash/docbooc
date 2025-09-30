import PatientIcon from '@assets/icons/hugeicons/PatientIcon'
import InfoCard from '@components/InfoCard'
import InfoRow from '@components/InfoRow'
import Colors from '@utils/colors'
import { View } from 'react-native'

type Patient = {
  name: string
  age: string
  gender: string
  mobile: string
  relationship?: string
}

type PatientInfoCardProps = {
  patient: Patient
}

export default function PatientInfoCard({ patient }: PatientInfoCardProps) {
  const icon = (
    <View className='mr-3 rounded-full bg-green-50 p-2 dark:bg-green-900/20'>
      <PatientIcon size={24} color={Colors.success} />
    </View>
  )

  return (
    <InfoCard title='Patient Information' icon={icon}>
      <View className='gap-3'>
        <InfoRow label='Name' value={patient.name} />
        <InfoRow label='Age' value={`${patient.age} years`} />
        <InfoRow label='Gender' value={patient.gender} />
        <InfoRow label='Mobile' value={patient.mobile} />
        {patient.relationship && <InfoRow label='Relationship' value={patient.relationship} />}
      </View>
    </InfoCard>
  )
}
