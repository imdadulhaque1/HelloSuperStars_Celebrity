import {
  ScrollView,
  SafeAreaView,
  Switch,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  useWindowDimensions,
} from 'react-native';
import React, {useContext, useEffect, useState} from 'react';

import Icon from 'react-native-vector-icons/FontAwesome';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import CustomHeader from '../../Components/CustomHeader';
import TitleHeader from '../../Components/TitleHeader';
import MainNavigationString from '../../Constants/MainNavigationString';
import axios from 'axios';
import AppUrl from '../../RestApi/AppUrl';
import {AuthContext} from '../../Constants/context';
import RenderHTML from 'react-native-render-html';

const Setting = ({navigation, route}) => {
  const [isEnabled, setIsEnabled] = useState(false);
  const [isUpdated, setIsUpdated] = useState(false);
  const {setRefresh} = route.params;
  const toggleSwitch = () => setIsEnabled(previousState => !previousState);

  const [userInfo, setUserInfo] = useState(null);
  const {axiosConfig} = useContext(AuthContext);
  const {width} = useWindowDimensions();

  useEffect(() => {
    axios.get(AppUrl.getUserInfo, axiosConfig).then(res => {
      setUserInfo(res.data.star_details);
      setRefresh(previous => (previous ? false : true));
    });
  }, [isUpdated]);

  return (
    <SafeAreaView>
      <CustomHeader title={'Settings'} backFunc={() => navigation.goBack()} />
      <ScrollView style={{backgroundColor: 'black', height: '100%'}}>
        <View style={styles.container}>
          <TitleHeader title={'Terms & Conditions'} />

          <View
            style={{
              backgroundColor: '#232323',
              justifyContent: 'center',
              alignContent: 'center',
              padding: 8,
              paddingLeft: 10,
              borderRadius: 10,
              marginVertical: 10,
            }}>
            <RenderHTML
              contentWidth={width}
              source={{
                html: `<div style='color:#fff'>${userInfo?.terms_and_condition}</div>`,
              }}
            />
          </View>

          <TitleHeader title={'Update Profile'} />
          <View style={styles.ContainerCard2}>
            <TouchableOpacity
              onPress={() =>
                navigation.navigate(MainNavigationString.PERSONALINFO, {
                  userInfo: userInfo,
                })
              }>
              <View style={styles.ContentX}>
                <View>
                  <Text style={styles.Edit}>Personal Information</Text>
                </View>
                <View>
                  <Text>
                    <Icon name="angle-right" size={20} color="white" />
                  </Text>
                </View>
              </View>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() =>
                navigation.navigate(MainNavigationString.EDITNAME, {
                  userInfo: userInfo,
                  setIsUpdated,
                })
              }>
              <View style={styles.ContentX}>
                <View>
                  <Text style={styles.Edit}>Update Name</Text>
                </View>
                <View>
                  <Text>
                    <Icon name="angle-right" size={20} color="white" />
                  </Text>
                </View>
              </View>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() =>
                navigation.navigate(MainNavigationString.EDITPASSWORD)
              }>
              <View style={styles.ContentX}>
                <View>
                  <Text style={styles.Edit}>Update Password</Text>
                </View>
                <View>
                  <Text>
                    <Icon name="angle-right" size={20} color="white" />
                  </Text>
                </View>
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Setting;

const styles = StyleSheet.create({
  container: {
    padding: 8,
    backgroundColor: '#000',
  },

  ContainerCard: {
    backgroundColor: '#232323',
    marginBottom: 3,
    justifyContent: 'center',
    alignContent: 'center',
    borderTopLeftRadius: 10,
    borderTopEndRadius: 10,
    padding: 8,
    paddingLeft: 10,
  },

  TextHeder: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 19,
  },

  ContainerCard2: {
    backgroundColor: '#232323',
    justifyContent: 'center',
    alignContent: 'center',
    padding: 8,
    paddingLeft: 10,
    borderRadius: 10,
    marginVertical: 10,
  },

  ContainerCard3: {
    backgroundColor: '#232323',
    marginBottom: 20,
    justifyContent: 'center',
    alignContent: 'center',
    borderBottomLeftRadius: 10,
    borderBottomEndRadius: 10,
    padding: 8,
    paddingLeft: 10,
  },

  Content: {
    borderBottomColor: 'gray',
    borderBottomWidth: 0.5,
  },
  Text: {
    color: 'white',
    fontSize: 15,
    fontWeight: 'bold',
    paddingBottom: 8,
    color: '#ffaa00',
  },

  ContentX: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomColor: 'gray',
    borderBottomWidth: 0.5,
    marginHorizontal: 10,
  },
  Edit: {
    color: 'white',
    fontSize: 13,
  },
});
