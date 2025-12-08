import { PaddingBottom } from '@components/SafePadding'
import AppBar from '@components/AppBar'
import Press from '@components/Press'
import Call02Icon from '@hugeicons/Call02Icon'
import Cancel01Icon from '@hugeicons/Cancel01Icon'
import Medicine02Icon from '@hugeicons/Medicine02Icon'
import Search01Icon from '@hugeicons/Search01Icon'
import PlusSignIcon from '@hugeicons/PlusSignIcon'
import { useMemo, useState } from 'react'
import { Image, ScrollView, View, useColorScheme } from 'react-native'
import { SemiBold, Regular, Medium } from '@utils/fonts'
import { useNavigation } from '@react-navigation/native'
import { HPStackNav } from '@utils/types'

const PROFILE_DATA = {
  name: 'Alex Richards',
  email: 'alex.richards@hpicon.com',
  phone: '+1 (555) 234-5678',
  image: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=100&h=100&fit=crop&crop=face',
}

interface SettingItem {
  id: string
  label: string
  icon: React.ElementType
  onPress?: () => void
  value?: string
}

export default function HPProfileScreen() {
  const scheme = useColorScheme()
  const [isDarkMode, setIsDarkMode] = useState(scheme === 'dark')
  const navigation = useNavigation<HPStackNav>()

  const settingsSections: { title: string; items: SettingItem[] }[] = useMemo(
    () => [
      {
        title: 'Settings',
        items: [
          {
            id: 'payment',
            label: 'Collect Payment',
            icon: PlusSignIcon,
            onPress: () => {},
          },
          {
            id: 'address',
            label: 'Manage Address',
            icon: Medicine02Icon,
            onPress: () => {},
          },
          {
            id: 'doctors',
            label: 'Manage Doctors & Schedules',
            icon: Search01Icon,
            onPress: () => {},
          },
        ],
      },
      {
        title: 'Support',
        items: [
          {
            id: 'help',
            label: 'Help',
            icon: Call02Icon,
            onPress: () => {},
          },
        ],
      },
    ],
    [],
  )

  return (
    <ScrollView className='flex-1 bg-white dark:bg-neutral-900' showsVerticalScrollIndicator={false}>
      <AppBar>
        <View className='flex-1 items-center'>
          <SemiBold className='text-lg text-black dark:text-white'>Profile</SemiBold>
        </View>
      </AppBar>

      {/* Profile Section */}
      <View className='items-center gap-3 px-5 py-8'>
        <Image source={{ uri: PROFILE_DATA.image }} className='h-24 w-24 rounded-full' resizeMode='cover' />
        <View className='items-center gap-1'>
          <SemiBold className='text-2xl text-neutral-900 dark:text-white'>{PROFILE_DATA.name}</SemiBold>
          <Regular className='text-sm text-neutral-500'>{PROFILE_DATA.email}</Regular>
        </View>
        <Press
          className='mt-2 rounded-lg bg-blue-600 px-6 py-2'
          onPress={() => navigation.navigate('EditHPProfile' as never)}
        >
          <Medium className='text-white'>Edit Profile</Medium>
        </Press>
      </View>

      {/* Settings */}
      <View className='gap-0 px-5'>
        <SemiBold className='mb-3 text-base text-neutral-900 dark:text-white'>Settings</SemiBold>
        <View className='gap-2'>
          {settingsSections[0]?.items.map((item) => {
            const IconComponent = item.icon
            return (
              <Press
                key={item.id}
                onPress={item.onPress}
                className='flex-row items-center justify-between rounded-xl bg-white px-4 py-3 dark:bg-neutral-800'
              >
                <View className='flex-1 flex-row items-center gap-3'>
                  <View className='h-10 w-10 items-center justify-center rounded-lg bg-blue-100 dark:bg-blue-900/30'>
                    <IconComponent color='#3b82f6' size={20} strokeWidth={1.5} />
                  </View>
                  <Medium className='text-neutral-900 dark:text-white'>{item.label}</Medium>
                </View>
                <PlusSignIcon color={scheme === 'dark' ? '#6b7280' : '#d1d5db'} size={18} strokeWidth={2} />
              </Press>
            )
          })}
        </View>
      </View>

      {/* Support */}
      <View className='gap-0 px-5 py-6'>
        <SemiBold className='mb-3 text-base text-neutral-900 dark:text-white'>Support</SemiBold>
        <View className='gap-2'>
          {settingsSections[1]?.items.map((item) => {
            const IconComponent = item.icon
            return (
              <Press
                key={item.id}
                onPress={item.onPress}
                className='flex-row items-center justify-between rounded-xl bg-white px-4 py-3 dark:bg-neutral-800'
              >
                <View className='flex-1 flex-row items-center gap-3'>
                  <View className='h-10 w-10 items-center justify-center rounded-lg bg-blue-100 dark:bg-blue-900/30'>
                    <IconComponent color='#3b82f6' size={20} strokeWidth={1.5} />
                  </View>
                  <Medium className='text-neutral-900 dark:text-white'>{item.label}</Medium>
                </View>
                <PlusSignIcon color={scheme === 'dark' ? '#6b7280' : '#d1d5db'} size={18} strokeWidth={2} />
              </Press>
            )
          })}
        </View>
      </View>

      {/* Preferences */}
      <View className='gap-0 px-5 py-6'>
        <SemiBold className='mb-3 text-base text-neutral-900 dark:text-white'>Preferences</SemiBold>
        <View className='gap-2'>
          <Press
            className='flex-row items-center justify-between rounded-xl bg-white px-4 py-3 dark:bg-neutral-800'
            onPress={() => setIsDarkMode(!isDarkMode)}
          >
            <View className='flex-1 flex-row items-center gap-3'>
              <View className='h-10 w-10 items-center justify-center rounded-lg bg-blue-100 dark:bg-blue-900/30'>
                <Medicine02Icon color='#3b82f6' size={20} strokeWidth={1.5} />
              </View>
              <Medium className='flex-1 text-neutral-900 dark:text-white'>Dark Mode</Medium>
            </View>
            <View
              className={`h-6 w-11 rounded-full ${isDarkMode ? 'bg-blue-600' : 'bg-neutral-300'}`}
              style={{ justifyContent: 'center' }}
            >
              <View className={`h-5 w-5 rounded-full bg-white ${isDarkMode ? 'ml-5' : 'ml-0.5'}`} />
            </View>
          </Press>
        </View>
      </View>

      <PaddingBottom />
    </ScrollView>
  )
}
