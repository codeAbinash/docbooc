import { HugeIconProps } from '@hugeicons/constants'
import Colors from '@utils/colors'
import { Medium, SemiBold } from '@utils/fonts'
import { useColorScheme } from 'nativewind'
import { useEffect, useRef, memo, useMemo } from 'react'
import { TouchableOpacity, TouchableOpacityProps, Animated } from 'react-native'
import Medicine02Icon from '@hugeicons/Medicine02Icon'

type ChipProps = {
  label: string
  icon?: React.ComponentType<HugeIconProps> | null
  isActive?: boolean
  onPress?: () => void
  variant?: 'default' | 'deepAccent' | 'transparentAccent'
} & TouchableOpacityProps

const Chip = memo(({ label, icon, isActive = false, onPress, variant = 'default' }: ChipProps) => {
  const { colorScheme } = useColorScheme()
  const dark = colorScheme === 'dark'
  const isHighlighted = isActive || variant !== 'default'
  const IconComponent = icon || Medicine02Icon

  const scaleAnim = useRef(new Animated.Value(isActive ? 1.05 : 1)).current
  const opacityAnim = useRef(new Animated.Value(isActive ? 1 : 0.8)).current

  useEffect(() => {
    Animated.parallel([
      Animated.timing(scaleAnim, {
        toValue: isActive ? 1.05 : 1,
        duration: 250,
        useNativeDriver: true,
      }),
      Animated.timing(opacityAnim, {
        toValue: isActive ? 1 : 0.8,
        duration: 250,
        useNativeDriver: true,
      }),
    ]).start()
  }, [isActive, scaleAnim, opacityAnim])

  const { bgStyle, color } = useMemo(
    () => ({
      bgStyle:
        variant === 'deepAccent'
          ? 'bg-accent '
          : variant === 'transparentAccent'
            ? 'bg-accent/10 '
            : isActive
              ? 'bg-accent/15 '
              : 'bg-white  dark:bg-neutral-900',
      color:
        variant === 'deepAccent'
          ? Colors.text.dark
          : variant === 'transparentAccent' || isActive
            ? Colors.accent
            : (dark ? Colors.text.dark : Colors.text.DEFAULT) + 'aa',
    }),
    [variant, isActive, dark],
  )

  const TextComponent = isHighlighted ? Medium : Medium

  return (
    <Animated.View
      style={{
        transform: [{ scale: scaleAnim }],
        opacity: opacityAnim,
      }}
    >
      <TouchableOpacity
        onPress={onPress}
        className={`flex-row items-end justify-start gap-2 rounded-full px-5 py-3 ${bgStyle}`}
      >
        <IconComponent color={color} size={20} strokeWidth={2} />
        <TextComponent style={{ color }}>{label}</TextComponent>
      </TouchableOpacity>
    </Animated.View>
  )
})

export default Chip
