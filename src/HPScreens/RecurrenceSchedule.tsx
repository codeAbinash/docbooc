import { useState } from 'react'
import { View, TouchableOpacity, ScrollView, TextInput } from 'react-native'
import { Bold, Medium, SemiBold } from '@utils/fonts'
import DateTimePicker from '@react-native-community/datetimepicker'
import HybridHead from '@components/HybridHead'
import { useNavigation, useRoute } from '@react-navigation/native'
import { useRecurrenceStore } from '@/zustand/recurrenceStore'

type RecurrenceType = 'never' | 'on' | 'after'

export type RecurrenceData = {
  startDate: Date
  startTime: Date
  endTime: Date
  maxBookings: number
  bookingWindowDays: number
  endType: RecurrenceType
  endDate?: Date
  occurrences?: number
}

export default function RecurrenceSchedule() {
  const navigation = useNavigation()
  const { setRecurrenceData } = useRecurrenceStore()
  const [startDate, setStartDate] = useState(new Date())
  const [startTime, setStartTime] = useState(() => {
    const date = new Date()
    date.setHours(0, 0, 0, 0)
    return date
  })
  const [endTime, setEndTime] = useState(() => {
    const date = new Date()
    date.setHours(12, 0, 0, 0)
    return date
  })
  const [maxBookings, setMaxBookings] = useState('20')
  const [bookingWindowDays, setBookingWindowDays] = useState('7')
  const [endType, setEndType] = useState<RecurrenceType>('never')
  const [endDate, setEndDate] = useState(new Date())
  const [occurrences, setOccurrences] = useState('13')
  const [showStartDatePicker, setShowStartDatePicker] = useState(false)
  const [showStartTimePicker, setShowStartTimePicker] = useState(false)
  const [showEndTimePicker, setShowEndTimePicker] = useState(false)
  const [showEndDatePicker, setShowEndDatePicker] = useState(false)

  const handleConfirm = () => {
    const data: RecurrenceData = {
      startDate,
      startTime,
      endTime,
      maxBookings: Math.max(0, Math.min(100, parseInt(maxBookings) || 0)),
      bookingWindowDays: Math.max(0, parseInt(bookingWindowDays) || 7),
      endType,
      ...(endType === 'on' && { endDate }),
      ...(endType === 'after' && { occurrences: parseInt(occurrences) || 1 }),
    }
    setRecurrenceData(data)
    navigation.goBack()
  }

  const handleClose = () => {
    navigation.goBack()
  }

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', { month: 'long', day: 'numeric' })
  }

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true })
  }

  return (
    <View className='flex-1 bg-white dark:bg-neutral-800'>
      <HybridHead
        title='Recurrence'
        showBackButton
        onBackPress={handleClose}
        rightElement={
          <TouchableOpacity onPress={handleConfirm} className=''>
            <SemiBold className='text-xl text-accent'>Save</SemiBold>
          </TouchableOpacity>
        }
      />

      <ScrollView className='flex-1' contentContainerClassName='items-center'>
        <View className='w-full max-w-md gap-0'>
          {/* Time Section */}
          <View className='px-5 py-6'>
            <Medium className='mb-2 text-lg text-neutral-800 dark:text-neutral-200'>Time</Medium>
            <View className='mb-4 flex-row gap-3'>
              <View className='flex-1'>
                <Medium className='mb-2 text-xs text-neutral-500 dark:text-neutral-400'>Start Time</Medium>
                <TouchableOpacity
                  onPress={() => setShowStartTimePicker(true)}
                  className='rounded-lg border border-neutral-300 bg-white px-4 py-3 dark:border-neutral-600 dark:bg-neutral-700'
                >
                  <Medium className='text-center text-neutral-800 dark:text-neutral-200'>
                    {formatTime(startTime)}
                  </Medium>
                </TouchableOpacity>
                {showStartTimePicker && (
                  <DateTimePicker
                    value={startTime}
                    mode='time'
                    display='spinner'
                    onChange={(event, date) => {
                      if (date) {
                        setStartTime(date)
                        setShowStartTimePicker(false)
                      }
                    }}
                  />
                )}
              </View>
              <View className='flex-1'>
                <Medium className='mb-2 text-xs text-neutral-500 dark:text-neutral-400'>End Time</Medium>
                <TouchableOpacity
                  onPress={() => setShowEndTimePicker(true)}
                  className='rounded-lg border border-neutral-300 bg-white px-4 py-3 dark:border-neutral-600 dark:bg-neutral-700'
                >
                  <Medium className='text-center text-neutral-800 dark:text-neutral-200'>{formatTime(endTime)}</Medium>
                </TouchableOpacity>
                {showEndTimePicker && (
                  <DateTimePicker
                    value={endTime}
                    mode='time'
                    display='spinner'
                    onChange={(event, date) => {
                      if (date) {
                        setEndTime(date)
                        setShowEndTimePicker(false)
                      }
                    }}
                  />
                )}
              </View>
            </View>
          </View>

          <View className='h-[1px] bg-neutral-200 dark:bg-neutral-700' />

          {/* Max Bookings Section */}
          <View className='px-5 py-4'>
            <View className='flex-row items-center gap-3'>
              <View className='flex-1'>
                <Medium className='mb-1 text-lg text-neutral-800 dark:text-neutral-200'>Max Bookings</Medium>
                <Medium className='text-xs text-neutral-500 dark:text-neutral-400'>
                  Maximum number of patients that can book this slot
                </Medium>
              </View>
              <View className='w-20 rounded-lg border border-neutral-300 bg-white px-3 py-2 dark:border-neutral-600 dark:bg-neutral-700'>
                <TextInput
                  value={maxBookings}
                  onChangeText={setMaxBookings}
                  keyboardType='number-pad'
                  maxLength={3}
                  placeholder='20'
                  placeholderTextColor='#999'
                  className='text-center text-lg text-neutral-800 dark:text-neutral-200'
                />
              </View>
            </View>
          </View>

          <View className='h-[1px] bg-neutral-200 dark:bg-neutral-700' />

          {/* Booking Window Section */}
          <View className='px-5 py-4'>
            <View className='flex-row items-center gap-3'>
              <View className='flex-1'>
                <Medium className='mb-1 text-lg text-neutral-800 dark:text-neutral-200'>Booking Window</Medium>
                <Medium className='text-xs text-neutral-500 dark:text-neutral-400'>
                  Days in advance patients can book appointments
                </Medium>
              </View>
              <View className='w-20 rounded-lg border border-neutral-300 bg-white px-3 py-2 dark:border-neutral-600 dark:bg-neutral-700'>
                <TextInput
                  value={bookingWindowDays}
                  onChangeText={setBookingWindowDays}
                  keyboardType='number-pad'
                  maxLength={3}
                  placeholder='7'
                  placeholderTextColor='#999'
                  className='text-center text-lg text-neutral-800 dark:text-neutral-200'
                />
              </View>
            </View>
          </View>

          <View className='h-[1px] bg-neutral-200 dark:bg-neutral-700' />

          {/* Start Date Section */}
          <View className='px-5 py-6'>
            <Medium className='mb-3 text-lg text-neutral-800 dark:text-neutral-200'>Starts On</Medium>
            <TouchableOpacity
              onPress={() => setShowStartDatePicker(true)}
              className='rounded-lg border border-neutral-300 bg-white px-4 py-3 dark:border-neutral-600 dark:bg-neutral-700'
            >
              <Medium className='text-center text-neutral-800 dark:text-neutral-200'>{formatDate(startDate)}</Medium>
            </TouchableOpacity>
            {showStartDatePicker && (
              <DateTimePicker
                value={startDate}
                mode='date'
                display='spinner'
                onChange={(event, date) => {
                  if (date) {
                    setStartDate(date)
                    setShowStartDatePicker(false)
                  }
                }}
              />
            )}
          </View>

          <View className='h-[1px] bg-neutral-200 dark:bg-neutral-700' />

          {/* End Settings Section */}
          <View className='gap-2 px-5 py-6'>
            <Medium className='mb-3 text-lg text-neutral-800 dark:text-neutral-200'>Ends On</Medium>

            <TouchableOpacity onPress={() => setEndType('never')} className='mb-3 flex-row items-center gap-3'>
              <View
                className={`size-6 items-center justify-center rounded-full border-2 ${
                  endType === 'never' ? 'border-green-700 bg-green-700' : 'border-neutral-400 dark:border-neutral-600'
                }`}
              >
                {endType === 'never' && <View className='size-2 rounded-full bg-white' />}
              </View>
              <Medium className='text-neutral-800 dark:text-neutral-200'>Never</Medium>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => setEndType('on')} className='mb-3 flex-row items-center gap-3'>
              <View
                className={`size-6 items-center justify-center rounded-full border-2 ${
                  endType === 'on' ? 'border-green-700 bg-green-700' : 'border-neutral-400 dark:border-neutral-600'
                }`}
              >
                {endType === 'on' && <View className='size-2 rounded-full bg-white' />}
              </View>
              <TouchableOpacity
                onPress={() => setShowEndDatePicker(true)}
                className='flex-1 rounded-lg border border-neutral-300 bg-white px-4 py-3 dark:border-neutral-600 dark:bg-neutral-700'
              >
                <Medium className='text-center text-neutral-800 dark:text-neutral-200'>{formatDate(endDate)}</Medium>
              </TouchableOpacity>
            </TouchableOpacity>
            {showEndDatePicker && (
              <DateTimePicker
                value={endDate}
                mode='date'
                display='spinner'
                onChange={(event, date) => {
                  if (date) {
                    setEndDate(date)
                    setShowEndDatePicker(false)
                  }
                }}
              />
            )}
          </View>

          {/* Bottom Padding */}
          <View className='h-6' />
        </View>
      </ScrollView>
    </View>
  )
}
