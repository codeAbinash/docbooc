import Button from '@components/Button'
import Gradient from '@components/Gradient'
import { PaddingBottom, PaddingTop } from '@components/SafePadding'
import { useNavigation } from '@react-navigation/native'
import { Bold, Medium, SemiBold } from '@utils/fonts'
import { StackNav } from '@utils/types'
import { useColorScheme } from 'nativewind'
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
    distance: '2.5',
    isSelected: false,
  },
  {
    id: 2,
    mainText: 'Metro Medical Center',
    secondaryText:
      '456 Health Street, Metro Station. 456 Health Street, Metro Station. 456 Health Street, Metro Station.',
    image: 'https://images.unsplash.com/photo-1586773860418-d37222d8fce3?w=400&h=300&fit=crop',
    distance: '4.2',
    isSelected: true,
  },
  {
    id: 3,
    mainText: 'Sunrise Clinic',
    secondaryText: '789 Wellness Avenue, Sunrise District',
    image: 'https://images.unsplash.com/photo-1551601651-2a8555f1a136?w=400&h=300&fit=crop',
    distance: '6.8',
    isSelected: false,
  },
  {
    id: 4,
    mainText: 'Green Valley Hospital',
    secondaryText: '321 Valley Road, Green Hills',
    image: 'https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=400&h=300&fit=crop',
    distance: '8.1',
    isSelected: false,
  },
  // {
  //   id: 5,
  //   mainText: 'Apollo Specialty Hospital',
  //   secondaryText: '567 Innovation Drive, Tech Park',
  //   image: 'https://images.unsplash.com/photo-1582750433449-648ed127bb54?w=400&h=300&fit=crop',
  //   distance: '5.3',
  //   isSelected: false,
  // },
  // {
  //   id: 6,
  //   mainText: 'Fortis Healthcare Center',
  //   secondaryText: '890 Heritage Street, Old City',
  //   image: 'https://images.unsplash.com/photo-1538108149393-fbbd81895907?w=400&h=300&fit=crop',
  //   distance: '7.9',
  //   isSelected: false,
  // },
  // {
  //   id: 7,
  //   mainText: 'Max Super Speciality Hospital',
  //   secondaryText: '432 Lotus Road, Garden District',
  //   image: 'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=400&h=300&fit=crop',
  //   distance: '3.7',
  //   isSelected: false,
  // },
  // {
  //   id: 8,
  //   mainText: 'Medanta Emergency Clinic',
  //   secondaryText: '678 Express Highway, Business Hub',
  //   image: 'https://images.unsplash.com/photo-1512678080530-7760d81faba6?w=400&h=300&fit=crop',
  //   distance: '9.2',
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

      <View className='px-6 pb-2 pt-3'>
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
      <View className='flex-1 gap-3 px-4'>
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
  const { colorScheme } = useColorScheme()
  const selected = location.isSelected

  if (selected)
    return (
      <Gradient className='overflow-hidden rounded-2xl p-5 shadow-sm'>
        <LocationCardInternal location={location} onPress={onPress} />
      </Gradient>
    )

  return (
    <TouchableOpacity
      activeOpacity={0.7}
      onPress={onPress}
      className={`overflow-hidden rounded-2xl bg-white p-5 shadow-sm dark:bg-neutral-800`}
    >
      <LocationCardInternal location={location} onPress={onPress} />
    </TouchableOpacity>
  )
}

function LocationCardInternal({ location, onPress }: LocationCardProps) {
  const selected = location.isSelected

  return (
    <>
      <View className='mb-3 flex-row gap-3'>
        <View className='flex-1 flex-row items-center gap-3'>
          <Image source={{ uri: location.image }} className='size-14 rounded-lg' resizeMode='cover' />
          <View className='flex-1'>
            <SemiBold className={selected ? 'text-white' : 'text'}>{location.mainText}</SemiBold>
          </View>
        </View>
        <SemiBold className={`text-xl opacity-100 ${selected ? 'text-white' : 'text'}`} style={{ lineHeight: 15 }}>
          Q12
        </SemiBold>
      </View>
      <View
        className={`flex-row items-end justify-between gap-5 rounded-lg p-3 dark:bg-neutral-900 ${selected ? 'bg-black/15' : 'bg-black/5'}`}
      >
        <View className='flex-1'>
          <Medium className={`text-xs ${selected ? 'text-white' : 'text'} opacity-70`}>Address</Medium>
          <Medium className={`text-sm ${selected ? 'text-white' : 'text'}`} numberOfLines={2}>
            {location.secondaryText}
          </Medium>
        </View>
        <SemiBold className={`mt-1 text-xs ${selected ? 'text-white' : 'text'}`}>{location.distance} km</SemiBold>
      </View>
    </>
  )
}

export default BookAppointment
