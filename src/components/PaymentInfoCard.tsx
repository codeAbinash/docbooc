import TickDouble02Icon from '@assets/icons/hugeicons/TickDouble02Icon'
import Tick02Icon from '@assets/icons/hugeicons/Tick02Icon'
import InfoCard from '@components/InfoCard'
import InfoRow from '@components/InfoRow'
import Press from '@components/Press'
import Colors from '@utils/colors'
import { Bold, Medium, SemiBold } from '@utils/fonts'
import { useColorScheme } from 'nativewind'
import { View } from 'react-native'

type PaymentInfo = {
  consultationFee: number
  platformFee: number
  gst: number
  total: number
  paymentMethod?: string
  transactionId?: string
}

type PaymentInfoCardProps = {
  paymentInfo: PaymentInfo
  showPayButton?: boolean
  onPayPress?: () => void
  isCompleted?: boolean
}

export default function PaymentInfoCard({
  paymentInfo,
  showPayButton = false,
  onPayPress,
  isCompleted = false,
}: PaymentInfoCardProps) {
  const { colorScheme } = useColorScheme()
  const dark = colorScheme === 'dark'

  const icon = (
    <View className='mr-3 rounded-full bg-green-50 p-2 dark:bg-green-900/20'>
      <TickDouble02Icon size={24} color={Colors.success} />
    </View>
  )

  return (
    <InfoCard title='Payment Information' icon={icon}>
      <View className='gap-3'>
        <InfoRow label='Consultation Fee' value={`₹${paymentInfo.consultationFee}`} />
        <InfoRow label='Platform Fee' value={`₹${paymentInfo.platformFee}`} />
        <InfoRow label='GST (18%)' value={`₹${paymentInfo.gst}`} />

        <View className='my-2 h-px bg-neutral-200 dark:bg-neutral-700' />

        <View className='flex-row items-center justify-between'>
          <Bold className='text text-lg'>Total Amount</Bold>
          <Bold className='text-lg text-green-600 dark:text-green-400'>₹{paymentInfo.total}</Bold>
        </View>

        {isCompleted && paymentInfo.paymentMethod && (
          <>
            <View className='my-2 h-px bg-neutral-200 dark:bg-neutral-700' />
            <InfoRow label='Payment Method' value={paymentInfo.paymentMethod} />
            {paymentInfo.transactionId && <InfoRow label='Transaction ID' value={paymentInfo.transactionId} />}
            <View className='mt-3 flex-row items-center justify-center rounded-2xl bg-green-50 p-3 dark:bg-green-900/20'>
              <Tick02Icon size={20} color={Colors.success} className='mr-2' />
              <Medium className='text-sm text-green-700 dark:text-green-400'>Payment Completed</Medium>
            </View>
          </>
        )}

        {showPayButton && !isCompleted && (
          <Press
            onPress={onPayPress}
            className='mt-4 flex-row items-center justify-center rounded-2xl bg-green-600 p-4 dark:bg-green-700'
          >
            <TickDouble02Icon size={20} color='white' className='mr-2' />
            <Bold className='text-base text-white'>Pay ₹{paymentInfo.total}</Bold>
          </Press>
        )}
      </View>
    </InfoCard>
  )
}
