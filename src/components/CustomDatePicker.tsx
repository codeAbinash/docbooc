import { View, Text, TouchableOpacity, Modal, FlatList } from 'react-native'
import { useState, useEffect } from 'react'
import Colors from '@utils/colors'
import { SemiBold, Regular } from '@utils/fonts'
import Cancel01Icon from '@assets/icons/hugeicons/Cancel01Icon'
import ArrowLeft01Icon from '@assets/icons/hugeicons/ArrowLeft01Icon'
import ArrowRightDoubleIcon from '@assets/icons/hugeicons/ArrowRightDoubleIcon'
import Menu02Icon from '@assets/icons/hugeicons/Menu02Icon'

type CustomDatePickerProps = {
  visible: boolean
  onClose: () => void
  onDateTimeChange: (date: Date) => void
  initialDate?: Date
}

export const CustomDatePicker = ({
  visible,
  onClose,
  onDateTimeChange,
  initialDate = new Date(),
}: CustomDatePickerProps) => {
  const [currentDate, setCurrentDate] = useState(new Date(initialDate))
  const [selectedDate, setSelectedDate] = useState(new Date(initialDate))
  const [selectedHour, setSelectedHour] = useState(initialDate.getHours())
  const [selectedMinute, setSelectedMinute] = useState(initialDate.getMinutes())
  const [showTimeDropdown, setShowTimeDropdown] = useState(false)
  const [quickSelectMode, setQuickSelectMode] = useState<'today' | 'tomorrow' | 'nextweek' | null>('today')

  useEffect(() => {
    const tomorrow = new Date()
    tomorrow.setDate(tomorrow.getDate() + 1)
    const dayAfterTomorrow = new Date()
    dayAfterTomorrow.setDate(dayAfterTomorrow.getDate() + 2)

    if (isSameDay(selectedDate, tomorrow)) {
      setQuickSelectMode('tomorrow')
    } else if (isSameDay(selectedDate, dayAfterTomorrow)) {
      setQuickSelectMode('nextweek')
    } else {
      setQuickSelectMode(null)
    }
  }, [selectedDate])

  const getDaysInMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate()
  }

  const getFirstDayOfMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth(), 1).getDay()
  }

  const isToday = (date: Date) => {
    const today = new Date()
    return (
      date.getDate() === today.getDate() &&
      date.getMonth() === today.getMonth() &&
      date.getFullYear() === today.getFullYear()
    )
  }

  const isSameDay = (date1: Date, date2: Date) => {
    return (
      date1.getDate() === date2.getDate() &&
      date1.getMonth() === date2.getMonth() &&
      date1.getFullYear() === date2.getFullYear()
    )
  }

  const getDayName = (index: number) => {
    const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
    return days[index]
  }

  const generateCalendarDays = () => {
    const daysInMonth = getDaysInMonth(currentDate)
    const firstDay = getFirstDayOfMonth(currentDate)
    const days = []

    for (let i = 0; i < firstDay; i++) {
      days.push(null)
    }

    for (let i = 1; i <= daysInMonth; i++) {
      days.push(i)
    }

    return days
  }

  const handlePrevMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1))
  }

  const handleNextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1))
  }

  const handleDateSelect = (day: number) => {
    const newDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), day)
    setSelectedDate(newDate)
    setQuickSelectMode(null)
  }

  const handleToday = () => {
    const today = new Date()
    setCurrentDate(today)
    setSelectedDate(today)
    setQuickSelectMode('today')
    handleSetDateTime(today)
  }

  const handleTomorrow = () => {
    const tomorrow = new Date()
    tomorrow.setDate(tomorrow.getDate() + 1)
    setCurrentDate(tomorrow)
    setSelectedDate(tomorrow)
    setQuickSelectMode('tomorrow')
    handleSetDateTime(tomorrow)
  }

  const handleNextWeek = () => {
    const dayAfterTomorrow = new Date()
    dayAfterTomorrow.setDate(dayAfterTomorrow.getDate() + 2)
    setCurrentDate(dayAfterTomorrow)
    setSelectedDate(dayAfterTomorrow)
    setQuickSelectMode('nextweek')
    handleSetDateTime(dayAfterTomorrow)
  }

  const handleSetDateTime = (dateToSet?: Date) => {
    const finalDate = dateToSet || new Date(selectedDate)
    finalDate.setHours(selectedHour)
    finalDate.setMinutes(selectedMinute)
    onDateTimeChange(finalDate)
    onClose()
  }

  const generateTimeOptions = () => {
    const times = []
    for (let i = 0; i < 24; i++) {
      for (let j = 0; j < 60; j += 15) {
        const hour = String(i).padStart(2, '0')
        const minute = String(j).padStart(2, '0')
        const period = i < 12 ? 'AM' : 'PM'
        const displayHour = i === 0 ? 12 : i > 12 ? i - 12 : i
        times.push({
          label: `${String(displayHour).padStart(2, '0')}:${minute} ${period}`,
          hour: i,
          minute: j,
        })
      }
    }
    return times
  }

  const monthName = currentDate.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })
  const calendarDays = generateCalendarDays()
  const timeOptions = generateTimeOptions()
  const currentTimeLabel = `${String(selectedHour).padStart(2, '0')}:${String(selectedMinute).padStart(2, '0')} ${selectedHour < 12 ? 'AM' : 'PM'}`

  return (
    <Modal visible={visible} transparent animationType='fade' hardwareAccelerated statusBarTranslucent>
      <View className='flex-1 items-center justify-center bg-black/50'>
        <View className='w-5/6 rounded-3xl bg-white px-6 py-6'>
          {/* Header */}
          <View className='mb-6 flex-row items-center justify-between'>
            <SemiBold style={{ fontSize: 20, color: '#000' }}>Set Date</SemiBold>
            <TouchableOpacity onPress={onClose}>
              <Cancel01Icon color='#000' size={24} strokeWidth={2} />
            </TouchableOpacity>
          </View>

          {/* Quick Select Buttons */}
          <View className='mb-6 flex-row gap-3'>
            <TouchableOpacity
              onPress={handleTomorrow}
              className={`flex-1 items-center rounded-lg py-2 ${quickSelectMode === 'tomorrow' ? 'border-2 border-blue-400 bg-blue-100' : 'bg-neutral-100'}`}
            >
              <Regular style={{ fontSize: 14, color: quickSelectMode === 'tomorrow' ? '#5B7FFF' : '#999' }}>
                Tomorrow
              </Regular>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={handleNextWeek}
              className={`flex-1 items-center rounded-lg py-2 ${quickSelectMode === 'nextweek' ? 'border-2 border-blue-400 bg-blue-100' : 'bg-neutral-100'}`}
            >
              <Regular style={{ fontSize: 14, color: quickSelectMode === 'nextweek' ? '#5B7FFF' : '#999' }}>
                Day After Tomorrow
              </Regular>
            </TouchableOpacity>
          </View>

          {/* Month Navigation */}
          <View className='mb-6 flex-row items-center justify-between'>
            <TouchableOpacity onPress={handlePrevMonth} className='p-1'>
              <ArrowLeft01Icon color='#999' size={24} strokeWidth={2} />
            </TouchableOpacity>
            <SemiBold style={{ fontSize: 18, color: '#000' }}>{monthName}</SemiBold>
            <TouchableOpacity onPress={handleNextMonth} className='p-1'>
              <ArrowRightDoubleIcon color='#999' size={24} strokeWidth={2} />
            </TouchableOpacity>
          </View>

          {/* Calendar Days Header */}
          <View className='mb-3 flex-row'>
            {['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su'].map((day) => (
              <View key={day} className='flex-1 items-center'>
                <Regular style={{ fontSize: 14, color: '#999' }}>{day}</Regular>
              </View>
            ))}
          </View>

          {/* Calendar Grid */}
          <View className='mb-6'>
            {Array.from({ length: Math.ceil(calendarDays.length / 7) }).map((_, weekIndex) => (
              <View key={weekIndex} className='mb-3 flex-row'>
                {calendarDays.slice(weekIndex * 7, (weekIndex + 1) * 7).map((day, dayIndex) => (
                  <View key={`${weekIndex}-${dayIndex}`} className='flex-1 items-center'>
                    {day ? (
                      <TouchableOpacity
                        onPress={() => handleDateSelect(day)}
                        className={`h-10 w-10 items-center justify-center rounded-lg ${
                          isSameDay(selectedDate, new Date(currentDate.getFullYear(), currentDate.getMonth(), day))
                            ? 'bg-blue-500'
                            : ''
                        }`}
                      >
                        <Regular
                          style={{
                            fontSize: 14,
                            color: isSameDay(
                              selectedDate,
                              new Date(currentDate.getFullYear(), currentDate.getMonth(), day),
                            )
                              ? 'white'
                              : '#000',
                          }}
                        >
                          {day}
                        </Regular>
                      </TouchableOpacity>
                    ) : (
                      <View className='h-10 w-10' />
                    )}
                  </View>
                ))}
              </View>
            ))}
          </View>

          {/* Set Date Button */}
          <TouchableOpacity onPress={() => handleSetDateTime()} className='items-center rounded-full bg-accent py-4'>
            <SemiBold style={{ fontSize: 16, color: 'white' }}>Set Date ✓</SemiBold>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  )
}
