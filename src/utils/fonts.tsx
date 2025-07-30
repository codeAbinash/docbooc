import { StyleSheet, Text, type TextProps } from 'react-native'

export const BLACK = {
  fontFamily: 'Inter-Black',
}
export const BOLD = {
  fontFamily: 'Inter-Bold',
}
export const LIGHT = {
  fontFamily: 'Inter-Light',
}
export const MEDIUM = {
  fontFamily: 'Inter-Medium',
}
export const REGULAR = {
  fontFamily: 'Inter-Regular',
}
export const SEMIBOLD = {
  fontFamily: 'Inter-SemiBold',
}

export function Light({ children, style, ...props }: TextProps) {
  return (
    <Text style={[LIGHT, style]} {...props}>
      {children}
    </Text>
  )
}

export function Regular({ children, style, ...props }: TextProps) {
  return (
    <Text style={[REGULAR, style]} {...props}>
      {children}
    </Text>
  )
}

export function Medium({ children, style, ...props }: TextProps) {
  return (
    <Text style={[MEDIUM, style]} {...props}>
      {children}
    </Text>
  )
}

export function SemiBold({ children, style, ...props }: TextProps) {
  return (
    <Text style={[SEMIBOLD, style]} {...props}>
      {children}
    </Text>
  )
}

export function Bold({ children, style, ...props }: TextProps) {
  return (
    <Text style={[BOLD, style]} {...props}>
      {children}
    </Text>
  )
}

export function Black({ children, style, ...props }: TextProps) {
  return (
    <Text style={[BLACK, style]} {...props}>
      {children}
    </Text>
  )
}

export const F = StyleSheet.create({
  F9: {
    fontSize: 9,
    lineHeight: 12,
  },
  F9_5: {
    fontSize: 9.5,
    lineHeight: 12,
  },
  F10: {
    fontSize: 10,
  },
  F10_5: {
    fontSize: 10.5,
  },
  F11: {
    fontSize: 11,
  },
  F11_5: {
    fontSize: 11.5,
  },
  F12: {
    fontSize: 12,
    lineHeight: 18,
  },
  F12_5: {
    fontSize: 12.5,
    lineHeight: 18,
  },
  F13: {
    fontSize: 13,
  },
})
