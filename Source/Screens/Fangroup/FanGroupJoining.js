import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ToastAndroid,
} from 'react-native';
import React, {useContext} from 'react';
import AppUrl from '../../RestApi/AppUrl';
import Icon from 'react-native-vector-icons/FontAwesome';
import axios from 'axios';
import {AuthContext} from '../../Constants/context';

const item = ({item}) => {
  const {axiosConfig} = useContext(AuthContext);
  const handleAdd = () => {
    axios.post(AppUrl.fanGroupMember, axiosConfig).then(res => {
      if (res.data === 200) {
        ToastAndroid.show('User Added', ToastAndroid.SHORT);
      }
    });
  };
  return (
    <View
      style={{flexDirection: 'row', borderWidth: 1, borderBottomColor: 'gray'}}>
      <View style={{width: '43%', backgroundColor: '#A8A8A8', padding: 5}}>
        <Text style={styles.tableValue}>
          {item?.user?.first_name}{' '}
          {item?.user?.last_name && item?.user?.last_name}
        </Text>
      </View>

      <View style={{width: '43%', backgroundColor: '#A8A8A8', padding: 5}}>
        <Text style={styles.tableValue}>{item?.star_name}</Text>
      </View>

      <TouchableOpacity
        onPress={handleAdd}
        style={{width: '14%', backgroundColor: '#A8A8A8', padding: 5}}>
        <Text style={styles.tableValue}>
          <Icon name="plus-circle" size={20} color="black" />
        </Text>
      </TouchableOpacity>
    </View>
  );
};
export default function FanGroupJoining({fanMember}) {
  console.log('fanMember------', fanMember);

  return (
    <View style={{marginVertical: 20, marginHorizontal: 10}}>
      <View style={{backgroundColor: '#000'}}>
        <Text style={{fontSize: 18, color: '#fff', marginVertical: 10}}>
          Approve Joining Member
        </Text>
        <View>
          <View style={{flexDirection: 'row'}}>
            <View style={styles.tableHeaderContainer}>
              <Text style={styles.tableHeader}>Members Name</Text>
            </View>
            <View style={styles.tableHeaderContainer}>
              <Text style={styles.tableHeader}>Own Star Name</Text>
            </View>
            <View style={{width: '14%', backgroundColor: '#3A3A3A'}}>
              <Text style={styles.tableHeader}>Action</Text>
            </View>
          </View>
          <FlatList
            data={fanMember}
            renderItem={item}
            keyExtractor={(item, index) => index.toString()}></FlatList>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  tableHeaderContainer: {
    width: '43%',
    backgroundColor: '#3A3A3A',
  },
  tableHeader: {
    color: 'white',
    fontSize: 15,
    textAlign: 'center',
  },
  tableValue: {
    color: 'black',
    fontSize: 14,
    textAlign: 'center',
  },
});
