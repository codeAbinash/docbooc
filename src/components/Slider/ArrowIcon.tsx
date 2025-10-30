import { defaultColor, defaultSize, defaultStrokeWidth, HugeIconProps } from '@hugeicons/constants'
import { Animated } from 'react-native'
import Svg, { Path } from 'react-native-svg'

const AnimatedPath = Animated.createAnimatedComponent(Path)

export default function ArrowIcon({
  size = defaultSize,
  color = defaultColor,
  strokeWidth = defaultStrokeWidth,
  className,
  style,
  progress,
}: HugeIconProps & { progress?: Animated.AnimatedInterpolation<string | number> }) {
  const animatedProps = {
    stroke: progress
      ? progress.interpolate({
          inputRange: [0, 1],
          outputRange: ['white', 'black'],
        })
      : color,
  }

  return (
    <Svg className={className} style={style} width={size} height={size} viewBox='0 0 24 24' fill='none'>
      <AnimatedPath
        d='M12.5 18C12.5 18 18.5 13.5811 18.5 12C18.5 10.4188 12.5 6 12.5 6'
        stroke={animatedProps.stroke}
        strokeWidth={strokeWidth}
        strokeLinecap='round'
        strokeLinejoin='round'
      />
      <AnimatedPath
        d='M5.50005 18C5.50005 18 11.5 13.5811 11.5 12C11.5 10.4188 5.5 6 5.5 6'
        stroke={animatedProps.stroke}
        strokeWidth={strokeWidth}
        strokeLinecap='round'
        strokeLinejoin='round'
      />
    </Svg>
  )
}
