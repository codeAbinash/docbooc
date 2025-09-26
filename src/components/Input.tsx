import Colors from '@utils/colors'
import { SEMIBOLD } from '@utils/fonts'
import { TextInput, TextInputProps } from 'react-native'

export default function Input({ placeholder, style, ...props }: TextInputProps) {
  return (
    <TextInput
      className='b rounded-2xl bg-white text-sm placeholder:text-zinc-500 dark:bg-zinc-900 dark:text-white'
      placeholder={placeholder}
      style={[
        {
          ...SEMIBOLD,
          borderRadius: 12,
          paddingVertical: 16,
          paddingHorizontal: 16,
          paddingLeft: 18,
        },
        style,
      ]}
      selectionHandleColor={Colors.accent}
      selectionColor={Colors.accent + '77'}
      {...props}
    />
  )
}
