
import React from 'react'
import Svg, { Circle, ClipPath, Defs, Ellipse, G, Line, LinearGradient, Mask, Path, Polygon, Polyline, RadialGradient, Rect, Stop } from 'react-native-svg'
import { Variant, HugeIconProps, defaultStrokeWidth, defaultVariant, defaultColor, defaultSize } from './constants'

const iconMap: Partial<Record<Variant, React.FC<HugeIconProps>>> = { 
	'stroke-rounded': StrokeRounded,
	'solid-rounded': SolidRounded,
}

export default function NotificationSquareIcon({ variant, ...rest }: HugeIconProps) {
  const selectedVariant = variant || defaultVariant
  const Component = iconMap[selectedVariant] || iconMap[defaultVariant] || StrokeRounded
  return <Component {...rest} />
}

function StrokeRounded({ size = defaultSize, color = defaultColor, strokeWidth = defaultStrokeWidth, className, style }: HugeIconProps) {
  return (<Svg className={className} style={style} width={size} height={size} viewBox="0 0 24 24" fill="none">
<Path d="M11.5 3.5H10.5C6.72876 3.5 4.84315 3.5 3.67157 4.67157C2.5 5.84315 2.5 7.72876 2.5 11.5V13.5C2.5 17.2712 2.5 19.1569 3.67157 20.3284C4.84315 21.5 6.72876 21.5 10.5 21.5L12.5 21.5C16.2712 21.5 18.1569 21.5 19.3284 20.3284C20.5 19.1569 20.5 17.2712 20.5 13.5V12.5" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round"/>
<Path d="M21.5 6C21.5 7.933 19.933 9.5 18 9.5C16.067 9.5 14.5 7.933 14.5 6C14.5 4.067 16.067 2.5 18 2.5C19.933 2.5 21.5 4.067 21.5 6Z" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round"/>
<Path d="M7.5 12.5H11.5" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round"/>
<Path d="M7.5 16.5H15.5" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round"/>
</Svg>
)
}

function SolidRounded({ size = defaultSize, color = defaultColor, strokeWidth = defaultStrokeWidth, className, style }: HugeIconProps) {
  return (<Svg className={className} style={style} width={size} height={size} viewBox="0 0 24 24" fill="none">
<Path d="M13.5625 2.75098C12.8948 3.66138 12.5 4.78446 12.5 6C12.5 9.03757 14.9624 11.5 18 11.5C19.2155 11.5 20.3377 11.1041 21.248 10.4365C21.2491 10.7607 21.25 11.0985 21.25 11.4502V13.5L21.248 14.8262C21.2412 16.0811 21.2127 17.1261 21.0967 17.9893C20.9489 19.0882 20.6477 19.9907 19.9941 20.7158L19.8584 20.8584C19.1101 21.6067 18.1616 21.939 16.9893 22.0967C16.1261 22.2127 15.0811 22.2412 13.8262 22.248L12.5 22.25H10.4502C8.60939 22.25 7.15129 22.25 6.01074 22.0967C4.91176 21.9489 4.00929 21.6477 3.28418 20.9941L3.1416 20.8584C2.39329 20.1101 2.06096 19.1616 1.90332 17.9893C1.74998 16.8487 1.74999 15.3906 1.75 13.5498V11.4502C1.74999 9.60937 1.74998 8.15129 1.90332 7.01074C2.06096 5.83844 2.39329 4.88991 3.1416 4.1416L3.28418 4.00586C4.00929 3.35227 4.91176 3.0511 6.01074 2.90332C7.1513 2.74998 8.60937 2.74999 10.4502 2.75L13.5625 2.75098ZM7.5 15.5C6.94772 15.5 6.5 15.9477 6.5 16.5C6.5 17.0523 6.94772 17.5 7.5 17.5H15.5L15.6025 17.4951C16.1067 17.4438 16.5 17.0177 16.5 16.5C16.5 15.9823 16.1067 15.5562 15.6025 15.5049L15.5 15.5H7.5ZM7.5 11.5C6.94772 11.5 6.5 11.9477 6.5 12.5C6.5 13.0523 6.94772 13.5 7.5 13.5H11.5C12.0523 13.5 12.5 13.0523 12.5 12.5C12.5 11.9477 12.0523 11.5 11.5 11.5H7.5ZM18 1.75C20.3472 1.75 22.25 3.65279 22.25 6C22.25 8.34721 20.3472 10.25 18 10.25C15.6528 10.25 13.75 8.34721 13.75 6C13.75 3.65279 15.6528 1.75 18 1.75Z" fill={color}/>
</Svg>
)
}
