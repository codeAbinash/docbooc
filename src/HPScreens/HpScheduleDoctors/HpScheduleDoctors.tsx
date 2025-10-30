import { doctors, specialties } from '@/constants'
import { ALL_SPECIALTY, getScrollPosition } from '@/UserScreens/Doctors/Doctors'
import Chip from '@components/Chip'
import { DoctorCard } from '@components/DoctorCard'
import { useNavigation } from '@react-navigation/native'
import { SemiBold } from '@utils/fonts'
import { HPStackNav } from '@utils/types'
import { useMemo, useRef, useState, useCallback } from 'react'
import { FlatList, View, TextInput, TouchableOpacity } from 'react-native'
import { useColorScheme } from 'nativewind'
import Search01Icon from '@hugeicons/Search01Icon'
import Cancel01Icon from '@hugeicons/Cancel01Icon'
import Colors from '@utils/colors'
import { ScrollView } from 'react-native-gesture-handler'
import AppBar from '../components/AppBar'
import Button from '@components/Button'

const HPScheduleDoctors = () => {
  const navigate = useNavigation<HPStackNav>()
  const { colorScheme } = useColorScheme()
  const [selected, setSelected] = useState<number | null>(null)
  const [selectedDoctorId, setSelectedDoctorId] = useState<number | null>(null)
  const scrollViewRef = useRef<ScrollView>(null)
  const [itemWidths, setItemWidths] = useState<Record<number, number>>({})
  const [showSearch, setShowSearch] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')

  const toggleSearch = useCallback(() => {
    setShowSearch((prev) => !prev)
    if (showSearch) setSearchQuery('')
  }, [showSearch])

  const filteredDoctors = useMemo(() => {
    let filtered = selected ? doctors.filter((d) => d.specialtyId === selected) : doctors
    if (searchQuery) {
      const query = searchQuery.toLowerCase()
      filtered = filtered.filter(
        (d) => d.name.toLowerCase().includes(query) || d.specialty.toLowerCase().includes(query),
      )
    }
    return filtered
  }, [selected, searchQuery])

  const handleSpecialtySelect = (id: number) => {
    const prevIdx = selected !== null ? [ALL_SPECIALTY, ...specialties].findIndex((i) => i.id === selected) : -1
    setSelected(id)

    if (!scrollViewRef.current || id === 0 || !Object.keys(itemWidths).length) return

    const idx = [ALL_SPECIALTY, ...specialties].findIndex((i) => i.id === id)
    if (idx > 0) {
      scrollViewRef.current.scrollTo({
        x: getScrollPosition(idx, itemWidths, idx > prevIdx),
        animated: true,
      })
    }
  }

  const allItems = [ALL_SPECIALTY, ...specialties]

  return (
    <>
      <AppBar>
        {showSearch ? (
          <View className='pl-4 flex-1'>
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
              <SemiBold className=' text-lg'>Schedule Doctors</SemiBold>
            </View>
            <TouchableOpacity
              onPress={toggleSearch}
              className=' rounded-lg bg-neutral-100 p-2 dark:bg-neutral-800'
            >
              <Search01Icon
                size={26}
                color={colorScheme === 'dark' ? Colors.text.dark : Colors.text.DEFAULT}
                strokeWidth={2}
              />
            </TouchableOpacity>
          </>
        )}
      </AppBar>
      <View className='bg flex-1'> 
        <View className='bg-white pb-4'>
          <ScrollView
            ref={scrollViewRef}
            horizontal
            contentContainerClassName='gap-3 px-5 pt-1'
            showsHorizontalScrollIndicator={false}
          >
            {allItems.map((item) => (
              <Chip
                key={item.id}
                icon={item.icon}
                label={item.name}
                onPress={() => handleSpecialtySelect(item.id)}
                variant={selected === item.id ? 'deepAccent' : 'default'}
                onLayout={(e) => setItemWidths((prev) => ({ ...prev, [item.id]: e.nativeEvent.layout.width }))}
              />
            ))}
          </ScrollView>
        </View>
        <FlatList
          className='mt-4 flex-1'
          contentContainerClassName='px-5 pb-10'
          data={filteredDoctors}
          renderItem={({ item }) => (
            <DoctorCard
              doctor={item}
              selected={selectedDoctorId === item.id}
              onPress={() => setSelectedDoctorId(item.id)}
            />
          )}
          keyExtractor={(item) => item.id.toString()}
          ItemSeparatorComponent={() => <View className='h-4' />}
          showsVerticalScrollIndicator={false}
        />
      </View>
      <View className='px-6 pb-8 pt-3'>
        <Button title='Continue' onPress={() => navigate.navigate('HPDoctorScheduler')} />
      </View>
    </>
  )
}

export default HPScheduleDoctors
