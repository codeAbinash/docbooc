import { Image, View } from 'react-native'
import { HugeIconProps } from '@hugeicons/constants'

export default function EyeIcon({ size = 24, color = 'currentColor', className = '' }: HugeIconProps) {
  const iconSize = typeof size === 'number' ? size : 24

  return (
    <View className={className}>
      <Image
        source={require('@assets/icons/eye.png')}
        style={{
          width: iconSize,
          height: iconSize,
          tintColor: color === 'currentColor' ? undefined : color,
          resizeMode: 'contain',
        }}
      />
    </View>
  )
}
