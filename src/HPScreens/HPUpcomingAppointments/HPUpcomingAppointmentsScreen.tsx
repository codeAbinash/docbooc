import { PaddingBottom } from '@components/SafePadding'
import Calendar03Icon from '@hugeicons/Calendar03Icon'
import DateTimePicker, { DateTimePickerEvent } from '@react-native-community/datetimepicker'
import Colors from '@utils/colors'
import { SemiBold } from '@utils/fonts'
import { useQuery } from '@tanstack/react-query'
import { client } from '@utils/client'
import type { Doctor, Patient } from '@utils/types'
import { memo, useCallback, useMemo, useState, useEffect } from 'react'
import { FlatList, Platform, TouchableOpacity, View, ActivityIndicator } from 'react-native'
import PatientCard from '../components/PatientCard'
import HybridHead from '@components/HybridHead'
import KeyboardAvoid from '@components/KeyboardAvoid'

type SearchAndDateBarProps = {
  selectedDate: Date
  showDatePicker: boolean
  onToggleDatePicker: () => void
  onDateChange: (event: DateTimePickerEvent, date?: Date) => void
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
  selectedDate,
  showDatePicker,
  onToggleDatePicker,
  onDateChange,
}: SearchAndDateBarProps) {
  const formattedDate = useMemo(() => formatDate(selectedDate), [selectedDate])

  return (
    <View className='border-t border-neutral-200 bg-white px-5 py-3 dark:bg-neutral-900'>
      <TouchableOpacity
        onPress={onToggleDatePicker}
        activeOpacity={0.7}
        className='flex-row items-center gap-2 rounded-lg bg-accent/15 px-3 py-2'
      >
        <Calendar03Icon color={Colors.accent} size={20} strokeWidth={2} />
        <SemiBold style={{ color: Colors.accent, fontSize: 15 }}>{formattedDate}</SemiBold>
      </TouchableOpacity>

      {showDatePicker && (
        <DateTimePicker
          value={selectedDate}
          mode='date'
          onChange={onDateChange}
          display={Platform.OS === 'ios' ? 'spinner' : 'default'}
        />
      )}
    </View>
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
  status: appointment.status === 'completed' ? 'confirmed' : 'provisional',
})

const HPUpcomingAppointmentsScreen = memo(function HPUpcomingAppointmentsScreenComponent() {
  const [selectedDate, setSelectedDate] = useState(new Date())
  const [showDatePicker, setShowDatePicker] = useState(false)
  const [selectedDoctor, setSelectedDoctor] = useState<Doctor | undefined>()

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

  const { data: upcomingAppointments, isLoading } = useQuery({
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
      return response.data || []
    },
    enabled: !!selectedDoctor?.id,
  })

  const handleToggleDatePicker = useCallback(() => {
    setShowDatePicker((prev) => !prev)
  }, [])

  const handleDateChange = useCallback((event: DateTimePickerEvent, date?: Date) => {
    if (Platform.OS === 'android') {
      setShowDatePicker(false)
    }
    if (date) {
      setSelectedDate(date)
    }
  }, [])

  const renderPatientCard = useCallback(
    ({ item }: { item: Patient }) => {
      const transformedPatient = transformAppointmentToPatientCard(item)
      return <PatientCard patient={transformedPatient} isExpanded={false} onToggle={() => {}} hideActions />
    },
    [],
  )

  const keyExtractor = useCallback((item: Patient) => item.id, [])

  const ListFooterComponent = useCallback(() => <PaddingBottom />, [])

  const EmptyState = useCallback(
    () => (
      <View className='flex-1 items-center justify-center py-16'>
        {isLoading ? (
          <ActivityIndicator size='large' color={Colors.accent} />
        ) : (
          <SemiBold style={{ color: Colors.text.DEFAULT, fontSize: 16 }}>No appointments found</SemiBold>
        )}
      </View>
    ),
    [isLoading],
  )

  return (
    <KeyboardAvoid>
      <View className='flex-1 bg-white dark:bg-neutral-900'>
        <HybridHead showMenu={true} showDoctorInfo={true} doctors={myDoctors || []} doctorInfo={selectedDoctor} onDoctorSelect={setSelectedDoctor} />
        <View className='flex-1'>
          <FlatList
            data={upcomingAppointments || []}
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
          />
        </View>
        <View className='absolute bottom-0 left-0 right-0 bg-white dark:bg-neutral-900'>
          <SearchAndDateBar
            selectedDate={selectedDate}
            showDatePicker={showDatePicker}
            onToggleDatePicker={handleToggleDatePicker}
            onDateChange={handleDateChange}
          />
          <PaddingBottom />
        </View>
      </View>
    </KeyboardAvoid>
  )
})

export default HPUpcomingAppointmentsScreen
