import PushNotification from 'react-native-push-notification';

export default LocalNotification = () => {
  return PushNotification.configure({
    onNotification: function (notification) {
      console.log('NOTIFICATION:', notification);
    },
    requestPermissions: Platform.OS === 'ios',
  });
};
