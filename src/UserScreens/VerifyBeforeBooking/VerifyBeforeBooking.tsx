import ArrowLeft01Icon from '@assets/icons/hugeicons/ArrowLeft01Icon'
import AppointmentDetailsCard from '@components/AppointmentDetailsCard'
import DoctorInfoCard from '@components/DoctorInfoCard'
import LocationInfoCard from '@components/LocationInfoCard'
import PatientInfoCard from '@components/PatientInfoCard'
import PaymentInfoCard from '@components/PaymentInfoCard'
import Press from '@components/Press'
import { PaddingBottom, PaddingTop } from '@components/SafePadding'
import Slider from '@components/Slider/Slider'
import { useNavigation } from '@react-navigation/native'
import { Bold, Medium, SemiBold } from '@utils/fonts'
import { StackNav } from '@utils/types'
import { useColorScheme } from 'nativewind'
import { ScrollView, TouchableOpacity, View } from 'react-native'

// Custom Header Component with Edit Details button
function Header({ title, onEditPress }: { title: string; onEditPress: () => void }) {
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
      <View>
        <SemiBold className='text text-base'>{title}</SemiBold>
      </View>
      <View>
        <TouchableOpacity
          className='rounded-full bg-white px-4 py-2 dark:bg-zinc-900'
          onPress={onEditPress}
          activeOpacity={0.7}
        >
          <Medium className='text text-sm'>Edit</Medium>
        </TouchableOpacity>
      </View>
    </View>
  )
}

const VerifyBeforeBooking = () => {
  const navigation = useNavigation<StackNav>()

  const appointmentData = {
    doctor: {
      name: 'Dr. John Doe',
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
      <PaddingTop />
      <Header title='Verify Details' onEditPress={() => navigation.goBack()} />

      <ScrollView className='flex-1' contentContainerClassName='pb-6' showsVerticalScrollIndicator={false}>
        <View className='gap-6 px-5 pt-4'>
          {/* Doctor Information Card */}
          <DoctorInfoCard doctor={appointmentData.doctor} />

          {/* Patient Information Card */}
          <PatientInfoCard patient={appointmentData.patient} />

          {/* Appointment Details Card */}
          <AppointmentDetailsCard appointment={appointmentData.appointment} />

          {/* Location Information Card */}
          <LocationInfoCard location={appointmentData.location} />

          {/* Payment Information Card */}
          <PaymentInfoCard paymentInfo={appointmentData.payment} showPayButton={false} />

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
                • You will receive a confirmation SMS shortly
              </Medium>
            </View>
          </View>
        </View>
      </ScrollView>

      {/* Slider to Confirm Appointment */}
      <View className='px-6 pb-2 pt-3'>
        <Slider onComplete={() => navigation.navigate('Complete')} />
      </View>
      <PaddingBottom />
    </View>
  )
}

export default VerifyBeforeBooking
