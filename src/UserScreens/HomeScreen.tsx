import { specialties } from '@/constants'
import { DoctorCard } from '@components/DoctorCard'

import Press from '@components/Press'
import { PaddingTop } from '@components/SafePadding'
import Calendar03Icon from '@hugeicons/Calendar03Icon'
import Medicine02Icon from '@hugeicons/Medicine02Icon'
import NotificationSquareIcon from '@hugeicons/NotificationSquareIcon'

import Search01Icon from '@hugeicons/Search01Icon'
import { useNavigation } from '@react-navigation/native'
import Colors from '@utils/colors'
import { Black, Bold, Medium, Regular, SemiBold } from '@utils/fonts'
import { NavProp, StackNav } from '@utils/types'
import { ScrollView, TouchableOpacity, useColorScheme, View, useWindowDimensions } from 'react-native'
import UpcomingScheduleCard from './UpcomingScheduleCard'
import { fa } from 'zod/v4/locales'

export default function HomeScreen({ navigation }: NavProp) {
  const { width } = useWindowDimensions()

  return (
    <ScrollView className='bg flex-1' contentContainerClassName='pb-10'>
      <Header navigation={navigation} />
      <UpcomingSchedule />
      <SearchDoctorByDept />
      {specialties.map((specialty) => (
        <TopDoctors key={specialty.id} specialty={specialty} />
      ))}
      {/* <Footer /> */}
    </ScrollView>
  )
}

// function Footer() {
//   return (
//     <View className='items-start px-6 pt-10'>
//       <Regular className='text text-3xl opacity-40'>{'DocBooc'}</Regular>
//       <Medium className='text opacity-50'>
//         Crafted with ❤️ for you
//       </Medium>
//     </View>
//   )
// }

function Header({ navigation }: NavProp) {
  const scheme = useColorScheme()

  return (
    <>
      <View className=''>
        <PaddingTop />
        <View className='flex-1 flex-row px-6 dark:border-card-dark/20'>
          <View className='flex-1 justify-between pt-5'>
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

          <View className='gap-1.5 pt-2'>
            <Press className='rounded-full bg-white p-4 dark:bg-zinc-900'>
              <NotificationSquareIcon color={scheme === 'dark' ? 'white' : 'black'} size={20} strokeWidth={1.7} />
            </Press>
            <Press className='rounded-full bg-white p-4 dark:bg-zinc-900'>
              <Calendar03Icon color={scheme === 'dark' ? 'white' : 'black'} size={20} strokeWidth={1.7} />
            </Press>
            <Press
              onPress={() => navigation.navigate('Doctors' as any, { openSearch: true })}
              className='rounded-full bg-white p-4 dark:bg-zinc-900'
            >
              <Search01Icon color={scheme === 'dark' ? 'white' : 'black'} size={20} strokeWidth={1.7} />
            </Press>
          </View>
        </View>
      </View>
    </>
  )
}

function UpcomingSchedule() {
  // Replace with your actual data source - null if no data
  const upcomingData = null

  if (!upcomingData) return null

  return (
    <View className='gap-5 p-5'>
      <View className='mt-5 flex-row items-center justify-between'>
        <Bold className='text text-md'>Upcoming</Bold>
        <SemiBold className='text-sm text-accent'>See All</SemiBold>
      </View>
      <UpcomingScheduleCard data={upcomingData} />
    </View>
  )
}

const SearchDoctorByDept = () => {
  const navigation = useNavigation<StackNav>()

  return (
    <View className='px-5 pb-5 pt-10'>
      <View className='flex-row items-center justify-between pb-5'>
        <SemiBold className='text text-base'>Search doctor by department</SemiBold>
        <TouchableOpacity onPress={() => navigation.navigate('Departments' as any)}>
          <Medium className='text-base text-blue-600'>See All</Medium>
        </TouchableOpacity>
      </View>

      <View className='flex-row flex-wrap items-center justify-between gap-y-5'>
        {specialties.map((specialty) => {
          const IconComponent = specialty.icon || Medicine02Icon
          return (
            <TouchableOpacity
              key={specialty.id}
              className='items-center gap-3 px-1'
              style={{ width: '25%' }} // 4 items per row with some spacing
              activeOpacity={0.7}
              onPress={() => navigation.navigate('Doctors')}
            >
              <View className='items-center justify-center rounded-full bg-accent/90' style={{ width: 65, height: 65 }}>
                <IconComponent size={30} color={'#FFFFFF'} />
              </View>
              <Medium className='text text-center text-sm opacity-80' numberOfLines={1} style={{ lineHeight: 15 }}>
                {specialty.name}
              </Medium>
            </TouchableOpacity>
          )
        })}
      </View>
    </View>
  )
}

interface TopDoctorsProps {
  specialty: {
    id: number
    name: string
    icon: any
  }
}

function TopDoctors({ specialty }: TopDoctorsProps) {
  const navigation = useNavigation<StackNav>()

  const mockDoctor = {
    name: 'Dr. A. Barik Hossain',
    degrees: 'MBBS, MD (General Medicine)',
    department: 'Diabetes Specialist',
    experience: 5,
  }

  return (
    <View className='gap-5 py-5'>
      <View className='flex-row items-center justify-between px-5'>
        <SemiBold className='text text-base'>Experts in {specialty.name}</SemiBold>
        <TouchableOpacity>
          <Medium className='text-base text-blue-600'>See All</Medium>
        </TouchableOpacity>
      </View>

      <ScrollView
        horizontal
        contentContainerClassName='px-5'
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
      >
        <View style={{ width: 375, marginRight: 16 }}>
          <DoctorCard
            doctor={mockDoctor}
            // onPress={() => navigation.navigate('BookAppointment' as any)}
            showSelector={false}
            showBookButton={true}
            onAdd={() => navigation.navigate('BookAppointment' as any)}
          />
        </View>
        <View style={{ width: 375, marginRight: 16 }}>
          <DoctorCard
            doctor={mockDoctor}
            // onPress={() => navigation.navigate('BookAppointment' as any)}
            showSelector={false}
            showBookButton={true}
            onAdd={() => navigation.navigate('BookAppointment' as any)}
          />
        </View>
        <View style={{ width: 375, marginRight: 16 }}>
          <DoctorCard
            doctor={mockDoctor}
            // onPress={() => navigation.navigate('BookAppointment' as any)}
            showSelector={false}
            showBookButton={true}
            onAdd={() => navigation.navigate('BookAppointment' as any)}
          />
        </View>
        <View style={{ width: 375, marginRight: 16 }}>
          <DoctorCard
            doctor={mockDoctor}
            // onPress={() => navigation.navigate('BookAppointment' as any)}
            showSelector={false}
            showBookButton={true}
            onAdd={() => navigation.navigate('BookAppointment' as any)}
          />
        </View>
      </ScrollView>
    </View>
  )
}
