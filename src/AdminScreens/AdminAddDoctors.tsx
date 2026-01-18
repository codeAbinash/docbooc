import { DoctorCard } from '@components/DoctorCard'
import Cancel01Icon from '@hugeicons/Cancel01Icon'
import PlusSignIcon from '@hugeicons/PlusSignIcon'
import Search01Icon from '@hugeicons/Search01Icon'
import { useFocusEffect, useNavigation } from '@react-navigation/native'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { adminApi } from '@utils/client'
import Colors from '@utils/colors'
import { AdminStackNav } from '@utils/types'
import { useColorScheme } from 'nativewind'
import { useCallback, useMemo, useState } from 'react'
import { ActivityIndicator, Alert, FlatList, Text, TextInput, TouchableOpacity, View } from 'react-native'
import HybridHead from '@components/HybridHead'

const AdminAddDoctors = () => {
  const navigation = useNavigation<AdminStackNav>()
  const { colorScheme } = useColorScheme()
  const [showSearch, setShowSearch] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [expandedId, setExpandedId] = useState<string | null>(null)
  const queryClient = useQueryClient()

  const {
    data: doctorsData,
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ['admin-doctors'],
    queryFn: async () => (await adminApi.doctors.$get()).json(),
  })

  useFocusEffect(
    useCallback(() => {
      refetch()
    }, [refetch]),
  )

  const { mutate: deleteDoctor } = useMutation({
    mutationFn: async (doctorId: string) => {
      const response = await adminApi.doctors[':id'].$delete({
        param: { id: doctorId },
      })
      return response.json()
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-doctors'] })
      setExpandedId(null)
      Alert.alert('Success', 'Doctor deleted successfully')
    },
    onError: (error) => {
      console.error('Delete error:', error)
      Alert.alert('Error', 'Failed to delete doctor')
    },
  })

  const doctors = doctorsData?.data || []

  const toggleSearch = useCallback(() => {
    setShowSearch((prev) => !prev)
    if (showSearch) setSearchQuery('')
  }, [showSearch])

  const filteredDoctors = useMemo(() => {
    if (!searchQuery) return doctors
    const query = searchQuery.toLowerCase()
    return doctors.filter(
      (d) =>
        d.name.toLowerCase().includes(query) ||
        d.department?.toLowerCase().includes(query) ||
        d.specialization?.toLowerCase().includes(query),
    )
  }, [doctors, searchQuery])

  return (
    <View className='flex-1'>
      <HybridHead
        title='Add Doctors'
        showMenu={true}
        rightElement={
          <TouchableOpacity onPress={() => navigation.navigate('AdminAddDoctor')} className='rounded-lg bg-accent p-2'>
            <PlusSignIcon size={24} color={Colors.text.dark} strokeWidth={2} />
          </TouchableOpacity>
        }
      />
      <View className='flex-1 bg-white dark:bg-neutral-900'>
        {isLoading ? (
          <View className='flex-1 items-center justify-center'>
            <ActivityIndicator size='large' color={Colors.accent} />
          </View>
        ) : (
          <FlatList
            className='flex-1 pt-4'
            contentContainerClassName='px-5 pb-10'
            data={filteredDoctors}
            renderItem={({ item }) => (
              <DoctorCard
                doctor={item}
                showSelector={false}
                isExpanded={expandedId === item.id}
                onPress={() => setExpandedId(expandedId === item.id ? null : item.id)}
                onEdit={() => navigation.navigate('AdminAddDoctor', { doctor: item })}
                onDelete={() =>
                  Alert.alert('Delete Doctor', 'Are you sure you want to delete this doctor?', [
                    { text: 'Cancel', style: 'cancel' },
                    {
                      text: 'Delete',
                      style: 'destructive',
                      onPress: () => deleteDoctor(item.id),
                    },
                  ])
                }
              />
            )}
            keyExtractor={(item) => item.id.toString()}
            ItemSeparatorComponent={() => <View className='h-4' />}
            showsVerticalScrollIndicator={false}
          />
        )}
      </View>
    </View>
  )
}

export default AdminAddDoctors
