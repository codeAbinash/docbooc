import { DarkTheme, DefaultTheme } from '@/themes'
import './src/global.css'

import { AutoStatusBar } from '@components/StatusBar'
import { NavigationContainer } from '@react-navigation/native'
import { CardStyleInterpolators, createStackNavigator, StackNavigationOptions } from '@react-navigation/stack'
import AppointmentDetails from '@screens/AppointmentDetails/AppointmentDetails'
import BookAppointment from '@screens/BookAppointment/BookAppointment'
import Complete from '@screens/Complete'
import FamilyMemberSelectorScreen from '@screens/FamilyMemberSelector'
import HPHome from '@screens/HP/HPHome'
import Login from '@screens/Login/Login'
import OTP from '@screens/Login/OTP'
import PatientInfo from '@screens/PatientInfo/PatientInfo'
import Splash from '@screens/Splash/Splash'
import VerifyBeforeBooking from '@screens/VerifyBeforeBooking/VerifyBeforeBooking'
import WelcomeScreen from '@screens/WelcomeScreen'
import { Dimensions, useColorScheme } from 'react-native'
import Home from './src/screens'

const RootStack = createStackNavigator<RootStackParamList>()

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

export default function App() {
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
        <RootStack.Screen name='Home' component={Home} options={NO_ANIMATION} />
        <RootStack.Screen name='Splash' component={Splash} options={NO_ANIMATION} />
        <RootStack.Screen name='Login' component={Login} options={NO_ANIMATION} />
        <RootStack.Screen name='OTP' component={OTP} />
        <RootStack.Screen name='BookAppointment' component={BookAppointment} />
        <RootStack.Screen name='PatientInfo' component={PatientInfo} />
        <RootStack.Screen name='Welcome' component={WelcomeScreen} />
        <RootStack.Screen name='FamilyMemberSelector' component={FamilyMemberSelectorScreen} />
        <RootStack.Screen name='VerifyBeforeBooking' component={VerifyBeforeBooking} />
        <RootStack.Screen name='AppointmentDetails' component={AppointmentDetails} />
        <RootStack.Screen name='Complete' component={Complete} />
      </RootStack.Navigator>
    </NavigationContainer>
  )
}

export type RootStackParamList = {
  Splash: undefined
  Home: undefined
  HPHome: undefined
  Welcome: undefined
  Slide: undefined
  BookAppointment: undefined
  PatientInfo: undefined
  FamilyMemberSelector: undefined
  Complete: undefined
  Login: undefined
  OTP: undefined
  Doctors: undefined
  VerifyBeforeBooking: undefined
  Appointments: undefined
  AppointmentDetails: { appointmentId: string }
}
