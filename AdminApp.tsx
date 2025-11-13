import AdminAddDoctor from '@/AdminScreens/AdminAddDoctor'
import AdminAddDoctors from '@/AdminScreens/AdminAddDoctors'
import AdminLogin from '@/AdminScreens/AdminAuthentications/Login/AdminLogin'
import AdminOTP from '@/AdminScreens/AdminAuthentications/OTP/AdminOTP'
import AdminSignup from '@/AdminScreens/AdminAuthentications/Signup/AdminSignup'
import AdminHome from '@/AdminScreens/AdminHome'
import AdminSplash from '@/AdminScreens/AdminSplash'
import { Popups } from '@components/Popup'
import { AutoStatusBar } from '@components/StatusBar'
import { queryClient } from '@query/index'
import { DarkTheme, DefaultTheme, NavigationContainer } from '@react-navigation/native'
import { CardStyleInterpolators, createStackNavigator, StackNavigationOptions } from '@react-navigation/stack'
import { QueryClientProvider } from '@tanstack/react-query'
import { Dimensions, useColorScheme } from 'react-native'
import './src/global.css'
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
          <RootStack.Screen name='AdminSplash' component={AdminSplash} options={NO_ANIMATION} />
          <RootStack.Screen name='AdminLogin' component={AdminLogin} />
          <RootStack.Screen name='AdminSignup' component={AdminSignup} />
          <RootStack.Screen name='AdminHome' component={AdminHome} />
          <RootStack.Screen name='AdminOTP' component={AdminOTP} />
          <RootStack.Screen name='AdminAddDoctors' component={AdminAddDoctors} />
          <RootStack.Screen name='AdminAddDoctor' component={AdminAddDoctor} />
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
  AdminAddDoctors: undefined
  AdminAddDoctor: undefined
}
