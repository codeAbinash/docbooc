import { Text, View } from 'react-native'
import { GestureHandlerRootView } from 'react-native-gesture-handler'

const Slide = () => {
  return (
    <GestureHandlerRootView>
      <View>
        <Text>Slide</Text>
      </View>
    </GestureHandlerRootView>
  )
}

export default Slide
