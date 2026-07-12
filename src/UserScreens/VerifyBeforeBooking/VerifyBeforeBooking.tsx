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
  const queueNumber = timeSlot?.currentBookings != null ? timeSlot.currentBookings + 1 : 'N/A'
  const hp = appointment.location?.healthcareProvider
  const slotId = appointment.location?.slotId || timeSlot?.id || ''

  const { mutate, isPending } = useMutation({
    mutationKey: ['book'],
    mutationFn: async () => {
      const payload = {
        slotId,
        patientId: appointment.selectedMemberId,
      }
      console.warn('[BOOKING PAYLOAD]', payload)

      if (!payload.slotId || !payload.patientId) {
        throw new Error('Missing slotId or patientId')
      }

      return await (
        await api.users.booking.$post({
          // Backend expects slotId + patientId; rpc types are stale
          json: payload as unknown as {
            scheduleDaysId: string
            date: string
            patientId: string
          },
        })
      ).json()
    },

    onSuccess: (data) => {
      if (!data.success)
        return ToastAndroid.show(data.message || 'Failed to book appointment. Please try again.', ToastAndroid.LONG)
      if (data.data?.id) {
        navigation.replace('Complete', { bookingId: data.data.id })
      } else {
        ToastAndroid.show('Booking created but ID not found', ToastAndroid.LONG)
      }
    },
    onError: (error) => {
      console.warn('[BOOKING ERROR]', error)
      ToastAndroid.show(error instanceof Error ? error.message : 'Booking failed', ToastAndroid.LONG)
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
