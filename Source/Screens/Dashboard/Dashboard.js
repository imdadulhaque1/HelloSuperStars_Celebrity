/* eslint-disable prettier/prettier */

import React, {useContext, useEffect, useState} from 'react';
import {
  Button,
  Image,
  SafeAreaView,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

import styles from './styles';
import LinearGradient from 'react-native-linear-gradient';
import imagePath from '../../Constants/imagePath';
import {useNavigation} from '@react-navigation/native';
import MainNavigationString from '../../Constants/MainNavigationString';
import {AuthContext} from '../../Constants/context';
import axios from 'axios';
import AppUrl from '../../RestApi/AppUrl';
import PushNotification from 'react-native-push-notification';
import NotificationRender from '../../NotificationHandler/NotificationRender';
import CustomHeader from '../../Components/CustomHeader';

function Dashboard() {
  const Navigation = useNavigation();
  const {axiosConfig, socketData, allEvent, dashboardCount} =
    useContext(AuthContext);
  console.log('allEvent-----------', allEvent);

  useEffect(() => {
    dashboardCount();
  }, []);

  const handleNotification = () => {
    PushNotification.localNotification({
      channelId: 'test-channel',
      title: 'you click',
      message: 'abc msg',
    });
  };

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: '#000'}}>
      <CustomHeader title={'Dashboard'} />
      <ScrollView style={styles.container}>
        <View style={{margin: 10}}>
          {/* <Button title='Prebuild sdk (Test)' color={'coral'} onPress={()=>Navigation.navigate('VideoSdk')} /> */}
        </View>

        <NotificationRender />

        <View style={styles.ContainerCard}>
          <View style={styles.Main}>
            <View style={{flex: 1}}>
              <TouchableOpacity
                style={styles.Card}
                onPress={() => {
                  Navigation.navigate(MainNavigationString.POST);
                  // handleNotification();
                }}>
                <Image source={imagePath.Post} style={styles.postImage} />
                {allEvent?.post > 0 && (
                  <Text style={styles.badge}>
                    <Text>{allEvent?.post}</Text>
                  </Text>
                )}

                <LinearGradient
                  start={{x: 0, y: 0}}
                  end={{x: 1, y: 0}}
                  colors={[
                    '#FFAD00',
                    '#FFD273',
                    '#E19A04',
                    '#FACF75',
                    '#E7A725',
                    '#FFAD00',
                  ]}
                  style={styles.linearGradient}>
                  <Text style={styles.buttonText}>Post</Text>
                </LinearGradient>
              </TouchableOpacity>
            </View>

            <View style={{flex: 1}}>
              <TouchableOpacity
                onPress={() =>
                  Navigation.navigate(MainNavigationString.LIVECHAT)
                }
                style={styles.Card}>
                <Image source={imagePath.LiveChat} style={styles.postImage} />
                {allEvent?.liveChat > 0 && (
                  <Text style={styles.badge}>
                    <Text style={styles.badgeT}>{allEvent?.liveChat}</Text>
                  </Text>
                )}

                <LinearGradient
                  start={{x: 0, y: 0}}
                  end={{x: 1, y: 0}}
                  colors={[
                    '#FFAD00',
                    '#FFD273',
                    '#E19A04',
                    '#FACF75',
                    '#E7A725',
                    '#FFAD00',
                  ]}
                  style={styles.linearGradient}>
                  <Text style={styles.buttonText}>Live Chat</Text>
                </LinearGradient>
              </TouchableOpacity>
            </View>
          </View>

          <View style={styles.Main}>
            <View style={{flex: 1}}>
              <TouchableOpacity
                style={styles.Card}
                onPress={() =>
                  Navigation.navigate(MainNavigationString.AUDITION)
                }>
                <Image source={imagePath.Auditions} style={styles.postImage} />

                {allEvent?.allAuditions > 0 && (
                  <Text style={styles.badge}>{allEvent?.allAuditions}</Text>
                )}

                <LinearGradient
                  start={{x: 0, y: 0}}
                  end={{x: 1, y: 0}}
                  colors={[
                    '#FFAD00',
                    '#FFD273',
                    '#E19A04',
                    '#FACF75',
                    '#E7A725',
                    '#FFAD00',
                  ]}
                  style={styles.linearGradient}>
                  <Text style={styles.buttonText}>Auditions</Text>
                </LinearGradient>
              </TouchableOpacity>
            </View>

            <View style={{flex: 1}}>
              <TouchableOpacity
                style={styles.Card}
                onPress={() =>
                  Navigation.navigate(MainNavigationString.STARSHOWCASE)
                }>
                <Image
                  source={imagePath.StarShowcase}
                  style={styles.postImage}
                />
                {allEvent?.totalShowCase > 0 && (
                  <Text style={styles.badge}>
                    <Text>{allEvent?.totalShowCase}</Text>
                  </Text>
                )}

                <LinearGradient
                  start={{x: 0, y: 0}}
                  end={{x: 1, y: 0}}
                  colors={[
                    '#FFAD00',
                    '#FFD273',
                    '#E19A04',
                    '#FACF75',
                    '#E7A725',
                    '#FFAD00',
                  ]}
                  style={styles.linearGradient}>
                  <Text style={styles.buttonText}>Star Showcase</Text>
                </LinearGradient>
              </TouchableOpacity>
            </View>
          </View>

          <View style={styles.Main}>
            <View style={{flex: 1}}>
              <TouchableOpacity
                onPress={() =>
                  Navigation.navigate(MainNavigationString.LEARNING)
                }
                style={styles.Card}>
                <Image source={imagePath.Learning} style={styles.postImage} />
                {allEvent?.learningSession > 0 && (
                  <Text style={styles.badge}>
                    <Text>{allEvent?.learningSession}</Text>
                  </Text>
                )}

                <LinearGradient
                  start={{x: 0, y: 0}}
                  end={{x: 1, y: 0}}
                  colors={[
                    '#FFAD00',
                    '#FFD273',
                    '#E19A04',
                    '#FACF75',
                    '#E7A725',
                    '#FFAD00',
                  ]}
                  style={styles.linearGradient}>
                  <Text style={styles.buttonText}>Learning</Text>
                </LinearGradient>
              </TouchableOpacity>
            </View>

            <View style={{flex: 1}}>
              <TouchableOpacity
                style={styles.Card}
                onPress={() => Navigation.navigate(MainNavigationString.LIVE)}>
                <Image source={imagePath.Live} style={styles.postImage} />
                <Text style={styles.badge}>
                  <Text>20</Text>
                </Text>
                <LinearGradient
                  start={{x: 0, y: 0}}
                  end={{x: 1, y: 0}}
                  colors={[
                    '#FFAD00',
                    '#FFD273',
                    '#E19A04',
                    '#FACF75',
                    '#E7A725',
                    '#FFAD00',
                  ]}
                  style={styles.linearGradient}>
                  <Text style={styles.buttonText}>Live</Text>
                </LinearGradient>
              </TouchableOpacity>
            </View>
          </View>

          <View style={styles.Main}>
            <View style={{flex: 1}}>
              <TouchableOpacity
                style={styles.Card}
                onPress={() =>
                  Navigation.navigate(MainNavigationString.MEETUP)
                }>
                <Image source={imagePath.Meetup} style={styles.postImage} />
                {allEvent?.meetupEvent > 0 && (
                  <Text style={styles.badge}>
                    <Text>{allEvent?.meetupEvent}</Text>
                  </Text>
                )}

                <LinearGradient
                  start={{x: 0, y: 0}}
                  end={{x: 1, y: 0}}
                  colors={[
                    '#FFAD00',
                    '#FFD273',
                    '#E19A04',
                    '#FACF75',
                    '#E7A725',
                    '#FFAD00',
                  ]}
                  style={styles.linearGradient}>
                  <Text style={styles.buttonText}>Meetup</Text>
                </LinearGradient>
              </TouchableOpacity>
            </View>

            <View style={{flex: 1}}>
              <TouchableOpacity
                style={styles.Card}
                onPress={() =>
                  Navigation.navigate(MainNavigationString.GREETINGS)
                }>
                <Image source={imagePath.Greeting} style={styles.postImage} />
                {allEvent?.greeting > 0 && (
                  <Text style={styles.badge}>
                    <Text>{allEvent?.greeting}</Text>
                  </Text>
                )}

                <LinearGradient
                  start={{x: 0, y: 0}}
                  end={{x: 1, y: 0}}
                  colors={[
                    '#FFAD00',
                    '#FFD273',
                    '#E19A04',
                    '#FACF75',
                    '#E7A725',
                    '#FFAD00',
                  ]}
                  style={styles.linearGradient}>
                  <Text style={styles.buttonText}>Greeting</Text>
                </LinearGradient>
              </TouchableOpacity>
            </View>
          </View>

          <View style={styles.Main}>
            <View style={{flex: 1}}>
              <TouchableOpacity
                style={styles.Card}
                onPress={() => Navigation.navigate(MainNavigationString.QNA)}>
                <Image source={imagePath.QnA} style={styles.postImage} />
                {allEvent?.qna > 0 && (
                  <Text style={styles.badge}>
                    <Text>{allEvent?.qna}</Text>
                  </Text>
                )}

                <LinearGradient
                  start={{x: 0, y: 0}}
                  end={{x: 1, y: 0}}
                  colors={[
                    '#FFAD00',
                    '#FFD273',
                    '#E19A04',
                    '#FACF75',
                    '#E7A725',
                    '#FFAD00',
                  ]}
                  style={styles.linearGradient}>
                  <Text style={styles.buttonText}>Q&A</Text>
                </LinearGradient>
              </TouchableOpacity>
            </View>

            <View style={{flex: 1}}>
              <TouchableOpacity
                style={styles.Card}
                onPress={() =>
                  Navigation.navigate(MainNavigationString.FANGROUP)
                }>
                <Image source={imagePath.FanGroup} style={styles.postImage} />
                {allEvent?.fanGroup > 0 && (
                  <Text style={styles.badge}>
                    <Text>{allEvent?.fanGroup}</Text>
                  </Text>
                )}

                <LinearGradient
                  start={{x: 0, y: 0}}
                  end={{x: 1, y: 0}}
                  colors={[
                    '#FFAD00',
                    '#FFD273',
                    '#E19A04',
                    '#FACF75',
                    '#E7A725',
                    '#FFAD00',
                  ]}
                  style={styles.linearGradient}>
                  <Text style={styles.buttonText}>Fan Group</Text>
                </LinearGradient>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

export default Dashboard;
