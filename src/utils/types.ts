import type { DrawerNavigationProp } from '@react-navigation/drawer'
import { StackNavigationProp } from '@react-navigation/stack'
import { RootStackParamList } from '../../App'
import { HpRootStackParamList } from '../../HPApp'

export type StackNav = StackNavigationProp<RootStackParamList>
export type HPStackNav = StackNavigationProp<HpRootStackParamList>
export type NavProp = { navigation: StackNav }
export type DrawerNav = DrawerNavigationProp<RootStackParamList>
export type DrawerProps = { navigation: DrawerNav }

export type Theme = {
  gradient: [string, string]
  content: 'light-content' | 'dark-content' | 'default'
  color: { color: string }
}

export type NU = null | undefined
