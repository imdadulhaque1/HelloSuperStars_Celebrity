import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native';
import Toast from 'react-native-root-toast';
import React, {useContext, useEffect, useState} from 'react';

import {useNavigation} from '@react-navigation/native';
import CustomHeader from '../../Components/CustomHeader';
import TitleHeader from '../../Components/TitleHeader';
import {Button} from 'react-native';
import DatePicker from 'react-native-date-picker';
import {View} from 'react-native-animatable';
import moment from 'moment/moment';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import MainNavigationString from '../../Constants/MainNavigationString';
import * as Animatable from 'react-native-animatable';
import LinearGradient from 'react-native-linear-gradient';
import axios from 'axios';
import AppUrl from '../../RestApi/AppUrl';
import {AuthContext} from '../../Constants/context';
import LoaderComp from '../../Components/LoaderComp';
const Schedule = ({navigation}) => {
  const Navigation = useNavigation();
  const [date, setDate] = useState(new Date());
  const [open, setOpen] = useState(false);
  const [buffer, setBuffer] = useState(false);
  const [schedule, setSchedule] = useState([]);
  const [refresh, setRefresh] = useState(false);
  const [refresh2, setRefresh2] = useState(false);

  const {axiosConfig} = useContext(AuthContext);

  useEffect(() => {
    setBuffer(true);
    axios
      .get(AppUrl.schedule, axiosConfig)
      .then(res => {
        setSchedule(res.data.schedule);
        console.log('schedule->>>>>', res.data.schedule);
        setBuffer(false);
      })
      .catch(err => {
        console.log(err.message);
      });
  }, [refresh2, refresh]);

  const handleDelete = id => {
    console.log('wait', id);
    setBuffer(true);
    axios
      .get(AppUrl.deleteSchedule + id, axiosConfig)
      .then(res => {
        if (res.data.status === 200) {
          Toast.show('Deleted', Toast.durations.SHORT);
          setRefresh(previous => (previous ? false : true));
          setBuffer(false);
        }
      })
      .catch(err => {
        console.log(err.message);
      });
  };

  return (
    <SafeAreaView>
      {buffer && <LoaderComp />}
      <CustomHeader backFunc={() => navigation.goBack()} title="Schedule" />
      <ScrollView style={{backgroundColor: 'black', height: '100%'}}>
        <View style={styles.container}>
          <View style={{marginHorizontal: 10}}>
            <TitleHeader title={'Schedule Information'} />
          </View>

          <View style={{marginHorizontal: 10}}>
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
              style={{marginTop: 10}}>
              <View style={{flexDirection: 'row'}}>
                <View
                  style={{
                    flex: 2,
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  <Text
                    style={{color: 'black', padding: 3, fontWeight: 'bold'}}>
                    Date
                  </Text>
                </View>
                <View
                  style={{
                    flex: 1,
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  <Text
                    style={{color: 'black', padding: 3, fontWeight: 'bold'}}>
                    Type
                  </Text>
                </View>
                <View
                  style={{
                    flex: 2,
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  <Text
                    style={{color: 'black', padding: 3, fontWeight: 'bold'}}>
                    Duration
                  </Text>
                </View>

                <View
                  style={{
                    flex: 1,
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  <Text
                    style={{color: 'black', padding: 3, fontWeight: 'bold'}}>
                    Action
                  </Text>
                </View>
              </View>
            </LinearGradient>

            {schedule?.map((item, index) => {
              return (
                <View
                  key={item.id}
                  style={{
                    backgroundColor: '#202020',
                    flexDirection: 'row',
                    padding: 1,
                  }}>
                  <View
                    style={{
                      flex: 2,
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}>
                    <Text style={{color: '#fff', padding: 3, fontSize: 13}}>
                      {moment(item?.startDate).format('DD MMMM')}
                    </Text>
                  </View>
                  <View
                    style={{
                      flex: 1,
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}>
                    <Text style={{color: '#fff', padding: 3, fontSize: 13}}>
                      {item?.title}
                    </Text>
                  </View>
                  <View
                    style={{
                      flex: 2,
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}>
                    <Text style={{color: '#fff', padding: 3, fontSize: 13}}>
                      {item?.from} - {item?.to}
                    </Text>
                  </View>
                  <View
                    style={{
                      flex: 1,
                      justifyContent: 'center',
                      alignItems: 'center',
                      padding: 2,
                    }}>
                    <TouchableOpacity
                      style={{
                        backgroundColor: '#ffaa00',
                        padding: 3,
                        borderRadius: 100,
                      }}
                      onPress={() => {
                        handleDelete(item?.id);
                      }}>
                      <MaterialIcons name="delete" size={20} color="#000" />
                    </TouchableOpacity>
                  </View>
                </View>
              );
            })}
          </View>
        </View>
      </ScrollView>
      <TouchableOpacity
        onPress={() =>
          navigation.navigate(MainNavigationString.SCHEDULESFORM, {
            setRefresh2: setRefresh2,
          })
        }
        style={{
          height: 50,
          width: 50,
          backgroundColor: '#ffaa00',
          borderRadius: 100,
          position: 'absolute',
          bottom: 0,
          right: 0,
          justifyContent: 'center',
          alignItems: 'center',
          margin: 10,
        }}>
        <Text style={{fontSize: 30, color: 'white'}}>+</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default Schedule;

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
    marginBottom: 20,
    justifyContent: 'center',
    alignContent: 'center',
    borderBottomLeftRadius: 10,
    borderBottomEndRadius: 10,
    padding: 8,
    paddingLeft: 10,
  },
  Content: {
    flexDirection: 'row',
    backgroundColor: '#000',
    borderRadius: 10,
    padding: 12,
    marginBottom: 10,
  },
  Text: {
    color: 'white',
    paddingTop: 5,
    paddingLeft: 20,
    fontSize: 16,
    fontWeight: 'bold',
  },
});
