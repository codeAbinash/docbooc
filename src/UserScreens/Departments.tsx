import { specialties } from '@/constants'
import HybridHead from '@components/HybridHead'
import { NavProp } from '@utils/types'
import { FlatList, View } from 'react-native'
import { useCallback } from 'react'
import { useQuery } from '@tanstack/react-query'
import { api, client } from '@utils/client'
import { Department } from '@/AdminScreens/Department/types'
import DepartmentCard from '@components/DepartmentCard'

export default function Departments({ navigation }: NavProp) {
  const { data, isLoading } = useQuery({
    queryKey: ['departments'],
    queryFn: async () => await (await api.public.departments.$get(client)).json(),
  })

  const departments = data?.data || []
    
  const handleNavigate = useCallback(() => {
    navigation.navigate('Doctors' as any)
  }, [navigation])

  const renderDepartmentCard = useCallback(
    ({ item, index }: { item: Department; index: number }) => (
      <DepartmentCard item={item} index={index} onPress={handleNavigate} />
    ),
    [handleNavigate],
  )

  const keyExtractor = useCallback((item: Department) => item.id.toString(), [])

  return (
    <View className='flex-1 bg-white'>
      <HybridHead title='Departments' showBackButton={true} />

      <FlatList
        data={departments}
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