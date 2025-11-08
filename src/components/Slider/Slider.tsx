import Colors from '@utils/colors'
import { useColorScheme } from 'nativewind'
import { useCallback, useRef } from 'react'
import { Animated, LayoutChangeEvent, StyleSheet, Vibration } from 'react-native'
import { Gesture, GestureDetector } from 'react-native-gesture-handler'
import ArrowIcon from './ArrowIcon'
type SliderProps = {
  onComplete: () => void
  mainColor?: string
  circleSize?: number
}

function Slider({ onComplete, circleSize = 45, mainColor = Colors.accent }: SliderProps) {
  const { colorScheme } = useColorScheme()
  const containerWidth = useRef(0)
  const offset = useRef(new Animated.Value(0)).current
  const pressed = useRef(new Animated.Value(0)).current
  const scale = useRef(new Animated.Value(1)).current

  const progress = offset.interpolate({
    inputRange: [0, (containerWidth.current || 0) - circleSize || 1],
    outputRange: [0, 1],
    extrapolate: 'clamp',
  })

  const handleComplete = () => {
    Vibration.vibrate(100)
    onComplete()
  }

  const pan = Gesture.Pan()
    .onBegin(() => {
      Animated.spring(scale, {
        toValue: 1.05,
        useNativeDriver: true,
      }).start()
      pressed.setValue(1)
    })
    .onChange((event) => {
      const translationX = Math.max(0, Math.min(event.translationX, containerWidth.current - circleSize))
      offset.setValue(translationX)

      // Check if progress is > 95%
      if (translationX > (containerWidth.current - circleSize) * 0.95) {
        handleComplete()
      }
    })
    .onFinalize(() => {
      Animated.parallel([
        Animated.timing(offset, {
          toValue: 0,
          duration: 300,
          useNativeDriver: true,
        }),
        Animated.spring(scale, {
          toValue: 1,
          useNativeDriver: true,
        }),
      ]).start()
      pressed.setValue(0)
    })

  const backgroundColor = progress.interpolate({
    inputRange: [0, 1],
    outputRange: [mainColor, 'white'],
  })

  const containerBgColor = progress.interpolate({
    inputRange: [0, 1],
    outputRange: [colorScheme === 'dark' ? Colors.card.dark : 'white', mainColor],
  })

  const textColor = progress.interpolate({
    inputRange: [0, 1],
    outputRange: [colorScheme === 'dark' ? Colors.gray.dark : Colors.gray.DEFAULT, 'white'],
  })

  const marginLeft = progress.interpolate({
    inputRange: [0, 1],
    outputRange: [circleSize, -circleSize],
  })

  const animatedStyles = {
    transform: [{ translateX: offset }, { scale }],
    backgroundColor,
  }

  const animatedContainerBg = {
    backgroundColor: containerBgColor,
  }

  const animatedTextStyle = {
    color: textColor,
    marginLeft,
  }

  const handleLayout = useCallback((event: LayoutChangeEvent) => {
    const { width } = event.nativeEvent.layout
    if (width !== 0) containerWidth.current = width
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
