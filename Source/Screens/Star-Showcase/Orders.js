import {View, Text, StyleSheet, TouchableOpacity, Image} from 'react-native';
import React from 'react';
import {FlatList} from 'react-native';
import styles from '../Dashboard/styles';
import Icon from 'react-native-vector-icons/FontAwesome';
import AppUrl from '../../RestApi/AppUrl';

const data = [
  {
    id: 1,
    img: 'mm',
    name: 'nazim',
    mobile: '018913818',
    country: 'Bangladesh',
    state: 'Dhaka',
    City: 'Dhaka',
  },
];

const item = ({item}) => {
  return (
    <View
      style={{flexDirection: 'row', borderWidth: 1, borderBottomColor: 'gray'}}>
      <View style={{width: '5%', backgroundColor: '#A8A8A8', padding: 5}}>
        <Text style={Styles.tableValue}>{item?.id}</Text>
      </View>
      <View style={{width: '12.5%', backgroundColor: '#A8A8A8', padding: 5}}>
        <Image
          source={{uri: `${AppUrl.MediaBaseUrl}${item?.user?.image}`}}
          style={{height: 30, width: 30, borderRadius: 50}}
        />
      </View>
      <View style={{width: '12.5%', backgroundColor: '#A8A8A8', padding: 5}}>
        <Text style={Styles.tableValue}>{item?.name}</Text>
      </View>
      <View style={{width: '17.5%', backgroundColor: '#A8A8A8', padding: 5}}>
        <Text style={Styles.tableValue}>{item?.mobile_no}</Text>
      </View>
      <View style={{width: '15.5%', backgroundColor: '#A8A8A8', padding: 5}}>
        <Text style={Styles.tableValue}>{item?.country?.name}</Text>
      </View>
      <View style={{width: '12.5%', backgroundColor: '#A8A8A8', padding: 5}}>
        <Text style={Styles.tableValue}>{item?.city?.name}</Text>
      </View>
      <View style={{width: '12.5%', backgroundColor: '#A8A8A8', padding: 5}}>
        <Text style={Styles.tableValue}>{item?.city?.name}</Text>
      </View>
      <TouchableOpacity
        style={{width: '12.5%', backgroundColor: '#A8A8A8', padding: 5}}>
        <Text style={Styles.tableValue}>
          {' '}
          <Icon name="eye" size={15} color="black" />
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const Orders = ({route}) => {
  const {orders} = route.params;
  console.log('orders', orders);
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: 'black',
      }}>
      <View style={{flexDirection: 'row'}}>
        <View style={{width: '5%', backgroundColor: '#3A3A3A'}}>
          <Text style={Styles.tableHeader}>SL</Text>
        </View>
        <View style={Styles.tableHeaderContainer}>
          <Text style={Styles.tableHeader}>Image</Text>
        </View>
        <View style={Styles.tableHeaderContainer}>
          <Text style={Styles.tableHeader}>Name</Text>
        </View>
        <View style={{width: '17.5%', backgroundColor: '#3A3A3A'}}>
          <Text style={Styles.tableHeader}>Mobile</Text>
        </View>
        <View style={{width: '15.5%', backgroundColor: '#3A3A3A'}}>
          <Text style={Styles.tableHeader}>Country</Text>
        </View>
        <View style={Styles.tableHeaderContainer}>
          <Text style={Styles.tableHeader}>State</Text>
        </View>
        <View style={Styles.tableHeaderContainer}>
          <Text style={Styles.tableHeader}>City</Text>
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

export default Orders;
const Styles = StyleSheet.create({
  tableHeaderContainer: {
    width: '12.5%',
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
