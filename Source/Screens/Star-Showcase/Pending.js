import {useNavigation} from '@react-navigation/native';
import React from 'react';

import LinearGradient from 'react-native-linear-gradient';
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  TextInput,
  useWindowDimensions,
} from 'react-native';
import {SwiperFlatList} from 'react-native-swiper-flatlist';
import imagePath from '../../Constants/imagePath';
import moment from 'moment';
import RenderHTML from 'react-native-render-html';
import AppUrl from '../../RestApi/AppUrl';
import CustomHeader from '../../Components/CustomHeader';
const Pending = ({route,navigation}) => {
  const {type, products} = route.params;
  console.log(products);
  const {width} = useWindowDimensions();
  return (
    <>
    <CustomHeader backFunc={()=>navigation.goBack()} />
      <ScrollView style={{backgroundColor: '#000'}}>
        {products?.map(product => {
          return (
            <View style={styles.Container}>
              <View style={styles.Row}>
                <View style={styles.Right}>
                  <View style={styles.Auction}>
                    <Text style={styles.TextTi}>{type}</Text>
                  </View>
                  <SwiperFlatList
                    autoplay
                    autoplayDelay={2}
                    autoplayLoop
                    width={120}>
                    <Image
                      source={{
                        uri: `${AppUrl.MediaBaseUrl + product?.product_image}`,
                      }}
                      style={styles.postImage}
                      width={120}
                      height={200}
                    />
                  </SwiperFlatList>
                </View>
                <View style={styles.Left}>
                  <Text style={styles.Text}>{product?.title}</Text>
                  <Text style={styles.Date}>
                    {moment(product?.bid_from).format('LL')} to{' '}
                    {moment(product?.bid_to).format('LL')}
                  </Text>
                  <Text style={styles.Date}>
                    Released at {moment(product?.created_at).format('LL')}
                  </Text>
                  <View style={{width: '65%', marginTop: 5}}>
                    <RenderHTML
                      contentWidth={width}
                      source={{
                        html: `<div style='color:#fff' >${product?.details
                          .slice(0, 160)
                          .concat(
                            product?.details.length > 160 ? '...' : '',
                          )}</div>`,
                      }}
                    />
                  </View>

                  <View
                    style={{
                      flexDirection: 'row',
                      width: '100%',
                      marginBottom: 10,
                    }}>
                    <View style={styles.Box}>
                      <Image source={imagePath.Sold} />
                      <Text style={styles.Count}>
                        Base Price ${product?.base_price}
                      </Text>
                    </View>
                  </View>
                </View>
              </View>

              <View style={styles.Bottom}>
                <View>
                  <View style={styles.CardView}>
                    <View>
                      <Image source={imagePath.Calender} style={{margin: 8}} />
                    </View>
                    <View>
                      <Text style={styles.DateTime}>Last Date</Text>
                      <Text style={styles.DateT}>
                        {moment(product?.bid_to).format('LL')}{' '}
                      </Text>
                    </View>
                  </View>
                </View>
                <View style={styles.Bottom}>
                  <View style={{}}>
                    <View style={styles.CardView2}>
                      <TouchableOpacity style={styles.Delete}>
                        <Image source={imagePath.Delete} />
                      </TouchableOpacity>
                    </View>
                  </View>
                </View>

                <View>
                  <TouchableOpacity>
                    <LinearGradient
                      start={{x: 0, y: 0}}
                      end={{x: 1, y: 0}}
                      colors={['#e7a825', '#e7c233', '#ffad00']}
                      style={styles.Button3}>
                      <Text style={styles.TextBold1}>Confirm</Text>
                    </LinearGradient>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          );
        })}
      </ScrollView>
    </>
  );
};

export default Pending;

const styles = StyleSheet.create({
  Container: {
    backgroundColor: '#272727',
    margin: 8,
    marginTop: 10,
    marginBottom: 0,
    borderRadius: 10,
  },
  Row: {
    flexDirection: 'row',
  },
  postImage: {
    marginTop: 10,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },

  Right: {
    margin: 8,
  },

  Left: {
    margin: 8,
    marginLeft: 0,
  },

  Text: {
    fontSize: 30,
    color: 'white',
    fontWeight: 'bold',
  },
  Date: {
    // fontSize:30,
    color: '#999999',
  },
  Edit: {
    backgroundColor: 'gold',
    width: '100%',
  },
  postImage: {
    borderRadius: 5,
    marginTop: 20,
    flex: 1,
    resizeMode: 'contain',
    marginBottom: 20,
  },

  Box: {
    flexDirection: 'row',
    backgroundColor: '#111111',
    borderRadius: 8,
    height: 30,
    marginHorizontal: 2.5,
    marginTop: 10,
    width: '60%',
    justifyContent: 'center',
    alignItems: 'center',
  },

  Delete: {
    flexDirection: 'row',
    backgroundColor: '#fff9',
    borderRadius: 8,
    height: 29,
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  Confirm: {
    flexDirection: 'row',
    backgroundColor: '#111111',
    borderRadius: 8,
    height: 30,
    marginHorizontal: 2.5,
    marginTop: 10,
    width: '38%',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },
  TextBold: {
    fontWeight: 'bold',
    color: 'black',
    fontSize: 18,
  },
  Count: {
    color: 'white',
    fontWeight: 'bold',
  },

  input: {
    color: '#fff9',
    backgroundColor: '#272727',
    marginBottom: -10,
  },
  Button3: {
    width: 110,
    marginHorizontal: 5,
    borderRadius: 5,
    marginHorizontal: 2.5,
    paddingTop: 8,
    height: 40,
    marginBottom: 20,
  },
  TextBold1: {
    fontSize: 18,
    color: 'black',
    textAlign: 'center',
    fontWeight: 'bold',
  },
  CardView2: {
    flexDirection: 'row',
    width: 50,
    marginHorizontal: 5,
    borderRadius: 5,
    marginHorizontal: 2.5,
    paddingTop: 4,
    height: 40,
    backgroundColor: '#111111',
    marginBottom: 20,
  },
  CardView: {
    flexDirection: 'row',
    width: 150,
    marginHorizontal: 5,
    borderRadius: 5,
    marginHorizontal: 2.5,
    paddingTop: 4,
    height: 40,
    backgroundColor: '#111111',
    marginBottom: 20,
  },
  DateTime: {
    color: 'white',
  },
  DateT: {
    color: 'white',
    fontSize: 10,
    color: '#FFEB7F',
  },
  Marketplace: {
    width: 110,
    marginHorizontal: 5,
    borderRadius: 5,
    marginHorizontal: 2.5,
    paddingTop: 12,
    height: 40,
    textAlign: 'center',
    backgroundColor: '#7A673F',
  },
  Auction: {
    width: 110,
    marginHorizontal: 5,
    borderRadius: 5,
    marginHorizontal: 2.5,
    paddingTop: 12,
    height: 40,
    textAlign: 'center',
    backgroundColor: '#317066',
  },
  TextTi: {
    color: 'white',
    textAlign: 'center',
  },
  Bottom: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: 8,
    alignItems: 'center',
    marginTop: -10,
  },
});
