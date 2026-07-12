import Button from '@components/Button'
import { HPCards } from '@components/HPCards'
import HybridHead from '@components/HybridHead'
import { PaddingBottom } from '@components/SafePadding'
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native'
import { useQuery } from '@tanstack/react-query'
import { api } from '@utils/client'
import { Medium } from '@utils/fonts'
import { HPStackNav, HpRootStackParamList } from '@utils/types'
import { useState, useEffect, useMemo, useCallback } from 'react'
import { ActivityIndicator, View } from 'react-native'
import { ScrollView } from 'react-native-gesture-handler'
import { DateCardContainer } from '@/components/DateCardContainer'

const HPBookAppointment = () => {
  const navigation = useNavigation<HPStackNav>()
  const { doctor } = useRoute<RouteProp<HpRootStackParamList, 'HPBookAppointment'>>().params
  const [selectedLocationId, setSelectedLocationId] = useState<number | null>(null)
  const [selectedDate, setSelectedDate] = useState('')
  const [initialProgress, setInitialProgress] = useState(0)

  useEffect(() => {
    const timer = setTimeout(() => setInitialProgress(25), 100)
    return () => clearTimeout(timer)
  }, [])

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

  const progress = useMemo(
    () => (selectedLocationId !== null ? 50 : selectedDate ? 25 : initialProgress),
    [selectedLocationId, selectedDate, initialProgress],
  )

  const handleNext = useCallback(() => navigation.navigate('FamilyMemberSelectorScreen' as any), [navigation])

  const handleLocationPress = useCallback((idx: number) => setSelectedLocationId(idx), [])

  return (
    <View className='flex-1 bg-white'>
      <HybridHead title='Date and Location' showBackButton onBackPress={navigation.goBack}>
        <View className=''>
          <DateCardContainer onDateChange={setSelectedDate} />
        </View>
      </HybridHead>

      <ScrollView
        className='flex-1 px-5 py-4'
        // contentContainerStyle={{ paddingTop: 10, paddingBottom: 20 }}
        showsVerticalScrollIndicator={false}
        contentContainerClassName=''
      >
        {isLoading ? (
          <View className='items-center justify-center py-10'>
            <ActivityIndicator size='large' color='#3b82f6' />
            <Medium className='text-neutral-600 dark:text-neutral-400'>Loading available locations...</Medium>
          </View>
        ) : locations.length > 0 ? (
          <View className='gap-3 pb-5'>
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
                      ? `${slot.startTime.slice(0, 5)} - ${slot.endTime.slice(0, 5)}`
                      : undefined
                  }
                  address={address || 'N/A'}
                  q={slot.maxBookings > 0 ? slot.maxBookings.toString() : 'N/A'}
                  selected={selectedLocationId === idx}
                  onPress={() => handleLocationPress(idx)}
                />
              )
            })}
          </View>
        ) : selectedDate ? (
          <View className='items-center justify-center rounded-2xl bg-white p-10 dark:bg-neutral-800'>
            <Medium className='text-center text-neutral-600 dark:text-neutral-400'>
              No available locations for selected date
            </Medium>
          </View>
        ) : null}
      </ScrollView>

      <View className='bg-white px-5 py-3 dark:border-neutral-700 dark:bg-neutral-800'>
        <Button title='Next' disabled={selectedLocationId === null} onPress={handleNext} />
      </View>
      <PaddingBottom />
    </View>
  )
}

export default HPBookAppointment
