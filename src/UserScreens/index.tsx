import { PaddingBottom } from '@components/SafePadding'
import Calendar03Icon from '@hugeicons/Calendar03Icon'
import { HugeIconProps } from '@hugeicons/constants'
import Doctor01Icon from '@hugeicons/Doctor01Icon'
import Home01Icon from '@hugeicons/Home01Icon'
import User02Icon from '@hugeicons/User02Icon'
import { createBottomTabNavigator, type BottomTabBarProps } from '@react-navigation/bottom-tabs'
import HomeScreen from '@/UserScreens/HomeScreen'
import Colors from '@utils/colors'
import { SemiBold } from '@utils/fonts'
import React, { type ReactNode, useCallback, useMemo, memo } from 'react'
import { TouchableOpacity, View, useColorScheme, type ColorSchemeName, StyleSheet } from 'react-native'
import colors from 'tailwindcss/colors'
import Appointments from './Appointments/Appointments'
import Doctors from './Doctors/Doctors'

// Types
type TabIconProps = {
  focused: boolean
  color: string
  size: number
  focusedIcon: React.ComponentType<HugeIconProps>
  defaultIcon: React.ComponentType<HugeIconProps>
}

type ScreenConfig = {
  name: string
  label: string
  focusedIcon: React.ComponentType<HugeIconProps>
  defaultIcon: React.ComponentType<HugeIconProps>
  component: React.ComponentType<any>
}

// Constants
const TAB_ICON_SIZE = 25
const LABEL_FONT_SIZE = 9.5
const ICON_STROKE_WIDTH = 1.6
const ICON_OPACITY = 0.9

const INACTIVE_ICON_COLOR = colors.zinc[500]
const DARK_INACTIVE_COLOR = colors.zinc[400]
const LIGHT_INACTIVE_COLOR = colors.zinc[600]

const styles = StyleSheet.create({
  container: {
    borderTopWidth: 0,
  },
  containerDark: {
    borderTopWidth: 1,
  },
  tabBarRow: {
    flexDirection: 'row',
    paddingHorizontal: 10,
  },
  tabButton: {
    flex: 1,
    paddingTop: 13,
    paddingBottom: 11,
  },
  labelStyle: {
    marginTop: 4,
    fontSize: LABEL_FONT_SIZE,
  },
  iconStyle: {
    opacity: ICON_OPACITY,
  },
})

// Placeholder components
const ProfileScreen = memo(() => <View className='bg flex-1' />)
ProfileScreen.displayName = 'ProfileScreen'

// Screen configurations
const SCREENS: readonly ScreenConfig[] = [
  {
    name: 'HomeScreen',
    label: 'Home',
    focusedIcon: Home01Icon,
    defaultIcon: Home01Icon,
    component: HomeScreen,
  },
  {
    name: 'Doctors',
    label: 'Doctors',
    focusedIcon: Doctor01Icon,
    defaultIcon: Doctor01Icon,
    component: Doctors,
  },
  {
    name: 'Appointments',
    label: 'Appointments',
    focusedIcon: Calendar03Icon,
    defaultIcon: Calendar03Icon,
    component: Appointments,
  },
  {
    name: 'Profile',
    label: 'Profile',
    focusedIcon: User02Icon,
    defaultIcon: User02Icon,
    component: ProfileScreen,
  },
] as const

const Tab = createBottomTabNavigator()

// Utility functions
export function getFocusedColor(_theme: ColorSchemeName): string {
  return Colors.accent
}

export function getColor(theme: ColorSchemeName): string {
  return theme === 'dark' ? DARK_INACTIVE_COLOR : LIGHT_INACTIVE_COLOR
}

// Tab Icon Component
const TabIcon = memo<TabIconProps>(({ focused, color, size, focusedIcon: FocusedIcon, defaultIcon: DefaultIcon }) => {
  return focused ? (
    <FocusedIcon size={size} color={color} variant='duotone-rounded' />
  ) : (
    <DefaultIcon
      size={size}
      color={INACTIVE_ICON_COLOR}
      strokeWidth={ICON_STROKE_WIDTH}
      variant='duotone-rounded'
      style={styles.iconStyle}
    />
  )
})
TabIcon.displayName = 'TabIcon'

// Tab Bar Component
const TabBar = memo<BottomTabBarProps>(({ state, descriptors, navigation }) => {
  const scheme = useColorScheme()

  const containerStyle = useMemo(() => [scheme === 'dark' ? styles.containerDark : styles.container], [scheme])

  const renderTabButton = useCallback(
    (route: any, index: number) => {
      const { options } = descriptors[route.key]!
      const label =
        options.tabBarLabel !== undefined
          ? options.tabBarLabel
          : options.title !== undefined
            ? options.title
            : route.name

      const isFocused = state.index === index

      const handlePress = () => {
        const event = navigation.emit({
          type: 'tabPress',
          target: route.key,
          canPreventDefault: true,
        })

        if (!isFocused && !event.defaultPrevented) {
          navigation.navigate(route.name, route.params)
        }
      }

      const handleLongPress = () => {
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
          onPress={handlePress}
          onLongPress={handleLongPress}
          className='flex items-center justify-center p-1'
          style={styles.tabButton}
        >
          {options.tabBarIcon &&
            options.tabBarIcon({
              focused: isFocused,
              color,
              size: TAB_ICON_SIZE,
            })}
          <SemiBold style={[styles.labelStyle, { color }]}>{label as ReactNode}</SemiBold>
        </TouchableOpacity>
      )
    },
    [state.index, descriptors, navigation, scheme],
  )

  return (
    <View className='bg-white dark:border-card-dark/20 dark:bg-bg-dark' style={containerStyle}>
      <View style={styles.tabBarRow}>{state.routes.map((route, index) => renderTabButton(route, index))}</View>
      <PaddingBottom />
    </View>
  )
})
TabBar.displayName = 'TabBar'

// Bottom Tab Bar Wrapper
const BottomTabBar = memo<BottomTabBarProps>((props) => {
  return (
    <TabBar
      state={props.state}
      descriptors={props.descriptors}
      navigation={props.navigation}
      insets={{ bottom: 0, left: 0, right: 0, top: 0 }}
    />
  )
})
BottomTabBar.displayName = 'BottomTabBar'

// Main Home Component
const Home = () => {
  const renderScreens = useMemo(() => {
    return SCREENS.map((screen) => (
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
    ))
  }, [])

  return (
    <Tab.Navigator
      tabBar={(props) => <BottomTabBar {...props} />}
      screenOptions={{
        animation: 'shift',
        headerShown: false,
      }}
    >
      {renderScreens}
    </Tab.Navigator>
  )
}

export default Home
