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
import { Medium, Regular, SemiBold } from '@utils/fonts'
import { View, Text } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import Press from '../../components/Press'
import ProfilePicture from '../../components/ProfilePicture'
import PlusSignIcon from '@hugeicons/PlusSignIcon'

const DRAWER_ITEMS = [
  { name: "Today's Appointments", icon: Calendar01Icon, navigationName: 'Appointments' },
  { name: 'Upcoming Appointments', icon: Calendar03Icon, navigationName: 'UpcomingAppointments' },
  { name: 'Schedule Doctors', icon: TimeScheduleIcon, navigationName: 'ScheduleDoctors' },
  { name: 'View Doctors', icon: UserIcon, navigationName: 'ViewDoctors' },
  { name: 'Add Patients', icon: PatientIcon, navigationName: 'AddPatients' },
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
        contentContainerStyle={{ paddingTop: insets.top + 16 }}
        showsVerticalScrollIndicator={false}
      >
        <View className='' style={{ paddingBottom: 32 }}>
          <View
            className='flex-row items-center gap-4 rounded-xl px-5 py-3'
            style={{
              backgroundColor: Colors.accent + '15',
              borderWidth: 1.5,
              borderColor: Colors.accent + '30',
            }}
          >
            <ProfilePicture name='Health Point' size='md' />
            <View className='flex-1'>
              <SemiBold className='text-lg' style={{ color: colors.text }}>
                Health Point
              </SemiBold>
            </View>
            <Press onPress={() => {}} className='rounded-lg p-2' style={{ backgroundColor: Colors.accent + '20' }}>
              <PlusSignIcon size={20} color={Colors.accent} strokeWidth={1.8} />
            </Press>
          </View>
        </View>

        <View>
          <View className='gap-4'>
            {DRAWER_ITEMS.filter((item) => item.navigationName !== 'Settings').map((item) => {
              const isActive = currentRoute === item.navigationName
              const Icon = item.icon
              return (
                <Press
                  key={item.name}
                  onPress={() => navigation.navigate(item.navigationName)}
                  className='flex-row items-center gap-4 rounded-xl px-4 py-4'
                  style={{
                    backgroundColor: isActive ? Colors.accent : 'transparent',
                  }}
                >
                  <View className='size-6 items-center justify-center'>
                    <Icon size={24} color={isActive ? 'white' : colors.text} strokeWidth={1.8} />
                  </View>
                  <Medium
                    className='flex-1 text-base'
                    style={{
                      color: isActive ? 'white' : colors.text,
                    }}
                  >
                    {item.name}
                  </Medium>
                </Press>
              )
            })}
          </View>
        </View>
      </DrawerContentScrollView>

      <View
        className='border-neutral-300 pt-2 dark:border-neutral-700'
        style={{
          paddingBottom: insets.bottom + 16,
        }}
      >
        <View className='gap-4'>
          {DRAWER_ITEMS.filter((item) => item.navigationName === 'Settings').map((item) => {
            const isActive = currentRoute === item.navigationName
            const Icon = item.icon
            return (
              <Press
                key={item.name}
                onPress={() => navigation.navigate(item.navigationName)}
                className='flex-row items-center gap-4 rounded-xl px-4 py-4'
                style={{
                  backgroundColor: isActive ? Colors.accent : 'transparent',
                }}
              >
                <View className='size-6 items-center justify-center'>
                  <Icon size={24} color={isActive ? 'white' : colors.text} strokeWidth={1.8} />
                </View>
                <SemiBold
                  className='flex-1 text-base'
                  style={{
                    color: isActive ? 'white' : colors.text,
                  }}
                >
                  {item.name}
                </SemiBold>
              </Press>
            )
          })}
          <Press
            onPress={() => handleLogout(() => logout('HPLogin'))}
            className='flex-row items-center gap-4 rounded-xl px-4 py-4'
            style={{
              backgroundColor: '#ef444415',
            }}
          >
            <View className='size-6 items-center justify-center'>
              <Logout05Icon size={24} color='#ef4444' strokeWidth={1.8} />
            </View>
            <SemiBold className='flex-1 text-base' style={{ color: '#ef4444' }}>
              Logout
            </SemiBold>
          </Press>
        </View>
      </View>
    </View>
  )
}
