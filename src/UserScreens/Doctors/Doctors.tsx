import { specialties } from '@/constants'
import HybridHead from '@components/HybridHead'
import Doctor01Icon from '@hugeicons/Doctor01Icon'
import { useFocusEffect, useNavigation, useRoute, RouteProp } from '@react-navigation/native'
import { useQuery } from '@tanstack/react-query'
import { api, client } from '@utils/client'
import Colors from '@utils/colors'
import { StackNav } from '@utils/types'
import { useCallback, useMemo, useRef, useState, useEffect } from 'react'
import { ActivityIndicator, FlatList, View } from 'react-native'
import { ScrollView } from 'react-native-gesture-handler'
import { DoctorCard } from '../../components/DoctorCard'
import { Department } from '@/AdminScreens/Department/types'
import { RootStackParamList } from '../../../App'

type DoctorsRouteProp = RouteProp<RootStackParamList, 'Doctors'>

export const ALL_SPECIALTY: Department = {
  id: '0',
  name: 'All',
  description: null,
  icon: null,
  color: null,
  createdAt: '',
  updatedAt: '',
}

const Doctors = () => {
  const navigate = useNavigation<StackNav>()
  const route = useRoute<DoctorsRouteProp>()
  const [selected, setSelected] = useState<string>('0')
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

  useFocusEffect(
    useCallback(() => {
      if (route?.params?.departmentId) {
        setSelected(route.params.departmentId)
      } else {
        setSelected('0')
      }
    }, [route?.params?.departmentId]),
  )

  const { data: departmentsResponse } = useQuery({
    queryKey: ['departments'],
    queryFn: async () => await (await api.public.departments.$get(client)).json(),
  })

  const departments = useMemo(() => departmentsResponse?.data || [], [departmentsResponse])

  const allItems = useMemo(() => [ALL_SPECIALTY, ...departments], [departments])

  const { data: doctorsResponse, isLoading } = useQuery({
    queryKey: ['doctors'],
    queryFn: async () => await (await api.users.doctors.$get()).json(),
  })

  const doctors = useMemo(() => doctorsResponse?.data || [], [doctorsResponse])

  const handleChipSelect = useCallback((id: number | string) => {
    setSelected(id.toString())
  }, [])

  const filteredDoctors = useMemo(() => {
    let result =
      selected !== '0'
        ? doctors.filter((doctor) => doctor.department === departments.find((d) => d.id === selected)?.name)
        : doctors
    if (searchQuery) {
      const query = searchQuery.toLowerCase()
      result = result.filter(
        (d) =>
          d.name.toLowerCase().includes(query) ||
          d.specialization?.toLowerCase().includes(query) ||
          d.department?.toLowerCase().includes(query),
      )
    }
    return result
  }, [selected, searchQuery, doctors, departments])

  return (
    <View className='flex-1'>
      <HybridHead
        showBackButton={true}
        title={'Doctors'}
        showSearch={true}
        searchPlaceholder='Search doctors, specialties...'
        chipItems={allItems}
        selectedChipId={selected}
        onChipSelect={handleChipSelect}
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
