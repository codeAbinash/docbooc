import { SemiBold } from '@utils/fonts'

export default function Label({ children }: { children: React.ReactNode }) {
  return <SemiBold className='text text-sm'>{children}</SemiBold>
}
