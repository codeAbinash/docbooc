import CustomHeader from '@components/CustomHeader'
import Chip from '@components/Chip'
import Press from '@components/Press'
import Tick02Icon from '@hugeicons/Tick02Icon'
import Clock03Icon from '@hugeicons/Clock03Icon'
import { useNavigation, useRoute } from '@react-navigation/native'
import { HPStackNav } from '@utils/types'
import { useState } from 'react'
import { Alert, ScrollView, View } from 'react-native'
import colors from 'tailwindcss/colors'
import Daily from '@components/Daily'
import Monthly from '@components/Monthly'
import Weekly from '@components/Weekly'

const tabLabels = ['Daily', 'Weekly', 'Monthly']
const ContentMap = [Daily, Weekly, Monthly] as const

const HPDoctorScheduler = () => {
  const navigation = useNavigation<HPStackNav>()
  const route = useRoute<any>()
  const { doctorId, doctorName } = route.params
  const [activeTab, setActiveTab] = useState(0)
  const [dailyTimeSlots, setDailyTimeSlots] = useState<any[]>([])
  const [weeklySchedule, setWeeklySchedule] = useState<any>({})
  const [monthlySchedule, setMonthlySchedule] = useState<any>({})

  const handleReview = () => {
    const scheduleType = (tabLabels[activeTab] || 'Daily').toLowerCase()

    if (scheduleType === 'daily') {
      if (dailyTimeSlots.length === 0) {
        Alert.alert('Error', 'Please add at least one time slot')
        return
      }
    }

    if (scheduleType === 'weekly') {
      const hasValidSchedule =
        Object.keys(weeklySchedule).length > 0 &&
        Object.values(weeklySchedule).some((data: any) => data.slots && data.slots.length > 0)

      if (!hasValidSchedule) {
        Alert.alert('Error', 'Please select at least one day and add time slots')
        return
      }
    }

    if (scheduleType === 'monthly') {
      const hasValidSchedule =
        Object.keys(monthlySchedule).length > 0 &&
        Object.values(monthlySchedule).some((data: any) => data.slots && data.slots.length > 0)

      if (!hasValidSchedule) {
        Alert.alert('Error', 'Please select at least one date and add time slots')
        return
      }
    }

    let scheduleData: any = {
      scheduleType,
      doctorId,
    }

    if (scheduleType === 'daily') {
      scheduleData.timeSlots = dailyTimeSlots.map((slot) => ({
        startTime: slot.startTime.toISOString(),
        endTime: slot.endTime.toISOString(),
        maxBookings: slot.maxBookings,
      }))
    } else if (scheduleType === 'weekly') {
      const weekDays: number[] = []
      const timeSlots: any[] = []

      Object.entries(weeklySchedule).forEach(([day, data]: [string, any]) => {
        const dayIndex = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'].indexOf(day)
        if (dayIndex !== -1 && !weekDays.includes(dayIndex)) {
          weekDays.push(dayIndex)
        }

        data.slots.forEach((slot: any) => {
          timeSlots.push({
            dayOfWeek: dayIndex,
            startTime: slot.startTime.toISOString(),
            endTime: slot.endTime.toISOString(),
            maxBookings: 20,
          })
        })
      })

      scheduleData.weekDays = weekDays
      scheduleData.timeSlots = timeSlots
    } else if (scheduleType === 'monthly') {
      const monthDays: number[] = []
      const timeSlots: any[] = []

      Object.entries(monthlySchedule).forEach(([dateStr, data]: [string, any]) => {
        const date = parseInt(dateStr)
        if (!monthDays.includes(date)) {
          monthDays.push(date)
        }

        data.slots.forEach((slot: any) => {
          timeSlots.push({
            dayOfMonth: date,
            startTime: slot.startTime.toISOString(),
            endTime: slot.endTime.toISOString(),
            maxBookings: 20,
          })
        })
      })

      scheduleData.monthDays = monthDays.sort((a, b) => a - b)
      scheduleData.timeSlots = timeSlots
    }

    navigation.navigate('HPScheduleReview', {
      doctorId,
      doctorName,
      scheduleData,
    })
  }

  return (
    <View className='bg flex-1'>
      <CustomHeader
        title={doctorName}
        showBackButton
        onBackPress={() => navigation.goBack()}
        rightElement={
          <Press className='size-12 items-center justify-center rounded-xl bg-green-500/15' onPress={handleReview}>
            <Tick02Icon size={25} strokeWidth={2} color={colors.green[600]} />
          </Press>
        }
      />
      <View className='flex-row items-center justify-center gap-5 bg-white px-5 py-2 dark:bg-neutral-900'>
        {tabLabels.map((label, index) => (
          <Chip
            key={label}
            label={label}
            icon={Clock03Icon}
            isActive={activeTab === index}
            onPress={() => setActiveTab(index)}
            variant={activeTab === index ? 'transparentAccent' : 'default'}
            className='flex-1'
          />
        ))}
      </View>
      <View className='flex-1'>
        {ContentMap.map((Component, index) =>
          activeTab === index ? (
            <Component
              key={index}
              onTimeSlotsChange={index === 0 ? setDailyTimeSlots : undefined}
              onScheduleChange={index === 1 ? setWeeklySchedule : index === 2 ? setMonthlySchedule : undefined}
            />
          ) : null,
        )}
      </View>
    </View>
  )
}

export default HPDoctorScheduler
