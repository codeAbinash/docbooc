import Press from '@components/Press'
import { PaddingBottom } from '@components/SafePadding'
import Slider from '@components/Slider/Slider'
import PlusSignIcon from '@hugeicons/PlusSignIcon'
import HybridHead from '@components/HybridHead'
import { Medium } from '@utils/fonts'
import { NavProp } from '@utils/types'
import React from 'react'
import { ScrollView, View } from 'react-native'
import FamilyMemberCard, { FamilyMember } from '@/UserScreens/FamilyMemberSelector/FamilyMemberCard'
import Button from '@components/Button'

const mockFamilyMembers: FamilyMember[] = [
  { id: '1', name: 'John Smith', relationship: 'Myself' },
  { id: '2', name: 'Sarah Smith', relationship: 'Wife' },
  { id: '3', name: 'Emily Smith', relationship: 'Daughter' },
  { id: '4', name: 'Robert Smith', relationship: 'Father' },
]

const FamilyMemberSelectorScreen = ({ navigation }: NavProp) => {
  const [selectedMemberId, setSelectedMemberId] = React.useState<string | null>(null)

  const handleSelectMember = (member: FamilyMember) => {
    setSelectedMemberId(member.id)
    console.log('Selected member:', member)
  }

  const handleAddMember = () => {
    navigation.navigate('PatientInfo')
  }

  return (
    <View className='bg-white  flex-1'>
      <HybridHead title='Select Patient' showBackButton={true} onBackPress={() => navigation.goBack()} />

      <View className='flex-1 border-t border-neutral-200'>
        <ScrollView className='flex-1' contentContainerClassName='px-5 py-4' showsVerticalScrollIndicator={false}>
          {/* Family Members List */}
          {mockFamilyMembers.map((member) => (
            <FamilyMemberCard
              key={member.id}
              member={member}
              isSelected={selectedMemberId === member.id}
              onSelect={handleSelectMember}
            />
          ))}

          {/* Add New Member Button */}
          <Press onPress={handleAddMember} activeScale={0.98} className='mb-4'>
            <View className='card flex-row items-center justify-start rounded-xl border-2 border-dashed border-accent/70 p-4'>
              <View className='rounded-lg bg-accent/10 p-4'>
                <PlusSignIcon size={20} color='#3b82f6' variant='stroke-rounded' />
              </View>
              <Medium className='ml-3 text-base text-accent'>Add New Patient</Medium>
            </View>
          </Press>

          <View className='h-6' />
        </ScrollView>

        <View className='px-5 pb-2 pt-2'>
          <Button
            title='Continue'
            onPress={() => {
              if (selectedMemberId) {
                navigation.navigate('VerifyBeforeBooking')
              }
            }}
            disabled={!selectedMemberId}
            progressFill={selectedMemberId ? 75 : 50}
          />
        </View>
      </View>

      <PaddingBottom />
    </View>
  )
}

export default FamilyMemberSelectorScreen
