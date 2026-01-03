import { PaddingBottom } from '@components/SafePadding'
import HybridHead from '@components/HybridHead'
import Press from '@components/Press'
import Location06Icon from '@assets/icons/hugeicons/Location06Icon'
import Call02Icon from '@assets/icons/hugeicons/Call02Icon'
import Logout05Icon from '@assets/icons/hugeicons/Logout05Icon'
import UserIcon from '@assets/icons/hugeicons/UserIcon'
import Notification01Icon from '@assets/icons/hugeicons/Notification01Icon'
import TaskDone01Icon from '@assets/icons/hugeicons/TaskDone01Icon'
import SquareIcon from '@assets/icons/hugeicons/SquareIcon'
import Menu01Icon from '@assets/icons/hugeicons/Menu01Icon'
import ArrowLeft01Icon from '@assets/icons/hugeicons/ArrowLeft01Icon'
import UserCheck01Icon from '@assets/icons/hugeicons/UserCheck01Icon'
import ChevronRight01Icon from '@assets/icons/hugeicons/UserCheck01Icon'
import Colors from '@utils/colors'
import { useState } from 'react'
import { Image, ScrollView, View, useColorScheme, Switch } from 'react-native'
import { SemiBold, Regular, Medium } from '@utils/fonts'
import { useNavigation } from '@react-navigation/native'
import { HPStackNav } from '@utils/types'

const PROFILE_DATA = {
  name: 'Rapolu Naveen',
  email: 'naveenrapolu07@gmail.com',
  phone: '+1 (555) 234-5678',
  image: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=100&h=100&fit=crop&crop=face',
}

export default function HPProfileScreen() {
  const scheme = useColorScheme()
  const navigation = useNavigation<HPStackNav>()
  const [biometricsEnabled, setBiometricsEnabled] = useState(false)

  return (
    <ScrollView className='flex-1 bg-white dark:bg-neutral-900' showsVerticalScrollIndicator={false}>
      <HybridHead title='Profile' showMenu />

      <View className='px-5'>
        {/* Profile Card */}
        <View className='pb-6 pt-4'>
          <Press
            onPress={() => navigation.navigate('EditHPProfile' as never)}
            className='overflow-hidden rounded-2xl border border-neutral-300 bg-white p-3 dark:bg-neutral-800'
          >
            <View className='flex-row items-center gap-4'>
              <Image source={{ uri: PROFILE_DATA.image }} className='h-16 w-16 rounded-full' resizeMode='cover' />
              <View className='flex-1 gap-1 '>
                <SemiBold className='text-base text-neutral-900 dark:text-white'>{PROFILE_DATA.name}</SemiBold>
                
                <View className='mt-1 flex-row items-center gap-1'>
                  <UserCheck01Icon size={20} color='#3b82f6' strokeWidth={2} />
                  <Regular className='text-sm text-blue-600'>Edit Profile</Regular>
                </View>
              </View>
              <ChevronRight01Icon size={20} color={scheme === 'dark' ? '#6b7280' : '#d1d5db'} strokeWidth={2} />
            </View>
          </Press>
        </View>

        {/* Address & Security */}
        <View className='pb-6 '>
          <View className='overflow-hidden rounded-2xl border border-neutral-300 bg-white p-5 dark:bg-neutral-800'>
            <SemiBold className='mb-4 text-base text-neutral-900 dark:text-white'>Address & Security</SemiBold>
            <View className='gap-4'>
              {/* Saved Address */}
              <Press className='flex-row p-2 items-center'>
                <View className='mr-3 rounded-full bg-blue-50 p-2 dark:bg-blue-900/20'>
                  <Location06Icon size={20} color={scheme === 'dark' ? Colors.accent : '#3b82f6'} />
                </View>
                <View className='flex-1'>
                  <Medium className='text-xs text-neutral-500 dark:text-neutral-400'>Saved Address</Medium>
                  <Medium className='text-sm text-neutral-900 dark:text-white'>View or update</Medium>
                </View>
                <ArrowLeft01Icon color={scheme === 'dark' ? '#6b7280' : '#d1d5db'} size={20} strokeWidth={2} />
              </Press>

              {/* Change Password */}
              <Press className='flex-row p-2 items-center'>
                <View className='mr-3 rounded-full bg-purple-50 p-2 dark:bg-purple-900/20'>
                  <Call02Icon size={20} color={scheme === 'dark' ? '#a855f7' : '#8b5cf6'} />
                </View>
                <View className='flex-1'>
                  <Medium className='text-xs text-neutral-500 dark:text-neutral-400'>Change Password</Medium>
                  <Medium className='text-sm text-neutral-900 dark:text-white'>Update your password</Medium>
                </View>
                <ArrowLeft01Icon color={scheme === 'dark' ? '#6b7280' : '#d1d5db'} size={20} strokeWidth={2} />
              </Press>

              {/* Change PIN */}
              <Press className='flex-row p-2 items-center'>
                <View className='mr-3 rounded-full bg-orange-50 p-2 dark:bg-orange-900/20'>
                  <SquareIcon size={20} color={scheme === 'dark' ? '#f97316' : '#ea580c'} />
                </View>
                <View className='flex-1'>
                  <Medium className='text-xs text-neutral-500 dark:text-neutral-400'>Manage Payments</Medium>
                  <Medium className='text-sm text-neutral-900 dark:text-white'>Check pending payments</Medium>
                </View>
                <ArrowLeft01Icon color={scheme === 'dark' ? '#6b7280' : '#d1d5db'} size={20} strokeWidth={2} />
              </Press>

              
            </View>
          </View>
        </View>

        {/* Settings */}
        <View className='pb-6'>
          <View className='overflow-hidden rounded-2xl border border-neutral-300 bg-white p-5 dark:bg-neutral-800'>
            <SemiBold className='mb-4 text-base text-neutral-900 dark:text-white'>Settings</SemiBold>
            <View className='gap-4'>
              

              {/* Privacy & Security */}
              <Press className='flex-row p-2 items-center'>
                <View className='mr-3 rounded-full bg-purple-50 p-2 dark:bg-purple-900/20'>
                  <TaskDone01Icon size={20} color={scheme === 'dark' ? '#a855f7' : '#8b5cf6'} />
                </View>
                <View className='flex-1'>
                  <Medium className='text-xs text-neutral-500 dark:text-neutral-400'>Privacy & Security</Medium>
                  <Medium className='text-sm text-neutral-900 dark:text-white'>Control your data</Medium>
                </View>
                <ArrowLeft01Icon color={scheme === 'dark' ? '#6b7280' : '#d1d5db'} size={20} strokeWidth={2} />
              </Press>

              {/* Help & Support */}
              <Press className='flex-row p-2 items-center'>
                <View className='mr-3 rounded-full bg-orange-50 p-2 dark:bg-orange-900/20'>
                  <Call02Icon size={20} color={scheme === 'dark' ? '#f97316' : '#ea580c'} />
                </View>
                <View className='flex-1'>
                  <Medium className='text-xs text-neutral-500 dark:text-neutral-400'>Help & Support</Medium>
                  <Medium className='text-sm text-neutral-900 dark:text-white'>Get assistance</Medium>
                </View>
                <ArrowLeft01Icon color={scheme === 'dark' ? '#6b7280' : '#d1d5db'} size={20} strokeWidth={2} />
              </Press>

              {/* App Settings */}
              <Press className='flex-row p-2 items-center'>
                <View className='mr-3 rounded-full bg-green-50 p-2 dark:bg-green-900/20'>
                  <Menu01Icon size={20} color={scheme === 'dark' ? '#10B981' : '#059669'} />
                </View>
                <View className='flex-1'>
                  <Medium className='text-xs text-neutral-500 dark:text-neutral-400'>App Settings</Medium>
                  <Medium className='text-sm text-neutral-900 dark:text-white'>Configure app</Medium>
                </View>
                <ArrowLeft01Icon color={scheme === 'dark' ? '#6b7280' : '#d1d5db'} size={20} strokeWidth={2} />
              </Press>
            </View>
          </View>
        </View>
      </View>

      <PaddingBottom />
    </ScrollView>
  )
}
