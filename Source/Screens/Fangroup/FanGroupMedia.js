import {Image, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import AppUrl from '../../RestApi/AppUrl';
import VideoPlayer from 'react-native-video-player';

export default function FanGroupMedia({fanMedia, fanVideo}) {
  return (
    <View>
      <View
        style={{
          backgroundColor: '#212529',
          margin: 15,
          borderRadius: 5,
          padding: 5,
        }}>
        <Text style={{color: '#fff', fontSize: 20}}>Photos File</Text>
        <View>
          {fanMedia?.map(photo => {
            return (
              <Image
                resizeMode="stretch"
                source={{uri: AppUrl.MediaBaseUrl + photo?.image}}
                style={{height: 150, width: 150, margin: 5}}
              />
            );
          })}
        </View>
      </View>
      <View
        style={{
          backgroundColor: '#212529',
          margin: 15,
          borderRadius: 5,
          padding: 5,
        }}>
        <Text style={{color: '#fff', fontSize: 20}}>Videos File</Text>
        <View>
          {fanVideo?.map(photo => {
            return (
              <VideoPlayer
                source={{uri: AppUrl.MediaBaseUrl + photo?.video}}
                style={{height: 150, width: 150, margin: 5}}
              />
            );
          })}
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({});
