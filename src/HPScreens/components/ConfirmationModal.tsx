import { Medium, SemiBold } from '@utils/fonts'
import { memo } from 'react'
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

const ConfirmationModal = memo(
  ({ visible, onClose, onConfirm, title, actionType, patient }: ConfirmationModalProps) => {
    const isCancel = actionType === 'cancel'
    const isMoveToOngoing = actionType === 'move-to-ongoing'

    const getBackgroundColor = () => {
      if (isCancel) return 'bg-red-100/50 dark:bg-red-900/20'
      if (isMoveToOngoing) return 'bg-yellow-100/50 dark:bg-yellow-900/20'
      return 'bg-green-100/50 dark:bg-green-900/20'
    }

    const getIconColor = () => {
      if (isCancel) return '#ef4444'
      if (isMoveToOngoing) return '#eab308'
      return Colors.success
    }

    return (
      <Modal visible={visible} transparent animationType='fade'>
        <View className='flex-1 justify-center bg-black/50 px-5'>
          <View className='overflow-hidden rounded-2xl bg-white dark:bg-neutral-800'>
            {/* Header */}
            <View className='border-b border-neutral-100 p-4 dark:border-neutral-700'>
              <View className='flex-row items-center justify-between'>
                <View className='flex-1 flex-row items-center gap-3'>
                  <View className={`rounded-lg ${getBackgroundColor()} p-2.5`}>
                    {isCancel ? (
                      <Cancel01Icon size={20} color={getIconColor()} strokeWidth={2} />
                    ) : (
                      <TickDouble02Icon size={20} color={getIconColor()} strokeWidth={2} />
                    )}
                  </View>
                  <SemiBold className='flex-shrink text-lg text-neutral-800 dark:text-neutral-200'>{title}</SemiBold>
                </View>
              </View>
            </View>

            {/* Patient Info */}
            <View className='border-b border-neutral-100 p-4 dark:border-neutral-700'>
              <View className='flex-row items-center'>
                <View className='mr-4'>
                  <Medium>
                    <View className='size-[65px] items-center justify-center rounded-xl bg-accent/10'>
                      <SemiBold className='text-center text-3xl text-accent'>
                        {patient.queuePosition.toString().padStart(2, '0')}
                      </SemiBold>
                    </View>
                  </Medium>
                </View>

                <View className='flex-1'>
                  <SemiBold className='text text-lg'>{patient.name}</SemiBold>
                  <Medium className='mt-1 text-sm text-neutral-600 dark:text-neutral-400'>
                    {patient.gender} • {patient.age} years
                  </Medium>
                </View>
              </View>
            </View>

            {/* Action Buttons */}
            <View className='flex-row p-4'>
              <TouchableOpacity
                onPress={onClose}
                activeOpacity={0.7}
                className='flex-1 rounded-xl border-2 border-neutral-100 py-3 dark:border-neutral-700'
              >
                <Medium className='text-center text-neutral-800 dark:text-neutral-200'>No</Medium>
              </TouchableOpacity>
              <View className='w-3' />
              <TouchableOpacity
                onPress={onConfirm}
                activeOpacity={0.7}
                className={`flex-1 rounded-xl py-3 ${
                  isCancel ? 'bg-red-500' : isMoveToOngoing ? 'bg-yellow-500' : 'bg-green-500'
                }`}
              >
                <SemiBold className='text-center text-white'>Yes</SemiBold>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    )
  },
)

export default ConfirmationModal
