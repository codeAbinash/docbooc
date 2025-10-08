import { DrawerContentScrollView } from '@react-navigation/drawer'
import { useTheme } from '@react-navigation/native'
import { View } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import Press from './Press'
import ProfilePicture from './ProfilePicture'
import { SemiBold, Regular, Medium } from '@utils/fonts'
import Calendar01Icon from '@assets/icons/hugeicons/Calendar01Icon'
import Calendar03Icon from '@assets/icons/hugeicons/Calendar03Icon'
import TimeScheduleIcon from '@assets/icons/hugeicons/TimeScheduleIcon'
import PatientIcon from '@assets/icons/hugeicons/PatientIcon'
import NotificationSquareIcon from '@assets/icons/hugeicons/NotificationSquareIcon'
import UserIcon from '@assets/icons/hugeicons/UserIcon'
import Colors from '@utils/colors'

const DRAWER_ITEMS = [
  { name: 'Appointments', icon: Calendar01Icon },
  { name: 'Upcoming Appointments', icon: Calendar03Icon },
  { name: 'Schedule Doctors', icon: TimeScheduleIcon },
  { name: 'View Doctors', icon: UserIcon },
  { name: 'Add Patients', icon: PatientIcon },
  { name: 'Settings', icon: NotificationSquareIcon },
]

export default function CustomDrawer(props: any) {
  const { colors } = useTheme()
  const insets = useSafeAreaInsets()
  const { state, navigation } = props
  const currentRoute = state.routes[state.index].name

  return (
    <View className='flex-1' style={{ backgroundColor: colors.background }}>
      <DrawerContentScrollView
        {...props}
        contentContainerStyle={{ paddingTop: insets.top + 10 }}
        showsVerticalScrollIndicator={false}
      >
        <View className='mb-6 px-3'>
          <View className='flex-row items-center gap-3'>
            <ProfilePicture name='Health Point' size='md' />
            <View className='flex-1'>
              <SemiBold className='text-lg' style={{ color: colors.text }}>
                Health Point
              </SemiBold>
            </View>
            <Press className='p-2'>
              <View className='size-5' />
            </Press>
          </View>
        </View>

        <View className='gap-1 px-0'>
          {DRAWER_ITEMS.map((item) => {
            const isActive = currentRoute === item.name
            const Icon = item.icon
            return (
              <Press
                key={item.name}
                onPress={() => navigation.navigate(item.name)}
                className='flex-row items-center gap-4 rounded-lg px-4 py-3.5'
                style={{
                  backgroundColor: isActive ? `${Colors.accent}15` : 'transparent',
                }}
              >
                <View className='size-6 items-center justify-center'>
                  <Icon size={22} color={isActive ? Colors.accent : colors.text} />
                </View>
                <Medium className='text-md flex-lg' style={{ color: isActive ? Colors.accent : colors.text }}>
                  {item.name}
                </Medium>
              </Press>
            )
          })}
        </View>
      </DrawerContentScrollView>
    </View>
  )
}
