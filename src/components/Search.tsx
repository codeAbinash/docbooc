import CancelCircleIcon from '@hugeicons/CancelCircleIcon'
import Search01Icon from '@hugeicons/Search01Icon'
import Colors from '@utils/colors'
import { useRef } from 'react'
import { TextInput, TouchableOpacity, View, useColorScheme, type TextInputProps } from 'react-native'
import colors from 'tailwindcss/colors'

export default function Search({ onChangeText, value, placeholder = 'Search...', ...all }: TextInputProps) {
  const dark = useColorScheme() === 'dark'
  const ref = useRef<TextInput>(null)

  const clearText = () => {
    onChangeText?.('')
    ref.current?.focus()
  }

  return (
    <View className=' w-full rounded-xl bg-white dark:bg-neutral-800'>
      <View className='flex-row items-center px-1'>
        <View className='p-2 rounded-xl bg-blue-100/80 dark:bg-blue-900/20'>
          <Search01Icon size={24} color={dark ? Colors.accent : '#3b82f6'} variant='stroke-rounded' strokeWidth={2} />
        </View>
        <TextInput
          ref={ref}
          className=' flex-1 px-3 text-lg text-neutral-900 dark:text-white'
          placeholderTextColor={dark ? colors.neutral[400] : colors.neutral[500]}
          cursorColor={Colors.accent}
          selectionColor={dark ? '#3b82f680' : '#3b82f640'}
          selectionHandleColor={Colors.accent}
          placeholder={placeholder}
          value={value}
          onChangeText={onChangeText}
          {...all}
        />
        {value ? (
          <TouchableOpacity className='ml-2 rounded-full bg-neutral-100 p-2 dark:bg-neutral-900' activeOpacity={0.7} onPress={clearText}>
            <CancelCircleIcon color={dark ? colors.zinc[400] : colors.zinc[500]} size={18} variant='solid-rounded' />
          </TouchableOpacity>
        ) : null}
      </View>
    </View>
  )
}