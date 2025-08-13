
import React from 'react'
import Svg, { Circle, ClipPath, Defs, Ellipse, G, Line, LinearGradient, Mask, Path, Polygon, Polyline, RadialGradient, Rect, Stop } from 'react-native-svg'
import { Variant, HugeIconProps, defaultStrokeWidth, defaultVariant, defaultColor, defaultSize } from './constants'

const iconMap: Partial<Record<Variant, React.FC<HugeIconProps>>> = { 
	'stroke-rounded': StrokeRounded,
	'solid-rounded': SolidRounded,
	'twotone-rounded': TwotoneRounded,
	'duotone-rounded': DuotoneRounded,
}

export default function DigestionIcon({ variant, ...rest }: HugeIconProps) {
  const selectedVariant = variant || defaultVariant
  const Component = iconMap[selectedVariant] || iconMap[defaultVariant] || StrokeRounded
  return <Component {...rest} />
}

function StrokeRounded({ size = defaultSize, color = defaultColor, strokeWidth = defaultStrokeWidth, className, style }: HugeIconProps) {
  return (<Svg className={className} style={style} width={size} height={size} viewBox="0 0 24 24" fill="none">
<Path d="M9.48457 2C9.72845 3.49019 10.4411 4.57432 12.475 3.87202C16.6773 2.42099 19.9986 6.8491 19.9986 10.8C19.9986 14.7765 17.353 18 14.0895 18H13.0247C10.492 18 8.27593 19.6321 7.45312 22" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round"/>
<Path d="M6.0058 2V2.77557C6.0058 6.57844 11.4279 9.38737 9.63736 13.1999C8.92581 14.715 4.89483 17.2931 4 22" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round"/>
<Path d="M14 7C14.9576 7.29708 15.711 8.04937 16 9" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round"/>
</Svg>
)
}

function SolidRounded({ size = defaultSize, color = defaultColor, strokeWidth = defaultStrokeWidth, className, style }: HugeIconProps) {
  return (<Svg className={className} style={style} width={size} height={size} viewBox="0 0 24 24" fill="none">
<Path fillRule="evenodd" clipRule="evenodd" d="M5.15185 2.41779C5.14387 2.52328 5.1439 2.66343 5.14392 2.77558C5.14392 3.90719 5.55064 4.92655 6.06536 5.83905C6.44574 6.51341 6.91711 7.18039 7.35846 7.80489C7.50401 8.01084 7.64629 8.21217 7.78097 8.40762C8.93119 10.0768 9.57733 11.3926 8.87322 12.8811C8.7661 13.1076 8.50869 13.4295 8.06392 13.9097C7.92094 14.064 7.75868 14.2348 7.58441 14.4181L7.58415 14.4184L7.58414 14.4184C7.26035 14.759 6.89518 15.1433 6.53541 15.5469C5.40428 16.816 4.14415 18.4696 3.45892 20.6011C3.38862 20.8194 3.29727 21.103 3.26617 21.3194C3.22734 21.5897 3.24455 21.9243 3.47489 22.2374C3.71332 22.5614 4.04572 22.6728 4.31316 22.7151C4.53595 22.7503 4.8045 22.7501 5.05365 22.75L6.66696 22.75C6.81175 22.7501 6.96939 22.7501 7.10531 22.737C7.26105 22.7219 7.46407 22.6843 7.66474 22.5596C7.87627 22.4282 8.00213 22.2472 8.08094 22.1166C8.15477 21.9943 8.24001 21.8201 8.3128 21.6713C9.17392 19.9123 10.9626 18.75 12.9706 18.75H14.0431C17.8799 18.75 20.75 15.0453 20.75 10.8C20.75 8.63452 19.8408 6.35344 18.3393 4.79232C16.8179 3.21061 14.626 2.32125 12.1705 3.1631C11.4474 3.41099 11.0578 3.3552 10.8528 3.2618C10.6545 3.17146 10.4699 2.97334 10.3223 2.56831C10.2524 2.37634 10.1749 2.16364 10.1055 2.01507C10.036 1.86622 9.91501 1.63932 9.68161 1.47674C9.4656 1.32627 9.23875 1.28261 9.06908 1.26528C8.91857 1.24991 8.74186 1.24996 8.57611 1.25L6.66178 1.25001C6.54884 1.24998 6.42635 1.24996 6.32009 1.25788C6.20017 1.26683 6.04135 1.28889 5.8748 1.3653C5.60338 1.48982 5.38546 1.70619 5.26004 1.97568C5.18308 2.14103 5.16086 2.29872 5.15185 2.41779ZM14.2966 6.04517C13.7691 5.88153 13.2088 6.17647 13.0452 6.70396C12.8815 7.23144 13.1765 7.79171 13.704 7.95536C14.3493 8.15556 14.8522 8.66208 15.0435 9.29117C15.2042 9.81957 15.7628 10.1177 16.2912 9.95702C16.8196 9.79635 17.1177 9.23776 16.957 8.70936C16.5702 7.43719 15.5664 6.43913 14.2966 6.04517Z" fill={color}/>
</Svg>
)
}

function TwotoneRounded({ size = defaultSize, color = defaultColor, strokeWidth = defaultStrokeWidth, className, style }: HugeIconProps) {
  return (<Svg className={className} style={style} width={size} height={size} viewBox="0 0 24 24" fill="none">
<Path d="M9.48456 2C9.72844 3.49019 10.4411 4.57432 12.475 3.87202C16.6773 2.42099 19.9986 6.8491 19.9986 10.8C19.9986 14.7765 17.353 18 14.0895 18H13.0247C10.492 18 8.27592 19.6321 7.45312 22" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round"/>
<Path d="M6.00579 2V2.77557C6.00579 6.57844 11.4279 9.38737 9.63735 13.1999C8.92581 14.715 4.89482 17.2931 3.99999 22" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round"/>
<Path opacity="0.4" d="M14 7C14.9576 7.29708 15.7109 8.04937 16 9" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round"/>
</Svg>
)
}

function DuotoneRounded({ size = defaultSize, color = defaultColor, strokeWidth = defaultStrokeWidth, className, style }: HugeIconProps) {
  return (<Svg className={className} style={style} width={size} height={size} viewBox="0 0 24 24" fill="none">
<Path opacity="0.4" d="M14.0914 18C17.3549 18 20.0005 14.7765 20.0005 10.8C20.0005 6.8491 16.6793 2.42099 12.477 3.87202C10.4431 4.57432 9.7304 3.49019 9.48652 2H6.0058V2.77557C6.0058 6.57844 11.4279 9.38737 9.63736 13.1999C8.92581 14.715 4.89483 17.2931 4 22H7.45508C8.27788 19.6321 10.494 18 13.0267 18H14.0914Z" fill={color}/>
<Path d="M9.48652 2C9.73039 3.49019 10.4431 4.57432 12.477 3.87202C16.6792 2.42099 20.0005 6.8491 20.0005 10.8C20.0005 14.7765 17.3549 18 14.0914 18H13.0266C10.494 18 8.27788 19.6321 7.45507 22" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round"/>
<Path d="M6.0058 2V2.77557C6.0058 6.57844 11.4279 9.38737 9.63736 13.1999C8.92581 14.715 4.89483 17.2931 4 22" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round"/>
<Path d="M14 7C14.9576 7.29708 15.711 8.04937 16 9" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round"/>
</Svg>
)
}
