import Delete02Icon from '@assets/icons/hugeicons/Delete02Icon'
import { Medium, Regular } from '@utils/fonts'
import { memo } from 'react'
import { TouchableOpacity, View } from 'react-native'
import { ICONS } from '../AdminAddDepartment'
import { Department } from '../types'

export interface DepartmentCardProps {
  department: Department
  onPress: () => void
  onDelete?: (department: Department) => void
}

const DepartmentCard = memo(({ department, onPress, onDelete }: DepartmentCardProps) => {
  const iconName = department.icon || 'Medicine02Icon'
  const Icon = ICONS[iconName as keyof typeof ICONS]

  return (
    <TouchableOpacity activeOpacity={0.7} onPress={onPress} className='flex-1' style={{ padding: 12 }}>
      <View className='flex-1 rounded-2xl bg-blue-50' style={{ padding: 24, justifyContent: 'space-between' }}>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start' }}>
          <View
            className='rounded-md bg-blue-200'
            style={{
              width: 50,
              height: 50,
              borderRadius: 25,
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Icon size={28} />
          </View>
          {onDelete && (
            <View style={{ flexDirection: 'row', gap: 8 }}>
              <TouchableOpacity
                onPress={() => onDelete(department)}
                style={{ padding: 4 }}
                hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
              >
                <Delete02Icon size={18} color='#991b1b' />
              </TouchableOpacity>
            </View>
          )}
        </View>
        <View style={{ gap: 12 }} className='mt-2'>
          <Medium className='text-base text-blue-900'>{department.name}</Medium>
          <Regular className='text-xs leading-4 text-blue-700' numberOfLines={2}>
            {department.description || ''}
          </Regular>
        </View>
      </View>
    </TouchableOpacity>
  )
})

export default DepartmentCard

DepartmentCard.displayName = 'DepartmentCard'
