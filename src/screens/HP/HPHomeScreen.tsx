import { PaddingBottom } from '@components/SafePadding'
import { memo, useCallback, useState } from 'react'
import { FlatList, View } from 'react-native'
import PatientCard from './components/PatientCard'
import TopArea from './components/TopArea'

const SAMPLE_PATIENTS = [
  { id: '1', name: 'John Smith', age: 45, gender: 'Male' as const, queuePosition: 1 },
  { id: '2', name: 'Sarah Johnson', age: 32, gender: 'Female' as const, queuePosition: 2 },
  { id: '3', name: 'Michael Brown', age: 28, gender: 'Male' as const, queuePosition: 3 },
  { id: '4', name: 'Emily Davis', age: 67, gender: 'Female' as const, queuePosition: 4 },
  { id: '5', name: 'David Wilson', age: 52, gender: 'Male' as const, queuePosition: 5 },
  { id: '6', name: 'Lisa Anderson', age: 29, gender: 'Female' as const, queuePosition: 6 },
  { id: '7', name: 'James Taylor', age: 41, gender: 'Male' as const, queuePosition: 7 },
  { id: '8', name: 'Maria Garcia', age: 35, gender: 'Female' as const, queuePosition: 8 },
  { id: '9', name: 'Robert Miller', age: 58, gender: 'Male' as const, queuePosition: 9 },
  { id: '10', name: 'Jennifer Moore', age: 44, gender: 'Female' as const, queuePosition: 10 },
  { id: '11', name: 'Christopher Lee', age: 36, gender: 'Male' as const, queuePosition: 11 },
  { id: '12', name: 'Amanda White', age: 27, gender: 'Female' as const, queuePosition: 12 },
  { id: '13', name: 'Daniel Harris', age: 49, gender: 'Male' as const, queuePosition: 13 },
  { id: '14', name: 'Jessica Martin', age: 33, gender: 'Female' as const, queuePosition: 14 },
  { id: '15', name: 'Matthew Thompson', age: 55, gender: 'Male' as const, queuePosition: 15 },
  { id: '16', name: 'Ashley Robinson', age: 26, gender: 'Female' as const, queuePosition: 16 },
  { id: '17', name: 'Andrew Clark', age: 42, gender: 'Male' as const, queuePosition: 17 },
  { id: '18', name: 'Nicole Lewis', age: 38, gender: 'Female' as const, queuePosition: 18 },
  { id: '19', name: 'Joshua Walker', age: 31, gender: 'Male' as const, queuePosition: 19 },
  { id: '20', name: 'Stephanie Hall', age: 29, gender: 'Female' as const, queuePosition: 20 },
  { id: '21', name: 'Ryan Allen', age: 47, gender: 'Male' as const, queuePosition: 21 },
  { id: '22', name: 'Megan Young', age: 34, gender: 'Female' as const, queuePosition: 22 },
  { id: '23', name: 'Kevin King', age: 53, gender: 'Male' as const, queuePosition: 23 },
  { id: '24', name: 'Rachel Wright', age: 40, gender: 'Female' as const, queuePosition: 24 },
  { id: '25', name: 'Brandon Lopez', age: 25, gender: 'Male' as const, queuePosition: 25 },
  { id: '26', name: 'Samantha Hill', age: 37, gender: 'Female' as const, queuePosition: 26 },
  { id: '27', name: 'Tyler Green', age: 30, gender: 'Male' as const, queuePosition: 27 },
  { id: '28', name: 'Lauren Adams', age: 28, gender: 'Female' as const, queuePosition: 28 },
  { id: '29', name: 'Jason Baker', age: 46, gender: 'Male' as const, queuePosition: 29 },
  { id: '30', name: 'Kayla Nelson', age: 32, gender: 'Female' as const, queuePosition: 30 },
  { id: '31', name: 'Eric Carter', age: 39, gender: 'Male' as const, queuePosition: 31 },
  { id: '32', name: 'Brittany Mitchell', age: 26, gender: 'Female' as const, queuePosition: 32 },
  { id: '33', name: 'Adam Perez', age: 43, gender: 'Male' as const, queuePosition: 33 },
  { id: '34', name: 'Kimberly Roberts', age: 35, gender: 'Female' as const, queuePosition: 34 },
  { id: '35', name: 'Nathan Turner', age: 51, gender: 'Male' as const, queuePosition: 35 },
  { id: '36', name: 'Heather Phillips', age: 41, gender: 'Female' as const, queuePosition: 36 },
  { id: '37', name: 'Benjamin Campbell', age: 29, gender: 'Male' as const, queuePosition: 37 },
  { id: '38', name: 'Crystal Parker', age: 33, gender: 'Female' as const, queuePosition: 38 },
  { id: '39', name: 'Jacob Evans', age: 48, gender: 'Male' as const, queuePosition: 39 },
  { id: '40', name: 'Danielle Edwards', age: 31, gender: 'Female' as const, queuePosition: 40 },
  { id: '41', name: 'Kyle Collins', age: 27, gender: 'Male' as const, queuePosition: 41 },
  { id: '42', name: 'Victoria Stewart', age: 45, gender: 'Female' as const, queuePosition: 42 },
  { id: '43', name: 'Austin Sanchez', age: 34, gender: 'Male' as const, queuePosition: 43 },
  { id: '44', name: 'Alexis Morris', age: 28, gender: 'Female' as const, queuePosition: 44 },
  { id: '45', name: 'Sean Rogers', age: 50, gender: 'Male' as const, queuePosition: 45 },
  { id: '46', name: 'Vanessa Reed', age: 36, gender: 'Female' as const, queuePosition: 46 },
  { id: '47', name: 'Ian Cook', age: 44, gender: 'Male' as const, queuePosition: 47 },
  { id: '48', name: 'Courtney Morgan', age: 30, gender: 'Female' as const, queuePosition: 48 },
  { id: '49', name: 'Garrett Bell', age: 38, gender: 'Male' as const, queuePosition: 49 },
  { id: '50', name: 'Allison Murphy', age: 42, gender: 'Female' as const, queuePosition: 50 },
  { id: '51', name: 'Caleb Bailey', age: 26, gender: 'Male' as const, queuePosition: 51 },
  { id: '52', name: 'Tiffany Rivera', age: 37, gender: 'Female' as const, queuePosition: 52 },
  { id: '53', name: 'Hunter Cooper', age: 33, gender: 'Male' as const, queuePosition: 53 },
  { id: '54', name: 'Sierra Richardson', age: 29, gender: 'Female' as const, queuePosition: 54 },
  { id: '55', name: 'Colton Cox', age: 40, gender: 'Male' as const, queuePosition: 55 },
  { id: '56', name: 'Brooke Howard', age: 35, gender: 'Female' as const, queuePosition: 56 },
  { id: '57', name: 'Lucas Ward', age: 47, gender: 'Male' as const, queuePosition: 57 },
  { id: '58', name: 'Paige Torres', age: 32, gender: 'Female' as const, queuePosition: 58 },
  { id: '59', name: 'Zachary Peterson', age: 39, gender: 'Male' as const, queuePosition: 59 },
  { id: '60', name: 'Hannah Gray', age: 28, gender: 'Female' as const, queuePosition: 60 },
]

function HPHomeScreen() {
  const [expandedCardId, setExpandedCardId] = useState<string | null>(null)

  const handleToggle = useCallback((patientId: string) => {
    setExpandedCardId((prev) => (prev === patientId ? null : patientId))
  }, [])

  const renderPatientCard = useCallback(
    ({ item }: { item: (typeof SAMPLE_PATIENTS)[0] }) => (
      <PatientCard patient={item} isExpanded={expandedCardId === item.id} onToggle={handleToggle} />
    ),
    [expandedCardId, handleToggle],
  )

  // const ListHeaderComponent = useCallback(() => <SemiBold className='text mb-4 text-xl'>Recent Patients</SemiBold>, [])

  const ListFooterComponent = useCallback(() => <PaddingBottom />, [])

  return (
    <View className='bg flex-1'>
      <TopArea />
      <FlatList
        data={SAMPLE_PATIENTS}
        renderItem={renderPatientCard}
        keyExtractor={(item) => item.id}
        contentContainerClassName='pb-10 pt-5 px-5'
        showsVerticalScrollIndicator={false}
        // ListHeaderComponent={ListHeaderComponent}
        ListFooterComponent={ListFooterComponent}
      />
    </View>
  )
}

export default memo(HPHomeScreen)
