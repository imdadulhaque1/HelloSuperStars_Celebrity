import { ScrollView, StyleSheet, Text, TouchableOpacity } from 'react-native';
import React, { useState } from 'react';

import { useNavigation } from '@react-navigation/native';
import CustomHeader from '../../Components/CustomHeader';
import TitleHeader from '../../Components/TitleHeader';
import { Button } from 'react-native'
import DatePicker from 'react-native-date-picker'
import { View } from 'react-native-animatable';
import moment from 'moment/moment';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import MainNavigationString from '../../Constants/MainNavigationString';
import * as Animatable from 'react-native-animatable'
import LinearGradient from 'react-native-linear-gradient';
const Schedule = ({ navigation }) => {
     const Navigation = useNavigation();
     const [date, setDate] = useState(new Date())
     const [open, setOpen] = useState(false)
     return (
          <>
               <CustomHeader backFunc={() => navigation.goBack()} title='Schedule' />
               <ScrollView style={styles.container}>
                   <View style={{marginHorizontal:10}}>
                   <TitleHeader title={'Schedule Information'} />
                   </View>




           












                    <View style={{ marginHorizontal: 10 }}>
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
                style={{marginTop:10}}
               >
                
                <View style={{ flexDirection: 'row', }}>
                              <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                                   <Text style={{ color: 'black', padding: 3, fontWeight: 'bold' }}>Date</Text>
                              </View>
                              <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                                   <Text style={{ color: 'black', padding: 3, fontWeight: 'bold' }}>Type</Text>
                              </View>
                              <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                                   <Text style={{ color: 'black', padding: 3, fontWeight: 'bold' }}>Duration</Text>
                              </View>

                              <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                                   <Text style={{ color: 'black', padding: 3, fontWeight: 'bold' }}>Action</Text>
                              </View>




                         </View>

              </LinearGradient>
                       
                         {[1, 2, 3, 4, 5].map((item, index) => {
                              return <View key={item} style={{ backgroundColor: '#202020', flexDirection: 'row', }}>
                                   <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                                        <Text style={{ color: '#fff', padding: 3, fontSize: 12 }}>11-12-22</Text>
                                   </View>
                                   <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                                        <Text style={{ color: '#fff', padding: 3, fontSize: 12 }}>Live Chat</Text>
                                   </View>
                                   <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                                        <Text style={{ color: '#fff', padding: 3, fontSize: 12 }}>9.53am - 10.58am</Text>
                                   </View>
                                   <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', padding: 2 }}>
                                        <TouchableOpacity style={{backgroundColor:'#ffaa00',padding:3,borderRadius:100}}>
                                        <MaterialIcons name='delete' size={20} color='#000' />
                                        </TouchableOpacity>
                                   </View>

                              </View>
                         })}
                    </View>





               </ScrollView>
             
               <TouchableOpacity onPress={()=>navigation.navigate(MainNavigationString.SCHEDULESFORM)} style={{ height: 50, width: 50, backgroundColor: '#ffaa00', borderRadius: 100, position: 'absolute', bottom: 0, right: 0,justifyContent:'center',alignItems:'center',margin:10 }}>
               
                    <Text style={{fontSize:30,color:'white'}}>+</Text>
               </TouchableOpacity>
             
          </>
     );
};

export default Schedule;

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
          marginBottom: 20,
          justifyContent: 'center',
          alignContent: 'center',
          borderBottomLeftRadius: 10,
          borderBottomEndRadius: 10,
          padding: 8,
          paddingLeft: 10,
     },
     Content: {
          flexDirection: 'row',
          backgroundColor: '#000',
          borderRadius: 10,
          padding: 12,
          marginBottom: 10,
     },
     Text: {
          color: 'white',
          paddingTop: 5,
          paddingLeft: 20,
          fontSize: 16,
          fontWeight: 'bold',
     },
});
