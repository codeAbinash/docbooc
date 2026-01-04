import { logout } from '@/AdminScreens/utils'
import { handleLogout } from '@/HPScreens/utils/utils'
import Logout05Icon from '@assets/icons/hugeicons/Logout05Icon'
import PlusSignIcon from '@hugeicons/PlusSignIcon'
import TaskDone01Icon from '@hugeicons/TaskDone01Icon'
import UserCheck01Icon from '@hugeicons/UserCheck01Icon'
import Doctor01Icon from '@hugeicons/Doctor01Icon'
import PatientIcon from '@hugeicons/PatientIcon'
import Building02Icon from '@hugeicons/PlusSignIcon'
import { DrawerContentScrollView } from '@react-navigation/drawer'
import { useTheme } from '@react-navigation/native'
import Colors from '@utils/colors'
import { Medium, SemiBold } from '@utils/fonts'
import { View } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import Press from '../../components/Press'
import ProfilePicture from '../../components/ProfilePicture'

const DRAWER_ITEMS = [
  { name: 'Add Doctors', icon: PlusSignIcon, navigationName: 'AdminAddDoctors' },
  { name: 'Add Departments', icon: Building02Icon, navigationName: 'AdminAddDepartments' },
  { name: 'Approve Schedules', icon: TaskDone01Icon, navigationName: 'AdminApproveSchedules' },
  { name: 'Approve Bookings', icon: UserCheck01Icon, navigationName: 'AdminApproveBookings' },
  { name: 'View HPs', icon: Doctor01Icon, navigationName: 'AdminViewHPs' },
  { name: 'View Patients', icon: PatientIcon, navigationName: 'AdminViewPatients' },
]

export default function AdminCustomDrawer(props: any) {
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
        <View>
          <View className='px gap-2 pt-5'>
            {DRAWER_ITEMS.map((item) => {
              const isActive = currentRoute === item.navigationName
              const Icon = item.icon
              return (
                <Press
                  key={item.name}
                  onPress={() => navigation.navigate(item.navigationName)}
                  className='flex-row items-center gap-4 rounded-xl px-4 py-3.5'
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
        className='border-t border-neutral-300 px-3 pt-4 dark:border-neutral-700'
        style={{
          paddingBottom: insets.bottom + 16,
        }}
      >
        <View className='gap-2'>
          <Press
            onPress={() => handleLogout(() => logout('AdminLogin'))}
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
