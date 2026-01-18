import Calendar03Icon from '@assets/icons/hugeicons/Calendar03Icon'
import Doctor01Icon from '@assets/icons/hugeicons/Doctor01Icon'
import PatientIcon from '@assets/icons/hugeicons/PatientIcon'
import Time04Icon from '@assets/icons/hugeicons/Time04Icon'
import HybridHead from '@components/HybridHead'
import Press from '@components/Press'
import Colors from '@utils/colors'
import { Medium, SemiBold } from '@utils/fonts'
import { useNavigation } from '@react-navigation/native'
import { AdminStackNav } from '@utils/types'
import { useColorScheme } from 'nativewind'
import { useState } from 'react'
import { ScrollView, View } from 'react-native'

type Booking = {
  id: string
  patientName: string
  doctorName: string
  date: string
  time: string
  queueNumber: number
  location: string
  hpName: string
  status: 'pending' | 'approved' | 'rejected'
}

type BookingCardProps = {
  booking: Booking
  onApprove?: () => void
  onReject?: () => void
  onPress?: () => void
}

function BookingCard({ booking, onApprove, onReject, onPress }: BookingCardProps) {
  const { colorScheme } = useColorScheme()
  const dark = colorScheme === 'dark'

  return (
    <Press
      onPress={onPress}
      className='overflow-hidden rounded-2xl border border-neutral-300 bg-white p-4 dark:bg-neutral-800'
    >
      {/* Status Badge */}
      <View className='pb-3 flex-row items-center justify-between'>
        <View
          className={`rounded-md px-3 py-1 ${
            booking.status === 'approved'
              ? 'bg-green-100 dark:bg-green-900/30'
              : booking.status === 'rejected'
                ? 'bg-red-100 dark:bg-red-900/30'
                : 'bg-yellow-100 dark:bg-yellow-900/30'
          }`}
        >
          <Medium
            className={`text-xs capitalize ${
              booking.status === 'approved'
                ? 'text-green-700 dark:text-green-400'
                : booking.status === 'rejected'
                  ? 'text-red-700 dark:text-red-400'
                  : 'text-yellow-700 dark:text-yellow-400'
            }`}
          >
            {booking.status}
          </Medium>
        </View>
        <View>
          <SemiBold className='text-base text-blue-700 dark:text-blue-400'>Q{booking.queueNumber}</SemiBold>
        </View>
      </View>

      {/* Patient Info */}
      <View className='pb-3 flex-row items-center'>
        <View className='mr-3 rounded-full bg-blue-50 p-2 dark:bg-blue-900/20'>
          <PatientIcon size={20} color={dark ? Colors.accent : '#3b82f6'} />
        </View>
        <View className='flex-1'>
          <Medium className='text-xs text-neutral-500 dark:text-neutral-400'>Patient</Medium>
          <SemiBold className='text-base text-neutral-900 dark:text-white'>{booking.patientName}</SemiBold>
        </View>
      </View>

      {/* HP Name */}
      <View className='pb-3 flex-row items-center'>
        <View className='mr-3 rounded-full bg-purple-50 p-2 dark:bg-purple-900/20'>
          <Doctor01Icon size={20} color={dark ? '#a855f7' : '#8b5cf6'} />
        </View>
        <View className='flex-1'>
          <Medium className='text-xs text-neutral-500 dark:text-neutral-400'>Healthcare Provider</Medium>
          <SemiBold className='text-base text-neutral-900 dark:text-white'>{booking.hpName}</SemiBold>
        </View>
      </View>

      {/* Location */}
      <View className=' rounded-lg bg-neutral-100 p-3 dark:bg-neutral-900'>
        <Medium className='text-xs text-neutral-500 dark:text-neutral-400'>Location</Medium>
        <Medium className='text-sm text-neutral-900 dark:text-white'>{booking.location}</Medium>
      </View>
    </Press>
  )
}

const formatTime = (time?: string | null) => {
  if (!time) return 'N/A'
  if (/(AM|PM)$/i.test(time.trim())) return time

  const parts = time.split(':')
  if (parts.length < 2) return 'N/A'

  const hours = Number(parts[0])
  const minutes = Number(parts[1])

  if (Number.isNaN(hours) || Number.isNaN(minutes)) return 'N/A'

  const period = hours >= 12 ? 'PM' : 'AM'
  const displayHours = hours % 12 || 12
  return `${displayHours}:${String(minutes).padStart(2, '0')} ${period}`
}

const formatDate = (dateStr: string) => {
  const date = new Date(dateStr)
  return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
}

const demoBookings: Booking[] = [
  {
    id: '1',
    patientName: 'John Smith',
    doctorName: 'Sarah Johnson',
    date: 'Jan 15, 2026',
    time: '10:30 AM',
    queueNumber: 5,
    location: '123 Medical Plaza, New York, NY',
    hpName: 'Metro Hospital',
    status: 'pending',
  },
  {
    id: '2',
    patientName: 'Emma Davis',
    doctorName: 'Michael Chen',
    date: 'Jan 16, 2026',
    time: '2:00 PM',
    queueNumber: 3,
    location: '456 Health Center, Los Angeles, CA',
    hpName: 'City Medical Center',
    status: 'approved',
  },
  {
    id: '3',
    patientName: 'Robert Wilson',
    doctorName: 'Dr. Lisa Anderson',
    date: 'Jan 14, 2026',
    time: '11:00 AM',
    queueNumber: 8,
    location: '789 Care Clinic, Chicago, IL',
    hpName: 'Care Clinic',
    status: 'rejected',
  },
  {
    id: '4',
    patientName: 'Maria Garcia',
    doctorName: 'Dr. James Brown',
    date: 'Jan 17, 2026',
    time: '3:30 PM',
    queueNumber: 2,
    location: '321 Medical Center, Houston, TX',
    hpName: 'Prime Medical Center',
    status: 'pending',
  },
  {
    id: '5',
    patientName: 'David Martinez',
    doctorName: 'Dr. Emily White',
    date: 'Jan 15, 2026',
    time: '9:00 AM',
    queueNumber: 1,
    location: '654 Health Clinic, Phoenix, AZ',
    hpName: 'Elite Health Clinic',
    status: 'approved',
  },
]

export default function AdminApproveBookings() {
  const navigation = useNavigation<AdminStackNav>()
  const [activeTab, setActiveTab] = useState(0)

  const tabLabels = ['Pending', 'Approved', 'Rejected']

  const bookings = demoBookings

  const filteredBookings = bookings.filter((booking) => {
    if (activeTab === 0) return booking.status === 'pending'
    if (activeTab === 1) return booking.status === 'approved'
    return booking.status === 'rejected'
  })

  const handleApprove = (bookingId: string) => {
    // Add approval logic here
  }

  const handleReject = (bookingId: string) => {
    // Add rejection logic here
  }

  const handleCardPress = (bookingId: string) => {
    navigation.navigate('BookingOTPVerification')
  }

  return (
    <View className='flex-1 bg-white dark:bg-neutral-900'>
      <HybridHead title='Approve Bookings' showBackButton={true} />
      <View className='flex-row gap-2 bg-white px-5 py-4 dark:bg-neutral-900'>
        {tabLabels.map((label, index) => {
          const isActive = activeTab === index

          let backgroundColor = '#f3f4f6'
          let textColor = '#4b5563'

          if (isActive) {
            if (index === 0) {
              backgroundColor = '#ea580c'
              textColor = '#ffffff'
            } else if (index === 1) {
              backgroundColor = '#209928'
              textColor = '#ffffff'
            } else {
              backgroundColor = '#dc2626'
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

      <ScrollView className='flex-1 px-5 pt-1' showsVerticalScrollIndicator={false} contentContainerClassName='gap-4'>
        {filteredBookings.length > 0 ? (
          filteredBookings.map((booking) => (
            <BookingCard
              key={booking.id}
              booking={booking}
              onApprove={() => handleApprove(booking.id)}
              onReject={() => handleReject(booking.id)}
              onPress={() => handleCardPress(booking.id)}
            />
          ))
        ) : (
          <View className='mt-20 items-center justify-center'>
            <Medium className='text-neutral-500 dark:text-neutral-400'>
              No {activeTab === 0 ? 'pending' : activeTab === 1 ? 'approved' : 'rejected'} bookings
            </Medium>
          </View>
        )}
      </ScrollView>
    </View>
  )
}
