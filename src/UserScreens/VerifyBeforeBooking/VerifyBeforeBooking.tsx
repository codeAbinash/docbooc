import { useBookingStore } from '@/zustand/bookingStore'
import popupStore from '@/zustand/popupStore'
import Button from '@components/Button'
import HybridHead from '@components/HybridHead'
import { PaddingBottom } from '@components/SafePadding'
import { useFocusEffect, useNavigation } from '@react-navigation/native'
import { useMutation } from '@tanstack/react-query'
import { api } from '@utils/client'
import { StackNav } from '@utils/types'
import { useCallback } from 'react'
import { BackHandler, ScrollView, ToastAndroid, View } from 'react-native'
import { AppointmentDetailsCard } from './AppointmentDetailsCard'
import { ImportantNotesCard } from './ImportantNotesCard'
import { PaymentSummaryCard } from './PaymentSummaryCard'
import { formatTimeSlot } from './utils'

const VerifyBeforeBooking = () => {
  const navigation = useNavigation<StackNav>()
  const { appointment } = useBookingStore()
  const alert = popupStore((state) => state.alert)

  const timeSlot = appointment.location?.timeSlots?.[0]
  const appointmentTime = formatTimeSlot(timeSlot?.startTime)
  const queueNumber = timeSlot?.maxBookings || 'N/A'
  const hp = appointment.location?.healthcareProvider

  console.info(appointment.date, appointment.selectedMemberId, appointment.location?.scheduleDaysId)

  const { mutate, isPending } = useMutation({
    mutationKey: ['book'],
    mutationFn: async () =>
      await (
        await api.users.booking.$post({
          json: {
            date: appointment.date,
            patientId: appointment.selectedMemberId,
            scheduleDaysId: appointment.location?.scheduleDaysId || '',
          },
        })
      ).json(),

    onSuccess: (data) => {
      console.log(data)
      if (!data.success)
        return ToastAndroid.show(data.message || 'Failed to book appointment. Please try again.', ToastAndroid.LONG)
      if (data.data?.id) {
        navigation.replace('Complete', { bookingId: data.data.id })
      } else {
        ToastAndroid.show('Booking created but ID not found', ToastAndroid.LONG)
      }
    },
  })

  const handleBackPress = () => {
    alert('Going back', 'Do you want to select the patient again', [
      {
        text: 'Cancel the Appointment',
        onPress: () => {
          alert('Cancel', 'Do you want to cancel this appointment?', [
            {
              text: 'Yes',
              onPress: () => navigation.navigate('Home' as any),
            },
            {
              text: 'No',
              onPress: () => {},
            },
          ])
        },
      },

      // {
      //   text: 'No',
      //   onPress: () => {},
      // },
      {
        text: 'Yes',
        onPress: () => navigation.goBack(),
      },
    ])
  }

  useFocusEffect(
    useCallback(() => {
      const onBackPress = () => {
        handleBackPress()
        return true
      }

      const subscription = BackHandler.addEventListener('hardwareBackPress', onBackPress)

      return () => subscription.remove()
    }, [navigation]),
  )

  return (
    <View className='bg flex-1'>
      <HybridHead title='Review Appointment' showBackButton={true} onBackPress={handleBackPress} />

      <ScrollView className='flex-1 bg-white' contentContainerClassName='pb-6' showsVerticalScrollIndicator={false}>
        <View className='gap-4 px-5 pt-4'>
          <AppointmentDetailsCard
            doctorName={appointment.doctor?.name}
            doctorSpecialty={appointment.doctor?.specialization}
            patientName={appointment.patientData?.name}
            patientAge={appointment.patientData?.age}
            appointmentTime={appointmentTime}
            appointmentDate={appointment.date || ''}
            locationName={hp?.name}
            houseNumber={hp?.houseNumber}
            roadName={hp?.roadName}
            city={hp?.city}
            state={hp?.state}
            pin={hp?.pin}
            queueNumber={queueNumber}
          />

          <PaymentSummaryCard />

          <ImportantNotesCard />
        </View>
      </ScrollView>

      <View className='bg-white px-5 py-3 dark:border-neutral-700 dark:bg-neutral-800'>
        <Button title={isPending ? 'Booking...' : 'Confirm Booking'} onPress={() => mutate()} disabled={isPending} />
      </View>
      <PaddingBottom />
    </View>
  )
}

export default VerifyBeforeBooking
