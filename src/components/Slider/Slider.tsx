import Colors from '@utils/colors'
import { useColorScheme } from 'nativewind'
import { useCallback, useState } from 'react'
import { LayoutChangeEvent, View } from 'react-native'
import Animated, {
  Extrapolate,
  interpolate,
  interpolateColor,
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
} from 'react-native-reanimated'
import { Gesture, GestureDetector } from 'react-native-gesture-handler'
import ArrowIcon from './ArrowIcon'

type SliderProps = {
  onComplete: () => void
  mainColor?: string
  circleSize?: number
}

function Slider({ onComplete, circleSize = 45, mainColor = Colors.accent }: SliderProps) {
  const { colorScheme } = useColorScheme()
  const [containerWidth, setContainerWidth] = useState(0)
  const translateX = useSharedValue(0)
  const scale = useSharedValue(1)

  const maxSlide = Math.max(containerWidth - circleSize, 0)

  const progress = interpolate(translateX.value, [0, maxSlide || 1], [0, 1], Extrapolate.CLAMP)

  const circleAnimatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: translateX.value }, { scale: scale.value }],
  }))

  const containerBgColor = interpolateColor(
    progress,
    [0, 1],
    [colorScheme === 'dark' ? Colors.card.dark : 'white', mainColor],
  )

  const containerAnimatedStyle = useAnimatedStyle(() => ({
    backgroundColor: containerBgColor,
  }))

  const textColor = interpolateColor(
    progress,
    [0, 1],
    [colorScheme === 'dark' ? Colors.gray.dark : Colors.gray.DEFAULT, 'white'],
  )

  const textAnimatedStyle = useAnimatedStyle(() => ({
    color: textColor,
    paddingLeft: interpolate(progress, [0, 1], [circleSize + 10, 10]),
  }))

  const circleBgColor = interpolateColor(progress, [0, 1], [mainColor, 'white'])

  const circleColorStyle = useAnimatedStyle(() => ({
    backgroundColor: circleBgColor,
  }))

  const handleLayout = useCallback((event: LayoutChangeEvent) => {
    const { width } = event.nativeEvent.layout
    if (width > 0) {
      setContainerWidth(width)
    }
  }, [])

  const panGesture = Gesture.Pan()
    .onUpdate((event) => {
      const newValue = Math.max(0, Math.min(event.translationX, maxSlide))
      translateX.value = newValue

      if (newValue > maxSlide * 0.95 && maxSlide > 0) {
        runOnJS(onComplete)()
      }
    })
    .onStart(() => {
      scale.value = withSpring(1.05, { damping: 10, mass: 1, stiffness: 100 })
    })
    .onEnd(() => {
      translateX.value = withTiming(0, { duration: 300 })
      scale.value = withSpring(1, { damping: 10, mass: 1, stiffness: 100 })
    })

  return (
    <Animated.View
      className='rounded-full'
      style={[containerAnimatedStyle, { paddingVertical: 12, paddingHorizontal: 16 }]}
    >
      <View
        onLayout={handleLayout}
        style={{
          height: circleSize,
          position: 'relative',
          width: '100%',
          overflow: 'hidden',
        }}
      >
        <GestureDetector gesture={panGesture}>
          <Animated.View
            style={[
              {
                height: circleSize,
                width: circleSize,
                borderRadius: circleSize / 2,
                position: 'absolute',
                left: 0,
                top: 0,
                zIndex: 10,
                justifyContent: 'center',
                alignItems: 'center',
              },
              circleColorStyle,
              circleAnimatedStyle,
            ]}
          >
            <ArrowIcon progress={progress} strokeWidth={2} size={22} />
          </Animated.View>
        </GestureDetector>
        <Animated.Text
          numberOfLines={1}
          style={[
            {
              fontWeight: '500',
              fontFamily: 'Inter-Medium',
              textAlign: 'center',
              position: 'absolute',
              left: circleSize + 20,
              right: 10,
              top: 0,
              bottom: 0,
              justifyContent: 'center',
              height: circleSize,
              lineHeight: circleSize,
            },
            textAnimatedStyle,
          ]}
        >
          Slide to book appointment
        </Animated.Text>
      </View>
    </Animated.View>
  )
}

export default Slider
