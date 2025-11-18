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
import AppBar from '@components/AppBar'

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
      <AppBar>
        <View className='flex-1 flex-row items-center justify-between gap-3'>
          {showSearch ? (
            <>
              <View className='flex-1 pl-3'>
                <View className='flex-row items-center gap-2 rounded-lg border border-neutral-200 bg-white px-4 dark:border-neutral-700 dark:bg-neutral-800'>
                  <Search01Icon
                    size={20}
                    color={colorScheme === 'dark' ? Colors.text.dark : Colors.text.DEFAULT}
                    strokeWidth={2}
                  />
                  <TextInput
                    className='flex-1 py-2.5 text-neutral-900 dark:text-white'
                    placeholder='Search doctors, specialties...'
                    placeholderTextColor={colorScheme === 'dark' ? '#9ca3af' : '#6b7280'}
                    value={searchQuery}
                    onChangeText={setSearchQuery}
                    autoFocus
                  />
                </View>
              </View>
              <TouchableOpacity onPress={toggleSearch} className='rounded-lg bg-neutral-100 p-2 dark:bg-neutral-800'>
                <Cancel01Icon size={26} color={Colors.accent} strokeWidth={2} />
              </TouchableOpacity>
            </>
          ) : (
            <>
              <View className='flex-1 items-center justify-center'>
                <Text className='text-lg font-semibold text-neutral-900 dark:text-white'>Add Doctors</Text>
              </View>
              <View className='flex-row gap-2'>
                <TouchableOpacity onPress={toggleSearch} className='rounded-lg bg-neutral-100 p-2 dark:bg-neutral-800'>
                  <Search01Icon
                    size={26}
                    color={colorScheme === 'dark' ? Colors.text.dark : Colors.text.DEFAULT}
                    strokeWidth={2}
                  />
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => navigation.navigate('AdminAddDoctor')}
                  className='rounded-lg bg-accent p-2'
                >
                  <PlusSignIcon size={26} color={Colors.text.dark} strokeWidth={2} />
                </TouchableOpacity>
              </View>
            </>
          )}
        </View>
      </AppBar>
      <View className='flex-1 bg-neutral-100 dark:bg-neutral-900'>
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
