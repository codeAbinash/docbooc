import Animations from '@assets/animations/animations'
import Button from '@components/Button'
import InputWithLabel from '@components/InputWithLabel'
import KeyboardAvoid from '@components/KeyboardAvoid'
import Label from '@components/Label'
import { Lottie } from '@components/Lottie'
import { PaddingBottom, PaddingTop } from '@components/SafePadding'
import { TC_and_PP } from '@components/TC_and_PP'
import { Black, Bold, Medium } from '@utils/fonts'
import { NavProp } from '@utils/types'
import { useEffect } from 'react'
import { View } from 'react-native'

export default function HPLogin({ navigation }: NavProp) {
  return (
    <KeyboardAvoid className='bg h-full flex-1'>
      <PaddingTop />
      <View className='h-screen flex-1 items-center justify-between p-5'>
        <View className='w-full gap-10'>
          <Lottie source={Animations.doctor} style={{ width: '100%', height: 300, marginTop: -50 }} />
          <View className='gap-16'>
            <View className='items-center justify-center gap-1'>
              <Bold className='text text-3xl'>Welcome to</Bold>
              <Black className='text text-5xl'>DocBook</Black>
              <Medium className='text mt-3 text-sm opacity-70'>Please enter your phone number to login.</Medium>
            </View>
            <View className='gap-5'>
              <InputWithLabel label='Phone Number' placeholder='Enter your phone number' keyboardType='phone-pad' />
              <Button title='Send OTP' onPress={() => navigation.navigate('OTP')} />
            </View>
          </View>
          <TC_and_PP />
        </View>
      </View>
      <PaddingBottom />
    </KeyboardAvoid>
  )
}
