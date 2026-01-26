import HybridHead from '@components/HybridHead'
import KeyboardAvoid from '@components/KeyboardAvoid'
import { PaddingBottom } from '@components/SafePadding'
import { Search } from '@components/Search'
import { Lottie } from '@components/Lottie'
import { CustomDatePicker } from '@components/CustomDatePicker'
import Calendar03Icon from '@hugeicons/Calendar03Icon'
import Animations from '@/assets/animations/animations'
import { useQuery } from '@tanstack/react-query'
import { client } from '@utils/client'
import Colors from '@utils/colors'
import { SemiBold } from '@utils/fonts'
import type { Doctor, Patient } from '@utils/types'
import { memo, useCallback, useEffect, useMemo, useState } from 'react'
import { FlatList, RefreshControl, Text, TouchableOpacity, View } from 'react-native'
import PatientCard, { PatientCardShimmer } from '../components/PatientCard'

type SearchAndDateBarProps = {
  searchQuery: string
  onSearchChange: (text: string) => void
  selectedDate: Date
  showDatePicker: boolean
  onToggleDatePicker: () => void
  onDateTimeChange: (date: Date) => void
}

const formatDate = (date: Date) => {
  const today = new Date()
  const tomorrow = new Date(today)
  tomorrow.setDate(tomorrow.getDate() + 1)
  const yesterday = new Date(today)
  yesterday.setDate(yesterday.getDate() - 1)

  const dateString = date.toDateString()

  if (dateString === today.toDateString()) return 'Today'
  if (dateString === tomorrow.toDateString()) return 'Tomorrow'
  if (dateString === yesterday.toDateString()) return 'Yesterday'

  return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
}

const SearchAndDateBar = memo(function SearchAndDateBar({
  searchQuery,
  onSearchChange,
  selectedDate,
  showDatePicker,
  onToggleDatePicker,
  onDateTimeChange,
}: SearchAndDateBarProps) {
  const formattedDate = useMemo(() => formatDate(selectedDate), [selectedDate])

  return (
    <>
      <View className='border-b border-t border-neutral-200 bg-white px-5 py-3 dark:bg-neutral-900'>
        <View className='flex-row gap-3'>
          <View className='flex-1'>
            <Search value={searchQuery} onChangeText={onSearchChange} placeholder='Search patients...' />
          </View>
          <TouchableOpacity
            onPress={onToggleDatePicker}
            activeOpacity={0.7}
            className='flex-row items-center gap-2 rounded-lg bg-accent/15 px-3'
          >
            <Calendar03Icon color={Colors.accent} size={20} strokeWidth={2} />
            <SemiBold style={{ color: Colors.accent, fontSize: 15 }}>{formattedDate}</SemiBold>
          </TouchableOpacity>
        </View>
      </View>
      <CustomDatePicker
        visible={showDatePicker}
        onClose={onToggleDatePicker}
        onDateTimeChange={onDateTimeChange}
        initialDate={selectedDate}
      />
    </>
  )
})

const transformAppointmentToPatientCard = (
  appointment: Patient,
): {
  id: string
  name: string
  age: number
  gender: 'Male' | 'Female' | 'Other'
  queuePosition: number
  status: 'confirmed' | 'provisional'
} => ({
  id: appointment.id,
  name: appointment.patient.fullName || 'N/A',
  age: appointment.patient.dob ? new Date().getFullYear() - new Date(appointment.patient.dob).getFullYear() : 0,
  gender: appointment.patient.gender === 'female' ? 'Female' : appointment.patient.gender === 'male' ? 'Male' : 'Other',
  queuePosition: appointment.queueNo || 0,
  status: appointment.bookingStatus === 'confirmed' ? 'confirmed' : 'provisional',
})

const HPUpcomingAppointmentsScreen = memo(function HPUpcomingAppointmentsScreenComponent() {
  const [selectedDate, setSelectedDate] = useState(() => {
    const tomorrow = new Date()
    tomorrow.setDate(tomorrow.getDate() + 1)
    return tomorrow
  })
  const [showDatePicker, setShowDatePicker] = useState(false)
  const [selectedDoctor, setSelectedDoctor] = useState<Doctor | undefined>()
  const [searchQuery, setSearchQuery] = useState('')

  const { data: myDoctors } = useQuery({
    queryKey: ['my-doctors'],
    queryFn: async () => {
      const response = await (await client.api.v1.hp.doctors['my-doctors'].$get()).json()
      return response.data
    },
  })

  useEffect(() => {
    if (!selectedDoctor && myDoctors?.length) {
      setSelectedDoctor(myDoctors[0])
    }
  }, [myDoctors, selectedDoctor])

  const selectedDateIso = useMemo(() => selectedDate.toISOString().split('T')[0] || '', [selectedDate])

  const {
    data: upcomingAppointments,
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ['upcoming-appointments', selectedDoctor?.id, selectedDateIso],
    queryFn: async () => {
      if (!selectedDoctor?.id) return []
      const response = await (
        await client.api.v1.hp.bookings.patients.$get({
          query: {
            date: selectedDateIso,
            doctorId: selectedDoctor.id,
          },
        })
      ).json()
      const data = response.data || []
      return data.map((appointment: Patient, index: number) => ({
        ...appointment,
        queueNo: index + 1,
      }))
    },
    enabled: !!selectedDoctor?.id,
  })

  const [refreshing, setRefreshing] = useState(false)

  const handleRefresh = useCallback(async () => {
    setRefreshing(true)
    await refetch()
    setRefreshing(false)
  }, [refetch])

  const filteredAppointments = useMemo(() => {
    if (!searchQuery) return upcomingAppointments || []
    const query = searchQuery.toLowerCase()
    return (upcomingAppointments || []).filter((appointment) => {
      const patientName = appointment.patient.fullName?.toLowerCase() || ''
      return patientName.includes(query)
    })
  }, [upcomingAppointments, searchQuery])

  const handleToggleDatePicker = useCallback(() => {
    setShowDatePicker((prev) => !prev)
  }, [])

  const handleDateTimeChange = useCallback((date: Date) => {
    setSelectedDate(date)
  }, [])

  const renderPatientCard = useCallback(({ item }: { item: Patient }) => {
    const transformedPatient = transformAppointmentToPatientCard(item)
    return <PatientCard patient={transformedPatient} isExpanded={false} onToggle={() => {}} hideActions />
  }, [])

  const keyExtractor = useCallback((item: Patient) => item.id, [])

  const ListFooterComponent = useCallback(() => <PaddingBottom />, [])

  const EmptyState = useCallback(() => {
    if (isLoading) {
      return (
        <View>
          {Array.from({ length: 8 }).map((_, index) => (
            <PatientCardShimmer key={index} />
          ))}
        </View>
      )
    }
    return (
      <View className='flex-1 items-center justify-center py-32'>
        <Lottie source={Animations.cal} size={250} loop={true} hardwareAccelerationAndroid={true} />
        <Text className='mb-2 text-center text-lg font-semibold text-neutral-700 dark:text-neutral-300'>
          No Appointments
        </Text>
        <Text className='text-center text-sm text-neutral-500 dark:text-neutral-400'>
          No appointments scheduled for this date.
        </Text>
      </View>
    )
  }, [isLoading])

  return (
    <KeyboardAvoid>
      <View className='flex-1 bg-white dark:bg-neutral-900'>
        <HybridHead
          showMenu={true}
          showDoctorInfo={true}
          doctors={myDoctors || []}
          doctorInfo={selectedDoctor}
          onDoctorSelect={setSelectedDoctor}
        />
        <View className='flex-1'>
          <FlatList
            data={filteredAppointments}
            renderItem={renderPatientCard}
            keyExtractor={keyExtractor}
            contentContainerClassName='pb-32 pt-4 px-5'
            showsVerticalScrollIndicator={false}
            ListFooterComponent={ListFooterComponent}
            ListEmptyComponent={EmptyState}
            removeClippedSubviews={true}
            maxToRenderPerBatch={10}
            updateCellsBatchingPeriod={50}
            initialNumToRender={8}
            windowSize={5}
            refreshControl={
              <RefreshControl refreshing={refreshing} onRefresh={handleRefresh} tintColor={Colors.accent} />
            }
          />
        </View>
        <View className='absolute bottom-0 left-0 right-0 bg-white dark:bg-neutral-900'>
          <SearchAndDateBar
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
            selectedDate={selectedDate}
            showDatePicker={showDatePicker}
            onToggleDatePicker={handleToggleDatePicker}
            onDateTimeChange={handleDateTimeChange}
          />
          <PaddingBottom />
        </View>
      </View>
    </KeyboardAvoid>
  )
})

export default HPUpcomingAppointmentsScreen
