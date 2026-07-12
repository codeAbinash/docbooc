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
import { Medium, Regular } from '@utils/fonts'
import { StackNav } from '@utils/types'
import { useEffect, useState } from 'react'
import { View } from 'react-native'
import { ScrollView } from 'react-native-gesture-handler'
import { RootStackParamList } from '../../../App'
import { Lottie } from '@/components/Lottie'
import Animations from '@/assets/animations/animations'

type AvailabilitySlot = {
  slotId: string
  date: string
  startTime: string
  endTime: string
  maxBookings: number
  currentBookings: number
  availableBookings: number
  scheduleId: string
  scheduleType: string
  scheduleDayId: string
}

type AvailabilityLocation = {
  healthcareProvider: {
    id: string
    name: string | null
    email: string | null
    contactNumber: string | null
    city: string | null
    state: string | null
    pin: string | null
    houseNumber: string | null
    roadName: string | null
    landmark: string | null
    profileImage: string | null
  }
  slots: AvailabilitySlot[]
}

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

  useEffect(() => {
    setSelectedIndex(null)
  }, [selectedDate])

  const { data: locations = [], isLoading } = useQuery({
    queryKey: ['doctor-availability', doctor.id, selectedDate],
    queryFn: async (): Promise<AvailabilityLocation[]> => {
      const res = await api.users.doctors.availability.$post({
        json: { date: selectedDate, doctorId: doctor.id },
      })
      const data = await res.json()
      if (!data.success || !data.data) return []
      return data.data as unknown as AvailabilityLocation[]
    },
    enabled: !!selectedDate && !!doctor.id,
  })

  const selectedLocation = selectedIndex !== null ? locations[selectedIndex] : null

  const handleNext = () => {
    const slot = selectedLocation?.slots?.[0]
    if (!selectedLocation || !slot?.slotId) {
      return
    }

    setDate(selectedDate)
    const hp = selectedLocation.healthcareProvider
    setLocation({
      slotId: slot.slotId,
      scheduleDaysId: slot.scheduleDayId,
      scheduleType: slot.scheduleType,
      healthcareProvider: {
        id: hp.id,
        name: hp.name ?? undefined,
        email: hp.email ?? undefined,
        contactNumber: hp.contactNumber,
        houseNumber: hp.houseNumber,
        roadName: hp.roadName,
        city: hp.city,
        state: hp.state,
        pin: hp.pin,
        profileImage: hp.profileImage,
      },
      timeSlots: selectedLocation.slots.map((s) => ({
        id: s.slotId,
        startTime: s.startTime,
        endTime: s.endTime,
        maxBookings: s.maxBookings,
        currentBookings: s.currentBookings,
      })),
    })

    if (token) navigation.navigate('FamilyMemberSelectorScreen')
    else navigation.navigate('Login')
  }

  return (
    <View className='flex-1 bg-white'>
      <HybridHead
        title={
          <View className='flex-row items-center justify-center'>
            <Medium className='text-2xl text-black'>{doctor.name}</Medium>
            <Regular className='text-2xl text-black'> |</Regular>
            <Medium className='bg-neutral-100 p-1 text-sm text-neutral-500'>{doctor.department}</Medium>
          </View>
        }
        showBackButton
        onBackPress={navigation.goBack}
      ></HybridHead>
      <View className='w-full'>
        <DateCardContainer onDateChange={setSelectedDate} />
      </View>

      <ScrollView className='flex-1 px-6' showsVerticalScrollIndicator={false} contentContainerClassName=''>
        {isLoading ? (
          <View className='flex-1 items-center justify-center py-10'>
            <Lottie source={Animations.loading} size={150} />
          </View>
        ) : locations.length > 0 ? (
          <View className='gap-5 py-5'>
            {locations.map((loc, idx: number) => {
              const hp = loc.healthcareProvider
              const slot = loc.slots?.[0]
              const address =
                `${hp.houseNumber || ''} ${hp.roadName || ''}, ${hp.city || ''}, ${hp.state || ''}, ${hp.pin || ''}`.trim()
              const queueNumber = slot ? slot.currentBookings + 1 : null

              return (
                <HPCards
                  key={slot?.scheduleId || idx}
                  title={hp.name || 'Unknown Provider'}
                  time={
                    slot?.startTime && slot?.endTime
                      ? `${formatTo12Hour(slot.startTime)} - ${formatTo12Hour(slot.endTime)}`
                      : undefined
                  }
                  address={address || 'N/A'}
                  q={queueNumber != null ? String(queueNumber) : 'N/A'}
                  selected={selectedIndex === idx}
                  onPress={() => setSelectedIndex(idx)}
                />
              )
            })}
          </View>
        ) : selectedDate ? (
          <View className='items-center justify-center rounded-2xl bg-white p-10'>
            <Medium className='text-center text-neutral-600'>No available locations for selected date</Medium>
          </View>
        ) : null}
      </ScrollView>

      <View className='bg-white px-6 pb-3'>
        <Button title='Proceed' disabled={!selectedLocation?.slots?.[0]?.slotId} onPress={handleNext} />
      </View>
      <PaddingBottom />
    </View>
  )
}

export default BookAppointment
