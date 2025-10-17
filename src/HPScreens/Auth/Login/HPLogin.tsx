import Animations from '@assets/animations/animations'
import Button from '@components/Button'
import Input from '@components/Input'
import KeyboardAvoid from '@components/KeyboardAvoid'
import Label from '@components/Label'
import { Lottie } from '@components/Lottie'
import { TC_and_PP } from '@components/TC_and_PP'
import { Black, Bold, Medium } from '@utils/fonts'
import { NavProp } from '@utils/types'
import { View } from 'react-native'

export default function HPLogin({ navigation }: NavProp) {
  return (
    <KeyboardAvoid className='bg h-full flex-1'>
      {/* <PaddingTop /> */}
      <View className='h-screen flex-1 items-center justify-between p-5'>
        <View className='w-full gap-10'>
          <Lottie source={Animations.doctor} style={{ width: '100%', height: 300, marginTop: -50 }} />
          <View className='gap-16'>
            <View className='items-center justify-center gap-1'>
              <Bold className='text text-3xl'>Welcome to</Bold>
              <Black className='text text-5xl'>DocBook</Black>
              <Bold className='text text-4xl'>Console</Bold>
              <Medium className='text mt-3 text-sm opacity-70'>Please enter your phone number to login.</Medium>
            </View>
            <View className='gap-5'>
              <View className='gap-2'>
                <Label>Email Address</Label>
                <View className='flex flex-row gap-3'>
                  <Input
                    placeholder='Enter your email address'
                    keyboardType='email-address'
                    style={{ flex: 1, fontSize: 13 }}
                  />
                </View>
              </View>
              <Button title='Send OTP' onPress={() => navigation.navigate('OTP')} />
            </View>
          </View>
          <TC_and_PP />
        </View>
      </View>
      {/* <PaddingBottom /> */}
    </KeyboardAvoid>
  )
}
