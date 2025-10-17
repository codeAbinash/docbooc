import { PRIVACY_POLICY_URL, TERMS_OF_SERVICE_URL } from '@/constants'
import { SemiBold } from '@utils/fonts'
import { Linking, View } from 'react-native'

/**
 * Renders the Terms of Service and Privacy Policy agreement text.
 * Displays a message indicating that the user agrees to the terms by continuing.
 */
export function TC_and_PP() {
  function handlePressTerms() {
    Linking.openURL(TERMS_OF_SERVICE_URL)
  }

  function handlePressPrivacy() {
    Linking.openURL(PRIVACY_POLICY_URL)
  }

  return (
    <View>
      <SemiBold className='text text-center text-xs'>
        By continuing, you agree to our{' '}
        <SemiBold className='text-accent' onPress={handlePressTerms}>
          Terms of Service
        </SemiBold>{' '}
        and{' '}
        <SemiBold className='text-accent' onPress={handlePressPrivacy}>
          Privacy Policy
        </SemiBold>
        .
      </SemiBold>
    </View>
  )
}
