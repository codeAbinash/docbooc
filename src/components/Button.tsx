import { SemiBold } from '@utils/fonts'
import { TouchableOpacity, TouchableOpacityProps, View } from 'react-native'
import LinearGradient from 'react-native-linear-gradient'
import Animated, {
  useSharedValue,
  withTiming,
  useAnimatedStyle,
  Easing,
  interpolate,
  Extrapolate,
} from 'react-native-reanimated'
import { useEffect, useMemo } from 'react'

type ButtonProps = {
  title?: string
  disabled?: boolean
  progressFill?: number
} & TouchableOpacityProps

const ANIM_CONFIG = {
  duration: 2000,
  easing: Easing.bezier(0.25, 0.1, 0.25, 1),
}

const GRADIENT_ACTIVE = ['#3b82f6', '#2563eb']
const GRADIENT_DISABLED = ['#d1d5db', '#9ca3af']
const GRADIENT_END = { x: 1, y: 1 }
const GRADIENT_START = { x: 0, y: 0 }

export default function Button({ title, disabled = false, progressFill, ...props }: ButtonProps) {
  const showProgress = useMemo(
    () => progressFill !== undefined && progressFill > 0 && progressFill < 100,
    [progressFill]
  )
  const fillWidth = useSharedValue(progressFill || 0)

  useEffect(() => {
    fillWidth.value = showProgress && progressFill !== undefined
      ? withTiming(progressFill, ANIM_CONFIG)
      : 0
  }, [progressFill, showProgress, fillWidth])

  const animatedStyle = useAnimatedStyle(() => ({
    width: `${interpolate(fillWidth.value, [0, 100], [0, 100], Extrapolate.CLAMP)}%`,
  }))

  return (
    <TouchableOpacity activeOpacity={0.7} className='overflow-hidden rounded-[13]' disabled={disabled} {...props}>
      {showProgress ? (
        <View className='relative bg-neutral-300'>
          <View className='items-center justify-center px-6 py-[16]'>
            <SemiBold className='text-sm text-gray-400'>Next</SemiBold>
          </View>

          <Animated.View className='absolute left-0 top-0 h-full' style={animatedStyle}>
            <LinearGradient
              colors={GRADIENT_ACTIVE}
              className='h-full w-full'
              end={GRADIENT_END}
              start={GRADIENT_START}
            />
          </Animated.View>

          <View className='absolute inset-0 items-center justify-center px-6 py-[16]' pointerEvents='none'>
            <SemiBold className='text-sm text-white'>Next</SemiBold>
          </View>
        </View>
      ) : (
        <LinearGradient
          colors={disabled ? GRADIENT_DISABLED : GRADIENT_ACTIVE}
          className='items-center justify-center px-6 py-[16]'
          end={GRADIENT_END}
          start={GRADIENT_START}
        >
          <SemiBold className={`text-sm ${disabled ? 'text-gray-400' : 'text-white'}`}>{title}</SemiBold>
        </LinearGradient>
      )}
    </TouchableOpacity>
  )
}