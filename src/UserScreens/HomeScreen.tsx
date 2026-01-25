import { DoctorCard } from '@components/DoctorCard'

import Press from '@components/Press'
import { PaddingTop } from '@components/SafePadding'
import Calendar03Icon from '@hugeicons/Calendar03Icon'
import NotificationSquareIcon from '@hugeicons/NotificationSquareIcon'

import Search01Icon from '@hugeicons/Search01Icon'
import { useNavigation, useFocusEffect } from '@react-navigation/native'

import { Medium, Regular, SemiBold } from '@utils/fonts'
import { NavProp, StackNav } from '@utils/types'
import { Animated, ScrollView, TouchableOpacity, useColorScheme, useWindowDimensions, View } from 'react-native'

import { Department } from '@/AdminScreens/Department/types'
import { useQuery } from '@tanstack/react-query'
import { api, client } from '@utils/client'
import { getIconByName } from '@utils/icons'
import { useCallback, useRef } from 'react'

export default function HomeScreen({ navigation }: NavProp) {
  const { width } = useWindowDimensions()
  const scrollY = useRef(new Animated.Value(0)).current

  const {
    data,
    isLoading,
    refetch: refetchDepartments,
  } = useQuery({
    queryKey: ['departments'],
    queryFn: async () => await (await api.public.departments.$get(client)).json(),
  })

  const {
    data: doctorsResponse,
    isLoading: isDoctorsLoading,
    refetch: refetchDoctors,
  } = useQuery({
    queryKey: ['doctors'],
    queryFn: async () => await (await api.users.doctors.$get()).json(),
  })

  useFocusEffect(
    useCallback(() => {
      refetchDepartments()
      refetchDoctors()
    }, [refetchDepartments, refetchDoctors]),
  )

  const departments = data?.data || []
  const doctors = doctorsResponse?.data || []

  return (
    <View className='flex-1'>
      <PaddingTop />
      <ScrollView className='flex-1 bg-white' contentContainerClassName='' showsVerticalScrollIndicator={false}>
        <Header navigation={navigation} />
        {/* <UpcomingSchedule /> */}
        <SearchDoctorByDept departments={departments} isLoading={isLoading} />
        {departments.map((department) => (
          <TopDoctors key={department.id} department={department} doctors={doctors} isLoading={isDoctorsLoading} />
        ))}
      </ScrollView>
    </View>
  )
}

function Header({ navigation }: NavProp) {
  const scheme = useColorScheme()

  return (
    <View>
      <View className='flex-1 flex-row px-6 dark:border-card-dark/20'>
        <View className='flex-1 justify-center gap-8'>
          <Medium className='text text-4xl'>DocBooc</Medium>
          <View>
            <View className='flex-row gap-2'>
              <Regular className='text text-4xl opacity-50'>Find</Regular>
              <Medium className='text text-4xl'>Your</Medium>
            </View>
            <View className='mt-2 flex-row gap-2'>
              <Medium className='text text-4xl'>Specialist</Medium>
              <Regular className='text text-4xl opacity-50'>Doctor</Regular>
            </View>
          </View>
        </View>

        <View className='gap-1'>
          <Press
            onPress={() => navigation.navigate('Doctors' as any, { openSearch: true })}
            className='bg rounded-full border border-neutral-300 p-4 dark:bg-zinc-900'
          >
            <Search01Icon color={scheme === 'dark' ? 'white' : 'black'} size={20} strokeWidth={1.7} />
          </Press>
          <Press
            onPress={() => navigation.navigate('Login' as any)}
            className='bg rounded-full border border-neutral-300 p-4 dark:bg-zinc-900'
          >
            <NotificationSquareIcon color={scheme === 'dark' ? 'white' : 'black'} size={20} strokeWidth={1.7} />
          </Press>
          <Press className='bg rounded-full border border-neutral-300 p-4 dark:bg-zinc-900'>
            <Calendar03Icon color={scheme === 'dark' ? 'white' : 'black'} size={20} strokeWidth={1.7} />
          </Press>
        </View>
      </View>
    </View>
  )
}

// function UpcomingSchedule() {
//   // Replace with your actual data source - null if no data
//   const upcomingData = null

//   if (!upcomingData) return null

//   return (
//     <View className='gap-5 p-5'>
//       <View className='mt-5 flex-row items-center justify-between'>
//         <Bold className='text text-md'>Upcoming</Bold>
//         <SemiBold className='text-sm text-accent'>See All</SemiBold>
//       </View>
//       <UpcomingScheduleCard data={upcomingData} />
//     </View>
//   )
// }

interface SearchDoctorByDeptProps {
  departments: Department[]
  isLoading: boolean
}

const SearchDoctorByDept = ({ departments, isLoading }: SearchDoctorByDeptProps) => {
  const navigation = useNavigation<StackNav>()

  if (isLoading) {
    return null
  }

  return (
    <View className='flex-1 gap-3 px-6 py-6'>
      <View className='flex-row items-center justify-between'>
        <SemiBold className='text text-lg'>Search doctor by department</SemiBold>
        <TouchableOpacity onPress={() => navigation.navigate('Departments' as any)}>
          <Medium className='text-base text-blue-600'>See All</Medium>
        </TouchableOpacity>
      </View>

      <View className='flex-row flex-wrap items-center justify-between gap-y-5'>
        {departments.slice(0, 8).map((department) => {
          const IconComponent = getIconByName(department.icon)
          return (
            <TouchableOpacity
              key={department.id}
              className='items-center gap-3'
              style={{ width: '25%' }}
              activeOpacity={0.7}
              onPress={() => navigation.navigate('Doctors', { departmentId: department.id })}
            >
              <View className='items-center justify-center rounded-full bg-accent/90' style={{ width: 65, height: 65 }}>
                <IconComponent size={30} color={'#FFFFFF'} />
              </View>
              <Medium className='text text-center text-sm opacity-60' numberOfLines={1}>
                {department.name}
              </Medium>
            </TouchableOpacity>
          )
        })}
      </View>
    </View>
  )
}

interface TopDoctorsProps {
  department: Department
  doctors: any[]
  isLoading: boolean
}

function TopDoctors({ department, doctors, isLoading }: TopDoctorsProps) {
  const { width } = useWindowDimensions()
  const navigation = useNavigation<StackNav>()

  const departmentDoctors = doctors.filter((doctor) => doctor.department === department.name).slice(0, 4)

  if (isLoading || departmentDoctors.length === 0) {
    return null
  }

  const cardWidth = width - 40

  return (
    <View className='flex-1 gap-3 pb-6'>
      <View className='flex-row items-center justify-between px-6'>
        <SemiBold className='text text-base'>Experts in {department.name}</SemiBold>
        <TouchableOpacity onPress={() => navigation.navigate('Doctors', { departmentId: department.id })}>
          <Medium className='text-base text-blue-600'>See All</Medium>
        </TouchableOpacity>
      </View>

      <ScrollView
        horizontal
        contentContainerClassName='px-6'
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
        snapToInterval={cardWidth + 16}
        snapToAlignment='start'
        decelerationRate='normal'
        disableIntervalMomentum={true}
        contentContainerStyle={{ gap: 16 }}
      >
        {departmentDoctors.map((doctor) => (
          <View key={doctor.id} style={{ width: cardWidth }}>
            <DoctorCard
              doctor={doctor}
              showSelector={false}
              showBookButton={true}
              onAdd={() =>
                navigation.navigate('BookAppointment', {
                  doctor: { ...doctor, specialization: doctor.specialization || doctor.department },
                })
              }
            />
          </View>
        ))}
      </ScrollView>
    </View>
  )
}
