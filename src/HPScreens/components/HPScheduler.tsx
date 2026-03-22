import HybridHead from '@components/HybridHead'
import Chip from '@components/Chip'
import Press from '@components/Press'
import Clock03Icon from '@hugeicons/Clock03Icon'
import { useNavigation, useRoute, useFocusEffect } from '@react-navigation/native'
import { HPStackNav } from '@utils/types'
import { useState, useCallback } from 'react'
import { Alert, View } from 'react-native'
import Monthly from '@/HPScreens/components/Monthly'
import Weekly from '@/HPScreens/components/Weekly'

import popupStore from '@/zustand/popupStore'
import { SemiBold } from '@utils/fonts'

const tabLabels = ['Weekly', 'Monthly']
const ContentMap = [Weekly, Monthly] as const

const DAY_NAMES = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']

const hasScheduleSlots = (schedule: any, tabIndex: number): boolean => {
  return Object.values(schedule[tabIndex === 0 ? 'weekly' : 'monthly']).some((d: any) => d?.slots?.length > 0)
}

const buildScheduleData = (schedule: any, tabIndex: number, doctorId: string) => {
  const scheduleType = (tabLabels[tabIndex] || 'weekly').toLowerCase()
  const data: any = { scheduleType, doctorId }

  const key = tabIndex === 0 ? 'weekDays' : 'monthDays'
  const dateKey = tabIndex === 0 ? 'dayOfWeek' : 'dayOfMonth'
  const schedule_ = schedule[tabIndex === 0 ? 'weekly' : 'monthly']
  const dates = new Set<number>()
  const timeSlots: any[] = []

  Object.entries(schedule_).forEach(([day, dayData]: [string, any]) => {
    const dateNum = tabIndex === 0 ? DAY_NAMES.indexOf(day) : parseInt(day)
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
  data[key] = tabIndex === 1 ? Array.from(dates).sort((a, b) => a - b) : Array.from(dates)
  data.timeSlots = timeSlots

  return data
}

const HPScheduler = () => {
  const navigation = useNavigation<HPStackNav>()
  const route = useRoute<any>()
  const { doctorId, doctorName } = route.params
  const alert = popupStore((state) => state.alert)
  const [activeTab, setActiveTab] = useState(0)
  const [schedule, setSchedule] = useState({ weekly: {}, monthly: {} })

  const handleScheduleChange = (data: any) => {
    const keys = ['weekly', 'monthly'] as const
    const key = keys[activeTab] as keyof typeof schedule
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
      const msg = `Please select at least one ${activeTab === 0 ? 'day' : 'date'} and add time slots`
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
