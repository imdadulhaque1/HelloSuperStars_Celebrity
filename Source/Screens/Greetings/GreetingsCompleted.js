import {View, Text, StyleSheet, TouchableOpacity, Image} from 'react-native';
import React from 'react';
import {FlatList} from 'react-native';
import styles from '../Dashboard/styles';
import Icon from 'react-native-vector-icons/FontAwesome';
import AppUrl from '../../RestApi/AppUrl';
import moment from 'moment';

const item = ({item}) => {
  return (
    <View
      style={{flexDirection: 'row', borderWidth: 1, borderBottomColor: 'gray'}}>
      <View style={Styles.cellContainer}>
        <Image
          source={{uri: `${AppUrl.MediaBaseUrl}${item?.user?.image}`}}
          style={{height: 30, width: 30, borderRadius: 50}}
        />
      </View>
      <View style={Styles.cellContainer}>
        <Text style={Styles.tableValue}>{item?.name}</Text>
      </View>
      <View style={Styles.cellContainer}>
        <Text style={Styles.tableValue}>{item?.user?.phone}</Text>
      </View>
      <View style={Styles.cellContainer}>
        <Text style={Styles.tableValue}>
          {moment(item?.request_time).format('LL')}
        </Text>
      </View>
      <View style={Styles.cellContainer}>
        <Text style={Styles.tableValue}>
          {moment(item?.request_time).format('hh:mm a')}
        </Text>
      </View>
      <View style={Styles.cellContainer}>
        <Text style={Styles.tableValue}>{item?.purpose}</Text>
      </View>
      <TouchableOpacity style={Styles.cellContainer}>
        <Text style={Styles.tableValue}>
          {' '}
          <Icon name="eye" size={15} color="black" />
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const GreetingsCompleted = ({route}) => {
  const {orders} = route.params;
  console.log('orders', orders);
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: 'black',
      }}>
      <View style={{flexDirection: 'row'}}>
        <View style={Styles.tableHeaderContainer}>
          <Text style={Styles.tableHeader}>Image</Text>
        </View>
        <View style={Styles.tableHeaderContainer}>
          <Text style={Styles.tableHeader}>Name</Text>
        </View>
        <View style={Styles.tableHeaderContainer}>
          <Text style={Styles.tableHeader}>Mobile</Text>
        </View>
        <View style={Styles.tableHeaderContainer}>
          <Text style={Styles.tableHeader}>Date</Text>
        </View>
        <View style={Styles.tableHeaderContainer}>
          <Text style={Styles.tableHeader}>Time</Text>
        </View>
        <View style={Styles.tableHeaderContainer}>
          <Text style={Styles.tableHeader}>Type</Text>
        </View>
        <View style={Styles.tableHeaderContainer}>
          <Text style={Styles.tableHeader}>Action</Text>
        </View>
      </View>
      <FlatList
        data={orders}
        renderItem={item}
        keyExtractor={(item, index) => index.toString()}></FlatList>
    </View>
  );
};

export default GreetingsCompleted;
const Styles = StyleSheet.create({
  tableHeaderContainer: {
    width: '14.28%',
    backgroundColor: '#3A3A3A',
  },
  cellContainer: {
    width: '14.28%',
    backgroundColor: '#3A3A3A',
  },
  tableHeader: {
    color: 'white',
    fontSize: 14,
  },
  tableValue: {
    color: 'black',
    fontSize: 13,
  },
});
