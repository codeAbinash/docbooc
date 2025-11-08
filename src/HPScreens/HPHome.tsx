import CustomDrawer from '@/HPScreens/components/CustomDrawer'
import { createDrawerNavigator } from '@react-navigation/drawer'
import HPAddPatients from './HPAddPatients/HPAddPatients'
import HPScheduleDoctors from './HpScheduleDoctors/HpScheduleDoctors'
import HPTodaysAppointmentsScreen from './HPTodaysAppointments/HPTodaysAppointmentsScreen'
import HPUpcomingAppointmentsScreen from './HPUpcomingAppointments/HPUpcomingAppointmentsScreen'
import HPViewDoctors from './HPViewDoctors/HPViewDoctors'
import XAddDoctors from './XAddDoctors/XAddDoctors'

const Drawer = createDrawerNavigator()

export default function App() {
  return (
    <Drawer.Navigator
      initialRouteName='Appointments'
      drawerContent={(props) => <CustomDrawer {...props} />}
      screenOptions={{
        headerShown: false,
        drawerType: 'slide',
        drawerStyle: { width: '70%' },
      }}
    >
      <Drawer.Screen name='Appointments' component={HPTodaysAppointmentsScreen} />
      <Drawer.Screen name='UpcomingAppointments' component={HPUpcomingAppointmentsScreen} />
      <Drawer.Screen name='ScheduleDoctors' component={HPScheduleDoctors} />
      <Drawer.Screen name='ViewDoctors' component={HPViewDoctors} />
      <Drawer.Screen name='AddPatients' component={HPAddPatients} />
      <Drawer.Screen name='Settings' component={HPTodaysAppointmentsScreen} />
      <Drawer.Screen name='ViewHPs' component={HPAddPatients} />
      <Drawer.Screen name='AddDoctors' component={XAddDoctors} />
      <Drawer.Screen name='ConfirmBookings' component={HPAddPatients} />
      <Drawer.Screen name='ApproveSchedules' component={HPAddPatients} />
    </Drawer.Navigator>
  )
}
