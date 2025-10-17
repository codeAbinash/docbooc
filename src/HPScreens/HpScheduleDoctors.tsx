import { doctors, specialties } from '@/constants'
import { ALL_SPECIALTY, getScrollPosition } from '@/UserScreens/Doctors/Doctors'
import Chip from '@components/Chip'
import { DoctorCard } from '@components/DoctorCard'
import Search from '@components/Search'
import { useNavigation } from '@react-navigation/native'
import { SemiBold } from '@utils/fonts'
import { HPStackNav } from '@utils/types'
import { useMemo, useRef, useState } from 'react'
import { FlatList, View } from 'react-native'
import { ScrollView } from 'react-native-gesture-handler'
import TopArea from './components/TopArea'

const HPScheduleDoctors = () => {
  const navigate = useNavigation<HPStackNav>()
  const [selected, setSelected] = useState<number | null>(null)
  const scrollViewRef = useRef<ScrollView>(null)
  const [itemWidths, setItemWidths] = useState<{ [key: number]: number }>({})

  const filteredDoctors = useMemo(
    () => (selected ? doctors.filter((doctor) => doctor.specialtyId === selected) : doctors),
    [selected],
  )

  const handleItemLayout = (specialtyId: number, width: number) => {
    setItemWidths((prev: { [key: number]: number }) => ({ ...prev, [specialtyId]: width }))
  }

  const handleSpecialtySelect = (specialtyId: number) => {
    const previousSelected = selected
    setSelected(specialtyId)

    if (!scrollViewRef.current || specialtyId === 0) return

    const allItems = [ALL_SPECIALTY, ...specialties]
    const selectedIndex = allItems.findIndex((item) => item.id === specialtyId)
    const previousIndex = previousSelected !== null ? allItems.findIndex((item) => item.id === previousSelected) : -1

    if (selectedIndex > 0 && Object.keys(itemWidths).length > 0) {
      const isForward = selectedIndex > previousIndex
      const scrollPosition = getScrollPosition(selectedIndex, itemWidths, isForward)

      scrollViewRef.current.scrollTo({
        x: scrollPosition,
        animated: true,
      })
    }
  }

  return (
    <>
      <TopArea>
        <SemiBold className='text text-lg opacity-90'>Select doctor and schedule visits</SemiBold>
      </TopArea>
      <View className='bg flex-1'>
        <View>
          <View className='bg-white px-5 pb-3 dark:bg-neutral-900'>
            <Search placeholder='Search doctors, specialties, etc' />
          </View>
          <ScrollView
            ref={scrollViewRef}
            horizontal
            contentContainerClassName='gap-3 px-5 pt-4'
            showsHorizontalScrollIndicator={false}
          >
            <Chip
              key={ALL_SPECIALTY.id}
              icon={ALL_SPECIALTY.icon}
              label={ALL_SPECIALTY.name}
              onPress={() => handleSpecialtySelect(ALL_SPECIALTY.id)}
              variant={selected === ALL_SPECIALTY.id ? 'deepAccent' : 'default'}
              onLayout={(event) => handleItemLayout(ALL_SPECIALTY.id, event.nativeEvent.layout.width)}
            />
            {specialties.map((specialty) => (
              <Chip
                key={specialty.id}
                icon={specialty.icon}
                label={specialty.name}
                onPress={() => handleSpecialtySelect(specialty.id)}
                variant={selected === specialty.id ? 'deepAccent' : 'default'}
                onLayout={(event) => handleItemLayout(specialty.id, event.nativeEvent.layout.width)}
              />
            ))}
          </ScrollView>
        </View>
        <FlatList
          className='mt-4 flex-1'
          contentContainerClassName='px-5 pb-10'
          data={filteredDoctors}
          renderItem={({ item }) => <DoctorCard doctor={item} onPress={() => navigate.navigate('DoctorDetails')} />}
          keyExtractor={(item) => item.id.toString()}
          ItemSeparatorComponent={() => <View className='h-4' />}
          showsVerticalScrollIndicator={false}
        />
      </View>
    </>
  )
}

export default HPScheduleDoctors
