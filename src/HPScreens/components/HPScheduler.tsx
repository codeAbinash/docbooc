import HybridHead from '@components/HybridHead'
import Chip from '@components/Chip'
import Press from '@components/Press'
import Clock03Icon from '@hugeicons/Clock03Icon'
import { useNavigation, useRoute } from '@react-navigation/native'
import { HPStackNav } from '@utils/types'
import { useState } from 'react'
import { Alert, View } from 'react-native'
import Daily from '@/components/Daily'
import Monthly from '@/HPScreens/components/Monthly'
import Weekly from '@/HPScreens/components/Weekly'

import popupStore from '@/zustand/popupStore'
import { SemiBold } from '@utils/fonts'

const tabLabels = ['Daily', 'Weekly', 'Monthly'] as const
const ContentMap = [Daily, Weekly, Monthly] as const
const scheduleKeys = ['daily', 'weekly', 'monthly'] as const

const DAY_NAMES = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']

const hasScheduleSlots = (schedule: any, tabIndex: number): boolean => {
  const key = scheduleKeys[tabIndex]
  if (!key) return false
  if (key === 'daily') {
    return Array.isArray(schedule.daily) && schedule.daily.length > 0
  }
  return Object.values(schedule[key] || {}).some((d: any) => d?.slots?.length > 0)
}

const buildScheduleData = (schedule: any, tabIndex: number, doctorId: string) => {
  const scheduleType = tabLabels[tabIndex]!.toLowerCase()
  const data: any = { scheduleType, doctorId }

  if (scheduleType === 'daily') {
    data.timeSlots = (schedule.daily || []).map((slot: any) => ({
      startTime: slot.startTime.toISOString(),
      endTime: slot.endTime.toISOString(),
      maxBookings: slot.maxBookings || 20,
    }))
    return data
  }

  const isWeekly = scheduleType === 'weekly'
  const key = isWeekly ? 'weekDays' : 'monthDays'
  const dateKey = isWeekly ? 'dayOfWeek' : 'dayOfMonth'
  const schedule_ = schedule[isWeekly ? 'weekly' : 'monthly']
  const dates = new Set<number>()
  const timeSlots: any[] = []

  Object.entries(schedule_).forEach(([day, dayData]: [string, any]) => {
    const dateNum = isWeekly ? DAY_NAMES.indexOf(day) : parseInt(day)
    if (dateNum !== -1) {
      dates.add(dateNum)
      dayData.slots.forEach((slot: any) => {
        timeSlots.push({
          [dateKey]: dateNum,
          startTime: slot.startTime.toISOString(),
          endTime: slot.endTime.toISOString(),
          maxBookings: 20,
        })
      })
    }
  })
  data[key] = isWeekly ? Array.from(dates) : Array.from(dates).sort((a, b) => a - b)
  data.timeSlots = timeSlots

  return data
}

const HPScheduler = () => {
  const navigation = useNavigation<HPStackNav>()
  const route = useRoute<any>()
  const { doctorId, doctorName } = route.params
  const alert = popupStore((state) => state.alert)
  const [activeTab, setActiveTab] = useState(0)
  const [schedule, setSchedule] = useState({ daily: [], weekly: {}, monthly: {} })

  const handleScheduleChange = (data: any) => {
    const key = scheduleKeys[activeTab] as keyof typeof schedule
    setSchedule((prev) => ({ ...prev, [key]: data.slots || data }))
  }

  const handleTabChange = (newTabIndex: number) => {
    if (newTabIndex === activeTab) return
    if (!hasScheduleSlots(schedule, activeTab)) {
      setActiveTab(newTabIndex)
      return
    }
    alert(
      'Discard Changes?',
      `Switching from ${tabLabels[activeTab]} to ${tabLabels[newTabIndex]}. Any unsaved slots will be discarded.`,
      [{ text: 'Cancel' }, { text: 'OK', onPress: () => setActiveTab(newTabIndex) }],
    )
  }

  const handleReview = () => {
    if (!hasScheduleSlots(schedule, activeTab)) {
      const msg =
        activeTab === 0
          ? 'Please add at least one time slot'
          : `Please select at least one ${activeTab === 1 ? 'day' : 'date'} and add time slots`
      Alert.alert('Error', msg)
      return
    }
    navigation.navigate('HPScheduleReview', {
      doctorId,
      doctorName,
      scheduleData: buildScheduleData(schedule, activeTab, doctorId),
    })
  }

  return (
    <View className='flex-1 bg-white'>
      <HybridHead
        title={doctorName}
        showBackButton
        rightElement={
          <Press onPress={handleReview}>
            <SemiBold className='text-xl text-accent'>Done</SemiBold>
          </Press>
        }
      />
      <View className='flex-row items-center justify-between gap-5 bg-white px-5 py-2 pb-4 dark:bg-neutral-900'>
        {tabLabels.map((label, index) => (
          <Chip
            key={label}
            label={label}
            icon={Clock03Icon}
            isActive={activeTab === index}
            onPress={() => handleTabChange(index)}
            variant={activeTab === index ? 'transparentAccent' : 'default'}
            className='flex-1'
          />
        ))}
      </View>
      <View className='flex-1'>
        {ContentMap.map((Component, index) =>
          activeTab === index ? <Component key={index} onScheduleChange={handleScheduleChange} /> : null,
        )}
      </View>
    </View>
  )
}

export default HPScheduler
