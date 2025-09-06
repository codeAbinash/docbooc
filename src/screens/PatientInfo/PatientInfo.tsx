import Button from '@components/Button'
import { PaddingBottom, PaddingTop } from '@components/SafePadding'
import { useNavigation } from '@react-navigation/native'
import { Header } from '@screens/BookAppointment/components/Header'
import { F, MEDIUM, Medium } from '@utils/fonts'
import { StackNav } from '@utils/types'
import { TextInput, View } from 'react-native'

const PatientInfo = ({}: {}) => {
  const navigation = useNavigation<StackNav>()

  return (
    <View className='bg flex-1'>
      <PaddingTop />
      <Header title='Patient Info' />
      <View className='flex-1 p-5'>
        <View>
          <Medium>Name</Medium>
          <TextInput className='line rounded-2xl bg-white p-3 px-5 py-4' placeholder='Enter your name' style={MEDIUM} />
        </View>
      </View>
      <View className='px-6 pb-2 pt-2'>
        <Button title='Next' onPress={() => navigation.navigate('PatientInfo')} />
      </View>
      <PaddingBottom />
    </View>
  )
}

export default PatientInfo
