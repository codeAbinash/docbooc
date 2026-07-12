import { SemiBold } from '@utils/fonts'
import React, { memo, useCallback } from 'react'
import { Dimensions, Pressable, StyleSheet, View } from 'react-native'
import Animated, {
  Extrapolate,
  interpolate,
  runOnJS,
  useAnimatedScrollHandler,
  useAnimatedStyle,
  useSharedValue,
  type SharedValue,
} from 'react-native-reanimated'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { PaddingTop } from './SafePadding'

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window')

type PageCarouselProps = {
  pages?: React.ReactNode[]
  components?: React.ReactNode[]
  onPageChange?: (index: number) => void
  showDots?: boolean
  onSkip?: () => void
  carouselHeightRatio?: number
  showSkip?: boolean
}

// Memoized Dot component to prevent unnecessary re-renders
const Dot = memo(
  ({ index, scrollX, isActive }: { index: number; scrollX: SharedValue<number>; isActive: boolean }) => {
    const animatedStyle = useAnimatedStyle(() => {
      const scale = interpolate(
        scrollX.value,
        [(index - 1) * SCREEN_WIDTH, index * SCREEN_WIDTH, (index + 1) * SCREEN_WIDTH],
        [0.6, 1.2, 0.6],
        Extrapolate.CLAMP,
      )

      return {
        transform: [{ scale }],
      }
    }, [index])

    return <Animated.View style={[styles.dot, animatedStyle, { backgroundColor: isActive ? '#3B82F6' : '#9CA3AF' }]} />
  },
)

Dot.displayName = 'Dot'

function PageCarousel({
  pages,
  components,
  onPageChange,
  showDots = true,
  onSkip,
  carouselHeightRatio = 0.5,
  showSkip = true,
}: PageCarouselProps) {
  const insets = useSafeAreaInsets()
  const scrollX = useSharedValue(0)
  const [currentPage, setCurrentPage] = React.useState(0)
  const sheetHeight = (SCREEN_HEIGHT - insets.top) * carouselHeightRatio

  const displayItems = components || pages || []

  const handlePageChange = useCallback(
    (pageIndex: number) => {
      setCurrentPage(pageIndex)
      onPageChange?.(pageIndex)
    },
    [onPageChange],
  )

  const scrollHandler = useAnimatedScrollHandler({
    onScroll: (event) => {
      scrollX.value = event.contentOffset.x
    },
    onMomentumEnd: (event) => {
      const pageIndex = Math.round(event.contentOffset.x / SCREEN_WIDTH)
      runOnJS(handlePageChange)(pageIndex)
    },
  })

  return (
    <View style={[styles.container, { height: sheetHeight }]}>
      <Animated.ScrollView
        horizontal
        pagingEnabled
        scrollEventThrottle={16}
        onScroll={scrollHandler}
        showsHorizontalScrollIndicator={false}
        decelerationRate='fast'
        style={{ height: '100%' }}
      >
        {displayItems.map((item, index) => (
          <View key={index} style={[styles.page, { height: sheetHeight, width: SCREEN_WIDTH }]}>
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>{item}</View>
          </View>
        ))}
      </Animated.ScrollView>

      {/* {showDots && (
        <View style={styles.dotsContainer}>
          {pages.map((_, index) => (
            <Dot key={index} index={index} scrollX={scrollX} isActive={index === currentPage} />
          ))}
        </View>
      )} */}

      <View style={{ position: 'absolute', top: 0, left: 0, right: 0 }}>
        <PaddingTop />
        <View className='flex flex-row items-center justify-between px-5 py-2'>
          {showDots && (
            <View style={styles.topLeftDots}>
              {displayItems.map((_, index) => {
                let size = 7
                return (
                  <View
                    key={index}
                    className='rounded-full'
                    style={[
                      styles.topDot,
                      {
                        height: size,
                        width: size,
                        borderRadius: size / 2,
                        backgroundColor: index === currentPage ? '#3B82F6aa' : '#D1D5DBaa',
                      },
                    ]}
                  />
                )
              })}
            </View>
          )}
          {showSkip && (
            <Pressable onPress={onSkip || (() => {})} className='rounded-md bg-zinc-500/50 px-5 py-2'>
              <SemiBold className='text-white/70'>Skip</SemiBold>
            </Pressable>
          )}
        </View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 0,
  },
  page: {
    width: SCREEN_WIDTH,
  },
  dotsContainer: {
    position: 'absolute',
    bottom: 32,
    left: 0,
    right: 0,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
  },
  dot: {
    height: 8,
    width: 8,
    borderRadius: 4,
  },
  topLeftDots: {
    flexDirection: 'row',
    gap: 4,
  },
  topDot: {
    borderRadius: 3,
  },
  skipButton: {
    paddingHorizontal: 14,
    paddingVertical: 6,
    backgroundColor: 'rgba(59, 130, 246, 0.1)',
    borderRadius: 4,
  },
  skipText: {
    color: '#3B82F6',
    fontSize: 12,
    fontWeight: '600',
    letterSpacing: 0.3,
  },
})

export default memo(PageCarousel)
