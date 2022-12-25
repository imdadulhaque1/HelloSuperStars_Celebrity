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
import AppUrl from '../../RestApi/AppUrl';
import {AuthContext} from '../../Constants/context';
import axios from 'axios';
import CustomHeader from '../../Components/CustomHeader';

const Qna = () => {
  const Navigation = useNavigation();

  const {axiosConfig} = useContext(AuthContext);
  const [refresh, setRefresh] = useState(0);
  const [allQna, setALlQna] = useState(null);
  useEffect(() => {
    console.log('refresh-------------');
    axios
      .get(AppUrl.QnaAllCount, axiosConfig)
      .then(res => {
        if (res.status === 200) {
          console.log(res.data);
          setALlQna(res.data);
        }
      })
      .catch(err => {
        console.log(err.message);
      });
  }, [refresh]);

  return (
    <SafeAreaView style={{flex:1,backgroundColor:'#000'}}>
      <CustomHeader title={'QNA'} backFunc={() => Navigation.goBack()} />
      <ScrollView style={{backgroundColor: '#000', padding: 8, height: '100%'}}>
        <View style={styles.container}>
          <View style={styles.superStarHome}>
            <TouchableOpacity
              style={styles.singleContent}
              onPress={() =>
                Navigation.navigate(MainNavigationString.REUSEAPPROVED, {
                  typeName: 'Dashboard',
                  module: 'QNA',
                  path: `${AppUrl.QnaLive}`,
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
                <Text style={styles.badgeT}>{allQna?.all}</Text>
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.singleContent}
              onPress={() =>
                Navigation.navigate(MainNavigationString.REUSEAPPROVED, {
                  typeName: 'Approved',
                  module: 'QNA',
                  path: `${AppUrl.QnaLive}`,
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
                <Text style={styles.badgeT}>{allQna?.live}</Text>
              </Text>
            </TouchableOpacity>
          </View>

          <View style={styles.superStarHome}>
            <TouchableOpacity
              style={styles.singleContent}
              onPress={() =>
                Navigation.navigate(MainNavigationString.REUSEAPPROVED, {
                  typeName: 'QnaPending',
                  module: 'QNA',
                  path: `${AppUrl.QnaPanding}`,
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
                <Text style={styles.badgeT}>{allQna?.pending}</Text>
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.singleContent}
              onPress={() =>
                Navigation.navigate(MainNavigationString.REUSEAPPROVED, {
                  typeName: 'Completed',
                  module: 'QNA',
                  path: `${AppUrl.QnaCompleted}`,
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
                <Text style={styles.badgeT}>{allQna?.completed}</Text>
              </Text>
            </TouchableOpacity>
          </View>

          <View style={styles.superStarHome}>
            <TouchableOpacity
              style={styles.singleContent}
              onPress={() =>
                Navigation.navigate(MainNavigationString.QNACREATEFORM, {
                  typeName: 'QaCreate',
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
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Qna;
