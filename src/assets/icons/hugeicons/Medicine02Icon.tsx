
import React from 'react'
import Svg, { Circle, ClipPath, Defs, Ellipse, G, Line, LinearGradient, Mask, Path, Polygon, Polyline, RadialGradient, Rect, Stop } from 'react-native-svg'
import { Variant, HugeIconProps, defaultStrokeWidth, defaultVariant, defaultColor, defaultSize } from './constants'

const iconMap: Partial<Record<Variant, React.FC<HugeIconProps>>> = { 
	'stroke-rounded': StrokeRounded,
	'solid-rounded': SolidRounded,
	'twotone-rounded': TwotoneRounded,
	'duotone-rounded': DuotoneRounded,
}

export default function Medicine02Icon({ variant, ...rest }: HugeIconProps) {
  const selectedVariant = variant || defaultVariant
  const Component = iconMap[selectedVariant] || iconMap[defaultVariant] || StrokeRounded
  return <Component {...rest} />
}

function StrokeRounded({ size = defaultSize, color = defaultColor, strokeWidth = defaultStrokeWidth, className, style }: HugeIconProps) {
  return (<Svg className={className} style={style} width={size} height={size} viewBox="0 0 24 24" fill="none">
<Path d="M20.1932 12.999C21.8501 15.8688 20.8669 19.5383 17.9971 21.1952C15.1273 22.8521 11.4578 21.8688 9.80094 18.999M20.1932 12.999C18.5364 10.1293 14.8669 9.14604 11.9971 10.8029C9.12734 12.4598 8.14409 16.1293 9.80094 18.999M20.1932 12.999L9.80094 18.999" stroke={color} strokeWidth={strokeWidth}/>
<Path d="M10.0428 5.54203L15.1278 2.5374C17 1.43112 19.394 2.08763 20.4749 4.00376C21.3433 5.54315 21.1 7.4272 20 8.6822M10.0428 5.54203L4.95785 8.54667C3.08563 9.65294 2.44415 12.1031 3.52508 14.0192C4.17499 15.1713 5.29956 15.868 6.5 16M10.0428 5.54203L11.5 8" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round"/>
</Svg>
)
}

function SolidRounded({ size = defaultSize, color = defaultColor, strokeWidth = defaultStrokeWidth, className, style }: HugeIconProps) {
  return (<Svg className={className} style={style} width={size} height={size} viewBox="0 0 24 24" fill="none">
<Path fillRule="evenodd" clipRule="evenodd" d="M14.5534 1.90584C16.8585 0.552612 19.7953 1.36512 21.1121 3.68436C22.1669 5.54206 21.8722 7.81297 20.5331 9.3309C20.1782 9.73323 19.5621 9.7735 19.1572 9.42085C18.7523 9.0682 18.7117 8.45617 19.0667 8.05384C19.8726 7.14032 20.0523 5.76102 19.4137 4.63628C18.6227 3.24318 16.8912 2.78374 15.5454 3.57383L11.4282 5.99094L12.351 7.53751C12.6257 7.99772 12.4728 8.59197 12.0096 8.8648C11.5464 9.13763 10.9483 8.98574 10.6737 8.52553L9.74938 6.97654L5.62974 9.39508C4.27021 10.1932 3.7878 11.9807 4.58598 13.3864C5.06201 14.2248 5.87851 14.7237 6.74391 14.8183C7.27917 14.8768 7.66536 15.3553 7.6065 15.8871C7.54764 16.4189 7.06601 16.8026 6.53076 16.7441C5.0553 16.5829 3.67888 15.732 2.88758 14.3384C1.57794 12.0318 2.34641 9.07227 4.63774 7.72709L14.5534 1.90584Z" fill={color}/>
<Path fillRule="evenodd" clipRule="evenodd" d="M19.8516 12.3318C20.1269 12.1729 20.2645 12.0934 20.2868 11.9521C20.3092 11.8107 20.2091 11.6996 20.0089 11.4773C17.9216 9.1604 14.4313 8.53361 11.6222 10.1555C8.81311 11.7773 7.61077 15.1134 8.57368 18.0794C8.66606 18.364 8.71224 18.5062 8.84585 18.5576C8.97945 18.6089 9.11706 18.5294 9.39229 18.3705L19.8516 12.3318ZM20.6018 13.6307C20.877 13.4718 21.0146 13.3924 21.1482 13.4437C21.2818 13.495 21.328 13.6372 21.4204 13.9217C22.384 16.888 21.1817 20.2248 18.3722 21.8468C15.5628 23.4688 12.0719 22.8417 9.98481 20.5241C9.78464 20.3018 9.68456 20.1906 9.70694 20.0493C9.72932 19.908 9.86691 19.8285 10.1421 19.6697L20.6018 13.6307Z" fill={color}/>
</Svg>
)
}

function TwotoneRounded({ size = defaultSize, color = defaultColor, strokeWidth = defaultStrokeWidth, className, style }: HugeIconProps) {
  return (<Svg className={className} style={style} width={size} height={size} viewBox="0 0 24 24" fill="none">
<Path d="M20.1932 12.999C21.8501 15.8688 20.8669 19.5383 17.9971 21.1952C15.1273 22.8521 11.4578 21.8688 9.80094 18.999M20.1932 12.999C18.5364 10.1293 14.8669 9.14604 11.9971 10.8029C9.12734 12.4598 8.14409 16.1293 9.80094 18.999M20.1932 12.999L9.80094 18.999" stroke={color} strokeWidth={strokeWidth}/>
<Path opacity="0.4" d="M10.0428 5.54203L15.1278 2.5374C17 1.43112 19.394 2.08763 20.4749 4.00376C21.3433 5.54315 21.1 7.4272 20 8.6822M10.0428 5.54203L4.95785 8.54667C3.08563 9.65294 2.44415 12.1031 3.52508 14.0192C4.17499 15.1713 5.29956 15.868 6.5 16M10.0428 5.54203L11.5 8" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round"/>
</Svg>
)
}

function DuotoneRounded({ size = defaultSize, color = defaultColor, strokeWidth = defaultStrokeWidth, className, style }: HugeIconProps) {
  return (<Svg className={className} style={style} width={size} height={size} viewBox="0 0 24 24" fill="none">
<Path opacity="0.4" d="M17.9971 21.1971C20.8669 19.5403 21.8501 15.8707 20.1933 13.001L9.80096 19.001C11.4578 21.8707 15.1274 22.854 17.9971 21.1971Z" fill={color}/>
<Path opacity="0.4" d="M7.58272 6.99312L4.95785 8.54413C3.08562 9.6504 2.44415 12.1005 3.52508 14.0167C4.17499 15.1687 5.29956 15.8654 6.5 15.9975L9.17607 14.5469C9.55671 13.0243 10.5306 11.652 11.9971 10.8053C12.3136 10.6226 12.6397 10.472 12.9719 10.3525L11.5 7.99746C10.6949 6.63939 8.94196 6.18996 7.58272 6.99312Z" fill={color}/>
<Path d="M10.0428 5.54203L15.1278 2.5374C17 1.43112 19.394 2.08763 20.4749 4.00376C21.3433 5.54315 21.1 7.4272 20 8.6822M10.0428 5.54203L4.95785 8.54667C3.08563 9.65294 2.44415 12.1031 3.52508 14.0192C4.17499 15.1713 5.29956 15.868 6.5 16M10.0428 5.54203L11.5 8" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round"/>
<Path d="M20.1932 13.001C21.8501 15.8708 20.8669 19.5403 17.9971 21.1972C15.1273 22.854 11.4578 21.8708 9.80094 19.001M20.1932 13.001C18.5364 10.1312 14.8669 9.148 11.9971 10.8048C9.12734 12.4617 8.14409 16.1312 9.80094 19.001M20.1932 13.001L9.80094 19.001" stroke={color} strokeWidth={strokeWidth}/>
</Svg>
)
}
