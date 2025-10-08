import { createDrawerNavigator } from '@react-navigation/drawer'
import HpAddDoctors from './HpAddDoctors'
import HPAppointmentsScreen from './HPAppointmentsScreen'
import HPUpcomingAppointmentsScreen from './HPUpcomingAppointmentsScreen'

const Drawer = createDrawerNavigator()

export default function App() {
  return (
    <Drawer.Navigator initialRouteName='Appointments' screenOptions={{ headerShown: false, drawerType: 'slide' }}>
      <Drawer.Screen name='Appointments' component={HPAppointmentsScreen} />
      <Drawer.Screen name='Upcoming Appointments' component={HPUpcomingAppointmentsScreen} />
      <Drawer.Screen name='Schedule Doctors' component={HpAddDoctors} />
      <Drawer.Screen name='View Doctors' component={HpAddDoctors} />
      <Drawer.Screen name='Add Patients' component={HPAppointmentsScreen} />
      <Drawer.Screen name='Settings' component={HPAppointmentsScreen} />
    </Drawer.Navigator>
  )
}