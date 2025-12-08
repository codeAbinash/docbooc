import { PaddingBottom } from '@components/SafePadding'
import Search from '@components/Search'
import Calendar03Icon from '@hugeicons/Calendar03Icon'
import DateTimePicker, { DateTimePickerEvent } from '@react-native-community/datetimepicker'
import Colors from '@utils/colors'
import { SemiBold } from '@utils/fonts'
import { memo, useCallback, useState } from 'react'
import { FlatList, Platform, TouchableOpacity, View } from 'react-native'
import PatientCard from '../components/PatientCard'
import HybridHead from '@components/HybridHead'

const SAMPLE_PATIENTS = [
  { id: '1', name: 'John Smith', age: 45, gender: 'Male' as const, queuePosition: 1, status: 'confirmed' as const },
  {
    id: '2',
    name: 'Sarah Johnson',
    age: 32,
    gender: 'Female' as const,
    queuePosition: 2,
    status: 'provisional' as const,
  },
  { id: '3', name: 'Michael Brown', age: 28, gender: 'Male' as const, queuePosition: 3, status: 'confirmed' as const },
  {
    id: '4',
    name: 'Emily Davis',
    age: 67,
    gender: 'Female' as const,
    queuePosition: 4,
    status: 'provisional' as const,
  },
  { id: '5', name: 'David Wilson', age: 52, gender: 'Male' as const, queuePosition: 5, status: 'confirmed' as const },
]

type SearchAndDateBarProps = {
  searchQuery: string
  onSearchChange: (text: string) => void
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

  if (date.toDateString() === today.toDateString()) {
    return 'Today'
  } else if (date.toDateString() === tomorrow.toDateString()) {
    return 'Tomorrow'
  } else if (date.toDateString() === yesterday.toDateString()) {
    return 'Yesterday'
  } else {
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
  }
}

const SearchAndDateBar = memo(function SearchAndDateBar({
  searchQuery,
  onSearchChange,
  selectedDate,
  showDatePicker,
  onToggleDatePicker,
  onDateChange,
}: SearchAndDateBarProps) {
  return (
    <View className='bg-white px-5 py-3 dark:bg-neutral-900'>
      <View className='flex-row gap-3'>
        <View className='flex-1'>
          <Search value={searchQuery} onChangeText={onSearchChange} placeholder='Search patients...' />
        </View>
        <TouchableOpacity
          onPress={onToggleDatePicker}
          activeOpacity={0.7}
          className='flex-row items-center gap-2 rounded-xl bg-accent/15 px-4'
        >
          <Calendar03Icon color={Colors.accent} size={18} strokeWidth={2} />
          <SemiBold style={{ color: Colors.accent, fontSize: 13 }}>{formatDate(selectedDate)}</SemiBold>
        </TouchableOpacity>
      </View>
      {showDatePicker && (
        <View className='mt-3'>
          <DateTimePicker
            value={selectedDate}
            mode='date'
            onChange={onDateChange}
            display={Platform.OS === 'ios' ? 'spinner' : 'default'}
          />
        </View>
      )}
      <PaddingBottom />
    </View>
  )
})

const HPUpcomingAppointmentsScreen = memo(function HPUpcomingAppointmentsScreenComponent() {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedDate, setSelectedDate] = useState(new Date())
  const [showDatePicker, setShowDatePicker] = useState(false)

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

  const filteredPatients = SAMPLE_PATIENTS.filter((patient) =>
    patient.name.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  const renderPatientCard = useCallback(
    ({ item }: { item: (typeof SAMPLE_PATIENTS)[0] }) => (
      <PatientCard patient={item} isExpanded={false} onToggle={() => {}} hideActions />
    ),
    [],
  )

  const ListFooterComponent = useCallback(() => <PaddingBottom />, [])

  return (
    <View className='bg flex-1'>
      <HybridHead searchPlaceholder='Search doctors, specialties...' showMenu={true} showDoctorInfo={true} />
      <View className='flex-1'>
        <FlatList
          data={filteredPatients}
          renderItem={renderPatientCard}
          keyExtractor={(item) => item.id}
          contentContainerClassName='pb-16 pt-5 px-5'
          showsVerticalScrollIndicator={false}
          ListFooterComponent={ListFooterComponent}
        />
      </View>
      <View className='absolute bottom-0 left-0 right-0 bg-white shadow-xl dark:bg-neutral-900'>
        <SearchAndDateBar
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          selectedDate={selectedDate}
          showDatePicker={showDatePicker}
          onToggleDatePicker={handleToggleDatePicker}
          onDateChange={handleDateChange}
        />
      </View>
    </View>
  )
})

export default HPUpcomingAppointmentsScreen
