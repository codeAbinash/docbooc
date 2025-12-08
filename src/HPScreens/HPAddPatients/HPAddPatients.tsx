import { doctors, specialties } from '@/constants'
import { ALL_SPECIALTY } from '@/UserScreens/Doctors/Doctors'

import { DoctorCard } from '@components/DoctorCard'
import HybridHead from '@components/HybridHead'
import { useNavigation } from '@react-navigation/native'
import { HPStackNav } from '@utils/types'
import { useMemo, useRef, useState } from 'react'
import { FlatList, View } from 'react-native'
import { ScrollView } from 'react-native-gesture-handler'

const HPAddPatients = () => {
  const navigate = useNavigation<HPStackNav>()
  const [selected, setSelected] = useState(0)
  const scrollViewRef = useRef<ScrollView>(null)
  const [showSearch, setShowSearch] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')

  const toggleSearch = (isOpen: boolean) => {
    setShowSearch(isOpen)
    if (isOpen) setSearchQuery('')
  }

  const filteredDoctors = useMemo(() => {
    let filtered = doctors
    if (searchQuery) {
      const query = searchQuery.toLowerCase()
      filtered = filtered.filter(
        (d) => d.name.toLowerCase().includes(query) || d.specialty.toLowerCase().includes(query),
      )
    }
    if (selected !== 0) {
      const selectedSpecialty = specialties.find((s) => s.id === selected)
      if (selectedSpecialty) {
        filtered = filtered.filter((d) => d.specialty === selectedSpecialty.name)
      }
    }
    return filtered
  }, [searchQuery, selected])

  const allItems = [ALL_SPECIALTY, ...specialties]

  return (
    <>
      <HybridHead
        title='Add Patients'
        showSearch={true}
        onSearchChange={setSearchQuery}
        onSearchToggle={toggleSearch}
        searchPlaceholder='Search doctors, specialties...'
        chipItems={allItems}
        selectedChipId={selected}
        onChipSelect={setSelected}
        chipScrollRef={scrollViewRef}
        showMenu={true}
        showDoctorInfo={false}
      />
      <View className='flex-1 bg-neutral-100 dark:bg-neutral-900'>
        <FlatList
          className='flex-1'
          contentContainerClassName='px-5 pb-10 pt-4'
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
