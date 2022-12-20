/* eslint-disable prettier/prettier */
import {useNavigation} from '@react-navigation/native';
import React, {useContext, useEffect, useState} from 'react';
import {
  Image,
  SafeAreaView,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

import styles from '../Dashboard/StylesHome';
import LinearGradient from 'react-native-linear-gradient';
import imagePath from '../../Constants/imagePath';
import MainNavigationString from '../../Constants/MainNavigationString';
import {AuthContext} from '../../Constants/context';
import axios from 'axios';
import AppUrl from '../../RestApi/AppUrl';
import CustomHeader from '../../Components/CustomHeader';
const Audition = () => {
  const Navigation = useNavigation();

  const {axiosConfig} = useContext(AuthContext);
  const [audition, setAudition] = useState(null);
  useEffect(() => {
    axios
      .get(AppUrl.audition, axiosConfig)
      .then(res => {
        if (res.status === 200) {
          console.log(res.data);
          setAudition(res.data);
        }
      })
      .catch(err => {
        console.log(err.message);
      });
  }, []);

  return (
    <SafeAreaView>
      <CustomHeader title={'Auditions'} backFunc={() => Navigation.goBack()} />
      <ScrollView style={{backgroundColor: '#000', padding: 8, height: '100%'}}>
        <View style={styles.container}>
          <View style={styles.superStarHome}>
            <TouchableOpacity
              style={styles.singleContent}
              onPress={() =>
                Navigation.navigate(MainNavigationString.AUDITIONCARD, {
                  posts: audition?.allAuditions,
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
                <Text style={styles.badgeT}>
                  {audition?.allAuditions?.length}
                </Text>
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.singleContent}
              onPress={() =>
                Navigation.navigate(MainNavigationString.AUDITIONCARD, {
                  posts: audition?.liveAuditions,
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
                <Text style={styles.buttonText}>Live Events</Text>
              </LinearGradient>
              <Image source={imagePath.LiveC} style={styles.postImage} />
              <Text style={styles.badge}>
                <Text style={styles.badgeT}>
                  {audition?.liveAuditions?.length}
                </Text>
              </Text>
            </TouchableOpacity>
          </View>

          <View style={styles.superStarHome}>
            <TouchableOpacity
              style={styles.singleContent}
              onPress={() =>
                Navigation.navigate(MainNavigationString.AUDITIONCARD, {
                  posts: audition?.allAuditions,
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
                <Text style={styles.badgeT}>
                  {audition?.allAuditions?.length}
                </Text>
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.singleContent}
              onPress={() =>
                Navigation.navigate(MainNavigationString.AUDITIONCARD, {
                  posts: audition?.pendingAuditions,
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
                <Text style={styles.badgeT}>
                  {audition?.pendingAuditions?.length}
                </Text>
              </Text>
            </TouchableOpacity>
          </View>

          <View style={styles.superStarHome}>
            <TouchableOpacity
              style={styles.singleContent}
              onPress={() =>
                Navigation.navigate(MainNavigationString.AUDITIONALL, {
                  typeName: 'AuditionCreate',
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
                <Text style={styles.buttonText}>Promotional Video</Text>
              </LinearGradient>
              <Image source={imagePath.Live} style={styles.postImage} />
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Audition;
