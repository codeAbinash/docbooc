import { PaddingTop } from '@components/SafePadding'
import { Header } from '@screens/BookAppointment/components/Header'
import { Text, View } from 'react-native'

const AddDoctorSchedule = () => {
  return (
    <View className='bg flex-1'>
      <PaddingTop />
      <Header title='Add Doctor Schedule' />
      <Text>AddDoctorSchedule</Text>
    </View>
  )
}

export default AddDoctorSchedule
