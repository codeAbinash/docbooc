import Cancel01Icon from '@hugeicons/Cancel01Icon'
import TickDouble02Icon from '@hugeicons/TickDouble02Icon'
import Colors from '@utils/colors'
import { Medium, SemiBold } from '@utils/fonts'
import { memo } from 'react'
import { TouchableOpacity, View } from 'react-native'

type Patient = {
  id: string
  name: string
  age: number
  gender: 'Male' | 'Female' | 'Other'
  queuePosition: number
  status?: 'provisional' | 'confirmed'
}

type PatientCardProps = {
  patient: Patient
  isExpanded: boolean
  onToggle: (patientId: string) => void
  isCompleteTab?: boolean
  onCancel?: () => void
  onComplete?: () => void
  onMoveToOngoing?: () => void
  hideActions?: boolean
}

const ActionButton = memo(({ onPress, icon: Icon, color, bgColor, label }: any) => (
  <TouchableOpacity
    onPress={onPress}
    className={`flex-1 flex-row items-center justify-center rounded-xl py-3.5 ${bgColor}`}
  >
    <Icon size={18} color={color} strokeWidth={2.5} />
    <SemiBold className='ml-2'>{label}</SemiBold>
  </TouchableOpacity>
))

const QueueNumber = memo(({ number }: { number: number }) => (
  <View className='mr-4 size-[58px] items-center justify-center rounded-xl bg-accent/10'>
    <SemiBold className='text-2xl text-accent'>{number.toString().padStart(2, '0')}</SemiBold>
  </View>
))

const Status = memo(({ status }: { status?: 'provisional' | 'confirmed' }) => {
  if (!status) return null

  const config = {
    confirmed: {
      bg: 'bg-green-500/10',
      text: 'text-green-600 dark:text-green-400',
      border: 'border-green-500/20',
      icon: '✓',
    },
    provisional: {
      bg: 'bg-yellow-500/10',
      text: 'text-yellow-600 dark:text-yellow-400',
      border: 'border-yellow-500/20',
      icon: '•',
    },
  }

  const style = config[status]

  return (
    <View className={`rounded-lg border px-2 py-0.5 ${style.bg} ${style.border}`}>
      <View className='flex-row items-center gap-0.5'>
        <Medium className={`text-[10px] ${style.text}`}>{style.icon}</Medium>
        <Medium className={`text-[10px] capitalize ${style.text}`}>{status}</Medium>
      </View>
    </View>
  )
})

const PatientInfo = memo(({ name, gender, age }: { name: string; gender: string; age: number }) => (
  <View className='flex-1'>
    <SemiBold className='text-lg text-neutral-900 dark:text-white'>{name}</SemiBold>
    <View className='mt-0.5 flex-row items-center'>
      <Medium className='text-sm text-neutral-600 dark:text-neutral-400'>
        {gender} • {age} years
      </Medium>
    </View>
  </View>
))

const PatientCard = memo(
  ({
    patient,
    isExpanded,
    onToggle,
    isCompleteTab = false,
    onCancel,
    onComplete,
    onMoveToOngoing,
    hideActions = false,
  }: PatientCardProps) => (
    <View className='mb-3 rounded-[19px] bg-white dark:bg-zinc-900'>
      <TouchableOpacity onPress={hideActions ? undefined : () => onToggle(patient.id)} className='p-3.5'>
        <View className='flex-row'>
          <QueueNumber number={patient.queuePosition} />
          <View className='flex-1'>
            <View className='flex-row items-start justify-between'>
              <View className='mr-3 flex-1'>
                <PatientInfo name={patient.name} gender={patient.gender} age={patient.age} />
              </View>
              {patient.status && <Status status={patient.status} />}
            </View>
          </View>
        </View>
      </TouchableOpacity>

      {!hideActions && isExpanded && (
        <View className='flex-row gap-3 px-3 pb-3'>
          {isCompleteTab ? (
            <ActionButton
              onPress={onMoveToOngoing}
              icon={TickDouble02Icon}
              color='#eab308'
              bgColor='bg-yellow-500/15'
              label={<SemiBold className='text-yellow-600 dark:text-yellow-400'>Move to Ongoing</SemiBold>}
            />
          ) : (
            <>
              <ActionButton
                onPress={onCancel}
                icon={Cancel01Icon}
                color='#ef4444'
                bgColor='bg-red-500/15'
                label={<SemiBold className='text-red-600 dark:text-red-400'>Cancel</SemiBold>}
              />
              <ActionButton
                onPress={onComplete}
                icon={TickDouble02Icon}
                color={Colors.success}
                bgColor='bg-green-500/15'
                label={<SemiBold className='text-green-600 dark:text-green-400'>Complete</SemiBold>}
              />
            </>
          )}
        </View>
      )}
    </View>
  ),
)

export default PatientCard
