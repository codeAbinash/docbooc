import Button from '@components/Button'
import Gradient from '@components/Gradient'
import { PaddingBottom } from '@components/SafePadding'
import { DoctorCard } from '@components/DoctorCard'
import { HPCards } from '@components/HPCards'
import CustomHeader from '@components/CustomHeader'
import { useNavigation } from '@react-navigation/native'
import { Bold, Medium, SemiBold } from '@utils/fonts'
import { StackNav } from '@utils/types'
import { useState } from 'react'
import { Image, View } from 'react-native'
import { ScrollView } from 'react-native-gesture-handler'
import { DateCardContainer } from './components/DateCardContainer'
import Calendar03Icon from '@assets/icons/hugeicons/Calendar03Icon'
import Location06Icon from '@assets/icons/hugeicons/Location06Icon'
import Colors from '@utils/colors'

// Demo location data
const demoLocations = [
  {
    id: 1,
    mainText: 'City Hospital - Main Branch',
    secondaryText: '123 Medical Center Drive, Downtown',
    image: 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=400&h=300&fit=crop',
    distance: '2.5',
    isSelected: false,
    startTime: '09:00 AM',
    endTime: '05:00 PM',
    q: '12',
  },
  {
    id: 2,
    mainText: 'Metro Medical Center',
    secondaryText:
      '456 Health Street, Metro Station. 456 Health Street, Metro Station. 456 Health Street, Metro Station.',
    image: 'https://images.unsplash.com/photo-1586773860418-d37222d8fce3?w=400&h=300&fit=crop',
    distance: '4.2',
    isSelected: true,
    startTime: '08:00 AM',
    endTime: '06:00 PM',
    q: '8',
  },
  {
    id: 3,
    mainText: 'Sunrise Clinic',
    secondaryText: '789 Wellness Avenue, Sunrise District',
    image: 'https://images.unsplash.com/photo-1551601651-2a8555f1a136?w=400&h=300&fit=crop',
    distance: '6.8',
    isSelected: false,
    startTime: '10:00 AM',
    endTime: '04:00 PM',
    q: '15',
  },
  {
    id: 4,
    mainText: 'Green Valley Hospital',
    secondaryText: '321 Valley Road, Green Hills',
    image: 'https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=400&h=300&fit=crop',
    distance: '8.1',
    isSelected: false,
    startTime: '09:30 AM',
    endTime: '05:30 PM',
    q: '10',
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

  const doctorData = {
    name: 'Dr. John Doe',
    department: 'Cardiologist',
    degrees: 'MBBS, MD, DM',
    experience: 21,
    id: 1,
  }

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
      <CustomHeader title='Book Appointment' showBackButton={true} onBackPress={() => navigation.goBack()} />
      <ScrollView
        className='flex-1 px-5'
        contentContainerStyle={{ paddingTop: 20, paddingBottom: 20 }}
        showsVerticalScrollIndicator={false}
        contentContainerClassName='gap-5'
      >
        <View className='gap-5'>
          <View>
            <DoctorCard doctor={doctorData} showSelector={false} selected={false} />
          </View>

          <View className='rounded-2xl bg-white p-5 dark:bg-neutral-800'>
            <DateCardContainer />
          </View>
        </View>

        <LocationCardContainer locations={locations} onLocationSelect={handleLocationSelect} />
      </ScrollView>

      <View className='border-t border-neutral-100 bg-white px-6 py-3 dark:border-neutral-700 dark:bg-neutral-800'>
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
    <View className='gap-3'>
      {locations.map((location) => (
        <LocationCard key={location.id} location={location} onPress={() => onLocationSelect(location.id)} />
      ))}
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
  startTime?: string
  endTime?: string
  q?: string
}

interface LocationCardProps {
  location: LocationData
  onPress: () => void
}
function LocationCard({ location, onPress }: LocationCardProps) {
  const leftContent = (
    <>
      <Medium className='text-xs font-semibold text-neutral-600 dark:text-neutral-400'>Address</Medium>
      <Medium className='text-sm text-neutral-800 dark:text-neutral-100' numberOfLines={1}>
        {location.secondaryText}
      </Medium>
    </>
  )

  const rightContent = (
    <>
      <Medium className='text-xs font-semibold text-neutral-600 dark:text-neutral-400'>Distance</Medium>
      <SemiBold className='text-sm text-accent'>{location.distance} km</SemiBold>
    </>
  )

  return (
    <HPCards
      title={location.mainText}
      startTime={location.startTime}
      endTime={location.endTime}
      q={location.q}
      image={location.image}
      address={location.secondaryText}
      time={`${location.startTime} - ${location.endTime}`}
      distance={`${location.distance} km`}
      selected={location.isSelected}
      onPress={onPress}
    />
  )
}

export default BookAppointment
