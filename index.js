/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import LocalNotification from './Source/NotificationHandler/LocalNotification';
import { register } from "@videosdk.live/react-native-sdk";
// Register the service
register();
LocalNotification();
AppRegistry.registerComponent(appName, () => App);
