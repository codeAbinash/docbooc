import { specialties } from '@/constants'
import HybridHead from '@components/HybridHead'
import Doctor01Icon from '@hugeicons/Doctor01Icon'
import { useFocusEffect, useNavigation } from '@react-navigation/native'
import { useQuery } from '@tanstack/react-query'
import { api } from '@utils/client'
import Colors from '@utils/colors'
import { StackNav } from '@utils/types'
import { useCallback, useMemo, useRef, useState } from 'react'
import { ActivityIndicator, FlatList, View } from 'react-native'
import { ScrollView } from 'react-native-gesture-handler'
import { DoctorCard } from '../../components/DoctorCard'

export const ALL_SPECIALTY = { id: 0, name: 'All', icon: Doctor01Icon }

const Doctors = ({ route }: any) => {
  const navigate = useNavigation<StackNav>()
  const [selected, setSelected] = useState<number>(0)
  const [searchQuery, setSearchQuery] = useState('')
  const [titleIndex, setTitleIndex] = useState(0)
  const [isSearchOpen, setIsSearchOpen] = useState(route?.params?.openSearch || false)
  const scrollViewRef = useRef<ScrollView>(null)

  const titles = ['DocBook', 'Search Doctors', 'Find Your Specialist Doctor', 'Book Appointments Easily']

  const handleAnimationComplete = useCallback(() => {
    setTitleIndex((prev) => (prev + 1) % titles.length)
  }, [titles.length])

  useFocusEffect(
    useCallback(() => {
      if (route?.params?.openSearch) {
        setIsSearchOpen(true)
      }
      return () => {
        setIsSearchOpen(false)
      }
    }, [route?.params?.openSearch]),
  )

  const allItems = [ALL_SPECIALTY, ...specialties]

  const { data: doctorsResponse, isLoading } = useQuery({
    queryKey: ['doctors'],
    queryFn: async () => await (await api.users.doctors.$get()).json(),
  })

  const doctors = useMemo(() => doctorsResponse?.data || [], [doctorsResponse])

  const filteredDoctors = useMemo(() => {
    let result = selected
      ? doctors.filter((doctor) => doctor.specialization === specialties.find((s) => s.id === selected)?.name)
      : doctors
    if (searchQuery) {
      const query = searchQuery.toLowerCase()
      result = result.filter(
        (d) => d.name.toLowerCase().includes(query) || d.specialization?.toLowerCase().includes(query),
      )
    }
    return result
  }, [selected, searchQuery, doctors])

  return (
    <View className='flex-1'>
      <HybridHead
        showBackButton={true}
        title={'Doctors'}
        showSearch={true}
        searchPlaceholder='Search doctors, specialties...'
        chipItems={allItems}
        selectedChipId={selected}
        onChipSelect={setSelected}
        chipScrollRef={scrollViewRef}
        onSearchChange={setSearchQuery}
        onSearchToggle={setIsSearchOpen}
        searchOpen={isSearchOpen}
      />

      <View className='flex-1 bg-white dark:bg-neutral-900'>
        {isLoading ? (
          <View className='flex-1 items-center justify-center'>
            <ActivityIndicator size='large' color={Colors.accent} />
          </View>
        ) : (
          <FlatList
            className='flex-1 pt-3'
            contentContainerClassName='px-5 pb-10'
            data={filteredDoctors}
            renderItem={({ item }) => (
              <DoctorCard
                doctor={item}
                showSelector={false}
                selected={false}
                onPress={() =>
                  item.specialization &&
                  navigate.navigate('BookAppointment', { doctor: { ...item, specialization: item.specialization } })
                }
              />
            )}
            keyExtractor={(item) => item.id.toString()}
            ItemSeparatorComponent={() => <View className='h-4' />}
            showsVerticalScrollIndicator={false}
          />
        )}
      </View>
    </View>
  )
}

export default Doctors
