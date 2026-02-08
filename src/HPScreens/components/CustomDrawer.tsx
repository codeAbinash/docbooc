import { logout } from '@/AdminScreens/utils'
import { handleLogout } from '@/HPScreens/utils/utils'
import Calendar01Icon from '@assets/icons/hugeicons/Calendar01Icon'
import Calendar03Icon from '@assets/icons/hugeicons/Calendar03Icon'
import Logout05Icon from '@assets/icons/hugeicons/Logout05Icon'
import NotificationSquareIcon from '@assets/icons/hugeicons/NotificationSquareIcon'
import PatientIcon from '@assets/icons/hugeicons/PlusSignIcon'
import TimeScheduleIcon from '@assets/icons/hugeicons/TimeScheduleIcon'
import UserIcon from '@assets/icons/hugeicons/UserIcon'
import Edit01Icon from '@hugeicons/Home01Icon'
import { DrawerContentScrollView } from '@react-navigation/drawer'
import { useTheme } from '@react-navigation/native'
import Colors from '@utils/colors'
import { Medium, Regular, SemiBold } from '@utils/fonts'
import { View, Text, TouchableOpacity } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import Press from '../../components/Press'


const MAIN_DRAWER_ITEMS = [
  { name: "Today's Appointments", icon: Calendar01Icon, navigationName: 'Appointments' },
  { name: 'Upcoming Appointments', icon: Calendar03Icon, navigationName: 'UpcomingAppointments' },
  { name: 'Doctors', icon: UserIcon, navigationName: 'ViewDoctors' },
  { name: 'Book Appointment', icon: PatientIcon, navigationName: 'AddPatients' },
  { name: 'Approve Appointment', icon: PatientIcon, navigationName: 'HPApproveAppointments' },
]

const SETTINGS_DRAWER_ITEMS = [
  { name: 'Onboard Doctors', icon: TimeScheduleIcon, navigationName: 'ScheduleDoctors' },
   { name: 'Users', icon: PatientIcon, navigationName: 'AddPatients' },
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
        <View style={{ paddingHorizontal: 12, paddingBottom: 32 }}>
          <View className='flex-row items-center gap-3'>
            <View style={{ width: 4, height: 40, backgroundColor: Colors.accent, borderRadius: 2 }} />
            <View className='flex-1'>
              <Regular className='text-sm' style={{ color: colors.text, opacity: 0.6 }}>
                Hello 👋
              </Regular>
              <View className='flex-row items-center gap-2'>
                <SemiBold className='text-xl' style={{ color: colors.text }}>
                  HP Name
                </SemiBold>
                <TouchableOpacity>
                  <Edit01Icon size={18} color={colors.text} strokeWidth={1.5} />
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>

        <View style={{ paddingHorizontal: 8 }}>
          <View className=' gap-2'>
            {MAIN_DRAWER_ITEMS.map((item) => {
              const isActive = currentRoute === item.navigationName
              const Icon = item.icon
              return (
                <Press
                  key={item.name}
                  onPress={() => navigation.navigate(item.navigationName)}
                  className='flex-row items-center gap-3 rounded-lg p-3'
                  style={{
                    backgroundColor: isActive ? Colors.accent + '15' : 'transparent',
                  }}
                >
                  <View className='size-5 items-center justify-center'>
                    <Icon size={20} color={isActive ? Colors.accent : colors.text} variant="duotone-rounded" strokeWidth={1.5} />
                  </View>
                  <Regular
                    className='flex-1  text-lg'
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
        <View className='gap-2 ' style={{ paddingTop: 8, borderTopWidth: 1, borderTopColor: colors.border }}>
          {SETTINGS_DRAWER_ITEMS.map((item) => {
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
                  <Icon size={20} color={isActive ? Colors.accent : colors.text} variant="duotone-rounded" strokeWidth={1.5} />
                </View>
                <Regular
                  className='flex-1 text-lg'
                  style={{
                    color: isActive ? Colors.accent : colors.text,
                  }}
                >
                  {item.name}
                </Regular>
              </Press>
            )
          })}

          <Press
            onPress={() => handleLogout(() => logout('HPLogin'))}
            className='flex-row items-center gap-3 rounded-lg px-4 py-3'
            style={{
              backgroundColor: 'transparent',
            }}
          >
            <View className='size-5 items-center justify-center'>
              <Logout05Icon size={20} color='#ef4444' strokeWidth={1.5} />
            </View>
            <Regular className='flex-1 text-lg' style={{ color: '#ef4444' }}>
              Logout
            </Regular>
          </Press>
        </View>
      </View>
    </View>
  )
}