import { doctors, specialties } from '@/constants'
import { PaddingTop } from '@components/SafePadding'
import Search from '@components/Search'
import Doctor01Icon from '@hugeicons/Doctor01Icon'
import { useNavigation } from '@react-navigation/native'
import Colors from '@utils/colors'
import { Medium } from '@utils/fonts'
import { StackNav } from '@utils/types'
import { useMemo, useRef, useState } from 'react'
import { Dimensions, FlatList, TouchableOpacity, View } from 'react-native'
import { ScrollView } from 'react-native-gesture-handler'
import { DoctorCard } from '../../components/DoctorCard'
import { DepartmentChip } from '@components/DepartmentChip'

export const ALL_SPECIALTY = { id: 0, name: 'All', icon: Doctor01Icon }

export const getScrollPosition = (selectedIndex: number, itemWidths: { [key: number]: number }, isForward: boolean) => {
  let width = 0
  for (let i = 0; i < selectedIndex; i++) {
    width += (itemWidths[i] || 100) + 12
  }

  if (isForward) return Math.max(0, width - 20)

  const screenCenter = Dimensions.get('window').width / 2
  const itemCenter = width + (itemWidths[selectedIndex] || 100) / 2
  return Math.max(0, itemCenter - screenCenter + 20)
}

const Doctors = () => {
  const navigate = useNavigation<StackNav>()
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
    <View className='bg flex-1'>
      <PaddingTop />
      <View>
        <View className='p-5 py-3 pb-5'>
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
        className='mt-5 flex-1'
        contentContainerClassName='px-5 pb-10'
        data={filteredDoctors}
        renderItem={({ item }) => <DoctorCard doctor={item} onPress={() => navigate.navigate('BookAppointment')} />}
        keyExtractor={(item) => item.id.toString()}
        ItemSeparatorComponent={() => <View className='h-3' />}
        showsVerticalScrollIndicator={false}
      />
    </View>
  )
}


export default Doctors
