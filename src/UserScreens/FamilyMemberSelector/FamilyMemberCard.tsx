import ArrowRight01Icon from '@hugeicons/ArrowRightDoubleIcon'
import { api } from '@utils/client'
import { Medium, SemiBold } from '@utils/fonts'
import { InferApiResponse } from '@utils/types'
import { View } from 'react-native'
import Press from '../../components/Press'

const capitalize = (s?: string | null) => (s ? s.charAt(0).toUpperCase() + s.slice(1) : undefined)

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

export type Member = NonNullable<InferApiResponse<typeof api.users.members.$get>['data']>[number]
type FamilyMemberCardProps = {
  member: Member
  isSelected: boolean
  onSelect: (member: Member) => void
  onNameClick?: () => void
  needSetup?: boolean
}

const FamilyMemberCard = ({ member, isSelected, onSelect, onNameClick, needSetup = false }: FamilyMemberCardProps) => {
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
          <SemiBold className={`text-xl ${isSelected ? 'text-white' : 'text'}`}>
            {needSetup ? 'Hi' : getInitials(member.name ?? '')}
          </SemiBold>
        </View>

        <View className='flex-1'>
          <SemiBold className={`text-lg ${isSelected ? 'text-blue-700' : 'text'}`}>
            {needSetup ? 'Myself' : member.relation}
          </SemiBold>
          {needSetup ? (
            <Press onPress={onNameClick} disabled={!onNameClick}>
              <View className='flex-row items-center gap-2'>
                <Medium className='text-sm text-gray-500'>Setup your profile to continue</Medium>
                <ArrowRight01Icon size={16} color='#6b7280' variant='stroke-standard' />
              </View>
            </Press>
          ) : (
            <View>
              <Press onPress={onNameClick} disabled={!onNameClick}>
                <View className='flex-row items-center'>
                  <View className='flex-1'>
                    <Medium className={`text-sm ${onNameClick ? 'text-gray-500' : 'text-gray-500'}`}>
                      {[
                        member.name,
                        calcAge(member.dob) !== undefined ? `${calcAge(member.dob)}y` : undefined,
                        capitalize(member.gender),
                      ]
                        .filter(Boolean)
                        .join(' • ')}
                    </Medium>
                  </View>
                  {onNameClick && <ArrowRight01Icon size={18} color='#3b82f6' variant='stroke-standard' />}
                </View>
              </Press>
            </View>
          )}
        </View>

        {isSelected && (
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
