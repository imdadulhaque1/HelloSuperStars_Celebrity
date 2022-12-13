import {View, Text} from 'react-native';
import React, {useContext, useEffect} from 'react';
import {AuthContext} from '../Constants/context';
import PushNotification from 'react-native-push-notification';
import AppUrl from '../RestApi/AppUrl';

const NotificationRender = () => {
  console.log('notification render');
  const {socketData, updateNotification} = useContext(AuthContext);
  useEffect(() => {
    socketData.on('star_approve_post', result => {
      console.log('recive data', result);
      return handleNotification(result, 'Simple Post');
    });

    socketData.on('star_chat_approve', result => {
      return handleNotification(result, 'Live Chat');
    });
    socketData.on('star_qna_approve', result => {
      return handleNotification(result, 'Qna ');
    });
    socketData.on('star_meetup_approve', result => {
      return handleNotification(result, 'Meetup');
    });
    socketData.on('star_greetings_approve', result => {
      return handleNotification(result, 'Greeting');
    });
    socketData.on('star_learning_session_approve', result => {
      return handleNotification(result, 'Learning Session');
    });
    socketData.on('star_marketplace_approve', result => {
      return handleNotification(result, 'Marketplace');
    });
    socketData.on('star_souvenir_approve', result => {
      return handleNotification(result, 'Souvenir');
    });
    socketData.on('star_auction_approve', result => {
      return handleNotification(result, 'Auction');
    });
    socketData.on('star_fanGroup_approve', result => {
      return handleNotification(result, 'Fan Group');
    });
  }, [socketData]);
  const handleNotification = (data, type) => {
    console.log(data);
    PushNotification.localNotification({
      channelId: 'test-channel',
      title: data[0].title,
      message: `Please Approve `,
      bigText: `Request from admin to approve for ${type}`,
      color: 'red',
      bigPictureUrl: AppUrl.MediaBaseUrl + data[0].banner,
      playSound: true,
      id: data[0].id,
      vibrate: true,
      vibration: 1000,
    });
    updateNotification();
  };
  // const handleApprovePostNotification = data => {
  //   console.log(data);
  //   PushNotification.localNotification({
  //     channelId: 'test-channel',
  //     title: 'Simple Post',
  //     message: `Please Approve `,
  //     bigText: 'Request from admin to approve simple',
  //     color: 'red',
  //     playSound: true,
  //     id: data.id,
  //     vibrate: true,
  //     vibration: 1000,
  //   });
  // };
  // const handleQna = data => {
  //   console.log(data);
  //   PushNotification.localNotification({
  //     channelId: 'test-channel',
  //     title: data[0].title,
  //     message: `Please Approve `,
  //     bigText: 'Request from admin to approve qna',
  //     color: 'red',
  //     playSound: true,
  //     id: data[0].id,
  //     vibrate: true,
  //     bigPictureUrl: AppUrl.MediaBaseUrl + data[0].banner,
  //     vibration: 1000,
  //   });
  // };
  // const handleMeetup = data => {
  //   console.log('meetup', data);
  //   PushNotification.localNotification({
  //     channelId: 'test-channel',
  //     title: data[0].title,
  //     message: `Please Approve `,
  //     bigText: 'Request from admin to approve Meetup',
  //     color: 'red',
  //     playSound: true,
  //     id: data[0].id,
  //     vibrate: true,
  //     bigPictureUrl: AppUrl.MediaBaseUrl + data[0].banner,
  //     vibration: 1000,
  //   });
  // };
  // const handleGreetings = data => {
  //   console.log('meetup', data);
  //   PushNotification.localNotification({
  //     channelId: 'test-channel',
  //     title: data[0].title,
  //     message: `Please Approve `,
  //     bigText: 'Request from admin to approve Greetings',
  //     color: 'red',
  //     playSound: true,
  //     id: data[0].id,
  //     vibrate: true,
  //     bigPictureUrl: AppUrl.MediaBaseUrl + data[0].banner,
  //     vibration: 1000,
  //   });
  // };
  // const handleLearningSession = data => {
  //   console.log('meetup', data);
  //   PushNotification.localNotification({
  //     channelId: 'test-channel',
  //     title: data[0].title,
  //     message: `Please Approve `,
  //     bigText: 'Request from admin to approve Greetings',
  //     color: 'red',
  //     playSound: true,
  //     id: data[0].id,
  //     vibrate: true,
  //     bigPictureUrl: AppUrl.MediaBaseUrl + data[0].banner,
  //     vibration: 1000,
  //   });
  // };
  return <></>;
};

export default NotificationRender;
