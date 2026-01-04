import Clock03Icon from '@assets/icons/hugeicons/Clock03Icon'
import Doctor01Icon from '@assets/icons/hugeicons/Doctor01Icon'
import Location06Icon from '@assets/icons/hugeicons/Location06Icon'
import PatientIcon from '@assets/icons/hugeicons/PatientIcon'
import Calendar01Icon from '@hugeicons/Calendar01Icon'
import { Medium, SemiBold } from '@utils/fonts'
import { View } from 'react-native'
import { formatDateParts, formatLocationAddress } from './utils'

interface AppointmentDetailsProps {
  doctorName?: string
  doctorSpecialty?: string
  patientName?: string
  patientAge?: number | string
  appointmentTime?: string
  appointmentDate?: string
  locationName?: string
  houseNumber?: string | null
  roadName?: string | null
  city?: string | null
  state?: string | null
  pin?: string | null
  queueNumber?: number | string
}

const InfoRow = ({
  icon,
  iconBg,
  label,
  value,
  subValue,
  rightContent,
}: {
  icon: React.ReactNode
  iconBg: string
  label: string
  value: string
  subValue?: string
  rightContent?: React.ReactNode
}) => (
  <View className='border-b border-neutral-100 px-4 py-3 dark:border-neutral-700'>
    <View className='flex-row items-start gap-3'>
      <View className={`rounded-md ${iconBg} p-2`}>{icon}</View>
      <View className='flex-1'>
        <SemiBold className='text-base text-neutral-600 dark:text-neutral-400'>{label}</SemiBold>
        <Medium className='mt-1 text-base text-neutral-900 dark:text-white'>{value}</Medium>
        {subValue && <Medium className='mt-1 text-base text-neutral-600 dark:text-neutral-400'>{subValue}</Medium>}
      </View>
      {rightContent}
    </View>
  </View>
)

export const AppointmentDetailsCard = ({
  doctorName = 'N/A',
  doctorSpecialty = 'N/A',
  patientName = 'N/A',
  patientAge = 'N/A',
  appointmentTime = 'N/A',
  appointmentDate = '',
  locationName = 'N/A',
  houseNumber,
  roadName,
  city,
  state,
  pin,
  queueNumber = 'N/A',
}: AppointmentDetailsProps) => {
  const { day: appointmentDay, date: formattedDate } = formatDateParts(appointmentDate)
  const locationAddress = formatLocationAddress(houseNumber, roadName, city, state, pin)

  return (
    <View className='overflow-hidden rounded-3xl border border-neutral-300 bg-white dark:border-neutral-700 dark:bg-zinc-900'>
      <View className='border-b border-neutral-300 px-4 py-3 dark:border-neutral-700'>
        <View className='flex-row items-center gap-3'>
          <View className='rounded-md bg-blue-100/50 p-2 dark:bg-blue-900/20'>
            <Calendar01Icon size={20} color='#3b82f6' strokeWidth={2} />
          </View>
          <SemiBold className='text-lg text-neutral-900 dark:text-white'>Appointment Details</SemiBold>
        </View>
      </View>

      <InfoRow
        icon={<Doctor01Icon size={16} color='#3b82f6' strokeWidth={2} />}
        iconBg='bg-blue-100/50 dark:bg-blue-900/20'
        label='Doctor'
        value={doctorName}
        subValue={doctorSpecialty}
      />

      <InfoRow
        icon={<PatientIcon size={16} color='#3b82f6' strokeWidth={2} />}
        iconBg='bg-blue-100/50 dark:bg-blue-900/20'
        label='Patient'
        value={patientName}
        subValue={`Age: ${patientAge}`}
      />

      <InfoRow
        icon={<Clock03Icon size={16} color='#3b82f6' strokeWidth={2} />}
        iconBg='bg-blue-100/50 dark:bg-blue-900/20'
        label='Appointment'
        value={appointmentTime}
        subValue={`${appointmentDay}, ${formattedDate}`}
        rightContent={
          <View className='items-end'>
            <SemiBold className='text-base text-neutral-600 dark:text-neutral-400'>Queue</SemiBold>
            <Medium className='mt-1 text-lg text-blue-600 dark:text-blue-400'>Q{queueNumber}</Medium>
          </View>
        }
      />

      <View className='px-4 py-3'>
        <View className='flex-row items-start gap-3'>
          <View className='rounded-md bg-blue-100/50 p-2 dark:bg-blue-900/20'>
            <Location06Icon size={16} color='#3b82f6' strokeWidth={2} />
          </View>
          <View className='flex-1'>
            <SemiBold className='text-base text-neutral-600 dark:text-neutral-400'>Location</SemiBold>
            <Medium className='mt-1 text-base text-neutral-900 dark:text-white'>{locationName}</Medium>
            <Medium className='mt-1 text-base text-neutral-600 dark:text-neutral-400'>{locationAddress}</Medium>
          </View>
        </View>
      </View>
    </View>
  )
}
