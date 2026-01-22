import HybridHead from '@components/HybridHead'
import PlusSignIcon from '@hugeicons/PlusSignIcon'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { adminApi, api, client } from '@utils/client'
import { AdminNavProp } from '@utils/types'
import { useCallback } from 'react'
import { Alert, FlatList, TouchableOpacity, View } from 'react-native'
import DepartmentCard from './components/DepartmentCard'
import { Department } from './types'

export default function AdminAddDepartments({ navigation }: AdminNavProp) {
  const queryClient = useQueryClient()

  const { data, isLoading } = useQuery({
    queryKey: ['departments'],
    queryFn: async () => await (await api.public.departments.$get(client)).json(),
  })

  const deleteMutation = useMutation({
    mutationFn: async (id: string) => await adminApi.departments[':id'].$delete({ param: { id } }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['departments'] })
    },
  })

  const handleNavigate = useCallback(() => {
    navigation.navigate('Doctors' as any)
  }, [navigation])

  const handleDelete = useCallback(
    (department: Department) => {
      Alert.alert('Delete Department', `Are you sure you want to delete ${department.name}?`, [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: () => deleteMutation.mutate(department.id.toString()),
        },
      ])
    },
    [deleteMutation],
  )

  const renderDepartmentCard = useCallback(
    ({ item, index }: { item: Department; index: number }) => (
      <DepartmentCard department={item} onPress={handleNavigate} onDelete={handleDelete} />
    ),
    [handleNavigate, handleDelete],
  )

  const keyExtractor = useCallback((item: Department) => item.id.toString(), [])

  return (
    <View className='flex-1 bg-white'>
      <HybridHead
        title='Departments'
        showBackButton={true}
        rightElement={
          <TouchableOpacity
            className='rounded-xl bg-accent p-2'
            onPress={() => {
              navigation.navigate('AdminAddDepartment')
            }}
          >
            <PlusSignIcon size={24} strokeWidth={1.7} color='white' />
          </TouchableOpacity>
        }
      />

      <FlatList
        data={data?.data}
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
