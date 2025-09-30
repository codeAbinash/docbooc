import ArrowLeft01Icon from '@assets/icons/hugeicons/ArrowLeft01Icon'
import Calendar03Icon from '@assets/icons/hugeicons/Calendar03Icon'
import Doctor01Icon from '@assets/icons/hugeicons/Doctor01Icon'
import Location06Icon from '@assets/icons/hugeicons/Location06Icon'
import PatientIcon from '@assets/icons/hugeicons/PatientIcon'
import Time04Icon from '@assets/icons/hugeicons/Time04Icon'
import Press from '@components/Press'
import { PaddingBottom, PaddingTop } from '@components/SafePadding'
import Slider from '@components/Slider/Slider'
import { useNavigation } from '@react-navigation/native'
import Colors from '@utils/colors'
import { Bold, Medium, SemiBold } from '@utils/fonts'
import { StackNav } from '@utils/types'
import { useColorScheme } from 'nativewind'
import { Image, ScrollView, TouchableOpacity, View } from 'react-native'

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
  }

  return (
    <View className='bg flex-1'>
      <PaddingTop />
      <Header title='Verify Details' onEditPress={() => navigation.goBack()} />

      <ScrollView className='flex-1' contentContainerClassName='pb-6' showsVerticalScrollIndicator={false}>
        <View className='gap-6 px-5 pt-4'>
          {/* Doctor Information Card */}
          <View className='overflow-hidden rounded-3xl bg-white p-6 shadow-sm dark:bg-zinc-900'>
            <View className='mb-4 flex-row items-center'>
              <View className='mr-3 rounded-full bg-blue-50 p-2 dark:bg-blue-900/20'>
                <Doctor01Icon size={24} color={Colors.accent} />
              </View>
              <SemiBold className='text text-lg'>Doctor Information</SemiBold>
            </View>

            <View className='flex-row'>
              <Image
                source={{ uri: appointmentData.doctor.image }}
                className='mr-4 size-20 rounded-2xl'
                resizeMode='cover'
              />
              <View className='flex-1'>
                <Bold className='text text-xl'>{appointmentData.doctor.name}</Bold>
                <Medium className='mt-1 text-sm text-accent'>{appointmentData.doctor.specialty}</Medium>
                <Medium className='text mt-2 text-sm opacity-70'>{appointmentData.doctor.qualification}</Medium>
                <Medium className='text-sm text-neutral-500 dark:text-neutral-400'>
                  {appointmentData.doctor.experience}
                </Medium>
              </View>
            </View>
          </View>

          {/* Patient Information Card */}
          <View className='overflow-hidden rounded-3xl bg-white p-6 shadow-sm dark:bg-zinc-900'>
            <View className='mb-4 flex-row items-center'>
              <View className='mr-3 rounded-full bg-green-50 p-2 dark:bg-green-900/20'>
                <PatientIcon size={24} color={Colors.success} />
              </View>
              <SemiBold className='text text-lg'>Patient Information</SemiBold>
            </View>

            <View className='gap-3'>
              <View className='flex-row items-center justify-between'>
                <Medium className='text-sm text-neutral-500 dark:text-neutral-400'>Name</Medium>
                <SemiBold className='text text-base'>{appointmentData.patient.name}</SemiBold>
              </View>

              <View className='flex-row items-center justify-between'>
                <Medium className='text-sm text-neutral-500 dark:text-neutral-400'>Age</Medium>
                <SemiBold className='text text-base'>{appointmentData.patient.age} years</SemiBold>
              </View>

              <View className='flex-row items-center justify-between'>
                <Medium className='text-sm text-neutral-500 dark:text-neutral-400'>Gender</Medium>
                <SemiBold className='text text-base'>{appointmentData.patient.gender}</SemiBold>
              </View>

              <View className='flex-row items-center justify-between'>
                <Medium className='text-sm text-neutral-500 dark:text-neutral-400'>Mobile</Medium>
                <SemiBold className='text text-base'>{appointmentData.patient.mobile}</SemiBold>
              </View>

              <View className='flex-row items-center justify-between'>
                <Medium className='text-sm text-neutral-500 dark:text-neutral-400'>Relationship</Medium>
                <SemiBold className='text text-base'>{appointmentData.patient.relationship}</SemiBold>
              </View>
            </View>
          </View>

          {/* Appointment Details Card */}
          <View className='overflow-hidden rounded-3xl bg-white p-6 shadow-sm dark:bg-zinc-900'>
            <View className='mb-4 flex-row items-center'>
              <View className='mr-3 rounded-full bg-purple-50 p-2 dark:bg-purple-900/20'>
                <Calendar03Icon size={24} color='#a855f7' />
              </View>
              <SemiBold className='text text-lg'>Appointment Details</SemiBold>
            </View>

            <View className='gap-4'>
              <View className='flex-row items-center'>
                <View className='mr-3 rounded-full bg-purple-50 p-2 dark:bg-purple-900/20'>
                  <Calendar03Icon size={18} color='#a855f7' />
                </View>
                <View className='flex-1'>
                  <Medium className='text-xs text-neutral-500 dark:text-neutral-400'>Date</Medium>
                  <SemiBold className='text text-base'>{appointmentData.appointment.date}</SemiBold>
                  <Medium className='text-xs text-neutral-500 dark:text-neutral-400'>
                    {appointmentData.appointment.day}
                  </Medium>
                </View>
              </View>

              <View className='flex-row items-center'>
                <View className='mr-3 rounded-full bg-orange-50 p-2 dark:bg-orange-900/20'>
                  <Time04Icon size={18} color='#f97316' />
                </View>
                <View className='flex-1'>
                  <Medium className='text-xs text-neutral-500 dark:text-neutral-400'>Time</Medium>
                  <SemiBold className='text text-base'>{appointmentData.appointment.time}</SemiBold>
                </View>
              </View>

              <View className='flex-row items-center justify-between rounded-2xl bg-blue-50 p-4 dark:bg-blue-900/20'>
                <Medium className='text-sm text-blue-700 dark:text-blue-400'>Expected Queue Number</Medium>
                <Bold className='text-lg text-blue-700 dark:text-blue-400'>
                  #{appointmentData.appointment.queueNumber}
                </Bold>
              </View>
            </View>
          </View>

          {/* Location Information Card */}
          <View className='overflow-hidden rounded-3xl bg-white p-6 shadow-sm dark:bg-zinc-900'>
            <View className='mb-4 flex-row items-center'>
              <View className='mr-3 rounded-full bg-red-50 p-2 dark:bg-red-900/20'>
                <Location06Icon size={24} color='#ef4444' />
              </View>
              <SemiBold className='text text-lg'>Location Details</SemiBold>
            </View>

            <View className='flex-row'>
              <Image
                source={{ uri: appointmentData.location.image }}
                className='mr-4 size-20 rounded-2xl'
                resizeMode='cover'
              />
              <View className='flex-1'>
                <Bold className='text text-base'>{appointmentData.location.name}</Bold>
                <Medium className='text mt-1 text-sm opacity-70' numberOfLines={2}>
                  {appointmentData.location.address}
                </Medium>
                <View className='mt-2 flex-row items-center'>
                  <Location06Icon size={14} color={Colors.accent} />
                  <Medium className='ml-1 text-xs text-accent'>{appointmentData.location.distance} away</Medium>
                </View>
              </View>
            </View>
          </View>

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
