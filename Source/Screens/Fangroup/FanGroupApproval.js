import {
  Dimensions,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  useWindowDimensions,
  View,
} from 'react-native';
import React, {useContext, useState} from 'react';
import * as Animatable from 'react-native-animatable';
import RenderHTML from 'react-native-render-html';
import imagePath from '../../Constants/imagePath';
import moment from 'moment';
import AppUrl from '../../RestApi/AppUrl';
import VideoPlayer from 'react-native-video-player';
import LinearGradient from 'react-native-linear-gradient';
import axios from 'axios';
import {AuthContext} from '../../Constants/context';
import {useNavigation} from '@react-navigation/native';

export default function FanGroupApproval({approval}) {
  const windowWidth = Dimensions.get('window').width;
  const [contentHeight, setContentHeight] = useState(true);
  const singlePost = '';
  const {axiosConfig} = useContext(AuthContext);
  const navigation = useNavigation();

  const handleApprove = () => {
    axios.post(AppUrl.fanGroupPostApprove, axiosConfig).then(res => {
      console.log(res.data);
      if (res.status === 200) {
        navigation.goBack();
      }
    });
  };

  const {width} = useWindowDimensions();
  return (
    <View>
      {approval?.map(post => {
        let textLength = '';
        if (singlePost?.description) {
          textLength = singlePost?.description.length;
        } else {
          textLength = 0;
        }
        return (
          <View style={{backgroundColor: '#000', flex: 1}}>
            <View
              style={
                windowWidth > 700 ? styles.CardRowWidscreen : styles.CardRow
              }
              animation="slideInDown">
              <View style={styles.CardContent}>
                <View>
                  <Text
                    style={{
                      color: 'orange',
                      fontSize: 18,
                      fontWeight: 'bold',
                    }}>
                    {post?.star_name}
                  </Text>
                </View>
                <View style={{marginVertical: 10}}>
                  <Text
                    style={{
                      color: '#E3E5EA',
                      fontSize: 15,
                      fontWeight: 'bold',
                    }}>
                    {/* Shakib {typeName} */}
                    {post?.user?.first_name}{' '}
                    {post?.user?.last_name && post?.user?.last_name}
                  </Text>
                  <Text style={styles.time1}>
                    {moment(post?.fangroup?.created_at).format('LL')}
                  </Text>
                </View>
                <View
                  style={
                    contentHeight && textLength > 300
                      ? {height: 136, overflow: 'hidden'}
                      : ''
                  }>
                  <RenderHTML
                    contentWidth={width}
                    source={{
                      html: `<div style='color:#e6e6e6'>${post?.description}</div>`,
                    }}
                  />
                </View>
                <TouchableOpacity
                  onPress={() => setContentHeight(!contentHeight)}>
                  <Text style={{color: '#FFAD00', marginTop: 5}}>
                    {contentHeight ? `Read More . . . ` : `Read Less`}
                  </Text>
                </TouchableOpacity>

                <View style={{position: 'relative', margin: 5}}>
                  {post?.image ? (
                    <Image
                      resizeMode="stretch"
                      style={
                        windowWidth > 700
                          ? styles.cardCoverImgWithScreen
                          : styles.cardCoverImg
                      }
                      source={
                        post?.image
                          ? {
                              uri: `${AppUrl.MediaBaseUrl}${post?.image}`,
                            }
                          : imagePath.LearningBanner
                      }
                    />
                  ) : (
                    <VideoPlayer
                      video={{
                        uri: AppUrl.MediaBaseUrl + post?.video,
                      }}
                      videoWidth={160}
                      videoHeight={90}
                      thumbnail={imagePath.videoThumb}
                    />
                  )}
                </View>

                <View
                  style={{
                    flex: 1,
                    flexDirection: 'row',
                    justifyContent: 'space-around',
                  }}>
                  <TouchableOpacity
                    style={styles.confirmBtn}
                    onPress={() => {
                      console.log('click');
                    }}>
                    <LinearGradient
                      colors={['#19e52d', '#83ea8d']}
                      style={{
                        width: '100%',
                        height: '70%',
                        justifyContent: 'center',
                        alignItems: 'center',
                        borderRadius: 10,
                      }}>
                      <Text style={{color: 'white'}}>Approve</Text>
                    </LinearGradient>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={styles.confirmBtn}
                    onPress={() => {
                      console.log('click');
                    }}>
                    <LinearGradient
                      colors={['#938f8f', '#938f8f']}
                      style={{
                        width: '100%',
                        height: '70%',
                        justifyContent: 'center',
                        alignItems: 'center',
                        borderRadius: 10,
                      }}>
                      <Text style={{color: 'white'}}>Decline</Text>
                    </LinearGradient>
                  </TouchableOpacity>
                </View>

                <View />
              </View>
            </View>
          </View>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  cardCoverImg: {
    width: '100%',
    height: 200,
    marginVertical: 4,
  },
  cardCoverImgWithScreen: {
    height: 400,
    width: '100%',
    borderRadius: 10,
    marginVertical: 4,
  },
  time1: {
    color: '#909296',
    fontSize: 12,
  },
  CardRowWidscreen: {
    margin: 10,
    marginHorizontal: 90,
  },
  CardRow: {
    margin: 10,
    //marginHorizontal: 80,
  },
  CardContent: {
    padding: 5,
    backgroundColor: '#242526',
    borderRadius: 10,
    paddingHorizontal: 8,
  },
  confirmBtn: {
    width: '40%',
    marginTop: 10,
    marginLeft: 10,
    justifyContent: 'center',
    alignItems: 'center',
    height: 45,
  },
});
