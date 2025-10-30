import { doctors } from '@/constants'
import { DoctorCard } from '@components/DoctorCard'
import { SemiBold } from '@utils/fonts'
import { useMemo, useState } from 'react'
import { FlatList, View, TextInput, TouchableOpacity } from 'react-native'
import { useColorScheme } from 'nativewind'
import { useNavigation } from '@react-navigation/native'
import { HPStackNav } from '@utils/types'
import AppBar from '../components/AppBar'
import Search01Icon from '@hugeicons/Search01Icon'
import Cancel01Icon from '@hugeicons/Cancel01Icon'
import PlusSignIcon from '@hugeicons/PlusSignIcon'
import Colors from '@utils/colors'

const XAddDoctors = () => {
  const navigate = useNavigation<HPStackNav>()
  const { colorScheme } = useColorScheme()
  const [selected, setSelected] = useState<number | null>(null)
  const [searchQuery, setSearchQuery] = useState('')
  const [showSearch, setShowSearch] = useState(false)
  const [expandedId, setExpandedId] = useState<number | null>(null)

  const toggleSearch = () => {
    setShowSearch((prev) => !prev)
    if (!showSearch) setSearchQuery('')
  }

  const filteredDoctors = useMemo(() => {
    let filtered = doctors
    if (selected) filtered = doctors.filter((d) => d.specialtyId === selected)
    if (searchQuery) {
      const q = searchQuery.toLowerCase()
      filtered = filtered.filter((d) => d.name.toLowerCase().includes(q) || d.specialty.toLowerCase().includes(q))
    }
    return filtered
  }, [selected, searchQuery])

  return (
    <>
      <AppBar>
        {showSearch ? (
          <View className='flex-1 pl-4'>
            <View className='flex-row items-center'>
              <TextInput
                className='flex-1 rounded-xl bg-neutral-100 px-4 py-2.5 text-neutral-900 dark:bg-neutral-800 dark:text-white'
                placeholder='Search doctors, specialties...'
                placeholderTextColor={colorScheme === 'dark' ? '#9ca3af' : '#6b7280'}
                value={searchQuery}
                onChangeText={setSearchQuery}
                autoFocus
              />
              <TouchableOpacity
                onPress={toggleSearch}
                className='ml-3 rounded-lg bg-neutral-100 p-2 dark:bg-neutral-800'
              >
                <Cancel01Icon size={26} color={Colors.accent} strokeWidth={2} />
              </TouchableOpacity>
            </View>
          </View>
        ) : (
          <>
            <View className='flex-1 items-center justify-center'>
              <SemiBold className='text-lg'>Add Doctors</SemiBold>
            </View>
            <View className='flex-row gap-2'>
              <TouchableOpacity onPress={toggleSearch} className='rounded-lg bg-neutral-100 p-2 dark:bg-neutral-800'>
                <Search01Icon
                  size={26}
                  color={colorScheme === 'dark' ? Colors.text.dark : Colors.text.DEFAULT}
                  strokeWidth={2}
                />
              </TouchableOpacity>
              <TouchableOpacity onPress={() => navigate.navigate('DoctorModel')} className='rounded-lg bg-accent p-2'>
                <PlusSignIcon size={26} color={Colors.text.dark} strokeWidth={2} />
              </TouchableOpacity>
            </View>
          </>
        )}
      </AppBar>
      <View className='bg flex-1'>
        <FlatList
          className='mt-4 flex-1'
          contentContainerClassName='px-5 pb-24'
          data={filteredDoctors}
          renderItem={({ item }) => (
            <View className='overflow-hidden rounded-xl bg-white dark:bg-neutral-800'>
              <DoctorCard
                doctor={item}
                isExpanded={expandedId === item.id}
                onPress={() => setExpandedId(expandedId === item.id ? null : item.id)}
              />
            </View>
          )}
          keyExtractor={(item) => item.id.toString()}
          ItemSeparatorComponent={() => <View className='h-4' />}
          showsVerticalScrollIndicator={false}
        />
      </View>
    </>
  )
}

export default XAddDoctors
