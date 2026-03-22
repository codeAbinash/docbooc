import HybridHead from '@components/HybridHead'
import { Medium, SemiBold } from '@utils/fonts'
import { useCallback, useState, useMemo } from 'react'
import { FlatList, RefreshControl, TouchableOpacity, View } from 'react-native'
import Colors from '@utils/colors'
import Plus01Icon from '@hugeicons/Add01Icon'
import Edit01Icon from '@hugeicons/ArrowRight01Icon'
import { useColorScheme } from 'nativewind'

interface UserInfo {
  id: string
  fullName: string
  enabled: boolean
}

const DEMO_USERS: UserInfo[] = [
  {
    id: 'USR001',
    fullName: 'Amit Kumar',
    enabled: true,
  },
  {
    id: 'USR002',
    fullName: 'Priya Sharma',
    enabled: true,
  },
  {
    id: 'USR003',
    fullName: 'Rajesh Patel',
    enabled: false,
  },
  {
    id: 'USR004',
    fullName: 'Deepak Singh',
    enabled: true,
  },
  {
    id: 'USR005',
    fullName: 'Neha Gupta',
    enabled: true,
  },
  {
    id: 'USR006',
    fullName: 'Vikram Joshi',
    enabled: false,
  },
]

const HPUsers = () => {
  const [searchQuery, setSearchQuery] = useState('')
  const [refreshing, setRefreshing] = useState(false)
  const { colorScheme } = useColorScheme()

  const users = useMemo(() => DEMO_USERS, [])

  const filteredUsers = useMemo(() => {
    if (!searchQuery) return users
    const query = searchQuery.toLowerCase()
    return users.filter(
      (user) => user.fullName?.toLowerCase().includes(query) || user.id?.toLowerCase().includes(query),
    )
  }, [searchQuery, users])

  const onRefresh = useCallback(async () => {
    setRefreshing(true)
    await new Promise<void>((resolve) => setTimeout(resolve, 1000))
    setRefreshing(false)
  }, [])

  const handleAddUser = useCallback(() => {
    // TODO: Navigate to add user screen or open modal
  }, [])

  const handleEditUser = useCallback(() => {
    // TODO: Navigate to edit user screen or open modal
  }, [])

  const renderUserItem = useCallback(
    ({ item }: { item: UserInfo }) => (
      <TouchableOpacity
        activeOpacity={0.7}
        className='mb-3 rounded-2xl border border-neutral-200 bg-white p-4 dark:border-neutral-700 dark:bg-neutral-800'
      >
        <View className='flex-row items-center justify-between'>
          <View className='flex-1'>
            <SemiBold className='text-lg text-neutral-900 dark:text-white'>{item.fullName || 'Unknown'}</SemiBold>
            <Medium className='mt-1 text-sm text-neutral-500 dark:text-neutral-400'>{item.id}</Medium>
            <Medium className={`mt-1 text-sm ${item.enabled ? 'text-green-600' : 'text-red-600'}`}>
              {item.enabled ? 'Active' : 'Suspended'}
            </Medium>
          </View>
          <TouchableOpacity onPress={handleEditUser} className='ml-3 rounded-md p-1'>
            <Edit01Icon size={24} color={colorScheme === 'dark' ? '#ffffff' : '#000000'} strokeWidth={2} />
          </TouchableOpacity>
        </View>
      </TouchableOpacity>
    ),
    [colorScheme, handleEditUser],
  )

  const renderEmptyState = useCallback(
    () => (
      <View className='flex-1 items-center justify-center py-20'>
        <SemiBold className='mb-2 text-lg text-neutral-700 dark:text-neutral-300'>No Users Found</SemiBold>
        <Medium className='text-center text-sm text-neutral-500 dark:text-neutral-400'>
          {searchQuery ? 'No users match your search' : 'No users yet'}
        </Medium>
      </View>
    ),
    [searchQuery],
  )

  const renderShimmer = useCallback(
    () => (
      <View className='px-6 pt-2'>
        {Array.from({ length: 8 }).map((_, index) => (
          <View
            key={index}
            className='mb-3 rounded-2xl border border-neutral-200 bg-neutral-100 p-4 dark:border-neutral-700 dark:bg-neutral-700'
          />
        ))}
      </View>
    ),
    [],
  )

  return (
    <View className='flex-1 bg-white dark:bg-neutral-900'>
      <HybridHead
        title='Users'
        showMenu={true}
        rightElement={
          <TouchableOpacity onPress={handleAddUser} className='rounded-md p-1'>
            <Plus01Icon size={24} color={colorScheme === 'dark' ? '#ffffff' : '#000000'} strokeWidth={2} />
          </TouchableOpacity>
        }
      />

      <FlatList
        className='flex-1 px-6 pt-2'
        contentContainerClassName='pb-10'
        data={filteredUsers}
        renderItem={renderUserItem}
        keyExtractor={(item) => item.id}
        ListEmptyComponent={renderEmptyState}
        showsVerticalScrollIndicator={false}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} colors={[Colors.accent]} />}
      />
    </View>
  )
}

export default HPUsers
