import { View, TouchableOpacity } from 'react-native'
import { memo } from 'react'
import { Medium, Regular } from '@utils/fonts'

const DEPARTMENT_COLORS = [
  'bg-blue-50 text-blue-900',
  'bg-purple-50 text-purple-900',
  'bg-green-50 text-green-900',
  'bg-orange-50 text-orange-900',
  'bg-pink-50 text-pink-900',
  'bg-indigo-50 text-indigo-900',
  'bg-teal-50 text-teal-900',
  'bg-cyan-50 text-cyan-900',
] as const

type DepartmentItem = {
  id: number | string
  name: string
  description: string
  icon?: any
}

interface DepartmentCardProps {
  item: DepartmentItem
  index: number
  onPress: () => void
}

const DepartmentCard = memo(({ item, index, onPress }: DepartmentCardProps) => {
  const IconComponent = item.icon
  const colorClass = DEPARTMENT_COLORS[index % DEPARTMENT_COLORS.length]!
  const [bgClass, textClass] = colorClass.split(' ') as [string, string]

  return (
    <TouchableOpacity activeOpacity={0.7} onPress={onPress} className='flex-1' style={{ padding: 12 }}>
      <View className={`rounded-2xl ${bgClass} flex-1`} style={{ padding: 24, justifyContent: 'space-between' }}>
        {IconComponent && (
          <View
            className={bgClass.replace('50', '200')}
            style={{
              width: 50,
              height: 50,
              borderRadius: 25,
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <IconComponent size={28} className={textClass} />
          </View>
        )}
        <View style={{ gap: 12 }}>
          <Medium className={`text-base ${textClass}`}>{item.name}</Medium>
          <Regular className={`text-xs leading-4 ${textClass.replace('900', '700')}`}>{item.description}</Regular>
        </View>
      </View>
    </TouchableOpacity>
  )
})

DepartmentCard.displayName = 'DepartmentCard'

export default DepartmentCard
