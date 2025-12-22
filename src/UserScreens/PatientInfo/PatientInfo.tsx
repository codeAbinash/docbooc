import Button from '@components/Button'
import HybridHead from '@components/HybridHead'
import Press from '@components/Press'
import BottomSheetCustom from '@components/BottomSheetCustom'
import { PaddingBottom } from '@components/SafePadding'
import { useNavigation } from '@react-navigation/native'
import RadioGenderSelector, { Gender } from '@/UserScreens/PatientInfo/RadioGenderSelector'
import { Medium, SemiBold } from '@utils/fonts'
import { StackNav } from '@utils/types'
import { useState } from 'react'
import { useRef } from 'react'
import { ScrollView, TextInput, View, useColorScheme, Dimensions, Keyboard } from 'react-native'
import DateTimePicker, { DateTimePickerEvent } from '@react-native-community/datetimepicker'
import Calendar03Icon from '@hugeicons/Calendar03Icon'
import Colors from '@utils/colors'

const { height: SCREEN_HEIGHT } = Dimensions.get('window')

const PatientInfo = ({}: {}) => {
  const navigation = useNavigation<StackNav>()
  const scheme = useColorScheme()

  const [name, setName] = useState('')
  const [selectedGender, setSelectedGender] = useState<Gender>()
  const [dob, setDob] = useState(new Date())
  const [showDatePicker, setShowDatePicker] = useState(false)
  const [mobile, setMobile] = useState('')
  const [otp, setOtp] = useState('')
  const [showOtpSheet, setShowOtpSheet] = useState(false)
  const [isFamilyMember, setIsFamilyMember] = useState(false)
  const [relationName, setRelationName] = useState('')
  const [mobileValidationError, setMobileValidationError] = useState('')
  const mobileRef = useRef<TextInput>(null)

  const handleDateChange = (event: DateTimePickerEvent, selectedDate?: Date) => {
    if (event.type === 'set' && selectedDate) {
      setDob(selectedDate)
    }
    setShowDatePicker(false)
  }

  const formatDate = (date: Date) => {
    const day = String(date.getDate()).padStart(2, '0')
    const month = String(date.getMonth() + 1).padStart(2, '0')
    const year = date.getFullYear()
    return `${day}/${month}/${year}`
  }

  const handleSendOtp = () => {
    if (mobile.trim().length === 0) {
      Keyboard.dismiss()
      setTimeout(() => {
        mobileRef.current?.focus()
      }, 200)
      setMobileValidationError('')
      return
    }
    if (mobile.length !== 10) {
      setMobileValidationError('Enter a valid number')
      return
    }
    setMobileValidationError('')
    setShowOtpSheet(true)
    setOtp('')
  }

  const handleOtpChange = (text: string) => {
    const numericText = text.replace(/[^0-9]/g, '')
    if (numericText.length <= 5) {
      setOtp(numericText)
    }
  }

  const handleVerifyOtp = () => {
    if (otp.length === 5) {
      // TODO: Call verify OTP API
      setShowOtpSheet(false)
    }
  }

  const handleContinue = () => {
    if (isFamilyMember) {
      navigation.goBack()
    } else {
      navigation.navigate('Complete')
    }
  }

  return (
    <View className='flex-1 bg-white dark:bg-neutral-900'>
      <HybridHead title='Patient Information' showBackButton onBackPress={() => navigation.goBack()} />

      <ScrollView showsVerticalScrollIndicator={false} className='flex-1'>
        {/* Form Section */}
        <View className='gap-4 px-5 py-6'>
          {/* Full Name (Required) */}
          <View>
            <Medium className='mb-2 text-sm text-neutral-700 dark:text-neutral-300'>Full Name (Required) *</Medium>
            <TextInput
              value={name}
              onChangeText={setName}
              placeholder='Enter your full name'
              className='rounded-xl border border-neutral-300 bg-white px-4 py-3 text-neutral-900 dark:border-neutral-600 dark:bg-neutral-800 dark:text-white'
              placeholderTextColor={scheme === 'dark' ? '#9ca3af' : '#d1d5db'}
            />
          </View>

          {/* Gender (Required) */}
          <View>
            <Medium className='mb-2 text-sm text-neutral-700 dark:text-neutral-300'>Gender (Required) *</Medium>
            <RadioGenderSelector selectedGender={selectedGender} onGenderChange={setSelectedGender} />
          </View>

          {/* Date of Birth (Required) */}
          <View>
            <Medium className='mb-2 text-sm text-neutral-700 dark:text-neutral-300'>Date of Birth (Required) *</Medium>
            <Press
              onPress={() => setShowDatePicker(true)}
              className='flex-row items-center gap-3 rounded-xl border border-neutral-300 bg-white px-4 py-3 dark:border-neutral-600 dark:bg-neutral-800'
            >
              <Calendar03Icon size={20} color={Colors.accent} strokeWidth={1.5} />
              <Medium className='flex-1 text-neutral-900 dark:text-white'>{formatDate(dob)}</Medium>
            </Press>
            {showDatePicker && (
              <DateTimePicker
                value={dob}
                mode='date'
                display='spinner'
                onChange={handleDateChange}
                maximumDate={new Date()}
              />
            )}
          </View>

          {/* Mobile Number (Required) */}
          <View>
            <Medium className='mb-2 text-sm text-neutral-700 dark:text-neutral-300'>Mobile Number (Required) *</Medium>
            <View className='flex-row gap-3'>
              <TextInput
                ref={mobileRef}
                value={mobile}
                onChangeText={(text) => {
                  const cleaned = text.replace(/[^0-9]/g, '')
                  setMobile(cleaned.slice(0, 10))
                  if (mobileValidationError) setMobileValidationError('')
                }}
                keyboardType='phone-pad'
                placeholder='Enter your mobile number'
                maxLength={10}
                className='flex-1 rounded-xl border bg-white px-4 py-3 text-neutral-900 dark:bg-neutral-800 dark:text-white'
                style={[
                  {
                    borderColor: mobileValidationError ? '#DC2626' : scheme === 'dark' ? '#525252' : '#d1d5db',
                    borderWidth: 1,
                  },
                ]}
                placeholderTextColor={scheme === 'dark' ? '#9ca3af' : '#d1d5db'}
              />
              <Press
                onPress={handleSendOtp}
                className='items-center justify-center rounded-xl border border-blue-600 bg-blue-600 px-4 py-3'
              >
                <Medium className='text-white disabled:text-neutral-500'>Send OTP</Medium>
              </Press>
            </View>
            {mobileValidationError && <Medium className='pt-2 text-sm text-red-600'>{mobileValidationError}</Medium>}
          </View>

          {/* Save as Family Member */}
          <View>
            <Press
              onPress={() => setIsFamilyMember(!isFamilyMember)}
              className='flex-row items-center gap-3 rounded-xl border border-neutral-300 bg-white px-4 py-3 dark:border-neutral-600 dark:bg-neutral-800'
            >
              <View
                className={`h-6 w-6 items-center justify-center rounded-full border-2 ${
                  isFamilyMember ? 'border-blue-600 bg-blue-600' : 'border-neutral-400 dark:border-neutral-600'
                }`}
              >
                {isFamilyMember && <View className='rounded-full h-3 w-3 bg-white' />}
              </View>
              <Medium className='text-neutral-900 dark:text-white'>Save as Family Member</Medium>
            </Press>
          </View>

          {/* Relation (Conditional) */}
          {isFamilyMember && (
            <View>
              <Medium className='mb-2 text-sm text-neutral-700 dark:text-neutral-300'>Relation (Required) *</Medium>
              <TextInput
                value={relationName}
                onChangeText={setRelationName}
                placeholder='Father, Mother, Son, Daughter...'
                className='rounded-xl border border-neutral-300 bg-white px-4 py-3 text-neutral-900 dark:border-neutral-600 dark:bg-neutral-800 dark:text-white'
                placeholderTextColor={scheme === 'dark' ? '#9ca3af' : '#d1d5db'}
              />
            </View>
          )}
        </View>
      </ScrollView>

      {/* Action Button */}
      <View className='gap-3 border-t border-neutral-200 bg-white px-5 py-4 dark:border-neutral-700 dark:bg-neutral-800'>
        {isFamilyMember ? (
          <Button title='Save Family Member' onPress={handleContinue} />
        ) : (
          <Button title='Confirm Booking' progressFill={100} onPress={() => navigation.navigate('Complete')} />
        )}
      </View>
      <PaddingBottom />

      {/* OTP Bottom Sheet */}
      <BottomSheetCustom visible={showOtpSheet} onClose={() => setShowOtpSheet(false)} height={SCREEN_HEIGHT * 0.3}>
        <View className='gap-4 px-5 py-6'>
          <SemiBold className='text-lg text-neutral-900 dark:text-white'>Enter OTP</SemiBold>
          <Medium className='text-sm text-neutral-600 dark:text-neutral-400'>
            We've sent a 5-digit OTP to {mobile}
          </Medium>

          <View>
            <Medium className='mb-2 text-sm text-neutral-700 dark:text-neutral-300'>Enter OTP (5 digits) *</Medium>
            <TextInput
              value={otp}
              onChangeText={handleOtpChange}
              placeholder='00000'
              keyboardType='numeric'
              maxLength={5}
              autoFocus
              className='rounded-xl border border-neutral-300 bg-white px-4 py-3 text-center text-3xl tracking-widest text-neutral-900 dark:border-neutral-600 dark:bg-neutral-800 dark:text-white'
              placeholderTextColor={scheme === 'dark' ? '#9ca3af' : '#d1d5db'}
            />
          </View>

          <View className='mt-4 gap-3'>
            <Button title='Verify OTP' onPress={handleVerifyOtp} disabled={otp.length !== 5} />
            <Press onPress={() => setShowOtpSheet(false)} className='items-center rounded-lg py-3'>
              <Medium className='text-blue-600 dark:text-blue-400'>Cancel</Medium>
            </Press>
          </View>
        </View>
      </BottomSheetCustom>
    </View>
  )
}

export default PatientInfo
