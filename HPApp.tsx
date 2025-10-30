import { DarkTheme, DefaultTheme } from '@/themes'
import './src/global.css'
import XAddDoctors from '@/HPScreens/XAddDoctors/XAddDoctors'
import HPDoctorScheduler from '@/HPScreens/components/HPDoctorScheduler'
import HPDoctorScheduleDetails from '@/HPScreens/HPViewDoctors/HPDoctorScheduleDetails'
import DoctorModel from '@/HPScreens/components/DoctorModel'
import HPOTP from '@/HPScreens/HPAuthentications/OTP/HPOTP'
import HPHome from '@/HPScreens/HPHome'
import HPSplash from '@/HPScreens/HPSplash'
import { AutoStatusBar } from '@components/StatusBar'
import { NavigationContainer } from '@react-navigation/native'
import { CardStyleInterpolators, createStackNavigator, StackNavigationOptions } from '@react-navigation/stack'
import { Dimensions, useColorScheme } from 'react-native'
import HPLogin from '@/HPScreens/HPAuthentications/Login/HPLogin'
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
        <RootStack.Screen name='HPHome' component={HPHome} options={NO_ANIMATION} />
        <RootStack.Screen name='HPSplash' component={HPSplash} options={NO_ANIMATION} />
        <RootStack.Screen name='HPLogin' component={HPLogin} options={NO_ANIMATION} />
        <RootStack.Screen name='HPOTP' component={HPOTP} options={NO_ANIMATION} />
        <RootStack.Screen name='HPDoctorScheduler' component={HPDoctorScheduler} />
        <RootStack.Screen name='HPDoctorScheduleDetails' component={HPDoctorScheduleDetails} />
        <RootStack.Screen name='XAddDoctors' component={XAddDoctors} />
        <RootStack.Screen name='DoctorModel' component={DoctorModel} />
      </RootStack.Navigator>
    </NavigationContainer>
  )
}

export type HpRootStackParamList = {
  HPSplash: undefined
  HPOTP: undefined
  HPLogin: undefined
  HPHome: undefined
  HPDoctorScheduler: undefined
  HPDoctorScheduleDetails: undefined
  XAddDoctors: undefined
  DoctorModel: undefined
}
