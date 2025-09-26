import { DarkTheme, DefaultTheme } from '@/themes'
import './src/global.css'

import { AutoStatusBar } from '@components/StatusBar'
import { NavigationContainer } from '@react-navigation/native'
import { CardStyleInterpolators, createStackNavigator, StackNavigationOptions } from '@react-navigation/stack'
import BookAppointment from '@screens/BookAppointment/BookAppointment'
import Complete from '@screens/Complete'
import FamilyMemberSelectorScreen from '@screens/FamilyMemberSelector'
import PatientInfo from '@screens/PatientInfo/PatientInfo'
import Splash from '@screens/Splash/Splash'
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
          gestureEnabled: true,
          gestureDirection: 'horizontal',
          gestureResponseDistance: width / 5,
          headerShown: false,
          cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
        }}
      >
        <RootStack.Screen name='Splash' component={Splash} options={SMOOTH_ANIMATION} />
        <RootStack.Screen name='Home' component={Home} options={SMOOTH_ANIMATION} />
        <RootStack.Screen name='BookAppointment' component={BookAppointment} />
        <RootStack.Screen name='PatientInfo' component={PatientInfo} />
        <RootStack.Screen name='Welcome' component={WelcomeScreen} />
        <RootStack.Screen name='FamilyMemberSelector' component={FamilyMemberSelectorScreen} />
        <RootStack.Screen name='Complete' component={Complete} />
      </RootStack.Navigator>
    </NavigationContainer>
  )
}

export type RootStackParamList = {
  Splash: undefined
  Home: undefined
  Welcome: undefined
  Slide: undefined
  BookAppointment: undefined
  PatientInfo: undefined
  FamilyMemberSelector: undefined
  Complete: undefined
}
