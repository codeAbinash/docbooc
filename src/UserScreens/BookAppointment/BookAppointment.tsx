import { DateCardContainer } from '@/components/DateCardContainer'
import authStore from '@/zustand/authStore'
import { useBookingStore } from '@/zustand/bookingStore'
import Button from '@components/Button'
import { HPCards } from '@components/HPCards'
import HybridHead from '@components/HybridHead'
import { PaddingBottom } from '@components/SafePadding'
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native'
import { useQuery } from '@tanstack/react-query'
import { api } from '@utils/client'
import { Medium } from '@utils/fonts'
import { StackNav } from '@utils/types'
import { useEffect, useState } from 'react'
import { ActivityIndicator, View } from 'react-native'
import { ScrollView } from 'react-native-gesture-handler'
import { RootStackParamList } from '../../../App'

const formatTo12Hour = (time: string): string => {
  const [hours, minutes] = time.split(':').map(Number)
  const period = (hours ?? 0) >= 12 ? 'PM' : 'AM'
  const displayHours = (hours ?? 0) % 12 || 12
  return `${displayHours}:${String(minutes).padStart(2, '0')} ${period}`
}

const BookAppointment = () => {
  const navigation = useNavigation<StackNav>()
  const { doctor } = useRoute<RouteProp<RootStackParamList, 'BookAppointment'>>().params
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null)
  const [selectedDate, setSelectedDate] = useState('')
  const token = authStore((state) => state.token)
  const { setDoctor, setDate, setLocation } = useBookingStore()

  useEffect(() => {
    setDoctor(doctor)
  }, [doctor, setDoctor])

  const { data: locations = [], isLoading } = useQuery({
    queryKey: ['doctor-availability', doctor.id, selectedDate],
    queryFn: async () => {
      const res = await api.users.doctors.availability.$post({
        json: { date: selectedDate, doctorId: doctor.id },
      })
      const data = await res.json()
      return data.success ? data.data : []
    },
    enabled: !!selectedDate && !!doctor.id,
  })

  const selectedLocation = selectedIndex !== null ? locations[selectedIndex] : null

  const handleNext = () => {
    if (selectedLocation) {
      console.log(selectedDate)
      setDate(selectedDate)
      setLocation({
        scheduleDaysId: selectedLocation.timeSlots?.[0]?.scheduleDayId,
        scheduleType: selectedLocation.scheduleType,
        healthcareProvider: selectedLocation.healthcareProvider,
        timeSlots: selectedLocation.timeSlots,
      })
    }
    if (token) navigation.navigate('FamilyMemberSelectorScreen')
    else navigation.navigate('Login')
  }

  return (
    <View className='flex-1 bg-white'>
      <HybridHead title='Date and Location' showBackButton onBackPress={navigation.goBack}></HybridHead>
      <View className='w-full'>
        <DateCardContainer onDateChange={setSelectedDate} />
      </View>

      <ScrollView className='flex-1 px-5' showsVerticalScrollIndicator={false} contentContainerClassName=''>
        {isLoading ? (
          <View className='items-center justify-center py-10'>
            <ActivityIndicator size='large' color='#3b82f6' />
            <Medium className='text-neutral-600 '>Loading available locations...</Medium>
          </View>
        ) : locations.length > 0 ? (
          <View className='gap-5 py-5'>
            {locations.map((loc: any, idx: number) => {
              const hp = loc.healthcareProvider || {}
              const slot = loc.timeSlots?.[0] || {}
              const address =
                `${hp.houseNumber || ''} ${hp.roadName || ''}, ${hp.city || ''}, ${hp.state || ''}, ${hp.pin || ''}`.trim()

              return (
                <HPCards
                  key={loc.scheduleId || idx}
                  title={hp.name || 'Unknown Provider'}
                  time={
                    slot.startTime && slot.endTime
                      ? `${formatTo12Hour(slot.startTime)} - ${formatTo12Hour(slot.endTime)}`
                      : undefined
                  }
                  address={address || 'N/A'}
                  distance={loc.distance || 'N/A'}
                  q={slot.maxBookings > 0 ? slot.maxBookings.toString() : 'N/A'}
                  selected={selectedIndex === idx}
                  onPress={() => setSelectedIndex(idx)}
                />
              )
            })}
          </View>
        ) : selectedDate ? (
          <View className='items-center justify-center rounded-2xl bg-white p-10 '>
            <Medium className='text-center text-neutral-600 '>
              No available locations for selected date
            </Medium>
          </View>
        ) : null}
      </ScrollView>

      <View className='bg-white px-5 py-3 '>
        <Button title='Proceed' disabled={!selectedLocation} onPress={handleNext} />
      </View>
      <PaddingBottom />
    </View>
  )
}

export default BookAppointment
