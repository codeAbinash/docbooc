
import React from 'react'
import Svg, { Circle, ClipPath, Defs, Ellipse, G, Line, LinearGradient, Mask, Path, Polygon, Polyline, RadialGradient, Rect, Stop } from 'react-native-svg'
import { Variant, HugeIconProps, defaultStrokeWidth, defaultVariant, defaultColor, defaultSize } from './constants'

const iconMap: Partial<Record<Variant, React.FC<HugeIconProps>>> = { 
	'stroke-rounded': StrokeRounded,
	'solid-rounded': SolidRounded,
	'twotone-rounded': TwotoneRounded,
	'duotone-rounded': DuotoneRounded,
}

export default function PatientIcon({ variant, ...rest }: HugeIconProps) {
  const selectedVariant = variant || defaultVariant
  const Component = iconMap[selectedVariant] || iconMap[defaultVariant] || StrokeRounded
  return <Component {...rest} />
}

function StrokeRounded({ size = defaultSize, color = defaultColor, strokeWidth = defaultStrokeWidth, className, style }: HugeIconProps) {
  return (<Svg className={className} style={style} width={size} height={size} viewBox="0 0 24 24" fill="none">
<Path d="M20 21.9999V18.9999C20 16.1715 20 14.7572 19.1213 13.8786C18.2426 12.9999 16.8284 12.9999 14 12.9999H10C7.17157 12.9999 5.75736 12.9999 4.87868 13.8786C4 14.7572 4 16.1715 4 18.9999C4 19.9318 4 20.3977 4.15224 20.7652C4.35523 21.2553 4.74458 21.6446 5.23463 21.8476C5.60218 21.9999 6.06812 21.9999 7 21.9999" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round"/>
<Path d="M9.5 12.9999L12.5 21.9999M7 13.4999V21.9999" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round"/>
<Path d="M12 18.9999H14.5C15.3284 18.9999 16 19.6715 16 20.4999C16 21.3283 15.3284 21.9999 14.5 21.9999H12.5" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round"/>
<Path d="M15.5 6.49997V5.49997C15.5 3.56697 13.933 1.99997 12 1.99997C10.067 1.99997 8.5 3.56697 8.5 5.49997V6.49997C8.5 8.43297 10.067 9.99997 12 9.99997C13.933 9.99997 15.5 8.43297 15.5 6.49997Z" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round"/>
</Svg>
)
}

function SolidRounded({ size = defaultSize, color = defaultColor, strokeWidth = defaultStrokeWidth, className, style }: HugeIconProps) {
  return (<Svg className={className} style={style} width={size} height={size} viewBox="0 0 24 24" fill="none">
<Path d="M14.0549 12.2499C15.4225 12.2499 16.5248 12.2498 17.3918 12.3664C18.2919 12.4874 19.0497 12.7463 19.6517 13.3482C20.2536 13.9501 20.5125 14.708 20.6335 15.6081C20.75 16.4751 20.75 17.5774 20.75 18.945V21.9999C20.75 22.4141 20.4142 22.7499 20 22.7499C19.5858 22.7499 19.25 22.4141 19.25 21.9999V18.9999C19.25 17.5645 19.2484 16.5633 19.1469 15.808C19.0482 15.0742 18.8678 14.6857 18.591 14.4089C18.3142 14.1321 17.9257 13.9517 17.1919 13.853C16.4365 13.7515 15.4354 13.7499 14 13.7499H10C8.56459 13.7499 7.56347 13.7515 6.80812 13.853C6.07435 13.9517 5.68577 14.1321 5.40901 14.4089C5.13225 14.6857 4.9518 15.0742 4.85315 15.808C4.75159 16.5633 4.75 17.5645 4.75 18.9999C4.75 19.4761 4.75041 19.7957 4.76729 20.0431C4.78372 20.2839 4.81319 20.4011 4.84515 20.4782C4.97202 20.7845 5.21536 21.0279 5.52165 21.1547C5.5988 21.1867 5.71602 21.2162 5.95674 21.2326C6.20421 21.2495 6.5238 21.2499 7 21.2499C7.41422 21.2499 7.75 21.5857 7.75 21.9999C7.75 22.4141 7.41422 22.7499 7 22.7499H6.97474C6.53028 22.7499 6.15925 22.7499 5.85464 22.7291C5.53754 22.7075 5.23801 22.6608 4.94762 22.5405C4.27379 22.2614 3.73844 21.7261 3.45933 21.0523C3.33905 20.7619 3.29241 20.4623 3.27077 20.1452C3.24999 19.8406 3.24999 19.3895 3.25 18.945V18.945C3.24998 17.5774 3.24996 16.4751 3.36652 15.6081C3.48754 14.708 3.74643 13.9501 4.34835 13.3482C4.95027 12.7463 5.70814 12.4874 6.60825 12.3664C7.47521 12.2498 8.57753 12.2499 9.94511 12.2499H9.94513H14.0549H14.0549Z" fill={color}/>
<Path d="M9.35291 12.2645C9.72381 12.1903 10.0919 12.4039 10.2115 12.7628L13.2115 21.7628C13.2877 21.9915 13.2494 22.2429 13.1084 22.4385C12.9675 22.634 12.7411 22.7499 12.5 22.7499H7C6.58579 22.7499 6.25 22.4142 6.25 21.9999V13.4999C6.25 13.1424 6.50234 12.8346 6.85291 12.7645L9.35291 12.2645Z" fill={color}/>
<Path fillRule="evenodd" clipRule="evenodd" d="M11.25 18.9999C11.25 18.5857 11.5858 18.2499 12 18.2499H14.5C15.7426 18.2499 16.75 19.2572 16.75 20.4999C16.75 21.7425 15.7426 22.7499 14.5 22.7499H12.5C12.0858 22.7499 11.75 22.4141 11.75 21.9999C11.75 21.5857 12.0858 21.2499 12.5 21.2499H14.5C14.9142 21.2499 15.25 20.9141 15.25 20.4999C15.25 20.0857 14.9142 19.7499 14.5 19.7499H12C11.5858 19.7499 11.25 19.4141 11.25 18.9999Z" fill={color}/>
<Path d="M7.75 5.49997C7.75 3.15276 9.65279 1.24997 12 1.24997C14.3472 1.24997 16.25 3.15276 16.25 5.49997V6.49997C16.25 8.84718 14.3472 10.75 12 10.75C9.65279 10.75 7.75 8.84718 7.75 6.49997V5.49997Z" fill={color}/>
</Svg>
)
}

function TwotoneRounded({ size = defaultSize, color = defaultColor, strokeWidth = defaultStrokeWidth, className, style }: HugeIconProps) {
  return (<Svg className={className} style={style} width={size} height={size} viewBox="0 0 24 24" fill="none">
<Path d="M20 21.9999V18.9999C20 16.1715 20 14.7572 19.1213 13.8786C18.2426 12.9999 16.8284 12.9999 14 12.9999H10C7.17157 12.9999 5.75736 12.9999 4.87868 13.8786C4 14.7572 4 16.1715 4 18.9999C4 19.9318 4 20.3977 4.15224 20.7652C4.35523 21.2553 4.74458 21.6446 5.23463 21.8476C5.60218 21.9999 6.06812 21.9999 7 21.9999" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round"/>
<Path d="M9.5 12.9999L12.5 21.9999M7 13.4999V21.9999" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round"/>
<Path d="M12 18.9999H14.5C15.3284 18.9999 16 19.6715 16 20.4999C16 21.3283 15.3284 21.9999 14.5 21.9999H12.5" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round"/>
<Path opacity="0.4" d="M15.5 6.49997V5.49997C15.5 3.56697 13.933 1.99997 12 1.99997C10.067 1.99997 8.5 3.56697 8.5 5.49997V6.49997C8.5 8.43297 10.067 9.99997 12 9.99997C13.933 9.99997 15.5 8.43297 15.5 6.49997Z" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round"/>
</Svg>
)
}

function DuotoneRounded({ size = defaultSize, color = defaultColor, strokeWidth = defaultStrokeWidth, className, style }: HugeIconProps) {
  return (<Svg className={className} style={style} width={size} height={size} viewBox="0 0 24 24" fill="none">
<Path opacity="0.4" d="M12.5 21.9999L9.5 12.9999L7 13.4999V21.9999H12.5Z" fill={color}/>
<Path opacity="0.4" d="M15.5 6.49994V5.49994C15.5 3.56694 13.933 1.99994 12 1.99994C10.067 1.99994 8.5 3.56694 8.5 5.49994V6.49994C8.5 8.43294 10.067 9.99994 12 9.99994C13.933 9.99994 15.5 8.43294 15.5 6.49994Z" fill={color}/>
<Path d="M20 21.9999V18.9999C20 16.1715 20 14.7572 19.1213 13.8786C18.2426 12.9999 16.8284 12.9999 14 12.9999H10C7.17157 12.9999 5.75736 12.9999 4.87868 13.8786C4 14.7572 4 16.1715 4 18.9999C4 19.9318 4 20.3977 4.15224 20.7652C4.35523 21.2553 4.74458 21.6446 5.23463 21.8476C5.60218 21.9999 6.06812 21.9999 7 21.9999" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round"/>
<Path d="M9.5 12.9999L12.5 21.9999M7 13.4999V21.9999" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round"/>
<Path d="M12 18.9999H14.5C15.3284 18.9999 16 19.6715 16 20.4999C16 21.3283 15.3284 21.9999 14.5 21.9999H12.5" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round"/>
<Path d="M15.5 6.49997V5.49997C15.5 3.56697 13.933 1.99997 12 1.99997C10.067 1.99997 8.5 3.56697 8.5 5.49997V6.49997C8.5 8.43297 10.067 9.99997 12 9.99997C13.933 9.99997 15.5 8.43297 15.5 6.49997Z" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round"/>
</Svg>
)
}
