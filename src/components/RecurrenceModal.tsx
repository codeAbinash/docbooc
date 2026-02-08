import { useState } from 'react'
import { Modal, View, TouchableOpacity, ScrollView, TextInput } from 'react-native'
import { SemiBold, Medium } from '@utils/fonts'
import Cancel01Icon from '@hugeicons/Cancel01Icon'
import Tick01Icon from '@hugeicons/Tick01Icon'
import DateTimePicker from '@react-native-community/datetimepicker'
import HybridHead from '@components/HybridHead'

type RecurrenceType = 'never' | 'on' | 'after'

type RecurrenceModalProps = {
  visible: boolean
  onClose: () => void
  onConfirm: (data: RecurrenceData) => void
}

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

export default function RecurrenceModal({ visible, onClose, onConfirm }: RecurrenceModalProps) {
  const [startDate, setStartDate] = useState(new Date())
  const [startTime, setStartTime] = useState(new Date())
  const [endTime, setEndTime] = useState(new Date(Date.now() + 60 * 60 * 1000))
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
    onConfirm(data)
    onClose()
  }

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', { month: 'long', day: 'numeric' })
  }

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true })
  }

  return (
    <Modal visible={visible} transparent animationType='fade'>
      <View className='flex-1 bg-white dark:bg-neutral-800'>
        <HybridHead
          title='Recurrence'
          showBackButton
          onBackPress={onClose}
          rightElement={
            <TouchableOpacity onPress={handleConfirm} className='p-1'>
              <Tick01Icon size={24} color='#3b82f6' strokeWidth={1.5} />
            </TouchableOpacity>
          }
        />

        <ScrollView className='flex-1 p-5' contentContainerClassName='gap-6'>
          <View>
            <View className='mb-6 flex-row gap-3'>
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

            <View className='mb-6 flex-row gap-3'>
              <View className='flex-1'>
                <Medium className='mb-2 text-xs text-neutral-500 dark:text-neutral-400'>Max Bookings</Medium>
                <View className='rounded-lg border border-neutral-300 bg-white px-4 py-3 dark:border-neutral-600 dark:bg-neutral-700'>
                  <TextInput
                    value={maxBookings}
                    onChangeText={setMaxBookings}
                    keyboardType='number-pad'
                    maxLength={3}
                    className='text-center text-lg text-neutral-800 dark:text-neutral-200'
                  />
                </View>
              </View>
              <View className='flex-1'>
                <Medium className='mb-2 text-xs text-neutral-500 dark:text-neutral-400'>Booking Window</Medium>
                <View className='rounded-lg border border-neutral-300 bg-white px-4 py-3 dark:border-neutral-600 dark:bg-neutral-700'>
                  <TextInput
                    value={bookingWindowDays}
                    onChangeText={setBookingWindowDays}
                    keyboardType='number-pad'
                    maxLength={3}
                    className='text-center text-lg text-neutral-800 dark:text-neutral-200'
                  />
                </View>
              </View>
            </View>

            <View className='mb-6'>
              <Medium className='mb-3 text-lg text-neutral-800 dark:text-neutral-200'>Starts On</Medium>
              <TouchableOpacity
                onPress={() => setShowStartDatePicker(true)}
                className='rounded-2xl border border-neutral-300 bg-white px-4 py-4 dark:border-neutral-600 dark:bg-neutral-700'
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

            <View>
              <SemiBold className='mb-3 text-lg text-neutral-800 dark:text-neutral-200'>Ends On</SemiBold>

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

              <TouchableOpacity onPress={() => setEndType('after')} className='flex-row items-center gap-3'>
                <View
                  className={`size-6 items-center justify-center rounded-full border-2 ${
                    endType === 'after' ? 'border-green-700 bg-green-700' : 'border-neutral-400 dark:border-neutral-600'
                  }`}
                >
                  {endType === 'after' && <View className='size-2 rounded-full bg-white' />}
                </View>
                <View className='flex-1 flex-row items-center gap-2'>
                  <View className='w-1/4 rounded-lg border border-neutral-300 bg-white px-3 py-3 dark:border-neutral-600 dark:bg-neutral-700'>
                    <Medium className='text-center text-neutral-800 dark:text-neutral-200'>{occurrences}</Medium>
                  </View>
                  <Medium className='text-neutral-800 dark:text-neutral-200'>occurrences</Medium>
                </View>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </View>
    </Modal>
  )
}
