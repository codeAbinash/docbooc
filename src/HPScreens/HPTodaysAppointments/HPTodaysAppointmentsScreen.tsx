import ConfirmationModal from '@/HPScreens/components/ConfirmationModal'
import HybridHead from '@components/HybridHead'
import Loading03Icon from '@hugeicons/Loading03Icon'
import TickDouble02Icon from '@hugeicons/TickDouble02Icon'
import { useQuery } from '@tanstack/react-query'
import { client } from '@utils/client'
import type { Doctor } from '@utils/types'
import { memo, useCallback, useEffect, useState } from 'react'
import { View } from 'react-native'
import PatientCard from '../components/PatientCard'

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

// Component
function HPTodaysAppointmentsScreen() {
  const [activeTab, setActiveTab] = useState(0)
  const [expandedCardId, setExpandedCardId] = useState<string | null>(null)
  const [modalVisible, setModalVisible] = useState(false)
  const [selectedAction, setSelectedAction] = useState<SelectedAction | null>(null)
  const [selectedDoctor, setSelectedDoctor] = useState<Doctor | undefined>()

  const isCompleteTab = activeTab === 1

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

  const { data: todaysAppointments } = useQuery({
    queryKey: ['todays-appointments', selectedDoctor?.id],
    queryFn: async () => {
      if (!selectedDoctor?.id) return []
      const response = await (
        await client.api.v1.hp.bookings['by-doctor'][':doctorId'].$get({
          param: { doctorId: selectedDoctor.id },
          query: {
            date: new Date().toISOString().split('T')[0],
          },
        })
      ).json()
      return response.data || []
    },
    enabled: !!selectedDoctor?.id,
  })

  console.log(todaysAppointments)

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
    <View className='flex-1 bg-white dark:bg-neutral-900'>
      <HybridHead
        searchPlaceholder='Search doctors, specialties...'
        showMenu={true}
        showDoctorInfo={true}
        chipItems={CHIP_ITEMS}
        selectedChipId={activeTab}
        onChipSelect={setActiveTab}
        doctors={myDoctors || []}
        doctorInfo={selectedDoctor}
        onDoctorSelect={setSelectedDoctor}
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

      {/* <FlatList
        data={SAMPLE_PATIENTS}
        renderItem={renderPatientCard}
        keyExtractor={keyExtractor}
        contentContainerClassName='px-5 pt-1'
        showsVerticalScrollIndicator={false}
        ListFooterComponent={PaddingBottom}
      /> */}
    </View>
  )
}

export default memo(HPTodaysAppointmentsScreen)
