import { DarkTheme, DefaultTheme } from '@/themes'
import './src/global.css'

import AddDoctorSchedule from '@/HPScreens/AddDoctorSchedule'
import HPHome from '@/HPScreens/HPHome'
import { AutoStatusBar } from '@components/StatusBar'
import { NavigationContainer } from '@react-navigation/native'
import { CardStyleInterpolators, createStackNavigator, StackNavigationOptions } from '@react-navigation/stack'
import { Dimensions, useColorScheme } from 'react-native'
const { width, height } = Dimensions.get('window')

const IOS_BOTTOM_STYLE: StackNavigationOptions = {
  cardStyleInterpolator: CardStyleInterpolators.forModalPresentationIOS,
  gestureEnabled: true,
  gestureDirection: 'vertical',
  gestureResponseDistance: height,
}

const NO_ANIMATION: StackNavigationOptions = {
  cardStyleInterpolator: CardStyleInterpolators.forNoAnimation,
}

const SMOOTH_ANIMATION: StackNavigationOptions = {
  cardStyleInterpolator: CardStyleInterpolators.forFadeFromCenter,
}

const RootStack = createStackNavigator<HpRootStackParamList>()

export default function HPApp() {
  const scheme = useColorScheme()

  return (
    <NavigationContainer theme={scheme === 'dark' ? DarkTheme : DefaultTheme}>
      <AutoStatusBar scheme={scheme} />
      <RootStack.Navigator
        screenOptions={{
          headerShown: false,
          cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
        }}
      >
        <RootStack.Screen name='Home' component={HPHome} options={NO_ANIMATION} />
        <RootStack.Screen name='AddDoctorSchedule' component={AddDoctorSchedule} />
      </RootStack.Navigator>
    </NavigationContainer>
  )
}

export type HpRootStackParamList = {
  Home: undefined
  AddDoctorSchedule: undefined
}
