import HybridHead from '@components/HybridHead'
import Chip from '@components/Chip'
import Press from '@components/Press'
import Tick02Icon from '@hugeicons/Tick02Icon'
import Clock03Icon from '@hugeicons/Clock03Icon'
import { useNavigation, useRoute, useFocusEffect } from '@react-navigation/native'
import { HPStackNav } from '@utils/types'
import { useState, useEffect, useCallback } from 'react'
import { Alert, ScrollView, View } from 'react-native'
import colors from 'tailwindcss/colors'
import Daily from '@components/Daily'
import Monthly from '@components/Monthly'
import Weekly from '@components/Weekly'
import type { RecurrenceData } from '@/HPScreens/RecurrenceSchedule'
import { useRecurrenceStore } from '@/zustand/recurrenceStore'
import popupStore from '@/zustand/popupStore'
import { SemiBold } from '@utils/fonts'

const tabLabels = ['Daily', 'Weekly', 'Monthly']
const ContentMap = [Daily, Weekly, Monthly] as const

const HPDoctorScheduler = () => {
  const navigation = useNavigation<HPStackNav>()
  const route = useRoute<any>()
  const { doctorId, doctorName } = route.params
  const { recurrenceData, setRecurrenceData } = useRecurrenceStore()
  const alert = popupStore((state) => state.alert)
  const [activeTab, setActiveTab] = useState(0)
  const [dailyTimeSlots, setDailyTimeSlots] = useState<any[]>([])
  const [weeklySchedule, setWeeklySchedule] = useState<any>({})
  const [monthlySchedule, setMonthlySchedule] = useState<any>({})
  const [pendingRecurrenceData, setPendingRecurrenceData] = useState<RecurrenceData | undefined>()

  useFocusEffect(
    useCallback(() => {
      if (recurrenceData) {
        setPendingRecurrenceData(recurrenceData)
      }
    }, [recurrenceData]),
  )

  const handleDailyScheduleChange = (schedule: any) => {
    setDailyTimeSlots(schedule.slots)
  }

  const handleDailySlotCreated = () => {
    setPendingRecurrenceData(undefined)
    setRecurrenceData(undefined)
  }

  const handleWeeklyScheduleChange = (schedule: any) => {
    setWeeklySchedule(schedule)
  }

  const handleMonthlyScheduleChange = (schedule: any) => {
    setMonthlySchedule(schedule)
  }

  const hasSlots = (tabIndex: number): boolean => {
    if (tabIndex === 0) {
      return dailyTimeSlots.length > 0
    } else if (tabIndex === 1) {
      return Object.values(weeklySchedule).some((data: any) => data.slots && data.slots.length > 0)
    } else if (tabIndex === 2) {
      return Object.values(monthlySchedule).some((data: any) => data.slots && data.slots.length > 0)
    }
    return false
  }

  const handleTabChange = (newTabIndex: number) => {
    if (newTabIndex === activeTab) return

    if (hasSlots(activeTab)) {
      alert(
        'Discard Changes?',
        `You're switching from ${tabLabels[activeTab]} to ${tabLabels[newTabIndex]}. Any unsaved slots will be discarded. Are you sure?`,
        [
          {
            text: 'Cancel',
            onPress: () => {},
          },
          {
            text: 'OK',
            onPress: () => setActiveTab(newTabIndex),
          },
        ],
      )
    } else {
      setActiveTab(newTabIndex)
    }
  }

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
    <View className='flex-1 bg-white'>
      <HybridHead
        title={doctorName}
        showBackButton={true}
        rightElement={
          <Press className='' onPress={handleReview}>
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
          activeTab === index ? (
            <Component
              key={index}
              onScheduleChange={
                index === 0
                  ? handleDailyScheduleChange
                  : index === 1
                    ? handleWeeklyScheduleChange
                    : index === 2
                      ? handleMonthlyScheduleChange
                      : undefined
              }
              recurrenceData={pendingRecurrenceData}
              onSlotCreated={handleDailySlotCreated}
            />
          ) : null,
        )}
      </View>
    </View>
  )
}

export default HPDoctorScheduler
