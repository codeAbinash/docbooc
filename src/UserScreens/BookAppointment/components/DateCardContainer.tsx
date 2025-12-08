import ArrowRightDoubleIcon from '@assets/icons/hugeicons/ArrowRightDoubleIcon'
import Calendar01Icon from '@assets/icons/hugeicons/Calendar01Icon'
import { Medium, SemiBold } from '@utils/fonts'
import { useCallback, useEffect, useRef, useState } from 'react'
import { FlatList, TouchableOpacity, View, Modal, ScrollView } from 'react-native'

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
const dayNames = ['Sun', 'Mon', 'Tues', 'Wednes', 'Thurs', 'Fri', 'Sat']

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
  const flatListRef = useRef<FlatList>(null)

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
              {dateInfo.day}day
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

  return (
    <View className='gap-4'>
      <View className='overflow-hidden rounded-lg border border-neutral-200 bg-white dark:border-neutral-700 dark:bg-zinc-900'>
        {/* Header */}
        <View className='border-b border-neutral-200 p-2 dark:border-neutral-700'>
          <View className='flex-row items-center gap-3'>
            <View className='rounded-md bg-blue-100/50 p-2 dark:bg-blue-900/20'>
              <Calendar01Icon size={24} color='#3b82f6' strokeWidth={2} />
            </View>
            <SemiBold className='flex-1 text-lg text-neutral-800 dark:text-neutral-200'>
              Select Appointment Date
            </SemiBold>
          </View>
        </View>

        {/* Date Cards */}
        <View className='flex-row items-center justify-between px-2 py-5'>
          <TouchableOpacity onPress={() => scrollToIndex(-1)} className='p-2'>
            <ArrowRightDoubleIcon
              size={24}
              color='#3b82f6'
              strokeWidth={2}
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
          <TouchableOpacity onPress={() => scrollToIndex(1)} className='p-2'>
            <ArrowRightDoubleIcon size={24} color='#3b82f6' strokeWidth={2} />
          </TouchableOpacity>
        </View>

        {/* Navigation */}
        <View className='border-t border-neutral-200 p-2 dark:border-neutral-700'>
          <TouchableOpacity
            onPress={() => setShowMonthDropdown(true)}
            className='flex-row items-center justify-between rounded-lg border-2 border-neutral-700 bg-gradient-to-r from-blue-50 to-blue-100 px-3 py-2.5 dark:border-blue-500 dark:from-blue-900/30 dark:to-blue-900/20'
            activeOpacity={0.7}
          >
            <View className='flex-1 items-center'>
              <Medium className='text-base text-neutral-700 dark:text-neutral-300'>
                {`${monthNames[currentDate.month]} ${currentDate.year}`}
              </Medium>
            </View>
            <View className='ml-2'>
              <ArrowRightDoubleIcon
                size={20}
                color='#3b82f6'
                strokeWidth={2}
                style={{ transform: [{ rotateZ: '90deg' }] }}
              />
            </View>
          </TouchableOpacity>

          <Modal
            visible={showMonthDropdown}
            transparent
            animationType='fade'
            onRequestClose={() => setShowMonthDropdown(false)}
          >
            <TouchableOpacity
              activeOpacity={1}
              onPress={() => setShowMonthDropdown(false)}
              className='flex-1 justify-end bg-black/50'
            >
              <View className='rounded-t-3xl border-t border-neutral-200 bg-white p-4 dark:border-neutral-700 dark:bg-zinc-900'>
                <View className='mb-6 flex-row items-center justify-between'>
                  <SemiBold className='text-xl text-neutral-900 dark:text-white'>Select Month</SemiBold>
                  <TouchableOpacity onPress={() => setShowMonthDropdown(false)} className='rounded-full p-1'>
                    <View className='h-6 w-6 items-center justify-center'>
                      <ArrowRightDoubleIcon
                        size={20}
                        color='#6b7280'
                        strokeWidth={2}
                        style={{ transform: [{ rotateZ: '90deg' }] }}
                      />
                    </View>
                  </TouchableOpacity>
                </View>
                <ScrollView showsVerticalScrollIndicator={false} className='max-h-96'>
                  {monthNames.map((month, index) => (
                    <TouchableOpacity
                      key={index}
                      onPress={() => handleMonthSelect(index)}
                      className={`mb-2 flex-row items-center rounded-lg border-2 p-4 ${
                        currentDate.month === index
                          ? 'border-blue-500 bg-gradient-to-r from-blue-50 to-blue-100 dark:border-blue-400 dark:from-blue-900/40 dark:to-blue-900/20'
                          : 'border-neutral-200 bg-neutral-50 dark:border-neutral-700 dark:bg-neutral-800'
                      }`}
                    >
                      <Medium
                        className={`flex-1 font-semibold ${
                          currentDate.month === index
                            ? 'text-blue-700 dark:text-blue-300'
                            : 'text-neutral-700 dark:text-neutral-300'
                        }`}
                      >
                        {month}
                      </Medium>
                      {currentDate.month === index && (
                        <View className='ml-2 rounded-full bg-blue-500 p-1'>
                          <ArrowRightDoubleIcon
                            size={16}
                            color='white'
                            strokeWidth={2}
                            style={{ transform: [{ rotateZ: '180deg' }] }}
                          />
                        </View>
                      )}
                    </TouchableOpacity>
                  ))}
                </ScrollView>
              </View>
            </TouchableOpacity>
          </Modal>
        </View>
      </View>
    </View>
  )
}
