import { DarkTheme, DefaultTheme } from '@/themes'
import './src/global.css'

import HPAddDoctorSchedule from '@/HPScreens/AddDoctorSchedule/HPAddDoctorSchedule'
import HPDoctorDetails from '@/HPScreens/AddDoctorSchedule/HPDoctorDetails'
import HPOTP from '@/HPScreens/Auth/OTP/HPOTP'
import HPHome from '@/HPScreens/HPHome'
import HPSplash from '@/HPScreens/HPSplash'
import { AutoStatusBar } from '@components/StatusBar'
import { NavigationContainer } from '@react-navigation/native'
import { CardStyleInterpolators, createStackNavigator, StackNavigationOptions } from '@react-navigation/stack'
import { Dimensions, useColorScheme } from 'react-native'
import HPLogin from '@/HPScreens/Auth/Login/HPLogin'
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
        <RootStack.Screen name='Splash' component={HPSplash} options={NO_ANIMATION} />
        <RootStack.Screen name='Login' component={HPLogin} options={NO_ANIMATION} />
        <RootStack.Screen name='OTP' component={HPOTP} options={NO_ANIMATION} />
        <RootStack.Screen name='Home' component={HPHome} options={NO_ANIMATION} />
        <RootStack.Screen name='AddDoctorSchedule' component={HPAddDoctorSchedule} />
        <RootStack.Screen name='DoctorDetails' component={HPDoctorDetails} />
      </RootStack.Navigator>
    </NavigationContainer>
  )
}

export type HpRootStackParamList = {
  Splash: undefined
  OTP: undefined
  Login: undefined
  Home: undefined
  AddDoctorSchedule: undefined
  DoctorDetails: undefined
}
