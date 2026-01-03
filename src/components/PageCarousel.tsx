import React, { memo, useCallback } from 'react'
import { View, Dimensions, StyleSheet, Pressable, Text } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import Animated, {
  useSharedValue,
  useAnimatedScrollHandler,
  useAnimatedStyle,
  interpolate,
  Extrapolate,
  runOnJS,
} from 'react-native-reanimated'
import { Lottie } from './Lottie'
import Animations from '@assets/animations/animations'

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window')

type PageCarouselProps = {
  pages: React.ReactNode[]
  onPageChange?: (index: number) => void
  showDots?: boolean
  onSkip?: () => void
  carouselHeightRatio?: number
  showAnimations?: boolean
  showSkip?: boolean
}

// Memoized Dot component to prevent unnecessary re-renders
const Dot = memo(
  ({ index, scrollX, isActive }: { index: number; scrollX: Animated.SharedValue<number>; isActive: boolean }) => {
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
  onPageChange,
  showDots = true,
  onSkip,
  carouselHeightRatio = 0.6,
  showAnimations = true,
  showSkip = true,
}: PageCarouselProps) {
  const insets = useSafeAreaInsets()
  const scrollX = useSharedValue(0)
  const [currentPage, setCurrentPage] = React.useState(0)
  const sheetHeight = (SCREEN_HEIGHT - insets.top) * carouselHeightRatio

  const animationArray = [
    { animation: Animations.motorcycle, name: 'motorcycle' },
    { animation: Animations.motorcycle, name: 'motorcycle' },
    { animation: Animations.motorcycle, name: 'motorcycle' },
  ]

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
        {showAnimations && animationArray.length > 0
          ? animationArray.map((item, index) => (
              <View key={index} style={[styles.page, { height: sheetHeight, width: SCREEN_WIDTH }]}>
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                  <Lottie
                    source={item.animation}
                    loop
                    style={{ width: SCREEN_WIDTH * 0.8, height: sheetHeight * 0.7 }}
                  />
                </View>
              </View>
            ))
          : pages.map((page, index) => (
              <View key={index} style={[styles.page, { height: sheetHeight, width: SCREEN_WIDTH }]}>
                {page}
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

      <View style={styles.topBar}>
        {showDots && (
          <View style={styles.topLeftDots}>
            {pages.map((_, index) => {
              let size = 10

              return (
                <View
                  key={index}
                  style={[
                    styles.topDot,
                    {
                      height: size,
                      width: size,
                      borderRadius: size / 2,
                      backgroundColor: index === currentPage ? '#3B82F6' : '#D1D5DB',
                    },
                  ]}
                />
              )
            })}
          </View>
        )}

        {showSkip && (
          <Pressable onPress={onSkip || (() => {})} style={styles.skipButton}>
            <Text style={styles.skipText}>Skip</Text>
          </Pressable>
        )}
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
  topBar: {
    position: 'absolute',
    top: 16,
    left: 0,
    right: 0,
    paddingHorizontal: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    zIndex: 10,
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
