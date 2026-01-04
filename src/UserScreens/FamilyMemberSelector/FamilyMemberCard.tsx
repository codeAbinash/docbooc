import { Medium, SemiBold } from '@utils/fonts'
import { View } from 'react-native'
import Press from '../../components/Press'

export type FamilyMember = {
  id: string
  name: string
  relationship: string
  age?: number
  gender?: 'Male' | 'Female' | 'Other'
}

type FamilyMemberCardProps = {
  member: FamilyMember
  isSelected: boolean
  onSelect: (member: FamilyMember) => void
  onNameClick?: () => void
  showSelector?: boolean
}

const FamilyMemberCard = ({
  member,
  isSelected,
  onSelect,
  onNameClick,
  showSelector = true,
}: FamilyMemberCardProps) => {
  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map((n) => n[0])
      .join('')
      .toUpperCase()
      .slice(0, 2)
  }

  return (
    <Press onPress={() => onSelect(member)} className='mb-3' activeScale={0.99}>
      <View
        className={`flex-row items-center rounded-3xl border bg-white p-4 dark:bg-zinc-900 ${
          isSelected ? 'border-accent' : 'border-neutral-300'
        }`}
        style={{ borderWidth: 1.5 }}
      >
        <View
          className={`text mr-3 h-16 w-16 items-center justify-center rounded-2xl ${
            isSelected ? 'bg-accent' : 'bg-gray/20'
          }`}
        >
          <SemiBold className={`text-base ${isSelected ? 'text-white' : 'text'}`}>{getInitials(member.name)}</SemiBold>
        </View>

        <View className='flex-1'>
          <SemiBold className={`mb-1 text-lg ${isSelected ? 'text-blue-700' : 'text'}`}>{member.relationship}</SemiBold>
          <Press onPress={onNameClick} disabled={!onNameClick}>
            <View>
              <Medium
                className={`text-sm font-semibold ${onNameClick ? 'text-accent' : isSelected ? 'text-blue-700' : 'text-black'}`}
              >
                {member.name}
              </Medium>
              {(member.age || member.gender) && !onNameClick && (
                <Medium className={`mt-1 text-xs font-semibold ${isSelected ? 'text-blue-700' : 'text-black'}`}>
                  {[member.age && `${member.age}y`, member.gender].filter(Boolean).join(' • ')}
                </Medium>
              )}
            </View>
          </Press>
        </View>

        {showSelector && (
          <View className='ml-3'>
            <View
              className={`h-6 w-6 items-center justify-center rounded-full border-2 ${
                isSelected ? 'border-accent bg-accent' : 'border-gray bg-transparent'
              }`}
            >
              {isSelected && <View className='h-2 w-2 rounded-full bg-white' />}
            </View>
          </View>
        )}
      </View>
    </Press>
  )
}

export default FamilyMemberCard
