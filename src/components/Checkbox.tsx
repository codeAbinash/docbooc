import Tick01Icon from '@assets/icons/hugeicons/Tick01Icon'
import Colors from '@utils/colors'
import { MEDIUM } from '@utils/fonts'
import { Text, TouchableOpacity, View } from 'react-native'

interface CheckboxProps {
  checked: boolean
  onPress: () => void
  label?: string
  size?: number
  checkmarkSize?: number
}

const Checkbox = ({ checked, onPress, label, size = 20, checkmarkSize = 16 }: CheckboxProps) => {
  return (
    <TouchableOpacity onPress={onPress} className='flex-row items-center gap-3 py-2'>
      <View
        className={`items-center justify-center rounded-md ${checked ? 'border-accent' : 'border-zinc-500/50'}`}
        style={{
          borderWidth: 1.5,
          height: size,
          width: size,
          backgroundColor: checked ? Colors.accent : 'transparent',
        }}
      >
        {checked && <Tick01Icon size={checkmarkSize} color='white' strokeWidth={2.5} />}
      </View>
      {label && (
        <Text className='text text-sm' style={MEDIUM}>
          {label}
        </Text>
      )}
    </TouchableOpacity>
  )
}

export default Checkbox
