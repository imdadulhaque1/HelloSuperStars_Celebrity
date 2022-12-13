/* eslint-disable prettier/prettier */
//import liraries
import React from 'react';
import DateTimePicker from '@react-native-community/datetimepicker';
import {useState} from 'react';
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  useWindowDimensions,
} from 'react-native';
import DatePicker from 'react-native-date-picker';
import {TextInput} from 'react-native-gesture-handler';
import VideoPlayer from 'react-native-video-player';
import imagePath from '../../Constants/imagePath';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Entypo from 'react-native-vector-icons/Entypo';
import moment from 'moment';
import RenderHtml from 'react-native-render-html';
import AppUrl from '../../RestApi/AppUrl';
import {useNavigation} from '@react-navigation/native';
import MainNavigationString from '../../Constants/MainNavigationString';
import ModalComp from './ModalComp';
// create a component
const CompletedCard = ({route}) => {
  const {width} = useWindowDimensions();
  const [date, setDate] = useState(new Date());
  const [open, setOpen] = useState(false);
  const [time, setTime] = useState(new Date(Date.now()));
  const [timePicker, setTimePicker] = useState(false);
  const {typeName, eventData = null, module = null, id = null} = route.params;
  const Navigation = useNavigation();

  function showTimePicker() {
    setTimePicker(true);
  }

  function onTimeSelected(event, value) {
    setTime(value);
    setTimePicker(false);
  }

  const HtmlDiscription = {
    html: `<div style='color:#e6e6e6'>${eventData?.description}</div>`,
  };

  const Htmlinstaruction = {
    html: `<div style='color:#e6e6e6'>${eventData?.instruction}</div>`,
  };

  const HandelEdit = () => {
    switch (module) {
      case 'Live Chat':
        return Navigation.navigate(MainNavigationString.UPADTEFORM, {
          oldEventData: eventData,
        });
        break;

      case 'QNA':
        return Navigation.navigate(MainNavigationString.QNAUPDATE, {
          oldEventData: eventData,
        });
        break;

      case 'Meet Up':
        return Navigation.navigate(MainNavigationString.MEETUPUPDATE, {
          oldEventData: eventData,
        });
        break;

      default:
        alert('navigation not');
        break;
    }
  };

  //approved
  const [approvedModalVisible, setApprovedModalVisible] = useState(false);
  const [approvedResult, setApprovedResult] = useState(null);

  //reject
  const [rejectModalVisible, setRejectModalVisible] = useState(false);
  const [rejectResult, setRejectResult] = useState(null);
  console.log(eventData);

  return (
    <ScrollView style={styles.container}>
      <ModalComp
        isModalVisible={approvedModalVisible}
        setModalVisible={setApprovedModalVisible}
        setResult={setApprovedResult}
        typeName={typeName}
        id={id}
      />
      <ModalComp
        isModalVisible={rejectModalVisible}
        setModalVisible={setRejectModalVisible}
        setResult={setRejectResult}
        type="warning"
        typeName={typeName}
        id={id}
      />
      <View style={styles.containerQA}>
        <View
          style={{backgroundColor: '#242526', margin: 10, borderRadius: 10}}>
          <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
            <View style={{margin: 10}}>
              <Text
                style={{
                  color: '#E3E5EA',
                  fontSize: 15,
                  fontWeight: 'bold',
                }}>
                {/* Shakib {typeName} */}
                {eventData?.star?.first_name + '' + eventData?.star?.last_name}
              </Text>
              <Text style={styles.time1}>
                {moment(eventData?.created_at).format('LL')}
              </Text>
            </View>
            <View style={{padding: 15}}>
              <Text style={{color: '#ffaa00'}}>
                {module + ' > ' + typeName}
              </Text>
            </View>
          </View>
          <View
            style={{borderWidth: 0.2, borderColor: 'gray', margin: 5}}></View>
          <View style={{margin: 10}}>
            <Text style={{fontSize: 20, color: '#fff'}}>
              {eventData?.title}
            </Text>
            <RenderHtml contentWidth={width} source={HtmlDiscription} />
          </View>
          <View style={{position: 'relative', borderRadius: 10}}>
            <View style={{marginVertical: 10}}>
              <Image
                source={
                  eventData?.banner
                    ? {uri: `${AppUrl.MediaBaseUrl + eventData?.banner}`}
                    : imagePath.defultCover
                }
                style={{height: 200, width: '100%'}}
              />
            </View>
          </View>

          <View style={{marginHorizontal: 10}}>
            <View>
              <Text style={styles.textInputHeader}>Instruction</Text>
            </View>
            <View
              style={{
                borderWidth: 0.2,
                borderColor: 'gray',
                margin: 10,
              }}></View>
            <View style={{marginVertical: 8}}>
              <RenderHtml contentWidth={width} source={Htmlinstaruction} />
            </View>
          </View>
          <View style={{marginHorizontal: 10}}>
            <View>
              <Text style={styles.textInputHeader}>Event Details</Text>
            </View>
            <View
              style={{
                borderWidth: 0.2,
                borderColor: 'gray',
                margin: 10,
              }}></View>

            <View style={{flexDirection: 'row', margin: 8}}>
              <View style={{flex: 1, justifyContent: 'center'}}>
                <Text style={{color: '#ddd'}}>Event Date</Text>
              </View>

              <View style={styles.createMeetupRow}>
                <View style={{paddingHorizontal: 8}}>
                  <Icon name="date-range" size={20} color="#ffaa00" />
                </View>
                <Text style={{color: '#fff'}}>
                  {moment(eventData?.event_date).format('L')}
                </Text>
              </View>
            </View>

            {/* location */}
            {eventData?.venue && (
              <View style={{flexDirection: 'row', margin: 8}}>
                <View style={{flex: 1, justifyContent: 'center'}}>
                  <Text style={{color: '#ddd'}}>Loaction</Text>
                </View>

                <View style={styles.createMeetupRow}>
                  <View style={{paddingHorizontal: 8}}>
                    <Entypo name="location" size={20} color="#ffaa00" />
                  </View>
                  <Text style={{color: '#fff'}}>{eventData?.venue}</Text>
                  <Text style={{color: '#fff'}}>{eventData?.venue}</Text>
                </View>
              </View>
            )}

            <View style={{flexDirection: 'row', margin: 8}}>
              <View style={{flex: 1, justifyContent: 'center'}}>
                <Text style={{color: '#ddd'}}>From</Text>
              </View>
              <View style={styles.createMeetupRow}>
                <View style={{paddingHorizontal: 8}}>
                  <Icon name="access-time" size={20} color="#ffaa00" />
                </View>
                <Text style={{color: '#fff'}}>
                  {moment('2022-01-20 ' + eventData?.start_time).format('LT')}
                </Text>
              </View>
            </View>
            <View style={{flexDirection: 'row', margin: 8}}>
              <View style={{flex: 1, justifyContent: 'center'}}>
                <Text style={{color: '#ddd'}}>To</Text>
              </View>
              <View style={styles.createMeetupRow}>
                <View style={{paddingHorizontal: 8}}>
                  <Icon name="av-timer" size={20} color="#ffaa00" />
                </View>
                <Text style={{color: '#fff'}}>
                  {moment('2022-01-20 ' + eventData?.end_time).format('LT')}
                </Text>
              </View>
            </View>

            <View style={{flexDirection: 'row', margin: 8}}>
              <View style={{flex: 1, justifyContent: 'center'}}>
                <Text style={{color: '#ddd'}}>Registration</Text>
              </View>
              <View style={styles.createMeetupRow}>
                <View style={{paddingHorizontal: 8}}>
                  <Icon name="app-registration" size={20} color="#ffaa00" />
                </View>
                <Text style={{color: '#fff'}}>
                  {moment(eventData?.registration_start_date).format('L')} to{' '}
                  {moment(eventData?.registration_end_date).format('L')}
                </Text>
              </View>
            </View>
            {eventData?.total_seat && (
              <View style={{flexDirection: 'row', margin: 8}}>
                <View style={{flex: 1, justifyContent: 'center'}}>
                  <Text style={{color: '#ddd'}}>Participants</Text>
                </View>
                <View style={styles.createMeetupRow}>
                  <View style={{paddingHorizontal: 8}}>
                    <Icon name="groups" size={20} color="#ffaa00" />
                  </View>
                  <Text style={{color: '#fff'}}>{eventData?.total_seat}</Text>
                </View>
              </View>
            )}
            <View style={{flexDirection: 'row', margin: 8}}>
              <View style={{flex: 1, justifyContent: 'center'}}>
                <Text style={{color: '#ddd'}}>Price</Text>
              </View>
              <View style={styles.createMeetupRow}>
                <View style={{paddingHorizontal: 8}}>
                  <Icon name="attach-money" size={20} color="#ffaa00" />
                </View>
                <Text style={{color: '#fff'}}>{eventData?.fee} Tk</Text>
              </View>
            </View>
          </View>

          {eventData?.status === 1 && typeName === 'QnaPending' ? (
            <View
              style={{
                flexDirection: 'row',
                margin: 8,
                paddingVertical: 10,
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <Text style={{color: '#fff'}}>
                Waiting for Manager Admin approval
              </Text>
            </View>
          ) : eventData?.star_approval === 0 && typeName === 'QnaPending' ? (
            <View
              style={{flexDirection: 'row', margin: 8, paddingVertical: 10}}>
              <TouchableOpacity
                style={styles.lastBtn}
                onPress={() => setRejectModalVisible(true)}>
                <View style={styles.lstBtnChild}>
                  <Icon name="close" size={25} color="black" />
                </View>
              </TouchableOpacity>
              <TouchableOpacity onPress={HandelEdit} style={styles.lastBtn}>
                <View style={styles.lstBtnChildTwo}>
                  <Icon name="pending-actions" size={25} color="black" />
                </View>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.lastBtn}
                onPress={() => setApprovedModalVisible(true)}>
                <View style={styles.lstBtnChildThree}>
                  <Icon name="done" size={25} color="black" />
                </View>
              </TouchableOpacity>
            </View>
          ) : null}

          {/* for pending start */}
          {eventData?.status === 1 ? (
            <View
              style={{
                flexDirection: 'row',
                margin: 8,
                paddingVertical: 10,
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <Text style={{color: '#fff'}}>
                Waiting for Manager Admin approval
              </Text>
            </View>
          ) : (
            typeName === 'LearningPending' && (
              <View
                style={{flexDirection: 'row', margin: 8, paddingVertical: 10}}>
                <TouchableOpacity
                  style={styles.lastBtn}
                  onPress={() => setRejectModalVisible(true)}>
                  <View style={styles.lstBtnChild}>
                    <Icon name="close" size={25} color="black" />
                  </View>
                </TouchableOpacity>
                <TouchableOpacity onPress={HandelEdit} style={styles.lastBtn}>
                  <View style={styles.lstBtnChildTwo}>
                    <Icon name="pending-actions" size={25} color="black" />
                  </View>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.lastBtn}
                  onPress={() => setApprovedModalVisible(true)}>
                  <View style={styles.lstBtnChildThree}>
                    <Icon name="done" size={25} color="black" />
                  </View>
                </TouchableOpacity>
              </View>
            )
          )}

          {/* for pending end */}

          {typeName === 'Approved' && eventData?.status != 2 && (
            <View
              style={{flexDirection: 'row', margin: 8, paddingVertical: 10}}>
              <TouchableOpacity onPress={HandelEdit} style={styles.lastBtn}>
                <View style={styles.lstBtnChildTwo}>
                  <Icon name="pending-actions" size={25} color="black" />
                </View>
              </TouchableOpacity>
            </View>
          )}
        </View>
      </View>

      <ModalComp />
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
  lstBtnChildTwo: {
    alignItems: 'center',
    backgroundColor: 'gold',
    padding: 8,
    borderRadius: 20,
    marginHorizontal: 5,
  },
  lstBtnChildThree: {
    alignItems: 'center',
    backgroundColor: '#00ff00',
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
    color: '#ffaa00',
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
    margin: 8,
    borderRadius: 10,
    flex: 1,
  },
  time1: {
    color: '#909296',
    fontSize: 12,
  },
});

//make this component available to the app
export default CompletedCard;
