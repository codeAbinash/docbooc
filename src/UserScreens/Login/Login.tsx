import Button from '@components/Button'
import { PaddingBottom } from '@components/SafePadding'
import { MEDIUM, Medium, SemiBold } from '@utils/fonts'
import { NavProp } from '@utils/types'

import KeyboardAvoid from '@components/KeyboardAvoid'
import PageCarousel from '@components/PageCarousel'
import { useMutation } from '@tanstack/react-query'
import { client } from '@utils/client'
import { useCallback, useState } from 'react'
import { Dimensions, Image, Pressable, TextInput, ToastAndroid, View } from 'react-native'

const { height: SCREEN_HEIGHT, width } = Dimensions.get('window')
const pages = [
  <View key='page1' className='flex-1 items-center justify-center bg-blue-100 dark:bg-blue-900'>
    <Image
      source={{
        uri: 'https://i.pinimg.com/1200x/61/dc/b5/61dcb5ceec9718a23d4cac21a594e8be.jpg',
      }}
      height={SCREEN_HEIGHT}
      width={width}
      className='absolute top-0'
    />
  </View>,
  <View key='page1' className='flex-1 items-center justify-center bg-blue-100 dark:bg-blue-900'>
    <Image
      source={{
        uri: 'https://i.pinimg.com/736x/86/0f/2c/860f2c6be081c2f1b0fc46bc01655664.jpg',
      }}
      height={SCREEN_HEIGHT}
      width={width}
    />
  </View>,
  <View key='page1' className='flex-1 items-center justify-center bg-blue-100 dark:bg-blue-900'>
    <Image
      source={{
        uri: 'https://i.pinimg.com/736x/2c/9c/c3/2c9cc35f2c3366fb392e5e5842d94742.jpg',
      }}
      height={SCREEN_HEIGHT}
      width={width}
    />
  </View>,
]

export default function Login({ navigation }: NavProp) {
  const [currentPage, setCurrentPage] = useState(0)
  const [countryCode, setCountryCode] = useState('+91')
  const [mobileNumber, setMobileNumber] = useState('')
  const [validationError, setValidationError] = useState('')

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
      console.log(data)
      if (!data.success) return ToastAndroid.show(data.message || 'Failed to send OTP', ToastAndroid.SHORT)
      navigation.navigate('OTP', { countryCode, mobileNumber })
    },
  })

  return (
    <View className='flex-1 bg-white dark:bg-black'>
      {/* <PaddingTop /> */}
      {/* <DefaultTransparent /> */}

      <KeyboardAvoid className=''>
        <View className='flex-1 justify-between bg-green-400'>
          <View className='absolute top-0 h-full flex-1 bg-white' style={{ height: SCREEN_HEIGHT, width: '100%' }}>
            <PageCarousel
              pages={pages}
              onPageChange={handlePageChange}
              showDots
              carouselHeightRatio={1}
              onSkip={handleSkip}
            />
            {/* <Image
              source={{
                uri: 'https://images.unsplash.com/photo-1766512433912-ba04869c2fbc?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
              }}
              height={SCREEN_HEIGHT}
              width={600}
            /> */}
            {/* <Lottie source={Animations.motorcycle} /> */}
          </View>
          <View></View>
          {/* <BottomSheet visible={true} onClose={() => {}} heightRatio={0.31}> */}
          <View className='rounded-t-[30px] bg-white px-6 py-4 pt-2.5'>
            <View className='mb-3 items-center py-2'>
              <View className='h-1 w-12 rounded-full bg-gray-300' />
            </View>
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
                value={mobileNumber}
                onChangeText={(text) => {
                  const cleaned = text.replace(/[^0-9]/g, '')
                  setMobileNumber(cleaned)
                  if (validationError) setValidationError('')
                }}
                style={[MEDIUM]}
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
                  By logging in I agree to the
                </Medium>
              </View>

              <View className='flex-row items-center justify-center gap-8'>
                <Pressable onPress={() => {}}>
                  <Medium className='text-sm font-semibold text-blue-600 underline'>Terms & Conditions</Medium>
                </Pressable>
              </View>
            </View>
          </View>
        </View>

        {/* </BottomSheet> */}
        <PaddingBottom />
      </KeyboardAvoid>
    </View>
  )
}
