import { createDrawerNavigator } from '@react-navigation/drawer'
import CustomDrawer from '@components/CustomDrawer'
import HPScheduleDoctors from './HpScheduleDoctors'
import HPAppointmentsScreen from './HPAppointmentsScreen'
import HPUpcomingAppointmentsScreen from './HPUpcomingAppointmentsScreen'

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
      <Drawer.Screen name='Appointments' component={HPAppointmentsScreen} />
      <Drawer.Screen name='UpcomingAppointments' component={HPUpcomingAppointmentsScreen} />
      <Drawer.Screen name='ScheduleDoctors' component={HPScheduleDoctors} />
      <Drawer.Screen name='ViewDoctors' component={HPScheduleDoctors} />
      <Drawer.Screen name='AddPatients' component={HPScheduleDoctors} />
      <Drawer.Screen name='Settings' component={HPAppointmentsScreen} />
    </Drawer.Navigator>
  )
}
