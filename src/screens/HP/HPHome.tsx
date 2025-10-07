import { createDrawerNavigator } from '@react-navigation/drawer'
import { Button } from '@react-navigation/elements'
import { useNavigation } from '@react-navigation/native'
import { View } from 'react-native'
import HPHomeScreen from './HPHomeScreen'

function NotificationsScreen() {
  const navigation = useNavigation()

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Button onPress={() => navigation.goBack()}>Go back home</Button>
    </View>
  )
}

const Drawer = createDrawerNavigator()

export default function App() {
  return (
    <Drawer.Navigator initialRouteName='Home' screenOptions={{ headerShown: false, drawerType: 'slide' }}>
      <Drawer.Screen name='Home' component={HPHomeScreen} />
      <Drawer.Screen name='Notifications' component={NotificationsScreen} />
    </Drawer.Navigator>
  )
}
