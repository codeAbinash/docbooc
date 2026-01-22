import React, { useCallback, useEffect, useRef } from 'react'
import {
  Animated,
  type GestureResponderEvent,
  Pressable,
  type PressableProps,
  type StyleProp,
  Text,
  type ViewStyle,
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

  // Normalize children: wrap plain strings/numbers with Text so they are not rendered as raw text under native Views
  const normalizedChildren = React.Children.map(children, (child) => {
    if (typeof child === 'string' || typeof child === 'number') {
      return <Text>{child}</Text>
    }
    return child
  })

  if (disabled) {
    return (
      <Pressable style={[style, { opacity: 0.4 }]} disabled {...props}>
        {normalizedChildren}
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
      {normalizedChildren}
    </AnimatedPressable>
  )
}
