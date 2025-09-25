import React from 'react'
import { PaddingBottom, PaddingTop } from '@components/SafePadding'
import { View } from 'react-native'
import { Header } from './BookAppointment/components/Header'
import { NavProp } from '@utils/types'
import FamilyMemberSelector from './FamilyMemberSelector/FamilyMemberSelector'
import { FamilyMember } from './FamilyMemberSelector/FamilyMemberCard'

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

  const handleNext = () => {
    if (selectedMemberId) {
      const selectedMember = mockFamilyMembers.find((m) => m.id === selectedMemberId)
      console.log('Proceed with selected member:', selectedMember)
    }
  }

  return (
    <View className='bg flex-1'>
      <PaddingTop />
      <Header title='Select Family Member' />

      <FamilyMemberSelector
        members={mockFamilyMembers}
        selectedMemberId={selectedMemberId}
        onMemberSelect={handleSelectMember}
        onAddMember={handleAddMember}
        onComplete={handleNext}
      />

      <PaddingBottom />
    </View>
  )
}

export default FamilyMemberSelectorScreen
