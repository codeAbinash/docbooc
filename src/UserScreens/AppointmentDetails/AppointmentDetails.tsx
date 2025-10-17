import ArrowLeft01Icon from '@assets/icons/hugeicons/ArrowLeft01Icon'
import AppointmentDetailsCard from '@components/AppointmentDetailsCard'
import DoctorInfoCard from '@components/DoctorInfoCard'
import LocationInfoCard from '@components/LocationInfoCard'
import PatientInfoCard from '@components/PatientInfoCard'
import PaymentInfoCard from '@components/PaymentInfoCard'
import Press from '@components/Press'
import { PaddingBottom, PaddingTop } from '@components/SafePadding'
import { useNavigation, useRoute } from '@react-navigation/native'
import { Bold, Medium } from '@utils/fonts'
import { StackNav } from '@utils/types'
import { useColorScheme } from 'nativewind'
import { ScrollView, View } from 'react-native'

function Header({ title }: { title: string }) {
  const { colorScheme } = useColorScheme()
  const navigation = useNavigation<StackNav>()

  return (
    <View className='w-full flex-row items-center justify-between gap-5 p-5 py-3 pt-1'>
      <View>
        <Press
          className='size-12 items-center justify-center rounded-full bg-white dark:bg-zinc-900'
          onPress={() => navigation.goBack()}
        >
          <ArrowLeft01Icon
            size={25}
            strokeWidth={1.7}
            style={{ marginRight: 2 }}
            color={colorScheme === 'dark' ? 'white' : 'black'}
          />
        </Press>
      </View>
      <View className='flex-1'>
        <Bold className='text text-center text-base'>{title}</Bold>
      </View>
      <View className='w-12' />
    </View>
  )
}

export default function AppointmentDetails() {
  const navigation = useNavigation<StackNav>()
  const route = useRoute()

  // Get appointmentId from route params
  const { appointmentId } = route.params as { appointmentId: string }

  // In a real app, you would fetch appointment data based on appointmentId
  // For now, we'll use mock data
  const appointmentData = {
    id: '1',
    doctor: {
      name: 'Dr. Michael Chen',
      specialty: 'Cardiologist',
      qualification: 'MBBS, MD, DM (Cardiology)',
      experience: '21+ Years of Experience',
      image:
        'https://st4.depositphotos.com/7877830/25337/v/450/depositphotos_253374286-stock-illustration-vector-illustration-male-doctor-avatar.jpg',
    },
    patient: {
      name: 'Sarah Johnson',
      age: '28',
      gender: 'Female',
      mobile: '+91 98765 43210',
      relationship: 'Myself',
    },
    appointment: {
      date: 'October 15, 2024',
      day: 'Tuesday',
      time: '10:30 AM',
      queueNumber: 5,
      status: 'provisional' as const,
    },
    location: {
      name: 'Metro Medical Center',
      address: '456 Health Street, Metro Station',
      distance: '4.2 km',
      image: 'https://images.unsplash.com/photo-1586773860418-d37222d8fce3?w=400&h=300&fit=crop',
    },
    payment: {
      consultationFee: 500,
      platformFee: 50,
      gst: 99,
      total: 649,
      paymentMethod: 'UPI',
      transactionId: 'TXN1234567890',
    },
  }

  const handleCancelAppointment = () => {
    // Handle appointment cancellation
    console.log('Cancel appointment')
  }

  const handleRescheduleAppointment = () => {
    // Handle appointment rescheduling
    console.log('Reschedule appointment')
  }

  return (
    <View className='bg flex-1'>
      <PaddingTop />
      <Header title='Appointment Details' />

      <ScrollView className='flex-1' contentContainerClassName='pb-6' showsVerticalScrollIndicator={false}>
        <View className='gap-6 px-5 pt-4'>
          {/* Doctor Information */}
          <DoctorInfoCard doctor={appointmentData.doctor} />

          {/* Patient Information */}
          <PatientInfoCard patient={appointmentData.patient} />

          {/* Appointment Details */}
          <AppointmentDetailsCard appointment={appointmentData.appointment} />

          {/* Location Information */}
          <LocationInfoCard location={appointmentData.location} />

          {/* Payment Information */}
          <PaymentInfoCard paymentInfo={appointmentData.payment} isCompleted={true} />

          {/* Important Notes */}
          <View className='overflow-hidden rounded-3xl bg-amber-50 p-6 dark:bg-amber-900/20'>
            <Bold className='mb-3 text-base text-amber-800 dark:text-amber-200'>Important Notes</Bold>
            <View className='gap-2'>
              <Medium className='text-sm text-amber-700 dark:text-amber-300'>
                • Please arrive 15 minutes before your appointment
              </Medium>
              <Medium className='text-sm text-amber-700 dark:text-amber-300'>
                • Bring your ID proof and previous medical reports
              </Medium>
              <Medium className='text-sm text-amber-700 dark:text-amber-300'>
                • Queue number may vary based on actual arrivals
              </Medium>
              <Medium className='text-sm text-amber-700 dark:text-amber-300'>
                • Contact hospital for any changes or cancellations
              </Medium>
            </View>
          </View>

          {/* Action Buttons */}
          <View className='gap-4'>
            <Press
              onPress={handleRescheduleAppointment}
              className='flex-row items-center justify-center rounded-2xl bg-blue-600 p-4 dark:bg-blue-700'
            >
              <Bold className='text-base text-white'>Reschedule Appointment</Bold>
            </Press>

            <Press
              onPress={handleCancelAppointment}
              className='flex-row items-center justify-center rounded-2xl border border-red-600 p-4 dark:border-red-500'
            >
              <Bold className='text-base text-red-600 dark:text-red-500'>Cancel Appointment</Bold>
            </Press>
          </View>
        </View>
      </ScrollView>
      <PaddingBottom />
    </View>
  )
}
