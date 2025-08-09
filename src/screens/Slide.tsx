import { PaddingBottom, PaddingTop } from '@components/SafePadding'
import { Medium } from '@utils/fonts'
import { useCallback, useState } from 'react'
import { LayoutChangeEvent, StyleSheet, View } from 'react-native'
import { Gesture, GestureDetector, GestureHandlerRootView } from 'react-native-gesture-handler'
import Animated, { useAnimatedStyle, useSharedValue, withSpring, withTiming } from 'react-native-reanimated'

const circleSize = 50

const Slide = () => {
  const [containerWidth, setContainerWidth] = useState(0)

  const pressed = useSharedValue<boolean>(false)

  const offset = useSharedValue<number>(0)

  const pan = Gesture.Pan()
    .onBegin(() => {
      pressed.value = true
    })
    .onChange((event) => {
      if (event.translationX < 0) return
      if (event.translationX > containerWidth - circleSize) return
      offset.value = event.translationX
      console.log('Dragging:', offset.value)
      console.log('Container Width:', containerWidth)
    })
    .onFinalize(() => {
      offset.value = withSpring(0)
      pressed.value = false
    })
  const animatedStyles = useAnimatedStyle(() => ({
    transform: [{ translateX: offset.value }, { scale: withTiming(pressed.value ? 1.05 : 1) }],
    backgroundColor: withTiming(pressed.value ? '#3b82f6' : '#3b82f6', { duration: 200 }),
  }))

  const handleLayout = useCallback((event: LayoutChangeEvent) => {
    const { width } = event.nativeEvent.layout
    if (width !== 0) setContainerWidth(width)
  }, [])
  return (
    <GestureHandlerRootView>
      <PaddingTop />
      <View className='p-5'>
        <Medium>Slide to unlock</Medium>
      </View>
      <View className='p-5 px-8'>
        <View className='rounded-full bg-zinc-200/80 p-2 dark:bg-zinc-800/80'>
          <GestureDetector gesture={pan}>
            <View
              onLayout={handleLayout}
              style={styles.container}
              className='flex flex-row items-center justify-center'
            >
              <Animated.View style={[styles.circle, animatedStyles]} />
              <Medium className='gray'>Slide to book appointment</Medium>
            </View>
          </GestureDetector>
        </View>
      </View>
      <PaddingBottom />
    </GestureHandlerRootView>
  )
}

const styles = StyleSheet.create({
  circle: {
    height: circleSize,
    width: circleSize,
    backgroundColor: '#b58df1',
    borderRadius: 500,
    cursor: 'pointer',
    position: 'absolute',
    left: 0,
    zIndex: 10,
  },
  container: {
    height: circleSize,
    position: 'relative',
  },
})

export default Slide
