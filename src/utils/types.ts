import type { DrawerNavigationProp } from '@react-navigation/drawer'
import { RouteProp } from '@react-navigation/native'
import { StackNavigationProp } from '@react-navigation/stack'
import { AdminRootStackParamList } from '../../AdminApp'
import { RootStackParamList } from '../../App'
import type { HpRootStackParamList } from '../../HPApp'
export type { HpRootStackParamList }

export type StackNav = StackNavigationProp<RootStackParamList>
export type HPStackNav = StackNavigationProp<HpRootStackParamList>
export type AdminStackNav = StackNavigationProp<AdminRootStackParamList>
export type NavProp = { navigation: StackNav }
export type HPNavProp = {
  navigation: HPStackNav
  route: RouteProp<HpRootStackParamList>
}
export type AdminNavProp = {
  navigation: AdminStackNav
  route: RouteProp<AdminRootStackParamList>
}
export type DrawerNav = DrawerNavigationProp<RootStackParamList>
export type DrawerProps = { navigation: DrawerNav }

export type Theme = {
  gradient: [string, string]
  content: 'light-content' | 'dark-content' | 'default'
  color: { color: string }
}

export type NU = null | undefined

/**
 * Utility type to extract the resolved JSON response type from an API function
 * @example
 * type ResponseData = ExtractApiType<typeof client.someEndpoint.$get>
 */
export type InferApiResponse<T extends (...args: any) => any> = Awaited<
  ReturnType<Awaited<Awaited<ReturnType<T>>['json']>>
>
