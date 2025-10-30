import FabIcon from '@components/FabIcon'
import { PaddingTop, PaddingBottom } from '@components/SafePadding'
import PlusSignIcon from '@hugeicons/PlusSignIcon'
import { Header } from '@/UserScreens/BookAppointment/components/Header'
import { HPNavProp } from '@utils/types'
import { ScrollView, View, TouchableOpacity } from 'react-native'
import { Medium, SemiBold } from '@utils/fonts'
import Calendar03Icon from '@hugeicons/Calendar03Icon'
import ArrowLeft01Icon from '@hugeicons/ArrowLeft01Icon'
import { useColorScheme } from 'nativewind'
import { useState } from 'react'

// Sample data structure
const SCHEDULE_DATA = {
  weekly: [
    { day: 'Monday', slots: ['5:00 AM - 8:00 AM', '2:00 PM - 5:00 PM'] },
    { day: 'Wednesday', slots: ['9:00 AM - 12:00 PM'] },
    { day: 'Friday', slots: ['3:00 PM - 6:00 PM'] },
  ],
  daily: [{ slots: ['10:00 AM - 1:00 PM', '4:00 PM - 7:00 PM'] }],
  monthly: [{ date: 15, slots: ['11:00 AM - 2:00 PM'] }],
}

export default function HPDoctorScheduleDetails({ navigation }: HPNavProp) {
  const [isEnabled, setIsEnabled] = useState(true)

  const toggleSchedule = () => {
    setIsEnabled((prev) => !prev)
  }

  const { colorScheme } = useColorScheme()

  return (
    <View className='bg flex-1'>
      <PaddingTop />
      <Header
        title='Schedule Details'
        RightComponent={
          <View className='flex-row gap-2'>
            <TouchableOpacity
              onPress={() => setIsEnabled(true)}
              className='size-12 items-center justify-center rounded-xl bg-white dark:bg-zinc-900'
            >
              <PlusSignIcon
                size={25}
                strokeWidth={1.7}
                color={isEnabled ? '#22c55e' : colorScheme === 'dark' ? 'white' : 'black'}
                style={{ transform: [{ rotate: '45deg' }] }}
              />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => setIsEnabled(false)}
              className='size-12 items-center justify-center rounded-xl bg-white dark:bg-zinc-900'
            >
              <ArrowLeft01Icon
                size={25}
                strokeWidth={1.7}
                color={!isEnabled ? '#ef4444' : colorScheme === 'dark' ? 'white' : 'black'}
                style={{ transform: [{ rotate: '45deg' }] }}
              />
            </TouchableOpacity>
          </View>
        }
      />
      <ScrollView className='flex-1' showsVerticalScrollIndicator={false}>
        <View className='flex-1 gap-6 p-5'>
          {/* Weekly Schedule */}
          {SCHEDULE_DATA.weekly.length > 0 && (
            <View className='gap-4'>
              <View className='flex-row items-center gap-3'>
                <View className='rounded-lg bg-purple-100/50 p-2.5 dark:bg-purple-900/20'>
                  <Calendar03Icon size={20} color='#a855f7' strokeWidth={2} />
                </View>
                <SemiBold className='text-lg'>Weekly Schedule</SemiBold>
              </View>

              <View className='gap-3'>
                {SCHEDULE_DATA.weekly.map((schedule, index) => (
                  <View
                    key={index}
                    className='overflow-hidden rounded-xl border border-neutral-100 bg-white dark:border-neutral-700 dark:bg-neutral-800'
                  >
                    {schedule.slots.map((slot, slotIndex) => (
                      <View key={slotIndex}>
                        <View className='p-4'>
                          <Medium className='text-base'>
                            Every {schedule.day} {slot}
                          </Medium>
                        </View>
                        {slotIndex !== schedule.slots.length - 1 && (
                          <View className='h-[1px] w-full bg-neutral-100 dark:bg-neutral-700' />
                        )}
                      </View>
                    ))}
                  </View>
                ))}
              </View>
            </View>
          )}

          {/* Daily Schedule */}
          {SCHEDULE_DATA.daily.length > 0 && (
            <View className='gap-4'>
              <View className='flex-row items-center gap-3'>
                <View className='rounded-lg bg-blue-100/50 p-2.5 dark:bg-blue-900/20'>
                  <Calendar03Icon size={20} color='#3b82f6' strokeWidth={2} />
                </View>
                <SemiBold className='text-lg'>Daily Schedule</SemiBold>
              </View>

              <View className='gap-3'>
                {SCHEDULE_DATA.daily.map((schedule, index) => (
                  <View
                    key={index}
                    className='overflow-hidden rounded-xl border border-neutral-100 bg-white dark:border-neutral-700 dark:bg-neutral-800'
                  >
                    {schedule.slots.map((slot, slotIndex) => (
                      <View key={slotIndex}>
                        <View className='p-4'>
                          <Medium className='text-base'>Every day {slot}</Medium>
                        </View>
                        {slotIndex !== schedule.slots.length - 1 && (
                          <View className='h-[1px] w-full bg-neutral-100 dark:bg-neutral-700' />
                        )}
                      </View>
                    ))}
                  </View>
                ))}
              </View>
            </View>
          )}

          {/* Monthly Schedule */}
          {SCHEDULE_DATA.monthly.length > 0 && (
            <View className='gap-4'>
              <View className='flex-row items-center gap-3'>
                <View className='rounded-lg bg-green-100/50 p-2.5 dark:bg-green-900/20'>
                  <Calendar03Icon size={20} color='#22c55e' strokeWidth={2} />
                </View>
                <SemiBold className='text-lg'>Monthly Schedule</SemiBold>
              </View>

              <View className='gap-3'>
                {SCHEDULE_DATA.monthly.map((schedule, index) => (
                  <View
                    key={index}
                    className='overflow-hidden rounded-xl border border-neutral-100 bg-white dark:border-neutral-700 dark:bg-neutral-800'
                  >
                    {schedule.slots.map((slot, slotIndex) => (
                      <View key={slotIndex}>
                        <View className='p-4'>
                          <Medium className='text-base'>
                            Every month on {schedule.date}th {slot}
                          </Medium>
                        </View>
                        {slotIndex !== schedule.slots.length - 1 && (
                          <View className='h-[1px] w-full bg-neutral-100 dark:bg-neutral-700' />
                        )}
                      </View>
                    ))}
                  </View>
                ))}
              </View>
            </View>
          )}
        </View>
        <PaddingBottom />
      </ScrollView>

      <FabIcon
        Icon={<PlusSignIcon color='white' strokeWidth={2} />}
        onPress={() => navigation.navigate('HPDoctorScheduler')}
      />
    </View>
  )
}
