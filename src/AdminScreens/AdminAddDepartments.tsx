import { specialties } from '@/constants'
import HybridHead from '@components/HybridHead'
import { Medium, Regular } from '@utils/fonts'
import { NavProp } from '@utils/types'
import { FlatList, TouchableOpacity, View } from 'react-native'
import { memo, useCallback } from 'react'
import PlusSignIcon from '@hugeicons/PlusSignIcon'


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

type DepartmentItem = (typeof specialties)[0]

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
        <View style={{ gap: 12 }}>
          <Medium className={`text-base ${textClass}`}>{item.name}</Medium>
          <Regular className={`text-xs leading-4 ${textClass.replace('900', '700')}`}>{item.description}</Regular>
        </View>
      </View>
    </TouchableOpacity>
  )
})

DepartmentCard.displayName = 'DepartmentCard'

export default function AdminAddDepartments({ navigation }: NavProp) {
    
  const handleNavigate = useCallback(() => {
    navigation.navigate('Doctors' as any)
  }, [navigation])

  const renderDepartmentCard = useCallback(
    ({ item, index }: { item: DepartmentItem; index: number }) => (
      <DepartmentCard item={item} index={index} onPress={handleNavigate} />
    ),
    [handleNavigate],
  )

  const keyExtractor = useCallback((item: DepartmentItem) => item.id.toString(), [])

  return (
    <View className='flex-1 bg-white'>
      <HybridHead
       title='Departments'
       showBackButton={true} 
       rightElement={
          <TouchableOpacity  className='rounded-lg bg-accent p-2'>
            <PlusSignIcon size={26}  strokeWidth={2} />
          </TouchableOpacity>
        }
       />

      <FlatList
        data={specialties}
        renderItem={renderDepartmentCard}
        keyExtractor={keyExtractor}
        numColumns={2}
        columnWrapperStyle={{ flex: 1 }}
        contentContainerStyle={{ paddingHorizontal: 12, paddingBottom: 40, paddingTop: 8 }}
        scrollEnabled={true}
        removeClippedSubviews={true}
        maxToRenderPerBatch={10}
        windowSize={5}
        initialNumToRender={6}
      />
    </View>
  )
}