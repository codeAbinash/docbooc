import PlusSignIcon from '@assets/icons/hugeicons/PlusSignIcon'
import { Medium } from '@utils/fonts'
import { View } from 'react-native'
import { ScrollView } from 'react-native-gesture-handler'
import Press from '../../components/Press'
import Slider from '../../components/Slider/Slider'
import FamilyMemberCard, { FamilyMember } from './FamilyMemberCard'

type FamilyMemberSelectorProps = {
  members: FamilyMember[]
  selectedMemberId?: string | null
  onMemberSelect: (member: FamilyMember) => void
  onAddMember: () => void
  onComplete: () => void
  showAddButton?: boolean
}

const FamilyMemberSelector = ({
  members,
  selectedMemberId,
  onMemberSelect,
  onAddMember,
  onComplete,
  showAddButton = true,
}: FamilyMemberSelectorProps) => {
  return (
    <View className='flex-1'>
      <ScrollView className='flex-1' contentContainerClassName='px-5 py-3' showsVerticalScrollIndicator={false}>
        {/* Family Members List */}
        {members.map((member) => (
          <FamilyMemberCard
            key={member.id}
            member={member}
            isSelected={selectedMemberId === member.id}
            onSelect={onMemberSelect}
          />
        ))}

        {/* Add New Member Button */}
        {showAddButton && (
          <Press onPress={onAddMember} activeScale={0.98} className='mb-4'>
            <View className='card flex-row items-center justify-center rounded-[18] border-2 border-dashed border-accent/40 bg-accent/5 p-3 py-5'>
              <View className='rounded-[10] bg-accent/10 p-2'>
                <PlusSignIcon size={20} color='#3b82f6' variant='stroke-rounded' />
              </View>
              <Medium className='ml-3 text-base text-accent'>Add New Member</Medium>
            </View>
          </Press>
        )}

        <View className='h-6' />
      </ScrollView>

      <View className='px-5 pb-2 pt-2'>
        {selectedMemberId ? (
          <Slider onComplete={onComplete} />
        ) : (
          <View className='pointer-events-none opacity-50'>
            <Slider onComplete={() => {}} />
          </View>
        )}
      </View>
    </View>
  )
}

export default FamilyMemberSelector
