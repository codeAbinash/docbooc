import Calendar01Icon from '@hugeicons/Calendar01Icon'
import Clock03Icon from '@assets/icons/hugeicons/Clock03Icon'
import Location06Icon from '@assets/icons/hugeicons/Location06Icon'
import PatientIcon from '@assets/icons/hugeicons/PatientIcon'
import Doctor01Icon from '@assets/icons/hugeicons/Doctor01Icon'
import Press from '@components/Press'
import HybridHead from '@components/HybridHead'
import { PaddingBottom } from '@components/SafePadding'
import Button from '@components/Button'
import { useNavigation } from '@react-navigation/native'
import { Bold, Medium, SemiBold } from '@utils/fonts'
import { StackNav } from '@utils/types'
import { useColorScheme } from 'nativewind'
import { ScrollView, TouchableOpacity, View, Image } from 'react-native'

const VerifyBeforeBooking = () => {
  const navigation = useNavigation<StackNav>()
  const { colorScheme } = useColorScheme()

  const appointmentData = {
    doctor: {
      name: 'Dr. John Doe',
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
      date: 'October 22, 2024',
      day: 'Tuesday',
      time: '10:30 AM',
      queueNumber: 5,
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
    },
  }

  return (
    <View className='bg flex-1'>
      <HybridHead title='Review Appointment' showBackButton={true} onBackPress={() => navigation.goBack()} />

      <ScrollView className='flex-1' contentContainerClassName='pb-6' showsVerticalScrollIndicator={false}>
        <View className='gap-4 px-5 pt-2'>
          {/* Appointment Details Card */}
          <View className='overflow-hidden rounded-lg border border-neutral-100 bg-white dark:border-neutral-700 dark:bg-zinc-900'>
            {/* Header with Icon */}
            <View className='border-b border-neutral-200 px-4 py-3 dark:border-neutral-700'>
              <View className='flex-row items-center gap-3'>
                <View className='rounded-md bg-blue-100/50 p-2 dark:bg-blue-900/20'>
                  <Calendar01Icon size={20} color='#3b82f6' strokeWidth={2} />
                </View>
                <SemiBold className='text-base text-neutral-900 dark:text-white'>Appointment Details</SemiBold>
              </View>
            </View>

            {/* Doctor Info */}
            <View className='border-b border-neutral-100 px-4 py-3 dark:border-neutral-700'>
              <View className='flex-row items-start gap-3'>
                <View className='rounded-md bg-blue-100/50 p-2 dark:bg-blue-900/20'>
                  <Doctor01Icon size={16} color='#3b82f6' strokeWidth={2} />
                </View>
                <View className='flex-1'>
                  <SemiBold className='text-base text-neutral-600 dark:text-neutral-400'>Doctor</SemiBold>
                  <Medium className='mt-1 text-base text-neutral-900 dark:text-white'>
                    {appointmentData.doctor.name}
                  </Medium>
                  <Medium className='mt-1 text-base text-neutral-600 dark:text-neutral-400'>
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
                  <SemiBold className='text-base text-neutral-600 dark:text-neutral-400'>Patient</SemiBold>
                  <Medium className='mt-1 text-base text-neutral-900 dark:text-white'>
                    {appointmentData.patient.name}
                  </Medium>
                  <Medium className='mt-1 text-base text-neutral-600 dark:text-neutral-400'>
                    Age: {appointmentData.patient.age}
                  </Medium>
                </View>
              </View>
            </View>

            {/* Appointment Time Row */}
            <View className='border-b border-neutral-100 px-4 py-3 dark:border-neutral-700'>
              <View className='flex-row items-start gap-3'>
                <View className='rounded-md bg-blue-100/50 p-2 dark:bg-blue-900/20'>
                  <Clock03Icon size={16} color='#3b82f6' strokeWidth={2} />
                </View>
                <View className='flex-1'>
                  <SemiBold className='text-base text-neutral-600 dark:text-neutral-400'>Appointment</SemiBold>
                  <Medium className='mt-1 text-base text-neutral-900 dark:text-white'>
                    {appointmentData.appointment.time}
                  </Medium>
                  <Medium className='mt-1 text-base text-neutral-600 dark:text-neutral-400'>
                    {appointmentData.appointment.day}, {appointmentData.appointment.date}
                  </Medium>
                </View>
                <View className='items-end'>
                  <SemiBold className='text-base text-neutral-600 dark:text-neutral-400'>Queue</SemiBold>
                  <Medium className='mt-1 text-lg text-blue-600 dark:text-blue-400'>
                    Q{appointmentData.appointment.queueNumber}
                  </Medium>
                </View>
              </View>
            </View>

            {/* Location Row */}
            <View className='px-4 py-3'>
              <View className='flex-row items-start gap-3'>
                <View className='rounded-md bg-blue-100/50 p-2 dark:bg-blue-900/20'>
                  <Location06Icon size={16} color='#3b82f6' strokeWidth={2} />
                </View>
                <View className='flex-1'>
                  <SemiBold className='text-base text-neutral-600 dark:text-neutral-400'>Location</SemiBold>
                  <Medium className='mt-1 text-base text-neutral-900 dark:text-white'>
                    {appointmentData.location.name}
                  </Medium>
                  <Medium className='mt-1 text-base text-neutral-600 dark:text-neutral-400'>
                    {appointmentData.location.address}
                  </Medium>
                </View>
              </View>
            </View>
          </View>

          {/* Payment Card */}
          <View className='overflow-hidden rounded-lg border border-neutral-200 bg-white dark:border-neutral-700 dark:bg-zinc-900'>
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
                  <Medium className='text-base text-neutral-600 dark:text-neutral-400'>Platform Fee</Medium>
                  <SemiBold className='text-base text-neutral-900 dark:text-white'>
                    ₹{appointmentData.payment.platformFee}
                  </SemiBold>
                </View>
                <View className='h-px bg-neutral-100 dark:bg-neutral-700' />
                <View className='flex-row justify-between'>
                  <Medium className='text-base text-neutral-600 dark:text-neutral-400'>GST (18%)</Medium>
                  <SemiBold className='text-base text-neutral-900 dark:text-white'>
                    ₹{appointmentData.payment.gst}
                  </SemiBold>
                </View>
                <View className='h-px bg-neutral-200 dark:bg-neutral-600' />
                <View className='flex-row items-center justify-between py-2'>
                  <SemiBold className='text-base text-neutral-900 dark:text-white'>Total Payable</SemiBold>
                  <SemiBold className='text-lg text-green-600 dark:text-green-400'>
                    ₹{appointmentData.payment.platformFee + appointmentData.payment.gst}
                  </SemiBold>
                </View>
              </View>
            </View>
          </View>

          {/* Important Notes */}
          <View className='overflow-hidden rounded-lg border border-neutral-200 bg-white dark:border-neutral-700 dark:bg-zinc-900'>
            {/* Header with Icon */}
            <View className='border-b border-neutral-200 px-4 py-3 dark:border-neutral-700'>
              <View className='flex-row items-center gap-3'>
                <View className='rounded-md bg-blue-100/50 p-2 dark:bg-blue-900/20'>
                  <Calendar01Icon size={20} color='#3b82f6' strokeWidth={2} />
                </View>
                <SemiBold className='text-base text-neutral-900 dark:text-white'>Important Notes</SemiBold>
              </View>
            </View>

            {/* Notes Content */}
            <View className='px-4 py-3'>
              <View className='gap-2'>
                <View className='flex-row items-start gap-2'>
                  <Medium className='text-base text-neutral-600 dark:text-neutral-400'>•</Medium>
                  <Medium className='flex-1 text-base text-neutral-700 dark:text-neutral-300'>
                    Arrive 15 minutes before appointment
                  </Medium>
                </View>
                <View className='flex-row items-start gap-2'>
                  <Medium className='text-base text-neutral-600 dark:text-neutral-400'>•</Medium>
                  <Medium className='flex-1 text-base text-neutral-700 dark:text-neutral-300'>
                    Bring ID & medical reports
                  </Medium>
                </View>
                <View className='flex-row items-start gap-2'>
                  <Medium className='text-base text-neutral-600 dark:text-neutral-400'>•</Medium>
                  <Medium className='flex-1 text-base text-neutral-700 dark:text-neutral-300'>
                    Queue numbers may change
                  </Medium>
                </View>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>

      {/* Button to Confirm Appointment */}
      <View className='gap-3 px-5 pb-5 pt-5'>
        
        <Button  title='Confirm Booking' progressFill={100} onPress={() => navigation.navigate('Complete')} />
      </View>
      <PaddingBottom />
    </View>
  )
}

export default VerifyBeforeBooking
