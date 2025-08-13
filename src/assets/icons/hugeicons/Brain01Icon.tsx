
import React from 'react'
import Svg, { Circle, ClipPath, Defs, Ellipse, G, Line, LinearGradient, Mask, Path, Polygon, Polyline, RadialGradient, Rect, Stop } from 'react-native-svg'
import { Variant, HugeIconProps, defaultStrokeWidth, defaultVariant, defaultColor, defaultSize } from './constants'

const iconMap: Partial<Record<Variant, React.FC<HugeIconProps>>> = { 
	'stroke-rounded': StrokeRounded,
	'solid-rounded': SolidRounded,
	'twotone-rounded': TwotoneRounded,
	'duotone-rounded': DuotoneRounded,
}

export default function Brain01Icon({ variant, ...rest }: HugeIconProps) {
  const selectedVariant = variant || defaultVariant
  const Component = iconMap[selectedVariant] || iconMap[defaultVariant] || StrokeRounded
  return <Component {...rest} />
}

function StrokeRounded({ size = defaultSize, color = defaultColor, strokeWidth = defaultStrokeWidth, className, style }: HugeIconProps) {
  return (<Svg className={className} style={style} width={size} height={size} viewBox="0 0 24 24" fill="none">
<Path d="M15 8.5C13.3431 8.5 12 7.15685 12 5.5" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round"/>
<Path d="M12 5V19.5" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round"/>
<Path d="M20 16.5C20 14.8431 18.6569 13.5 17 13.5" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round"/>
<Path d="M4 16.5C4 14.8431 5.34315 13.5 7 13.5" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round"/>
<Path d="M16 19.5C16 20.6046 15.1046 21.5 14 21.5C12.8954 21.5 12 20.6046 12 19.5C12 20.6046 11.1046 21.5 10 21.5C8.89543 21.5 8 20.6046 8 19.5C8 19.4404 8.00466 19.3815 8.00977 19.3232C7.694 19.4362 7.35459 19.5 7 19.5C5.34315 19.5 4 18.1569 4 16.5C4 15.9246 4.16545 15.3892 4.44629 14.9326C3.28052 14.2336 2.5 12.9582 2.5 11.5C2.5 10.5452 2.8353 9.66916 3.39355 8.98145C3.14445 8.54412 3 8.03929 3 7.5C3 5.84315 4.34315 4.5 6 4.5C6.35951 4.5 6.70301 4.56666 7.02246 4.68262C7.17854 3.45191 8.22691 2.5 9.5 2.5C10.8807 2.5 12 3.61929 12 5C12 3.61929 13.1193 2.5 14.5 2.5C15.7731 2.5 16.8215 3.45191 16.9775 4.68262C17.297 4.56666 17.6405 4.5 18 4.5C19.6569 4.5 21 5.84315 21 7.5C21 8.03929 20.8555 8.54412 20.6064 8.98145C21.1647 9.66916 21.5 10.5452 21.5 11.5C21.5 12.9582 20.7195 14.2336 19.5537 14.9326C19.8346 15.3892 20 15.9246 20 16.5C20 18.1569 18.6569 19.5 17 19.5C16.6454 19.5 16.306 19.4362 15.9902 19.3232C15.9953 19.3815 16 19.4404 16 19.5Z" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round"/>
</Svg>
)
}

function SolidRounded({ size = defaultSize, color = defaultColor, strokeWidth = defaultStrokeWidth, className, style }: HugeIconProps) {
  return (<Svg className={className} style={style} width={size} height={size} viewBox="0 0 24 24" fill="none">
<Path d="M10 22.25C10.4513 22.25 10.8749 22.1376 11.25 21.9443L11.25 2.2627C10.7448 1.93886 10.1447 1.75 9.5 1.75C8.13353 1.75 6.96869 2.59321 6.48828 3.78613C6.32887 3.76471 6.16623 3.75 6 3.75C3.92893 3.75 2.25 5.42893 2.25 7.5C2.25 7.99669 2.34892 8.4697 2.52441 8.90234C2.03569 9.64865 1.75 10.5412 1.75 11.5C1.75 12.3895 1.99629 13.22 2.42188 13.9307C3.20534 12.538 4.60514 11.5386 6.25195 11.3037C6.66202 11.2452 7 11.5868 7 12.001C6.99978 12.4149 6.66072 12.7423 6.25488 12.8242C4.98194 13.0809 3.94387 13.9831 3.49316 15.1738L3.49512 15.1748C3.37182 15.498 3.29166 15.8429 3.2627 16.2031C3.25499 16.3013 3.25 16.4008 3.25 16.501C3.25053 18.5716 4.92926 20.25 7 20.25C7.11876 20.25 7.23597 20.2435 7.35156 20.2324C7.67243 21.3953 8.73512 22.25 10 22.25ZM14 22.25C15.2648 22.25 16.3265 21.3951 16.6475 20.2324C16.7634 20.2435 16.8809 20.25 17 20.25C19.0707 20.25 20.7495 18.5716 20.75 16.501C20.75 16.4008 20.744 16.3013 20.7363 16.2031C20.7071 15.843 20.6273 15.498 20.5039 15.1748L20.5059 15.1729C20.0549 13.9828 19.0176 13.0808 17.7451 12.8242C17.3393 12.7423 17.0002 12.4149 17 12.001C17 11.5868 17.338 11.2452 17.748 11.3037C19.3944 11.5386 20.7936 12.5376 21.5771 13.9297C22.0028 13.2192 22.25 12.3894 22.25 11.5C22.25 10.541 21.9635 9.64874 21.4746 8.90234C21.6502 8.46961 21.75 7.99682 21.75 7.5C21.75 5.42893 20.0711 3.75 18 3.75C17.8334 3.75 17.6705 3.76463 17.5107 3.78613C17.0302 2.59339 15.8663 1.75 14.5 1.75C13.8553 1.75 13.2552 1.93886 12.75 2.2627V5.5C12.75 6.74264 13.7574 7.75 15 7.75C15.4142 7.75 15.75 8.08579 15.75 8.5C15.75 8.91421 15.4142 9.25 15 9.25C14.1557 9.25 13.3768 8.97083 12.75 8.5L12.75 21.9443C13.1251 22.1376 13.5487 22.25 14 22.25Z" fill={color}/>
</Svg>
)
}

function TwotoneRounded({ size = defaultSize, color = defaultColor, strokeWidth = defaultStrokeWidth, className, style }: HugeIconProps) {
  return (<Svg className={className} style={style} width={size} height={size} viewBox="0 0 24 24" fill="none">
<Path opacity="0.4" d="M15 8.5C13.3431 8.5 12 7.15685 12 5.5" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round"/>
<Path d="M12 5V19.5" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round"/>
<Path opacity="0.4" d="M20 16.5C20 14.8431 18.6569 13.5 17 13.5" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round"/>
<Path opacity="0.4" d="M4 16.5C4 14.8431 5.34315 13.5 7 13.5" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round"/>
<Path d="M16 19.5C16 20.6046 15.1046 21.5 14 21.5C12.8954 21.5 12 20.6046 12 19.5C12 20.6046 11.1046 21.5 10 21.5C8.89543 21.5 8 20.6046 8 19.5C8 19.4404 8.00466 19.3815 8.00977 19.3232C7.694 19.4362 7.35459 19.5 7 19.5C5.34315 19.5 4 18.1569 4 16.5C4 15.9246 4.16545 15.3892 4.44629 14.9326C3.28052 14.2336 2.5 12.9582 2.5 11.5C2.5 10.5452 2.8353 9.66916 3.39355 8.98145C3.14445 8.54412 3 8.03929 3 7.5C3 5.84315 4.34315 4.5 6 4.5C6.35951 4.5 6.70301 4.56666 7.02246 4.68262C7.17854 3.45191 8.22691 2.5 9.5 2.5C10.8807 2.5 12 3.61929 12 5C12 3.61929 13.1193 2.5 14.5 2.5C15.7731 2.5 16.8215 3.45191 16.9775 4.68262C17.297 4.56666 17.6405 4.5 18 4.5C19.6569 4.5 21 5.84315 21 7.5C21 8.03929 20.8555 8.54412 20.6064 8.98145C21.1647 9.66916 21.5 10.5452 21.5 11.5C21.5 12.9582 20.7195 14.2336 19.5537 14.9326C19.8346 15.3892 20 15.9246 20 16.5C20 18.1569 18.6569 19.5 17 19.5C16.6454 19.5 16.306 19.4362 15.9902 19.3232C15.9953 19.3815 16 19.4404 16 19.5Z" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round"/>
</Svg>
)
}

function DuotoneRounded({ size = defaultSize, color = defaultColor, strokeWidth = defaultStrokeWidth, className, style }: HugeIconProps) {
  return (<Svg className={className} style={style} width={size} height={size} viewBox="0 0 24 24" fill="none">
<Path opacity="0.4" d="M16 19.5C16 20.6046 15.1046 21.5 14 21.5C12.8954 21.5 12 20.6046 12 19.5C12 20.6046 11.1046 21.5 10 21.5C8.89543 21.5 8 20.6046 8 19.5C8 19.4404 8.00466 19.3815 8.00977 19.3232C7.694 19.4362 7.35459 19.5 7 19.5C5.34315 19.5 4 18.1569 4 16.5C4 15.9246 4.16545 15.3892 4.44629 14.9326C3.28052 14.2336 2.5 12.9582 2.5 11.5C2.5 10.5452 2.8353 9.66916 3.39355 8.98145C3.14445 8.54412 3 8.03929 3 7.5C3 5.84315 4.34315 4.5 6 4.5C6.35951 4.5 6.70301 4.56666 7.02246 4.68262C7.17854 3.45191 8.22691 2.5 9.5 2.5C10.8807 2.5 12 3.61929 12 5C12 3.61929 13.1193 2.5 14.5 2.5C15.7731 2.5 16.8215 3.45191 16.9775 4.68262C17.297 4.56666 17.6405 4.5 18 4.5C19.6569 4.5 21 5.84315 21 7.5C21 8.03929 20.8555 8.54412 20.6064 8.98145C21.1647 9.66916 21.5 10.5452 21.5 11.5C21.5 12.9582 20.7195 14.2336 19.5537 14.9326C19.8346 15.3892 20 15.9246 20 16.5C20 18.1569 18.6569 19.5 17 19.5C16.6454 19.5 16.306 19.4362 15.9902 19.3232C15.9953 19.3815 16 19.4404 16 19.5Z" fill={color}/>
<Path d="M15 8.5C13.3431 8.5 12 7.15685 12 5.5" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round"/>
<Path d="M12 5V19.5" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round"/>
<Path d="M20 16.5C20 14.8431 18.6569 13.5 17 13.5" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round"/>
<Path d="M4 16.5C4 14.8431 5.34315 13.5 7 13.5" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round"/>
<Path d="M16 19.5C16 20.6046 15.1046 21.5 14 21.5C12.8954 21.5 12 20.6046 12 19.5C12 20.6046 11.1046 21.5 10 21.5C8.89543 21.5 8 20.6046 8 19.5C8 19.4404 8.00466 19.3815 8.00977 19.3232C7.694 19.4362 7.35459 19.5 7 19.5C5.34315 19.5 4 18.1569 4 16.5C4 15.9246 4.16545 15.3892 4.44629 14.9326C3.28052 14.2336 2.5 12.9582 2.5 11.5C2.5 10.5452 2.8353 9.66916 3.39355 8.98145C3.14445 8.54412 3 8.03929 3 7.5C3 5.84315 4.34315 4.5 6 4.5C6.35951 4.5 6.70301 4.56666 7.02246 4.68262C7.17854 3.45191 8.22691 2.5 9.5 2.5C10.8807 2.5 12 3.61929 12 5C12 3.61929 13.1193 2.5 14.5 2.5C15.7731 2.5 16.8215 3.45191 16.9775 4.68262C17.297 4.56666 17.6405 4.5 18 4.5C19.6569 4.5 21 5.84315 21 7.5C21 8.03929 20.8555 8.54412 20.6064 8.98145C21.1647 9.66916 21.5 10.5452 21.5 11.5C21.5 12.9582 20.7195 14.2336 19.5537 14.9326C19.8346 15.3892 20 15.9246 20 16.5C20 18.1569 18.6569 19.5 17 19.5C16.6454 19.5 16.306 19.4362 15.9902 19.3232C15.9953 19.3815 16 19.4404 16 19.5Z" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round"/>
</Svg>
)
}
