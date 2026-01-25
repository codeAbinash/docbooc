import type { DrawerNavigationProp } from '@react-navigation/drawer'
import { RouteProp } from '@react-navigation/native'
import { StackNavigationProp } from '@react-navigation/stack'
import { RootStackParamList } from '../../App'
import type { HpRootStackParamList } from '../../HPApp'
import { AdminRootStackParamList } from '../AdminScreens/AdminApp'
import { client, hpApi } from './client'
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

const myDoctorAPi = client.api.v1.hp.doctors['my-doctors'].$get
export type Doctor = NonNullable<InferApiResponse<typeof myDoctorAPi>['data']>[number]

const bookingsApi = client.api.v1.hp.bookings.list.$get

export type BookingPosition = NonNullable<InferApiResponse<typeof bookingsApi>['data']>[number]

const patientsApi = client.api.v1.hp.bookings.patients.$get
export type Patient = NonNullable<InferApiResponse<typeof patientsApi>['data']>[number]

export type ScheduleType = InferApiResponse<(typeof hpApi.schedules.doctor)[':doctorId']['$get']>

export type Schedule = NonNullable<ScheduleType['data']>[number]
export type TimeSlot = Schedule['timeSlots'][number]

const schedulePostApi = hpApi.schedules.$post
export type SchedulePayload = Parameters<typeof schedulePostApi>[0]['json']
