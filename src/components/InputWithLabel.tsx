import { MEDIUM, Regular } from '@utils/fonts'
import { useColorScheme } from 'nativewind'
import { useState } from 'react'
import { TextInput, View, type TextInputProps } from 'react-native'
import colors from 'tailwindcss/colors'

interface InputWithLabelProps extends TextInputProps {
  label: string
  isOptional?: boolean
  leftIcon?: React.ReactNode
}

export default function InputWithLabel({ label, isOptional, value, leftIcon, ...props }: InputWithLabelProps) {
  const { colorScheme } = useColorScheme()
  const [isFocused, setIsFocused] = useState(false)

  const isDark = colorScheme === 'dark'
  const borderColor = isFocused ? '#2563eb' : isDark ? '#525252' : '#a3a3a3'

  return (
    <View className='gap-2'>
      <View className='flex-row items-center gap-1.5'>
        <Regular className='text-xs font-bold uppercase tracking-wide text-neutral-800 dark:text-neutral-200'>
          {label}
        </Regular>
        {isOptional && (
          <Regular className='text-xs font-medium text-neutral-500 dark:text-neutral-400'>(optional)</Regular>
        )}
      </View>

      <View
        className='flex-row items-center rounded-lg bg-white dark:bg-neutral-900'
        style={{
          borderWidth: 1,
          borderColor: borderColor,
        }}
      >
        {leftIcon && <View className='ml-4'>{leftIcon}</View>}

        <TextInput
          {...props}
          value={value}
          onFocus={(e) => {
            setIsFocused(true)
            props.onFocus?.(e)
          }}
          onBlur={(e) => {
            setIsFocused(false)
            props.onBlur?.(e)
          }}
          placeholder=''
          placeholderTextColor={isDark ? colors.neutral[600] : colors.neutral[400]}
          className={`flex-1 text-sm text-neutral-900 dark:text-white ${leftIcon ? 'pl-3' : 'px-4'} py-3 pr-4`}
          style={MEDIUM}
        />
      </View>
    </View>
  )
}
