import { doctors, specialties } from '@/constants'
import { ALL_SPECIALTY } from '@/UserScreens/Doctors/Doctors'
import Chip from '@components/Chip'
import { DoctorCard } from '@components/DoctorCard'
import Cancel01Icon from '@hugeicons/Cancel01Icon'
import Search01Icon from '@hugeicons/Search01Icon'
import { useNavigation } from '@react-navigation/native'
import Colors from '@utils/colors'
import { SemiBold } from '@utils/fonts'
import { HPStackNav } from '@utils/types'
import { useColorScheme } from 'nativewind'
import { useCallback, useMemo, useRef, useState } from 'react'
import { FlatList, TextInput, TouchableOpacity, View } from 'react-native'
import { ScrollView } from 'react-native-gesture-handler'
import AppBar from '@components/AppBar'

const HPAddPatients = () => {
  const navigate = useNavigation<HPStackNav>()
  const { colorScheme } = useColorScheme()
  const [selected, setSelected] = useState(0)
  const scrollViewRef = useRef<ScrollView>(null)
  const [itemPositions, setItemPositions] = useState<Record<number, { x: number; width: number }>>({})
  const [showSearch, setShowSearch] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')

  const toggleSearch = useCallback(() => {
    setShowSearch((prev) => !prev)
    if (showSearch) setSearchQuery('')
  }, [showSearch])

  const filteredDoctors = useMemo(() => {
    let filtered = doctors
    if (searchQuery) {
      const query = searchQuery.toLowerCase()
      filtered = filtered.filter(
        (d) => d.name.toLowerCase().includes(query) || d.specialty.toLowerCase().includes(query),
      )
    }
    return filtered
  }, [searchQuery])

  const handleSpecialtySelect = (id: number) => {
    setSelected(id)

    if (scrollViewRef.current && itemPositions[id]) {
      const position = itemPositions[id]
      const centerOffset = position.x - position.width / 2
      scrollViewRef.current.scrollTo({
        x: Math.max(0, centerOffset),
        animated: true,
      })
    }
  }

  const handleChipLayout = (itemId: number, x: number, width: number) => {
    setItemPositions((prev) => ({
      ...prev,
      [itemId]: { x, width },
    }))
  }

  const allItems = [ALL_SPECIALTY, ...specialties]

  return (
    <>
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
                <SemiBold className='text-lg'>Add Patients</SemiBold>
              </View>
              <TouchableOpacity onPress={toggleSearch} className='rounded-lg bg-neutral-100 p-2 dark:bg-neutral-800'>
                <Search01Icon
                  size={26}
                  color={colorScheme === 'dark' ? Colors.text.dark : Colors.text.DEFAULT}
                  strokeWidth={2}
                />
              </TouchableOpacity>
            </>
          )}
        </View>
      </AppBar>
      <View className='flex-1 bg-neutral-100 dark:bg-neutral-900'>
        <View className='bg-white pb-4 dark:bg-neutral-800'>
          <ScrollView
            ref={scrollViewRef}
            horizontal
            contentContainerClassName='gap-3 px-5 pt-2'
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
        <FlatList
          className='mt-4 flex-1'
          contentContainerClassName='px-5 pb-10'
          data={filteredDoctors}
          renderItem={({ item }) => (
            <DoctorCard
              doctor={item}
              onPress={() =>
                navigate.navigate('HPDoctorScheduleDetails', { doctorId: item.id.toString(), doctorName: item.name })
              }
            />
          )}
          keyExtractor={(item) => item.id.toString()}
          ItemSeparatorComponent={() => <View className='h-4' />}
          showsVerticalScrollIndicator={false}
        />
      </View>
    </>
  )
}

export default HPAddPatients
