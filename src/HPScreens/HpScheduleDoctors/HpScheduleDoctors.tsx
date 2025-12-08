import { specialties } from '@/constants'
import { ALL_SPECIALTY } from '@/UserScreens/Doctors/Doctors'
import Chip from '@components/Chip'
import { DoctorCard } from '@components/DoctorCard'
import Gradient from '@components/Gradient'
import HybridHead from '@components/HybridHead'
import { useNavigation } from '@react-navigation/native'
import { useQuery } from '@tanstack/react-query'
import { hpApi } from '@utils/client'
import Colors from '@utils/colors'
import { HPStackNav } from '@utils/types'
import { useCallback, useMemo, useRef, useState } from 'react'
import { ActivityIndicator, FlatList, Text, TouchableOpacity, View } from 'react-native'
import { ScrollView } from 'react-native-gesture-handler'

const HPScheduleDoctors = () => {
  const navigate = useNavigation<HPStackNav>()
  const [selected, setSelected] = useState(0)
  const [selectedDoctorId, setSelectedDoctorId] = useState<string | null>(null)
  const [searchQuery, setSearchQuery] = useState('')
  const scrollViewRef = useRef<ScrollView>(null)

  const { data: doctorsData, isLoading } = useQuery({
    queryKey: ['doctors'],
    queryFn: async () => (await hpApi.doctors.all.$get()).json(),
  })

  const doctors = doctorsData?.data || []
  const selectedDoctor = doctors.find((d) => d.id === selectedDoctorId)
  const allItems = [ALL_SPECIALTY, ...specialties]

  const filteredDoctors = useMemo(() => {
    if (!searchQuery) return doctors
    const query = searchQuery.toLowerCase()
    return doctors.filter(
      (d) => d.name.toLowerCase().includes(query) || d.specialization?.toLowerCase().includes(query),
    )
  }, [doctors, searchQuery])

  const handleSpecialtySelect = (id: number) => {
    setSelected(id)
  }

  return (
    <View className='flex-1'>
      <HybridHead
        title='Schedule Doctors'
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
            className='flex-1 pt-4'
            contentContainerClassName='px-5 pb-10'
            data={filteredDoctors}
            renderItem={({ item }) => (
              <DoctorCard
                doctor={item}
                selected={selectedDoctorId === item.id}
                onPress={() => setSelectedDoctorId(item.id)}
              />
            )}
            keyExtractor={(item) => item.id.toString()}
            ItemSeparatorComponent={() => <View className='h-4' />}
            showsVerticalScrollIndicator={false}
          />
        )}
      </View>

      <View className='bg-white px-6 pb-10 pt-4 dark:bg-neutral-800'>
        <TouchableOpacity
          disabled={!selectedDoctorId}
          activeOpacity={0.7}
          onPress={() => {
            if (selectedDoctor) {
              navigate.navigate('HPDoctorScheduler', {
                doctorId: selectedDoctor.id,
                doctorName: selectedDoctor.name,
              })
            }
          }}
          className='overflow-hidden rounded-xl'
        >
          <Gradient
            colors={selectedDoctorId ? undefined : ['#d1d5db', '#d1d5db']}
            className='flex-row items-center justify-center px-6 py-4'
          >
            <Text className='text-center text-base font-semibold text-white'>Continue</Text>
          </Gradient>
        </TouchableOpacity>
      </View>
    </View>
  )
}

export default HPScheduleDoctors
