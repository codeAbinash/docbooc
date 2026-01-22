import AdminAddDoctor from '@/AdminScreens/AdminAddDoctor'
import AdminLogin from '@/AdminScreens/AdminAuthentications/Login/AdminLogin'
import AdminOTP from '@/AdminScreens/AdminAuthentications/OTP/AdminOTP'
import AdminSignup from '@/AdminScreens/AdminAuthentications/Signup/AdminSignup'
import AdminHome from '@/AdminScreens/AdminHome'
import AdminSplash from '@/AdminScreens/AdminSplash'
import BookingOTPVerification from '@/AdminScreens/BookingOTPVerification'
import { Popups } from '@components/Popup'
import { AutoStatusBar } from '@components/StatusBar'
import { queryClient } from '@query/index'
import { DarkTheme, DefaultTheme, NavigationContainer } from '@react-navigation/native'
import { CardStyleInterpolators, createStackNavigator, StackNavigationOptions } from '@react-navigation/stack'
import { QueryClientProvider } from '@tanstack/react-query'
import { Dimensions, useColorScheme } from 'react-native'
import '../global.css'
import AdminAddDepartment from './Department/AdminAddDepartment'
import AdminAddDepartments from './Department/AdminAddDepartments'
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

const RootStack = createStackNavigator<AdminRootStackParamList>()

export default function AdminApp() {
  const scheme = useColorScheme()

  return (
    <QueryClientProvider client={queryClient}>
      <NavigationContainer theme={scheme === 'dark' ? DarkTheme : DefaultTheme}>
        <Popups />
        <AutoStatusBar scheme={scheme} />
        <RootStack.Navigator
          screenOptions={{
            headerShown: false,
            cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
          }}
        >
          <RootStack.Screen name='AdminHome' component={AdminHome} />
          <RootStack.Screen name='AdminSplash' component={AdminSplash} options={NO_ANIMATION} />
          <RootStack.Screen name='AdminLogin' component={AdminLogin} />
          <RootStack.Screen name='AdminSignup' component={AdminSignup} />
          <RootStack.Screen name='AdminOTP' component={AdminOTP} />

          <RootStack.Screen name='AdminAddDoctor' component={AdminAddDoctor} />
          <RootStack.Screen name='BookingOTPVerification' component={BookingOTPVerification} />
          <RootStack.Screen name='AdminAddDepartments' component={AdminAddDepartments} />
          <RootStack.Screen name='AdminAddDepartment' component={AdminAddDepartment} />
        </RootStack.Navigator>
      </NavigationContainer>
    </QueryClientProvider>
  )
}

export type AdminRootStackParamList = {
  AdminSplash: undefined
  AdminOTP: {
    email: string
    password: string
    name: string
    isSignup: boolean
  }
  AdminLogin: undefined
  AdminSignup: undefined
  AdminHome: undefined
  AdminAddDoctor:
    | undefined
    | {
        doctor: {
          id: string
          name: string
          email: string | null
          contactNumber: string | null
          gender: string | null
          department: string | null
          degrees: string | null
          experience: number | null
          specialization: string | null
          createdAt: string
          verified: boolean | null
        }
      }
  BookingOTPVerification: undefined
  AdminAddDepartments: undefined
  AdminAddDepartment: undefined
}
