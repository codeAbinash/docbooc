import { PaddingBottom } from '@components/SafePadding'
import Search from '@components/Search'
import Calendar03Icon from '@hugeicons/Calendar03Icon'
import DateTimePicker, { DateTimePickerEvent } from '@react-native-community/datetimepicker'
import Colors from '@utils/colors'
import { SemiBold } from '@utils/fonts'
import { memo, useCallback, useMemo, useState, useEffect } from 'react'
import { FlatList, Platform, TouchableOpacity, View, Keyboard, KeyboardAvoidingView } from 'react-native'
import PatientCard from '../components/PatientCard'
import HybridHead from '@components/HybridHead'
import KeyboardAvoid from '@components/KeyboardAvoid'

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
  onDateChange,
}: SearchAndDateBarProps) {
  const formattedDate = useMemo(() => formatDate(selectedDate), [selectedDate])

  return (
    <View className='border-t border-b border-neutral-200 bg-white px-5 py-3 dark:bg-neutral-900'>
      <View className='flex-row gap-3'>
        <View className='flex-1'>
          <Search value={searchQuery} onChangeText={onSearchChange} placeholder='Search patients...' />
        </View>
        <TouchableOpacity
          onPress={onToggleDatePicker}
          activeOpacity={0.7}
          className='flex-row items-center  gap-2 rounded-lg bg-accent/15 px-3'
        >
          <Calendar03Icon color={Colors.accent} size={20} strokeWidth={2} />
          <SemiBold style={{ color: Colors.accent, fontSize: 15 }}>{formattedDate}</SemiBold>
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
})

const HPUpcomingAppointmentsScreen = memo(function HPUpcomingAppointmentsScreenComponent() {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedDate, setSelectedDate] = useState(new Date())
  const [showDatePicker, setShowDatePicker] = useState(false)
  const [isKeyboardVisible, setIsKeyboardVisible] = useState(false)

  useEffect(() => {
    const showListener = Keyboard.addListener('keyboardDidShow', () => {
      setIsKeyboardVisible(true)
    })
    const hideListener = Keyboard.addListener('keyboardDidHide', () => {
      setIsKeyboardVisible(false)
    })

    return () => {
      showListener.remove()
      hideListener.remove()
    }
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

  const filteredPatients = useMemo(
    () => SAMPLE_PATIENTS.filter((patient) => patient.name.toLowerCase().includes(searchQuery.toLowerCase())),
    [searchQuery],
  )

  const renderPatientCard = useCallback(
    ({ item }: { item: (typeof SAMPLE_PATIENTS)[0] }) => (
      <PatientCard patient={item} isExpanded={false} onToggle={() => {}} hideActions />
    ),
    [],
  )

  const keyExtractor = useCallback((item: (typeof SAMPLE_PATIENTS)[0]) => item.id, [])

  const ListFooterComponent = useCallback(() => <PaddingBottom />, [])

  return (
    <KeyboardAvoid>
      <View className='flex-1 bg-white'>
        <HybridHead showMenu={true} showDoctorInfo={true} />
        <View className='flex-1 pt-2'>
          <FlatList
            data={filteredPatients}
            renderItem={renderPatientCard}
            keyExtractor={keyExtractor}
            contentContainerClassName='pb-16 pt-4 px-5'
            showsVerticalScrollIndicator={false}
            ListFooterComponent={ListFooterComponent}
            removeClippedSubviews={true}
            maxToRenderPerBatch={10}
            updateCellsBatchingPeriod={50}
            initialNumToRender={8}
            windowSize={5}
          />
        </View>
        <View className=' absolute bottom-0 left-0 right-0 bg-white dark:bg-neutral-900'>
          <SearchAndDateBar
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
            selectedDate={selectedDate}
            showDatePicker={showDatePicker}
            onToggleDatePicker={handleToggleDatePicker}
            onDateChange={handleDateChange}
          />
          {!isKeyboardVisible && <PaddingBottom />}
        </View>
      </View>
    </KeyboardAvoid>
  )
})

export default HPUpcomingAppointmentsScreen
