import {Image, ScrollView, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import imagePath from '../../Constants/imagePath';
import {TouchableOpacity} from 'react-native-gesture-handler';
import LinearGradient from 'react-native-linear-gradient';
import MainNavigationString from '../../Constants/MainNavigationString';
import Card from '../../Components/Fangroup/Card';
import CustomHeader from '../../Components/CustomHeader';

const AllDataFanGroup = ({navigation, route}) => {
  const {data, type} = route.params;
  console.log('data', data);
  return (
 <>
 <CustomHeader backFunc={()=>navigation.goBack()} />
     <ScrollView style={{flex: 1, backgroundColor: 'black'}}>
      {data?.map(post => {
        return <Card post={post} type={type} />;
      })}
    </ScrollView>
 </>
  );
};

export default AllDataFanGroup;

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
