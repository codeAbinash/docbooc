import Press from '@components/Press'
import { PaddingBottom } from '@components/SafePadding'

import FamilyMemberCard, { Member } from '@/UserScreens/FamilyMemberSelector/FamilyMemberCard'
import { BookingAppointmentData, useBookingStore } from '@/zustand/bookingStore'
import Button from '@components/Button'
import HybridHead from '@components/HybridHead'
import PlusSignIcon from '@hugeicons/PlusSignIcon'
import { useQuery } from '@tanstack/react-query'
import { api } from '@utils/client'
import { Medium, SemiBold } from '@utils/fonts'
import { NavProp } from '@utils/types'
import React from 'react'
import { ActivityIndicator, ScrollView, View } from 'react-native'

const calcAge = (dob?: string | null) => {
  if (!dob) return undefined
  const b = new Date(dob)
  if (isNaN(b.getTime())) return undefined
  const now = new Date()
  let age = now.getFullYear() - b.getFullYear()
  const m = now.getMonth() - b.getMonth()
  if (m < 0 || (m === 0 && now.getDate() < b.getDate())) age--
  return age
}

const normalizeRelation = (relation?: string | null): string => {
  if (!relation) return ''
  const mapping: Record<string, string> = {
    spouse: 'Spouse',
    parent: 'Parent',
    sibling: 'Sibling',
    child: 'Child',
    friend: 'Friend',
    other: 'Other',
  }
  return mapping[relation.toLowerCase() as keyof typeof mapping] ?? relation
}

const mapMemberToPatientData = (member: Member): BookingAppointmentData['patientData'] => {
  const age = calcAge(member.dob)
  const gender = member.gender ? member.gender.charAt(0).toUpperCase() + member.gender.slice(1) : undefined

  return {
    id: member.id,
    name: member.name ?? '',
    age,
    gender,
    mobile: member.phone ?? '',
    relationship: normalizeRelation(member.relation),
  }
}

const FamilyMemberSelectorScreen = ({ navigation }: NavProp) => {
  const [selectedMemberId, setSelectedMemberId] = React.useState<string | null>(null)
  const { setSelectedMemberId: setBookingMemberId, setPatientData } = useBookingStore()
  const { data: membersResponse, isPending: isMembersPending } = useQuery({
    queryKey: ['members'],
    queryFn: async () => await (await api.users.members.$get()).json(),
  })

  const handleSelectMember = (member: Member) => {
    setSelectedMemberId(member.id)
  }

  const handleAddMember = () => {
    navigation.navigate('PatientInfo' as any, { fromFamilyMember: true })
  }

  const handleSetupProfile = () => {
    navigation.navigate('PatientInfo' as any, { fromSetupProfile: true })
  }

  const familyMembers = membersResponse?.data || []
  if (isMembersPending) {
    return (
      <View className='flex-1 items-center justify-center bg-white'>
        <ActivityIndicator size='large' color='#3b82f6' />
      </View>
    )
  }

  return (
    <View className='flex-1 bg-white'>
      <HybridHead title='Select Patient' showBackButton={true} onBackPress={() => navigation.goBack()} />

      <View className='flex-1'>
        <ScrollView className='flex-1' contentContainerClassName='px-5 py-4' showsVerticalScrollIndicator={false}>
          {familyMembers?.map((member, index) => {
            const isMyself = index === 0
            const needsSetup = isMyself && (!member.name || !member.dob || !member.gender)
            // const displayName = needsSetup ? 'Setup your profile to continue' : undefined

            return (
              <FamilyMemberCard
                key={member.id}
                member={member}
                isSelected={selectedMemberId === member.id}
                onSelect={handleSelectMember}
                onNameClick={needsSetup ? handleSetupProfile : undefined}
                needSetup={needsSetup}
              />
            )
          })}
          <View className='flex-row items-center gap-3 py-4 pb-6'>
            <View className='h-px flex-1 bg-neutral-300' />
            <View className='rounded-full bg-accent/10 px-4 py-2'>
              <SemiBold className='text-xs text-accent'>OR</SemiBold>
            </View>
            <View className='h-px flex-1 bg-neutral-300' />
          </View>

          {/* Add New Member Button */}
          <Press onPress={handleAddMember} activeScale={0.98} className=''>
            <View className='flex-row items-center justify-start rounded-3xl border-2 border-dashed border-accent/70 bg-accent/10 p-4'>
              <View className='rounded-2xl bg-white p-5'>
                <PlusSignIcon size={20} color='#3b82f6' variant='stroke-rounded' />
              </View>
              <Medium className='ml-3 text-base text-accent'>Add New Patient</Medium>
            </View>
          </Press>

          <View className='h-6' />
        </ScrollView>

        <View className='bg-white px-5 py-3 dark:border-neutral-700 dark:bg-neutral-800'>
          <Button
            title={
              selectedMemberId &&
              familyMembers.findIndex((m) => m.id === selectedMemberId) === 0 &&
              (!familyMembers[0]?.name || !familyMembers[0]?.dob || !familyMembers[0]?.gender)
                ? 'Setup your profile'
                : 'Review Appointment'
            }
            onPress={() => {
              if (selectedMemberId) {
                const selectedMember = familyMembers.find((m) => m.id === selectedMemberId)
                const selectedIndex = familyMembers.findIndex((m) => m.id === selectedMemberId)
                const needsSetup =
                  selectedIndex === 0 && (!selectedMember?.name || !selectedMember?.dob || !selectedMember?.gender)

                if (needsSetup) {
                  navigation.navigate('PatientInfo' as any, { fromSetupProfile: true })
                } else if (selectedMember) {
                  setBookingMemberId(selectedMemberId)
                  setPatientData(mapMemberToPatientData(selectedMember))
                  navigation.navigate('VerifyBeforeBooking')
                }
              }
            }}
            disabled={!selectedMemberId}
          />
        </View>
      </View>

      <PaddingBottom />
    </View>
  )
}

export default FamilyMemberSelectorScreen
