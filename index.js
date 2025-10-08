/**
 * @format
 */

import { AppRegistry, Text, TextInput } from 'react-native'
import { name as appName } from './app.json'
import HPApp from './HPApp'

Text.defaultProps = Text.defaultProps || {}
Text.defaultProps.allowFontScaling = true
TextInput.defaultProps = TextInput.defaultProps || {}
TextInput.defaultProps.allowFontScaling = false

AppRegistry.registerComponent(appName, () => HPApp)
