import Press from '@components/Press'
import { PaddingBottom } from '@components/SafePadding'

import FamilyMemberCard, { FamilyMember } from '@/UserScreens/FamilyMemberSelector/FamilyMemberCard'
import Button from '@components/Button'
import HybridHead from '@components/HybridHead'
import PlusSignIcon from '@hugeicons/PlusSignIcon'
import { useQuery } from '@tanstack/react-query'
import { api } from '@utils/client'
import { Medium, SemiBold } from '@utils/fonts'
import { NavProp } from '@utils/types'
import React from 'react'
import { ActivityIndicator, ScrollView, View } from 'react-native'
import { useBookingStore } from '@/zustand/bookingStore'

const mockFamilyMembers: FamilyMember[] = [
  { id: '1', name: '', relationship: 'Myself' },
  { id: '2', name: 'Sarah Smith', relationship: 'Wife', age: 28, gender: 'Female' },
  { id: '3', name: 'Emily Smith', relationship: 'Daughter', age: 5, gender: 'Female' },
  { id: '4', name: 'Robert Smith', relationship: 'Father', age: 62, gender: 'Male' },
]

const calcAge = (dob?: string) => {
  if (!dob) return undefined
  const b = new Date(dob)
  if (isNaN(b.getTime())) return undefined
  const now = new Date()
  let age = now.getFullYear() - b.getFullYear()
  const m = now.getMonth() - b.getMonth()
  if (m < 0 || (m === 0 && now.getDate() < b.getDate())) age--
  return age
}

const FamilyMemberSelectorScreen = ({ navigation }: NavProp) => {
  const [selectedMemberId, setSelectedMemberId] = React.useState<string | null>(null)
  const { setSelectedMemberId: setBookingMemberId, setPatientData } = useBookingStore()

  const { data: profile, isPending } = useQuery({
    queryKey: ['profile'],
    queryFn: async () => await (await api.users.profile.$get()).json(),
  })

  const handleSelectMember = (member: FamilyMember) => {
    setSelectedMemberId(member.id)
  }

  const handleAddMember = () => {
    navigation.navigate('PatientInfo' as any, { fromFamilyMember: true })
  }

  const handleSetupProfile = () => {
    navigation.navigate('PatientInfo' as any, { fromSetupProfile: true })
  }

  const myName = profile?.data?.user.name ?? ''
  const myDOB = profile?.data?.user.dateOfBirth
  const myAge = calcAge(myDOB as string)
  const gender = profile?.data?.user.gender

  const normalizeGender = (g?: string | null): FamilyMember['gender'] | undefined => {
    if (!g) return undefined
    const s = g.trim().toLowerCase()
    if (s === 'male') return 'Male'
    if (s === 'female') return 'Female'
    return 'Other'
  }

  const myGender = normalizeGender(gender)

  if (isPending) {
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
          {/* Family Members List */}
          {mockFamilyMembers.map((member) => {
            const isMyself = member.relationship === 'Myself'

            const displayMember = {
              ...member,
              name: isMyself ? (myName.trim() ? myName : 'Setup your profile to continue') : member.name,
              age: isMyself ? (myAge ?? member.age) : member.age,
              gender: isMyself ? (myGender ?? member.gender) : member.gender,
            }

            const hasSetupMessage = isMyself && (!myName.trim() || !myDOB)

            return (
              <FamilyMemberCard
                key={member.id}
                member={displayMember}
                isSelected={selectedMemberId === member.id}
                onSelect={handleSelectMember}
                onNameClick={hasSetupMessage ? handleSetupProfile : undefined}
                showSelector={!hasSetupMessage}
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
            title='Review Appointment'
            onPress={() => {
              if (selectedMemberId) {
                const selectedMember = mockFamilyMembers.find((m) => m.id === selectedMemberId)
                if (selectedMember) {
                  const isMyself = selectedMember.relationship === 'Myself'
                  const patientData = {
                    id: selectedMember.id,
                    name: isMyself ? (myName.trim() ? myName : '') : selectedMember.name,
                    age: isMyself ? (myAge ?? selectedMember.age) : selectedMember.age,
                    gender: isMyself ? (myGender ?? selectedMember.gender) : selectedMember.gender,
                    mobile: '',
                    relationship: selectedMember.relationship,
                  }
                  setBookingMemberId(selectedMemberId)
                  setPatientData(patientData)
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
