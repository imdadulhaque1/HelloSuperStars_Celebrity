/* eslint-disable prettier/prettier */
import {View, Text, ScrollView, SafeAreaView} from 'react-native';
import React, {useContext, useEffect, useState} from 'react';
import VideoPlayer from 'react-native-video-player';
import imagePath from '../../Constants/imagePath';
import axios from 'axios';
import AppUrl from '../../RestApi/AppUrl';
import {AuthContext} from '../../Constants/context';
import CustomHeader from '../../Components/CustomHeader';

const AuditionAll = ({navigation}) => {
  const [promoVideo, setPromoVideo] = useState(null);
  const {axiosConfig} = useContext(AuthContext);
  useEffect(() => {
    axios.get(AppUrl.promoVideo, axiosConfig).then(res => {
      console.log(res.data);
      setPromoVideo(res.data.event);
    });
  }, []);
  return (
    <SafeAreaView style={{flex:1,backgroundColor:'#000'}}>
    <CustomHeader backFunc={()=>navigation.goBack()}/>
    <ScrollView style={{backgroundColor: '#000'}}>
      {promoVideo?.map(video => {
        return (
          <VideoPlayer
            video={{
              uri: AppUrl.MediaBaseUrl + video?.video,
            }}
            videoWidth={160}
            videoHeight={90}
            thumbnail={imagePath.videoThumb}
          />
        );
      })}
    </ScrollView>
    </SafeAreaView>
  );
};

export default AuditionAll;
