import { ScrollView, Switch, StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import React, { useState } from 'react';

import Icon from 'react-native-vector-icons/FontAwesome';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import CustomHeader from '../../Components/CustomHeader';
import TitleHeader from '../../Components/TitleHeader';
import MainNavigationString from '../../Constants/MainNavigationString';

const Setting = ({ navigation }) => {
  const [isEnabled, setIsEnabled] = useState(false);
  const toggleSwitch = () => setIsEnabled(previousState => !previousState);

  return (
    <>
      <CustomHeader title={'Settings'} backFunc={() => navigation.goBack()} />
      <ScrollView style={styles.container}>
        <TitleHeader title={'Terms & Conditions'} />

        <View style={{
          backgroundColor: '#232323',
          justifyContent: 'center',
          alignContent: 'center',
          padding: 8,
          paddingLeft: 10,
          borderRadius: 10,
          marginVertical: 10
        }}>

          <Text style={{ color: 'white', fontSize: 13, }}>
            According to a media report, two directors of People’s Bank, who are awaiting license from Bangladesh Bank, are going to be owned by the poster boy of Bangladesh Cricket. Not only Shakib Al Hasan, his mother Shirin Akhter is also the director of the bank. People’s Bank authorities have sent the relevant documents to Bangladesh Bank.
          </Text>

        </View>




        <TitleHeader title={'Update Profile'} />
        <View style={styles.ContainerCard2}>



          <TouchableOpacity onPress={()=>navigation.navigate(MainNavigationString.PERSONALINFO)}>
            <View style={styles.ContentX}>
              <View>
                <Text style={styles.Edit}>Personal Information</Text>
              </View>
              <View>
                <Text><Icon name="angle-right" size={20} color="white" /></Text>
              </View>
            </View>
          </TouchableOpacity>

          <TouchableOpacity onPress={()=>navigation.navigate(MainNavigationString.EDITNAME)}>
            <View style={styles.ContentX}>
              <View>
                <Text style={styles.Edit}>Update Name</Text>
              </View>
              <View>
                <Text><Icon name="angle-right" size={20} color="white" /></Text>
              </View>
            </View>
          </TouchableOpacity>

          <TouchableOpacity onPress={()=>navigation.navigate(MainNavigationString.EDITPASSWORD)}>
            <View style={styles.ContentX}>
              <View>
                <Text style={styles.Edit}>Update Password</Text>
              </View>
              <View>
                <Text><Icon name="angle-right" size={20} color="white" /></Text>
              </View>
            </View>
          </TouchableOpacity>



        </View>




      </ScrollView>
    </>
  );
};

export default Setting;

const styles = StyleSheet.create({
  container: {
    padding: 8,
    backgroundColor: '#000',
  },

  ContainerCard: {
    backgroundColor: '#232323',
    marginBottom: 3,
    justifyContent: 'center',
    alignContent: 'center',
    borderTopLeftRadius: 10,
    borderTopEndRadius: 10,
    padding: 8,
    paddingLeft: 10,
  },

  TextHeder: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 19,
  },

  ContainerCard2: {
    backgroundColor: '#232323',
    justifyContent: 'center',
    alignContent: 'center',
    padding: 8,
    paddingLeft: 10,
    borderRadius: 10,
    marginVertical: 10,
  
  },

  ContainerCard3: {
    backgroundColor: '#232323',
    marginBottom: 20,
    justifyContent: 'center',
    alignContent: 'center',
    borderBottomLeftRadius: 10,
    borderBottomEndRadius: 10,
    padding: 8,
    paddingLeft: 10,
  },

  Content: {
    borderBottomColor: 'gray',
    borderBottomWidth: 0.5,

  },
  Text: {
    color: 'white',
    fontSize: 15,
    fontWeight: 'bold',
    paddingBottom: 8,
    color: '#ffaa00'
  },

  ContentX: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomColor:'gray',
    borderBottomWidth:0.5,
    marginHorizontal:10
  },
  Edit: {
    color: 'white',
    fontSize: 13,


  }
});