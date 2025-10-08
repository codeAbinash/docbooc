import { PaddingBottom } from '@components/SafePadding'
import Search from '@components/Search'
import Calendar03Icon from '@hugeicons/Calendar03Icon'
import DateTimePicker, { DateTimePickerEvent } from '@react-native-community/datetimepicker'
import Colors from '@utils/colors'
import { SemiBold } from '@utils/fonts'
import { memo, useCallback, useState } from 'react'
import { FlatList, Platform, TouchableOpacity, View } from 'react-native'
import PatientCard from './components/PatientCard'
import TopArea from './components/TopArea'

const SAMPLE_PATIENTS = [
  { id: '1', name: 'John Smith', age: 45, gender: 'Male' as const, queuePosition: 1 },
  { id: '2', name: 'Sarah Johnson', age: 32, gender: 'Female' as const, queuePosition: 2 },
  { id: '3', name: 'Michael Brown', age: 28, gender: 'Male' as const, queuePosition: 3 },
  { id: '4', name: 'Emily Davis', age: 67, gender: 'Female' as const, queuePosition: 4 },
  { id: '5', name: 'David Wilson', age: 52, gender: 'Male' as const, queuePosition: 5 },
]

type SearchAndDateBarProps = {
  searchQuery: string
  onSearchChange: (text: string) => void
  selectedDate: Date
  showDatePicker: boolean
  onToggleDatePicker: () => void
  onDateChange: (event: DateTimePickerEvent, date?: Date) => void
}

function SearchAndDateBar({
  searchQuery,
  onSearchChange,
  selectedDate,
  showDatePicker,
  onToggleDatePicker,
  onDateChange,
}: SearchAndDateBarProps) {
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

  return (
    <View className='bg-white px-5 pb-3 dark:bg-neutral-900'>
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
        <DateTimePicker
          value={selectedDate}
          mode='date'
          onChange={onDateChange}
          display={Platform.OS === 'ios' ? 'spinner' : 'default'}
        />
      )}
    </View>
  )
}

function HPUpcomingAppointmentsScreen() {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedDate, setSelectedDate] = useState(new Date())
  const [showDatePicker, setShowDatePicker] = useState(false)
  const [expandedCardId, setExpandedCardId] = useState<string | null>(null)

  const handleToggle = useCallback((patientId: string) => {
    setExpandedCardId((prev) => (prev === patientId ? null : patientId))
  }, [])

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
      <PatientCard patient={item} isExpanded={expandedCardId === item.id} onToggle={handleToggle} />
    ),
    [expandedCardId, handleToggle],
  )

  const ListFooterComponent = useCallback(() => <PaddingBottom />, [])

  return (
    <View className='bg flex-1'>
      <TopArea />
      <SearchAndDateBar
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        selectedDate={selectedDate}
        showDatePicker={showDatePicker}
        onToggleDatePicker={handleToggleDatePicker}
        onDateChange={handleDateChange}
      />
      <FlatList
        data={filteredPatients}
        renderItem={renderPatientCard}
        keyExtractor={(item) => item.id}
        contentContainerClassName='pb-10 pt-5 px-5'
        showsVerticalScrollIndicator={false}
        ListFooterComponent={ListFooterComponent}
      />
    </View>
  )
}

export default memo(HPUpcomingAppointmentsScreen)
