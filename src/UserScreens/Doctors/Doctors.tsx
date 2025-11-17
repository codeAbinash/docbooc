import { doctors, specialties } from '@/constants'
import Chip from '@components/Chip'
import { PaddingTop } from '@components/SafePadding'
import Doctor01Icon from '@hugeicons/Doctor01Icon'
import Cancel01Icon from '@hugeicons/Cancel01Icon'
import Search01Icon from '@hugeicons/Search01Icon'
import { useNavigation } from '@react-navigation/native'
import { StackNav } from '@utils/types'
import Colors from '@utils/colors'
import { useColorScheme } from 'nativewind'
import { useMemo, useRef, useState, useCallback } from 'react'
import { Dimensions, FlatList, View, TextInput, TouchableOpacity, Text } from 'react-native'
import { ScrollView } from 'react-native-gesture-handler'
import { DoctorCard } from '../../components/DoctorCard'
import { SemiBold } from '@utils/fonts'

export const ALL_SPECIALTY = { id: 0, name: 'All', icon: Doctor01Icon }

const Doctors = () => {
  const navigate = useNavigation<StackNav>()
  const { colorScheme } = useColorScheme()
  const [selected, setSelected] = useState<number>(0)
  const [showSearch, setShowSearch] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const scrollViewRef = useRef<ScrollView>(null)
  const [itemPositions, setItemPositions] = useState<Record<number, { x: number; width: number }>>({})

  const allItems = [ALL_SPECIALTY, ...specialties]

  const toggleSearch = useCallback(() => {
    setShowSearch((prev) => !prev)
    if (showSearch) setSearchQuery('')
  }, [showSearch])

  const filteredDoctors = useMemo(() => {
    let result = selected ? doctors.filter((doctor) => doctor.specialtyId === selected) : doctors
    if (searchQuery) {
      const query = searchQuery.toLowerCase()
      result = result.filter((d) => d.name.toLowerCase().includes(query) || d.specialty.toLowerCase().includes(query))
    }
    return result
  }, [selected, searchQuery])

  const handleChipLayout = (itemId: number, x: number, width: number) => {
    setItemPositions((prev) => ({
      ...prev,
      [itemId]: { x, width },
    }))
  }

  const handleSpecialtySelect = (specialtyId: number) => {
    setSelected(specialtyId)

    if (scrollViewRef.current && itemPositions[specialtyId]) {
      const position = itemPositions[specialtyId]
      // Scroll to center the selected chip
      const centerOffset = position.x - position.width / 2
      scrollViewRef.current.scrollTo({
        x: Math.max(0, centerOffset),
        animated: true,
      })
    }
  }

  return (
    <View className='flex-1'>
      {/* Custom Header */}
      <View className='bg-white dark:bg-neutral-900'>
        <PaddingTop />
        <View className='py-2 pl-8 pr-6'>
          {showSearch ? (
            <View className='flex-row items-center gap-2'>
              <View className='flex-1 flex-row items-center gap-2 rounded-lg border border-neutral-800 bg-white px-6 py-3 dark:border-neutral-700 dark:bg-neutral-800'>
                <Search01Icon
                  size={20}
                  color={colorScheme === 'dark' ? Colors.text.dark : Colors.text.DEFAULT}
                  strokeWidth={2}
                />
                <TextInput
                  className='flex-1 text-neutral-900 dark:text-white'
                  style={{ paddingVertical: 0 }}
                  placeholder='Search doctors, specialties...'
                  placeholderTextColor={colorScheme === 'dark' ? '#9ca3af' : '#6b7280'}
                  value={searchQuery}
                  onChangeText={setSearchQuery}
                  autoFocus
                />
              </View>
              <TouchableOpacity
                onPress={toggleSearch}
                className='rounded-lg border border-neutral-800 bg-neutral-100 p-2 dark:bg-neutral-800'
              >
                <Cancel01Icon size={26} color={Colors.accent} strokeWidth={2} />
              </TouchableOpacity>
            </View>
          ) : (
            <View className='flex-row items-center justify-start' style={{ height: 44 }}>
              <SemiBold className='text-2xl text-neutral-900 dark:text-white'>DocBooc</SemiBold>
              <TouchableOpacity
                onPress={toggleSearch}
                className='absolute right-0 rounded-lg bg-neutral-100 p-2 dark:bg-neutral-800'
              >
                <Search01Icon
                  size={26}
                  color={colorScheme === 'dark' ? Colors.text.dark : Colors.text.DEFAULT}
                  strokeWidth={2}
                />
              </TouchableOpacity>
            </View>
          )}
        </View>

        {/* Specialty Chips */}
        <View className='bg-white pb-3 dark:bg-neutral-800'>
          <ScrollView
            ref={scrollViewRef}
            horizontal
            contentContainerClassName='gap-3 px-5 pt-3'
            showsHorizontalScrollIndicator={false}
          >
            {allItems.map((item) => (
              <View
                key={item.id}
                onLayout={(e) => {
                  const { x, width } = e.nativeEvent.layout
                  handleChipLayout(item.id, x, width)
                }}
              >
                <Chip
                  icon={item.icon}
                  label={item.name}
                  onPress={() => handleSpecialtySelect(item.id)}
                  variant={selected === item.id ? 'transparentAccent' : 'default'}
                />
              </View>
            ))}
          </ScrollView>
        </View>
      </View>

      <View className='flex-1 bg-neutral-100 dark:bg-neutral-900'>
        <FlatList
          className='flex-1 pt-4'
          contentContainerClassName='px-5 pb-10'
          data={filteredDoctors}
          renderItem={({ item }) => (
            <DoctorCard
              doctor={item}
              showSelector={false}
              selected={false}
              onPress={() => navigate.navigate('BookAppointment')}
            />
          )}
          keyExtractor={(item) => item.id.toString()}
          ItemSeparatorComponent={() => <View className='h-4' />}
          showsVerticalScrollIndicator={false}
        />
      </View>
    </View>
  )
}

export default Doctors
