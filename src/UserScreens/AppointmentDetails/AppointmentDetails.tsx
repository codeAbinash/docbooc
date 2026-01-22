import Clock03Icon from '@assets/icons/hugeicons/Clock03Icon'
import Doctor01Icon from '@assets/icons/hugeicons/Doctor01Icon'
import Location06Icon from '@assets/icons/hugeicons/Location06Icon'
import PatientIcon from '@assets/icons/hugeicons/PatientIcon'
import HybridHead from '@components/HybridHead'
import { PaddingBottom } from '@components/SafePadding'
import Calendar01Icon from '@hugeicons/Calendar01Icon'
import { useNavigation, useRoute } from '@react-navigation/native'
import { useQuery } from '@tanstack/react-query'
import { client } from '@utils/client'
import { Medium, SemiBold } from '@utils/fonts'
import { StackNav } from '@utils/types'
import { ScrollView, View } from 'react-native'

// Pure helper: format time string to 12-hour format (e.g. 14:30 -> 2:30 PM)
function formatTime12(timeStr?: string | null) {
  if (!timeStr) return 'TBD'

  // Try parsing as full datetime
  const dt = new Date(timeStr)
  if (!isNaN(dt.getTime())) {
    const hours = dt.getHours()
    const minutes = dt.getMinutes()
    const ampm = hours >= 12 ? 'PM' : 'AM'
    const h12 = hours % 12 || 12
    return `${h12}:${String(minutes).padStart(2, '0')} ${ampm}`
  }

  // Match simple time like HH:MM or HH:MM:SS
  const m = String(timeStr).match(/^(\d{1,2}):(\d{2})(?::\d{2})?$/)
  if (m) {
    let hours = Number(m[1])
    const minutes = Number(m[2])
    const ampm = hours >= 12 ? 'PM' : 'AM'
    const h12 = hours % 12 || 12
    return `${h12}:${String(minutes).padStart(2, '0')} ${ampm}`
  }

  return String(timeStr)
}

// Pure helper: format date to `12 Jan 2026` style
function formatDateShort(dateStr?: string | null) {
  if (!dateStr) return 'N/A'

  const dt = new Date(dateStr)
  if (!isNaN(dt.getTime())) {
    const day = dt.getDate()
    const month = dt.toLocaleString('en-US', { month: 'short' })
    const year = dt.getFullYear()
    return `${day} ${month} ${year}`
  }

  // Fallback for YYYY-MM-DD or similar
  const m = String(dateStr).match(/^(\d{4})-(\d{2})-(\d{2})/)
  if (m) {
    const y = m[1]
    const mo = Number(m[2])
    const d = Number(m[3])
    const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
    return `${d} ${monthNames[mo - 1]} ${y}`
  }

  return String(dateStr)
}

export default function AppointmentDetails() {
  const navigation = useNavigation<StackNav>()
  const route = useRoute()

  const { appointmentId, status = 'confirmed' } = route.params as {
    appointmentId: string
    status?: 'provisional' | 'confirmed'
  }

  const { data } = useQuery({
    queryKey: ['appointmentDetails', route.params],
    queryFn: async () => {
      const res = await client.api.v1.users.booking[':bookingId'].$get({
        param: {
          bookingId: appointmentId,
        },
      })

      return (await res.json())?.data
    },
  })

  console.log(data)

  return (
    <View className='flex-1 bg-white'>
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
                  <SemiBold className='text-base text-neutral-900 dark:text-white'>Appointment Details </SemiBold>
                </View>
                <View className='bg-green-100 px-3 py-1 dark:bg-blue-900/30'>
                  <SemiBold className='text-xs capitalize text-green-600 dark:text-blue-400'>
                    {data?.booking?.bookingStatus || 'pending'}
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
                    {data?.doctor?.name || 'N/A'}
                  </SemiBold>
                  <Medium className='mt-1 text-sm text-neutral-600 dark:text-neutral-400'>
                    {data?.doctor?.department || ''}
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
                    {data?.patient?.name || 'N/A'}
                  </SemiBold>
                  <Medium className='mt-1 text-sm text-neutral-600 dark:text-neutral-400'>
                    Gender: {data?.patient?.gender || 'N/A'}
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
                      {formatTime12(data?.schedule?.startTime)}
                    </SemiBold>
                    <Medium className='mt-1 text-sm text-neutral-600 dark:text-neutral-400'>
                      {formatDateShort(data?.booking?.date)}
                    </Medium>
                  </View>
                </View>
                <View className='items-end'>
                  <SemiBold className='text-sm text-neutral-600 dark:text-neutral-400'>Queue</SemiBold>
                  <SemiBold className='mt-1 text-lg text-blue-600 dark:text-blue-400'>
                    Q{data?.booking?.queueNo || 'N/A'}
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
                    {data?.healthcareProvider?.name || 'N/A'}
                  </SemiBold>
                  <Medium className='mt-1 text-sm text-neutral-600 dark:text-neutral-400'>
                    {[data?.healthcareProvider?.roadName, data?.healthcareProvider?.city].filter(Boolean).join(', ') ||
                      'Address N/A'}
                  </Medium>
                </View>
              </View>
            </View>

            {/* Status Section */}
            <View className='border-t border-neutral-100 px-4 py-3 dark:border-neutral-700'>
              <View className='flex-row items-start gap-3'>
                <View
                  className={`rounded-md p-2 ${data?.booking?.bookingStatus === 'confirmed' ? 'bg-green-100/50 dark:bg-green-900/20' : 'bg-yellow-100/50 dark:bg-yellow-900/20'}`}
                >
                  <Calendar01Icon
                    size={16}
                    color={data?.booking?.bookingStatus === 'confirmed' ? '#16a34a' : '#eab308'}
                    strokeWidth={2}
                  />
                </View>
                <View className='flex-1'>
                  <Medium className='text-sm text-neutral-600 dark:text-neutral-400'>Status</Medium>
                  <SemiBold className='mt-1 text-sm capitalize text-neutral-900 dark:text-white'>
                    {data?.booking?.bookingStatus || 'pending'}
                  </SemiBold>
                  <Medium className='mt-1 text-xs text-neutral-600 dark:text-neutral-400'>
                    {data?.booking?.bookingStatus === 'confirmed'
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
                  <SemiBold className='text-3xl text-blue-600 dark:text-blue-400'>
                    {data?.booking?.sharedCode || 'N/A'}
                  </SemiBold>
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
                  <SemiBold className='text-sm text-neutral-900 dark:text-white'>₹0</SemiBold>
                </View>
                <View className='h-px bg-neutral-100 dark:bg-neutral-700' />
                <View className='flex-row justify-between'>
                  <Medium className='text-sm text-neutral-600 dark:text-neutral-400'>GST (18%)</Medium>
                  <SemiBold className='text-sm text-neutral-900 dark:text-white'>₹0</SemiBold>
                </View>
                <View className='h-px bg-neutral-200 dark:bg-neutral-600' />
                <View className='flex-row items-center justify-between py-2'>
                  <SemiBold className='text-base text-neutral-900 dark:text-white'>Total Payable</SemiBold>
                  <SemiBold className='text-lg text-green-600 dark:text-green-400'>₹0</SemiBold>
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
