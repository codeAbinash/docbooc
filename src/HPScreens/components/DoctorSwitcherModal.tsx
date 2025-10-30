import Cancel01Icon from '@hugeicons/Cancel01Icon'
import Tick02Icon from '@hugeicons/Tick02Icon'
import Colors from '@utils/colors'
import { Medium, SemiBold } from '@utils/fonts'
import { useState, memo } from 'react'
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

const DoctorSwitcherModal = memo(({ visible, onClose, currentDoctorId, onSelectDoctor }: DoctorSwitcherModalProps) => {
  const [selectedId, setSelectedId] = useState(currentDoctorId)

  const handleSelect = (doctor: Doctor) => {
    setSelectedId(doctor.id)
    onSelectDoctor(doctor)
    onClose()
  }

  return (
    <Modal visible={visible} transparent animationType='none' onRequestClose={onClose}>
      <TouchableOpacity className='flex-1 bg-black/50' activeOpacity={1} onPress={onClose}>
        <View className='flex-1 items-center justify-center px-5'>
          <TouchableOpacity
            activeOpacity={1}
            className='w-full max-w-md rounded-3xl bg-white p-6 dark:bg-neutral-900'
            onPress={(e) => e.stopPropagation()}
          >
            <View className='mb-5 flex-row items-center justify-between'>
              <SemiBold className='text-xl'>Switch Doctor</SemiBold>
              <TouchableOpacity onPress={onClose}>
                <Cancel01Icon size={22} color={Colors.text.DEFAULT} />
              </TouchableOpacity>
            </View>

            <ScrollView className='max-h-96'>
              <View className='gap-2'>
                {DOCTORS.map((doctor) => {
                  const isSelected = selectedId === doctor.id
                  return (
                    <TouchableOpacity
                      key={doctor.id}
                      onPress={() => handleSelect(doctor)}
                      className='flex-row items-center gap-3 rounded-2xl p-4'
                      style={{
                        backgroundColor: isSelected ? `${Colors.accent}15` : 'transparent',
                        borderWidth: 1,
                        borderColor: isSelected ? Colors.accent : '#e5e7eb',
                      }}
                    >
                      <View className='flex-1'>
                        <SemiBold style={{ color: isSelected ? Colors.accent : Colors.text.DEFAULT }}>
                          {doctor.name}
                        </SemiBold>
                        <Medium className='opacity-70'>{doctor.specialty}</Medium>
                      </View>
                      {isSelected && <Tick02Icon size={22} color={Colors.accent} strokeWidth={2} />}
                    </TouchableOpacity>
                  )
                })}
              </View>
            </ScrollView>
          </TouchableOpacity>
        </View>
      </TouchableOpacity>
    </Modal>
  )
})

export default DoctorSwitcherModal
