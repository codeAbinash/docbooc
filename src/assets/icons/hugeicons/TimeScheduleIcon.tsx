
import React from 'react'
import Svg, { Circle, ClipPath, Defs, Ellipse, G, Line, LinearGradient, Mask, Path, Polygon, Polyline, RadialGradient, Rect, Stop } from 'react-native-svg'
import {type Variant, type HugeIconProps, defaultStrokeWidth, defaultVariant, defaultColor, defaultSize } from './constants'

const iconMap: Partial<Record<Variant, React.FC<HugeIconProps>>> = { 
	'stroke-rounded': StrokeRounded,
	'solid-rounded': SolidRounded,
	'twotone-rounded': TwotoneRounded,
	'duotone-rounded': DuotoneRounded,
}

export default function TimeScheduleIcon({ variant, ...rest }: HugeIconProps) {
  const selectedVariant = variant || defaultVariant
  const Component = iconMap[selectedVariant] || iconMap[defaultVariant] || StrokeRounded
  return <Component {...rest} />
}

function StrokeRounded({ size = defaultSize, color = defaultColor, strokeWidth = defaultStrokeWidth, className, style }: HugeIconProps) {
  return (<Svg className={className} style={style} width={size} height={size} viewBox="0 0 24 24" fill="none">
<Path d="M12 8V12L13.5 13.5" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round"/>
<Path d="M19.5454 16.4534C21.1818 17.337 22 17.7789 22 18.5C22 19.2211 21.1818 19.663 19.5454 20.5466L18.4311 21.1484C17.1744 21.827 16.5461 22.1663 16.2439 21.9196C15.504 21.3154 16.6567 19.7561 16.9403 19.2037C17.2277 18.644 17.2225 18.3459 16.9403 17.7963C16.6567 17.2439 15.504 15.6846 16.2439 15.0804C16.5461 14.8337 17.1744 15.173 18.4311 15.8516L19.5454 16.4534Z" stroke={color} strokeWidth={strokeWidth}/>
<Path d="M13.0261 21.948C12.6888 21.9824 12.3464 22 12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12C22 12.6849 21.9311 13.3538 21.8 14" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round"/>
</Svg>
)
}

function SolidRounded({ size = defaultSize, color = defaultColor, strokeWidth = defaultStrokeWidth, className, style }: HugeIconProps) {
  return (<Svg className={className} style={style} width={size} height={size} viewBox="0 0 24 24" fill="none">
<Path fillRule="evenodd" clipRule="evenodd" d="M12 7C12.5523 7 13 7.44772 13 8V11.5858L14.2071 12.7929C14.5976 13.1834 14.5976 13.8166 14.2071 14.2071C13.8166 14.5976 13.1834 14.5976 12.7929 14.2071L11.2929 12.7071C11.1054 12.5196 11 12.2652 11 12V8C11 7.44772 11.4477 7 12 7Z" fill={color}/>
<Path d="M18.7423 15.1673L19.9574 15.8234C20.7281 16.2396 21.3844 16.594 21.8403 16.9406C22.3188 17.3044 22.75 17.7893 22.75 18.5C22.75 19.2107 22.3188 19.6956 21.8403 20.0594C21.3844 20.406 20.7281 20.7604 19.9574 21.1766L19.9574 21.1766L18.7423 21.8327C18.1526 22.1512 17.6489 22.4232 17.2548 22.5787C17.0514 22.6589 16.8203 22.7321 16.5842 22.7471C16.3297 22.7634 16.0298 22.7131 15.7696 22.5006C15.3536 22.1609 15.237 21.6937 15.2512 21.2916C15.2645 20.9142 15.3902 20.5445 15.52 20.2445C15.6539 19.9349 15.8198 19.6381 15.9604 19.3977C16.0173 19.3002 16.0666 19.2176 16.1091 19.1464L16.1091 19.1464C16.1828 19.0228 16.2359 18.9337 16.2732 18.8612C16.3957 18.6225 16.4041 18.5351 16.404 18.4985C16.4038 18.4612 16.3946 18.3754 16.2732 18.1388C16.2359 18.0663 16.1828 17.9772 16.1091 17.8536L16.1091 17.8536C16.0666 17.7824 16.0173 17.6998 15.9604 17.6023C15.8198 17.3619 15.6539 17.0651 15.52 16.7555C15.3902 16.4555 15.2645 16.0858 15.2512 15.7083C15.237 15.3063 15.3536 14.8391 15.7696 14.4994C16.0298 14.2869 16.3297 14.2366 16.5842 14.2529C16.8203 14.2679 17.0514 14.3411 17.2548 14.4213C17.6489 14.5768 18.1526 14.8488 18.7423 15.1673L18.7423 15.1673Z" fill={color}/>
<Path fillRule="evenodd" clipRule="evenodd" d="M12 3.20455C7.1424 3.20455 3.20455 7.1424 3.20455 12C3.20455 16.8576 7.1424 20.7955 12 20.7955C12.3054 20.7955 12.6069 20.7799 12.9037 20.7497C13.4406 20.6949 13.9203 21.0859 13.975 21.6228C14.0298 22.1598 13.6388 22.6394 13.1019 22.6941C12.7393 22.7311 12.3717 22.75 12 22.75C6.06294 22.75 1.25 17.9371 1.25 12C1.25 6.06294 6.06294 1.25 12 1.25C17.9371 1.25 22.75 6.06294 22.75 12C22.75 12.735 22.6761 13.4538 22.535 14.149C22.4276 14.6779 21.9118 15.0197 21.3828 14.9123C20.8539 14.8049 20.5121 14.2891 20.6195 13.7601C20.7348 13.1922 20.7955 12.6037 20.7955 12C20.7955 7.1424 16.8576 3.20455 12 3.20455Z" fill={color}/>
</Svg>
)
}

function TwotoneRounded({ size = defaultSize, color = defaultColor, strokeWidth = defaultStrokeWidth, className, style }: HugeIconProps) {
  return (<Svg className={className} style={style} width={size} height={size} viewBox="0 0 24 24" fill="none">
<Path d="M12 8V12L13.5 13.5" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round"/>
<Path opacity="0.4" d="M19.5454 16.4534C21.1818 17.337 22 17.7789 22 18.5C22 19.2211 21.1818 19.663 19.5454 20.5466L18.4311 21.1484C17.1744 21.827 16.5461 22.1663 16.2439 21.9196C15.504 21.3154 16.6567 19.7561 16.9403 19.2037C17.2277 18.644 17.2225 18.3459 16.9403 17.7963C16.6567 17.2439 15.504 15.6846 16.2439 15.0804C16.5461 14.8337 17.1744 15.173 18.4311 15.8516L19.5454 16.4534Z" stroke={color} strokeWidth={strokeWidth}/>
<Path d="M13.0261 21.948C12.6888 21.9824 12.3464 22 12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12C22 12.6849 21.9311 13.3538 21.8 14" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round"/>
</Svg>
)
}

function DuotoneRounded({ size = defaultSize, color = defaultColor, strokeWidth = defaultStrokeWidth, className, style }: HugeIconProps) {
  return (<Svg className={className} style={style} width={size} height={size} viewBox="0 0 24 24" fill="none">
<Path opacity="0.4" d="M20.632 17.0519C21.5015 15.5693 22 13.8429 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22C13.4284 22 14.7868 21.7005 16.016 21.1609C16.0973 20.6317 16.4723 20.0022 16.7354 19.5607C16.8196 19.4193 16.8924 19.2971 16.9403 19.2037C17.2277 18.644 17.2225 18.3459 16.9403 17.7963C16.8924 17.7029 16.8196 17.5807 16.7354 17.4393C16.3211 16.744 15.6291 15.5824 16.2439 15.0804C16.5461 14.8337 17.1744 15.173 18.4311 15.8516L19.5454 16.4534C19.9602 16.6773 20.3223 16.8729 20.632 17.0519Z" fill={color}/>
<Path d="M12 8V12L13.5 13.5" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round"/>
<Path d="M19.5454 16.4534C21.1818 17.337 22 17.7789 22 18.5C22 19.2211 21.1818 19.663 19.5454 20.5466L18.4311 21.1484C17.1744 21.827 16.5461 22.1663 16.2439 21.9196C15.504 21.3154 16.6567 19.7561 16.9403 19.2037C17.2277 18.644 17.2225 18.3459 16.9403 17.7963C16.6567 17.2439 15.504 15.6846 16.2439 15.0804C16.5461 14.8337 17.1744 15.173 18.4311 15.8516L19.5454 16.4534Z" stroke={color} strokeWidth={strokeWidth}/>
<Path d="M13.0261 21.948C12.6888 21.9824 12.3464 22 12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12C22 12.6849 21.9311 13.3538 21.8 14" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round"/>
</Svg>
)
}
