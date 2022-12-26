/* eslint-disable prettier/prettier */
//import liraries
import React, {Component, useContext, useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
  SafeAreaView,
  Image,
  Alert,
} from 'react-native';
import Toast from 'react-native-root-toast';
import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {launchImageLibrary} from 'react-native-image-picker';

import DatePicker from 'react-native-date-picker';
import DateTimePicker from '@react-native-community/datetimepicker';
import LinearGradient from 'react-native-linear-gradient';
import {useForm, Controller} from 'react-hook-form';
import moment from 'moment';
import {AuthContext} from '../../Constants/context';

import {useNavigation} from '@react-navigation/native';
import LoaderComp from '../../Components/LoaderComp';
import {Picker} from '@react-native-picker/picker';
import CustomHeader from '../../Components/CustomHeader';
import TitleHeader from '../../Components/TitleHeader';
import axios from 'axios';
import AppUrl from '../../RestApi/AppUrl';
// create a component
const ScheduleForm = ({route}) => {
  const navigation = useNavigation();
  const [date, setDate] = useState(new Date());
  const [open, setOpen] = useState(false);

  const [timePicker, setTimePicker] = useState(false);
  const [endTimePicker, setEndTimePicker] = useState(false);

  const [time, setTime] = useState(new Date());
  const [endTime, setEndTime] = useState(new Date());
  const [selectedLanguage, setSelectedLanguage] = useState();
  const [scheduleDate, SetScheduleDate] = useState('');

  const {setRefresh2} = route.params;

  const [buffer, setBuffer] = useState(false);

  const {
    control,

    setValue,
    formState: {errors, shouldValidate},
  } = useForm({
    defaultValues: {
      title: '',
      instruction: '',
      description: '',
      date: '',
      start_time: '',
      end_time: '',
      registration_start_date: '',
      registration_end_date: '',
      fee: '',
      max_time: '',
      min_time: '',
      interval: '',
      image_path: '',
    },
  });

  function onTimeSelected(event, value) {
    setValue('start_time', moment(value).format('LT'), {required: true});
    setTime(value);
    setTimePicker(false);
  }

  function openEndTimeSelected(event, value) {
    console.log(value);

    setValue('end_time', moment(value).format('LT'), {required: true});
    setEndTime(value);
    setEndTimePicker(false);
  }
  const {axiosConfig} = useContext(AuthContext);

  function handleSubmit() {
    Alert.alert('Ary you sure want to create schedule?', '', [
      {
        text: 'Cancel',
        onPress: () => console.log('Cancel Pressed'),
        style: 'cancel',
      },
      {
        text: 'Confirm',
        onPress: () => {
          console.log('===>', selectedLanguage);
          console.log('===>', scheduleDate);
          console.log('===>', time);
          console.log('===>', endTime);

          const dataForm = {
            eventType: selectedLanguage,
            eventDate: scheduleDate,
            startTime: time,
            endTime: endTime,
          };
          setBuffer(true);

          console.log('current data is ===>', dataForm);
          axios
            .post(AppUrl.addSchedule, dataForm, axiosConfig)
            .then(res => {
              console.log(res.data);
              if (res.data.status === 200) {
                navigation.navigate('Schedule');
                Toast.show('Added', Toast.durations.SHORT);
                setBuffer(false);
                setRefresh2(previous => (previous ? false : true));
              }
            })
            .catch(err => {
              console.log(err);
            });
        },
      },
    ]);
  }

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: '#000'}}>
      {buffer && <LoaderComp />}
      <CustomHeader backFunc={() => navigation.goBack()} title="Schedule" />

      <ScrollView style={styles.container}>
        <View style={{marginHorizontal: 10}}>
          <TitleHeader title={'Create Schedule'} />
        </View>
        <View style={styles.containerChild}>
          <View style={{padding: 12}}>
            <View style={{marginVertical: 10}}>
              <View>
                <Text style={styles.title}>Event Type</Text>
              </View>
              <View
                style={{
                  justifyContent: 'center',
                  alignItems: 'stretch',
                  borderWidth: 1,
                  height: 40,
                  borderColor: '#ffad00',
                  borderRadius: 25,
                  marginVertical: 10,
                  color: '#ffffff',
                }}>
                <Picker
                  dropdownIconColor="white"
                  mode="dialog"
                  style={{
                    color: '#9e9e9e',
                  }}
                  onValueChange={itemValue => setSelectedLanguage(itemValue)}
                  selectedValue={selectedLanguage}>
                  <Picker.Item label="Live chat" value="Live chat" />
                  <Picker.Item
                    label="Learning Session"
                    value="Learning Session"
                  />
                  <Picker.Item label="Meet Up Event" value="Meetup " />
                  <Picker.Item label="Qna" value="Qna" />
                </Picker>
              </View>

              <View>
                <Text style={styles.title}>Select Date</Text>
              </View>
              <DatePicker
                mode="date"
                modal
                open={open}
                date={date}
                onConfirm={date => {
                  setDate(date);
                  setOpen(false);
                  setValue('date', date, {required: true});
                  SetScheduleDate(moment(date).format('LL'));
                }}
                onCancel={() => {
                  setOpen(false);
                }}
              />
              <TouchableOpacity
                onPress={() => setOpen(true)}
                style={styles.createMeetupRow}>
                <Text
                  style={{color: '#9e9e9e', marginHorizontal: 4, fontSize: 13}}>
                  {moment(date).format('LL')}
                </Text>
                <View>
                  <MaterialIcons
                    name="date-range"
                    color={'#ffaa00'}
                    size={15}
                  />
                </View>
              </TouchableOpacity>
            </View>

            <View style={{flexDirection: 'row', marginVertical: 8}}>
              <View style={{flex: 1}}>
                <Text style={styles.title}>Start Time</Text>
                <TouchableOpacity
                  style={styles.uploadFileBtn}
                  onPress={() => setTimePicker(true)}>
                  <Text
                    style={{color: '#9e9e9e', paddingRight: 8, fontSize: 13}}>
                    {' '}
                    {moment(time).format('LT')}
                  </Text>
                  <AntDesign name="clockcircleo" color={'#ffaa00'} size={15} />
                </TouchableOpacity>
              </View>
              <View style={{flex: 1}}>
                <Text style={styles.title}>End Time</Text>
                <TouchableOpacity
                  style={styles.uploadFileBtn}
                  onPress={() => setEndTimePicker(true)}>
                  <Text
                    style={{color: '#9e9e9e', paddingRight: 8, fontSize: 13}}>
                    {' '}
                    {moment(endTime).format('LT')}
                  </Text>
                  <AntDesign name="clockcircleo" color={'#ffaa00'} size={15} />
                </TouchableOpacity>
              </View>
            </View>

            {timePicker && (
              <DateTimePicker
                value={time}
                mode="time"
                open={timePicker}
                display={Platform.OS === 'ios' ? 'spinner' : 'default'}
                is24Hour={false}
                onChange={onTimeSelected}
              />
            )}

            {endTimePicker && (
              <DateTimePicker
                value={endTime}
                mode="time"
                display={Platform.OS === 'ios' ? 'spinner' : 'default'}
                is24Hour={false}
                onChange={openEndTimeSelected}
              />
            )}

            <View style={{flexDirection: 'row'}}>
              <TouchableOpacity
                style={styles.removeBtn}
                onPress={() => navigation.goBack()}>
                <Text style={{fontSize: 13, color: 'white'}}>CANCEL</Text>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={handleSubmit}
                style={styles.confirmBtn}>
                <LinearGradient
                  colors={['#E19A04', '#E7A725', '#FFAD55', '#FACF55']}
                  style={{
                    width: '100%',
                    height: '100%',
                    justifyContent: 'center',
                    alignItems: 'center',
                    borderRadius: 50,
                  }}>
                  <Text style={{fontSize: 13, color: 'white'}}>CONFIRM</Text>
                </LinearGradient>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

// define your styles
const styles = StyleSheet.create({
  title: {
    color: '#9e9e9e',
    marginHorizontal: 8,
    fontSize: 13,

    marginBottom: 6,
    // textAlign: 'center',
    color: '#C9B049',
  },
  textInput: {
    borderWidth: 0.7,
    borderRadius: 23,
    marginVertical: 7,
    borderColor: '#ffad00',
    textAlign: 'center',
    color: '#fff',
    backgroundColor: '#181818',
  },
  textInputMax: {
    flex: 1,
    marginHorizontal: 8,
    borderWidth: 0.7,
    borderRadius: 23,
    marginVertical: 7,
    borderColor: '#ffad00',
    textAlign: 'center',
    color: '#fff',
    backgroundColor: '#181818',
  },
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  containerChild: {
    backgroundColor: '#181819',
    margin: 10,
    borderRadius: 10,
  },
  createPostRow: {
    marginTop: 8,
    marginBottom: 8,
    flexDirection: 'row',

    borderWidth: 1,
    borderColor: '#ffad00',
    borderRadius: 20,
    padding: 10,
    backgroundColor: '#181818',
  },
  createPostRowMain: {
    // flex: 1,
    marginTop: 8,
    marginBottom: 8,
    flexDirection: 'row',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#ffad00',
    borderRadius: 20,
    padding: 10,
  },
  createPostRowMainSlot: {
    flex: 1,
    margin: 8,
    flexDirection: 'row',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#ffad00',
    borderRadius: 20,
    backgroundColor: '#181818',
    padding: 10,
  },
  createMeetupRow: {
    marginTop: 8,
    marginBottom: 8,
    flexDirection: 'row',
    justifyContent: 'center',
    borderWidth: 0.7,
    borderColor: '#ffad00',
    borderRadius: 23,
    backgroundColor: '#181818',
    padding: 10,
    fontSize: 13,
    height: 43,
    color: 'white',
  },
  createPostTitle: {
    marginTop: 8,
    marginBottom: 8,
    flexDirection: 'row',
    color: 'white',
    borderWidth: 1,
    borderColor: '#ffad00',
    borderRadius: 20,
    padding: 10,
  },
  createPostDescription: {
    marginTop: 8,
    marginBottom: 8,
    flexDirection: 'row',
    color: 'white',
    borderWidth: 0.7,
    backgroundColor: '#181818',
    borderColor: '#ffad00',
    borderRadius: 35,
    padding: 10,
    minHeight: 70,
    fontSize: 13,
  },
  uploadFile: {
    flex: 1,
    flexDirection: 'row',
  },
  uploadFileBtn: {
    backgroundColor: '#181818',
    flex: 1,
    margin: 6,
    flexDirection: 'row',
    color: 'white',
    borderWidth: 0.7,
    borderColor: '#ffad00',
    borderRadius: 23,
    height: 45,
    justifyContent: 'center',
    alignItems: 'center',
  },
  uploadFileBtnMain: {
    flex: 1,
    // margin: 8,
    // margin: 8,
    // flexDirection: 'row',
    color: 'white',
    // height: 45,
    justifyContent: 'center',
    alignItems: 'center',
  },
  removeBtn: {
    backgroundColor: '#2A2B2E',
    borderRadius: 20,
    width: '47%',
    height: 40,
    marginTop: 10,
    marginRight: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  confirmBtn: {
    width: '47%',
    backgroundColor: '#0B3E92',
    borderRadius: 20,
    marginTop: 10,
    marginLeft: 10,
    justifyContent: 'center',
    alignItems: 'center',
    height: 40,
  },
  freeBtn: {
    flex: 1,
    height: 40,
    marginTop: 8,
    marginBottom: 8,
    borderColor: '#fff',
    borderWidth: 1,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  // tkStyle: {
  //   marginTop: 5,
  //   flex: 1,
  //   borderRadius: 20,
  //   borderWidth: 1,
  //   borderColor: '#fff',
  //   color: '#fff',
  //   flexDirection: 'row',
  //   textAlign: 'center',
  //   justifyContent: 'center',
  //   width: 25,
  //   height: 25,
  // },
  tkStyle: {
    marginTop: 10,
    flex: 1,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#fff',
    color: '#fff',
    flexDirection: 'row',
    textAlign: 'center',
    justifyContent: 'center',
    width: 30,
    height: 30,
  },
  tkStyleOffline: {
    // marginTop: 10,
    flex: 1,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#fff',
    color: '#fff',
    flexDirection: 'row',
    textAlign: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    width: 25,
    height: 25,
  },
  parentOnlineView: {
    flexDirection: 'row',
  },
  onlineTab: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#fff',
    borderRadius: 10,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    height: 45,
    margin: 8,
  },
  offlineTab: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#fff',
    borderRadius: 10,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    height: 45,
    margin: 8,
  },
  activeOnline: {
    backgroundColor: 'coral',
    flex: 1,
    borderWidth: 1,
    borderColor: '#fff',
    borderRadius: 10,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    height: 45,
    margin: 8,
  },
  activeOnlineText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  activeOfflineText: {
    color: 'white',
    fontWeight: 'bold',
  },
  tkInput: {
    color: '#fff',
    flex: 10,
    textAlign: 'center',
  },
});

//make this component available to the app
export default ScheduleForm;
