import Press from '@components/Press'
import { PaddingBottom, PaddingTop } from '@components/SafePadding'
import Slider from '@components/Slider/Slider'
import PlusSignIcon from '@hugeicons/PlusSignIcon'
import { Medium } from '@utils/fonts'
import { NavProp } from '@utils/types'
import React from 'react'
import { ScrollView, View } from 'react-native'
import { Header } from './BookAppointment/components/Header'
import FamilyMemberCard, { FamilyMember } from './FamilyMemberSelector/FamilyMemberCard'

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
    <View className='bg flex-1'>
      <PaddingTop />
      <Header title='Select Family Member' />

      <View className='flex-1'>
        <ScrollView className='flex-1' contentContainerClassName='px-5 py-3' showsVerticalScrollIndicator={false}>
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
            <View className='card flex-row items-center justify-center rounded-[18] border-2 border-dashed border-accent/40 bg-accent/5 p-3 py-5'>
              <View className='rounded-[10] bg-accent/10 p-2'>
                <PlusSignIcon size={20} color='#3b82f6' variant='stroke-rounded' />
              </View>
              <Medium className='ml-3 text-base text-accent'>Add New Member</Medium>
            </View>
          </Press>

          <View className='h-6' />
        </ScrollView>

        <View className='px-5 pb-2 pt-2'>
          {selectedMemberId ? (
            <Slider
              onComplete={() => {
                navigation.navigate('Complete')
              }}
            />
          ) : (
            <View className='pointer-events-none opacity-50'>
              <Slider onComplete={() => {}} />
            </View>
          )}
        </View>
      </View>

      <PaddingBottom />
    </View>
  )
}

export default FamilyMemberSelectorScreen
