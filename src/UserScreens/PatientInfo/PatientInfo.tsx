import Button from '@components/Button'
import CustomHeader from '@components/CustomHeader'
import Press from '@components/Press'
import { PaddingBottom } from '@components/SafePadding'
import Slider from '@components/Slider/Slider'
import { useNavigation } from '@react-navigation/native'
import RadioGenderSelector, { Gender } from '@/UserScreens/PatientInfo/RadioGenderSelector'
import { Medium, SemiBold } from '@utils/fonts'
import { StackNav } from '@utils/types'
import { useState } from 'react'
import { ScrollView, TextInput, View, useColorScheme } from 'react-native'

const PatientInfo = ({}: {}) => {
  const navigation = useNavigation<StackNav>()
  const scheme = useColorScheme()
  const [name, setName] = useState('')
  const [selectedGender, setSelectedGender] = useState<Gender>()
  const [age, setAge] = useState('')
  const [mobile, setMobile] = useState('')
  const [isFamilyMember, setIsFamilyMember] = useState(false)
  const [relationName, setRelationName] = useState('')

  const handleContinue = () => {
    if (isFamilyMember) {
      navigation.goBack()
    } else {
      navigation.navigate('Complete')
    }
  }

  return (
    <View className='flex-1 bg-neutral-100 dark:bg-neutral-900'>
      <CustomHeader title='Patient Information' showBackButton onBackPress={() => navigation.goBack()} />

      <ScrollView showsVerticalScrollIndicator={false} className='flex-1'>
        {/* Form Section */}
        <View className='gap-4 px-5 py-6'>
          {/* Name */}
          <View>
            <Medium className='mb-2 text-sm text-neutral-600 dark:text-neutral-400'>Full Name (Required) *</Medium>
            <TextInput
              value={name}
              onChangeText={setName}
              placeholder='Enter your full name'
              className='rounded-xl border border-neutral-300 bg-white px-4 py-3 dark:border-neutral-600 dark:bg-neutral-800 dark:text-white'
              placeholderTextColor={scheme === 'dark' ? '#9ca3af' : '#d1d5db'}
            />
          </View>

          {/* Gender */}
          <View>
            <Medium className='mb-2 text-sm text-neutral-600 dark:text-neutral-400'>Gender (Required) *</Medium>
            <RadioGenderSelector selectedGender={selectedGender} onGenderChange={setSelectedGender} />
          </View>

          {/* Age */}
          <View>
            <Medium className='mb-2 text-sm text-neutral-600 dark:text-neutral-400'>Age (Required) *</Medium>
            <TextInput
              value={age}
              onChangeText={setAge}
              placeholder='Enter your age'
              keyboardType='numeric'
              className='rounded-xl border border-neutral-300 bg-white px-4 py-3 dark:border-neutral-600 dark:bg-neutral-800 dark:text-white'
              placeholderTextColor={scheme === 'dark' ? '#9ca3af' : '#d1d5db'}
            />
          </View>

          {/* Mobile */}
          <View>
            <Medium className='mb-2 text-sm text-neutral-600 dark:text-neutral-400'>Mobile Number (Required) *</Medium>
            <TextInput
              value={mobile}
              onChangeText={setMobile}
              keyboardType='phone-pad'
              placeholder='Enter your mobile number'
              className='rounded-xl border border-neutral-300 bg-white px-4 py-3 dark:border-neutral-600 dark:bg-neutral-800 dark:text-white'
              placeholderTextColor={scheme === 'dark' ? '#9ca3af' : '#d1d5db'}
            />
          </View>

          {/* Family Member Toggle */}
          <View>
            <Press
              onPress={() => setIsFamilyMember(!isFamilyMember)}
              className='flex-row items-center justify-between rounded-xl border border-neutral-300 bg-white px-4 py-3 dark:border-neutral-600 dark:bg-neutral-800'
            >
              <Medium className='text-neutral-900 dark:text-white'>Save as Family Member</Medium>
              <View
                className={`h-6 w-11 rounded-full ${isFamilyMember ? 'bg-blue-600' : 'bg-neutral-300'}`}
                style={{ justifyContent: 'center' }}
              >
                <View className={`h-5 w-5 rounded-full bg-white ${isFamilyMember ? 'ml-5' : 'ml-0.5'}`} />
              </View>
            </Press>
          </View>

          {/* Relation (Conditional) */}
          {isFamilyMember && (
            <View>
              <Medium className='mb-2 text-sm text-neutral-600 dark:text-neutral-400'>Relation (Required) *</Medium>
              <TextInput
                value={relationName}
                onChangeText={setRelationName}
                placeholder='e.g., Father, Mother, Son, Daughter'
                className='rounded-xl border border-neutral-300 bg-white px-4 py-3 dark:border-neutral-600 dark:bg-neutral-800 dark:text-white'
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
          <View className='gap-3 '>
                  <Button title='Confirm Booking' progressFill={100} onPress={() => navigation.navigate('Complete')} />
                </View>
        )}
      </View>
      <PaddingBottom />
    </View>
  )
}

export default PatientInfo
