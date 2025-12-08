import { PaddingBottom } from '@components/SafePadding'
import CustomHeader from '@components/CustomHeader'
import Button from '@components/Button'
import InputWithLabel from '@components/InputWithLabel'
import Press from '@components/Press'
import PlusSignIcon from '@assets/icons/hugeicons/PlusSignIcon'
import Location06Icon from '@assets/icons/hugeicons/Location06Icon'
import { useNavigation } from '@react-navigation/native'
import { HPStackNav } from '@utils/types'
import { Medium, SEMIBOLD, SemiBold } from '@utils/fonts'
import { useState } from 'react'
import { Image, ScrollView, View, useColorScheme, TextInput, Alert } from 'react-native'
import { PermissionsAndroid } from 'react-native'
import Geolocation from 'react-native-geolocation-service'
import KeyboardAvoid from '@components/KeyboardAvoid'

const PROFILE_DATA = {
  name: 'Subham Kundu',
  phone: '7479063583',
  pincode: '700160',
  state: 'West Bengal',
  city: 'New Town',
  houseNo: 'Kathjuridanga, milanpally',
  roadName: '367, Shapoorji Housing Complex, Action Area 3E',
  landmark: "JK's meditation",

  image:
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSmtxVett3yUOa0Aq9xlNS_AT9Bbyu7yak43g&s&fit=crop&w=100&h=100',
}

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

  const [name, setName] = useState(PROFILE_DATA.name)
  const [phone, setPhone] = useState(PROFILE_DATA.phone)
  const [pincode, setPincode] = useState(PROFILE_DATA.pincode)
  const [state, setState] = useState(PROFILE_DATA.state)
  const [city, setCity] = useState(PROFILE_DATA.city)
  const [houseNo, setHouseNo] = useState(PROFILE_DATA.houseNo)
  const [roadName, setRoadName] = useState(PROFILE_DATA.roadName)
  const [landmark, setLandmark] = useState(PROFILE_DATA.landmark)
  const [selectedLandmark, setSelectedLandmark] = useState(PROFILE_DATA.landmark)

  const [profileImage, setProfileImage] = useState(PROFILE_DATA.image)
  const [isLoading, setIsLoading] = useState(false)
  const [locationLoading, setLocationLoading] = useState(false)

  const handleUseLocation = async () => {
    setLocationLoading(true)
    try {
      const hasPermission = await requestLocationPermission()
      if (!hasPermission) {
        Alert.alert('Permission Denied', 'Location permission is required to auto-fill address details.')
        setLocationLoading(false)
        return
      }

      Geolocation.getCurrentPosition(
        async (position: any) => {
          const { latitude, longitude } = position.coords
          const addressData = await fetchAddressFromCoordinates(latitude, longitude)

          if (addressData) {
            setPincode(addressData.pincode)
            setState(addressData.state)
            setCity(addressData.city)
            setHouseNo(addressData.houseNo)
            setRoadName(addressData.roadName)
            Alert.alert('Success', 'Address details filled from your location.')
          } else {
            Alert.alert('Error', 'Could not fetch address details from your location.')
          }
          setLocationLoading(false)
        },
        (error: any) => {
          console.error('Geolocation error:', error)
          Alert.alert('Error', 'Failed to get your location. Please try again.')
          setLocationLoading(false)
        },
        { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 },
      )
    } catch (error) {
      console.error('Error:', error)
      Alert.alert('Error', 'An error occurred while fetching your location.')
      setLocationLoading(false)
    }
  }

  const handleSave = async () => {
    setIsLoading(true)
    try {
      // TODO: Add API call to save profile
      setTimeout(() => {
        setIsLoading(false)
        navigation.goBack()
      }, 1000)
    } catch (error) {
      setIsLoading(false)
      console.error('Error saving profile:', error)
    }
  }

  return (
    <View className='flex-1 bg-white dark:bg-neutral-900'>
      <CustomHeader title='Edit Address' showBackButton onBackPress={() => navigation.goBack()} />

      <KeyboardAvoid showsVerticalScrollIndicator={false} className='flex-1'>
        {/* Profile Picture Section */}
        <View className='items-center gap-4 px-5 py-8'>
          <View className='relative'>
            <Image
              source={{ uri: profileImage }}
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
                value={name}
                onChangeText={setName}
                placeholder='Enter your email address'
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
                onPress={handleUseLocation}
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
        <Button title='Save Address' onPress={handleSave} disabled={isLoading} />
      </View>
    </View>
  )
}
