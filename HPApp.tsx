import AdminAddDoctor from '@/AdminScreens/AdminAddDoctor'
import HPDoctorScheduler from '@components/HPDoctorScheduler'
import HPScheduleReview from '@components/HPScheduleReview'
import HPBookAppointment from '@/HPScreens/HPAddPatients/HPBookApointment'
import HPLogin from '@/HPScreens/HPAuthentications/Login/HPLogin'
import HPOTP from '@/HPScreens/HPAuthentications/OTP/HPOTP'
import HPSignup from '@/HPScreens/HPAuthentications/Signup/HPSignup'
import HPHome from '@/HPScreens/HPHome'
import HPSplash from '@/HPScreens/HPSplash'
import HPDoctorScheduleDetails from '@/HPScreens/HPViewDoctors/HPDoctorScheduleDetails'
import EditHPProfileScreen from '@/HPScreens/HPProfile/EditHPProfileScreen'
import { DarkTheme, DefaultTheme } from '@/themes'
import { Popups } from '@components/Popup'
import { AutoStatusBar } from '@components/StatusBar'
import { queryClient } from '@query/index'
import { NavigationContainer } from '@react-navigation/native'
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

const RootStack = createStackNavigator<HpRootStackParamList>()

export default function HPApp() {
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
          <RootStack.Screen name='HPSplash' component={HPSplash} options={SMOOTH_ANIMATION} />
          <RootStack.Screen name='HPLogin' component={HPLogin} options={SMOOTH_ANIMATION} />
          <RootStack.Screen name='HPSignup' component={HPSignup} options={SMOOTH_ANIMATION} />
          <RootStack.Screen name='HPHome' component={HPHome} options={SMOOTH_ANIMATION} />
          <RootStack.Screen name='HPOTP' component={HPOTP} options={SMOOTH_ANIMATION} />
          <RootStack.Screen name='HPDoctorScheduler' component={HPDoctorScheduler} options={SMOOTH_ANIMATION} />
          <RootStack.Screen name='HPScheduleReview' component={HPScheduleReview} options={SMOOTH_ANIMATION} />
          <RootStack.Screen name='HPBookAppointment' component={HPBookAppointment} options={SMOOTH_ANIMATION} />
          <RootStack.Screen
            name='HPDoctorScheduleDetails'
            component={HPDoctorScheduleDetails}
            options={SMOOTH_ANIMATION}
          />
          <RootStack.Screen name='EditHPProfile' component={EditHPProfileScreen} options={SMOOTH_ANIMATION} />
          <RootStack.Screen name='DoctorModel' component={AdminAddDoctor} options={SMOOTH_ANIMATION} />
        </RootStack.Navigator>
      </NavigationContainer>
    </QueryClientProvider>
  )
}

export type HpRootStackParamList = {
  HPSplash: undefined
  HPOTP: {
    email: string
    password: string
    name: string
    isSignup: boolean
  }
  HPLogin: undefined
  HPSignup: undefined
  HPHome: undefined
  HPDoctorScheduler: {
    doctorId: string
    doctorName: string
  }
  HPScheduleReview: {
    doctorId: string
    doctorName: string
    scheduleData: any
  }
  HPBookAppointment: {
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
  HPDoctorScheduleDetails: {
    doctorId: string
    doctorName: string
  }
  EditHPProfile: undefined
  XAddDoctors: undefined
  DoctorModel: undefined
}
