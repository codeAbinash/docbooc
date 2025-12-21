import Button from '@components/Button'
import { PaddingBottom, PaddingTop } from '@components/SafePadding'
import PageCarousel from '@components/PageCarousel'
import BottomSheet from '@components/BottomSheet'
import { Bold, Medium, SemiBold } from '@utils/fonts'
import { NavProp } from '@utils/types'
import { useState, useMemo, useCallback } from 'react'
import { View, TextInput, Text, KeyboardAvoidingView, Platform } from 'react-native'

export default function Login({ navigation }: NavProp) {
  const [currentPage, setCurrentPage] = useState(0)
  const [countryCode, setCountryCode] = useState('+91')
  const [mobileNumber, setMobileNumber] = useState('')

  // Memoize pages to prevent recreation on every render
  const pages = useMemo(
    () => [
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
    ],
    [],
  )

  // Memoize callbacks to prevent unnecessary re-renders
  const handlePageChange = useCallback((page: number) => {
    setCurrentPage(page)
  }, [])

  const handleMobileNumberChange = useCallback((text: string) => {
    // Only allow numbers
    const cleaned = text.replace(/[^0-9]/g, '')
    setMobileNumber(cleaned)
  }, [])

  const handleGetOTP = useCallback(() => {
    navigation.navigate('OTP', { countryCode, mobileNumber })
  }, [countryCode, mobileNumber, navigation])

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={0}
      style={{ flex: 1 }}
    >
      <View className='flex-1 bg-white dark:bg-black'>
        <PaddingTop />

        <PageCarousel pages={pages} onPageChange={handlePageChange} showDots carouselHeightRatio={0.7} />

        <BottomSheet visible={true} onClose={() => {}} heightRatio={0.3}>
          <View className='px-6 py-4'>
            <Bold className='pb-4 text-xl text-black dark:text-white'>Login or create a new account</Bold>

            <View className='flex-row gap-2 rounded-lg border border-gray-300 bg-white dark:border-gray-600 dark:bg-gray-900'>
              <View className='w-20 items-center justify-center px-3 py-3'>
                <SemiBold className='text-xl text-black dark:text-white'>{countryCode}</SemiBold>
              </View>
              <View className='w-px bg-gray-300 dark:bg-gray-600' />
              <TextInput
                value={mobileNumber}
                onChangeText={handleMobileNumberChange}
                placeholder='Mobile number'
                keyboardType='phone-pad'
                maxLength={10}
                className='flex-1 px-3 py-3 text-xl text-black dark:text-white'
                placeholderTextColor='#999'
              />
            </View>

            <Button title='Get OTP' className='pt-6' onPress={handleGetOTP} />
          </View>
        </BottomSheet>

        <PaddingBottom />
      </View>
    </KeyboardAvoidingView>
  )
}
