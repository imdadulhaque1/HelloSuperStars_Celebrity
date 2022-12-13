import {
  ScrollView,
  StyleSheet,
  Text,
  useWindowDimensions,
  View,
  Image,
  TouchableOpacity,
} from 'react-native';
import React, {useContext, useEffect, useState} from 'react';
import VideoPlayer from 'react-native-video-player';
import axios from 'axios';
import AppUrl from '../../RestApi/AppUrl';
import {AuthContext} from '../../Constants/context';
import RenderHTML from 'react-native-render-html';
import imagePath from '../../Constants/imagePath';
import LoaderComp from '../../Components/LoaderComp';
import SouvenirCreate from '../Star-Showcase/SouvenirCreate';
import GreetingsCompleted from './GreetingsCompleted';
import GreetingsCreate from './GreetingsCreate';
import Icon from 'react-native-vector-icons/MaterialIcons';
export default function GreetingsDetails() {
  const [buffer, setBuffer] = useState(false);
  const [greeting, setGreeting] = useState(null);
  const {axiosConfig} = useContext(AuthContext);
  const {width} = useWindowDimensions();
  useEffect(() => {
    axios.get(AppUrl.greetingsCheck, axiosConfig).then(res => {
      setBuffer(false);
      console.log(res.data);
      setGreeting(res.data.greeting);
    });
  }, []);
  return (
    <>
      {buffer && <LoaderComp />}
      <ScrollView style={{backgroundColor: 'black'}}>
        {greeting ? (
          <View>
            <View style={{backgroundColor: '#a8a8a8'}}>
              <VideoPlayer
                video={{
                  uri: AppUrl.MediaBaseUrl + greeting?.video,
                }}
                videoWidth={160}
                videoHeight={90}
                thumbnail={{
                  uri: AppUrl.MediaBaseUrl + greeting?.banner,
                }}
              />
            </View>
            <View style={{backgroundColor: '#121212'}}>
              <View
                style={{
                  flex: 1,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <Text
                  style={{color: 'white', fontSize: 20, fontWeight: 'bold'}}>
                  {greeting?.title}
                </Text>
              </View>
              <View style={{marginVertical: 8, marginHorizontal: 18}}>
                <Text style={{color: 'white'}}>Instruction</Text>
                <View>
                  <RenderHTML
                    contentWidth={width}
                    source={{
                      html: `<div style='color:#e6e6e6'>${greeting?.instruction}</div>`,
                    }}
                  />
                </View>
              </View>
            </View>
            <View>
              <View style={{backgroundColor: '#121212'}}></View>
              <View style={styles.CardBlack}>
                <View style={styles.flexUnit}>
                  <Image style={styles.boxStyle} source={imagePath.Count} />
                </View>
                <View style={styles.flexUnitBold}>
                  <Text style={{color: '#ddd'}}>Price</Text>
                </View>
                <View style={styles.flexUnitTwo}>
                  <Text
                    style={{color: '#ddd', fontWeight: 'bold', fontSize: 16}}>
                    ${greeting?.cost}
                  </Text>
                </View>
              </View>
            </View>
            {/* <View
              style={{
                backgroundColor: '#282828',
                marginHorizontal: 10,
                borderRadius: 10,
                marginBottom: 10,
              }}>
              <View
                style={{
                  flexDirection: 'row',
                  margin: 8,
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                <TouchableOpacity onPress={() => {}} style={styles.lastBtn}>
                  <View style={styles.lstBtnChildTwo}>
                    <Icon name="pending-actions" size={20} color="#fff" />
                  </View>
                </TouchableOpacity>
              </View>
            </View> */}
          </View>
        ) : (
          <GreetingsCreate />
        )}
      </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  CardBlack: {
    backgroundColor: '#121212',
    padding: 5,
    flexDirection: 'row',
    margin: 10,
    marginBottom: 1,
    borderRadius: 5,
  },
  flexUnit: {
    flex: 1,
    padding: 5,
  },
  flexUnitBold: {
    flex: 10,
    padding: 5,
  },
  flexUnitTwo: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    flex: 2,
    padding: 5,
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
    backgroundColor: '#FA6DA3',
    padding: 8,
    borderRadius: 20,
    marginHorizontal: 5,
    width: '30%',
  },
  lstBtnChildThree: {
    alignItems: 'center',
    backgroundColor: '#5167F6',
    padding: 8,
    borderRadius: 20,
    marginHorizontal: 5,
  },
});
