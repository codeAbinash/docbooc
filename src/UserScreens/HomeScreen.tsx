import { specialties } from '@/constants'
import { DoctorCard } from '@components/DoctorCard'

import Press from '@components/Press'
import { PaddingTop } from '@components/SafePadding'
import Calendar03Icon from '@hugeicons/Calendar03Icon'
import Medicine02Icon from '@hugeicons/Medicine02Icon'
import NotificationSquareIcon from '@hugeicons/NotificationSquareIcon'

import Search01Icon from '@hugeicons/Search01Icon'
import { useNavigation } from '@react-navigation/native'

import { Black, Bold, Medium, Regular, SemiBold } from '@utils/fonts'
import { NavProp, StackNav } from '@utils/types'
import { ScrollView, TouchableOpacity, useColorScheme, View, useWindowDimensions, Animated } from 'react-native'
import UpcomingScheduleCard from './UpcomingScheduleCard'

import Animations from '@assets/animations/animations'
import { Lottie } from '@components/Lottie'
import { useRef } from 'react'

export default function HomeScreen({ navigation }: NavProp) {
  const { width } = useWindowDimensions()
  const scrollY = useRef(new Animated.Value(0)).current

  return (
    <View className='flex-1'>
      <StickyAppBar navigation={navigation} scrollY={scrollY} />
      <Animated.ScrollView
        className='flex-1 bg-white'
        contentContainerClassName='pb-10'
        scrollEventThrottle={16}
        onScroll={Animated.event([{ nativeEvent: { contentOffset: { y: scrollY } } }], { useNativeDriver: false })}
      >
        <Header navigation={navigation} />
        <UpcomingSchedule />
        <SearchDoctorByDept />
        {specialties.map((specialty) => (
          <TopDoctors key={specialty.id} specialty={specialty} />
        ))}
      </Animated.ScrollView>
    </View>
  )
}

function StickyAppBar({ navigation, scrollY }: { navigation: NavProp['navigation']; scrollY: Animated.Value }) {
  const scheme = useColorScheme()
  const opacity = scrollY.interpolate({
    inputRange: [0, 100],
    outputRange: [0, 1],
    extrapolate: 'clamp',
  })

  const translateY = scrollY.interpolate({
    inputRange: [0, 100],
    outputRange: [-60, 0],
    extrapolate: 'clamp',
  })

  return (
    <Animated.View
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 100,
        backgroundColor: '#FFFFFF',
        opacity,
        transform: [{ translateY }],
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
      }}
    >
      <PaddingTop />
      <View className='flex-row items-center justify-between gap-3 px-6 py-3'>
        <Medium className='text-4xl'>DocBooc</Medium>

        <View className='flex-row items-center justify-between gap-3'>
          <Press
            onPress={() => navigation.navigate('Login' as any)}
            className='rounded-lg border border-gray-200 bg-gray-50 p-2.5 dark:border-zinc-700 dark:bg-zinc-900'
          >
            <NotificationSquareIcon color={scheme === 'dark' ? '#fff' : '#333'} size={18} strokeWidth={1.7} />
          </Press>
          <Press
            onPress={() => navigation.navigate('Login' as any)}
            className='rounded-lg border border-gray-200 bg-gray-50 p-2.5 dark:border-zinc-700 dark:bg-zinc-900'
          >
            <Search01Icon color={scheme === 'dark' ? '#999' : '#666'} size={18} strokeWidth={1.7} />
          </Press>
        </View>
      </View>
    </Animated.View>
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
    <View className='bg-gradient-to-b from-blue-900 to-blue-700 pb-8 pt-6'>
      <View className='absolute bottom-0 left-0 right-0 top-0 opacity-40'>
        <Lottie source={Animations.motorcycle} loop style={{ width: '100%', height: 350 }} />
      </View>
      <View className='relative z-10'>
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
    </View>
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
  const { width } = useWindowDimensions()
  const navigation = useNavigation<StackNav>()

  const mockDoctor = {
    name: 'Dr. A. Barik Hossain',
    degrees: 'MBBS, MD (General Medicine)',
    department: 'Diabetes Specialist',
    experience: 5,
  }

  const cardWidth = width - 40

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
        pagingEnabled={true}
        snapToInterval={cardWidth + 16}
        snapToAlignment='start'
        decelerationRate='fast'
      >
        <View style={{ width: cardWidth, marginRight: 16 }}>
          <DoctorCard
            doctor={mockDoctor}
            showSelector={false}
            showBookButton={true}
            onAdd={() => navigation.navigate('BookAppointment' as any)}
          />
        </View>
        <View style={{ width: cardWidth, marginRight: 16 }}>
          <DoctorCard
            doctor={mockDoctor}
            showSelector={false}
            showBookButton={true}
            onAdd={() => navigation.navigate('BookAppointment' as any)}
          />
        </View>
        <View style={{ width: cardWidth, marginRight: 16 }}>
          <DoctorCard
            doctor={mockDoctor}
            showSelector={false}
            showBookButton={true}
            onAdd={() => navigation.navigate('BookAppointment' as any)}
          />
        </View>
        <View style={{ width: cardWidth, marginRight: 16 }}>
          <DoctorCard
            doctor={mockDoctor}
            showSelector={false}
            showBookButton={true}
            onAdd={() => navigation.navigate('BookAppointment' as any)}
          />
        </View>
      </ScrollView>
    </View>
  )
}
