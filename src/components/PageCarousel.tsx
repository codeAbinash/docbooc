import React, { memo, useCallback } from 'react'
import { View, Dimensions, StyleSheet, Pressable, Text } from 'react-native'
import Animated, {
  useSharedValue,
  useAnimatedScrollHandler,
  useAnimatedStyle,
  interpolate,
  Extrapolate,
  runOnJS,
} from 'react-native-reanimated'

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window')
const CAROUSEL_HEIGHT = SCREEN_HEIGHT * 0.65

type PageCarouselProps = {
  pages: React.ReactNode[]
  onPageChange?: (index: number) => void
  showDots?: boolean
  onSkip?: () => void
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

function PageCarousel({ pages, onPageChange, showDots = true, onSkip }: PageCarouselProps) {
  const scrollX = useSharedValue(0)
  const [currentPage, setCurrentPage] = React.useState(0)

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
    <View style={styles.container}>
      <Animated.ScrollView
        horizontal
        pagingEnabled
        scrollEventThrottle={16}
        onScroll={scrollHandler}
        showsHorizontalScrollIndicator={false}
        decelerationRate='fast'
      >
        {pages.map((page, index) => (
          <View key={index} style={styles.page}>
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

        <Pressable onPress={onSkip || (() => {})} style={styles.skipButton}>
          <Text style={styles.skipText}>Skip</Text>
        </Pressable>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    height: CAROUSEL_HEIGHT,
  },
  page: {
    width: SCREEN_WIDTH,
    height: CAROUSEL_HEIGHT,
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
