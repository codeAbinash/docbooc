import { View, TextInput, type TextInputProps } from 'react-native'
import { Regular } from '@utils/fonts'
import { useState } from 'react'
import { useColorScheme } from 'nativewind'
import colors from 'tailwindcss/colors'

interface InputWithLabelProps extends TextInputProps {
  label: string
  leftIcon?: React.ReactNode
}

export default function InputWithLabel({ label, value, leftIcon, ...props }: InputWithLabelProps) {
  const { colorScheme } = useColorScheme()
  const [isFocused, setIsFocused] = useState(false)
  
  const isDark = colorScheme === 'dark'
  const showLabel = isFocused || (value?.length ?? 0) > 0
  const borderClass = isFocused 
    ? 'border-2 border-blue-600 dark:border-green-500' 
    : 'border border-neutral-400 dark:border-neutral-600'

  return (
    <View className='relative'>
      <View className={`flex-row items-center rounded-lg ${borderClass} bg-current dark:bg-neutral-900`}>
        {leftIcon && <View className='ml-4'>{leftIcon}</View>}
        
        <TextInput
          {...props}
          value={value}
          onFocus={e => { setIsFocused(true); props.onFocus?.(e) }}
          onBlur={e => { setIsFocused(false); props.onBlur?.(e) }}
          placeholder={showLabel ? '' : label}
          placeholderTextColor={isDark ? colors.black : colors.neutral[500]}
          className={`flex-1 py-4 text-base dark:text-white ${leftIcon ? 'pl-3 pr-4' : 'px-4'}`}
          style={{ fontFamily: 'DMSans-Regular' }}
        />
      </View>

      {showLabel && (
        <View className={`absolute ${leftIcon ? 'left-14' : 'left-3'} -top-2.5 bg-white dark:bg-neutral-900 px-1.5`}>
          <Regular className='text-sm text-blue-600 dark:text-green-500'>{label}</Regular>
        </View>
      )}
    </View>
  )
}