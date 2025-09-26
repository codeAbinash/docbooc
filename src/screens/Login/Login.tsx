import Animations from '@assets/animations/animations'
import Button from '@components/Button'
import Input from '@components/Input'
import KeyboardAvoid from '@components/KeyboardAvoid'
import Label from '@components/Label'
import { Lottie } from '@components/Lottie'
import { PaddingBottom, PaddingTop } from '@components/SafePadding'
import { Black, Bold, Medium, SemiBold } from '@utils/fonts'
import { NavProp } from '@utils/types'
import { View } from 'react-native'

export default function Login({ navigation }: NavProp) {
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
              <View className='gap-2'>
                <Label>Phone Number</Label>
                <View className='flex flex-row gap-3'>
                  <Input value='+91' style={{ paddingRight: 18, fontSize: 13 }} editable={false} />
                  <Input
                    placeholder='Enter your phone number'
                    keyboardType='phone-pad'
                    style={{ flex: 1, fontSize: 13 }}
                  />
                </View>
              </View>
              <Button title='Send OTP' onPress={() => navigation.navigate('OTP')} />
            </View>
          </View>
        </View>
        <View>
          <SemiBold className='text text-center text-xs'>
            By continuing, you agree to our <SemiBold className='text-accent'>Terms of Service</SemiBold> and{' '}
            <SemiBold className='text-accent'>Privacy Policy</SemiBold>.
          </SemiBold>
        </View>
      </View>
      <PaddingBottom />
    </KeyboardAvoid>
  )
}
