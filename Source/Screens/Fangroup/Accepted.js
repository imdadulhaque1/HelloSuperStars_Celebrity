import {Image, ScrollView, StyleSheet, Text, View,SafeAreaView} from 'react-native';
import React from 'react';
import imagePath from '../../Constants/imagePath';
import {TouchableOpacity} from 'react-native-gesture-handler';
import LinearGradient from 'react-native-linear-gradient';
import MainNavigationString from '../../Constants/MainNavigationString';
import AppUrl from '../../RestApi/AppUrl';
import moment from 'moment';
import CustomHeader from '../../Components/CustomHeader';
const Accepted = ({navigation, route}) => {
  const {data} = route.params;
  console.log(data);
  return (
    <SafeAreaView style={{flex:1,backgroundColor:'#000'}}>
    <CustomHeader backFunc={()=>navigation.goBack()} />
    <ScrollView style={styles.container}>
      {data?.map(post => {
        return (
          <TouchableOpacity
            onPress={() =>
              navigation.navigate(MainNavigationString.DETAILSFANGROUP, {
                slug: post?.slug,
              })
            }
            style={{margin: 10, backgroundColor: '#2D2D2D', borderRadius: 5}}>
            <View style={{margin: 10}}>
              <Image
                source={{uri: AppUrl.MediaBaseUrl + post?.banner}}
                style={{width: '100%', resizeMode: 'stretch', height: 200}}
              />
            </View>
            <Text style={styles.fontStyle}>{post?.group_name}</Text>

            <View style={{margin: 10}}>
              <LinearGradient
                colors={['#FED703', '#FDAB2E']}
                style={{borderRadius: 10, padding: 8}}>
                <Text style={{color: 'white', textAlign: 'center'}}>
                  {moment(post?.start_date).format('LL')} -
                  {moment(post?.end_date).format('LL')}
                </Text>
              </LinearGradient>
            </View>
          </TouchableOpacity>
        );
      })}
    </ScrollView>
</SafeAreaView>
  );
};

export default Accepted;

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'black',
    flex: 1,
  },
  fontStyle: {
    color: 'white',
    marginHorizontal: 10,
    marginBottom: 10,
    fontSize: 20,
    textAlign: 'center',
  },
});
