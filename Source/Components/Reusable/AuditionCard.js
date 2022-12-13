import {
  Button,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import AppUrl from '../../RestApi/AppUrl';
import MainNavigationString from '../../Constants/MainNavigationString';
import {useNavigation} from '@react-navigation/native';
import LinearGradient from 'react-native-linear-gradient';
import CustomHeader from '../CustomHeader';
export default function AuditionCard({route}) {
  const Navigation = useNavigation();
  const {posts} = route.params;
  console.log(posts);
  return (
    <>
    <CustomHeader backFunc={()=>Navigation.goBack()} />
    <ScrollView style={{backgroundColor: 'black'}}>
      {posts?.map(post => {
        return (
          <View
            style={{
              backgroundColor: '#515151',
              marginVertical: 15,
              borderRadius: 10,
            }}>
            <View>
              <Image
                source={{uri: AppUrl.MediaBaseUrl + post?.banner}}
                style={{height: 250, width: '100%'}}
              />
            </View>
            <View style={{marginVertical: 5}}>
              <Text
                style={{
                  color: '#fff',
                  fontSize: 18,
                  fontWeight: 'bold',
                  fontStyle: 'italic',
                  alignSelf: 'center',
                }}>
                {post?.title}
              </Text>
            </View>
            <View style={{marginVertical: 5}}>
              <TouchableOpacity
                onPress={() => {
                  Navigation.navigate(MainNavigationString.TOTALAUDITIONS, {
                    auditionId: post?.audition?.id,
                    options: 'marking',
                  });
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
                  <Text style={styles.buttonText}>Show Uploaded Video</Text>
                </LinearGradient>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  Navigation.navigate(MainNavigationString.TOTALAUDITIONS, {
                    auditionId: post?.audition?.id,
                  });
                }}>
                <LinearGradient
                  start={{x: 0, y: 0}}
                  end={{x: 1, y: 0}}
                  colors={['#89f7fe', '#66a6ff']}
                  style={styles.linearGradient}>
                  <Text style={styles.buttonText}>View Videos</Text>
                </LinearGradient>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  Navigation.navigate(MainNavigationString.ROUNDINSTRUCTIONS, {
                    auditionId: post?.audition?.id,
                  });
                }}>
                <LinearGradient
                  start={{x: 0, y: 0}}
                  end={{x: 1, y: 0}}
                  colors={['#9be15d', '#00e3ae']}
                  style={styles.linearGradient}>
                  <Text style={styles.buttonText}>Round Instructions</Text>
                </LinearGradient>
              </TouchableOpacity>
            </View>
          </View>
        );
      })}
    </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  linearGradient: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 5,
    borderRadius: 3,
  },
  buttonText: {
    fontSize: 15,
    padding: 3,
    fontWeight: 'bold',
    color: '#000',
  },
});
