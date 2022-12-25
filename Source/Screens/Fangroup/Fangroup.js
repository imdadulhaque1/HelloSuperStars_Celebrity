/* eslint-disable prettier/prettier */
import React, {useContext, useEffect, useState} from 'react';
import {useNavigation} from '@react-navigation/native';
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

const Fangroup = () => {
  const Navigation = useNavigation();

  const {axiosConfig} = useContext(AuthContext);
  const [fanGroupAll, setFanGroupAll] = useState(null);
  useEffect(() => {
    axios
      .get(AppUrl.fanGroup, axiosConfig)
      .then(res => {
        if (res.status === 200) {
          console.log(res.data);
          setFanGroupAll(res.data);
        }
      })
      .catch(err => {
        console.log(err.message);
      });
  }, []);

  return (
    <SafeAreaView style={{flex:1,backgroundColor:'#000'}}>
      <CustomHeader backFunc={() => Navigation.goBack()} title="Fan Group" />
      <ScrollView style={{backgroundColor: '#000', padding: 8, height: '100%'}}>
        <View style={styles.container}>
          <View style={styles.superStarHome}>
            <TouchableOpacity
              style={styles.singleContent}
              onPress={() =>
                Navigation.navigate(MainNavigationString.ALLDATAFANGROUP, {
                  data: fanGroupAll?.allFanGroup,
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
                <Text style={styles.buttonText}>All</Text>
              </LinearGradient>
              <Image source={imagePath.All} style={styles.postImage} />
              <Text style={styles.badge}>
                <Text style={styles.badgeT}>
                  {fanGroupAll?.allFanGroup?.length}
                </Text>
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.singleContent}
              onPress={() =>
                Navigation.navigate(MainNavigationString.ACCEPTED, {
                  data: fanGroupAll?.starLiveGroup,
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
                  {fanGroupAll?.starLiveGroup?.length}
                </Text>
              </Text>
            </TouchableOpacity>
          </View>

          <View style={styles.superStarHome}>
            <TouchableOpacity
              style={styles.singleContent}
              onPress={() =>
                Navigation.navigate(MainNavigationString.ALLDATAFANGROUP, {
                  data: fanGroupAll?.starActive,
                  type: 'invitation',
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
                <Text style={styles.buttonText}>Invitation</Text>
              </LinearGradient>
              <Image source={imagePath.Pending} style={styles.postImage} />
              <Text style={styles.badge}>
                <Text style={styles.badgeT}>
                  {fanGroupAll?.starActive?.length}
                </Text>
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.singleContent}
              onPress={() =>
                Navigation.navigate(MainNavigationString.ALLDATAFANGROUP, {
                  data: fanGroupAll?.starRejected,
                  type: 'rejected',
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
                <Text style={styles.badgeT}>
                  {fanGroupAll?.starRejected?.length}
                </Text>
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Fangroup;
