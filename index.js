/**
 * @format
 */

import { AppRegistry, Text, TextInput } from 'react-native'
import { name as appName } from './app.json'
// import HPApp from './HPApp'
// import App from './App'
import AdminApp from './AdminApp'

Text.defaultProps = Text.defaultProps || {}
Text.defaultProps.allowFontScaling = true
TextInput.defaultProps = TextInput.defaultProps || {}
TextInput.defaultProps.allowFontScaling = true

// AppRegistry.registerComponent(appName, () => HPApp)
// AppRegistry.registerComponent(appName, () => App)
AppRegistry.registerComponent(appName, () => AdminApp)
