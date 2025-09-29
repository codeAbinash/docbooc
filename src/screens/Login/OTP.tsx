import Animations from '@assets/animations/animations'
import Button from '@components/Button'
import { Lottie } from '@components/Lottie'
import { PaddingBottom, PaddingTop } from '@components/SafePadding'
import { Header } from '@screens/BookAppointment/components/Header'
import { Bold, Medium, SEMIBOLD, SemiBold } from '@utils/fonts'
import { NavProp } from '@utils/types'
import { useColorScheme } from 'nativewind'
import { StyleSheet, View } from 'react-native'
import { OtpInput } from 'react-native-otp-entry'
import colors from 'tailwindcss/colors'

export default function OTP({ navigation }: NavProp) {
  const { colorScheme } = useColorScheme()
  return (
    <View className='flex-1'>
      <View className='flex-1'>
        <PaddingTop />
        <Header title='' />
        <View className='flex-1 gap-10 p-6'>
          <Lottie source={Animations.lock} />
          <View className='gap-2'>
            <Bold className='text text-2xl'>OTP Verification</Bold>
            <Medium className='text text-base opacity-70'>
              A verification code has been sent to your mobile number.
            </Medium>
          </View>
          <OtpInput
            numberOfDigits={6}
            focusColor={colorScheme === 'dark' ? colors.zinc[300] : colors.zinc[700]}
            focusStickBlinkingDuration={500}
            blurOnFilled
            hideStick
            onTextChange={(text) => {}}
            // onFilled={verifyOtp}
            textInputProps={{
              accessibilityLabel: 'One-Time Password',
              selectionColor: 'transparent',
              caretHidden: true,
            }}
            theme={{
              containerStyle: styles.container,
              pinCodeContainerStyle: {
                borderColor: colorScheme === 'dark' ? colors.zinc[700] : colors.zinc[300],
                height: 'auto',
                paddingTop: 14,
                paddingBottom: 15,
                width: 50,
                borderWidth: 1.5,
              },
              focusedPinCodeContainerStyle: {
                borderColor: colorScheme === 'dark' ? '#A3A3A3' : '#4B5563',
              },
              filledPinCodeContainerStyle: {
                borderColor: colorScheme === 'dark' ? '#A3A3A3' : '#4B5563',
              },
              pinCodeTextStyle: {
                ...SEMIBOLD,
                fontSize: 15,
                color: colorScheme === 'dark' ? colors.zinc[300] : colors.zinc[700],
              },
            }}
          />
          {/* <Button title='Verify' onPress={() => navigation.reset({ index: 0, routes: [{ name: 'Home' }] })} /> */}
          <Button title='Verify' onPress={() => navigation.navigate('Home')} />
          <SemiBold className='text text-center text-sm opacity-70'>
            Didn't receive the code? <SemiBold className='text-accent'>Resend OTP</SemiBold>
          </SemiBold>
        </View>
        <PaddingBottom />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    marginLeft: 'auto',
    marginRight: 'auto',
  },
})
