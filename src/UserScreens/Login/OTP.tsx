import Animations from '@assets/animations/animations'
import Button from '@components/Button'
import { Lottie } from '@components/Lottie'
import { PaddingBottom, PaddingTop } from '@components/SafePadding'
import { Bold, Medium, SEMIBOLD, SemiBold } from '@utils/fonts'
import { NavProp } from '@utils/types'
import { useColorScheme } from 'nativewind'
import { Pressable, StyleSheet, Text, View } from 'react-native'
import { useRoute, RouteProp } from '@react-navigation/native'
import { RootStackParamList } from '../../../App'
import { OtpInput } from 'react-native-otp-entry'
import colors from 'tailwindcss/colors'
import { useState } from 'react'

export default function OTP({ navigation }: NavProp) {
  const { colorScheme } = useColorScheme()
  const [otp, setOtp] = useState('')
  const [timeLeft, setTimeLeft] = useState(23)
  const route = useRoute<RouteProp<RootStackParamList, 'OTP'>>()
  const { countryCode = '+91', mobileNumber = '' } = route.params ?? {}

  return (
    <View className='flex-1 bg-white dark:bg-black'>
      <PaddingTop />
      <View className='flex-1 bg-white dark:bg-zinc-950'>
        <View className='flex-1 px-6 pt-4'>
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
                <Pressable onPress={() => {}}>
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
                  containerStyle: styles.container,
                  pinCodeContainerStyle: {
                    borderColor: colorScheme === 'dark' ? colors.zinc[700] : colors.zinc[300],
                    height: 'auto',
                    paddingTop: 12,
                    paddingBottom: 12,
                    width: 48,
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

            <Button title='Verify OTP' onPress={() => navigation.reset({ index: 0, routes: [{ name: 'Home' }] })} />

            <View className='gap-2'>
              <Medium className='text-center text-sm text-zinc-600 dark:text-zinc-400'>
                Didn't get the OTP? Try again in{' '}
                <Text className='font-semibold text-orange-500'>00:{timeLeft.toString().padStart(2, '0')}</Text>
              </Medium>
            </View>
          </View>

          <View className='gap-3 pb-6 pt-4'>
            <Medium className='text-center text-xs text-zinc-600 dark:text-zinc-400'>
              By 'logging in' I agree to the
            </Medium>
            <View className='flex-row justify-center gap-8'>
              <Pressable onPress={() => {}}>
                <Text className='font-semibold text-blue-600 underline'>Terms & Conditions</Text>
              </Pressable>
              <Pressable onPress={() => {}}>
                <Text className='font-semibold text-blue-600 underline'>Privacy Policy</Text>
              </Pressable>
            </View>
          </View>
        </View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    marginLeft: 'auto',
    marginRight: 'auto',
    gap: 12,
  },
})
