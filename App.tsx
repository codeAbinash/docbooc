/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import { NewAppScreen } from '@react-native/new-app-screen'
import { StatusBar, StyleSheet, useColorScheme, View, Text } from 'react-native'

function App() {
  return (
    <View style={styles.container}>
      <Text>Welcome to the React Native App!</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
})

export default App
