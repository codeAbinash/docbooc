
import React from 'react'
import Svg, { Circle, ClipPath, Defs, Ellipse, G, Line, LinearGradient, Mask, Path, Polygon, Polyline, RadialGradient, Rect, Stop } from 'react-native-svg'
import { Variant, HugeIconProps, defaultStrokeWidth, defaultVariant, defaultColor, defaultSize } from './constants'

const iconMap: Partial<Record<Variant, React.FC<HugeIconProps>>> = { 
	'stroke-rounded': StrokeRounded,
	'solid-rounded': SolidRounded,
}

export default function User02Icon({ variant, ...rest }: HugeIconProps) {
  const selectedVariant = variant || defaultVariant
  const Component = iconMap[selectedVariant] || iconMap[defaultVariant] || StrokeRounded
  return <Component {...rest} />
}

function StrokeRounded({ size = defaultSize, color = defaultColor, strokeWidth = defaultStrokeWidth, className, style }: HugeIconProps) {
  return (<Svg className={className} style={style} width={size} height={size} viewBox="0 0 24 24" fill="none">
<Path d="M18.5 20V17.9704C18.5 16.7281 17.9407 15.5099 16.8103 14.9946C15.4315 14.3661 13.7779 14 12 14C10.2221 14 8.5685 14.3661 7.18968 14.9946C6.05927 15.5099 5.5 16.7281 5.5 17.9704V20" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round"/>
<Circle cx="12" cy="7.5" r="3.5" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round"/>
</Svg>
)
}

function SolidRounded({ size = defaultSize, color = defaultColor, strokeWidth = defaultStrokeWidth, className, style }: HugeIconProps) {
  return (<Svg className={className} style={style} width={size} height={size} viewBox="0 0 24 24" fill="none">
<Path fillRule="evenodd" clipRule="evenodd" d="M12.5 3.25C10.1528 3.25 8.25 5.15279 8.25 7.5C8.25 9.84721 10.1528 11.75 12.5 11.75C14.8472 11.75 16.75 9.84721 16.75 7.5C16.75 5.15279 14.8472 3.25 12.5 3.25ZM12.5 13.25C10.6214 13.25 8.86094 13.6364 7.37859 14.3122C5.90039 14.986 5.25 16.5343 5.25 17.9704C5.24995 18.4032 5.2499 18.8744 5.2933 19.1972C5.3411 19.5527 5.45354 19.9284 5.76257 20.2374C6.07159 20.5465 6.44732 20.6589 6.8028 20.7067C7.12559 20.7501 7.52239 20.7501 7.95519 20.75H7.95526H17.0448H17.0448C17.4776 20.7501 17.8744 20.7501 18.1972 20.7067C18.5527 20.6589 18.9284 20.5465 19.2374 20.2374C19.5465 19.9284 19.6589 19.5527 19.7067 19.1972C19.7501 18.8744 19.7501 18.4032 19.75 17.9704C19.75 16.5343 19.0996 14.986 17.6214 14.3122C16.1391 13.6364 14.3786 13.25 12.5 13.25Z" fill={color}/>
</Svg>
)
}
