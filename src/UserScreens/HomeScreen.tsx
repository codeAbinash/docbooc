import { DoctorCard } from '@components/DoctorCard'
import DepartmentCard from '@components/DepartmentCard'
import Press from '@components/Press'
import { PaddingTop } from '@components/SafePadding'
import { Lottie } from '@components/Lottie'
import Calendar03Icon from '@hugeicons/Calendar03Icon'
import NotificationSquareIcon from '@hugeicons/NotificationSquareIcon'

import Search01Icon from '@hugeicons/Search01Icon'
import Cancel01Icon from '@hugeicons/Cancel01Icon'
import { useNavigation, useFocusEffect } from '@react-navigation/native'

import { Medium, Regular, SemiBold } from '@utils/fonts'
import { NavProp, StackNav } from '@utils/types'
import {
  Animated,
  ScrollView,
  TouchableOpacity,
  useColorScheme,
  useWindowDimensions,
  View,
  Modal,
  Pressable,
  Image,
} from 'react-native'

import { Department } from '@/AdminScreens/Department/types'
import { useQuery } from '@tanstack/react-query'
import { api, client } from '@utils/client'
import { getIconByName, IconType } from '@utils/icons'
import Animations from '@assets/animations/animations'
import { useCallback, useRef, useState } from 'react'

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
        <ServiceBoxes navigation={navigation} />
        <HealthProblemCategories navigation={navigation} />
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

function ServiceBoxes({ navigation }: NavProp) {
  const scheme = useColorScheme()
  const { width } = useWindowDimensions()

  interface Service {
    id: string
    title: string
    subtitle: string
    icon: string
  }

  const services: Service[] = [
    {
      id: 'physical',
      title: 'Physical\nAppointment',
      subtitle: 'Book your in-person appointment',
      icon: 'activity-01',
    },
    { id: 'lab', title: 'Lab Tests', subtitle: 'Quick results', icon: 'flask-01' },
    { id: 'surgery', title: 'Surgeries', subtitle: 'Expert care', icon: 'scalpel-02' },
  ]

  const physicalService = services[0]!
  const labService = services[1]!
  const surgeryService = services[2]!

  return (
    <View className='gap-4 px-6 py-5'>
      <View style={{ flex: 1, flexDirection: 'row', gap: 12 }}>
        {/* Physical Appointment - Big Box */}
        <View style={{ flex: 1 }}>
          <Press
            className='h-full justify-between rounded-3xl border border-neutral-200 bg-white dark:border-neutral-700 dark:bg-neutral-900'
            onPress={() => {}}
          >
            <View className='flex-1 flex-col items-start justify-center'>
              <View className='flex flex-1 items-start justify-center p-4'>
                <SemiBold className='text text-lg'>{physicalService.title}</SemiBold>
                <Regular className='text text-xs opacity-60'>{physicalService.subtitle}</Regular>
              </View>
              <View className='flex flex-1 items-center justify-center pb-2'>
                <Lottie source={Animations.physical} autoPlay loop style={{ width: 175, height: 100 }} />
              </View>
            </View>
          </Press>
        </View>

        {/* Right box container */}
        <View style={{ flex: 1, gap: 12 }}>
          {/* Lab Tests */}
          <Press className='flex flex-row rounded-3xl border border-neutral-200 bg-white' onPress={() => {}}>
            <View className='flex-1 flex-row items-center justify-center py-2'>
              <View className='flex flex-1 items-center'>
                <SemiBold className='text text-base'>{labService.title}</SemiBold>
                <Regular className='text text-xs opacity-60'>{labService.subtitle}</Regular>
              </View>
              <View className='flex-1'>
                <Lottie source={Animations.labtest} autoPlay loop style={{ width: 75, height: 75 }} />
              </View>
            </View>
          </Press>

          {/* Surgeries */}
          <Press
            className='flex-1 justify-between rounded-3xl border border-neutral-200 bg-gradient-to-br from-green-50 to-green-100 p-4 dark:border-neutral-700 dark:bg-neutral-900'
            onPress={() => {}}
          >
            <View>
              <SemiBold className='text text-base'>{surgeryService.title}</SemiBold>
              <Regular className='text text-xs opacity-60'>{surgeryService.subtitle}</Regular>
            </View>
          </Press>
        </View>
      </View>
    </View>
  )
}

function HealthProblemCategories({ navigation }: NavProp) {
  const [showAllProblems, setShowAllProblems] = useState(false)

  const healthProblems: Array<{
    id: number
    title: string
    icon: IconType | null
    imageSource?: any
  }> = [
    { id: 1, title: 'General\nPhysician', icon: null, imageSource: require('@assets/icons/stethoscope.png') },
    { id: 2, title: 'Skin', icon: null, imageSource: require('@assets/icons/itching.png') },
    { id: 3, title: "Women's\nHealth", icon: null, imageSource: require('@assets/icons/gynecology.png') },
    { id: 4, title: 'Dental Care', icon: null, imageSource: require('@assets/icons/bacteria.png') },
    { id: 5, title: 'Child\nSpecialist', icon: null, imageSource: require('@assets/icons/child.png') },
    { id: 6, title: 'Ear, Nose,\nThroat', icon: null, imageSource: require('@assets/icons/head.png') },
    
    { id: 8, title: 'Hair', icon: null, imageSource: require('@assets/icons/hair-growth.png') },
    { id: 9, title: 'Sexual\nHealth', icon: null, imageSource: require('@assets/icons/sexual.png') },
    { id: 10, title: 'Eye\nSpecialist', icon: null, imageSource: require('@assets/icons/eye.png') },
    { id: 11, title: 'Diet &\nNutrition', icon: null, imageSource: require('@assets/icons/doctor.svg') },
    { id: 12, title: 'Bones &\nJoints', icon: null, imageSource: require('@assets/icons/pain-in-joints.png') },
    { id: 13, title: 'Heart', icon: null, imageSource: require('@assets/icons/heart.png') },
    { id: 14, title: 'Kidney\nIssues', icon: null, imageSource: require('@assets/icons/kidneys.png') },
    { id: 15, title: 'Cancer', icon: null, imageSource: require('@assets/icons/bacteria.png') },

    { id: 17, title: 'Homeopathy', icon: null, imageSource: require('@assets/icons/doctor.svg') },
    { id: 18, title: 'Physiotherapy', icon: null, imageSource: require('@assets/icons/pain-in-joints.png') },
    { id: 19, title: 'General\nSurgery', icon: null, imageSource: require('@assets/icons/doctor.svg') },
    { id: 20, title: 'Urinary\nIssues', icon: null, imageSource: require('@assets/icons/kidneys.png') },
    { id: 21, title: 'Lungs &\nBreathing', icon: null, imageSource: require('@assets/icons/bacteria.png') },
    { id: 22, title: 'Brain &\nNerves', icon: null, imageSource: require('@assets/icons/doctor.svg') },
    { id: 23, title: 'Diabetes\nManagement', icon: null, imageSource: require('@assets/icons/doctor.svg') },
    { id: 24, title: 'Veterinary', icon: null, imageSource: require('@assets/icons/doctor.svg') },
  ]

  return (
    <>
      <View className='gap-4 px-6 py-6'>
        <SemiBold className='text text-lg'>Find a Doctor for your Health Problem</SemiBold>

        <View className='flex-row flex-wrap items-start justify-between gap-y-5'>
          {healthProblems.slice(0, 7).map((problem) => {
            return (
              <TouchableOpacity
                key={problem.id}
                className='items-center gap-3'
                style={{ width: '25%', height: 130 }}
                activeOpacity={0.7}
                onPress={() => {}}
              >
                <View className='items-center justify-center rounded-full bg' style={{ width: 70, height: 70 }}>
                  {problem.imageSource ? (
                    <Image source={problem.imageSource} style={{ width: 32, height: 32 }} />
                  ) : (
                    (() => {
                      const IconComponent = getIconByName(problem.icon)
                      return <IconComponent size={32} strokeWidth={1.5} />
                    })()
                  )}
                </View>
                <Regular className='text text-center text-xs' numberOfLines={2}>
                  {problem.title}
                </Regular>
              </TouchableOpacity>
            )
          })}
          <TouchableOpacity
            className='items-center gap-3'
            style={{ width: '25%', height: 130 }}
            activeOpacity={0.7}
            onPress={() => setShowAllProblems(true)}
          >
            <View className='items-center justify-center rounded-full bg' style={{ width: 70, height: 70 }}>
              <View className='items-center justify-center'>
                <SemiBold className='text text-2xl'>20+</SemiBold>
              </View>
            </View>
            <Regular className='text text-center text-xs' numberOfLines={2}>
              more
            </Regular>
          </TouchableOpacity>
        </View>
      </View>

      <Modal
        visible={showAllProblems}
        transparent
        animationType='slide'
        onRequestClose={() => setShowAllProblems(false)}
      >
        <View className='flex-1  bg-black/50'>
          <Pressable className='flex-1' onPress={() => setShowAllProblems(false)} />
          <View className='max-h-[90%] rounded-t-3xl bg-white'>
            <View className='border-b border-neutral-200 px-6 py-6'>
              <View className='flex-row items-center justify-between'>
                <SemiBold className='text text-lg'>Find a Doctor for your Health Problem</SemiBold>
                <Press onPress={() => setShowAllProblems(false)} className='p-1'>
                  <Cancel01Icon size={24} strokeWidth={2} />
                </Press>
              </View>
            </View>
            <ScrollView className='px-6 py-6' showsVerticalScrollIndicator={false}>
              <View className='flex-row flex-wrap items-start justify-between gap-y-5 pb-6'>
                {healthProblems.map((problem) => {
                  return (
                    <TouchableOpacity
                      key={problem.id}
                      className='items-center gap-3'
                      style={{ width: '25%', height: 130 }}
                      activeOpacity={0.7}
                      onPress={() => {}}
                    >
                      <View
                        className='items-center justify-center rounded-full bg'
                        style={{ width: 70, height: 70 }}
                      >
                        {problem.imageSource ? (
                          <Image source={problem.imageSource} style={{ width: 32, height: 32 }} />
                        ) : (
                          (() => {
                            const IconComponent = getIconByName(problem.icon)
                            return <IconComponent size={32} strokeWidth={1.5} />
                          })()
                        )}
                      </View>
                      <Regular className='text text-center text-xs' numberOfLines={2}>
                        {problem.title}
                      </Regular>
                    </TouchableOpacity>
                  )
                })}
              </View>
            </ScrollView>
          </View>
        </View>
      </Modal>
    </>
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
    <View className='gap-3 py-6'>
      <View className='flex-row items-center justify-between px-6'>
        <SemiBold className='text text-lg'>Search doctor by department</SemiBold>
        <TouchableOpacity onPress={() => navigation.navigate('Departments' as any)}>
          <Medium className='text-base text-blue-600'>See All</Medium>
        </TouchableOpacity>
      </View>

      <ScrollView
        horizontal
        contentContainerClassName='px-3'
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
        scrollEventThrottle={16}
        contentContainerStyle={{ gap: 0 }}
      >
        {departments.slice(0, 8).map((department, index) => (
          <View key={department.id} style={{ width: 200 }}>
            <DepartmentCard
              item={department}
              index={index}
              onPress={() => navigation.navigate('Doctors', { departmentId: department.id })}
            />
          </View>
        ))}
      </ScrollView>
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
