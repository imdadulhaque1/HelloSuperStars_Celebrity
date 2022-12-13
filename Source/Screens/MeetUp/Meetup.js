/* eslint-disable prettier/prettier */
import {useNavigation} from '@react-navigation/native';
import axios from 'axios';
import React, {useContext, useEffect, useState} from 'react';
import {Image, ScrollView, Text, TouchableOpacity, View} from 'react-native';

import LinearGradient from 'react-native-linear-gradient';
import CustomHeader from '../../Components/CustomHeader';
import {AuthContext} from '../../Constants/context';
import imagePath from '../../Constants/imagePath';
import MainNavigationString from '../../Constants/MainNavigationString';
import AppUrl from '../../RestApi/AppUrl';
import styles from '../Dashboard/StylesHome';

const Meetup = () => {
  const Navigation = useNavigation();

  const {axiosConfig} = useContext(AuthContext);
  const [allMeetup, setAllMeetup] = useState(null);
  const [refresh, setRefresh] = useState(0);
  useEffect(() => {
    axios
      .get(AppUrl.MeetUpCount, axiosConfig)
      .then(res => {
        if (res.status === 200) {
          console.log(res.data);
          setAllMeetup(res.data);
        }
      })
      .catch(err => {
        console.log(err.message);
      });
  }, [refresh]);

  return (
    <>
    <CustomHeader backFunc={()=>Navigation.goBack()} title='Meet up' />
      <ScrollView style={{backgroundColor: '#000', padding: 8}}>
        <View style={styles.container}>
          <View style={styles.superStarHome}>
            <TouchableOpacity
              style={styles.singleContent}
              onPress={() =>
                Navigation.navigate(MainNavigationString.REUSEAPPROVED, {
                  typeName: 'Dashboard',
                  module: 'Meet Up',
                  path: `${AppUrl.MeetUpList + 'all'}`,
                })
              }>
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
                <Text style={styles.buttonText}>Dashboard</Text>
              </LinearGradient>
              <Image source={imagePath.All} style={styles.postImage} />
              <Text style={styles.badge}>
                <Text style={styles.badgeT}>{allMeetup?.allEvents}</Text>
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.singleContent}
              onPress={() =>
                Navigation.navigate(MainNavigationString.REUSEAPPROVED, {
                  typeName: 'Approved',
                  module: 'Meet Up',
                  path: `${AppUrl.MeetUpList + 'approved'}`,
                })
              }>
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
                <Text style={styles.buttonText}>Approved</Text>
              </LinearGradient>
              <Image source={imagePath.Approved} style={styles.postImage} />
              <Text style={styles.badge}>
                <Text style={styles.badgeT}>{allMeetup?.approvedEvents}</Text>
              </Text>
            </TouchableOpacity>
          </View>

          <View style={styles.superStarHome}>
            <TouchableOpacity
              style={styles.singleContent}
              onPress={() =>
                Navigation.navigate(MainNavigationString.REUSEAPPROVED, {
                  typeName: 'Pending',
                  module: 'Meet Up',
                  path: `${AppUrl.MeetUpList + 'pending'}`,
                })
              }>
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
                <Text style={styles.buttonText}>Pending</Text>
              </LinearGradient>
              <Image source={imagePath.Pending} style={styles.postImage} />
              <Text style={styles.badge}>
                <Text style={styles.badgeT}>{allMeetup?.pendingEvents}</Text>
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.singleContent}
              onPress={() =>
                Navigation.navigate(MainNavigationString.REUSEAPPROVED, {
                  typeName: 'Rejected',
                  module: 'Meet Up',
                  path: `${AppUrl.MeetUpList + 'rejected'}`,
                })
              }>
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
                <Text style={styles.buttonText}>Rejected</Text>
              </LinearGradient>
              <Image source={imagePath.Rejected} style={styles.postImage} />
              <Text style={styles.badge}>
                <Text style={styles.badgeT}>{allMeetup?.rejectedEvents}</Text>
              </Text>
            </TouchableOpacity>
          </View>

          <View style={styles.superStarHome}>
            <TouchableOpacity
              style={styles.singleContent}
              onPress={() =>
                Navigation.navigate(MainNavigationString.REUSEAPPROVED, {
                  typeName: 'Completed',
                  module: 'Meet Up',
                  path: `${AppUrl.MeetUpList + 'completed'}`,
                })
              }>
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
                <Text style={styles.buttonText}>Completed</Text>
              </LinearGradient>
              <Image source={imagePath.Completed} style={styles.postImage} />
              <Text style={styles.badge}>
                <Text style={styles.badgeT}>{allMeetup?.completedEvents}</Text>
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.singleContent}
              onPress={() =>
                Navigation.navigate(MainNavigationString.MEETUPCREATEFORM, {
                  typeName: 'CreateMeetup',
                  setRefresh,
                })
              }>
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
                <Text style={styles.buttonText}>Create</Text>
              </LinearGradient>
              <Image source={imagePath.Post} style={styles.postImage} />
              {/* <Text style={styles.badge}>
                <Text style={styles.badgeT}>20</Text>
              </Text> */}
            </TouchableOpacity>
          </View>

          {/* <View style={styles.superStarHome}>
            <TouchableOpacity style={styles.singleContent}>
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
                <Text style={styles.buttonText}>Meet Offline</Text>
              </LinearGradient>
              <Image
                source={imagePath.MeetupOffline}
                style={styles.postImage}
              />
              <Text style={styles.badge}>
                <Text style={styles.badgeT}>20</Text>
              </Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.singleContent}>
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
                <Text style={styles.buttonText}>Meet Online</Text>
              </LinearGradient>
              <Image
                source={imagePath.UpcomingSession}
                style={styles.postImage}
              />
              <Text style={styles.badge}>
                <Text style={styles.badgeT}>20</Text>
              </Text>
            </TouchableOpacity>
          </View> */}
        </View>
      </ScrollView>
    </>
  );
};

export default Meetup;
