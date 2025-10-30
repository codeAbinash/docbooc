import { SemiBold, Medium } from '@utils/fonts'
import { memo, useState, useCallback, useRef } from 'react'
import { Modal, TouchableOpacity, View, ScrollView, NativeScrollEvent, NativeSyntheticEvent } from 'react-native'
import Time04Icon from '@assets/icons/hugeicons/Time04Icon'

export const formatTime = (date: Date) =>
  date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true })

const HOURS = Array.from({ length: 12 }, (_, i) => i + 1)
const MINUTES = Array.from({ length: 60 }, (_, i) => i)
const PERIODS = ['AM', 'PM'] as const
const ITEM_HEIGHT = 50

type CustomTimePickerProps = {
  isVisible: boolean
  onClose: () => void
  onSelectTime: (date: Date) => void
  currentTime: Date
}

const ScrollItem = memo(({ item, selected, onPress }: { item: number; selected: number; onPress: (v: number) => void }) => {
  const diff = Math.abs(selected - item)
  const cls = diff === 0 ? 'text-2xl text-accent' : diff <= 1 ? 'text-lg text-neutral-500' : 'text-base text-neutral-400'
  return (
    <TouchableOpacity onPress={() => onPress(item)} className='h-[50px] items-center justify-center'>
      <SemiBold className={cls}>{item.toString().padStart(2, '0')}</SemiBold>
    </TouchableOpacity>
  )
})

const ScrollPicker = memo(({ items, selected, onScroll, onPress, scrollRef, label, subtitle, onScrollEnd }: {
  items: number[]
  selected: number
  onScroll: (e: NativeSyntheticEvent<NativeScrollEvent>) => void
  onPress: (v: number) => void
  scrollRef: React.RefObject<ScrollView | null>
  label: string
  subtitle: string
  onScrollEnd?: (e: NativeSyntheticEvent<NativeScrollEvent>) => void
}) => (
  <View className='flex-1 rounded-2xl bg-white dark:bg-neutral-800'>
    <View className='border-b border-neutral-100 p-4 dark:border-neutral-700'>
      <View className='flex-row items-center gap-3'>
        <View className='rounded-lg bg-blue-100/50 p-2.5 dark:bg-blue-900/20'>
          <Time04Icon size={20} color='#3b82f6' strokeWidth={2} />
        </View>
        <View>
          <SemiBold className='text-lg text-neutral-800 dark:text-neutral-200'>{label}</SemiBold>
          <Medium className='text-xs text-neutral-500'>{subtitle}</Medium>
        </View>
      </View>
    </View>
    <View className='relative h-[200px]'>
      <View className='absolute inset-x-0 top-1/2 -mt-[25px] h-[50px] bg-accent/5 dark:bg-accent/10' />
      <View className='absolute inset-x-0 top-0 h-[75px] bg-gradient-to-b from-neutral-50 to-transparent dark:from-neutral-800/50' />
      <View className='absolute inset-x-0 bottom-0 h-[75px] bg-gradient-to-t from-neutral-50 to-transparent dark:from-neutral-800/50' />
      <ScrollView
        ref={scrollRef}
        className='h-full px-4'
        showsVerticalScrollIndicator={false}
        snapToInterval={ITEM_HEIGHT}
        decelerationRate={0.85}
        onScroll={onScroll}
        scrollEventThrottle={16}
        onMomentumScrollEnd={onScrollEnd}
        removeClippedSubviews
      >
        <View className='py-[75px]'>
          {items.map(i => <ScrollItem key={i} item={i} selected={selected} onPress={onPress} />)}
        </View>
      </ScrollView>
    </View>
  </View>
))

const CustomTimePicker = memo(({ isVisible, onClose, onSelectTime, currentTime }: CustomTimePickerProps) => {
  const [h, setH] = useState(currentTime.getHours() % 12 || 12)
  const [m, setM] = useState(currentTime.getMinutes())
  const [p, setP] = useState<'AM' | 'PM'>(currentTime.getHours() >= 12 ? 'PM' : 'AM')
  const hRef = useRef<ScrollView | null>(null)
  const mRef = useRef<ScrollView | null>(null)
  const scrollVelocity = useRef(0)

  const handleHScroll = useCallback((e: NativeSyntheticEvent<NativeScrollEvent>) => {
    const v = Math.round(e.nativeEvent.contentOffset.y / ITEM_HEIGHT)
    if (v >= 0 && v <= 11) setH(v + 1)
  }, [])

  const handleMScroll = useCallback((e: NativeSyntheticEvent<NativeScrollEvent>) => {
    scrollVelocity.current = Math.abs(e.nativeEvent.velocity?.y || 0)
    const v = Math.round(e.nativeEvent.contentOffset.y / ITEM_HEIGHT)
    if (v >= 0 && v <= 59) setM(v)
  }, [])

  const handleMScrollEnd = useCallback((e: NativeSyntheticEvent<NativeScrollEvent>) => {
    const v = Math.round(e.nativeEvent.contentOffset.y / ITEM_HEIGHT)
    
    // Snap to 15-min intervals if scrolling fast
    if (scrollVelocity.current > 0.4) {
      const snapped = Math.round(v / 15) * 15
      const clamped = Math.min(45, Math.max(0, snapped))
      setM(clamped)
      mRef.current?.scrollTo({ y: clamped * ITEM_HEIGHT, animated: true })
    }
    scrollVelocity.current = 0
  }, [])

  const handleConfirm = useCallback(() => {
    const hrs = p === 'PM' ? (h % 12) + 12 : h % 12
    const d = new Date(currentTime)
    d.setHours(hrs, m, 0, 0)
    onSelectTime(d)
    onClose()
  }, [h, m, p, currentTime, onSelectTime, onClose])

  const handleHPress = useCallback((v: number) => {
    setH(v)
    hRef.current?.scrollTo({ y: (v - 1) * ITEM_HEIGHT, animated: true })
  }, [])

  const handleMPress = useCallback((v: number) => {
    setM(v)
    mRef.current?.scrollTo({ y: v * ITEM_HEIGHT, animated: true })
  }, [])

  return (
    <Modal visible={isVisible} transparent animationType='slide' statusBarTranslucent>
      <View className='flex-1 justify-end bg-black/50'>
        <View className='bg-white dark:bg-neutral-900'>
          <View className='items-center pt-4'>
            <View className='h-1 w-12 rounded-full bg-neutral-200 dark:bg-neutral-700' />
          </View>

          <View className='items-center justify-center p-6'>
            <SemiBold className='text-5xl text-neutral-800 dark:text-white'>
              {h.toString().padStart(2, '0')}:{m.toString().padStart(2, '0')}
            </SemiBold>
            <SemiBold className='mt-1 text-2xl text-accent'>{p}</SemiBold>
          </View>

          <View className='px-4 pb-4'>
            <View className='flex-row gap-4'>
              <ScrollPicker items={HOURS} selected={h} onScroll={handleHScroll} onPress={handleHPress} scrollRef={hRef} label='Hour' subtitle='12-hour format' />
              <ScrollPicker items={MINUTES} selected={m} onScroll={handleMScroll} onPress={handleMPress} scrollRef={mRef} label='Minute' subtitle='00-59' onScrollEnd={handleMScrollEnd} />
            </View>

            <View className='mt-4 flex-row justify-center gap-2'>
              {PERIODS.map(pd => (
                <TouchableOpacity
                  key={pd}
                  onPress={() => setP(pd)}
                  className={`rounded-xl px-6 py-3 ${p === pd ? 'bg-accent' : 'bg-neutral-100 dark:bg-neutral-800'}`}
                >
                  <SemiBold className={p === pd ? 'text-white' : 'text-neutral-600 dark:text-neutral-400'}>{pd}</SemiBold>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          <View className='flex-row gap-4 p-4 pb-10 pt-2'>
            <TouchableOpacity onPress={onClose} className='flex-1 rounded-2xl border border-neutral-200 py-4 dark:border-neutral-700'>
              <Medium className='text-center text-neutral-600 dark:text-neutral-400'>Cancel</Medium>
            </TouchableOpacity>
            <TouchableOpacity onPress={handleConfirm} className='flex-1 rounded-2xl bg-accent py-4'>
              <SemiBold className='text-center text-white'>Set Time</SemiBold>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  )
})

export default CustomTimePicker