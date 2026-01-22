import Button from '@components/Button'
import HybridHead from '@components/HybridHead'
import InputWithLabel from '@components/InputWithLabel'
import Bone02Icon from '@hugeicons/Bone02Icon'
import Brain01Icon from '@hugeicons/Brain01Icon'
import Cardiogram02Icon from '@hugeicons/Cardiogram02Icon'
import DigestionIcon from '@hugeicons/DigestionIcon'
import FemaleSymbolIcon from '@hugeicons/FemaleSymbolIcon'
import Medicine02Icon from '@hugeicons/Medicine02Icon'
import PatientIcon from '@hugeicons/PatientIcon'
import { useMutation } from '@tanstack/react-query'
import { adminApi } from '@utils/client'
import { NavProp } from '@utils/types'
import { useState } from 'react'
import { TouchableOpacity, View } from 'react-native'
import colors from 'tailwindcss/colors'
import { DepartmentIcon } from './types'

export const ICONS: Record<DepartmentIcon, any> = {
  Medicine02Icon,
  Cardiogram02Icon,
  Bone02Icon,
  DigestionIcon,
  Brain01Icon,
  PatientIcon,
  FemaleSymbolIcon,
}

const iconList = Object.keys(ICONS) as DepartmentIcon[]

export default function AdminAddDepartment({ navigation }: NavProp) {
  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const [selectedIcon, setSelectedIcon] = useState<DepartmentIcon>('Medicine02Icon')

  const { mutate, isPending } = useMutation({
    mutationFn: async () =>
      await adminApi.departments.$post({
        json: {
          name,
          description,
          icon: selectedIcon,
        },
      }),
    mutationKey: ['add-department'],
  })

  return (
    <View className='flex-1 bg-white'>
      <HybridHead title='Add Department' showBackButton={true} />
      <View className='mt-5 gap-5'>
        <View className='gap-5 px-6'>
          <InputWithLabel
            label='Department Name'
            placeholder='Enter department name'
            value={name}
            onChangeText={setName}
          />
          <InputWithLabel
            label='Description'
            placeholder='Enter description'
            value={description}
            onChangeText={setDescription}
          />
        </View>

        <View className='mt-10 px-6'>
          <View className='flex-row flex-wrap items-center justify-center gap-4'>
            {iconList.map((iconName: DepartmentIcon) => {
              const IconComponent = ICONS[iconName]
              return (
                <TouchableOpacity
                  key={iconName}
                  className={`rounded-xl border-2 p-4 dark:border-zinc-800 ${selectedIcon === iconName ? 'border-blue-500' : 'border-zinc-200'}`}
                  onPress={() => setSelectedIcon(iconName)}
                >
                  <IconComponent size={30} color={colors.blue['500']} />
                </TouchableOpacity>
              )
            })}
          </View>
        </View>
        <Button className='mx-6 mt-10' onPress={() => mutate()} title='Add Department' disabled={isPending}></Button>
      </View>
    </View>
  )
}
