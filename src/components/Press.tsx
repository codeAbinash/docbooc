import React, { useCallback, useRef, useEffect } from 'react'
import {
  Pressable,
  type PressableProps,
  Animated,
  type StyleProp,
  type ViewStyle,
  type GestureResponderEvent,
} from 'react-native'

export type CustomPressProps = Omit<PressableProps, 'style'> & {
  children: React.ReactNode
  style?: StyleProp<ViewStyle>
  activeOpacity?: number
  activeScale?: number
  duration?: number
  disabled?: boolean
}

const AnimatedPressable = Animated.createAnimatedComponent(Pressable)

export default function Press({
  children,
  style,
  activeOpacity = 0.8,
  activeScale = 0.98,
  duration = 100,
  disabled = false,
  onPressIn,
  onPressOut,
  ...props
}: CustomPressProps) {
  const scale = useRef(new Animated.Value(1)).current
  const opacity = useRef(new Animated.Value(1)).current

  // Cleanup animations on unmount
  useEffect(() => {
    return () => {
      scale.stopAnimation()
      opacity.stopAnimation()
    }
  }, [scale, opacity])

  const handlePressIn = useCallback(
    (e: GestureResponderEvent) => {
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
    [activeScale, activeOpacity, duration, onPressIn, scale, opacity],
  )

  const handlePressOut = useCallback(
    (e: GestureResponderEvent) => {
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
    [duration, onPressOut, scale, opacity],
  )

  const animatedStyles: Animated.WithAnimatedValue<ViewStyle> = {
    transform: [{ scale }],
    opacity,
  }

  if (disabled) {
    return (
      <Pressable style={[style, { opacity: 0.4 }]} disabled {...props}>
        {children}
      </Pressable>
    )
  }

  return (
    <AnimatedPressable
      style={[animatedStyles, style]}
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      disabled={disabled}
      {...props}
    >
      {children}
    </AnimatedPressable>
  )
}
