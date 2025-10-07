
import React from 'react'
import Svg, { Circle, ClipPath, Defs, Ellipse, G, Line, LinearGradient, Mask, Path, Polygon, Polyline, RadialGradient, Rect, Stop } from 'react-native-svg'
import {type Variant, type HugeIconProps, defaultStrokeWidth, defaultVariant, defaultColor, defaultSize } from './constants'

const iconMap: Partial<Record<Variant, React.FC<HugeIconProps>>> = { 
	'stroke-rounded': StrokeRounded,
	'solid-rounded': SolidRounded,
	'twotone-rounded': TwotoneRounded,
	'duotone-rounded': DuotoneRounded,
}

export default function CallIcon({ variant, ...rest }: HugeIconProps) {
  const selectedVariant = variant || defaultVariant
  const Component = iconMap[selectedVariant] || iconMap[defaultVariant] || StrokeRounded
  return <Component {...rest} />
}

function StrokeRounded({ size = defaultSize, color = defaultColor, strokeWidth = defaultStrokeWidth, className, style }: HugeIconProps) {
  return (<Svg className={className} style={style} width={size} height={size} viewBox="0 0 24 24" fill="none">
<Path d="M4.91186 10.5413L7.55229 7.90088C8.09091 7.36227 8.27728 6.56642 8.05944 5.83652C7.8891 5.26577 7.69718 4.57964 7.56961 3.99292C7.45162 3.45027 6.97545 3 6.42012 3H4.91186C3.8012 3 2.88911 3.90384 3.01094 5.0078C3.93709 13.3996 10.6004 20.0629 18.9922 20.9891C20.0962 21.1109 21 20.1988 21 19.0881V17.5799C21 17.0246 20.5479 16.569 20.0015 16.4696C19.3988 16.36 18.7611 16.1804 18.2276 16.0103C17.4611 15.7659 16.6091 15.9377 16.0403 16.5065L13.4587 19.0881" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round"/>
</Svg>
)
}

function SolidRounded({ size = defaultSize, color = defaultColor, strokeWidth = defaultStrokeWidth, className, style }: HugeIconProps) {
  return (<Svg className={className} style={style} width={size} height={size} viewBox="0 0 24 24" fill="none">
<Path d="M18.7113 21.7333C20.4365 21.9235 21.7504 20.4991 21.7504 18.9103V17.4402C21.7504 16.3427 20.8838 15.563 19.9766 15.398C19.4468 15.3016 18.8692 15.1405 18.3685 14.9809C17.3063 14.6423 16.0861 14.8688 15.2504 15.7045L12.9863 17.9677C10.0284 16.4015 7.59805 13.9716 6.0321 11.0135L8.35427 8.69325C9.14302 7.90451 9.40355 6.75267 9.09311 5.71221C8.92932 5.16344 8.7507 4.52185 8.63419 3.98605C8.43906 3.08892 7.63769 2.25037 6.56051 2.25037H5.09047C3.50167 2.25037 2.07728 3.56423 2.26748 5.28948C3.22051 13.9249 10.0759 20.7802 18.7113 21.7333Z" fill={color}/>
</Svg>
)
}

function TwotoneRounded({ size = defaultSize, color = defaultColor, strokeWidth = defaultStrokeWidth, className, style }: HugeIconProps) {
  return (<Svg className={className} style={style} width={size} height={size} viewBox="0 0 24 24" fill="none">
<Path opacity="0.4" d="M4.91186 10.5413L7.55229 7.90088C8.09091 7.36227 8.27728 6.56642 8.05944 5.83652C7.8891 5.26577 7.69718 4.57964 7.56961 3.99292C7.45162 3.45027 6.97545 3 6.42012 3H4.91186C3.8012 3 2.88911 3.90384 3.01094 5.0078C3.47402 9.20369 5.37139 12.9675 8.20196 15.798C11.0325 18.6286 14.7963 20.526 18.9922 20.9891C20.0962 21.1109 21 20.1988 21 19.0881V17.5799C21 17.0246 20.5479 16.569 20.0015 16.4696C19.3988 16.36 18.7611 16.1804 18.2276 16.0103C17.4611 15.7659 16.6091 15.9377 16.0403 16.5065L13.4587 19.0881" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round"/>
<Path d="M13.4586 19.087L16.0402 16.5054C16.6091 15.9365 17.4611 15.7648 18.2275 16.0091C18.7611 16.1792 19.3987 16.3588 20.0015 16.4684C20.5478 16.5679 20.9999 17.0234 20.9999 17.5787V19.087C20.9999 20.1976 20.0961 21.1097 18.9921 20.9879C14.7963 20.5248 11.0325 18.6274 8.2019 15.7969" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round"/>
</Svg>
)
}

function DuotoneRounded({ size = defaultSize, color = defaultColor, strokeWidth = defaultStrokeWidth, className, style }: HugeIconProps) {
  return (<Svg className={className} style={style} width={size} height={size} viewBox="0 0 24 24" fill="none">
<G opacity="0.4">
<Path d="M21 17.5799V19.0881C21 20.1988 20.0962 21.1109 18.9922 20.9891C16.9295 20.7614 14.9713 20.1871 13.1769 19.3258L16.0403 16.5065C16.6091 15.9377 17.4611 15.7659 18.2276 16.0103C18.7611 16.1804 19.3988 16.36 20.0015 16.4696C20.5479 16.569 21 17.0246 21 17.5799Z" fill={color}/>
<Path d="M6.42012 3H4.91186C3.8012 3 2.88911 3.90384 3.01094 5.0078C3.23859 7.0705 3.81287 9.02878 4.67424 10.8231L7.55229 7.90088C8.09091 7.36227 8.27728 6.56642 8.05944 5.83652C7.8891 5.26577 7.69718 4.57964 7.56961 3.99292C7.45162 3.45027 6.97545 3 6.42012 3Z" fill={color}/>
</G>
<Path d="M4.91186 10.5413L7.55229 7.90088C8.09091 7.36227 8.27728 6.56642 8.05944 5.83652C7.8891 5.26577 7.69718 4.57964 7.56961 3.99292C7.45162 3.45027 6.97545 3 6.42012 3H4.91186C3.8012 3 2.88911 3.90384 3.01094 5.0078C3.93709 13.3996 10.6004 20.0629 18.9922 20.9891C20.0962 21.1109 21 20.1988 21 19.0881V17.5799C21 17.0246 20.5479 16.569 20.0015 16.4696C19.3988 16.36 18.7611 16.1804 18.2276 16.0103C17.4611 15.7659 16.6091 15.9377 16.0403 16.5065L13.4587 19.0881" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round"/>
</Svg>
)
}
