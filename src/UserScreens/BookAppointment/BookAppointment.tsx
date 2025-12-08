import Button from '@components/Button'
import { DoctorCard } from '@components/DoctorCard'
import { HPCards } from '@components/HPCards'
import HybridHead from '@components/HybridHead'
import { PaddingBottom } from '@components/SafePadding'
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native'
import { useQuery } from '@tanstack/react-query'
import { api } from '@utils/client'
import { Medium, SemiBold } from '@utils/fonts'
import { StackNav } from '@utils/types'
import { useState } from 'react'
import { ActivityIndicator, View } from 'react-native'
import { ScrollView } from 'react-native-gesture-handler'
import { RootStackParamList } from '../../../App'
import { DateCardContainer } from './components/DateCardContainer'

const BookAppointment = () => {
  const navigation = useNavigation<StackNav>()
  const route = useRoute<RouteProp<RootStackParamList, 'BookAppointment'>>()
  const [selectedLocationId, setSelectedLocationId] = useState<number | null>(null)
  const [selectedDate, setSelectedDate] = useState<string>('')

  const { doctor } = route.params

  const { data: availabilityData, isLoading: isLoadingAvailability } = useQuery({
    queryKey: ['doctor-availability', doctor.id, selectedDate],
    queryFn: async () => {
      const response = await (
        await api.users.doctors.availability.$post({
          json: {
            date: selectedDate,
            doctorId: doctor.id,
          },
        })
      ).json()
      return response.success ? response.data : []
    },
    enabled: !!selectedDate && !!doctor.id,
  })

  const locations = availabilityData || []

  const handleLocationSelect = (selectedId: number) => {
    setSelectedLocationId(selectedId)
  }

  const handleDateChange = (date: string) => {
    console.log('Date changed to:', date)
    setSelectedDate(date)
  }

  return (
    <View className='bg flex-1'>
      <HybridHead title='Book Appointment' showBackButton={true} onBackPress={() => navigation.goBack()} />
      <ScrollView
        className='flex-1 px-5'
        contentContainerStyle={{ paddingTop: 20, paddingBottom: 20 }}
        showsVerticalScrollIndicator={false}
        contentContainerClassName='gap-5'
      >
        <View className='gap-5'>
          <View>
            <DoctorCard doctor={doctor} showSelector={false} selected={false} />
          </View>

          <View className='rounded-2xl bg-white p-5 dark:bg-neutral-800'>
            <DateCardContainer onDateChange={handleDateChange} />
          </View>
        </View>

        {isLoadingAvailability ? (
          <View className='items-center justify-center py-10'>
            <ActivityIndicator size='large' color='#3b82f6' />
            <Medium className='mt-3 text-neutral-600 dark:text-neutral-400'>Loading available locations...</Medium>
          </View>
        ) : locations.length > 0 ? (
          <LocationCardContainer
            locations={locations}
            selectedLocationId={selectedLocationId}
            onLocationSelect={handleLocationSelect}
          />
        ) : selectedDate ? (
          <View className='items-center justify-center rounded-2xl bg-white p-10 dark:bg-neutral-800'>
            <Medium className='text-center text-neutral-600 dark:text-neutral-400'>
              No available locations for selected date
            </Medium>
          </View>
        ) : null}
      </ScrollView>

      <View className='border-t border-neutral-100 bg-white px-6 py-3 dark:border-neutral-700 dark:bg-neutral-800'>
        <Button title='Next' onPress={() => navigation.navigate('FamilyMemberSelector')} />
      </View>
      <PaddingBottom />
    </View>
  )
}

interface LocationCardContainerProps {
  locations: any[]
  selectedLocationId: number | null
  onLocationSelect: (selectedId: number) => void
}

export function LocationCardContainer({ locations, selectedLocationId, onLocationSelect }: LocationCardContainerProps) {
  console.log(locations)
  return (
    <View className='gap-3'>
      {locations.map((location, index) => (
        <LocationCard
          key={location.scheduleId || index}
          location={location}
          isSelected={selectedLocationId === index}
          onPress={() => onLocationSelect(index)}
        />
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
  location: any
  isSelected: boolean
  onPress: () => void
}
function LocationCard({ location, isSelected, onPress }: LocationCardProps) {
  const hpName = location.healthcareProvider?.name || 'Unknown Provider'
  const hpAddress =
    `${location.healthcareProvider?.houseNumber} ${location.healthcareProvider?.roadName}, ${location.healthcareProvider?.city || ''}, ${location.healthcareProvider?.state || ''}, ${location.healthcareProvider?.pin || ''}` ||
    'Address not available'
  const timeSlot = location.timeSlots?.[0]
  const startTime = timeSlot?.startTime?.slice(0, 5) || ''
  const endTime = timeSlot?.endTime?.slice(0, 5) || ''
  const maxBookings = timeSlot?.maxBookings || 0
  const distance = location.distance

  const leftContent = (
    <>
      <Medium className='text-xs font-semibold text-neutral-600 dark:text-neutral-400'>Address</Medium>
      <Medium className='text-sm text-neutral-800 dark:text-neutral-100' numberOfLines={1}>
        {hpAddress}
      </Medium>
    </>
  )

  const rightContent =
    maxBookings > 0 ? (
      <>
        <Medium className='text-xs font-semibold text-neutral-600 dark:text-neutral-400'>Distance</Medium>
        <SemiBold className='text-sm text-accent'>{distance || 'N/A'}</SemiBold>
      </>
    ) : null

  return (
    <HPCards
      title={hpName}
      time={startTime && endTime ? `${startTime} - ${endTime}` : undefined}
      leftContent={leftContent}
      rightContent={rightContent}
      selected={isSelected}
      onPress={onPress}
    />
  )
}

export default BookAppointment
