/* eslint-disable prettier/prettier */
import React, {useContext, useEffect, useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import {Image, ScrollView, Text, TouchableOpacity, View} from 'react-native';
import styles from '../Dashboard/StylesHome';
import LinearGradient from 'react-native-linear-gradient';
import imagePath from '../../Constants/imagePath';
import MainNavigationString from '../../Constants/MainNavigationString';
import AppUrl from '../../RestApi/AppUrl';
import {AuthContext} from '../../Constants/context';
import axios from 'axios';
import CustomHeader from '../../Components/CustomHeader';

const Souvenir = () => {
  const Navigation = useNavigation();

  const {axiosConfig} = useContext(AuthContext);
  const [souvenir, allSouvenir] = useState(null);
  useEffect(() => {
    axios
      .get(AppUrl.souvenir, axiosConfig)
      .then(res => {
        if (res.status === 200) {
          console.log(res.data);
          allSouvenir(res.data);
        }
      })
      .catch(err => {
        console.log(err.message);
      });
  }, []);

  return (
    <>
    <CustomHeader backFunc={()=>Navigation.goBack()} />
      <ScrollView style={{backgroundColor: '#000', padding: 8}}>
        <View style={styles.container}>
          <View style={styles.superStarHome}>
            <TouchableOpacity
              style={styles.singleContent}
              onPress={() =>
                Navigation.navigate(MainNavigationString.SOUVENIRDETAILS, {
                  typeName: 'Dashboard',
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
                <Text style={styles.buttonText}>Souvenir</Text>
              </LinearGradient>
              <Image source={imagePath.All} style={styles.postImage} />
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.singleContent}
              onPress={() =>
                Navigation.navigate(MainNavigationString.ORDERS, {
                  orders: souvenir?.registerSouvenir,
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
                <Text style={styles.buttonText}>Register User</Text>
              </LinearGradient>
              <Image source={imagePath.Approved} style={styles.postImage} />
              <Text style={styles.badge}>
                <Text style={styles.badgeT}>
                  {souvenir?.registerSouvenir?.length}
                </Text>
              </Text>
            </TouchableOpacity>
          </View>

          <View style={styles.superStarHome}>
            <TouchableOpacity
              style={styles.singleContent}
              onPress={() =>
                Navigation.navigate(MainNavigationString.ORDERS, {
                  orders: souvenir?.userPaymentSouvenir,
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
                <Text style={styles.buttonText}>User Order</Text>
              </LinearGradient>
              <Image source={imagePath.Pending} style={styles.postImage} />
              <Text style={styles.badge}>
                <Text style={styles.badgeT}>
                  {souvenir?.userPaymentSouvenir?.length}
                </Text>
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.singleContent}
              onPress={() =>
                Navigation.navigate(MainNavigationString.ORDERS, {
                  orders: souvenir?.userPaymentDueSouvenir,
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
                <Text style={styles.buttonText}>User Due</Text>
              </LinearGradient>
              <Image source={imagePath.Completed} style={styles.postImage} />
              <Text style={styles.badge}>
                <Text style={styles.badgeT}>
                  {souvenir?.userPaymentDueSouvenir?.length}
                </Text>
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </>
  );
};

export default Souvenir;
