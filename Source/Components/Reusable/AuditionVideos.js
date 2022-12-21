import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native';
import React, {useContext, useEffect, useState} from 'react';
import VideoPlayer from 'react-native-video-player';
import LinearGradient from 'react-native-linear-gradient';
import {AuthContext} from '../../Constants/context';
import axios from 'axios';
import AppUrl from '../../RestApi/AppUrl';
import Marking from './Marking';
export default function AuditionVideos({route}) {
  const {options, round} = route?.params;
  const [tab, setTab] = useState('allVideos');

  const [videos, setVideos] = useState(null);

  const [marks, setMarks] = useState(null);
  const [comments, setComments] = useState(null);
  const onSubmitMarks = () => {
    console.log(marks);
    console.log(comments);
  };

  const {axiosConfig} = useContext(AuthContext);
  useEffect(() => {
    axios.get(AppUrl.auditionRoundVideos + round, axiosConfig).then(res => {
      console.log('videossssssss', res.data);
      setVideos(res.data);
    });
  }, []);

  return (
    <SafeAreaView>
      <ScrollView style={{backgroundColor: 'black', height: '100%'}}>
        <View
          style={{
            flex: 1,
            flexDirection: 'row',
            justifyContent: 'space-evenly',
          }}>
          <TouchableOpacity
            style={{width: '48%'}}
            onPress={() => {
              setTab('allVideos');
            }}>
            <LinearGradient
              start={{x: 0, y: 0}}
              end={{x: 1, y: 0}}
              colors={
                tab === 'allVideos'
                  ? [
                      '#FFAD00',
                      '#FFD273',
                      '#E19A04',
                      '#FACF75',
                      '#E7A725',
                      '#FFAD00',
                    ]
                  : ['#7a7777', '#7a7779']
              }
              style={styles.linearGradient}>
              <Text style={styles.headerText}>All User Videos</Text>
            </LinearGradient>
          </TouchableOpacity>
          <TouchableOpacity
            style={{width: '48%'}}
            onPress={() => {
              setTab('markedVideos');
            }}>
            <LinearGradient
              start={{x: 0, y: 0}}
              end={{x: 1, y: 0}}
              colors={
                tab === 'markedVideos'
                  ? [
                      '#FFAD00',
                      '#FFD273',
                      '#E19A04',
                      '#FACF75',
                      '#E7A725',
                      '#FFAD00',
                    ]
                  : ['#7a7777', '#7a7779']
              }
              style={styles.linearGradient}>
              <Text style={styles.headerText}>Marked Videos</Text>
            </LinearGradient>
          </TouchableOpacity>
        </View>
        {tab === 'allVideos'
          ? videos?.videos?.map(video => {
              return (
                <Marking options={options} video={video?.judge_videos?.video} />
              );
            })
          : videos?.selectedVideos?.map(video => {
              return <Marking video={video?.judge_videos?.video} />;
            })}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  headerText: {
    fontSize: 15,
    padding: 3,
    fontWeight: 'bold',
    color: '#000',
  },
  input: {
    height: 40,
    marginVertical: 12,
    borderWidth: 1,
    padding: 10,
    borderColor: '#E19A04',
    borderRadius: 5,
    color: '#fff',
  },
  linearGradient: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 5,
    borderRadius: 3,
    height: 35,
  },
  buttonText: {
    fontSize: 15,
    padding: 3,
    fontWeight: 'bold',
    color: '#000',
  },
});
