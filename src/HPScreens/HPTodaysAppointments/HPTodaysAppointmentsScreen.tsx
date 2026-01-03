import Chip from '@components/Chip'
import { PaddingBottom } from '@components/SafePadding'
import Loading03Icon from '@hugeicons/Loading03Icon'
import TickDouble02Icon from '@hugeicons/TickDouble02Icon'
import { memo, useState, useCallback } from 'react'
import { FlatList, View } from 'react-native'
import PatientCard from '../components/PatientCard'
import ConfirmationModal from '@/HPScreens/components/ConfirmationModal'
import HybridHead from '@components/HybridHead'

// Types
type Gender = 'Male' | 'Female'
type ActionType = 'cancel' | 'complete' | 'move-to-ongoing'

interface Patient {
  id: string
  name: string
  age: number
  gender: Gender
  queuePosition: number
}

interface SelectedAction {
  type: ActionType
  patientId: string
  patient: Patient
}

// Constants
const CHIP_ITEMS = [
  { id: 0, name: 'Ongoing', icon: Loading03Icon },
  { id: 1, name: 'Complete', icon: TickDouble02Icon },
]

const SAMPLE_PATIENTS: Patient[] = [
  { id: '1', name: 'John Smith', age: 45, gender: 'Male', queuePosition: 1 },
  { id: '2', name: 'Sarah Johnson', age: 32, gender: 'Female', queuePosition: 2 },
  { id: '3', name: 'Michael Brown', age: 28, gender: 'Male', queuePosition: 3 },
  { id: '4', name: 'Emily Davis', age: 67, gender: 'Female', queuePosition: 4 },
  { id: '5', name: 'David Wilson', age: 52, gender: 'Male', queuePosition: 5 },
  { id: '6', name: 'Lisa Anderson', age: 29, gender: 'Female', queuePosition: 6 },
  { id: '7', name: 'James Taylor', age: 41, gender: 'Male', queuePosition: 7 },
  { id: '8', name: 'Maria Garcia', age: 35, gender: 'Female', queuePosition: 8 },
  { id: '9', name: 'Robert Miller', age: 58, gender: 'Male', queuePosition: 9 },
  { id: '10', name: 'Jennifer Moore', age: 44, gender: 'Female', queuePosition: 10 },
  { id: '11', name: 'Christopher Lee', age: 36, gender: 'Male', queuePosition: 11 },
  { id: '12', name: 'Amanda White', age: 27, gender: 'Female', queuePosition: 12 },
  { id: '13', name: 'Daniel Harris', age: 49, gender: 'Male', queuePosition: 13 },
  { id: '14', name: 'Jessica Martin', age: 33, gender: 'Female', queuePosition: 14 },
  { id: '15', name: 'Matthew Thompson', age: 55, gender: 'Male', queuePosition: 15 },
  { id: '16', name: 'Ashley Robinson', age: 26, gender: 'Female', queuePosition: 16 },
  { id: '17', name: 'Andrew Clark', age: 42, gender: 'Male', queuePosition: 17 },
  { id: '18', name: 'Nicole Lewis', age: 38, gender: 'Female', queuePosition: 18 },
  { id: '19', name: 'Joshua Walker', age: 31, gender: 'Male', queuePosition: 19 },
  { id: '20', name: 'Stephanie Hall', age: 29, gender: 'Female', queuePosition: 20 },
  { id: '21', name: 'Ryan Allen', age: 47, gender: 'Male', queuePosition: 21 },
  { id: '22', name: 'Megan Young', age: 34, gender: 'Female', queuePosition: 22 },
  { id: '23', name: 'Kevin King', age: 53, gender: 'Male', queuePosition: 23 },
  { id: '24', name: 'Rachel Wright', age: 40, gender: 'Female', queuePosition: 24 },
  { id: '25', name: 'Brandon Lopez', age: 25, gender: 'Male', queuePosition: 25 },
  { id: '26', name: 'Samantha Hill', age: 37, gender: 'Female', queuePosition: 26 },
  { id: '27', name: 'Tyler Green', age: 30, gender: 'Male', queuePosition: 27 },
  { id: '28', name: 'Lauren Adams', age: 28, gender: 'Female', queuePosition: 28 },
  { id: '29', name: 'Jason Baker', age: 46, gender: 'Male', queuePosition: 29 },
  { id: '30', name: 'Kayla Nelson', age: 32, gender: 'Female', queuePosition: 30 },
  { id: '31', name: 'Eric Carter', age: 39, gender: 'Male', queuePosition: 31 },
  { id: '32', name: 'Brittany Mitchell', age: 26, gender: 'Female', queuePosition: 32 },
  { id: '33', name: 'Adam Perez', age: 43, gender: 'Male', queuePosition: 33 },
  { id: '34', name: 'Kimberly Roberts', age: 35, gender: 'Female', queuePosition: 34 },
  { id: '35', name: 'Nathan Turner', age: 51, gender: 'Male', queuePosition: 35 },
  { id: '36', name: 'Heather Phillips', age: 41, gender: 'Female', queuePosition: 36 },
  { id: '37', name: 'Benjamin Campbell', age: 29, gender: 'Male', queuePosition: 37 },
  { id: '38', name: 'Crystal Parker', age: 33, gender: 'Female', queuePosition: 38 },
  { id: '39', name: 'Jacob Evans', age: 48, gender: 'Male', queuePosition: 39 },
  { id: '40', name: 'Danielle Edwards', age: 31, gender: 'Female', queuePosition: 40 },
  { id: '41', name: 'Kyle Collins', age: 27, gender: 'Male', queuePosition: 41 },
  { id: '42', name: 'Victoria Stewart', age: 45, gender: 'Female', queuePosition: 42 },
  { id: '43', name: 'Austin Sanchez', age: 34, gender: 'Male', queuePosition: 43 },
  { id: '44', name: 'Alexis Morris', age: 28, gender: 'Female', queuePosition: 44 },
  { id: '45', name: 'Sean Rogers', age: 50, gender: 'Male', queuePosition: 45 },
  { id: '46', name: 'Vanessa Reed', age: 36, gender: 'Female', queuePosition: 46 },
  { id: '47', name: 'Ian Cook', age: 44, gender: 'Male', queuePosition: 47 },
  { id: '48', name: 'Courtney Morgan', age: 30, gender: 'Female', queuePosition: 48 },
  { id: '49', name: 'Garrett Bell', age: 38, gender: 'Male', queuePosition: 49 },
  { id: '50', name: 'Allison Murphy', age: 42, gender: 'Female', queuePosition: 50 },
  { id: '51', name: 'Caleb Bailey', age: 26, gender: 'Male', queuePosition: 51 },
  { id: '52', name: 'Tiffany Rivera', age: 37, gender: 'Female', queuePosition: 52 },
  { id: '53', name: 'Hunter Cooper', age: 33, gender: 'Male', queuePosition: 53 },
  { id: '54', name: 'Sierra Richardson', age: 29, gender: 'Female', queuePosition: 54 },
  { id: '55', name: 'Colton Cox', age: 40, gender: 'Male', queuePosition: 55 },
  { id: '56', name: 'Brooke Howard', age: 35, gender: 'Female', queuePosition: 56 },
  { id: '57', name: 'Lucas Ward', age: 47, gender: 'Male', queuePosition: 57 },
  { id: '58', name: 'Paige Torres', age: 32, gender: 'Female', queuePosition: 58 },
  { id: '59', name: 'Zachary Peterson', age: 39, gender: 'Male', queuePosition: 59 },
  { id: '60', name: 'Hannah Gray', age: 28, gender: 'Female', queuePosition: 60 },
]

// Component
function HPTodaysAppointmentsScreen() {
  const [activeTab, setActiveTab] = useState(0)
  const [expandedCardId, setExpandedCardId] = useState<string | null>(null)
  const [modalVisible, setModalVisible] = useState(false)
  const [selectedAction, setSelectedAction] = useState<SelectedAction | null>(null)

  const isCompleteTab = activeTab === 1

  // Handlers
  const handleToggleCard = useCallback((id: string) => {
    setExpandedCardId((prev) => (prev === id ? null : id))
  }, [])

  const handleConfirmation = useCallback(
    (action: ActionType, patient: Patient) => {
      const actionType = isCompleteTab && action === 'cancel' ? 'move-to-ongoing' : action
      setSelectedAction({ type: actionType, patientId: patient.id, patient })
      setModalVisible(true)
    },
    [isCompleteTab],
  )

  const handleConfirm = useCallback(() => {
    if (selectedAction) {
      console.log(`${selectedAction.type} appointment for patient ${selectedAction.patientId}`)
      setModalVisible(false)
      setSelectedAction(null)
    }
  }, [selectedAction])

  const handleCloseModal = useCallback(() => {
    setModalVisible(false)
    setSelectedAction(null)
  }, [])

  const renderPatientCard = useCallback(
    ({ item }: { item: Patient }) => (
      <PatientCard
        patient={item}
        isExpanded={expandedCardId === item.id}
        onToggle={handleToggleCard}
        isCompleteTab={isCompleteTab}
        onCancel={() => handleConfirmation('cancel', item)}
        onComplete={() => handleConfirmation('complete', item)}
        onMoveToOngoing={() => handleConfirmation('move-to-ongoing', item)}
      />
    ),
    [expandedCardId, isCompleteTab, handleToggleCard, handleConfirmation],
  )

  const keyExtractor = useCallback((item: Patient) => item.id, [])

  return (
    <View className="flex-1 bg-white dark:bg-neutral-900">
      <HybridHead
        searchPlaceholder="Search doctors, specialties..."
        showMenu={true}
        showDoctorInfo={true}
        chipItems={CHIP_ITEMS}
        selectedChipId={activeTab}
        onChipSelect={setActiveTab}
      />

      {selectedAction && (
        <ConfirmationModal
          visible={modalVisible}
          onClose={handleCloseModal}
          onConfirm={handleConfirm}
          title={`Do you want to ${selectedAction.type} this appointment?`}
          actionType={selectedAction.type}
          patient={selectedAction.patient}
        />
      )}

      <FlatList
        data={SAMPLE_PATIENTS}
        renderItem={renderPatientCard}
        keyExtractor={keyExtractor}
        contentContainerClassName="px-5 pt-1"
        showsVerticalScrollIndicator={false}
        ListFooterComponent={PaddingBottom}
      />
    </View>
  )
}

export default memo(HPTodaysAppointmentsScreen)