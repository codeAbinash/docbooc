
import React from 'react'
import Svg, { Circle, ClipPath, Defs, Ellipse, G, Line, LinearGradient, Mask, Path, Polygon, Polyline, RadialGradient, Rect, Stop } from 'react-native-svg'
import { Variant, HugeIconProps, defaultStrokeWidth, defaultVariant, defaultColor, defaultSize } from './constants'

const iconMap: Partial<Record<Variant, React.FC<HugeIconProps>>> = { 
	'stroke-rounded': StrokeRounded,
	'solid-rounded': SolidRounded,
	'twotone-rounded': TwotoneRounded,
	'duotone-rounded': DuotoneRounded,
}

export default function DoNotTouch01Icon({ variant, ...rest }: HugeIconProps) {
  const selectedVariant = variant || defaultVariant
  const Component = iconMap[selectedVariant] || iconMap[defaultVariant] || StrokeRounded
  return <Component {...rest} />
}

function StrokeRounded({ size = defaultSize, color = defaultColor, strokeWidth = defaultStrokeWidth, className, style }: HugeIconProps) {
  return (<Svg className={className} style={style} width={size} height={size} viewBox="0 0 24 24" fill="none">
<Path d="M17.5 22.0003V20.8357C17.5 19.913 17.9987 19.1864 18.5 18.5M8 22.0003C8 20.883 7.62579 19.527 6.93707 18.6472L3.33738 14.049C2.8758 13.4316 2.88907 12.5792 3.36965 11.9766C3.99772 11.189 5.16877 11.124 5.8797 11.8371L7.5 13.4625V7.5" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round"/>
<Path d="M13.5018 5.5C13.5018 4.67157 14.1733 4 15.0018 4C15.8302 4 16.5018 4.67157 16.5018 5.5V7.5M13.5018 5.5V3.5C13.5018 2.67157 12.8302 2 12.0018 2C11.1733 2 10.5018 2.67157 10.5018 3.5L10.502 5M13.5018 5.5V9.50024M10.502 5C10.5016 4.17187 9.83019 3.50117 9.00197 3.50064C8.17376 3.50011 8 4 8 4M10.502 5V6.50045M16.5018 12V7.5M16.5018 7.5C16.5018 6.67157 17.1733 6 18.0018 6C18.8302 6 19.5018 6.67157 19.5018 7.5V13.6668C19.5018 14.3812 19.5018 14.9897 19.49 15.5" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round"/>
<Path d="M2 2L22 22" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round"/>
</Svg>
)
}

function SolidRounded({ size = defaultSize, color = defaultColor, strokeWidth = defaultStrokeWidth, className, style }: HugeIconProps) {
  return (<Svg className={className} style={style} width={size} height={size} viewBox="0 0 24 24" fill="none">
<Path fillRule="evenodd" clipRule="evenodd" d="M1.29289 1.29289C1.68342 0.902369 2.31658 0.902369 2.70711 1.29289L22.7071 21.2929C23.0976 21.6834 23.0976 22.3166 22.7071 22.7071C22.3166 23.0976 21.6834 23.0976 21.2929 22.7071L1.29289 2.70711C0.902369 2.31658 0.902369 1.68342 1.29289 1.29289Z" fill={color}/>
<Path d="M16.8245 11.9998V4.66345C16.8245 3.95337 16.2489 3.37773 15.5388 3.37773C14.8287 3.37773 14.2531 3.95337 14.2531 4.66345V10.7169L20.1799 16.6437C20.1919 16.522 20.2018 16.3967 20.21 16.2673C20.2529 15.592 20.2529 14.7571 20.2529 13.6924V13.6924V6.55814C20.2529 5.84812 19.6773 5.27253 18.9673 5.27253C18.2572 5.27253 17.6816 5.84812 17.6816 6.55814V11.9998C17.6816 12.2311 17.4898 12.4186 17.2531 12.4186C17.0164 12.4186 16.8245 12.2311 16.8245 11.9998Z" fill={color}/>
<Path d="M18.2529 20.8354C18.2529 20.5076 18.3861 20.1713 18.6322 19.8903C18.7995 19.6994 19.0016 19.4593 19.1981 19.1974L7.39593 7.39526V13.6331C7.39593 13.8026 7.29136 13.9554 7.13105 14.0202C6.97074 14.0849 6.7863 14.0489 6.66384 13.9288L4.81206 12.1134C4.1804 11.4942 3.14033 11.5505 2.58203 12.2347C2.37404 12.4895 2.2644 12.7959 2.25391 13.1051C2.25821 13.2525 2.27578 13.3995 2.30666 13.5444C2.35509 13.7173 2.43637 13.8836 2.55066 14.0339L6.34937 19.1092C6.59183 19.4189 6.80009 19.8239 6.95634 20.2803C7.12928 20.7853 7.28285 21.2339 7.41725 21.548C7.54291 21.8417 7.72014 22.1987 8.03506 22.4238C8.32623 22.6318 8.65569 22.6956 8.9459 22.7233C9.22627 22.75 9.57436 22.75 9.96881 22.7499L16.37 22.75C16.4897 22.7501 16.6141 22.7502 16.7284 22.7353C17.516 22.633 18.1359 22.0131 18.2383 21.2255C18.2531 21.1112 18.253 20.9551 18.2529 20.8354Z" fill={color}/>
<Path d="M8.68176 2.75042C9.39191 2.75042 9.9676 3.32611 9.9676 4.03625V6.4314L7.40654 3.87034C7.48792 3.23856 8.02784 2.75042 8.68176 2.75042Z" fill={color}/>
<Path d="M12.1105 1.25C12.8207 1.25 13.3964 1.82571 13.3964 2.53587L13.396 9.85978L10.8247 7.28854V2.53581C10.8247 1.82568 11.4004 1.25 12.1105 1.25Z" fill={color}/>
</Svg>
)
}

function TwotoneRounded({ size = defaultSize, color = defaultColor, strokeWidth = defaultStrokeWidth, className, style }: HugeIconProps) {
  return (<Svg className={className} style={style} width={size} height={size} viewBox="0 0 24 24" fill="none">
<Path d="M17.5 22.0003V20.8357C17.5 19.913 17.9987 19.1864 18.5 18.5M8 22.0003C8 20.883 7.62579 19.527 6.93707 18.6472L3.33738 14.049C2.8758 13.4316 2.88907 12.5792 3.36965 11.9766C3.99772 11.189 5.16877 11.124 5.8797 11.8371L7.5 13.4625V7.5" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round"/>
<Path opacity="0.4" d="M13.5018 5.5C13.5018 4.67157 14.1733 4 15.0018 4C15.8302 4 16.5018 4.67157 16.5018 5.5V7.5M13.5018 5.5V3.5C13.5018 2.67157 12.8302 2 12.0018 2C11.1733 2 10.5018 2.67157 10.5018 3.5L10.502 5M13.5018 5.5V9.50024M10.502 5C10.5016 4.17187 9.83019 3.50117 9.00197 3.50064C8.17376 3.50011 8 4 8 4M10.502 5V6.50045M16.5018 12V7.5M16.5018 7.5C16.5018 6.67157 17.1733 6 18.0018 6C18.8302 6 19.5018 6.67157 19.5018 7.5V13.6668C19.5018 14.3812 19.5018 14.9897 19.49 15.5" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round"/>
<Path d="M2 2L22 22" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round"/>
</Svg>
)
}

function DuotoneRounded({ size = defaultSize, color = defaultColor, strokeWidth = defaultStrokeWidth, className, style }: HugeIconProps) {
  return (<Svg className={className} style={style} width={size} height={size} viewBox="0 0 24 24" fill="none">
<Path opacity="0.4" d="M6.93707 18.6471L3.33738 14.0489C2.8758 13.4315 2.88907 12.5791 3.36965 11.9765C3.99772 11.1889 5.16877 11.1239 5.8797 11.837L7.5 13.4624L7.50015 7.5L18.6694 18.6471C18.475 18.9144 18.2585 19.1756 18.0652 19.3964C17.7148 19.7964 17.5 20.3038 17.5 20.8356V22.0002H8C8 20.8829 7.62579 19.5269 6.93707 18.6471Z" fill={color}/>
<Path d="M17.5 22.0003V20.8357C17.5 19.913 17.9987 19.1864 18.5 18.5M8 22.0003C8 20.883 7.62579 19.527 6.93707 18.6472L3.33738 14.049C2.8758 13.4316 2.88907 12.5792 3.36965 11.9766C3.99772 11.189 5.16877 11.124 5.8797 11.8371L7.5 13.4625V7.5" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round"/>
<Path d="M13.5018 5.5C13.5018 4.67157 14.1733 4 15.0018 4C15.8302 4 16.5018 4.67157 16.5018 5.5V7.5M13.5018 5.5V3.5C13.5018 2.67157 12.8302 2 12.0018 2C11.1733 2 10.5018 2.67157 10.5018 3.5L10.502 5M13.5018 5.5V9.50024M10.502 5C10.5016 4.17187 9.83019 3.50117 9.00197 3.50064C8.17376 3.50011 8 4 8 4M10.502 5V6.50045M16.5018 12V7.5M16.5018 7.5C16.5018 6.67157 17.1733 6 18.0018 6C18.8302 6 19.5018 6.67157 19.5018 7.5V13.6668C19.5018 14.3812 19.5018 14.9897 19.49 15.5" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round"/>
<Path d="M2 2L22 22" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round"/>
</Svg>
)
}
