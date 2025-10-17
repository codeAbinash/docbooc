import FabIcon from '@components/FabIcon'
import { PaddingTop } from '@components/SafePadding'
import PlusSignIcon from '@hugeicons/PlusSignIcon'
import { Header } from '@/UserScreens/BookAppointment/components/Header'
import { HPNavProp } from '@utils/types'
import { ScrollView, View } from 'react-native'

export default function DoctorDetails({ navigation }: HPNavProp) {
  return (
    <View className='bg flex-1'>
      <PaddingTop />
      <Header title='Doctor Details' />
      <ScrollView></ScrollView>
      <FabIcon
        Icon={<PlusSignIcon color='white' strokeWidth={2} />}
        onPress={() => navigation.navigate('AddDoctorSchedule')}
      />
    </View>
  )
}
