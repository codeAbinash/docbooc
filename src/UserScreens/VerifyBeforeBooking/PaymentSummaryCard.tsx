import Calendar01Icon from '@hugeicons/Calendar01Icon'
import { Medium, SemiBold } from '@utils/fonts'
import { View } from 'react-native'

interface PaymentSummaryCardProps {
  consultationFee?: number
  platformFee?: number
  gstPercentage?: number
  gst?: number
}

export const PaymentSummaryCard = ({

  platformFee = 21.40,
  gstPercentage = 18,
  gst = 3.60,
}: PaymentSummaryCardProps) => {
  const total = platformFee + gst

  return (
    <View className='overflow-hidden rounded-3xl border border-neutral-300 bg-white dark:border-neutral-700 dark:bg-zinc-900'>
      <View className='border-b border-neutral-300 px-4 py-3 dark:border-neutral-700'>
        <View className='flex-row items-center gap-3'>
          <View className='rounded-md bg-green-100/50 p-2 dark:bg-green-900/20'>
            <Calendar01Icon size={20} color='#16a34a' strokeWidth={2} />
          </View>
          <SemiBold className='text-lg text-neutral-900 dark:text-white'>Payment Summary</SemiBold>
        </View>
      </View>

      <View className='px-4 py-3'>
        <View className='gap-3 '>
          {/* <View className='flex-row justify-between'>
            <Medium className='text-base text-neutral-600 dark:text-neutral-400'>Consultation Fee</Medium>
            <SemiBold className='text-base text-neutral-900 dark:text-white'>₹{consultationFee}</SemiBold>
          </View>

          <View className='h-px bg-neutral-100 dark:bg-neutral-700' /> */}

          <View className='flex-row justify-between'>
            <Medium className='text-base text-neutral-600 dark:text-neutral-400'>Platform Fee</Medium>
            <SemiBold className='text-base text-neutral-900 dark:text-white'>₹{platformFee}</SemiBold>
          </View>

          <View className='h-px bg-neutral-100 dark:bg-neutral-700' />

          <View className='flex-row justify-between'>
            <Medium className='text-base text-neutral-600 dark:text-neutral-400'>GST ({gstPercentage}%)</Medium>
            <SemiBold className='text-base text-neutral-900 dark:text-white'>₹{gst}</SemiBold>
          </View>

          <View className='h-px bg-neutral-200 dark:bg-neutral-600' />

          <View className='flex-row items-center justify-between py-2'>
            <SemiBold className='text-base text-neutral-900 dark:text-white'>Total Payable</SemiBold>
            <SemiBold className='text-lg text-green-600 dark:text-green-400'>₹{total}</SemiBold>
          </View>
        </View>
      </View>
    </View>
  )
}
