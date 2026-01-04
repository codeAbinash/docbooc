import { useBookingStore } from '@/zustand/bookingStore'
import Button from '@components/Button'
import HybridHead from '@components/HybridHead'
import { PaddingBottom } from '@components/SafePadding'
import { useNavigation } from '@react-navigation/native'
import { useMutation } from '@tanstack/react-query'
import { api } from '@utils/client'
import { StackNav } from '@utils/types'
import { ScrollView, ToastAndroid, View } from 'react-native'
import { AppointmentDetailsCard } from './AppointmentDetailsCard'
import { ImportantNotesCard } from './ImportantNotesCard'
import { PaymentSummaryCard } from './PaymentSummaryCard'
import { formatTimeSlot } from './utils'

const VerifyBeforeBooking = () => {
  const navigation = useNavigation<StackNav>()
  const { appointment } = useBookingStore()

  const timeSlot = appointment.location?.timeSlots?.[0]
  const appointmentTime = formatTimeSlot(timeSlot?.startTime)
  const queueNumber = timeSlot?.maxBookings || 'N/A'
  const hp = appointment.location?.healthcareProvider

  console.info(appointment.date, appointment.selectedMemberId, appointment.location?.scheduleId)

  const { mutate, isPending } = useMutation({
    mutationKey: ['book'],
    mutationFn: async () =>
      await (
        await api.users.booking.$post({
          json: {
            date: appointment.date,
            memberId: appointment.selectedMemberId,
            scheduleDaysId: appointment.location?.scheduleId || '',
          },
        })
      ).json(),

    onSuccess: (data) => {
      console.log(data)
      if (!data.success)
        return ToastAndroid.show(data.message || 'Failed to book appointment. Please try again.', ToastAndroid.LONG)
      navigation.replace('Complete')
    },
  })

  return (
    <View className='bg flex-1'>
      <HybridHead title='Review Appointment' showBackButton={true} onBackPress={() => navigation.goBack()} />

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
