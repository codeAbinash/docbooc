import { DoctorCard } from '@components/DoctorCard'
import HybridHead from '@components/HybridHead'
import Doctor01Icon from '@hugeicons/Doctor01Icon'
import { useNavigation } from '@react-navigation/native'
import { useQuery } from '@tanstack/react-query'
import { api, client, hpApi } from '@utils/client'
import Colors from '@utils/colors'
import { HPStackNav } from '@utils/types'
import { useCallback, useMemo, useRef, useState } from 'react'
import { ActivityIndicator, FlatList, View } from 'react-native'
import { ScrollView } from 'react-native-gesture-handler'

export const ALL_SPECIALTY = { id: '0', name: 'All', icon: Doctor01Icon }

const HPScheduleDoctors = () => {
  const navigate = useNavigation<HPStackNav>()
  const [selected, setSelected] = useState<string>('0')
  const [searchQuery, setSearchQuery] = useState('')
  const scrollViewRef = useRef<ScrollView>(null)

  const handleChipSelect = useCallback((id: number | string) => {
    setSelected(typeof id === 'string' ? id : id.toString())
  }, [])

  const { data: departmentsResponse } = useQuery({
    queryKey: ['departments'],
    queryFn: async () => await (await api.public.departments.$get(client)).json(),
  })

  const departments = useMemo(() => departmentsResponse?.data || [], [departmentsResponse])

  const allItems = useMemo(() => [ALL_SPECIALTY, ...departments], [departments])

  const { data: doctorsResponse, isLoading } = useQuery({
    queryKey: ['doctors'],
    queryFn: async () => (await hpApi.doctors.all.$get()).json(),
  })

  const doctors = useMemo(() => doctorsResponse?.data || [], [doctorsResponse])

  const filteredDoctors = useMemo(() => {
    let result =
      selected !== '0'
        ? doctors.filter((doctor) => doctor.department === departments.find((d) => d.id === selected)?.name)
        : doctors
    if (searchQuery) {
      const query = searchQuery.toLowerCase()
      result = result.filter(
        (d) => d.name.toLowerCase().includes(query) || d.specialization?.toLowerCase().includes(query),
      )
    }
    return result
  }, [selected, searchQuery, doctors, departments])

  return (
    <View className='flex-1'>
      <HybridHead
        showMenu={true}
        title='Schedule Doctors'
        showSearch={true}
        searchPlaceholder='Search doctors, specialties...'
        chipItems={allItems}
        selectedChipId={selected}
        onChipSelect={handleChipSelect}
        chipScrollRef={scrollViewRef}
        onSearchChange={setSearchQuery}
      />

      <View className='flex-1 bg-white dark:bg-neutral-900'>
        {isLoading ? (
          <View className='flex-1 items-center justify-center'>
            <ActivityIndicator size='large' color={Colors.accent} />
          </View>
        ) : (
          <FlatList
            className='flex-1 pt-2'
            contentContainerClassName='px-5 pb-10'
            data={filteredDoctors}
            renderItem={({ item }) => (
              <DoctorCard
                doctor={item}
                showSelector={false}
                selected={false}
                onPress={() =>
                  item.specialization &&
                  navigate.navigate('HPDoctorScheduler', {
                    doctorId: item.id,
                    doctorName: item.name,
                  })
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

export default HPScheduleDoctors
