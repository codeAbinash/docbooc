import ArrowRightDoubleIcon from '@assets/icons/hugeicons/ArrowRightDoubleIcon'
import Calendar01Icon from '@assets/icons/hugeicons/Calendar01Icon'
import { Medium, SemiBold } from '@utils/fonts'
import { useCallback, useEffect, useRef, useState } from 'react'
import { FlatList, TouchableOpacity, View } from 'react-native'

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
    day: dayNames[date.getDay()] as string,
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
  const flatListRef = useRef<FlatList>(null)

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
        <View style={{ width: containerWidth }} className='items-center  justify-center'>
          <View className=' flex-row items-end justify-center gap-2'>

            <SemiBold
              className=' text-center text-3xl text-neutral-900 dark:text-white'
              style={{ opacity: isActive ? 1 : 0.3 }}
            >
              {dateInfo.date}
            </SemiBold>
            <Medium
              className='text-center text-base text-neutral-600 pb-1 dark:text-neutral-400'
              style={{ opacity: isActive ? 1 : 0.4 }}
            >
              {monthNames[dateInfo.month]}
            </Medium>
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

  // <SemiBold className='text-base text-neutral-900 dark:text-white'>{formatDateDisplay(currentDate)}</SemiBold>

  const currentDate = getDateInfo(currentIndex)

  const formatDateDisplay = (dateInfo: typeof currentDate) => {
    const dayShort = dateInfo.day.slice(0, 3)
    const monthShort = (monthNames[dateInfo.month] ?? 'Jan').slice(0, 3)
    return `${dayShort}, ${dateInfo.date} ${monthShort}`
  }

  return (
    <View className='border-b  border-neutral-300 px-6 pt-4 pb-4 dark:border-neutral-600'>
      

      {/* Date Carousel and Quick Select Buttons in One Row */}
      <View className='flex-row items-center gap-3'>
       
        <TouchableOpacity  className='rounded-lg pl-1'>
          <Calendar01Icon
            size={25}
            
            strokeWidth={2}
          />
        </TouchableOpacity>

        {/* Carousel */}
        <View className='flex-1' onLayout={(e) => setContainerWidth(e.nativeEvent.layout.width)}>
          {containerWidth > 0 && (
            <FlatList
              ref={flatListRef}
              
              data={Array.from({ length: 90 }, (_, i) => i)}
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

        {/* Right Arrow
        <TouchableOpacity onPress={() => scrollToIndex(1)} className='rounded-lg p-2'>
          <ArrowRightDoubleIcon size={18} color='#3b82f6' strokeWidth={2.5} />
        </TouchableOpacity> */}

        {/* Quick Select Buttons */}
        <View className='flex-row gap-2'>
          <TouchableOpacity
            onPress={() => scrollToIndex(0 - currentIndex)}
            className='rounded-lg border border-neutral-300 px-3 py-2 dark:border-neutral-600'
          >
            <Medium className='text-xs text-neutral-700 dark:text-neutral-300'>Today</Medium>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => scrollToIndex(1 - currentIndex)}
            className='rounded-lg border border-neutral-300 px-3 py-2 dark:border-neutral-600'
          >
            <Medium className='text-xs text-neutral-700 dark:text-neutral-300'>Tomorrow</Medium>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => scrollToIndex(2 - currentIndex)}
            className='rounded-lg border border-neutral-300 px-3 py-2 dark:border-neutral-600'
          >
            <Medium className='text-xs text-neutral-700 dark:text-neutral-300'>Day After</Medium>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  )
}
