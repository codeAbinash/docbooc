import { doctors, specialties } from '@/constants'
import { DepartmentChip } from '@components/DepartmentChip'
import { DoctorCard } from '@components/DoctorCard'
import Search from '@components/Search'
import { useNavigation } from '@react-navigation/native'
import { ALL_SPECIALTY, getScrollPosition } from '@screens/Doctors/Doctors'
import { HPStackNav } from '@utils/types'
import { useMemo, useRef, useState } from 'react'
import { FlatList, View } from 'react-native'
import { ScrollView } from 'react-native-gesture-handler'
import TopArea from './components/TopArea'

const HpAddDoctors = () => {
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
      <TopArea />
      <View className='bg flex-1'>
        <View>
          <View className='p-5 py-3 pb-3'>
            <Search placeholder='Search doctors, specialties, etc' />
          </View>
          <ScrollView
            ref={scrollViewRef}
            horizontal
            contentContainerClassName='gap-3 px-5'
            showsHorizontalScrollIndicator={false}
          >
            <DepartmentChip
              key={0}
              specialty={ALL_SPECIALTY}
              selected={selected}
              setSelected={handleSpecialtySelect}
              onLayout={handleItemLayout}
            />
            {specialties.map((specialty) => (
              <DepartmentChip
                key={specialty.id}
                specialty={specialty}
                selected={selected}
                setSelected={handleSpecialtySelect}
                onLayout={handleItemLayout}
              />
            ))}
          </ScrollView>
        </View>
        <FlatList
          className='mt-3 flex-1'
          contentContainerClassName='px-5 pb-10'
          data={filteredDoctors}
          renderItem={({ item }) => <DoctorCard doctor={item} onPress={() => navigate.navigate('AddDoctorSchedule')} />}
          keyExtractor={(item) => item.id.toString()}
          ItemSeparatorComponent={() => <View className='h-3' />}
          showsVerticalScrollIndicator={false}
        />
      </View>
    </>
  )
}

export default HpAddDoctors
