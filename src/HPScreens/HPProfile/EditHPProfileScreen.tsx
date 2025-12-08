import { DEFAULT_PP_IMAGE } from '@/constants'
import popupStore from '@/zustand/popupStore'
import PlusSignIcon from '@assets/icons/hugeicons/PlusSignIcon'
import Button from '@components/Button'
import CustomHeader from '@components/CustomHeader'
import KeyboardAvoid from '@components/KeyboardAvoid'
import Press from '@components/Press'
import { useNavigation } from '@react-navigation/native'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { hpApi } from '@utils/client'
import { Medium, SEMIBOLD } from '@utils/fonts'
import { HPStackNav } from '@utils/types'
import { useEffect, useState } from 'react'
import { ActivityIndicator, Image, PermissionsAndroid, TextInput, View, useColorScheme } from 'react-native'
import { goodZodErrorMessage } from '../utils/goodZodError'

const requestLocationPermission = async () => {
  try {
    const granted = await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION, {
      title: 'Location Permission',
      message: 'This app needs access to your location to auto-fill address details.',
      buttonNeutral: 'Ask Me Later',
      buttonNegative: 'Cancel',
      buttonPositive: 'OK',
    })
    return granted === PermissionsAndroid.RESULTS.GRANTED
  } catch (err) {
    console.warn(err)
    return false
  }
}

const fetchAddressFromCoordinates = async (latitude: number, longitude: number) => {
  try {
    const response = await fetch(
      `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`,
    )
    const data = await response.json()
    const address = data.address

    return {
      pincode: address?.postcode || '',
      state: address?.state || '',
      city: address?.city || address?.town || address?.village || '',
      houseNo: address?.house_number || '',
      roadName: address?.road || address?.street || '',
    }
  } catch (error) {
    console.error('Error fetching address:', error)
    return null
  }
}

export default function EditHPProfileScreen() {
  const scheme = useColorScheme()
  const navigation = useNavigation<HPStackNav>()
  const queryClient = useQueryClient()
  const alert = popupStore((state) => state.alert)

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [pincode, setPincode] = useState('')
  const [state, setState] = useState('')
  const [city, setCity] = useState('')
  const [houseNo, setHouseNo] = useState('')
  const [roadName, setRoadName] = useState('')
  const [landmark, setLandmark] = useState('')
  const [profileImage, setProfileImage] = useState('')
  const [locationLoading, setLocationLoading] = useState(false)

  const { data: profileData, isLoading } = useQuery({
    queryKey: ['hp-profile'],
    queryFn: async () => (await (await hpApi.profile.$get()).json()).data?.hp,
  })

  useEffect(() => {
    console.log(profileData)

    if (profileData) {
      setName(profileData.name || '')
      setEmail(profileData.email || '')
      setPhone(profileData.contactNumber || '')
      setPincode(profileData.pin || '')
      setState(profileData.state || '')
      setCity(profileData.city || '')
      setHouseNo(profileData.houseNumber || '')
      setRoadName(profileData.roadName || '')
      setLandmark(profileData.landmark || '')
      setProfileImage(profileData.profileImage || '')
    }
  }, [profileData])

  const updateMutation = useMutation({
    mutationFn: async () => {
      const response = await (
        await hpApi.profile.$put({
          json: {
            name,
            contactNumber: phone,
            pin: pincode,
            state,
            city,
            houseNumber: houseNo,
            roadName,
            landmark,
            profileImage,
          },
        })
      ).json()
      return response
    },
    onSuccess: (data) => {
      console.log(data)
      if (!data.success) return alert('Error', goodZodErrorMessage(data.error) || '')
      queryClient.invalidateQueries({ queryKey: ['hp-profile'] })
      alert('Success', 'Profile updated successfully')
      navigation.goBack()
    },
    onError: () => {
      alert('Error', 'An unexpected error occurred. Please try again later.')
    },
  })

  const handleSave = () => {
    if (!name.trim()) {
      alert('Error', 'Please enter your full name')
      return
    }
    if (!email.trim()) {
      alert('Error', 'Please enter your email address')
      return
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      alert('Error', 'Please enter a valid email address')
      return
    }
    if (!phone.trim()) {
      alert('Error', 'Please enter your phone number')
      return
    }
    if (!pincode.trim()) {
      alert('Error', 'Please enter pincode')
      return
    }
    if (!state.trim()) {
      alert('Error', 'Please enter state')
      return
    }
    if (!city.trim()) {
      alert('Error', 'Please enter city')
      return
    }
    if (!houseNo.trim()) {
      alert('Error', 'Please enter House No., Building Name')
      return
    }
    if (!roadName.trim()) {
      alert('Error', 'Please enter Road name, Area, Colony')
      return
    }
    if (!landmark.trim()) {
      alert('Error', 'Please enter Landmark')
      return
    }

    updateMutation.mutate()
  }

  if (isLoading) {
    return (
      <View className='flex-1 bg-white dark:bg-neutral-900'>
        <CustomHeader title='Edit Address' showBackButton onBackPress={() => navigation.goBack()} />
        <View className='flex-1 items-center justify-center'>
          <ActivityIndicator size='large' color='#2563eb' />
          <Medium className='mt-4 text-neutral-600 dark:text-neutral-400'>Loading profile...</Medium>
        </View>
      </View>
    )
  }

  return (
    <View className='flex-1 bg-white dark:bg-neutral-900'>
      <CustomHeader title='Edit Address' showBackButton onBackPress={() => navigation.goBack()} />

      <KeyboardAvoid showsVerticalScrollIndicator={false} className='flex-1'>
        {/* Profile Picture Section */}
        <View className='items-center gap-4 px-5 py-8'>
          <View className='relative'>
            <Image
              source={{ uri: profileImage || DEFAULT_PP_IMAGE }}
              className='h-40 w-40 rounded-full border-4 border-blue-600'
              resizeMode='cover'
            />
            <Press className='absolute bottom-0 right-0 rounded-full bg-blue-600 p-3'>
              <PlusSignIcon size={20} color='white' strokeWidth={2} />
            </Press>
          </View>
          <Medium className='text-center text-sm text-neutral-500'>
            Tap the camera icon to change profile picture
          </Medium>
        </View>

        {/* Form Section */}
        <View className='gap-4 px-5 pb-6'>
          {/* Name and Phone */}
          <View className='gap-3'>
            <View>
              <Medium className='mb-2 text-sm text-neutral-600 dark:text-neutral-400'>Full Name (Required) *</Medium>
              <TextInput
                value={name}
                onChangeText={setName}
                placeholder='Enter your full name'
                className='rounded-xl border border-neutral-300 bg-white px-4 py-3 dark:border-neutral-600 dark:bg-neutral-800 dark:text-white'
                placeholderTextColor={scheme === 'dark' ? '#9ca3af' : '#9ca3af'}
                style={SEMIBOLD}
              />
            </View>
            <View>
              <Medium className='mb-2 text-sm text-neutral-600 dark:text-neutral-400'>
                Email Address (Required) *
              </Medium>
              <TextInput
                value={email}
                onChangeText={setEmail}
                placeholder='Enter your email address'
                keyboardType='email-address'
                autoCapitalize='none'
                className='rounded-xl border border-neutral-300 bg-white px-4 py-3 dark:border-neutral-600 dark:bg-neutral-800 dark:text-white'
                placeholderTextColor={scheme === 'dark' ? '#9ca3af' : '#9ca3af'}
                style={SEMIBOLD}
              />
            </View>

            <View>
              <Medium className='mb-2 text-sm text-neutral-600 dark:text-neutral-400'>Phone number (Required) *</Medium>
              <TextInput
                value={phone}
                onChangeText={setPhone}
                keyboardType='phone-pad'
                placeholder='Enter your phone number'
                className='rounded-xl border border-neutral-300 bg-white px-4 py-3 dark:border-neutral-600 dark:bg-neutral-800 dark:text-white'
                placeholderTextColor={scheme === 'dark' ? '#9ca3af' : '#9ca3af'}
                style={SEMIBOLD}
              />
            </View>

            <Press className='py-2'>
              <Medium className='text-base text-blue-600'>+ Add Alternate Phone Number</Medium>
            </Press>
          </View>

          {/* Pincode and Location */}
          <View className='flex-row gap-3'>
            <View className='flex-1'>
              <Medium className='mb-2 text-sm text-neutral-600 dark:text-neutral-400'>Pincode (Required) *</Medium>
              <TextInput
                value={pincode}
                onChangeText={setPincode}
                keyboardType='number-pad'
                placeholder='Pincode'
                className='rounded-xl border border-neutral-300 bg-white px-4 py-3 dark:border-neutral-600 dark:bg-neutral-800 dark:text-white'
                placeholderTextColor={scheme === 'dark' ? '#9ca3af' : '#9ca3af'}
                style={SEMIBOLD}
              />
            </View>
            <View className='flex-1'>
              <Medium className='mb-2 text-sm text-neutral-600 dark:text-neutral-400'></Medium>
              <Press
                disabled={locationLoading}
                className='flex-1 items-center justify-center rounded-xl bg-blue-600 px-4'
              >
                <Medium className='flex-row items-center justify-center text-white'>
                  {locationLoading ? ' Getting location...' : ' Use my location'}
                </Medium>
              </Press>
            </View>
          </View>

          {/* State and City */}
          <View className='flex-row gap-3'>
            <View className='flex-1'>
              <Medium className='mb-2 text-sm text-neutral-600 dark:text-neutral-400'>State (Required) *</Medium>
              <TextInput
                value={state}
                onChangeText={setState}
                placeholder='State'
                className='rounded-xl border border-neutral-300 bg-white px-4 py-3 dark:border-neutral-600 dark:bg-neutral-800 dark:text-white'
                placeholderTextColor={scheme === 'dark' ? '#9ca3af' : '#9ca3af'}
                style={SEMIBOLD}
              />
            </View>
            <View className='flex-1'>
              <Medium className='mb-2 text-sm text-neutral-600 dark:text-neutral-400'>City (Required) *</Medium>
              <TextInput
                value={city}
                onChangeText={setCity}
                placeholder='City'
                className='rounded-xl border border-neutral-300 bg-white px-4 py-3 dark:border-neutral-600 dark:bg-neutral-800 dark:text-white'
                placeholderTextColor={scheme === 'dark' ? '#9ca3af' : '#9ca3af'}
                style={SEMIBOLD}
              />
            </View>
          </View>

          {/* House No */}
          <View>
            <Medium className='mb-2 text-sm text-neutral-600 dark:text-neutral-400'>
              House No., Building Name (Required) *
            </Medium>
            <TextInput
              value={houseNo}
              onChangeText={setHouseNo}
              placeholder='House No., Building Name'
              className='rounded-xl border border-neutral-300 bg-white px-4 py-3 dark:border-neutral-600 dark:bg-neutral-800 dark:text-white'
              placeholderTextColor={scheme === 'dark' ? '#9ca3af' : '#9ca3af'}
              style={SEMIBOLD}
            />
          </View>

          {/* Road Name */}
          <View>
            <Medium className='mb-2 text-sm text-neutral-600 dark:text-neutral-400'>
              Road name, Area, Colony (Required) *
            </Medium>
            <TextInput
              value={roadName}
              onChangeText={setRoadName}
              placeholder='Road name, Area, Colony'
              className='rounded-xl border border-neutral-300 bg-white px-4 py-3 dark:border-neutral-600 dark:bg-neutral-800 dark:text-white'
              placeholderTextColor={scheme === 'dark' ? '#9ca3af' : '#9ca3af'}
              style={SEMIBOLD}
            />
          </View>

          {/* Landmark */}

          <View>
            <Medium className='mb-2 text-sm text-neutral-600 dark:text-neutral-400'>Landmark (Required) *</Medium>
            <TextInput
              value={landmark}
              onChangeText={setLandmark}
              placeholder='Road name, Area, Colony'
              className='rounded-xl border border-neutral-300 bg-white px-4 py-3 dark:border-neutral-600 dark:bg-neutral-800 dark:text-white'
              placeholderTextColor={scheme === 'dark' ? '#9ca3af' : '#9ca3af'}
              style={SEMIBOLD}
            />
          </View>
        </View>
      </KeyboardAvoid>

      {/* Save Button */}
      <View className='gap-3 border-t border-neutral-200 bg-white px-5 py-4 dark:border-neutral-700 dark:bg-neutral-800'>
        <Button
          title={updateMutation.isPending ? 'Saving...' : 'Save Address'}
          onPress={handleSave}
          disabled={updateMutation.isPending}
        />
      </View>
    </View>
  )
}
