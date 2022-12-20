import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {
  Image,
  ScrollView,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  useWindowDimensions,
  View,
} from 'react-native';
import {SwiperFlatList} from 'react-native-swiper-flatlist';
import imagePath from '../../Constants/imagePath';
import moment from 'moment';
import RenderHTML from 'react-native-render-html';
import AppUrl from '../../RestApi/AppUrl';
import MainNavigationString from '../../Constants/MainNavigationString';
import CustomHeader from '../../Components/CustomHeader';
export default function AuctionSoldProduct({route}) {
  const Navigation = useNavigation();
  const {products} = route.params;
  const {width} = useWindowDimensions();
  console.log(route.params);
  //   const Navigation = useNavigation();
  return (
    <SafeAreaView>
      <CustomHeader backFunc={() => Navigation.goBack()} />
      <ScrollView style={{backgroundColor: 'black', height: '100%'}}>
        <View style={{backgroundColor: '#000'}}>
          {products?.map(product => {
            return (
              <View style={styles.Container}>
                <View style={styles.Row}>
                  <TouchableOpacity
                    onPress={() =>
                      Navigation.navigate(
                        MainNavigationString.AUCTIONLIVEBIDDING,
                        {
                          productId: product?.id,
                        },
                      )
                    }>
                    <View style={styles.Right}>
                      <SwiperFlatList
                        autoplay
                        autoplayDelay={2}
                        autoplayLoop
                        width={120}>
                        <Image
                          source={{
                            uri: `${
                              AppUrl.MediaBaseUrl + product?.product_image
                            }`,
                          }}
                          style={styles.postImage}
                          width={120}
                          height={200}
                        />
                      </SwiperFlatList>
                    </View>
                  </TouchableOpacity>
                  <View style={styles.Left}>
                    <TouchableOpacity
                      onPress={() =>
                        Navigation.navigate(
                          MainNavigationString.AUCTIONLIVEBIDDING,
                          {
                            productId: product?.id,
                          },
                        )
                      }>
                      <View
                        style={{
                          flexDirection: 'row',
                          marginRight: 10,
                        }}>
                        <Text style={styles.Text}>{product?.title}</Text>
                      </View>
                    </TouchableOpacity>
                    <Text style={styles.Date}>
                      Released at {moment(product?.created_at).format('LL')}
                    </Text>
                    <Text style={styles.Date}>
                      {moment(product?.bid_from).format('LL')} to{' '}
                      {moment(product?.bid_to).format('LL')}
                    </Text>
                    <View style={{width: '80%'}}>
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

                    <View style={{flexDirection: 'row', width: '100%'}}>
                      <TouchableOpacity style={styles.Box}>
                        <Image source={imagePath.Box} />
                        <Text style={styles.Count}> 1</Text>
                      </TouchableOpacity>
                      <TouchableOpacity style={styles.Box}>
                        <Image source={imagePath.Sold} />
                        <Text style={styles.Count}>
                          {' '}
                          ${product?.base_price}
                        </Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                </View>
              </View>
            );
          })}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  Container: {
    backgroundColor: '#272727',
    margin: 8,
    borderRadius: 10,
    flex: 1,
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
    flex: 1,
  },

  Text: {
    fontSize: 25,
    color: 'white',
    fontWeight: 'bold',
    flexShrink: 1,
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
    marginHorizontal: 5,
    paddingHorizontal: 5,
    marginTop: 10,
    width: '20%',
    justifyContent: 'center',
    alignItems: 'center',
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
});
