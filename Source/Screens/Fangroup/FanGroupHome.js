import {
  Dimensions,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  useWindowDimensions,
  View,
} from 'react-native';
import React, {useState} from 'react';
import * as Animatable from 'react-native-animatable';
import RenderHTML from 'react-native-render-html';
import imagePath from '../../Constants/imagePath';
import moment from 'moment';
import AppUrl from '../../RestApi/AppUrl';
import VideoPlayer from 'react-native-video-player';

export default function FanGroupHome({allFanPost}) {
  const windowWidth = Dimensions.get('window').width;
  const [contentHeight, setContentHeight] = useState(true);
  const singlePost = '';

  const {width} = useWindowDimensions();
  return (
    <View>
      {allFanPost?.map(post => {
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

                <View style={{position: 'relative'}}>
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
});
