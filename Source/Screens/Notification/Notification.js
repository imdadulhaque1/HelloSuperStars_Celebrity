import {Image, ScrollView, Text, TouchableOpacity, View,SafeAreaView} from 'react-native';
import React, {useContext, useEffect, useState} from 'react';
import styles from './styles';
import ApprovedImg from '../../Assets/notification/approved.png';
import moment from 'moment';
import axios from 'axios';
import AppUrl from '../../RestApi/AppUrl';
import {AuthContext} from '../../Constants/context';
import NotificationComp from './NotificationComp';
import CustomHeader from '../../Components/CustomHeader';
export default function Notification({navigation}) {
  const data = '';
  const [notification, setNotification] = useState(null);
  const {axiosConfig, socketData} = useContext(AuthContext);
  useEffect(() => {
    axios.get(AppUrl.notification, axiosConfig).then(res => {
      console.log(res.data);
      if (res.data.status === 200) {
        setNotification(res.data);
      }
    });
  }, [socketData]);
  return (
    <SafeAreaView style={{flex:1,backgroundColor:'#000'}}>
    <CustomHeader backFunc={()=>navigation.goBack()} title='Notification' />
    <ScrollView style={{backgroundColor: '#000', paddingHorizontal: 5}}>
      <View style={{flex: 1, marginVertical: 10}}>
        {notification?.pendingMarketplace?.length > 0 &&
          notification?.pendingMarketplace.map(data => {
            return <NotificationComp data={data} type="Marketplace" />;
          })}
        {notification?.pendingLiveChat?.length > 0 &&
          notification?.pendingLiveChat.map(data => {
            return <NotificationComp data={data} type="Live Chat" />;
          })}
        {notification?.pendingLearningSessions?.length > 0 &&
          notification?.pendingLearningSessions.map(data => {
            return <NotificationComp data={data} type="Learning Session" />;
          })}
        {notification?.pendingQna?.length > 0 &&
          notification?.pendingQna.map(data => {
            return <NotificationComp data={data} type="Qna" />;
          })}
        {notification?.pendingMeetupEvent?.length > 0 &&
          notification?.pendingMeetupEvent.map(data => {
            return <NotificationComp data={data} type="Meetup" />;
          })}
        {notification?.pendingPost?.length > 0 &&
          notification?.pendingPost.map(data => {
            return <NotificationComp data={data} type="Post" />;
          })}
        {notification?.pendingGreeting?.length > 0 &&
          notification?.pendingGreeting.map(data => {
            return <NotificationComp data={data} type="Greeting" />;
          })}
        {notification?.pendingFanGroup?.length > 0 &&
          notification?.pendingFanGroup.map(data => {
            return <NotificationComp data={data} type="FanGroup" />;
          })}
        {notification?.pendingAuction?.length > 0 &&
          notification?.pendingAuction.map(data => {
            return <NotificationComp data={data} type="auction" />;
          })}
        {notification?.pendingSouvenir?.length > 0 &&
          notification?.pendingSouvenir.map(data => {
            return <NotificationComp data={data} type="souvenir" />;
          })}
      </View>
    </ScrollView>
   </SafeAreaView> 
  );
}
