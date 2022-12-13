import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useContext, useState} from 'react';
import VideoPlayer from 'react-native-video-player';
import LinearGradient from 'react-native-linear-gradient';
import imagePath from '../../Constants/imagePath';
import axios from 'axios';
import AppUrl from '../../RestApi/AppUrl';
import {AuthContext} from '../../Constants/context';
import {useNavigation} from '@react-navigation/native';

export default function Marking({options, video}) {
  const navigation = useNavigation();
  console.log('video', video);
  const [marks, setMarks] = useState(null);
  const [comments, setComments] = useState(null);
  const {axiosConfig} = useContext(AuthContext);
  const onSubmitMarks = () => {
    const data = {
      audition_uploads_video_id: video?.audition_uploads_video_id,
      audition_id: video?.audition_id,
      round_info_id: video?.round_info_id,
      judge_mark: marks,
      judge_comment: comments,
    };
    axios.post(AppUrl.videoMarking, data, axiosConfig).then(res => {
      if (res.data.status === 200) {
        setMarks(null);
        setComments(null);
        navigation.goBack();
      }
    });
    console.log(marks);
    console.log(comments);
  };
  return (
    <View
      style={{
        margin: 5,
        borderWidth: 3,
        borderRadius: 8,
        padding: 20,
      }}>
      <VideoPlayer
        video={{
          uri: AppUrl.MediaBaseUrl + video,
        }}
        videoWidth={160}
        videoHeight={90}
        thumbnail={imagePath.videoThumb}
      />
      {options === 'marking' && (
        <View>
          <TextInput
            style={styles.input}
            onChangeText={setMarks}
            value={marks}
            placeholder="Marks"
            keyboardType="numeric"
            placeholderTextColor={'#9e9e9e'}
          />
          <TextInput
            style={styles.input}
            onChangeText={setComments}
            value={comments}
            placeholder="Comments"
            keyboardType="numeric"
            placeholderTextColor={'#9e9e9e'}
          />
          <TouchableOpacity
            onPress={() => {
              onSubmitMarks();
            }}>
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
              style={styles.linearGradient}>
              <Text style={styles.buttonText}>Submit</Text>
            </LinearGradient>
          </TouchableOpacity>
        </View>
      )}
    </View>
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
