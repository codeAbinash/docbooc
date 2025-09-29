import { specialties } from '@/constants'
import Gradient from '@components/Gradient'
import Press from '@components/Press'
import { PaddingTop } from '@components/SafePadding'
import Calendar03Icon from '@hugeicons/Calendar03Icon'
import Medicine02Icon from '@hugeicons/Medicine02Icon'
import NotificationSquareIcon from '@hugeicons/NotificationSquareIcon'
import PlusSignIcon from '@hugeicons/PlusSignIcon'
import Search01Icon from '@hugeicons/Search01Icon'
import { useNavigation } from '@react-navigation/native'
import Colors from '@utils/colors'
import { Black, Bold, Medium, Regular, SemiBold } from '@utils/fonts'
import { NavProp, StackNav } from '@utils/types'
import { ScrollView, TouchableOpacity, useColorScheme, View } from 'react-native'
import UpcomingScheduleCard from './UpcomingScheduleCard'

export default function HomeScreen({ navigation }: NavProp) {
  return (
    <ScrollView className='bg flex-1' contentContainerClassName='pb-10'>
      <Header />
      <UpcomingSchedule />
      <DoctorSpecialties />
      <TopGeneralPhysician />
      <TopGeneralPhysician />
      <TopGeneralPhysician />
      <TopGeneralPhysician />
      <Footer />
    </ScrollView>
  )
}

function Footer() {
  return (
    <View className='px-6 pb-5 pt-20'>
      <Black className='text text-6xl opacity-40'>{'Doc\nBook'}</Black>
      <SemiBold className='text mt-2 text-sm opacity-50'>Your health, our priority! </SemiBold>
      <SemiBold className='text opacity-50'>
        Crafted with ❤️ in <Bold>India</Bold>
      </SemiBold>
    </View>
  )
}

function Header() {
  const scheme = useColorScheme()

  return (
    <>
      <View className=''>
        <PaddingTop />
        <View className='flex-1 flex-row px-6 dark:border-card-dark/20'>
          <View className='flex-1 justify-between pt-4'>
            <SemiBold className='text text-2xl'>DocBook</SemiBold>
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

          <View className='gap-2 pt-2'>
            <Press className='rounded-full bg-white p-3 dark:bg-zinc-900'>
              <NotificationSquareIcon color={scheme === 'dark' ? 'white' : 'black'} size={20} strokeWidth={1.7} />
            </Press>
            <Press className='rounded-full bg-white p-3 dark:bg-zinc-900'>
              <Calendar03Icon color={scheme === 'dark' ? 'white' : 'black'} size={20} strokeWidth={1.7} />
            </Press>
            <Press className='rounded-full bg-white p-3 dark:bg-zinc-900'>
              <Search01Icon color={scheme === 'dark' ? 'white' : 'black'} size={20} strokeWidth={1.9} />
            </Press>
          </View>
        </View>
      </View>
    </>
  )
}

function UpcomingSchedule() {
  return (
    <View className='gap-5 p-5 pb-0'>
      <View className='mt-5 flex-row items-center justify-between'>
        <Bold className='text text-md'>Upcoming</Bold>
        <SemiBold className='text-sm text-accent'>See All</SemiBold>
      </View>
      <UpcomingScheduleCard />
    </View>
  )
}

const DoctorSpecialties = () => {
  const navigation = useNavigation<StackNav>()

  return (
    <View className='gap-5 px-5 pb-5 pt-2'>
      <View className='mt-5 flex-row items-center justify-between'>
        <Bold className='text text-md'>Specialties</Bold>
        <TouchableOpacity>
          <Medium className='text-sm font-semibold text-blue-600'>See All</Medium>
        </TouchableOpacity>
      </View>

      <View className='flex-row flex-wrap justify-between gap-y-5'>
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
              <View
                className='items-center justify-center rounded-full border border-accent/20 bg-accent/20 shadow-sm'
                style={{ width: 63, height: 63 }}
              >
                <IconComponent size={28} color={Colors.accent} variant='duotone-rounded' />
              </View>
              <SemiBold
                className='text text-center text-xs font-medium leading-5 opacity-80'
                numberOfLines={1}
                style={{ lineHeight: 12.5 }}
              >
                {specialty.name}
              </SemiBold>
            </TouchableOpacity>
          )
        })}
      </View>
    </View>
  )
}

function TopGeneralPhysician() {
  return (
    <View className='gap-5 pb-0 pt-2'>
      <View className='mt-5 flex-row items-center justify-between px-5'>
        <Bold className='text text-md'>Top General Physicians</Bold>
        <TouchableOpacity>
          <Medium className='text-sm font-semibold text-blue-600'>See All</Medium>
        </TouchableOpacity>
      </View>

      <ScrollView
        horizontal
        contentContainerClassName='flex-row flex-wrap justify-between gap-x-4 px-5'
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
      >
        <DoctorList />
        <DoctorList />
        <DoctorList />
        <DoctorList />
      </ScrollView>
    </View>
  )
}

function DoctorList() {
  const navigation = useNavigation<StackNav>()
  return (
    <View className='gap-3.5 rounded-3xl bg-white px-4 py-5 dark:bg-zinc-900' style={{ width: 170 }}>
      <View className='gap-2 px-2'>
        <SemiBold className='text text-lg'>Dr. A. Barik Hossain</SemiBold>
        <Medium className='gray text-xs' numberOfLines={2}>
          MBBS, MD (General Medicine)
        </Medium>
        <Medium className='rounded-full text-xs text-accent' style={{ fontSize: 9.5 }}>
          Diabetes Specialist
        </Medium>
      </View>
      <TouchableOpacity
        className='overflow-hidden rounded-xl'
        activeOpacity={0.7}
        onPress={() => navigation.navigate('BookAppointment')}
      >
        <Gradient className='flex-row items-center justify-center gap-1.5 px-4 py-3'>
          <PlusSignIcon color='white' size={16} strokeWidth={2.5} />
          <Medium className='text-center text-xs text-white'>Book Appointment</Medium>
        </Gradient>
      </TouchableOpacity>
    </View>
  )
}
