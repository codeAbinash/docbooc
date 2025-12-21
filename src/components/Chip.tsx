import { HugeIconProps } from '@hugeicons/constants'
import Colors from '@utils/colors'
import { Medium, SemiBold } from '@utils/fonts'
import { useColorScheme } from 'nativewind'
import { memo, useMemo } from 'react'
import { TouchableOpacity, TouchableOpacityProps } from 'react-native'

type ChipProps = {
  label: string
  icon: React.ComponentType<HugeIconProps>
  isActive?: boolean
  onPress?: () => void
  variant?: 'default' | 'deepAccent' | 'transparentAccent'
} & TouchableOpacityProps

const Chip = memo(({ label, icon: IconComponent, isActive = false, onPress, variant = 'default' }: ChipProps) => {
  const { colorScheme } = useColorScheme()
  const dark = colorScheme === 'dark'
  const isHighlighted = isActive || variant !== 'default'

  const { bgStyle, color } = useMemo(
    () => ({
      bgStyle:
        variant === 'deepAccent'
          ? 'bg-accent'
          : variant === 'transparentAccent'
            ? 'bg-accent/10'
            : isActive
              ? 'bg-accent/15'
              : 'bg-white dark:bg-neutral-900',
      color:
        variant === 'deepAccent'
          ? Colors.text.dark
          : variant === 'transparentAccent' || isActive
            ? Colors.accent
            : (dark ? Colors.text.dark : Colors.text.DEFAULT) + 'aa',
    }),
    [variant, isActive, dark],
  )

  const TextComponent = isHighlighted ? SemiBold : Medium

  return (
    <TouchableOpacity onPress={onPress} className={`flex-row items-end justify-start gap-2 rounded-md px-5 py-4 ${bgStyle}`}>
      <IconComponent color={color} size={20} strokeWidth={2} />
      <TextComponent style={{ color }}>{label}</TextComponent>
    </TouchableOpacity>
  )
})

export default Chip
