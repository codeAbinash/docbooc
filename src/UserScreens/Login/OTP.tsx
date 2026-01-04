import authStore from '@/zustand/authStore'
import Button from '@components/Button'
import { PaddingBottom, PaddingTop } from '@components/SafePadding'
import { RouteProp, useRoute } from '@react-navigation/native'
import { useMutation } from '@tanstack/react-query'
import { api } from '@utils/client'
import { Bold, Medium, SEMIBOLD, SemiBold } from '@utils/fonts'
import { NavProp } from '@utils/types'
import { useColorScheme } from 'nativewind'
import { useEffect, useState } from 'react'
import { Pressable, Text, ToastAndroid, View, useWindowDimensions } from 'react-native'
import { OtpInput } from 'react-native-otp-entry'
import colors from 'tailwindcss/colors'
import { RootStackParamList } from '../../../App'

export default function OTP({ navigation }: NavProp) {
  const { colorScheme } = useColorScheme()
  const { width } = useWindowDimensions()
  const [otp, setOtp] = useState('')
  const [timeLeft, setTimeLeft] = useState(30)
  const route = useRoute<RouteProp<RootStackParamList, 'OTP'>>()
  const { countryCode = '+91', mobileNumber = '' } = route.params ?? {}
  const setToken = authStore((data) => data.setToken)

  const { mutate, isPending } = useMutation({
    mutationKey: ['verify-otp', otp],
    mutationFn: async () =>
      await (
        await api.users['verify-code'].$post({
          json: {
            code: otp,
            phone: mobileNumber,
          },
        })
      ).json(),
    onSuccess: (data) => {
      console.log(data)
      if (!data.success) return ToastAndroid.show('Invalid OTP, please try again.', ToastAndroid.SHORT)
      if (data.data?.token) setToken(data.data.token)
      ToastAndroid.show('OTP verified successfully!', ToastAndroid.SHORT)
      navigation.reset({ index: 0, routes: [{ name: 'Home' }] })
    },
  })

  const otpBoxWidth = Math.floor((width - 40 - 60) / 6)

  useEffect(() => {
    if (timeLeft <= 0) return
    const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000)
    return () => clearTimeout(timer)
  }, [timeLeft])

  const handleResendOtp = () => {
    setTimeLeft(30)
  }

  return (
    <View className='flex-1 bg-white dark:bg-black'>
      <PaddingTop />
      <View className='flex-1 bg-white dark:bg-zinc-950'>
        <View className='flex-1 px-5'>
          <Pressable onPress={() => navigation.goBack()} className='mb-8 self-end'>
            <Text className='text-2xl font-bold text-black dark:text-white'>✕</Text>
          </Pressable>

          <View className='flex-1 gap-6'>
            <View className='gap-4'>
              <Bold className='text-2xl text-black dark:text-white'>Enter the OTP we sent you</Bold>

              <View className='flex-row items-start justify-between'>
                <View className='flex-1 gap-1'>
                  <SemiBold className='text-base text-black dark:text-white'>
                    {countryCode} {mobileNumber}
                  </SemiBold>
                  <Medium className='text-sm text-zinc-600 dark:text-zinc-400'>Mobile number</Medium>
                </View>
                <Pressable onPress={() => navigation.goBack()}>
                  <Text className='font-semibold text-blue-600 underline'>Edit</Text>
                </Pressable>
              </View>
            </View>

            <View className='gap-4'>
              <Medium className='text-sm text-zinc-600 dark:text-zinc-400'>Enter OTP (One Time Password)</Medium>
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
                  containerStyle: {
                    marginLeft: 'auto',
                    marginRight: 'auto',
                    gap: 8,
                  },
                  pinCodeContainerStyle: {
                    borderColor: colorScheme === 'dark' ? colors.zinc[700] : colors.zinc[300],
                    height: 'auto',
                    paddingTop: 12,
                    paddingBottom: 12,
                    width: otpBoxWidth,
                    borderWidth: 2,
                    borderRadius: 10,
                  },
                  focusedPinCodeContainerStyle: {
                    borderColor: colorScheme === 'dark' ? colors.zinc[500] : colors.zinc[700],
                  },
                  filledPinCodeContainerStyle: {
                    borderColor: colorScheme === 'dark' ? colors.zinc[500] : colors.zinc[700],
                  },
                  pinCodeTextStyle: {
                    ...SEMIBOLD,
                    fontSize: 18,
                    color: colorScheme === 'dark' ? colors.zinc[300] : colors.zinc[900],
                  },
                }}
              />
            </View>

            <Button
              title={isPending ? 'Verifying OTP...' : 'Verify OTP'}
              onPress={() => mutate()}
              disabled={isPending || otp.length < 6}
            />

            <View className='gap-2'>
              {timeLeft > 0 ? (
                <Medium className='text-center text-sm text-zinc-600 dark:text-zinc-400'>
                  Didn't get the OTP? Try again in{' '}
                  <Text className='font-semibold text-orange-500'>00:{timeLeft.toString().padStart(2, '0')}</Text>
                </Medium>
              ) : (
                <Pressable onPress={handleResendOtp} className='items-center'>
                  <Text className='font-semibold text-blue-600 underline'>Resend OTP</Text>
                </Pressable>
              )}
            </View>
          </View>

          <View className='flex items-center justify-center gap-2 pb-3'>
            <View>
              <Medium className='text-center text-xs text-zinc-600 dark:text-zinc-400'>
                By 'logging in' I agree to the
              </Medium>
            </View>

            <View className='flex-row items-center justify-center gap-8'>
              <Pressable onPress={() => {}}>
                <Text className='font-semibold text-blue-600 underline'>Terms & Conditions</Text>
              </Pressable>
            </View>
          </View>
        </View>
      </View>
      <PaddingBottom />
    </View>
  )
}
