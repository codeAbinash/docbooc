import Cancel01Icon from '@hugeicons/Cancel01Icon'
import Tick02Icon from '@hugeicons/Tick02Icon'
import Colors from '@utils/colors'
import { Medium, SemiBold } from '@utils/fonts'
import { memo, useCallback } from 'react'
import { Modal, ScrollView, TouchableOpacity, View } from 'react-native'

type Doctor = {
  id: string
  name: string
  specialty: string
}

const DOCTORS: Doctor[] = [
  { id: '1', name: 'Dr. Abinash Karmakar', specialty: 'Cardiologist' },
  { id: '2', name: 'Dr. Sarah Johnson', specialty: 'Neurologist' },
  { id: '3', name: 'Dr. Michael Chen', specialty: 'Orthopedist' },
  { id: '4', name: 'Dr. Emily Davis', specialty: 'General Physician' },
  { id: '5', name: 'Dr. Robert Kim', specialty: 'Pediatrician' },
  { id: '6', name: 'Dr. Lisa Thompson', specialty: 'Dermatologist' },
]

type DoctorSwitcherModalProps = {
  visible: boolean
  onClose: () => void
  currentDoctorId: string
  onSelectDoctor: (doctor: Doctor) => void
}

type DoctorItemProps = {
  doctor: Doctor
  isSelected: boolean
  onSelect: (doctor: Doctor) => void
}

const DoctorItem = memo<DoctorItemProps>(({ doctor, isSelected, onSelect }) => {
  const handlePress = useCallback(() => {
    onSelect(doctor)
  }, [doctor, onSelect])

  return (
    <TouchableOpacity
      onPress={handlePress}
      className="flex-row items-center rounded-2xl p-4"
      style={{
        backgroundColor: isSelected ? `${Colors.accent}15` : 'transparent',
        borderWidth: 1,
        borderColor: isSelected ? Colors.accent : '#e5e7eb',
      }}
      activeOpacity={0.7}
    >
      <View className="flex-1 pr-3">
        <SemiBold 
          className="pb-2"
          style={{ color: isSelected ? Colors.accent : Colors.text.DEFAULT }}
        >
          {doctor.name}
        </SemiBold>
        <Medium className="opacity-70">{doctor.specialty}</Medium>
      </View>
      {isSelected && <Tick02Icon size={22} color={Colors.accent} strokeWidth={2} />}
    </TouchableOpacity>
  )
})

DoctorItem.displayName = 'DoctorItem'

const DoctorSwitcherModal = memo<DoctorSwitcherModalProps>(
  ({ visible, onClose, currentDoctorId, onSelectDoctor }) => {
    const handleSelect = useCallback(
      (doctor: Doctor) => {
        onSelectDoctor(doctor)
        onClose()
      },
      [onSelectDoctor, onClose]
    )

    const stopPropagation = useCallback((e: any) => {
      e.stopPropagation()
    }, [])

    return (
      <Modal visible={visible} transparent={true} animationType="fade" onRequestClose={onClose}>
        <TouchableOpacity className="flex-1 bg-black/50" activeOpacity={1} onPress={onClose}>
          <View className="flex-1 items-center justify-center px-5">
            <TouchableOpacity
              activeOpacity={1}
              className="w-full max-w-md rounded-3xl bg-white p-6 dark:bg-neutral-900"
              onPress={stopPropagation}
            >
              <View className="pb-5 flex-row items-center justify-between">
                <SemiBold className="text-xl">Switch Doctor</SemiBold>
                <TouchableOpacity onPress={onClose} hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}>
                  <Cancel01Icon size={22} color={Colors.text.DEFAULT} />
                </TouchableOpacity>
              </View>

              <ScrollView className="max-h-96" showsVerticalScrollIndicator={false}>
                <View className="gap-2">
                  {DOCTORS.map((doctor) => (
                    <DoctorItem
                      key={doctor.id}
                      doctor={doctor}
                      isSelected={currentDoctorId === doctor.id}
                      onSelect={handleSelect}
                    />
                  ))}
                </View>
              </ScrollView>
            </TouchableOpacity>
          </View>
        </TouchableOpacity>
      </Modal>
    )
  }
)

DoctorSwitcherModal.displayName = 'DoctorSwitcherModal'

export default DoctorSwitcherModal