import {
  ScrollView,
  StyleSheet,
  Text,
  useWindowDimensions,
  View,
  Image,
} from 'react-native';
import React, {useContext, useEffect, useState} from 'react';
import VideoPlayer from 'react-native-video-player';
import axios from 'axios';
import AppUrl from '../../RestApi/AppUrl';
import {AuthContext} from '../../Constants/context';
import RenderHTML from 'react-native-render-html';
import imagePath from '../../Constants/imagePath';
import SouvenirCreate from './SouvenirCreate';
import LoaderComp from '../../Components/LoaderComp';
export default function SouvenirDetails() {
  const [buffer, setBuffer] = useState(false);
  const [souvenir, setSouvenir] = useState(null);
  const {axiosConfig} = useContext(AuthContext);
  const {width} = useWindowDimensions();
  useEffect(() => {
    axios.get(AppUrl.souvenirCheck, axiosConfig).then(res => {
      setBuffer(false);
      console.log(res.data);
      setSouvenir(res.data.getSouviner);
    });
  }, []);
  return (
    <>
      {buffer && <LoaderComp />}
      <ScrollView style={{backgroundColor: 'black'}}>
        {souvenir ? (
          <View>
            <View style={{backgroundColor: '#a8a8a8'}}>
              <VideoPlayer
                video={{
                  uri: AppUrl.MediaBaseUrl + souvenir?.video,
                }}
                videoWidth={160}
                videoHeight={90}
                thumbnail={{
                  uri: AppUrl.MediaBaseUrl + souvenir?.banner,
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
                  {souvenir?.title}
                </Text>
              </View>
              <View>
                <Text style={{color: 'white'}}>Instruction</Text>
                <View>
                  <RenderHTML
                    contentWidth={width}
                    source={{
                      html: `<div style='color:#e6e6e6'>${souvenir?.instruction}</div>`,
                    }}
                  />
                </View>
              </View>
            </View>
            <View>
              <View style={{backgroundColor: '#121212'}}>
                <Text style={{color: 'white'}}>Description</Text>
                <View>
                  <RenderHTML
                    contentWidth={width}
                    source={{
                      html: `<div style='color:#e6e6e6'>${souvenir?.description}</div>`,
                    }}
                  />
                </View>
              </View>
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
                    ${souvenir?.price}
                  </Text>
                </View>
              </View>
            </View>
          </View>
        ) : (
          <SouvenirCreate />
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
});
