import React, { useCallback, useRef } from 'react'
import { Pressable, type PressableProps, Animated } from 'react-native'
export type CustomPressProps = PressableProps & {
  children: React.ReactNode
  activeOpacity?: number
  activeScale?: number
  duration?: number
  disabled?: boolean
  variant?: 'primary' | 'secondary'
}

const AnimatedPressable = Animated.createAnimatedComponent(Pressable)

export default function Press({
  children,
  style,
  activeOpacity = 0.8,
  activeScale = 0.98,
  duration = 100,
  onPressIn,
  onPressOut,
  ...props
}: CustomPressProps) {
  const scale = useRef(new Animated.Value(1)).current
  const opacity = useRef(new Animated.Value(1)).current

  const handlePressIn = useCallback(
    (e: any) => {
      Animated.parallel([
        Animated.timing(scale, {
          toValue: activeScale,
          duration,
          useNativeDriver: true,
        }),
        Animated.timing(opacity, {
          toValue: activeOpacity,
          duration,
          useNativeDriver: true,
        }),
      ]).start()
      onPressIn?.(e)
    },
    [activeScale, activeOpacity, duration, onPressIn],
  )

  const handlePressOut = useCallback(
    (e: any) => {
      Animated.parallel([
        Animated.timing(scale, {
          toValue: 1,
          duration,
          useNativeDriver: true,
        }),
        Animated.timing(opacity, {
          toValue: 1,
          duration,
          useNativeDriver: true,
        }),
      ]).start()
      onPressOut?.(e)
    },
    [duration, onPressOut],
  )

  const animatedStyles = {
    transform: [{ scale }],
    opacity,
  } as Animated.WithAnimatedValue<any>

  if (props.disabled) {
    return (
      <Pressable style={style} disabled {...props} className='opacity-40'>
        {children}
      </Pressable>
    )
  }

  return (
    <AnimatedPressable
      style={[animatedStyles, style as any]}
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      {...props}
    >
      {children}
    </AnimatedPressable>
  )
}
