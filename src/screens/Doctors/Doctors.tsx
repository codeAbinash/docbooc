import { doctors, specialties } from '@/constants'
import { PaddingTop } from '@components/SafePadding'
import Search from '@components/Search'
import Doctor01Icon from '@hugeicons/Doctor01Icon'
import { useNavigation } from '@react-navigation/native'
import Colors from '@utils/colors'
import { Medium, Regular, SemiBold } from '@utils/fonts'
import { StackNav } from '@utils/types'
import { useMemo, useRef, useState } from 'react'
import { Dimensions, FlatList, Image, TouchableOpacity, View } from 'react-native'
import { ScrollView } from 'react-native-gesture-handler'

const ALL_SPECIALTY = { id: 0, name: 'All', icon: Doctor01Icon }

const getScrollPosition = (selectedIndex: number, itemWidths: { [key: number]: number }, isForward: boolean) => {
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
        <View className='p-5 py-3'>
          <Search placeholder='Search doctors, specialties, etc' />
        </View>
        <ScrollView
          ref={scrollViewRef}
          horizontal
          contentContainerClassName='gap-3 px-5'
          showsHorizontalScrollIndicator={false}
        >
          <Item
            key={0}
            specialty={ALL_SPECIALTY}
            selected={selected}
            setSelected={handleSpecialtySelect}
            onLayout={handleItemLayout}
          />
          {specialties.map((specialty) => (
            <Item
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
        renderItem={({ item }) => <DoctorCard doctor={item} />}
        keyExtractor={(item) => item.id.toString()}
        ItemSeparatorComponent={() => <View className='h-3' />}
        showsVerticalScrollIndicator={false}
      />
    </View>
  )
}

function DoctorCard({ doctor }: { doctor: (typeof doctors)[0] }) {
  const navigation = useNavigation<StackNav>()
  return (
    <TouchableOpacity
      className='rounded-3xl bg-white p-3 dark:bg-neutral-900'
      activeOpacity={0.7}
      onPress={() => navigation.navigate('BookAppointment')}
    >
      <View className='flex-row items-center'>
        {/* <View className='mr-4 size-[80px] items-center justify-center rounded-2xl bg-accent/20'>
          <SemiBold className='text-xl text-accent'>{getInitials(doctor.name)}</SemiBold>
        </View> */}

        {/* <DoctorIcon width={80} height={80} style={{ marginRight: 16 }} /> */}
        <Image
          source={{
            uri: 'https://st4.depositphotos.com/7877830/25337/v/450/depositphotos_253374286-stock-illustration-vector-illustration-male-doctor-avatar.jpg',
          }}
          className='mr-4 size-20 rounded-2xl'
          resizeMode='cover'
        />
        <View className='flex-1'>
          <SemiBold className='text text-lg'>{doctor.name}</SemiBold>
          <Medium className='text text-sm opacity-70'>MBBS, MD (General Medicine)</Medium>
          <Medium className='text text-sm text-accent opacity-70'>General Physician</Medium>
          <Regular className='text-sm text-neutral-500 dark:text-neutral-400'>20+ years of experience</Regular>
        </View>
      </View>
    </TouchableOpacity>
  )
}

function Item({
  specialty,
  selected,
  setSelected,
  onLayout,
}: {
  specialty: (typeof specialties)[0] | { id: number; name: string; icon: any }
  selected: number | null
  setSelected: (id: number) => void
  onLayout: (specialtyId: number, width: number) => void
}) {
  return (
    <TouchableOpacity
      key={specialty.id}
      className={`flex flex-row items-center rounded-full px-2 py-2 pr-4 ${selected === specialty.id ? 'bg-accent' : 'bg-neutral-400/30'}`}
      onPress={() => setSelected(specialty.id)}
      activeOpacity={0.8}
      onLayout={(event) => {
        const { width } = event.nativeEvent.layout
        onLayout(specialty.id, width)
      }}
    >
      <View className={`rounded-full ${selected === specialty.id ? 'bg-white' : 'bg-accent'} p-1.5`}>
        <specialty.icon size={20} strokeWidth={1.7} color={selected === specialty.id ? Colors.accent : 'white'} />
      </View>
      <Medium className={`ml-2 text-sm ${selected === specialty.id ? 'text-white' : 'text'}`}>{specialty.name}</Medium>
    </TouchableOpacity>
  )
}

export default Doctors
