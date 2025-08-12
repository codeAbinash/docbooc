import Press from '@components/Press'
import { PaddingTop } from '@components/SafePadding'
import Calendar03Icon from '@hugeicons/Calendar03Icon'
import NotificationSquareIcon from '@hugeicons/NotificationSquareIcon'
import Search01Icon from '@hugeicons/Search01Icon'
import { Bold, Medium, Regular, SemiBold } from '@utils/fonts'
import { NavProp } from '@utils/types'
import { ScrollView, useColorScheme, View } from 'react-native'
import UpcomingScheduleCard from './UpcomingScheduleCard'

export default function HomeScreen({ navigation }: NavProp) {
  return (
    <ScrollView className='bg flex-1'>
      <Header />
      <UpcomingSchedule />
    </ScrollView>
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
    <View className='gap-5 p-5'>
      <View className='mt-5 flex-row items-center justify-between'>
        <Bold className='text text-md'>Upcoming</Bold>
        <SemiBold className='text-sm text-accent'>Sell All</SemiBold>
      </View>
      <UpcomingScheduleCard />
    </View>
  )
}
