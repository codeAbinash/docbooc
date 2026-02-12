import Animations from '@/assets/animations/animations'
import ConfirmationModal from '@/HPScreens/components/ConfirmationModal'
import HybridHead from '@components/HybridHead'
import { Lottie } from '@components/Lottie'
import { PaddingBottom } from '@components/SafePadding'
import { Toggle } from '@components/Toggle'
import Loading03Icon from '@hugeicons/Loading03Icon'
import TickDouble02Icon from '@hugeicons/TickDouble02Icon'
import popupStore from '@/zustand/popupStore'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import { client } from '@utils/client'
import { Medium, SemiBold } from '@utils/fonts'
import type { Doctor, Patient } from '@utils/types'
import { memo, useCallback, useEffect, useState } from 'react'
import { Animated, FlatList, RefreshControl, TouchableOpacity, View } from 'react-native'
import PatientCard, { PatientCardShimmer } from '../components/PatientCard'

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
  { id: 2, name: 'Cancelled', icon: TickDouble02Icon },
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
  status: appointment.bookingStatus === 'confirmed' ? 'confirmed' : 'provisional',
})

// Component
function HPTodaysAppointmentsScreen() {
  const [activeTab, setActiveTab] = useState(0)
  const [expandedCardId, setExpandedCardId] = useState<string | null>(null)
  const [modalVisible, setModalVisible] = useState(false)
  const [selectedAction, setSelectedAction] = useState<SelectedAction | null>(null)
  const [selectedDoctor, setSelectedDoctor] = useState<Doctor | undefined>()
  const [refreshing, setRefreshing] = useState(false)
  const [isQuickBookEnabled, setIsQuickBookEnabled] = useState(true)
  const [showQuickBookSplash, setShowQuickBookSplash] = useState(false)
  const [splashAnimValue] = useState(new Animated.Value(1))

  const handleChipSelect = useCallback((id: number | string) => {
    setActiveTab(typeof id === 'number' ? id : Number(id))
  }, [])

  const handleQuickBookToggle = useCallback(() => {
    if (!isQuickBookEnabled) {
      popupStore
        .getState()
        .alert(
          'Turn On Quick Book?',
          'Note: Bookings made through Quick Book require on-the-spot payment. The OPD Manager is responsible for accepting and processing this payment.',
          [
            {
              text: 'No',
            },
            {
              text: 'Yes',
              onPress: () => {
                setIsQuickBookEnabled(true)
                setShowQuickBookSplash(true)
                setTimeout(() => setShowQuickBookSplash(false), 3000)
              },
            },
          ],
        )
    } else {
      setIsQuickBookEnabled(false)
    }
  }, [isQuickBookEnabled])

  const queryClient = useQueryClient()

  const isCompleteTab = activeTab === 1
  const isCancelledTab = activeTab === 2

  const { data: myDoctors, isPending } = useQuery({
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

  useEffect(() => {
    if (showQuickBookSplash) {
      Animated.loop(
        Animated.sequence([
          Animated.timing(splashAnimValue, {
            toValue: 0.4,
            duration: 800,
            useNativeDriver: true,
          }),
          Animated.timing(splashAnimValue, {
            toValue: 1,
            duration: 800,
            useNativeDriver: true,
          }),
        ]),
      ).start()
    } else {
      splashAnimValue.setValue(1)
    }
  }, [showQuickBookSplash, splashAnimValue])

  const {
    data: todaysAppointments,
    refetch,
    isLoading: isLoadingAppointments,
  } = useQuery({
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
      const data = response.data || []
      return data.map((appointment: Patient, index: number) => ({
        ...appointment,
        queueNo: index + 1,
      }))
    },
    enabled: !!selectedDoctor?.id,
  })

  const handleRefresh = useCallback(async () => {
    setRefreshing(true)
    await refetch()
    setRefreshing(false)
  }, [refetch])

  const filteredAppointments = (todaysAppointments || []).filter((appointment) => {
    if (activeTab === 1) {
      return appointment.visitStatus === 'complete'
    }
    if (activeTab === 2) {
      return appointment.visitStatus === 'missed'
    }
    return appointment.visitStatus !== 'complete' && appointment.visitStatus !== 'missed'
  })

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

  const handleConfirm = useCallback(
    async (visitStatus: 'missed' | 'complete' | 'ongoing') => {
      if (!selectedAction) return
      setModalVisible(false)
      try {
        const res = await client.api.v1.hp.bookings.patients[':bookingId'].status.$put({
          param: { bookingId: selectedAction.patientId },
          json: { visitStatus },
        })
        const data = await res.json()
        console.log('booking updated', data)
        queryClient.invalidateQueries({ queryKey: ['todays-appointments', selectedDoctor?.id ?? ''] })
      } catch (err) {
        console.error('Failed to update booking status', err)
      } finally {
        setSelectedAction(null)
      }
    },
    [selectedAction, queryClient, selectedDoctor?.id],
  )

  const handleCloseModal = useCallback(() => {
    setModalVisible(false)
    setSelectedAction(null)
  }, [])

  const renderPatientCard = useCallback(
    ({ item }: { item: Patient }) => {
      const transformedPatient = transformAppointmentToPatientCard(item)
      return (
        <PatientCard
          patient={{ ...transformedPatient, queuePosition: item.queueNo || 0 }}
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

  const renderEmptyState = useCallback(() => {
    let mainText = 'No Ongoing Appointments'
    let subText = 'All appointments are completed. Great job!'
    if (activeTab === 1) {
      mainText = 'No Completed Appointments'
      subText = 'No appointments have been completed yet.'
    } else if (activeTab === 2) {
      mainText = 'No Cancelled Appointments'
      subText = 'No appointments have been cancelled.'
    }
    return <EmptyState mainText={mainText} subText={subText} />
  }, [activeTab])

  return (
    <View className='flex-1 bg-white dark:bg-neutral-900'>
      <HybridHead
        searchPlaceholder='Search doctors, specialties...'
        showMenu={true}
        showDoctorInfo={true}
        chipItems={CHIP_ITEMS}
        selectedChipId={activeTab}
        onChipSelect={handleChipSelect}
        doctors={myDoctors || []}
        doctorInfo={selectedDoctor}
        onDoctorSelect={setSelectedDoctor}
      />

      {selectedAction && (
        <ConfirmationModal
          visible={modalVisible}
          onClose={handleCloseModal}
          onConfirm={() => {
            const visitStatus = selectedAction.type === 'complete' ? 'complete' : 'ongoing'
            handleConfirm(visitStatus)
          }}
          title={`Do you want to ${selectedAction.type} this appointment?`}
          actionType={selectedAction.type}
          patient={selectedAction.transformedPatient}
        />
      )}

      {/* Show shimmer only when appointments are loading (after doctors are loaded) */}
      {!isPending && isLoadingAppointments && <Shimmer />}

      {/* Show FlatList when both doctors and appointments are loaded */}
      {!isPending && !isLoadingAppointments && (
        <FlatList
          data={filteredAppointments}
          renderItem={renderPatientCard}
          keyExtractor={keyExtractor}
          contentContainerClassName='px-6 py-1 pb-32'
          showsVerticalScrollIndicator={false}
          ListEmptyComponent={renderEmptyState}
          refreshControl={<RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />}
        />
      )}

      <View
        className={`absolute bottom-0 left-0 right-0 ${isQuickBookEnabled ? 'bg-blue-500' : 'bg-white'} dark:bg-neutral-900`}
      >
        <View className='flex flex-row justify-between border-b border-t border-neutral-200 px-6 py-4'>
          <Medium className={`text-lg ${isQuickBookEnabled ? 'text-white' : 'text-neutral-800'}`}>
            Quick Book
          </Medium>
          <TouchableOpacity onPress={handleQuickBookToggle} activeOpacity={0.8}>
            <Toggle isActive={isQuickBookEnabled} />
          </TouchableOpacity>
        </View>
        <PaddingBottom />
      </View>

      {showQuickBookSplash && (
        <View className='absolute inset-0 flex items-center justify-center bg-blue-500'>
          <Animated.Text style={{ opacity: splashAnimValue }} className='text-6xl font-bold text-white'>
            Quick Book
          </Animated.Text>
        </View>
      )}
    </View>
  )
}

function EmptyState({ mainText, subText }: { mainText: string; subText: string }) {
  return (
    <View className='flex-1 items-center justify-center py-20'>
      <Lottie source={Animations.cal} size={250} loop={true} hardwareAccelerationAndroid={true} />
      <SemiBold className='mb-2 mt-5 text-center text-lg font-semibold text-neutral-700 dark:text-neutral-300'>
        {mainText}
      </SemiBold>
      <Medium className='text-center text-sm text-neutral-500 dark:text-neutral-400'>{subText}</Medium>
    </View>
  )
}

export default memo(HPTodaysAppointmentsScreen)

function Shimmer() {
  return (
    <View className='px-6 pt-1'>
      {Array.from({ length: 10 }).map((_, index) => (
        <PatientCardShimmer key={index} />
      ))}
    </View>
  )
}
