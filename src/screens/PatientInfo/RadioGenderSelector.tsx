import FemaleIcon from '@/assets/icons/female.svg'
import MaleIcon from '@/assets/icons/male.svg'
import OtherIcon from '@/assets/icons/other.svg'
import { SemiBold } from '@utils/fonts'
import React from 'react'
import { View } from 'react-native'
import { SvgProps } from 'react-native-svg'
import Press from '../../components/Press'

type Gender = 'male' | 'female' | 'other'

type RadioGenderSelectorProps = {
  selectedGender?: Gender
  onGenderChange: (gender: Gender) => void
}

const genderOptions: { value: Gender; label: string; icon: React.FC<SvgProps> }[] = [
  { value: 'male', label: 'Male', icon: MaleIcon },
  { value: 'female', label: 'Female', icon: FemaleIcon },
  { value: 'other', label: 'Other', icon: OtherIcon },
]

export default function RadioGenderSelector({ selectedGender, onGenderChange }: RadioGenderSelectorProps) {
  return (
    <View className='flex-row gap-3'>
      {genderOptions.map((option) => {
        const IconComponent = option.icon
        const isSelected = selectedGender === option.value

        return (
          <Press key={option.value} onPress={() => onGenderChange(option.value)} className='flex-1'>
            <View
              className={`items-center gap-3 rounded-2xl bg-white px-4 pb-3 pt-4 dark:bg-zinc-900 ${
                isSelected ? 'border-accent' : 'b'
              }`}
              style={{ borderWidth: isSelected ? 1.5 : 1 }}
            >
              <View className='py-2 pb-1'>
                <IconComponent width='60' height='60' />
              </View>
              <SemiBold className={`text-sm ${isSelected ? 'text-accent' : 'text'}`}>{option.label}</SemiBold>
            </View>
          </Press>
        )
      })}
    </View>
  )
}

export type { Gender }
