import HybridHead from '@components/HybridHead'
import Press from '@components/Press'
import { PaddingBottom } from '@components/SafePadding'
import { useNavigation, useRoute } from '@react-navigation/native'
import { Medium, SemiBold } from '@utils/fonts'
import { StackNav } from '@utils/types'
import { ScrollView, View } from 'react-native'
import Calendar01Icon from '@hugeicons/Calendar01Icon'
import Clock03Icon from '@assets/icons/hugeicons/Clock03Icon'
import Location06Icon from '@assets/icons/hugeicons/Location06Icon'
import PatientIcon from '@assets/icons/hugeicons/PatientIcon'
import Doctor01Icon from '@assets/icons/hugeicons/Doctor01Icon'

export default function AppointmentDetails() {
  const navigation = useNavigation<StackNav>()
  const route = useRoute()

  const { appointmentId, status = 'confirmed' } = route.params as {
    appointmentId: string
    status?: 'provisional' | 'confirmed'
  }

  const appointmentData = {
    id: '1',
    doctor: {
      name: 'Dr. Michael Chen',
      specialty: 'Cardiologist',
      qualification: 'MBBS, MD, DM (Cardiology)',
      experience: 21,
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
      status: status,
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

  return (
    <View className='bg-white flex-1'>
      <HybridHead title='Appointment Details' showBackButton={true} onBackPress={() => navigation.goBack()} />

      <ScrollView className='flex-1' contentContainerClassName='pb-6' showsVerticalScrollIndicator={false}>
        <View className='gap-4 px-5 pt-4'>
          {/* Appointment Details Card */}
          <View className='overflow-hidden rounded-3xl border border-neutral-300 bg-white dark:border-neutral-700 dark:bg-zinc-900'>
            {/* Header with Icon */}
            <View className='border-b border-neutral-300 px-4 py-3 dark:border-neutral-700'>
              <View className='flex-row items-center justify-between'>
                <View className='flex-row items-center gap-3'>
                  <View className='rounded-md bg-blue-100/50 p-2 dark:bg-blue-900/20'>
                    <Calendar01Icon size={20} color='#3b82f6' strokeWidth={2} />
                  </View>
                  <SemiBold className='text-base text-neutral-900 dark:text-white'>Appointment Details</SemiBold>
                </View>
                <View className='bg-green-100 px-3 py-1 dark:bg-blue-900/30'>
                  <SemiBold className='text-xs capitalize text-green-600 dark:text-blue-400'>
                    {appointmentData.appointment.status}
                  </SemiBold>
                </View>
              </View>
            </View>

            {/* Doctor Info */}
            <View className='border-b border-neutral-100 px-4 py-3 dark:border-neutral-700'>
              <View className='flex-row items-start gap-3'>
                <View className='rounded-md bg-blue-100/50 p-2 dark:bg-blue-900/20'>
                  <Doctor01Icon size={16} color='#3b82f6' strokeWidth={2} />
                </View>
                <View className='flex-1'>
                  <Medium className='text-sm text-neutral-600 dark:text-neutral-400'>Doctor</Medium>
                  <SemiBold className='mt-1 text-sm text-neutral-900 dark:text-white'>
                    {appointmentData.doctor.name}
                  </SemiBold>
                  <Medium className='mt-1 text-sm text-neutral-600 dark:text-neutral-400'>
                    {appointmentData.doctor.specialty}
                  </Medium>
                </View>
              </View>
            </View>

            {/* Patient Info Row */}
            <View className='border-b border-neutral-100 px-4 py-3 dark:border-neutral-700'>
              <View className='flex-row items-start gap-3'>
                <View className='rounded-md bg-blue-100/50 p-2 dark:bg-blue-900/20'>
                  <PatientIcon size={16} color='#3b82f6' strokeWidth={2} />
                </View>
                <View className='flex-1'>
                  <Medium className='text-sm text-neutral-600 dark:text-neutral-400'>Patient</Medium>
                  <SemiBold className='mt-1 text-sm text-neutral-900 dark:text-white'>
                    {appointmentData.patient.name}
                  </SemiBold>
                  <Medium className='mt-1 text-sm text-neutral-600 dark:text-neutral-400'>
                    Age: {appointmentData.patient.age}
                  </Medium>
                </View>
              </View>
            </View>

            {/* Appointment Time Row */}
            <View className='border-b border-neutral-100 px-4 py-3 dark:border-neutral-700'>
              <View className='flex-row items-start justify-between gap-3'>
                <View className='flex-1 flex-row items-start gap-3'>
                  <View className='rounded-md bg-blue-100/50 p-2 dark:bg-blue-900/20'>
                    <Clock03Icon size={16} color='#3b82f6' strokeWidth={2} />
                  </View>
                  <View className='flex-1'>
                    <Medium className='text-sm text-neutral-600 dark:text-neutral-400'>Appointment</Medium>
                    <SemiBold className='mt-1 text-sm text-neutral-900 dark:text-white'>
                      {appointmentData.appointment.time}
                    </SemiBold>
                    <Medium className='mt-1 text-sm text-neutral-600 dark:text-neutral-400'>
                      {appointmentData.appointment.day}, {appointmentData.appointment.date}
                    </Medium>
                  </View>
                </View>
                <View className='items-end'>
                  <SemiBold className='text-sm text-neutral-600 dark:text-neutral-400'>Queue</SemiBold>
                  <SemiBold className='mt-1 text-lg text-blue-600 dark:text-blue-400'>
                    Q{appointmentData.appointment.queueNumber}
                  </SemiBold>
                </View>
              </View>
            </View>

            {/* Location Row */}
            <View className='border-t border-neutral-100 px-4 py-3 dark:border-neutral-700'>
              <View className='flex-row items-start gap-3'>
                <View className='rounded-md bg-blue-100/50 p-2 dark:bg-blue-900/20'>
                  <Location06Icon size={16} color='#3b82f6' strokeWidth={2} />
                </View>
                <View className='flex-1'>
                  <Medium className='text-sm text-neutral-600 dark:text-neutral-400'>Location</Medium>
                  <SemiBold className='mt-1 text-sm text-neutral-900 dark:text-white'>
                    {appointmentData.location.name}
                  </SemiBold>
                  <Medium className='mt-1 text-sm text-neutral-600 dark:text-neutral-400'>
                    {appointmentData.location.address}
                  </Medium>
                </View>
              </View>
            </View>

            {/* Status Section */}
            <View className='border-t border-neutral-100 px-4 py-3 dark:border-neutral-700'>
              <View className='flex-row items-start gap-3'>
                <View
                  className={`rounded-md p-2 ${appointmentData.appointment.status === 'confirmed' ? 'bg-green-100/50 dark:bg-green-900/20' : 'bg-yellow-100/50 dark:bg-yellow-900/20'}`}
                >
                  <Calendar01Icon
                    size={16}
                    color={appointmentData.appointment.status === 'confirmed' ? '#16a34a' : '#eab308'}
                    strokeWidth={2}
                  />
                </View>
                <View className='flex-1'>
                  <Medium className='text-sm text-neutral-600 dark:text-neutral-400'>Status</Medium>
                  <SemiBold className='mt-1 text-sm capitalize text-neutral-900 dark:text-white'>
                    {appointmentData.appointment.status}
                  </SemiBold>
                  <Medium className='mt-1 text-xs text-neutral-600 dark:text-neutral-400'>
                    {appointmentData.appointment.status === 'confirmed'
                      ? 'Appointment confirmed by hospital'
                      : 'Awaiting confirmation from hospital'}
                  </Medium>
                </View>
              </View>
            </View>
          </View>

          {/* Verification Code Card - Only for Provisional */}
          {status === 'provisional' && (
            <View className='overflow-hidden rounded-3xl border-2 border-blue-600 bg-white dark:border-blue-400 dark:bg-zinc-900'>
              <View className='flex-row items-center gap-4 bg-blue-50 p-4 dark:bg-blue-900/20'>
                <View className='flex-1 gap-1'>
                  <Medium className='text-xs font-semibold text-neutral-600 dark:text-neutral-400'>
                    Appointment Code
                  </Medium>
                  <SemiBold className='text-3xl text-blue-600 dark:text-blue-400'>1234</SemiBold>
                </View>
                <View className='items-center gap-1 rounded-xl bg-blue-600 p-3 dark:bg-blue-700'>
                  <Medium className='text-xs text-blue-100'>Show at</Medium>
                  <SemiBold className='text-xs text-white'>Reception</SemiBold>
                </View>
              </View>
            </View>
          )}

          {/* Payment Card */}
          <View className='overflow-hidden rounded-3xl border border-neutral-300 bg-white dark:border-neutral-700 dark:bg-zinc-900'>
            {/* Header with Icon */}
            <View className='border-b border-neutral-200 px-4 py-3 dark:border-neutral-700'>
              <View className='flex-row items-center gap-3'>
                <View className='rounded-md bg-green-100/50 p-2 dark:bg-green-900/20'>
                  <Calendar01Icon size={20} color='#16a34a' strokeWidth={2} />
                </View>
                <SemiBold className='text-base text-neutral-900 dark:text-white'>Payment Summary</SemiBold>
              </View>
            </View>

            {/* Payment Rows */}
            <View className='px-4 py-3'>
              <View className='gap-3'>
                <View className='flex-row justify-between'>
                  <Medium className='text-sm text-neutral-600 dark:text-neutral-400'>Platform Fee</Medium>
                  <SemiBold className='text-sm text-neutral-900 dark:text-white'>
                    ₹{appointmentData.payment.platformFee}
                  </SemiBold>
                </View>
                <View className='h-px bg-neutral-100 dark:bg-neutral-700' />
                <View className='flex-row justify-between'>
                  <Medium className='text-sm text-neutral-600 dark:text-neutral-400'>GST (18%)</Medium>
                  <SemiBold className='text-sm text-neutral-900 dark:text-white'>
                    ₹{appointmentData.payment.gst}
                  </SemiBold>
                </View>
                <View className='h-px bg-neutral-200 dark:bg-neutral-600' />
                <View className='flex-row items-center justify-between py-2'>
                  <SemiBold className='text-base text-neutral-900 dark:text-white'>Total Payable</SemiBold>
                  <SemiBold className='text-lg text-green-600 dark:text-green-400'>
                    ₹{appointmentData.payment.total}
                  </SemiBold>
                </View>
              </View>
            </View>
          </View>

          {/* Important Notes */}
          <View className='overflow-hidden rounded-3xl border border-neutral-300 bg-white dark:border-neutral-700 dark:bg-zinc-900'>
            {/* Header with Icon */}
            <View className='border-b border-neutral-200 px-4 py-3 dark:border-neutral-700'>
              <View className='flex-row items-center gap-3'>
                <View className='rounded-md bg-blue-100/50 p-2 dark:bg-blue-900/20'>
                  <Clock03Icon size={20} color='#3b82f6' strokeWidth={2} />
                </View>
                <SemiBold className='text-base text-neutral-900 dark:text-white'>Important Notes</SemiBold>
              </View>
            </View>

            {/* Notes Content */}
            <View className='px-4 py-3'>
              <View className='gap-2'>
                <View className='flex-row items-start gap-2'>
                  <Medium className='text-sm text-neutral-600 dark:text-neutral-400'>•</Medium>
                  <Medium className='flex-1 text-sm text-neutral-700 dark:text-neutral-300'>
                    Arrive 15 minutes before appointment
                  </Medium>
                </View>
                <View className='flex-row items-start gap-2'>
                  <Medium className='text-sm text-neutral-600 dark:text-neutral-400'>•</Medium>
                  <Medium className='flex-1 text-sm text-neutral-700 dark:text-neutral-300'>
                    Bring ID & medical reports
                  </Medium>
                </View>
                <View className='flex-row items-start gap-2'>
                  <Medium className='text-sm text-neutral-600 dark:text-neutral-400'>•</Medium>
                  <Medium className='flex-1 text-sm text-neutral-700 dark:text-neutral-300'>
                    Queue numbers may change
                  </Medium>
                </View>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
      <PaddingBottom />
    </View>
  )
}
