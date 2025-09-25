import Animations from '@assets/animations/animations'
import Button from '@components/Button'
import { Lottie } from '@components/Lottie'
import { PaddingBottom, PaddingTop } from '@components/SafePadding'
import Slider from '@components/Slider/Slider'
import { useNavigation } from '@react-navigation/native'
import { Header } from '@screens/BookAppointment/components/Header'
import RadioGenderSelector, { Gender } from '@screens/PatientInfo/RadioGenderSelector'
import Colors from '@utils/colors'
import { MEDIUM, SemiBold } from '@utils/fonts'
import { StackNav } from '@utils/types'
import { useState } from 'react'
import { TextInput, TextInputProps, View } from 'react-native'

const PatientInfo = ({}: {}) => {
  const navigation = useNavigation<StackNav>()
  const [selectedGender, setSelectedGender] = useState<Gender>()

  return (
    <View className='bg flex-1'>
      <PaddingTop />
      <Header title='Patient Info' />
      <View className='flex-1 gap-3 p-5'>
        <View className='gap-2'>
          <Label>Name</Label>
          <Input placeholder='Enter your full name' keyboardType='default' />
        </View>
        <View className='gap-2'>
          <Label>Gender</Label>
          <RadioGenderSelector selectedGender={selectedGender} onGenderChange={setSelectedGender} />
        </View>
        <View className='gap-2'>
          <Label>Age</Label>
          <Input placeholder='Enter your age' keyboardType='numeric' />
        </View>
        <View className='gap-2'>
          <Label>Mobile</Label>
          <Input placeholder='Enter your mobile number' keyboardType='phone-pad' />
        </View>
      </View>
      <View className='px-6 pb-2 pt-2'>
        <Button title='Save ' />
      </View>
      <PaddingBottom />
    </View>
  )
}

function Label({ children }: { children: React.ReactNode }) {
  return <SemiBold className='text text-sm'>{children}</SemiBold>
}

function Input({ placeholder, ...props }: TextInputProps) {
  return (
    <TextInput
      className='b rounded-2xl bg-white text-sm placeholder:text-zinc-500 dark:bg-zinc-900 dark:text-white'
      placeholder={placeholder}
      style={{
        ...MEDIUM,
        borderRadius: 12,
        paddingVertical: 15,
        paddingHorizontal: 16,
        paddingLeft: 16,
      }}
      selectionHandleColor={Colors.accent}
      selectionColor={Colors.accent + '77'}
      {...props}
    />
  )
}

export default PatientInfo
