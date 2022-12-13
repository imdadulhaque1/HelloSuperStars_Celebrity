
import React, { Fragment, useState } from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Image,
  TextInput
} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import imagePath from '../../Constants/imagePath';
import CustomHeader from '../../Components/CustomHeader';
import TitleHeader from '../../Components/TitleHeader';
import LinearGradient from 'react-native-linear-gradient';


const Wallet = ({ navigation }) => {
  const [open, setOpen] = useState(false);


  return (
    <>
      <CustomHeader backFunc={() => navigation.goBack()} title='Wallet' />
      <ScrollView style={styles.container}>
        <View style={{ margin: 10 }}>

          <TitleHeader title={'Wallet Information'} />
          <View style={{ backgroundColor: '#202020', marginVertical: 10, paddingVertical: 10, borderRadius: 20, flexDirection: 'column', }}>
            <View style={{ margin: 10 }}>
              <Text style={{ color: 'white', fontSize: 15, fontWeight: 'bold', textAlign: 'center' }}> SHAKIB AL HASAN </Text>
            </View>
            <View style={{ margin: 10, flexDirection: 'row', justifyContent: 'space-around' }}>
              <View>
                <Text style={{ color: 'white', fontSize: 25, fontWeight: 'bold', color: '#ffaa00' }}> $8,450.00 </Text>
                <Text style={{ color: 'white', fontSize: 14 }}> Total Balance </Text>
              </View>
              <View style={{ borderWidth: 1, borderLeftColor: 'gray' }}></View>
              <View >
                <Text style={{ color: 'white', fontSize: 25, fontWeight: 'bold', }}> $2975 </Text>
                <Text style={{ color: 'white', fontSize: 14 }}> Your Profit </Text>
              </View>
            </View>

            {!open &&

              <TouchableOpacity onPress={() => setOpen(true)} >
                <LinearGradient
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 0 }}
                  colors={[
                    '#FFAD00',
                    '#FFD273',
                    '#E19A04',
                    '#FACF75',
                    '#E7A725',
                    '#FFAD00',
                  ]}
                  style={{ marginHorizontal: 100, borderRadius: 10, paddingVertical: 10, }}
                >
                  <Text style={{ color: 'black', textAlign: 'center', fontWeight: 'bold' }}>Withdraw</Text>
                </LinearGradient>


                {/* <Text style={{ color: 'white', marginRight: 5 }}><MaterialIcons name='keyboard-arrow-down' size={20} /></Text> */}
              </TouchableOpacity>}
            {open &&

              <Fragment>
                <View style={{ borderWidth: 1, borderColor: '#ffaa00', borderRadius: 25, marginHorizontal: 100, marginVertical: 5 }}>

                  <TextInput keyboardType='numeric' placeholder='Withdraw ammount' placeholderTextColor={'white'} style={{ color: 'white', width: '100%', padding: 5, marginLeft: 5 }} />

                </View>
                <View style={{ marginHorizontal: 100, borderRadius: 10, paddingVertical: 13, flexDirection: 'row', justifyContent: 'space-around' }}>
                  <TouchableOpacity onPress={() => alert('Transaction conformed')} style={{ backgroundColor: '#198452', padding: 8, borderRadius: 10 }}>
                    <Text style={{ color: 'white', fontSize: 13 }}>Confirm</Text>
                  </TouchableOpacity>
                  <TouchableOpacity onPress={() => setOpen(false)} style={{ backgroundColor: '#D9535F', padding: 8, borderRadius: 10 }}>
                    <Text style={{ color: 'white', fontSize: 13 }}>Cancel</Text>
                  </TouchableOpacity>

                </View>
              </Fragment>

            }


          </View>


          <TitleHeader title={'Transaction Info'} />

          {/* =================Table content start here ============= */}


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
                
                <View style={{  flexDirection: 'row', }}>
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
              <Text style={{ color: 'black', padding: 3, fontWeight: 'bold' }}>#Transaction Id</Text>
            </View>
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
              <Text style={{ color: 'black', padding: 3, fontWeight: 'bold' }}>Ammount</Text>
            </View>
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
              <Text style={{ color: 'black', padding: 3, fontWeight: 'bold' }}>Status</Text>
            </View>

          </View>

              </LinearGradient>

        
          {[1, 2, 3, 4, 5].map((item, index) => {
            return <View key={item} style={{ backgroundColor: '#202020', flexDirection: 'row', }}>
              <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <Text style={{ color: '#fff', padding: 3, }}>{index}. 7432847</Text>
              </View>
              <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <Text style={{ color: '#fff', padding: 3, }}>$300</Text>
              </View>
              <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <Text style={{ color: '#fff', padding: 3, }}>{index % 2 === 0 ? 'Success' : 'Pending'}</Text>
              </View>

            </View>
          })}

          {/* =================Table content start here ============= */}


          <TitleHeader title={'Sector of Earning'} />

          <View style={{ backgroundColor: '#202020', marginVertical: 10, borderRadius: 10 }}>


            <View style={{ margin: 10 }}>
              <View
                style={{
                  flexDirection: 'row',
                  backgroundColor: '#000',
                  padding: 8,
                  borderRadius: 10,
                  marginVertical: 8,
                }}>
                <View style={{ flex: 1 }}>
                  <Image
                    source={imagePath.Post}
                    style={{ width: 20, height: 20 }}
                  />
                </View>
                <View style={{ flex: 2 }}>
                  <Text style={{ color: '#fff' }}>Post</Text>
                </View>
                <View style={{ flex: 2, flexDirection: 'row' }}>
                  <AntDesign name={'caretup'} color={'#ffad00'} size={20} />
                  <Text style={{ color: '#fff', marginHorizontal: 5 }}>$523</Text>
                </View>
                <View style={{ flex: 2 }}>
                  <View style={{ flexDirection: 'row' }}>
                    <AntDesign name={'caretup'} color={'#ffad00'} size={20} />
                    <Text style={{ color: '#fff', marginHorizontal: 5 }}>$523</Text>
                  </View>
                </View>
                <View
                  style={{
                    flex: 2,
                    flexDirection: 'row',
                    justifyContent: 'flex-end',
                  }}>
                  <Text style={{ color: '#ffad00', fontWeight: 'bold' }}>$ 75</Text>
                </View>
              </View>
              <View
                style={{
                  flexDirection: 'row',
                  backgroundColor: '#000',
                  padding: 8,
                  borderRadius: 10,
                  marginVertical: 8,
                }}>
                <View style={{ flex: 1 }}>
                  <Image
                    source={imagePath.Auditions}
                    style={{ width: 20, height: 20 }}
                  />
                </View>
                <View style={{ flex: 2 }}>
                  <Text style={{ color: '#fff' }}>Auditions</Text>
                </View>
                <View style={{ flex: 2, flexDirection: 'row' }}>
                  <AntDesign name={'caretup'} color={'#ffad00'} size={20} />
                  <Text style={{ color: '#fff', marginHorizontal: 5 }}>$523</Text>
                </View>
                <View style={{ flex: 2 }}>
                  <View style={{ flexDirection: 'row' }}>
                    <AntDesign name={'caretup'} color={'#ffad00'} size={20} />
                    <Text style={{ color: '#fff', marginHorizontal: 5 }}>$523</Text>
                  </View>
                </View>
                <View
                  style={{
                    flex: 2,
                    flexDirection: 'row',
                    justifyContent: 'flex-end',
                  }}>
                  <Text style={{ color: '#ffad00', fontWeight: 'bold' }}>$ 75</Text>
                </View>
              </View>
              <View
                style={{
                  flexDirection: 'row',
                  backgroundColor: '#000',
                  padding: 8,
                  borderRadius: 10,
                  marginVertical: 8,
                }}>
                <View style={{ flex: 1 }}>
                  <Image
                    source={imagePath.Learning}
                    style={{ width: 20, height: 20 }}
                  />
                </View>
                <View style={{ flex: 2 }}>
                  <Text style={{ color: '#fff' }}>Learning</Text>
                </View>
                <View style={{ flex: 2, flexDirection: 'row' }}>
                  <AntDesign name={'caretup'} color={'#ffad00'} size={20} />
                  <Text style={{ color: '#fff', marginHorizontal: 5 }}>$523</Text>
                </View>
                <View style={{ flex: 2 }}>
                  <View style={{ flexDirection: 'row' }}>
                    <AntDesign name={'caretup'} color={'#ffad00'} size={20} />
                    <Text style={{ color: '#fff', marginHorizontal: 5 }}>$523</Text>
                  </View>
                </View>
                <View
                  style={{
                    flex: 2,
                    flexDirection: 'row',
                    justifyContent: 'flex-end',
                  }}>
                  <Text style={{ color: '#ffad00', fontWeight: 'bold' }}>$ 75</Text>
                </View>
              </View>
              <View
                style={{
                  flexDirection: 'row',
                  backgroundColor: '#000',
                  padding: 8,
                  borderRadius: 10,
                  marginVertical: 8,
                }}>
                <View style={{ flex: 1 }}>
                  <Image
                    source={imagePath.Meetup}
                    style={{ width: 20, height: 20 }}
                  />
                </View>
                <View style={{ flex: 2 }}>
                  <Text style={{ color: '#fff' }}>Meetup</Text>
                </View>
                <View style={{ flex: 2, flexDirection: 'row' }}>
                  <AntDesign name={'caretup'} color={'#ffad00'} size={20} />
                  <Text style={{ color: '#fff', marginHorizontal: 5 }}>$523</Text>
                </View>
                <View style={{ flex: 2 }}>
                  <View style={{ flexDirection: 'row' }}>
                    <AntDesign name={'caretup'} color={'#ffad00'} size={20} />
                    <Text style={{ color: '#fff', marginHorizontal: 5 }}>$523</Text>
                  </View>
                </View>
                <View
                  style={{
                    flex: 2,
                    flexDirection: 'row',
                    justifyContent: 'flex-end',
                  }}>
                  <Text style={{ color: '#ffad00', fontWeight: 'bold' }}>$ 75</Text>
                </View>
              </View>
              <View
                style={{
                  flexDirection: 'row',
                  backgroundColor: '#000',
                  padding: 8,
                  borderRadius: 10,
                  marginVertical: 8,
                }}>
                <View style={{ flex: 1 }}>
                  <Image
                    source={imagePath.Post}
                    style={{ width: 20, height: 20 }}
                  />
                </View>
                <View style={{ flex: 2 }}>
                  <Text style={{ color: '#fff' }}>Live Chat</Text>
                </View>
                <View style={{ flex: 2, flexDirection: 'row' }}>
                  <AntDesign name={'caretup'} color={'#ffad00'} size={20} />
                  <Text style={{ color: '#fff', marginHorizontal: 5 }}>$523</Text>
                </View>
                <View style={{ flex: 2 }}>
                  <View style={{ flexDirection: 'row' }}>
                    <AntDesign name={'caretup'} color={'#ffad00'} size={20} />
                    <Text style={{ color: '#fff', marginHorizontal: 5 }}>$523</Text>
                  </View>
                </View>
                <View
                  style={{
                    flex: 2,
                    flexDirection: 'row',
                    justifyContent: 'flex-end',
                  }}>
                  <Text style={{ color: '#ffad00', fontWeight: 'bold' }}>$ 75</Text>
                </View>
              </View>
              <View
                style={{
                  flexDirection: 'row',
                  backgroundColor: '#000',
                  padding: 8,
                  borderRadius: 10,
                  marginVertical: 8,
                }}>
                <View style={{ flex: 1 }}>
                  <Image source={imagePath.QA} style={{ width: 20, height: 20 }} />
                </View>
                <View style={{ flex: 2 }}>
                  <Text style={{ color: '#fff' }}>Q&A</Text>
                </View>
                <View style={{ flex: 2, flexDirection: 'row' }}>
                  <AntDesign name={'caretup'} color={'#ffad00'} size={20} />
                  <Text style={{ color: '#fff', marginHorizontal: 5 }}>$523</Text>
                </View>
                <View style={{ flex: 2 }}>
                  <View style={{ flexDirection: 'row' }}>
                    <AntDesign name={'caretup'} color={'#ffad00'} size={20} />
                    <Text style={{ color: '#fff', marginHorizontal: 5 }}>$523</Text>
                  </View>
                </View>
                <View
                  style={{
                    flex: 2,
                    flexDirection: 'row',
                    justifyContent: 'flex-end',
                  }}>
                  <Text style={{ color: '#ffad00', fontWeight: 'bold' }}>$ 75</Text>
                </View>
              </View>
              <View
                style={{
                  flexDirection: 'row',
                  backgroundColor: '#000',
                  padding: 8,
                  borderRadius: 10,
                  marginVertical: 8,
                }}>
                <View style={{ flex: 1 }}>
                  <Image
                    source={imagePath.Live}
                    style={{ width: 20, height: 20 }}
                  />
                </View>
                <View style={{ flex: 2 }}>
                  <Text style={{ color: '#fff' }}>Live</Text>
                </View>
                <View style={{ flex: 2, flexDirection: 'row' }}>
                  <AntDesign name={'caretup'} color={'#ffad00'} size={20} />
                  <Text style={{ color: '#fff', marginHorizontal: 5 }}>$523</Text>
                </View>
                <View style={{ flex: 2 }}>
                  <View style={{ flexDirection: 'row' }}>
                    <AntDesign name={'caretup'} color={'#ffad00'} size={20} />
                    <Text style={{ color: '#fff', marginHorizontal: 5 }}>$523</Text>
                  </View>
                </View>
                <View
                  style={{
                    flex: 2,
                    flexDirection: 'row',
                    justifyContent: 'flex-end',
                  }}>
                  <Text style={{ color: '#ffad00', fontWeight: 'bold' }}>$ 75</Text>
                </View>
              </View>

              <View
                style={{
                  flexDirection: 'row',
                  backgroundColor: '#000',
                  padding: 8,
                  borderRadius: 10,
                  marginVertical: 8,
                }}>
                <View style={{ flex: 1 }}>
                  <Image
                    source={imagePath.Greeting}
                    style={{ width: 20, height: 20 }}
                  />
                </View>
                <View style={{ flex: 2 }}>
                  <Text style={{ color: '#fff' }}>Greeting</Text>
                </View>
                <View style={{ flex: 2, flexDirection: 'row' }}>
                  <AntDesign name={'caretup'} color={'#ffad00'} size={20} />
                  <Text style={{ color: '#fff', marginHorizontal: 5 }}>$523</Text>
                </View>
                <View style={{ flex: 2 }}>
                  <View style={{ flexDirection: 'row' }}>
                    <AntDesign name={'caretup'} color={'#ffad00'} size={20} />
                    <Text style={{ color: '#fff', marginHorizontal: 5 }}>$523</Text>
                  </View>
                </View>
                <View
                  style={{
                    flex: 2,
                    flexDirection: 'row',
                    justifyContent: 'flex-end',
                  }}>
                  <Text style={{ color: '#ffad00', fontWeight: 'bold' }}>$ 75</Text>
                </View>
              </View>
              <View
                style={{
                  flexDirection: 'row',
                  backgroundColor: '#000',
                  padding: 8,
                  borderRadius: 10,
                  marginVertical: 8,
                }}>
                <View style={{ flex: 1 }}>
                  <Image
                    source={imagePath.Greeting}
                    style={{ width: 20, height: 20 }}
                  />
                </View>
                <View style={{ flex: 2 }}>
                  <Text style={{ color: '#fff' }}>Fan Group</Text>
                </View>
                <View style={{ flex: 2, flexDirection: 'row' }}>
                  <AntDesign name={'caretup'} color={'#ffad00'} size={20} />
                  <Text style={{ color: '#fff', marginHorizontal: 5 }}>$523</Text>
                </View>
                <View style={{ flex: 2 }}>
                  <View style={{ flexDirection: 'row' }}>
                    <AntDesign name={'caretup'} color={'#ffad00'} size={20} />
                    <Text style={{ color: '#fff', marginHorizontal: 5 }}>$523</Text>
                  </View>
                </View>
                <View
                  style={{
                    flex: 2,
                    flexDirection: 'row',
                    justifyContent: 'flex-end',
                  }}>
                  <Text style={{ color: '#ffad00', fontWeight: 'bold' }}>$ 75</Text>
                </View>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
    </>
  );
};

export default Wallet;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  underLineBlack: {
    borderBottomColor: '#000',
    borderWidth: 1,
    marginBottom: 8,
  },
  amount: {
    color: '#ffad00',
    fontWeight: 'bold',
    fontSize: 18,
  },
  flexAmount: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    margin: 8,
  },
  underLineWhite: {
    borderBottomColor: '#fff',
    borderWidth: 1,
    marginHorizontal: 8,
  },
  amountView: {
    flexDirection: 'row',
  },
  flexOne: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
  },
  createMeetupRow: {
    flexDirection: 'row',
    backgroundColor: '#202020',
    borderRadius: 15,
    padding: 8,
  },
});
