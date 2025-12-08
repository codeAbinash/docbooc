import { specialties } from '@/constants'
import { ALL_SPECIALTY } from '@/UserScreens/Doctors/Doctors'
import { DoctorCard } from '@components/DoctorCard'
import { useNavigation } from '@react-navigation/native'
import { useQuery } from '@tanstack/react-query'
import { hpApi } from '@utils/client'
import Colors from '@utils/colors'
import { HPStackNav } from '@utils/types'
import { useCallback, useMemo, useRef, useState } from 'react'
import { ActivityIndicator, FlatList, RefreshControl, View } from 'react-native'
import { ScrollView } from 'react-native-gesture-handler'
import HybridHead from '@components/HybridHead'
import { useRefreshOnFocus } from '@/query'

const HPViewDoctors = () => {
  const navigate = useNavigation<HPStackNav>()
  const [selected, setSelected] = useState(0)
  const scrollViewRef = useRef<ScrollView>(null)
  const [searchQuery, setSearchQuery] = useState('')

  const {
    data: doctorsData,
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ['my-doctors'],
    queryFn: async () => {
      const response = await hpApi.doctors['my-doctors'].$get()
      return response.json()
    },
  })

  const [refreshing, setRefreshing] = useState(false)

  useRefreshOnFocus(refetch)

  const onRefresh = useCallback(async () => {
    setRefreshing(true)
    await refetch()
    setRefreshing(false)
  }, [refetch])

  const doctors = doctorsData?.data || []

  const filteredDoctors = useMemo(() => {
    let filtered = doctors
    if (searchQuery) {
      const query = searchQuery.toLowerCase()
      filtered = filtered.filter(
        (d) => d.name.toLowerCase().includes(query) || d.specialization?.toLowerCase().includes(query),
      )
    }
    return filtered
  }, [doctors, searchQuery])

  const handleSpecialtySelect = (id: number) => {
    setSelected(id)
  }

  const allItems = [ALL_SPECIALTY, ...specialties]

  return (
    <>
      <HybridHead
        title='View Doctors'
        searchPlaceholder='Search doctors, specialties...'
        onSearchChange={setSearchQuery}
        showMenu={true}
        showSearch={true}
        chipItems={allItems}
        selectedChipId={selected}
        onChipSelect={handleSpecialtySelect}
        chipScrollRef={scrollViewRef}
      />
      <View className='flex-1 bg-neutral-100 dark:bg-neutral-900'>
        {isLoading ? (
          <View className='flex-1 items-center justify-center'>
            <ActivityIndicator size='large' color={Colors.accent} />
          </View>
        ) : (
          <FlatList
            className='mt-4 flex-1'
            contentContainerClassName='px-5 pb-10'
            data={filteredDoctors}
            renderItem={({ item }) => (
              <DoctorCard
                doctor={item}
                showSelector={false}
                onPress={() =>
                  navigate.navigate('HPDoctorScheduleDetails', {
                    doctorId: item.id,
                    doctorName: item.name,
                  })
                }
              />
            )}
            keyExtractor={(item) => item.id.toString()}
            ItemSeparatorComponent={() => <View className='h-4' />}
            showsVerticalScrollIndicator={false}
            refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} colors={[Colors.accent]} />}
          />
        )}
      </View>
    </>
  )
}

export default HPViewDoctors
