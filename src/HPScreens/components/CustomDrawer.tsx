import { logout } from '@/AdminScreens/utils'
import { handleLogout } from '@/HPScreens/utils/utils'
import Calendar01Icon from '@assets/icons/hugeicons/Calendar01Icon'
import Calendar03Icon from '@assets/icons/hugeicons/Calendar03Icon'
import Logout05Icon from '@assets/icons/hugeicons/Logout05Icon'
import NotificationSquareIcon from '@assets/icons/hugeicons/NotificationSquareIcon'
import PatientIcon from '@assets/icons/hugeicons/PatientIcon'
import TimeScheduleIcon from '@assets/icons/hugeicons/TimeScheduleIcon'
import UserIcon from '@assets/icons/hugeicons/UserIcon'
import { DrawerContentScrollView } from '@react-navigation/drawer'
import { useTheme } from '@react-navigation/native'
import Colors from '@utils/colors'
import { Medium, SemiBold } from '@utils/fonts'
import { View } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import Press from '../../components/Press'
import ProfilePicture from '../../components/ProfilePicture'

const DRAWER_ITEMS = [
  { name: "Today's Appointments", icon: Calendar01Icon, navigationName: 'Appointments' },
  { name: 'Upcoming Appointments', icon: Calendar03Icon, navigationName: 'UpcomingAppointments' },
  { name: 'Schedule Doctors', icon: TimeScheduleIcon, navigationName: 'ScheduleDoctors' },
  { name: 'View Doctors', icon: UserIcon, navigationName: 'ViewDoctors' },
  { name: 'Add Patients', icon: PatientIcon, navigationName: 'AddPatients' },
  { name: 'Confirm Bookings', icon: PatientIcon, navigationName: 'ConfirmBookings' },
  { name: 'Approve Schedules', icon: PatientIcon, navigationName: 'ApproveSchedules' },
  { name: "View Hp's", icon: PatientIcon, navigationName: 'ViewHPs' },
  { name: 'Settings', icon: NotificationSquareIcon, navigationName: 'Settings' },
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
            const isActive = currentRoute === item.navigationName
            const Icon = item.icon
            return (
              <Press
                key={item.name}
                onPress={() => navigation.navigate(item.navigationName)}
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

      <View className='border-t px-1 pt-3' style={{ paddingBottom: insets.bottom + 12, borderColor: colors.border }}>
        <Press
          onPress={() => handleLogout(() => logout('HPLogin'))}
          className='flex-row items-center gap-4 rounded-lg px-4 py-3.5'
        >
          <View className='size-6 items-center justify-center'>
            <Logout05Icon size={22} color='#ef4444' strokeWidth={1.8} />
          </View>
          <Medium className='text-md flex-lg' style={{ color: '#ef4444' }}>
            Logout
          </Medium>
        </Press>
      </View>
    </View>
  )
}
