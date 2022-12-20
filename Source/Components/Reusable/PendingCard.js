/* eslint-disable prettier/prettier */
//import liraries
import React, {useContext} from 'react';
import DateTimePicker from '@react-native-community/datetimepicker';
import {useState} from 'react';
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  useWindowDimensions,
  View,
} from 'react-native';
import Toast from 'react-native-root-toast';
import DatePicker from 'react-native-date-picker';
import {TextInput} from 'react-native-gesture-handler';
import VideoPlayer from 'react-native-video-player';
import imagePath from '../../Constants/imagePath';
import {useNavigation} from '@react-navigation/native';
import MainNavigationString from '../../Constants/MainNavigationString';
import Icon from 'react-native-vector-icons/MaterialIcons';
import moment from 'moment';
import RenderHTML from 'react-native-render-html';
import AppUrl from '../../RestApi/AppUrl';
import axios from 'axios';
import {AuthContext} from '../../Constants/context';
// create a component
const PendingCard = ({route}) => {
  const [date, setDate] = useState(new Date());
  const [open, setOpen] = useState(false);
  const [time, setTime] = useState(new Date(Date.now()));
  const [timePicker, setTimePicker] = useState(false);
  const {typeName, singlePost} = route.params;
  console.log('peding singlePost', singlePost);
  console.log('peding typeName', typeName); //PendingPost
  const navigation = useNavigation();
  const {axiosConfig} = useContext(AuthContext);
  const {width} = useWindowDimensions();
  function showTimePicker() {
    setTimePicker(true);
  }

  function onTimeSelected(event, value) {
    setTime(value);
    setTimePicker(false);
  }
  const handleConfirm = () => {
    console.log('click');
    axios
      .get(AppUrl.simplePostApprove + singlePost?.id, axiosConfig)
      .then(res => {
        if (res.data.status === 200) {
          Toast.show('Post Approved Successfully', Toast.durations.SHORT);
          navigation.goBack();
          navigation.goBack();
        }
      });
  };
  const handleReject = () => {
    console.log('click');
    axios
      .get(AppUrl.simplePostDecline + singlePost?.id, axiosConfig)
      .then(res => {
        if (res.data.status === 200) {
          Toast.show('Post Declined', Toast.durations.SHORT);
          navigation.goBack();
          navigation.goBack();
        }
      });
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.containerQA}>
        <View
          style={{backgroundColor: '#242526', margin: 10, borderRadius: 10}}>
          <View style={{margin: 10}}>
            <Text
              style={{
                color: '#E3E5EA',
                fontSize: 15,
                fontWeight: 'bold',
              }}>
              {/* Shakib {typeName} */}
              {singlePost?.star?.first_name} {singlePost?.star?.last_name}
            </Text>
            <Text style={styles.time1}>
              {moment(singlePost?.created_at).format('LT')}{' '}
              {moment(singlePost?.created_at).format('LL')}
            </Text>
          </View>
          <View
            style={{borderWidth: 0.2, borderColor: 'gray', margin: 5}}></View>

          <View style={{position: 'relative', borderRadius: 10}}>
            <View style={{marginVertical: 10}}>
              {!singlePost?.image ? (
                <VideoPlayer
                  resizeMode="contain"
                  video={{
                    uri: AppUrl.MediaBaseUrl + singlePost?.video,
                  }}
                  videoWidth={20}
                  videoHeight={10}
                  thumbnail={{
                    uri: AppUrl.MediaBaseUrl + singlePost?.thumbnail,
                  }}
                />
              ) : (
                <Image
                  source={
                    singlePost?.image
                      ? {uri: `${AppUrl.MediaBaseUrl + singlePost?.image}`}
                      : imagePath.defultCover
                  }
                  style={{height: 200, width: '100%'}}
                />
              )}
            </View>
          </View>

          <View style={{marginHorizontal: 10}}>
            <View>
              <Text style={styles.textInputHeader}>Description</Text>
            </View>
            <View
              style={{
                borderWidth: 0.2,
                borderColor: 'gray',
                margin: 10,
              }}></View>
            <View style={{marginVertical: 8, marginHorizontal: 8}}>
              <RenderHTML
                contentWidth={width}
                source={{
                  html: `<div style='color:#e6e6e6'>${singlePost?.description}</div>`,
                }}
              />
            </View>
          </View>
          <View style={{marginHorizontal: 10}}>
            <View>
              <Text style={styles.textInputHeader}>Post Details</Text>
            </View>
            <View
              style={{
                borderWidth: 0.2,
                borderColor: 'gray',
                margin: 10,
              }}></View>

            <View style={{flexDirection: 'row', margin: 8}}>
              <View style={{flex: 1, justifyContent: 'center'}}>
                <Text style={{color: '#ddd'}}>Post Created at</Text>
              </View>

              <View style={styles.createMeetupRow}>
                <View style={{paddingHorizontal: 8}}>
                  <Icon name="date-range" size={20} color="#ffaa00" />
                </View>
                <Text style={{color: '#fff'}}>
                  {moment(singlePost?.created_at).format('LL')}
                </Text>
              </View>
            </View>

            <View style={{flexDirection: 'row', margin: 8}}>
              <View style={{flex: 1, justifyContent: 'center'}}>
                <Text style={{color: '#ddd'}}>Price</Text>
              </View>
              <View style={styles.createMeetupRow}>
                <View style={{paddingHorizontal: 8}}>
                  <Icon name="attach-money" size={20} color="#ffaa00" />
                </View>
                <Text style={{color: '#fff'}}>
                  {singlePost?.fee != 0 ? singlePost?.fee : 'Free'}
                </Text>
                {/* <TextInput
              style={{color: '#fff'}}
              placeholder={'5000 Tk'}
              placeholderTextColor={'#fff'}
              multiline={true}
            /> */}
              </View>
            </View>
          </View>
        </View>
      </View>
      <View
        style={{
          backgroundColor: '#282828',
          marginHorizontal: 10,
          borderRadius: 10,
          marginBottom: 10,
        }}>
        <View style={{flexDirection: 'row', margin: 8}}>
          <TouchableOpacity
            style={styles.lastBtn}
            onPress={() => {
              handleReject();
            }}>
            <View style={styles.lstBtnChild}>
              <Icon name="close" size={20} color="#fff" />
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() =>
              Navigation.navigate(MainNavigationString.EDITCARD, {typeName})
            }
            style={styles.lastBtn}>
            <View style={styles.lstBtnChildTwo}>
              <Icon name="pending-actions" size={20} color="#fff" />
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.lastBtn}
            onPress={() => {
              handleConfirm();
            }}>
            <View style={styles.lstBtnChildThree}>
              <Icon name="done" size={20} color="#fff" />
            </View>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
};

// define your styles
const styles = StyleSheet.create({
  underLineBlack: {
    borderBottomColor: '#000',
    borderWidth: 2,
    marginVertical: 8,
  },
  lastBtn: {
    flex: 1,
  },
  lstBtnChild: {
    alignItems: 'center',
    backgroundColor: 'red',
    padding: 8,
    borderRadius: 20,
    marginHorizontal: 5,
  },

  createMeetupRow: {
    flex: 1,
    borderRadius: 10,
    flexDirection: 'row',
    marginHorizontal: 5,
    paddingHorizontal: 7,
    height: 35,
    alignItems: 'center',
  },
  textInputHeader: {
    marginHorizontal: 8,
    color: 'white',
    fontWeight: 'bold',
    fontSize: 18,
  },
  textInput: {
    marginHorizontal: 8,
    color: 'white',
  },
  sessionTitle: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 25,
    marginHorizontal: 8,
  },
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  MainCard: {
    padding: 5,
    // backgroundColor: '#343434',
    borderTopLeftRadius: 5,
    borderTopRightRadius: 5,
    flexDirection: 'row',
    paddingHorizontal: 8,
  },
  cardImg: {
    justifyContent: 'center',
  },
  starCardImg: {
    height: 34,
    width: 34,
    borderRadius: 50,
  },
  cardText: {
    color: 'white',
    paddingLeft: 5,
    fontSize: 15,
    marginTop: 3,
  },
  time: {
    fontSize: 12,
    margin: 0,
    paddingLeft: 5,
    color: '#AEAEAE',
  },
  containerQA: {
    // backgroundColor: '#343434',
    margin: 8,
    borderRadius: 10,
    flex: 1,
  },
  lastBtn: {
    flex: 1,
  },
  lstBtnChild: {
    alignItems: 'center',
    backgroundColor: '#F72736',
    padding: 8,
    borderRadius: 20,
    marginHorizontal: 5,
  },
  lstBtnChildTwo: {
    alignItems: 'center',
    backgroundColor: '#FA6DA3',
    padding: 8,
    borderRadius: 20,
    marginHorizontal: 5,
  },
  lstBtnChildThree: {
    alignItems: 'center',
    backgroundColor: '#5167F6',
    padding: 8,
    borderRadius: 20,
    marginHorizontal: 5,
  },
  time1: {
    color: '#909296',
    fontSize: 12,
  },
});

//make this component available to the app
export default PendingCard;
