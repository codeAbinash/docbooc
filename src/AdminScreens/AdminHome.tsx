import AdminAddDoctors from '@/AdminScreens/AdminAddDoctors'
import AdminApproveBookings from '@/AdminScreens/AdminApproveBookings'
import AdminApproveSchedules from '@/AdminScreens/AdminApproveSchedules'
import AdminViewHPs from '@/AdminScreens/AdminViewHPs'
import AdminViewPatients from '@/AdminScreens/AdminViewPatients'
import AdminCustomDrawer from '@/AdminScreens/components/AdminCustomDrawer'
import { createDrawerNavigator } from '@react-navigation/drawer'

export const Drawer = createDrawerNavigator()

export default function AdminHome() {
  return (
    <Drawer.Navigator
      initialRouteName='AdminAddDoctors'
      drawerContent={(props) => <AdminCustomDrawer {...props} />}
      screenOptions={{
        headerShown: false,
        drawerType: 'slide',
        drawerStyle: { width: '70%' },
      }}
    >
      <Drawer.Screen name='AdminAddDoctors' component={AdminAddDoctors} />
      <Drawer.Screen name='AdminApproveSchedules' component={AdminApproveSchedules} />
      <Drawer.Screen name='AdminApproveBookings' component={AdminApproveBookings} />
      <Drawer.Screen name='AdminViewHPs' component={AdminViewHPs} />
      <Drawer.Screen name='AdminViewPatients' component={AdminViewPatients} />
    </Drawer.Navigator>
  )
}
