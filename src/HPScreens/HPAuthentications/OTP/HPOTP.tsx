import { Header } from '@/UserScreens/BookAppointment/components/Header'
import popupStore from '@/zustand/popupStore'
import Animations from '@assets/animations/animations'
import Button from '@components/Button'
import KeyboardAvoid from '@components/KeyboardAvoid'
import { Lottie } from '@components/Lottie'
import { PaddingBottom, PaddingTop } from '@components/SafePadding'
import { useMutation } from '@tanstack/react-query'
import { client } from '@utils/client'
import { Bold, Medium, SEMIBOLD, SemiBold } from '@utils/fonts'
import { HPNavProp } from '@utils/types'
import { useColorScheme } from 'nativewind'
import { useState } from 'react'
import { Alert, StyleSheet, View } from 'react-native'
import { OtpInput } from 'react-native-otp-entry'
import colors from 'tailwindcss/colors'

export default function HPOTP({ navigation, route }: HPNavProp) {
  const { colorScheme } = useColorScheme()
  const [otp, setOtp] = useState('')
  const alert = popupStore((state) => state.alert)

  const params = route.params && 'email' in route.params ? route.params : undefined
  const { email, password, name, isSignup } = params || {}

  const registerMutation = useMutation({
    mutationFn: async ({
      name,
      email,
      password,
      otp,
    }: {
      name: string
      email: string
      password: string
      otp: string
    }) => {
      return (
        await client.api.v1.hp.auth.register.$post({
          json: { name, email, password, otp },
        })
      ).json()
    },
    onSuccess: (data) => {
      if (data.success && data.data) {
        alert('Success', 'Account created successfully!')
        navigation.navigate('HPHome')
      } else {
        Alert.alert('Error', data.message || 'Invalid OTP or registration failed')
      }
    },
    onError: (error) => {
      Alert.alert('Error', 'Failed to verify OTP. Please try again.')
      console.error(error)
    },
  })

  const resendOtpMutation = useMutation({
    mutationFn: async (email: string) => {
      const response = await client.api.v1.hp.auth['verify-email'].$post({
        json: { email },
      })
      return response.json()
    },
    onSuccess: (data) => {
      if (data.success) {
        Alert.alert('Success', 'OTP sent successfully!')
      } else {
        Alert.alert('Error', data.message || 'Failed to resend OTP')
      }
    },
    onError: (error) => {
      Alert.alert('Error', 'Failed to resend OTP. Please try again.')
      console.error(error)
    },
  })

  function handleVerifyOTP() {
    if (otp.length !== 6) {
      Alert.alert('Error', 'Please enter a valid 6-digit OTP')
      return
    }

    if (!isSignup || !email || !password || !name) {
      Alert.alert('Error', 'Invalid signup flow. Please try again.')
      navigation.navigate('HPSignup')
      return
    }

    registerMutation.mutate({ name, email, password, otp })
  }

  function handleResendOTP() {
    if (!email) {
      Alert.alert('Error', 'Email not found. Please start over.')
      return
    }

    resendOtpMutation.mutate(email)
  }

  return (
    <KeyboardAvoid className='flex-1'>
      <View className='flex-1'>
        <PaddingTop />
        <Header title='' />
        <View className='flex-1 gap-10 p-6'>
          <Lottie source={Animations.loading} />
          <View className='gap-2'>
            <Bold className='text text-2xl'>OTP Verification</Bold>
            <Medium className='text text-base opacity-70'>
              A verification code has been sent to {email || 'your email'}.
            </Medium>
          </View>
          <OtpInput
            numberOfDigits={6}
            focusColor={colorScheme === 'dark' ? colors.zinc[300] : colors.zinc[700]}
            focusStickBlinkingDuration={500}
            blurOnFilled
            hideStick
            onTextChange={setOtp}
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
          <Button
            title={registerMutation.isPending ? 'Verifying...' : 'Verify & Sign Up'}
            onPress={handleVerifyOTP}
            disabled={registerMutation.isPending || otp.length !== 6}
          />
          <SemiBold className='text text-center text-sm opacity-70'>
            Didn't receive the code?{' '}
            <SemiBold className='text-accent' onPress={handleResendOTP}>
              Resend OTP
            </SemiBold>
          </SemiBold>
        </View>
        <PaddingBottom />
      </View>
    </KeyboardAvoid>
  )
}

const styles = StyleSheet.create({
  container: {
    marginLeft: 'auto',
    marginRight: 'auto',
  },
})
