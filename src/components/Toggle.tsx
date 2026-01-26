import { StyleSheet, useColorScheme } from 'react-native'
import Animated, { interpolateColor, useAnimatedStyle, useDerivedValue, withTiming } from 'react-native-reanimated'
import colors from 'tailwindcss/colors'
const TC_W = 50 // Toggle Container Width
const TC_H = 26 // Toggle Container Height
const T_W = 17 // Toggle Width
const PAD = (TC_H - T_W) / 2 + 0.025 // Padding
const AVAIL_W = TC_W - T_W - PAD * 2 // Available Width
// const duration = useDeveloperOptions.getState().animationDuration

const styles = StyleSheet.create({
  toggleContainer: {
    width: TC_W,
    height: TC_H,
    borderRadius: 100,
    padding: PAD,
  },
  toggle: {
    width: T_W,
    height: T_W,
    borderRadius: 100,
    backgroundColor: 'white',
  },
})

interface ToggleProps {
  isActive: boolean
  accent?: string
}

const duration = 200
export function Toggle({ isActive, accent }: ToggleProps) {
  const scheme = useColorScheme()
  const progress = useDerivedValue(() => (isActive ? AVAIL_W : 0), [isActive])

  const backgroundColorStyle = useAnimatedStyle(() => {
    const backgroundColor = withTiming(
      interpolateColor(
        progress.value,
        [0, AVAIL_W],
        [scheme === 'dark' ? colors.zinc[800] : colors.zinc[200], accent || colors.blue[500]],
      ),
      { duration },
    )
    return { backgroundColor }
  }, [accent, scheme, progress])

  const customSpringStyle = useAnimatedStyle(() => {
    return { transform: [{ translateX: withTiming(progress.value, { duration }) }] }
  }, [progress])

  return (
    <Animated.View style={[styles.toggleContainer, backgroundColorStyle]}>
      <Animated.View style={[styles.toggle, customSpringStyle]}></Animated.View>
    </Animated.View>
  )
}
