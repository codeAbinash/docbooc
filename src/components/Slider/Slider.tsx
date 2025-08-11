import Colors from '@utils/colors'
import { useColorScheme } from 'nativewind'
import { useCallback } from 'react'
import { LayoutChangeEvent, StyleSheet, Vibration } from 'react-native'
import { Gesture, GestureDetector } from 'react-native-gesture-handler'
import Animated, {
  interpolateColor,
  useAnimatedStyle,
  useDerivedValue,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated'

import { runOnJS } from 'react-native-worklets'
import ArrowIcon from './ArrowIcon'
type SliderProps = {
  onComplete: () => void
  mainColor?: string
  circleSize?: number
}

function Slider({ onComplete, circleSize = 50, mainColor = Colors.accent }: SliderProps) {
  const { colorScheme } = useColorScheme()
  const containerWidth = useSharedValue<number>(0)
  const pressed = useSharedValue<boolean>(false)
  const offset = useSharedValue<number>(0)
  const progress = useDerivedValue(() => {
    return containerWidth.value > 0 ? offset.value / (containerWidth.value - circleSize) : 0
  })

  const handleComplete = () => {
    Vibration.vibrate(100)
    onComplete()
  }

  const pan = Gesture.Pan()
    .onBegin(() => {
      pressed.value = true
    })
    .onChange((event) => {
      if (event.translationX < 0) return
      if (event.translationX > containerWidth.value - circleSize) return
      offset.value = event.translationX
      if (progress.value > 0.95) runOnJS(handleComplete)()
    })
    .onFinalize(() => {
      offset.value = withTiming(0)
      pressed.value = false
    })

  const animatedStyles = useAnimatedStyle(() => {
    const bgColor = interpolateColor(progress.value, [0, 1], [mainColor, 'white'])
    return {
      transform: [{ translateX: offset.value }, { scale: withTiming(pressed.value ? 1.05 : 1) }],
      backgroundColor: bgColor,
    }
  })

  const animatedContainerBg = useAnimatedStyle(() => {
    const colorArr = [colorScheme === 'dark' ? Colors.card.dark : Colors.card.DEFAULT, mainColor]
    const bgColor = interpolateColor(progress.value, [0, 1], colorArr)
    return { backgroundColor: bgColor }
  })

  const animatedTextStyle = useAnimatedStyle(() => {
    const colorArr = [colorScheme === 'dark' ? Colors.gray.dark : Colors.gray.DEFAULT, 'white']
    const textColor = interpolateColor(progress.value, [0, 1], colorArr)
    const marginLeft = -progress.value * 2 * circleSize + circleSize
    return { color: textColor, marginLeft }
  })

  const handleLayout = useCallback((event: LayoutChangeEvent) => {
    const { width } = event.nativeEvent.layout
    if (width !== 0) containerWidth.value = width
  }, [])

  return (
    <Animated.View className='rounded-full p-2' style={[animatedContainerBg]}>
      <Animated.View
        onLayout={handleLayout}
        style={[styles.container, { height: circleSize }]}
        className='flex flex-row items-center justify-center'
      >
        <GestureDetector gesture={pan}>
          <Animated.View style={[styles.circle, animatedStyles, { height: circleSize, width: circleSize }]}>
            <ArrowIcon progress={progress} strokeWidth={2} />
          </Animated.View>
        </GestureDetector>
        <Animated.Text
          className={'gray text-sm'}
          style={[animatedTextStyle, { fontWeight: '500', fontFamily: 'Inter-Medium' }]}
        >
          Slide to book appointment
        </Animated.Text>
      </Animated.View>
    </Animated.View>
  )
}

const styles = StyleSheet.create({
  circle: {
    borderRadius: 500,
    cursor: 'pointer',
    position: 'absolute',
    left: 0,
    zIndex: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    position: 'relative',
  },
})

export default Slider
