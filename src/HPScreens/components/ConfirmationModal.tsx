import { Medium, SemiBold } from '@utils/fonts'
import { memo, useMemo, useCallback } from 'react'
import { Modal, TouchableOpacity, View } from 'react-native'
import TickDouble02Icon from '@hugeicons/TickDouble02Icon'
import Cancel01Icon from '@hugeicons/Cancel01Icon'
import Colors from '@utils/colors'

type Patient = {
  id: string
  name: string
  age: number
  gender: 'Male' | 'Female' | 'Other'
  queuePosition: number
}

type ConfirmationModalProps = {
  visible: boolean
  onClose: () => void
  onConfirm: () => void
  title: string
  actionType: 'cancel' | 'complete' | 'move-to-ongoing'
  patient: Patient
}

type ActionConfig = {
  bgColor: string
  iconColor: string
  buttonColor: string
  Icon: typeof TickDouble02Icon | typeof Cancel01Icon
}

const ACTION_CONFIGS: Record<ConfirmationModalProps['actionType'], ActionConfig> = {
  cancel: {
    bgColor: 'bg-red-100/50 dark:bg-red-900/20',
    iconColor: '#ef4444',
    buttonColor: 'bg-red-500',
    Icon: Cancel01Icon,
  },
  'move-to-ongoing': {
    bgColor: 'bg-yellow-100/50 dark:bg-yellow-900/20',
    iconColor: '#eab308',
    buttonColor: 'bg-yellow-500',
    Icon: TickDouble02Icon,
  },
  complete: {
    bgColor: 'bg-green-100/50 dark:bg-green-900/20',
    iconColor: Colors.success,
    buttonColor: 'bg-green-500',
    Icon: TickDouble02Icon,
  },
}

const PatientInfo = memo<{ patient: Patient }>(({ patient }) => (
  <View className='border-b border-neutral-100 p-4 dark:border-neutral-700'>
    <View className='flex-row items-center'>
      <View className='pr-4'>
        <View className='size-[65px] items-center justify-center rounded-xl bg-accent/10'>
          <SemiBold className='text-3xl text-accent'>{patient.queuePosition.toString().padStart(2, '0')}</SemiBold>
        </View>
      </View>

      <View className='flex-1'>
        <SemiBold className='text-lg text-neutral-900 dark:text-white'>{patient.name}</SemiBold>
        <View className='pt-1'>
          <Medium className='text-sm text-neutral-600 dark:text-neutral-400'>
            {patient.gender} • {patient.age} years
          </Medium>
        </View>
      </View>
    </View>
  </View>
))

PatientInfo.displayName = 'PatientInfo'

const ActionButtons = memo<{ onClose: () => void; onConfirm: () => void; buttonColor: string }>(
  ({ onClose, onConfirm, buttonColor }) => (
    <View className='flex-row gap-3 p-4'>
      <TouchableOpacity
        onPress={onClose}
        activeOpacity={0.7}
        className='flex-1 rounded-xl border-2 border-neutral-200 py-3 dark:border-neutral-700'
      >
        <Medium className='text-center text-neutral-800 dark:text-neutral-200'>No</Medium>
      </TouchableOpacity>
      <TouchableOpacity onPress={onConfirm} activeOpacity={0.7} className={`flex-1 rounded-xl py-3 ${buttonColor}`}>
        <SemiBold className='text-center text-white'>Yes</SemiBold>
      </TouchableOpacity>
    </View>
  ),
)

ActionButtons.displayName = 'ActionButtons'

const ConfirmationModal = memo<ConfirmationModalProps>(
  ({ visible, onClose, onConfirm, title, actionType, patient }) => {
    const config = useMemo(() => ACTION_CONFIGS[actionType] || ACTION_CONFIGS.complete, [actionType])

    const handleBackdropPress = useCallback(() => {
      // Prevent closing modal when clicking backdrop
    }, [])

    return (
      <Modal
        visible={visible}
        transparent
        animationType='fade'
        onRequestClose={onClose}
        hardwareAccelerated
        statusBarTranslucent
      >
        <TouchableOpacity
          className='flex-1 justify-center bg-black/50 px-5'
          activeOpacity={1}
          onPress={handleBackdropPress}
        >
          <TouchableOpacity activeOpacity={1} onPress={(e) => e.stopPropagation()}>
            <View className='overflow-hidden rounded-2xl bg-white dark:bg-neutral-800'>
              {/* Header */}
              <View className='border-b border-neutral-100 p-4 dark:border-neutral-700'>
                <View className='flex-row items-center gap-3'>
                  <View className={`rounded-lg ${config.bgColor} p-2.5`}>
                    <config.Icon size={20} color={config.iconColor} strokeWidth={2} />
                  </View>
                  <SemiBold className='flex-1 text-lg text-neutral-800 dark:text-neutral-200'>{title}</SemiBold>
                </View>
              </View>

              {/* Patient Info */}
              <PatientInfo patient={patient} />

              {/* Action Buttons */}
              <ActionButtons onClose={onClose} onConfirm={onConfirm} buttonColor={config.buttonColor} />
            </View>
          </TouchableOpacity>
        </TouchableOpacity>
      </Modal>
    )
  },
)

ConfirmationModal.displayName = 'ConfirmationModal'

export default ConfirmationModal
