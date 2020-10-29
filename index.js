/**
 * @format
 */

import {AppRegistry, NativeModules} from 'react-native';
import App from './App';
import {name as appName} from './app.json';

AppRegistry.registerComponent(appName, () => App);
const { RNTesseractOcr } = NativeModules;
global.TripSwitch = false;
global.title = "\t\tAll Purchases";


export default RNTesseractOcr;