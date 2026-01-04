import BottomSheet from '@components/BottomSheet'
import Button from '@components/Button'
import PageCarousel from '@components/PageCarousel'
import { PaddingBottom, PaddingTop } from '@components/SafePadding'
import { Bold, Medium, SemiBold } from '@utils/fonts'
import { NavProp } from '@utils/types'

import KeyboardAvoid from '@components/KeyboardAvoid'
import { useMutation } from '@tanstack/react-query'
import { client } from '@utils/client'
import { useCallback, useRef, useState } from 'react'
import { Pressable, Text, TextInput, ToastAndroid, View } from 'react-native'

const pages = [
  <View key='page1' className='flex-1 items-center justify-center bg-blue-100 dark:bg-blue-900'>
    <Bold className='text-3xl text-blue-900 dark:text-blue-100'>Page 1</Bold>
    <Medium className='pt-4 text-center text-blue-800 dark:text-blue-200'>Swipe to see more pages</Medium>
  </View>,
  <View key='page2' className='flex-1 items-center justify-center bg-purple-100 dark:bg-purple-900'>
    <Bold className='text-3xl text-purple-900 dark:text-purple-100'>Page 2</Bold>
    <Medium className='pt-4 text-center text-purple-800 dark:text-purple-200'>This is the second page</Medium>
  </View>,
  <View key='page3' className='flex-1 items-center justify-center bg-green-100 dark:bg-green-900'>
    <Bold className='text-3xl text-green-900 dark:text-green-100'>Page 3</Bold>
    <Medium className='pt-4 text-center text-green-800 dark:text-green-200'>And this is the third page</Medium>
  </View>,
]

export default function Login({ navigation }: NavProp) {
  const [currentPage, setCurrentPage] = useState(0)
  const [countryCode, setCountryCode] = useState('+91')
  const [mobileNumber, setMobileNumber] = useState('')
  const [validationError, setValidationError] = useState('')
  const inputRef = useRef<TextInput>(null)

  // Memoize pages to prevent recreation on every render

  // Memoize callbacks to prevent unnecessary re-renders
  const handlePageChange = useCallback((page: number) => {
    setCurrentPage(page)
  }, [])

  const handleGetOTP = useCallback(() => {
    if (mobileNumber.length === 0) {
      ToastAndroid.show('Please enter mobile number', ToastAndroid.SHORT)
      return
    }
    if (mobileNumber.length !== 10) {
      setValidationError('Mobile number must be 10 digits long')
      return
    }
    setValidationError('')
    mutate()
  }, [countryCode, mobileNumber, navigation])

  const handleSkip = useCallback(() => {
    navigation.reset({ index: 0, routes: [{ name: 'Home' }] })
  }, [navigation])

  const { mutate, isPending } = useMutation({
    mutationKey: ['request-otp', mobileNumber],
    mutationFn: async () =>
      await (
        await client.api.v1.users['send-code'].$post({
          json: {
            phone: mobileNumber,
          },
        })
      ).json(),
    onSuccess: (data) => {
      if (!data.success) return ToastAndroid.show(data.message || 'Failed to send OTP', ToastAndroid.SHORT)
      navigation.navigate('OTP', { countryCode, mobileNumber })
    },
  })

  return (
    <View className='flex-1 bg-white dark:bg-black'>
      <PaddingTop />

      <PageCarousel
        pages={pages}
        onPageChange={handlePageChange}
        showDots
        carouselHeightRatio={0.67}
        onSkip={handleSkip}
      />
      <KeyboardAvoid>
        <BottomSheet visible={true} onClose={() => {}} heightRatio={0.31}>
          <View className='px-6 py-4'>
            <SemiBold className='pb-4 text-xl text-black dark:text-white'>Login or create a new account</SemiBold>

            <View
              className='flex-row gap-2 rounded-xl border border-gray-300 bg-white dark:border-gray-600 dark:bg-gray-900'
              style={validationError ? { borderColor: '#DC2626' } : {}}
            >
              <View className='w-20 items-center justify-center px-3 py-3'>
                <SemiBold className='text-xl text-black dark:text-white'>{countryCode}</SemiBold>
              </View>
              <View className='w-px bg-gray-300 dark:bg-gray-600' />
              <TextInput
                ref={inputRef}
                value={mobileNumber}
                onChangeText={(text) => {
                  const cleaned = text.replace(/[^0-9]/g, '')
                  setMobileNumber(cleaned)
                  if (validationError) setValidationError('')
                }}
                placeholder='Mobile number'
                keyboardType='phone-pad'
                maxLength={10}
                className='flex-1 px-3 py-3 text-xl font-bold text-black dark:text-white'
                placeholderTextColor='#999'
              />
            </View>

            {validationError && <Medium className='text-sm text-red-600'>{validationError}</Medium>}

            <View className='pt-4'>
              <Button title={isPending ? 'Sending OTP...' : 'Get OTP'} onPress={handleGetOTP} disabled={isPending} />
            </View>

            <View className='flex items-center justify-center gap-2 pt-5'>
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
        </BottomSheet>
      </KeyboardAvoid>

      <PaddingBottom />
    </View>
  )
}
