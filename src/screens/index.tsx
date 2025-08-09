import { PaddingBottom } from '@components/SafePadding'
import Calendar03Icon from '@hugeicons/Calendar03Icon'
import { HugeIconProps } from '@hugeicons/constants'
import Doctor01Icon from '@hugeicons/Doctor01Icon'
import Home01Icon from '@hugeicons/Home01Icon'
import User02Icon from '@hugeicons/User02Icon'
import { createBottomTabNavigator, type BottomTabBarProps } from '@react-navigation/bottom-tabs'
import HomeScreen from '@screens/HomeScreen'
import Colors from '@utils/colors'
import { SemiBold } from '@utils/fonts'
import React, { type ReactNode } from 'react'
import { TouchableOpacity, View, useColorScheme, type ColorSchemeName } from 'react-native'
import colors from 'tailwindcss/colors'

const Tab = createBottomTabNavigator()

function BottomTabBar({ state, descriptors, navigation }: BottomTabBarProps) {
  return (
    <TabBar
      state={state}
      descriptors={descriptors}
      navigation={navigation}
      insets={{ bottom: 0, left: 0, right: 0, top: 0 }}
    />
  )
}

function TabBar({ state, descriptors, navigation }: BottomTabBarProps) {
  const scheme = useColorScheme()
  return (
    <View
      className='bg-white dark:border-card-dark/20 dark:bg-bg-dark'
      style={{ borderTopWidth: scheme === 'dark' ? 1 : 0 }}
    >
      <View style={{ flexDirection: 'row', paddingHorizontal: 10 }}>
        {state.routes.map((route, index) => {
          const { options } = descriptors[route.key]!
          const label =
            options.tabBarLabel !== undefined
              ? options.tabBarLabel
              : options.title !== undefined
                ? options.title
                : route.name
          const isFocused = state.index === index

          const onPress = () => {
            const event = navigation.emit({
              type: 'tabPress',
              target: route.key,
              canPreventDefault: true,
            })

            if (!isFocused && !event.defaultPrevented) {
              navigation.navigate(route.name, route.params)
            }
          }
          const onLongPress = () => {
            navigation.emit({
              type: 'tabLongPress',
              target: route.key,
            })
          }

          const color = isFocused ? getFocusedColor(scheme) : getColor(scheme)

          return (
            <TouchableOpacity
              key={route.key}
              activeOpacity={0.6}
              accessibilityRole='button'
              accessibilityState={isFocused ? { selected: true } : {}}
              accessibilityLabel={options.tabBarAccessibilityLabel}
              onPress={onPress}
              onLongPress={onLongPress}
              className='flex items-center justify-center p-1'
              style={{ flex: 1, paddingTop: 13, paddingBottom: 11 }}
            >
              {options.tabBarIcon && options.tabBarIcon({ focused: isFocused, color, size: 23 })}
              <SemiBold style={{ color, marginTop: 4, fontSize: 8.5 }}>{label as ReactNode}</SemiBold>
            </TouchableOpacity>
          )
        })}
      </View>
      <PaddingBottom />
    </View>
  )
}

export function getFocusedColor(theme: ColorSchemeName) {
  // return theme === 'dark' ? colors.zinc[200] : colors.zinc[800]
  return Colors.accent
}

export function getColor(theme: ColorSchemeName) {
  return theme === 'dark' ? colors.zinc[400] : colors.zinc[600]
}

// Placeholder components
const DoctorsScreen = () => <View className='bg flex-1' />
const AppointmentsScreen = () => <View className='bg flex-1' />
const ProfileScreen = () => <View className='bg flex-1' />

const screens = [
  { name: 'HomeScreen', label: 'Home', focusedIcon: Home01Icon, defaultIcon: Home01Icon, component: HomeScreen },
  {
    name: 'Doctors',
    label: 'Doctors',
    focusedIcon: Doctor01Icon,
    defaultIcon: Doctor01Icon,
    component: DoctorsScreen,
  },
  {
    name: 'Appointments',
    label: 'Appointments',
    focusedIcon: Calendar03Icon,
    defaultIcon: Calendar03Icon,
    component: AppointmentsScreen,
  },
  { name: 'Profile', label: 'Profile', focusedIcon: User02Icon, defaultIcon: User02Icon, component: ProfileScreen },
]

const Home = () => {
  return (
    <>
      <Tab.Navigator tabBar={BottomTabBar} screenOptions={{ animation: 'shift' }}>
        {screens.map((screen) => (
          <Tab.Screen
            key={screen.name}
            name={screen.name}
            component={screen.component}
            options={{
              tabBarLabel: screen.label,
              headerShown: false,
              tabBarIcon: (props) => (
                <TabIcon {...props} focusedIcon={screen.focusedIcon} defaultIcon={screen.defaultIcon} />
              ),
            }}
          />
        ))}
      </Tab.Navigator>
    </>
  )
}

type TabIconT = {
  focused: boolean
  color: string
  size: number
  focusedIcon: React.ComponentType<HugeIconProps>
  defaultIcon: React.ComponentType<HugeIconProps>
}

function TabIcon({ focused, color, size, focusedIcon: FocusedIcon, defaultIcon: DefaultIcon }: TabIconT) {
  return focused ? (
    <FocusedIcon size={size} color={color} variant='solid-rounded' />
  ) : (
    <DefaultIcon size={size} color={color} strokeWidth={1.6} />
  )
}

export default Home
