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
  { name: 'My Doctors', icon: UserIcon, navigationName: 'ViewDoctors' },
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
        contentContainerStyle={{ paddingTop: insets.top + 24 }}
        showsVerticalScrollIndicator={false}
      >
        <View style={{ paddingHorizontal: 16, paddingBottom: 32 }}>
          <View className='flex-row items-center gap-2'>
            <View className='size-8 items-center justify-center rounded-lg' style={{ backgroundColor: Colors.accent }}>
              <SemiBold className='text-lg text-white'>ℑ</SemiBold>
            </View>
            <SemiBold className='text-xl' style={{ color: colors.text }}>
              Jiban Surakha 
            </SemiBold>
          </View>
        </View>

        <View style={{ paddingHorizontal: 8 }}>
          <View className='gap-2'>
            {DRAWER_ITEMS.map((item) => {
              const isActive = currentRoute === item.navigationName
              const Icon = item.icon
              return (
                <Press
                  key={item.name}
                  onPress={() => navigation.navigate(item.navigationName)}
                  className='flex-row items-center gap-3 rounded-lg px-4 py-3'
                  style={{
                    backgroundColor: isActive ? Colors.accent + '15' : 'transparent',
                  }}
                >
                  <View className='size-5 items-center justify-center'>
                    <Icon size={20} color={isActive ? Colors.accent : colors.text} strokeWidth={1.5} />
                  </View>
                  <Regular
                    className='flex-1 text-base'
                    style={{
                      color: isActive ? Colors.accent : colors.text,
                    }}
                  >
                    {item.name}
                  </Regular>
                </Press>
              )
            })}
          </View>
        </View>
      </DrawerContentScrollView>

      <View
        style={{
          paddingBottom: insets.bottom + 16,
          paddingHorizontal: 8,
        }}
      >
        <Press
          onPress={() => handleLogout(() => logout('HPLogin'))}
          className='flex-row items-center gap-3 rounded-lg px-4 py-3'
          style={{
            backgroundColor: '#ef444410',
          }}
        >
          <View className='size-5 items-center justify-center'>
            <Logout05Icon size={20} color='#ef4444' strokeWidth={1.5} />
          </View>
          <Regular className='flex-1 text-base' style={{ color: '#ef4444' }}>
            Logout
          </Regular>
        </Press>
      </View>
    </View>
  )
}
