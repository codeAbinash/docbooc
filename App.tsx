import { DarkTheme, DefaultTheme } from '@/themes'
import './src/global.css'

import { AutoStatusBar } from '@components/StatusBar'
import { NavigationContainer } from '@react-navigation/native'
import { CardStyleInterpolators, createStackNavigator, StackNavigationOptions } from '@react-navigation/stack'
import AppointmentDetails from '@/UserScreens/AppointmentDetails/AppointmentDetails'
import BookAppointment from '@/UserScreens/BookAppointment/BookAppointment'
import Complete from '@/UserScreens/Complete'
import FamilyMemberSelectorScreen from '@/UserScreens/FamilyMemberSelector'
import HPLogin from '@/UserScreens/Login/Login'
import OTP from '@/UserScreens/Login/OTP'
import PatientInfo from '@/UserScreens/PatientInfo/PatientInfo'
import Splash from '@/UserScreens/Splash/Splash'
import VerifyBeforeBooking from '@/UserScreens/VerifyBeforeBooking/VerifyBeforeBooking'
import WelcomeScreen from '@/UserScreens/WelcomeScreen'
import { Dimensions, useColorScheme } from 'react-native'
import Home from './src/UserScreens'
import { QueryClientProvider } from '@tanstack/react-query'
import { queryClient } from '@query/index'

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
    <QueryClientProvider client={queryClient}>
      <NavigationContainer theme={scheme === 'dark' ? DarkTheme : DefaultTheme}>
        <AutoStatusBar scheme={scheme} />
        <RootStack.Navigator
          screenOptions={{
            headerShown: false,
            cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
          }}
        >
          <RootStack.Screen name='OTP' component={OTP} />
          <RootStack.Screen name='Splash' component={Splash} options={NO_ANIMATION} />
          <RootStack.Screen name='Home' component={Home} options={NO_ANIMATION} />
          

          <RootStack.Screen name='Login' component={HPLogin} options={NO_ANIMATION} />
          
          <RootStack.Screen name='BookAppointment' component={BookAppointment} />
          <RootStack.Screen name='PatientInfo' component={PatientInfo} />
          <RootStack.Screen name='Welcome' component={WelcomeScreen} />
          <RootStack.Screen name='FamilyMemberSelector' component={FamilyMemberSelectorScreen} />
          <RootStack.Screen name='VerifyBeforeBooking' component={VerifyBeforeBooking} />
          <RootStack.Screen name='AppointmentDetails' component={AppointmentDetails} />
          <RootStack.Screen name='Complete' component={Complete} />
        </RootStack.Navigator>
      </NavigationContainer>
    </QueryClientProvider>
  )
}

export type RootStackParamList = {
  Splash: undefined
  Home: undefined
  Welcome: undefined
  Slide: undefined
  BookAppointment: {
    doctor: {
      id: string
      name: string
      email: string | null
      contactNumber: string | null
      gender: string | null
      department: string | null
      degrees: string | null
      experience: number | null
      specialization: string
      createdAt: string
      verified: boolean | null
    }
  }
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
