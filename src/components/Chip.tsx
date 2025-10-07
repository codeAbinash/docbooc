import Press from '@components/Press'
import { HugeIconProps } from '@hugeicons/constants'
import Colors from '@utils/colors'
import { Medium, SemiBold } from '@utils/fonts'
import { useColorScheme } from 'nativewind'
import React from 'react'

type ChipProps = {
  label: string
  icon: React.ComponentType<HugeIconProps>
  isActive?: boolean
  onPress?: () => void
}

const Chip = ({ label, icon: IconComponent, isActive = false, onPress }: ChipProps) => {
  const { colorScheme } = useColorScheme()
  const dark = colorScheme === 'dark'

  return (
    <Press
      onPress={onPress}
      className={`flex-row p-1 ${isActive ? 'bg-accent/10' : ''} items-center gap-2 rounded-xl px-5 py-3.5 pr-6`}
    >
      <IconComponent
        color={isActive ? Colors.accent : dark ? Colors.text.dark + 'aa' : Colors.text.DEFAULT + 'aa'}
        size={20}
        strokeWidth={2}
      />
      {isActive ? (
        <SemiBold style={{ color: Colors.accent }}>{label}</SemiBold>
      ) : (
        <Medium style={{ color: dark ? Colors.text.dark + 'aa' : Colors.text.DEFAULT + 'aa' }}>{label}</Medium>
      )}
    </Press>
  )
}

export default Chip
