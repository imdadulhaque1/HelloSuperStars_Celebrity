/* eslint-disable prettier/prettier */
import {useNavigation} from '@react-navigation/native';
import React, {useContext, useEffect, useState} from 'react';
import styles from '../Dashboard/StylesHome';
import {
  Image,
  SafeAreaView,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import imagePath from '../../Constants/imagePath';
import MainNavigationString from '../../Constants/MainNavigationString';
import {AuthContext} from '../../Constants/context';
import axios from 'axios';
import AppUrl from '../../RestApi/AppUrl';
import CustomHeader from '../../Components/CustomHeader';

const StarShowcase = () => {
  const Navigation = useNavigation();

  const {axiosConfig} = useContext(AuthContext);
  const [allShowCase, setALlShowcase] = useState(null);
  useEffect(() => {
    axios
      .get(AppUrl.starShowCaseCount, axiosConfig)
      .then(res => {
        if (res.status === 200) {
          console.log(res.data);
          setALlShowcase(res.data);
        }
      })
      .catch(err => {
        console.log(err.message);
      });
  }, []);

  return (
    <SafeAreaView>
      <CustomHeader
        title={'Star Showcase'}
        backFunc={() => Navigation.goBack()}
      />
      <ScrollView style={{backgroundColor: '#000', padding: 8, height: '100%'}}>
        <View style={styles.container}>
          <View style={styles.superStarHome}>
            <TouchableOpacity
              style={styles.singleContent}
              onPress={() => Navigation.navigate(MainNavigationString.AUCTION)}>
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
                <Text style={styles.buttonText}>Auction</Text>
              </LinearGradient>
              <Image source={imagePath.Auction} style={styles.postImage} />
              <Text style={styles.badge}>
                <Text style={styles.badgeT}>{allShowCase?.auction}</Text>
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.singleContent}
              onPress={() =>
                Navigation.navigate(MainNavigationString.MARKETPLACE)
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
                <Text style={styles.buttonText}>MarketPlace</Text>
              </LinearGradient>
              <Image source={imagePath.MarketPlace} style={styles.postImage} />
              <Text style={styles.badge}>
                <Text style={styles.badgeT}>{allShowCase?.marketplace}</Text>
              </Text>
            </TouchableOpacity>
          </View>

          <View style={styles.superStarHome}>
            <TouchableOpacity
              style={styles.singleContent}
              onPress={() =>
                Navigation.navigate(MainNavigationString.SOUVENIR)
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
                <Text style={styles.buttonText}>souvenir</Text>
              </LinearGradient>
              <Image source={imagePath.Pending} style={styles.postImage} />
              <Text style={styles.badge}>
                <Text style={styles.badgeT}>{allShowCase?.souvenirCreate}</Text>
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default StarShowcase;
