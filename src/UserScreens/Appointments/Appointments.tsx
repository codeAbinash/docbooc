import Calendar03Icon from '@assets/icons/hugeicons/Calendar03Icon'
import Doctor01Icon from '@assets/icons/hugeicons/Doctor01Icon'
import PatientIcon from '@assets/icons/hugeicons/PatientIcon'
import Time04Icon from '@assets/icons/hugeicons/Time04Icon'
import HybridHead from '@components/HybridHead'
import Press from '@components/Press'
import { useNavigation } from '@react-navigation/native'
import Colors from '@utils/colors'
import { Medium, SemiBold } from '@utils/fonts'
import { StackNav } from '@utils/types'
import { useColorScheme } from 'nativewind'
import { useState } from 'react'
import { ScrollView, View } from 'react-native'

type Appointment = {
  id: string
  patientName: string
  doctorName: string
  date: string
  time: string
  queueNumber: number
  location: string
  status: 'provisional' | 'confirmed'
}

type AppointmentCardProps = {
  appointment: Appointment
  onPress?: () => void
}

function AppointmentCard({ appointment, onPress }: AppointmentCardProps) {
  const { colorScheme } = useColorScheme()
  const dark = colorScheme === 'dark'

  return (
    <Press
      onPress={onPress}
      className='overflow-hidden rounded-2xl border border-neutral-300 bg-white p-5 dark:bg-neutral-800'
    >
      {/* Status Badge */}
      <View className='mb-3 flex-row items-center justify-between'>
        <View
          className={`rounded-md px-3 py-1 ${
            appointment.status === 'confirmed'
              ? 'bg-green-100 dark:bg-green-900/30'
              : 'bg-orange-100 dark:bg-orange-900/30'
          }`}
        >
          <Medium
            className={`text-xs ${
              appointment.status === 'confirmed'
                ? 'text-green-700 dark:text-green-400'
                : 'text-orange-700 dark:text-orange-400'
            }`}
          >
            {appointment.status === 'confirmed' ? 'Confirmed' : 'Provisional'}
          </Medium>
        </View>
        <View className='dark:bg-blue-900/30'>
          <SemiBold className='text-base text-blue-700 dark:text-blue-400'>Q{appointment.queueNumber}</SemiBold>
        </View>
      </View>

      {/* Patient Info */}
      <View className='mb-3 flex-row items-center'>
        <View className='mr-3 rounded-full bg-blue-50 p-2 dark:bg-blue-900/20'>
          <PatientIcon size={20} color={dark ? Colors.accent : '#3b82f6'} />
        </View>
        <View className='flex-1'>
          <Medium className='text-xs text-neutral-500 dark:text-neutral-400'>Patient</Medium>
          <SemiBold className='text-base text-neutral-900 dark:text-white'>{appointment.patientName}</SemiBold>
        </View>
      </View>

      {/* Doctor Info */}
      <View className='mb-3 flex-row items-center'>
        <View className='mr-3 rounded-full bg-green-50 p-2 dark:bg-green-900/20'>
          <Doctor01Icon size={20} color={dark ? '#10B981' : '#059669'} />
        </View>
        <View className='flex-1'>
          <Medium className='text-xs text-neutral-500 dark:text-neutral-400'>Doctor</Medium>
          <SemiBold className='text-base text-neutral-900 dark:text-white'>Dr. {appointment.doctorName}</SemiBold>
        </View>
      </View>

      {/* Date & Time */}
      <View className='mb-3 flex-row'>
        <View className='mr-4 flex-1 flex-row items-center'>
          <View className='mr-3 rounded-full bg-purple-50 p-2 dark:bg-purple-900/20'>
            <Calendar03Icon size={18} color={dark ? '#a855f7' : '#8b5cf6'} />
          </View>
          <View>
            <Medium className='text-xs text-neutral-500 dark:text-neutral-400'>Date</Medium>
            <Medium className='text-sm text-neutral-900 dark:text-white'>{appointment.date}</Medium>
          </View>
        </View>

        <View className='flex-1 flex-row items-center'>
          <View className='mr-3 rounded-full bg-orange-50 p-2 dark:bg-orange-900/20'>
            <Time04Icon size={18} color={dark ? '#f97316' : '#ea580c'} />
          </View>
          <View>
            <Medium className='text-xs text-neutral-500 dark:text-neutral-400'>Time</Medium>
            <Medium className='text-sm text-neutral-900 dark:text-white'>{appointment.time}</Medium>
          </View>
        </View>
      </View>

      {/* Location */}
      <View className='rounded-lg bg-neutral-100 p-3 dark:bg-neutral-900'>
        <Medium className='text-xs text-neutral-500 dark:text-neutral-400'>Location</Medium>
        <Medium className='text-sm text-neutral-900 dark:text-white'>{appointment.location}</Medium>
      </View>
    </Press>
  )
}

// Sample data
const appointments: Appointment[] = [
  {
    id: '1',
    patientName: 'Sarah Johnson',
    doctorName: 'Michael Chen',
    date: 'Oct 15, 2024',
    time: '10:30 AM',
    queueNumber: 5,
    location: 'Room 201, Cardiology Wing',
    status: 'provisional',
  },
  {
    id: '2',
    patientName: 'Robert Wilson',
    doctorName: 'Emily Rodriguez',
    date: 'Oct 15, 2024',
    time: '2:15 PM',
    queueNumber: 12,
    location: 'Room 305, General Medicine',
    status: 'provisional',
  },
  {
    id: '3',
    patientName: 'Maria Garcia',
    doctorName: 'David Park',
    date: 'Oct 14, 2024',
    time: '9:00 AM',
    queueNumber: 3,
    location: 'Room 108, Pediatrics',
    status: 'confirmed',
  },
  {
    id: '4',
    patientName: 'James Brown',
    doctorName: 'Lisa Thompson',
    date: 'Oct 14, 2024',
    time: '11:45 AM',
    queueNumber: 8,
    location: 'Room 402, Orthopedics',
    status: 'confirmed',
  },
]

export default function Appointments() {
  const [activeTab, setActiveTab] = useState(0)
  const navigation = useNavigation<StackNav>()

  const tabLabels = ['Provisional', 'Confirmed']

  const filteredAppointments = appointments.filter((appointment) =>
    activeTab === 0 ? appointment.status === 'provisional' : appointment.status === 'confirmed',
  )

  const handleAppointmentPress = (appointment: Appointment) => {
    navigation.navigate('AppointmentDetails', { appointmentId: appointment.id, status: appointment.status } as any)
  }

  return (
    <View className='flex-1 bg-white dark:bg-neutral-900'>
      <HybridHead title='My Appointments' showBackButton={true} />
      <View className='flex-row gap-2 border-b border-neutral-300 bg-white px-5 py-4 dark:bg-neutral-900'>
        {tabLabels.map((label, index) => {
          const isActive = activeTab === index

          let backgroundColor = '#f3f4f6'
          let textColor = '#4b5563'

          if (isActive) {
            if (index === 0) {
              backgroundColor = '#f97316'
              textColor = '#ffffff'
            } else {
              backgroundColor = '#209928'
              textColor = '#ffffff'
            }
          }

          return (
            <Press
              key={index}
              onPress={() => setActiveTab(index)}
              className='flex-1 rounded-lg py-4'
              style={{ backgroundColor }}
            >
              <Medium className='text-center text-sm' style={{ color: textColor }}>
                {label}
              </Medium>
            </Press>
          )
        })}
      </View>

      <ScrollView
        className='flex-1 px-5'
        contentContainerStyle={{ paddingTop: 16, paddingBottom: 20 }}
        showsVerticalScrollIndicator={false}
        contentContainerClassName='gap-4'
      >
        {filteredAppointments.length > 0 ? (
          filteredAppointments.map((appointment) => (
            <AppointmentCard
              key={appointment.id}
              appointment={appointment}
              onPress={() => handleAppointmentPress(appointment)}
            />
          ))
        ) : (
          <View className='mt-20 items-center justify-center'>
            <Medium className='text-neutral-500 dark:text-neutral-400'>
              No {activeTab === 0 ? 'provisional' : 'confirmed'} appointments
            </Medium>
          </View>
        )}
      </ScrollView>
    </View>
  )
}
