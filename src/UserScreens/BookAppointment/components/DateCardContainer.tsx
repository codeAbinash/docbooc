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
        <View className='py-5' onLayout={(e) => setContainerWidth(e.nativeEvent.layout.width)}>
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

        {/* Navigation */}
        <View className='flex-row items-center justify-between border-t border-neutral-200 p-2 dark:border-neutral-700'>
          <TouchableOpacity onPress={() => scrollToIndex(-30)} className='p-2'>
            <ArrowRightDoubleIcon
              size={24}
              color='#3b82f6'
              strokeWidth={2}
              style={{ transform: [{ rotateY: '180deg' }] }}
            />
          </TouchableOpacity>

          <Medium className='text-center text-base text-neutral-700 dark:text-neutral-300'>
            {`${monthNames[currentDate.month]} ${currentDate.year}`}
          </Medium>

          <TouchableOpacity onPress={() => scrollToIndex(30)} className='p-2'>
            <ArrowRightDoubleIcon size={24} color='#3b82f6' strokeWidth={2} />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  )
}
