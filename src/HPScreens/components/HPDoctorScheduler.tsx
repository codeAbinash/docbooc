import { Header } from '@/UserScreens/BookAppointment/components/Header'
import Press from '@components/Press'
import { PaddingTop } from '@components/SafePadding'
import { Tabs } from '@components/Tabs'
import Tick02Icon from '@hugeicons/Tick02Icon'
import { useNavigation, useRoute } from '@react-navigation/native'
import { HPStackNav } from '@utils/types'
import { hpApi } from '@utils/client'
import { useState } from 'react'
import { View } from 'react-native'
import colors from 'tailwindcss/colors'
import Daily from './Daily'
import Monthly from './Monthly'
import Weekly from './Weekly'

// hpApi.schedules.$post({
//   json: {
//     doctorId: 'doc_12345',
//     scheduleType: 'daily',
//     timeSlots: [
//       {
//         startTime: '09:00',
//         endTime: '12:00',
//         maxBookings: 5,
//       },
//     ],
//     isActive: true,
//     monthDays: [
//       1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31,
//     ],
//     weekDays: [0, 1, 2, 3, 4, 5, 6],
//   },
// })

const tabLabels = ['Daily', 'Weekly', 'Monthly']
const ContentMap = [Daily, Weekly, Monthly] as const

const HPDoctorScheduler = () => {
  const navigation = useNavigation<HPStackNav>()
  const route = useRoute<any>()
  const { doctorId, doctorName } = route.params
  const [activeTab, setActiveTab] = useState(1)

  const handleReview = () => {
    const scheduleData = {
      scheduleType: (tabLabels[activeTab] || 'Daily').toLowerCase(),
      timeSlots: [
        {
          startTime: '09:00',
          endTime: '12:00',
          maxBookings: 5,
        },
      ],
      weekDays: [0, 1, 2, 3, 4, 5, 6],
      monthDays: Array.from({ length: 31 }, (_, i) => i + 1),
    }

    navigation.navigate('HPScheduleReview', {
      doctorId,
      doctorName,
      scheduleData,
    })
  }

  return (
    <View className='bg flex-1'>
      <PaddingTop />
      <Header
        title={doctorName}
        RightComponent={
          <Press className='size-12 items-center justify-center rounded-xl bg-green-500/15' onPress={handleReview}>
            <Tick02Icon size={25} strokeWidth={2} color={colors.green[600]} />
          </Press>
        }
      />
      <View className='flex-1'>
        <View className='px-5'>
          <Tabs tabs={tabLabels} activeTab={activeTab} onTabChange={setActiveTab} />
        </View>
        <View className='mt-3 flex-1'>
          {ContentMap.map((Component, index) => activeTab === index && <Component key={index} />)}
        </View>
      </View>
    </View>
  )
}

export default HPDoctorScheduler
