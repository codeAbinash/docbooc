import Button from '@components/Button'
import { PaddingBottom, PaddingTop } from '@components/SafePadding'
import { useNavigation } from '@react-navigation/native'
import Colors from '@utils/colors'
import { Bold, Medium, SemiBold } from '@utils/fonts'
import { StackNav } from '@utils/types'
import { useState } from 'react'
import { Image, TouchableOpacity, View } from 'react-native'
import { ScrollView } from 'react-native-gesture-handler'
import { DateCardContainer } from './components/DateCardContainer'
import { DoctorCard } from './components/DoctorCard'
import { Header } from './components/Header'

// Demo location data
const demoLocations = [
  {
    id: 1,
    mainText: 'City Hospital - Main Branch',
    secondaryText: '123 Medical Center Drive, Downtown',
    image: 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=400&h=300&fit=crop',
    distance: '2.5 km',
    isSelected: false,
  },
  {
    id: 2,
    mainText: 'Metro Medical Center',
    secondaryText:
      '456 Health Street, Metro Station. 456 Health Street, Metro Station. 456 Health Street, Metro Station.',
    image: 'https://images.unsplash.com/photo-1586773860418-d37222d8fce3?w=400&h=300&fit=crop',
    distance: '4.2 km',
    isSelected: true,
  },
  {
    id: 3,
    mainText: 'Sunrise Clinic',
    secondaryText: '789 Wellness Avenue, Sunrise District',
    image: 'https://images.unsplash.com/photo-1551601651-2a8555f1a136?w=400&h=300&fit=crop',
    distance: '6.8 km',
    isSelected: false,
  },
  {
    id: 4,
    mainText: 'Green Valley Hospital',
    secondaryText: '321 Valley Road, Green Hills',
    image: 'https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=400&h=300&fit=crop',
    distance: '8.1 km',
    isSelected: false,
  },
  // {
  //   id: 5,
  //   mainText: 'Apollo Specialty Hospital',
  //   secondaryText: '567 Innovation Drive, Tech Park',
  //   image: 'https://images.unsplash.com/photo-1582750433449-648ed127bb54?w=400&h=300&fit=crop',
  //   distance: '5.3 km',
  //   isSelected: false,
  // },
  // {
  //   id: 6,
  //   mainText: 'Fortis Healthcare Center',
  //   secondaryText: '890 Heritage Street, Old City',
  //   image: 'https://images.unsplash.com/photo-1538108149393-fbbd81895907?w=400&h=300&fit=crop',
  //   distance: '7.9 km',
  //   isSelected: false,
  // },
  // {
  //   id: 7,
  //   mainText: 'Max Super Speciality Hospital',
  //   secondaryText: '432 Lotus Road, Garden District',
  //   image: 'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=400&h=300&fit=crop',
  //   distance: '3.7 km',
  //   isSelected: false,
  // },
  // {
  //   id: 8,
  //   mainText: 'Medanta Emergency Clinic',
  //   secondaryText: '678 Express Highway, Business Hub',
  //   image: 'https://images.unsplash.com/photo-1512678080530-7760d81faba6?w=400&h=300&fit=crop',
  //   distance: '9.2 km',
  //   isSelected: false,
  // },
]

const BookAppointment = () => {
  const navigation = useNavigation<StackNav>()
  const [locations, setLocations] = useState(demoLocations)

  const handleLocationSelect = (selectedId: number) => {
    setLocations((prevLocations) =>
      prevLocations.map((location) => ({
        ...location,
        isSelected: location.id === selectedId,
      })),
    )
  }

  return (
    <View className='bg flex-1'>
      <PaddingTop />
      <Header title='Book Appointment' />
      <ScrollView contentContainerClassName='pb-10'>
        <View className='gap-6 pt-2'>
          <View className='px-5'>
            <DoctorCard />
          </View>
          <DateCardContainer />
        </View>

        <LocationCardContainer locations={locations} onLocationSelect={handleLocationSelect} />
      </ScrollView>

      <View className='px-6 pb-2 pt-2'>
        <Button title='Next' onPress={() => navigation.navigate('FamilyMemberSelector')} />
      </View>
      <PaddingBottom />
    </View>
  )
}

interface LocationCardContainerProps {
  locations: LocationData[]
  onLocationSelect: (selectedId: number) => void
}

export function LocationCardContainer({ locations, onLocationSelect }: LocationCardContainerProps) {
  return (
    <View className='flex-1'>
      <View className='p-5'>
        <Bold className='text text-base'>Select Location</Bold>
        <Medium className='text-xs text-gray'>Choose your preferred medical facility</Medium>
      </View>
      {/* <ScrollView className='flex-1' contentContainerStyle={{ paddingBottom: 10 }} contentContainerClassName='gap-5'> */}
      <View className='flex-1 gap-3 px-3'>
        {locations.map((location) => (
          <LocationCard key={location.id} location={location} onPress={() => onLocationSelect(location.id)} />
        ))}
      </View>
      {/* </ScrollView> */}
    </View>
  )
}

interface LocationData {
  id: number
  mainText: string
  secondaryText: string
  image: string
  distance: string
  isSelected: boolean
}

interface LocationCardProps {
  location: LocationData
  onPress: () => void
}

function LocationCard({ location, onPress }: LocationCardProps) {
  return (
    <TouchableOpacity
      className={`w-full overflow-hidden rounded-3xl bg-white shadow-lg dark:bg-zinc-900`}
      style={{
        borderWidth: 2,
        borderColor: location.isSelected ? Colors.accent : 'transparent',
      }}
      activeOpacity={0.92}
      onPress={onPress}
    >
      <View className='flex-row items-center p-2'>
        <View className='overflow-hidden rounded-2xl'>
          <Image source={{ uri: location.image }} resizeMode='cover' style={{ height: 80, width: 80 }} />
          <View className='absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent' />
        </View>

        <View className='flex-1 justify-center gap-1.5 px-4'>
          <Bold className={`text-base leading-5 ${location.isSelected ? 'text-accent' : 'text'}`} numberOfLines={1}>
            {location.mainText}
          </Bold>
          <Medium className='gray text-xs' numberOfLines={2}>
            {location.secondaryText}
          </Medium>
          {/* <View className='flex-row'>
            <Medium className='text rounded-lg border border-zinc-200 px-2 py-1 text-xs dark:border-zinc-700 dark:bg-zinc-800'>
              {location.distance} away
            </Medium>
          </View> */}
        </View>
        <View className='ml-2 mr-5 h-[60%] bg-gray opacity-50' style={{ width: 1.5 }}></View>
        <View className='flex items-center justify-center pr-4'>
          <Medium className='text-xs text-gray'>Queue</Medium>
          <SemiBold className={`text-2xl ${location.isSelected ? 'text-accent' : 'text-gray'}`}>#12</SemiBold>
          <Medium className='text-xs text-gray'>{location.distance}</Medium>
        </View>
      </View>
    </TouchableOpacity>
  )
}

export default BookAppointment
