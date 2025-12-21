import ArrowRightDoubleIcon from '@assets/icons/hugeicons/ArrowRightDoubleIcon'
import Calendar01Icon from '@assets/icons/hugeicons/Calendar01Icon'
import { Medium, SemiBold } from '@utils/fonts'
import { useCallback, useEffect, useRef, useState } from 'react'
import { FlatList, TouchableOpacity, View, Modal, ScrollView, Animated, Easing } from 'react-native'

const monthNames = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
]
const dayNames = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']

const getDateInfo = (index: number) => {
  const date = new Date()
  date.setDate(date.getDate() + index)
  return {
    date: date.getDate().toString().padStart(2, '0'),
    day: dayNames[date.getDay()],
    month: date.getMonth(),
    year: date.getFullYear(),
  }
}

interface DateCardContainerProps {
  onDateChange?: (date: string) => void
}

export function DateCardContainer({ onDateChange }: DateCardContainerProps) {
  const [currentIndex, setCurrentIndex] = useState(1)
  const [containerWidth, setContainerWidth] = useState(0)
  const [showMonthDropdown, setShowMonthDropdown] = useState(false)
  const [showYearDropdown, setShowYearDropdown] = useState(false)
  const flatListRef = useRef<FlatList>(null)
  const slideAnim = useRef(new Animated.Value(400)).current
  const yearSlideAnim = useRef(new Animated.Value(400)).current

  const currentYear = new Date().getFullYear()
  const upcomingYears = [currentYear, currentYear + 1]

  useEffect(() => {
    if (onDateChange) {
      const dateInfo = getDateInfo(currentIndex)
      const date = new Date(dateInfo.year, dateInfo.month, parseInt(dateInfo.date))
      const isoDate = date.toISOString().split('T')[0]
      console.log(isoDate)
      if (isoDate) {
        console.log('DateCardContainer: Calling onDateChange with:', isoDate)
        onDateChange(isoDate)
      }
    }
  }, [currentIndex])

  useEffect(() => {
    if (showMonthDropdown) {
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 400,
        easing: Easing.out(Easing.cubic),
        useNativeDriver: true,
      }).start()
    } else {
      Animated.timing(slideAnim, {
        toValue: 400,
        duration: 300,
        easing: Easing.in(Easing.cubic),
        useNativeDriver: true,
      }).start()
    }
  }, [showMonthDropdown])

  useEffect(() => {
    if (showYearDropdown) {
      Animated.timing(yearSlideAnim, {
        toValue: 0,
        duration: 400,
        easing: Easing.out(Easing.cubic),
        useNativeDriver: true,
      }).start()
    } else {
      Animated.timing(yearSlideAnim, {
        toValue: 400,
        duration: 300,
        easing: Easing.in(Easing.cubic),
        useNativeDriver: true,
      }).start()
    }
  }, [showYearDropdown])

  const handleScroll = useCallback(
    (event: any) => {
      if (!containerWidth) return
      const index = Math.round(event.nativeEvent.contentOffset.x / containerWidth)
      if (index !== currentIndex) {
        setCurrentIndex(index)
      }
    },
    [containerWidth, currentIndex],
  )

  const scrollToIndex = useCallback(
    (offset: number) => {
      if (flatListRef.current && containerWidth > 0) {
        const newIndex = Math.max(0, Math.min(364, currentIndex + offset))
        flatListRef.current.scrollToIndex({ index: newIndex, animated: true })
      }
    },
    [currentIndex, containerWidth],
  )

  const renderItem = useCallback(
    ({ item, index }: { item: number; index: number }) => {
      const dateInfo = getDateInfo(item)
      const isActive = currentIndex === index

      return (
        <View style={{ width: containerWidth }} className='items-center justify-center'>
          <View className='gap-2'>
            <Medium
              className='text-center text-sm text-neutral-600 dark:text-neutral-400'
              style={{ opacity: isActive ? 1 : 0.4 }}
            >
              {dateInfo.day}
            </Medium>
            <SemiBold
              className='text-center text-5xl text-neutral-900 dark:text-white'
              style={{ opacity: isActive ? 1 : 0.3 }}
            >
              {dateInfo.date}
            </SemiBold>
          </View>
        </View>
      )
    },
    [containerWidth, currentIndex],
  )

  const getItemLayout = useCallback(
    (data: any, index: number) => ({
      length: containerWidth,
      offset: containerWidth * index,
      index,
    }),
    [containerWidth],
  )

  const currentDate = getDateInfo(currentIndex)

  const isMonthDisabled = (monthIndex: number): boolean => {
    const today = new Date()
    const currentMonth = today.getMonth()
    const currentYear = today.getFullYear()
    const selectedYear = currentDate.year

    // If year is in the past, disable all months
    if (selectedYear < currentYear) return true

    // If year is current, disable past months
    if (selectedYear === currentYear && monthIndex < currentMonth) return true

    return false
  }

  const handleMonthSelect = (monthIndex: number) => {
    const currentDateInfo = getDateInfo(currentIndex)
    const currentDateObj = new Date(currentDateInfo.year, currentDateInfo.month, parseInt(currentDateInfo.date))
    const targetDate = new Date(currentDateObj.getFullYear(), monthIndex, 1)

    const today = new Date()
    today.setHours(0, 0, 0, 0)

    const diffTime = targetDate.getTime() - today.getTime()
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))

    if (diffDays >= 0 && diffDays < 365) {
      scrollToIndex(diffDays - currentIndex)
    }

    setShowMonthDropdown(false)
  }

  const handleYearSelect = (year: number) => {
    const today = new Date()
    today.setHours(0, 0, 0, 0)

    const currentYear = today.getFullYear()
    const currentMonth = today.getMonth()
    const currentDay = today.getDate()

    // If selecting current year, use current month. Otherwise, use January (month 0)
    const targetMonth = year === currentYear ? currentMonth : 0

    // If selecting current year and current month, use tomorrow or today. Otherwise, use 1st of the month
    let targetDay = 1
    if (year === currentYear && targetMonth === currentMonth) {
      targetDay = currentDay + 1 // Next day to ensure it's in the future
    }

    const targetDate = new Date(year, targetMonth, targetDay)

    // Recalculate diff to ensure it's valid
    const diffTime = targetDate.getTime() - today.getTime()
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))

    if (diffDays >= 0 && diffDays < 730) {
      scrollToIndex(diffDays - currentIndex)
    }

    setShowYearDropdown(false)
  }

  return (
    <View className=''>
      {/* Date Picker Card */}
      <View className=''>
        {/* Header Section */}
        <View className=' gap-3 px-2 pb-2'>
          

          {/* Date Carousel */}
          <View className=' flex-row items-center justify-between'>
            <TouchableOpacity onPress={() => scrollToIndex(-1)} className='rounded-lg p-2'>
              <ArrowRightDoubleIcon
                size={18}
                color='#3b82f6'
                strokeWidth={2.5}
                style={{ transform: [{ rotateY: '180deg' }] }}
              />
            </TouchableOpacity>
            <View className='flex-1' onLayout={(e) => setContainerWidth(e.nativeEvent.layout.width)}>
              {containerWidth > 0 && (
                <FlatList
                  ref={flatListRef}
                  data={Array.from({ length: 365 }, (_, i) => i)}
                  renderItem={renderItem}
                  keyExtractor={(item) => item.toString()}
                  horizontal
                  pagingEnabled
                  showsHorizontalScrollIndicator={false}
                  onScroll={handleScroll}
                  scrollEventThrottle={16}
                  decelerationRate={0.7}
                  getItemLayout={getItemLayout}
                  initialNumToRender={3}
                  maxToRenderPerBatch={5}
                  windowSize={5}
                  removeClippedSubviews={true}
                  initialScrollIndex={1}
                  onScrollToIndexFailed={() => {}}
                />
              )}
            </View>
            <TouchableOpacity onPress={() => scrollToIndex(1)} className='rounded-lg p-2'>
              <ArrowRightDoubleIcon size={18} color='#3b82f6' strokeWidth={2.5} />
            </TouchableOpacity>
          </View>
        </View>

        {/* Info Grid - Day, Month and Year in one row */}
        <View className=' flex-row gap-3 px-1 pb-4'>
          {/* <TouchableOpacity
            className='flex-1 gap-1 rounded-lg bg-neutral-50 p-3 dark:bg-neutral-700'
            activeOpacity={0.7}
            disabled
          >
            <Medium className='text-xs font-semibold text-neutral-700 dark:text-neutral-400'>Day</Medium>
            <SemiBold className='text-sm text-neutral-900 dark:text-neutral-200'>
              {currentDate && currentDate.day}
            </SemiBold>
          </TouchableOpacity> */}

          <TouchableOpacity
            onPress={() => setShowMonthDropdown(true)}
            className='flex-1 gap-1 rounded-lg bg-blue-50 p-3 dark:bg-blue-900/20'
            activeOpacity={0.7}
          >
            <Medium className='text-xs font-semibold text-blue-700 dark:text-blue-400'>Month</Medium>
            <SemiBold className='text-sm text-blue-900 dark:text-blue-200'>
              {currentDate && monthNames[currentDate.month]?.slice(0, 3)}
            </SemiBold>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => setShowYearDropdown(true)}
            className='flex-1 gap-1 rounded-lg bg-emerald-50 p-3 dark:bg-emerald-900/20'
            activeOpacity={0.7}
          >
            <Medium className='text-xs font-semibold text-emerald-700 dark:text-emerald-400'>Year</Medium>
            <SemiBold className='text-sm text-emerald-900 dark:text-emerald-200'>{currentDate.year}</SemiBold>
          </TouchableOpacity>
        </View>

        {/* Modals */}
        <Modal
          visible={showMonthDropdown}
          transparent
          animationType='none'
          onRequestClose={() => setShowMonthDropdown(false)}
        >
          <TouchableOpacity
            activeOpacity={1}
            onPress={() => setShowMonthDropdown(false)}
            className='flex-1 justify-end bg-black/50'
          >
            <Animated.View
              style={{
                transform: [{ translateY: slideAnim }],
              }}
              className='gap-5 rounded-t-3xl bg-white p-6 dark:bg-neutral-800'
            >
              <View className='items-center gap-2'>
                <View className='h-1.5 w-12 rounded-full bg-neutral-300 dark:bg-neutral-600' />
                <SemiBold className='text-2xl text-neutral-900 dark:text-white'>Select Month</SemiBold>
              </View>

              <View className='flex-row flex-wrap gap-2'>
                {monthNames.map((month, index) => {
                  const disabled = isMonthDisabled(index)
                  return (
                    <TouchableOpacity
                      key={index}
                      onPress={() => {
                        if (!disabled) handleMonthSelect(index)
                      }}
                      disabled={disabled}
                      className={`min-w-20 flex-1 overflow-hidden rounded-lg py-3 ${
                        disabled
                          ? 'bg-neutral-200 dark:bg-neutral-600'
                          : currentDate.month === index
                            ? 'bg-blue-500 dark:bg-blue-600'
                            : 'bg-neutral-100 dark:bg-neutral-700'
                      }`}
                    >
                      <SemiBold
                        className={`text-center text-xs font-bold ${
                          disabled
                            ? 'text-neutral-400 dark:text-neutral-500'
                            : currentDate.month === index
                              ? 'text-white dark:text-white'
                              : 'text-neutral-600 dark:text-neutral-400'
                        }`}
                      >
                        {month.slice(0, 3).toUpperCase()}
                      </SemiBold>
                    </TouchableOpacity>
                  )
                })}
              </View>
            </Animated.View>
          </TouchableOpacity>
        </Modal>

        <Modal
          visible={showYearDropdown}
          transparent
          animationType='none'
          onRequestClose={() => setShowYearDropdown(false)}
        >
          <TouchableOpacity
            activeOpacity={1}
            onPress={() => setShowYearDropdown(false)}
            className='flex-1 justify-end bg-black/50'
          >
            <Animated.View
              style={{
                transform: [{ translateY: yearSlideAnim }],
              }}
              className='gap-5 rounded-t-3xl bg-white p-6 dark:bg-neutral-800'
            >
              <View className='items-center gap-2'>
                <View className='h-1.5 w-12 rounded-full bg-neutral-300 dark:bg-neutral-600' />
                <SemiBold className='text-2xl text-neutral-900 dark:text-white'>Select Year</SemiBold>
              </View>

              <View className='flex-row gap-2'>
                {upcomingYears.map((year) => (
                  <TouchableOpacity
                    key={year}
                    onPress={() => {
                      handleYearSelect(year)
                    }}
                    className={`flex-1 overflow-hidden rounded-lg py-3 ${
                      currentDate.year === year
                        ? 'bg-emerald-500 dark:bg-emerald-600'
                        : 'bg-neutral-100 dark:bg-neutral-700'
                    }`}
                  >
                    <SemiBold
                      className={`text-center text-sm font-bold ${
                        currentDate.year === year
                          ? 'text-white dark:text-white'
                          : 'text-neutral-600 dark:text-neutral-400'
                      }`}
                    >
                      {year}
                    </SemiBold>
                  </TouchableOpacity>
                ))}
              </View>
            </Animated.View>
          </TouchableOpacity>
        </Modal>
      </View>
    </View>
  )
}
