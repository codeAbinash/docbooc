import { createDrawerNavigator } from '@react-navigation/drawer'
import HpAddDoctors from './HpAddDoctors'
import HPHomeScreen from './HPHomeScreen'

const Drawer = createDrawerNavigator()

export default function App() {
  return (
    <Drawer.Navigator initialRouteName='Appointments' screenOptions={{ headerShown: false, drawerType: 'slide' }}>
      <Drawer.Screen name='Appointments' component={HPHomeScreen} />
      <Drawer.Screen name='Upcoming Appointments' component={HPHomeScreen} />
      <Drawer.Screen name='Add Doctors' component={HpAddDoctors} />
      <Drawer.Screen name='View Doctors' component={HpAddDoctors} />
      <Drawer.Screen name='Add Patients' component={HPHomeScreen} />
      <Drawer.Screen name='Settings' component={HPHomeScreen} />
    </Drawer.Navigator>
  )
}
