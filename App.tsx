import { DarkTheme, DefaultTheme } from '@/themes'
import './src/global.css'

import { AutoStatusBar } from '@components/StatusBar'
import { NavigationContainer } from '@react-navigation/native'
import { CardStyleInterpolators, createStackNavigator, StackNavigationOptions } from '@react-navigation/stack'
import WelcomeScreen from '@screens/WelcomeScreen'
import { Dimensions, useColorScheme } from 'react-native'
import Home from './src/screens'

export type RootStackParamList = {
  Home: undefined
  Welcome: undefined
  Slide: undefined
}

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
  gestureEnabled: true,
  gestureDirection: 'horizontal',
  gestureResponseDistance: height,
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
          gestureResponseDistance: width,
          headerShown: false,
          cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
        }}
      >
        <RootStack.Screen name='Home' component={Home} />
        <RootStack.Screen name='Welcome' component={WelcomeScreen} />
      </RootStack.Navigator>
    </NavigationContainer>
  )
}
