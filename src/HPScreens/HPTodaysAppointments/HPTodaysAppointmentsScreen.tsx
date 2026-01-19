import ConfirmationModal from '@/HPScreens/components/ConfirmationModal'
import HybridHead from '@components/HybridHead'
import { PaddingBottom } from '@components/SafePadding'
import Loading03Icon from '@hugeicons/Loading03Icon'
import TickDouble02Icon from '@hugeicons/TickDouble02Icon'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import { client } from '@utils/client'
import type { Doctor, Patient } from '@utils/types'
import { memo, useCallback, useEffect, useState } from 'react'
import { FlatList, View } from 'react-native'
import PatientCard from '../components/PatientCard'

type ActionType = 'cancel' | 'complete' | 'move-to-ongoing'

interface SelectedAction {
  type: ActionType
  patientId: string
  patient: Patient
  transformedPatient: {
    id: string
    name: string
    age: number
    gender: 'Male' | 'Female' | 'Other'
    queuePosition: number
    status: 'confirmed' | 'provisional'
  }
}
const CHIP_ITEMS = [
  { id: 0, name: 'Ongoing', icon: Loading03Icon },
  { id: 1, name: 'Complete', icon: TickDouble02Icon },
]

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

// Component
function HPTodaysAppointmentsScreen() {
  const [activeTab, setActiveTab] = useState(0)
  const [expandedCardId, setExpandedCardId] = useState<string | null>(null)
  const [modalVisible, setModalVisible] = useState(false)
  const [selectedAction, setSelectedAction] = useState<SelectedAction | null>(null)
  const [selectedDoctor, setSelectedDoctor] = useState<Doctor | undefined>()

  const queryClient = useQueryClient()

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
      const todayDate = new Date().toISOString().split('T')[0] || ''
      const response = await (
        await client.api.v1.hp.bookings.patients.$get({
          query: {
            date: todayDate,
            doctorId: selectedDoctor.id,
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
      const transformedPatient = transformAppointmentToPatientCard(patient)
      setSelectedAction({ type: actionType, patientId: patient.id, patient, transformedPatient })
      setModalVisible(true)
    },
    [isCompleteTab],
  )

  const handleConfirm = useCallback(async () => {
    if (!selectedAction) return
    setModalVisible(false)
    try {
      if (selectedAction.type === 'complete') {
        const res = await client.api.v1.hp.bookings.patients[':bookingId'].status.$put({
          param: { bookingId: selectedAction.patientId },
          json: { status: 'completed' },
        })
        const data = await res.json()
        console.log('booking updated', data)
      }
      queryClient.invalidateQueries({ queryKey: ['todays-appointments', selectedDoctor?.id ?? ''] })
    } catch (err) {
      console.error('Failed to update booking status', err)
    } finally {
      setSelectedAction(null)
    }
  }, [selectedAction, queryClient, selectedDoctor?.id])

  const handleCloseModal = useCallback(() => {
    setModalVisible(false)
    setSelectedAction(null)
  }, [])

  const renderPatientCard = useCallback(
    ({ item }: { item: Patient }) => {
      const transformedPatient = transformAppointmentToPatientCard(item)
      return (
        <PatientCard
          patient={transformedPatient}
          isExpanded={expandedCardId === item.id}
          onToggle={handleToggleCard}
          isCompleteTab={isCompleteTab}
          onCancel={() => handleConfirmation('cancel', item)}
          onComplete={() => handleConfirmation('complete', item)}
          onMoveToOngoing={() => handleConfirmation('move-to-ongoing', item)}
        />
      )
    },
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
          patient={selectedAction.transformedPatient}
        />
      )}

      <FlatList
        data={todaysAppointments || []}
        renderItem={renderPatientCard}
        keyExtractor={keyExtractor}
        contentContainerClassName='px-5 pt-1'
        showsVerticalScrollIndicator={false}
        ListFooterComponent={PaddingBottom}
      />
    </View>
  )
}

export default memo(HPTodaysAppointmentsScreen)
