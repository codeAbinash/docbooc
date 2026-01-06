import ArrowRight01Icon from '@hugeicons/ArrowRightDoubleIcon'
import { api } from '@utils/client'
import { Medium, SemiBold } from '@utils/fonts'
import { InferApiResponse } from '@utils/types'
import { View } from 'react-native'
import Press from '../../components/Press'

export type Member = NonNullable<InferApiResponse<typeof api.users.members.$get>['data']>[number]
type FamilyMemberCardProps = {
  member: Member
  isSelected: boolean
  onSelect: (member: Member) => void
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
          <SemiBold className={`text-base ${isSelected ? 'text-white' : 'text'}`}>
            {getInitials(member.name || '')}
          </SemiBold>
        </View>

        <View className='flex-1'>
          <SemiBold className={`mb-1 text-lg ${isSelected ? 'text-blue-700' : 'text'}`}>
            {member.relation || member.name}
          </SemiBold>
          <Press onPress={onNameClick} disabled={!onNameClick}>
            <View className='flex-row items-center gap-2'>
              <View className='flex-1'>
                {!member.relation ? (
                  <Medium
                    className={`text-sm font-semibold ${onNameClick ? 'text-accent' : isSelected ? 'text-blue-700' : 'text-black'}`}
                  ></Medium>
                ) : null}
                {(member.dob !== undefined || member.gender) && !onNameClick && (
                  <Medium className={`mt-1 text-xs font-semibold ${isSelected ? 'text-blue-700' : 'text-black'}`}>
                    {[member.dob !== undefined ? `${member.dob}y` : undefined, member.gender]
                      .filter(Boolean)
                      .join(' • ')}
                  </Medium>
                )}
              </View>
              {onNameClick && <ArrowRight01Icon size={18} color='#3b82f6' variant='stroke-standard' />}
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
