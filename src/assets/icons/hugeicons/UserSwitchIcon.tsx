
import React from 'react'
import Svg, { Circle, ClipPath, Defs, Ellipse, G, Line, LinearGradient, Mask, Path, Polygon, Polyline, RadialGradient, Rect, Stop } from 'react-native-svg'
import {type Variant, type HugeIconProps, defaultStrokeWidth, defaultVariant, defaultColor, defaultSize } from './constants'

const iconMap: Partial<Record<Variant, React.FC<HugeIconProps>>> = { 
	'stroke-rounded': StrokeRounded,
	'solid-rounded': SolidRounded,
	'twotone-rounded': TwotoneRounded,
	'duotone-rounded': DuotoneRounded,
}

export default function UserSwitchIcon({ variant, ...rest }: HugeIconProps) {
  const selectedVariant = variant || defaultVariant
  const Component = iconMap[selectedVariant] || iconMap[defaultVariant] || StrokeRounded
  return <Component {...rest} />
}

function StrokeRounded({ size = defaultSize, color = defaultColor, strokeWidth = defaultStrokeWidth, className, style }: HugeIconProps) {
  return (<Svg className={className} style={style} width={size} height={size} viewBox="0 0 24 24" fill="none">
<Path d="M17 17C15.6193 17 14.5 15.8807 14.5 14.5C14.5 13.1193 15.6193 12 17 12C18.3807 12 19.5 13.1193 19.5 14.5C19.5 15.8807 18.3807 17 17 17ZM17 17C19.4853 17 21.5 19.0147 21.5 21.5M17 17C14.5147 17 12.5 19.0147 12.5 21.5" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round"/>
<Path d="M7 7.5C5.61929 7.5 4.5 6.38071 4.5 5C4.5 3.61929 5.61929 2.5 7 2.5C8.38071 2.5 9.5 3.61929 9.5 5C9.5 6.38071 8.38071 7.5 7 7.5ZM7 7.5C9.48528 7.5 11.5 9.51472 11.5 12M7 7.5C4.51472 7.5 2.5 9.51472 2.5 12" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round"/>
<Path d="M3.5 15.5C3.5 18.2643 5.73571 20.5 8.5 20.5L8 18.5" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round"/>
<Path d="M18.5 8.5C18.5 5.73571 16.2643 3.5 13.5 3.5L14 5.5" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round"/>
</Svg>
)
}

function SolidRounded({ size = defaultSize, color = defaultColor, strokeWidth = defaultStrokeWidth, className, style }: HugeIconProps) {
  return (<Svg className={className} style={style} width={size} height={size} viewBox="0 0 24 24" fill="none">
<Path d="M15.6853 16.416C13.4221 16.9995 11.75 19.0545 11.75 21.5C11.75 21.9142 12.0858 22.25 12.5 22.25H21.5C21.9142 22.25 22.25 21.9142 22.25 21.5C22.25 19.0545 20.5779 16.9995 18.3147 16.416C19.1698 15.9497 19.75 15.0426 19.75 14C19.75 12.4812 18.5188 11.25 17 11.25C15.4812 11.25 14.25 12.4812 14.25 14C14.25 15.0426 14.8302 15.9497 15.6853 16.416Z" fill={color}/>
<Path d="M5.68529 6.91597C3.42205 7.49954 1.75 9.55451 1.75 12C1.75 12.4142 2.08579 12.75 2.5 12.75H11.5C11.9142 12.75 12.25 12.4142 12.25 12C12.25 9.55451 10.5779 7.49954 8.31471 6.91597C9.16982 6.44965 9.75 5.54258 9.75 4.5C9.75 2.98122 8.51878 1.75 7 1.75C5.48122 1.75 4.25 2.98122 4.25 4.5C4.25 5.54258 4.83018 6.44965 5.68529 6.91597Z" fill={color}/>
<Path fillRule="evenodd" clipRule="evenodd" d="M3.5 14.5C4.05228 14.5 4.5 14.9477 4.5 15.5C4.5 17.2426 5.60966 18.722 7.16209 19.2715L7.02986 18.7425C6.89591 18.2067 7.22167 17.6638 7.75746 17.5299C8.29326 17.3959 8.83619 17.7217 8.97014 18.2575L9.47014 20.2575C9.54483 20.5562 9.47771 20.8727 9.28821 21.1154C9.0987 21.3581 8.80794 21.5 8.5 21.5C5.18343 21.5 2.5 18.8166 2.5 15.5C2.5 14.9477 2.94772 14.5 3.5 14.5Z" fill={color}/>
<Path fillRule="evenodd" clipRule="evenodd" d="M12.7118 2.88459C12.9013 2.64187 13.1921 2.5 13.5 2.5C16.8166 2.5 19.5 5.18343 19.5 8.5C19.5 9.05228 19.0523 9.5 18.5 9.5C17.9477 9.5 17.5 9.05228 17.5 8.5C17.5 6.75741 16.3904 5.27796 14.8379 4.72852L14.9702 5.25746C15.1041 5.79326 14.7783 6.33619 14.2425 6.47014C13.7067 6.60409 13.1638 6.27833 13.0299 5.74254L12.5299 3.74254C12.4552 3.44379 12.5223 3.1273 12.7118 2.88459Z" fill={color}/>
</Svg>
)
}

function TwotoneRounded({ size = defaultSize, color = defaultColor, strokeWidth = defaultStrokeWidth, className, style }: HugeIconProps) {
  return (<Svg className={className} style={style} width={size} height={size} viewBox="0 0 24 24" fill="none">
<Path opacity="0.4" d="M17 16C15.6193 16 14.5 14.8807 14.5 13.5C14.5 12.1193 15.6193 11 17 11C18.3807 11 19.5 12.1193 19.5 13.5C19.5 14.8807 18.3807 16 17 16ZM17 16C19.4853 16 21.5 18.0147 21.5 20.5M17 16C14.5147 16 12.5 18.0147 12.5 20.5" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round"/>
<Path opacity="0.4" d="M7 8C5.61929 8 4.5 6.88071 4.5 5.5C4.5 4.11929 5.61929 3 7 3C8.38071 3 9.5 4.11929 9.5 5.5C9.5 6.88071 8.38071 8 7 8ZM7 8C9.48528 8 11.5 10.0147 11.5 12.5M7 8C4.51472 8 2.5 10.0147 2.5 12.5" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round"/>
<Path d="M3.5 14.5C3.5 17.2643 5.73571 19.5 8.5 19.5L8 17.5" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round"/>
<Path d="M18.5 7.5C18.5 4.73571 16.2643 2.5 13.5 2.5L14 4.5" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round"/>
</Svg>
)
}

function DuotoneRounded({ size = defaultSize, color = defaultColor, strokeWidth = defaultStrokeWidth, className, style }: HugeIconProps) {
  return (<Svg className={className} style={style} width={size} height={size} viewBox="0 0 24 24" fill="none">
<Path opacity="0.4" d="M7 2.5C8.38071 2.5 9.5 3.61929 9.5 5C9.5 6.38071 8.38071 7.5 7 7.5C9.48528 7.5 11.5 9.51472 11.5 12H2.5C2.5 9.51472 4.51472 7.5 7 7.5C5.61929 7.5 4.5 6.38071 4.5 5C4.5 3.61929 5.61929 2.5 7 2.5Z" fill={color}/>
<Path opacity="0.4" d="M17 12C18.3807 12 19.5 13.1193 19.5 14.5C19.5 15.8807 18.3807 17 17 17C19.4853 17 21.5 19.0147 21.5 21.5H12.5C12.5 19.0147 14.5147 17 17 17C15.6193 17 14.5 15.8807 14.5 14.5C14.5 13.1193 15.6193 12 17 12Z" fill={color}/>
<Path d="M17 17C15.6193 17 14.5 15.8807 14.5 14.5C14.5 13.1193 15.6193 12 17 12C18.3807 12 19.5 13.1193 19.5 14.5C19.5 15.8807 18.3807 17 17 17ZM17 17C19.4853 17 21.5 19.0147 21.5 21.5M17 17C14.5147 17 12.5 19.0147 12.5 21.5" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round"/>
<Path d="M7 7.5C5.61929 7.5 4.5 6.38071 4.5 5C4.5 3.61929 5.61929 2.5 7 2.5C8.38071 2.5 9.5 3.61929 9.5 5C9.5 6.38071 8.38071 7.5 7 7.5ZM7 7.5C9.48528 7.5 11.5 9.51472 11.5 12M7 7.5C4.51472 7.5 2.5 9.51472 2.5 12" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round"/>
<Path d="M3.5 15.5C3.5 18.2643 5.73571 20.5 8.5 20.5L8 18.5" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round"/>
<Path d="M18.5 8.5C18.5 5.73571 16.2643 3.5 13.5 3.5L14 5.5" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round"/>
</Svg>
)
}
