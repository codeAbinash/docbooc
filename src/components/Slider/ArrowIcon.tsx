import { defaultColor, defaultSize, defaultStrokeWidth, HugeIconProps } from '@hugeicons/constants'
import Animated, { DerivedValue, interpolateColor, useAnimatedProps } from 'react-native-reanimated'
import Svg, { Path } from 'react-native-svg'

const AnimatedPath = Animated.createAnimatedComponent(Path)

export default function ArrowIcon({
  size = defaultSize,
  color = defaultColor,
  strokeWidth = defaultStrokeWidth,
  className,
  style,
  progress,
}: HugeIconProps & { progress?: DerivedValue<number> }) {
  const animatedProps = useAnimatedProps(() => {
    if (!progress) return { stroke: color }
    const strokeColor = interpolateColor(progress.value, [0, 1], ['white', 'black'])
    return { stroke: strokeColor }
  })

  return (
    <Svg className={className} style={style} width={size} height={size} viewBox='0 0 24 24' fill='none'>
      <AnimatedPath
        d='M12.5 18C12.5 18 18.5 13.5811 18.5 12C18.5 10.4188 12.5 6 12.5 6'
        animatedProps={animatedProps}
        strokeWidth={strokeWidth}
        strokeLinecap='round'
        strokeLinejoin='round'
      />
      <AnimatedPath
        d='M5.50005 18C5.50005 18 11.5 13.5811 11.5 12C11.5 10.4188 5.5 6 5.5 6'
        animatedProps={animatedProps}
        strokeWidth={strokeWidth}
        strokeLinecap='round'
        strokeLinejoin='round'
      />
    </Svg>
  )
}
