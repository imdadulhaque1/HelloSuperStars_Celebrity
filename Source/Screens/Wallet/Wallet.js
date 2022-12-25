import React, {Fragment, useContext, useEffect, useRef, useState} from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Image,
  TextInput,
} from 'react-native';
import Toast from 'react-native-root-toast';
import AntDesign from 'react-native-vector-icons/AntDesign';
import imagePath from '../../Constants/imagePath';
import CustomHeader from '../../Components/CustomHeader';
import TitleHeader from '../../Components/TitleHeader';
import LinearGradient from 'react-native-linear-gradient';
import axios from 'axios';
import AppUrl from '../../RestApi/AppUrl';
import {AuthContext} from '../../Constants/context';
import {G} from 'react-native-svg';
import LoaderComp from '../../Components/LoaderComp';

const Wallet = ({navigation}) => {
  const [open, setOpen] = useState(false);
  const {axiosConfig} = useContext(AuthContext);

  //showing values
  const [totalIncomeData, setTotalIncomeData] = useState();
  const [simplePostIncome, setSimplePostIncome] = useState();
  const [liveChatIncome, setLiveChatIcome] = useState();
  const [qnaIncome, setqnaIcome] = useState();
  const [meetupIncome, setMeetupIcome] = useState();
  const [greetingIncome, setGreetingIcome] = useState();
  const [learningIncome, setLearningIcome] = useState();
  const [fanGroupIncome, setfanGroupIncome] = useState();
  const [starShowcase, setStarShowcase] = useState();

  useEffect(() => {
    setBuffer(true);
    axios.get(AppUrl.getWallet, axiosConfig).then(res => {
      if (res.data.status === 200) {
        console.log(res.data);
        setTotalIncomeData(res.data.totalIncomeStatement);
        setSimplePostIncome(res.data.simplepost);
        setLiveChatIcome(res.data.liveChat);
        setqnaIcome(res.data.qna);
        setMeetupIcome(res.data.meetup);
        setGreetingIcome(res.data.greeting);
        setLearningIcome(res.data.learning);
        setfanGroupIncome(res.data.learning);
        setStarShowcase(res.data.totalIncomeStatementStarShowcase);
        setBuffer(false);
      }
    });
  }, [withdraw]);

  const [buffer, setBuffer] = useState(false);
  const [starProfitPercentage, setStarProfit] = useState();
  const [profitSahre, setProfitShareData] = useState();
  const [withdrawAmount, setWithdrawAmount] = useState(null);
  const [spendAmount, setSpendAmount] = useState();
  const [withdraw, setWithdraw] = useState(0);
  const [message, setMessage] = useState();
  const [starCalProfit, setStarProfile] = useState();
  const {useInfo} = useContext(AuthContext);
  useEffect(() => {
    setBuffer(true);
    axios.get(AppUrl.getProfitInfo, axiosConfig).then(res => {
      setSpendAmount(res.data?.profitShareHistory);
      setStarProfit(res.data?.profitShare?.profit);
      setProfitShareData(res.data?.profitShare);
      console.log('withdraw_history', res.data?.profitShare.withdraw_history);

      setStarProfile(
        (totalIncomeData?.totalIncome * res.data?.profitShare?.profit) / 100 -
          res.data?.profitShareHistory,
      );
      setBuffer(false);
    });
  }, [withdraw]);

  function starProfit() {
    return (
      (totalIncomeData?.totalIncome * starProfitPercentage) / 100 -
      spendAmount
    )?.toFixed(2);
  }
  const profitConverter = capital => {
    return ((capital * starProfitPercentage) / 100)?.toFixed(2);
  };

  const [submitted, setSubmitted] = useState(null);
  const [insufficient, setInsufficient] = useState(null);

  const handleWithdraw = () => {
    setSubmitted(true);
    if (!withdrawAmount) {
      return;
    }
    let data = {
      profit_share_id: profitSahre?.id,
      withdraw_amount: withdrawAmount,
    };
    console.log('starProfit', Math.round(starProfit()));
    console.log('withdrawAmount', withdrawAmount);
    if (Math.round(starProfit()) >= withdrawAmount) {
      setInsufficient(false);
      axios.post(AppUrl.profitWithdraw, data, axiosConfig).then(res => {
        if (res.data.status == 200) {
          setWithdraw(previous => previous + 1);
          setMessage('');
          setWithdrawAmount(null);
          setSubmitted(false);
          Toast.show('Withdraw request submitted', Toast.durations.SHORT);
        }
        if (res.data.status == 422) {
          setMessage(res.data.errors);
        }
      });
    } else {
      setInsufficient(true);
      Toast.show('Insufficient Balance', Toast.durations.SHORT);
    }
    console.log(data);
  };

  return (
    <SafeAreaView style={{flex:1,backgroundColor:'#000'}}>
      {buffer && <LoaderComp />}
      <CustomHeader backFunc={() => navigation.goBack()} title="Wallet" />
      <ScrollView style={styles.container}>
        <View style={{margin: 10}}>
          <TitleHeader title={'Wallet Information'} />
          <View
            style={{
              backgroundColor: '#202020',
              marginVertical: 10,
              paddingVertical: 10,
              borderRadius: 20,
              flexDirection: 'column',
            }}>
            <View style={{margin: 10}}>
              <Text
                style={{
                  color: 'white',
                  fontSize: 15,
                  fontWeight: 'bold',
                  textAlign: 'center',
                }}>
                {' '}
                {useInfo?.first_name + useInfo?.last_name}
              </Text>
            </View>
            <View
              style={{
                margin: 10,
                flexDirection: 'row',
                justifyContent: 'space-around',
              }}>
              <View>
                <Text
                  style={{
                    color: 'white',
                    fontSize: 25,
                    fontWeight: 'bold',
                    color: '#ffaa00',
                  }}>
                  {' '}
                  ${totalIncomeData?.totalIncome?.toFixed(2)}
                </Text>
                <Text style={{color: 'white', fontSize: 14}}>
                  {' '}
                  Total Balance{' '}
                </Text>
              </View>
              <View style={{borderWidth: 1, borderLeftColor: 'gray'}}></View>
              <View>
                <Text
                  style={{color: 'white', fontSize: 25, fontWeight: 'bold'}}>
                  ${starProfit()}
                </Text>
                <Text style={{color: 'white', fontSize: 14}}>
                  {' '}
                  Your Profit{' '}
                </Text>
              </View>
            </View>

            {!open && (
              <TouchableOpacity onPress={() => setOpen(true)}>
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
                  style={{
                    marginHorizontal: 100,
                    borderRadius: 10,
                    paddingVertical: 10,
                  }}>
                  <Text
                    style={{
                      color: 'black',
                      textAlign: 'center',
                      fontWeight: 'bold',
                    }}>
                    Withdraw
                  </Text>
                </LinearGradient>

                {/* <Text style={{ color: 'white', marginRight: 5 }}><MaterialIcons name='keyboard-arrow-down' size={20} /></Text> */}
              </TouchableOpacity>
            )}
            {open && (
              <Fragment>
                <View
                  style={{
                    borderWidth: 1,
                    borderColor: '#ffaa00',
                    borderRadius: 25,
                    marginHorizontal: 100,
                    marginVertical: 5,
                  }}>
                  <TextInput
                    keyboardType="numeric"
                    placeholder="Withdraw amount"
                    placeholderTextColor={'white'}
                    style={{
                      color: 'white',
                      width: '100%',
                      padding: 5,
                      marginLeft: 5,
                    }}
                    onChangeText={setWithdrawAmount}
                    value={withdrawAmount}
                  />
                </View>
                {submitted && withdrawAmount === null && (
                  <View>
                    <Text style={{color: 'red', textAlign: 'center'}}>
                      Please Enter Amount
                    </Text>
                  </View>
                )}
                {insufficient && submitted && (
                  <View>
                    <Text style={{color: 'red', textAlign: 'center'}}>
                      Insufficient Balance
                    </Text>
                  </View>
                )}

                <View
                  style={{
                    marginHorizontal: 100,
                    borderRadius: 10,
                    paddingVertical: 13,
                    flexDirection: 'row',
                    justifyContent: 'space-around',
                  }}>
                  <TouchableOpacity
                    onPress={handleWithdraw}
                    style={{
                      backgroundColor: '#198452',
                      padding: 8,
                      borderRadius: 10,
                    }}>
                    <Text style={{color: 'white', fontSize: 13}}>Confirm</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() => setOpen(false)}
                    style={{
                      backgroundColor: '#D9535F',
                      padding: 8,
                      borderRadius: 10,
                    }}>
                    <Text style={{color: 'white', fontSize: 13}}>Cancel</Text>
                  </TouchableOpacity>
                </View>
              </Fragment>
            )}
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
            style={{marginTop: 10}}>
            <View style={{flexDirection: 'row'}}>
              <View
                style={{
                  flex: 1,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <Text style={{color: 'black', padding: 3, fontWeight: 'bold'}}>
                  #Transaction Id
                </Text>
              </View>
              <View
                style={{
                  flex: 1,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <Text style={{color: 'black', padding: 3, fontWeight: 'bold'}}>
                  Amount
                </Text>
              </View>
              <View
                style={{
                  flex: 1,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <Text style={{color: 'black', padding: 3, fontWeight: 'bold'}}>
                  Status
                </Text>
              </View>
            </View>
          </LinearGradient>

          {profitSahre?.withdraw_history?.map((item, index) => {
            return (
              <View
                key={index}
                style={{backgroundColor: '#202020', flexDirection: 'row'}}>
                <View
                  style={{
                    flex: 1,
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  <Text style={{color: '#fff', padding: 3}}>
                    {index + 1} {item?.withdraw_id}
                  </Text>
                </View>
                <View
                  style={{
                    flex: 1,
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  <Text style={{color: '#fff', padding: 3}}>
                    ${item?.withdraw_amount?.toFixed(2)}
                  </Text>
                </View>
                <View
                  style={{
                    flex: 1,
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  <Text style={{color: '#fff', padding: 3}}>
                    {item?.status == 0
                      ? 'Pending'
                      : item?.status == 1
                      ? 'Processing'
                      : item?.status == 2
                      ? 'Success'
                      : 'Failed'}
                  </Text>
                </View>
              </View>
            );
          })}

          {/* =================Table content start here ============= */}

          <TitleHeader title={'Sector of Earning'} />

          <View
            style={{
              backgroundColor: '#202020',
              marginVertical: 10,
              borderRadius: 10,
            }}>
            <View style={{margin: 10}}>
              <View
                style={{
                  flexDirection: 'row',
                  backgroundColor: '#000',
                  padding: 8,
                  borderRadius: 10,
                  marginVertical: 8,
                }}>
                <View style={{flex: 1}}>
                  <Image
                    source={imagePath.Post}
                    style={{width: 20, height: 20}}
                  />
                </View>
                <View style={{flex: 2}}>
                  <Text style={{color: '#fff'}}>Post</Text>
                </View>

                <View style={{flex: 2}}>
                  <View style={{flexDirection: 'row'}}>
                    <AntDesign name={'caretup'} color={'#ffad00'} size={20} />
                    <Text style={{color: '#fff', marginHorizontal: 5}}>
                      $ {simplePostIncome?.simplePostTotalIncome?.toFixed(2)}
                    </Text>
                  </View>
                </View>
                <View
                  style={{
                    flex: 2,
                    flexDirection: 'row',
                    justifyContent: 'flex-end',
                  }}>
                  <Text style={{color: '#ffad00', fontWeight: 'bold'}}>
                    $ {profitConverter(simplePostIncome?.simplePostTotalIncome)}
                  </Text>
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
                <View style={{flex: 1}}>
                  <Image
                    source={imagePath.Auditions}
                    style={{width: 20, height: 20}}
                  />
                </View>
                <View style={{flex: 2}}>
                  <Text style={{color: '#fff'}}>Auditions</Text>
                </View>

                <View style={{flex: 2}}>
                  <View style={{flexDirection: 'row'}}>
                    <AntDesign name={'caretup'} color={'#ffad00'} size={20} />
                    <Text style={{color: '#fff', marginHorizontal: 5}}>
                      $523
                    </Text>
                  </View>
                </View>
                <View
                  style={{
                    flex: 2,
                    flexDirection: 'row',
                    justifyContent: 'flex-end',
                  }}>
                  <Text style={{color: '#ffad00', fontWeight: 'bold'}}>
                    $ 75
                  </Text>
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
                <View style={{flex: 1}}>
                  <Image
                    source={imagePath.Learning}
                    style={{width: 20, height: 20}}
                  />
                </View>
                <View style={{flex: 2}}>
                  <Text style={{color: '#fff'}}>Learning</Text>
                </View>

                <View style={{flex: 2}}>
                  <View style={{flexDirection: 'row'}}>
                    <AntDesign name={'caretup'} color={'#ffad00'} size={20} />
                    <Text style={{color: '#fff', marginHorizontal: 5}}>
                      $ {learningIncome?.learningSessionTotalIncome?.toFixed(2)}
                    </Text>
                  </View>
                </View>
                <View
                  style={{
                    flex: 2,
                    flexDirection: 'row',
                    justifyContent: 'flex-end',
                  }}>
                  <Text style={{color: '#ffad00', fontWeight: 'bold'}}>
                    ${' '}
                    {profitConverter(
                      learningIncome?.learningSessionTotalIncome,
                    )}
                  </Text>
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
                <View style={{flex: 1}}>
                  <Image
                    source={imagePath.Meetup}
                    style={{width: 20, height: 20}}
                  />
                </View>
                <View style={{flex: 2}}>
                  <Text style={{color: '#fff'}}>Meetup</Text>
                </View>

                <View style={{flex: 2}}>
                  <View style={{flexDirection: 'row'}}>
                    <AntDesign name={'caretup'} color={'#ffad00'} size={20} />
                    <Text style={{color: '#fff', marginHorizontal: 5}}>
                      $ {meetupIncome?.meetupTotalIncome?.toFixed(2)}
                    </Text>
                  </View>
                </View>
                <View
                  style={{
                    flex: 2,
                    flexDirection: 'row',
                    justifyContent: 'flex-end',
                  }}>
                  <Text style={{color: '#ffad00', fontWeight: 'bold'}}>
                    $ {profitConverter(meetupIncome?.meetupTotalIncome)}
                  </Text>
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
                <View style={{flex: 1}}>
                  <Image
                    source={imagePath.Post}
                    style={{width: 20, height: 20}}
                  />
                </View>
                <View style={{flex: 2}}>
                  <Text style={{color: '#fff'}}>Live Chat</Text>
                </View>

                <View style={{flex: 2}}>
                  <View style={{flexDirection: 'row'}}>
                    <AntDesign name={'caretup'} color={'#ffad00'} size={20} />
                    <Text style={{color: '#fff', marginHorizontal: 5}}>
                      $ {liveChatIncome?.liveChatTotalIncome?.toFixed(2)}
                    </Text>
                  </View>
                </View>
                <View
                  style={{
                    flex: 2,
                    flexDirection: 'row',
                    justifyContent: 'flex-end',
                  }}>
                  <Text style={{color: '#ffad00', fontWeight: 'bold'}}>
                    $ {profitConverter(liveChatIncome?.liveChatTotalIncome)}
                  </Text>
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
                <View style={{flex: 1}}>
                  <Image
                    source={imagePath.QA}
                    style={{width: 20, height: 20}}
                  />
                </View>
                <View style={{flex: 2}}>
                  <Text style={{color: '#fff'}}>Q&A</Text>
                </View>

                <View style={{flex: 2}}>
                  <View style={{flexDirection: 'row'}}>
                    <AntDesign name={'caretup'} color={'#ffad00'} size={20} />
                    <Text style={{color: '#fff', marginHorizontal: 5}}>
                      $ {qnaIncome?.qnaTotalIncome?.toFixed(2)}
                    </Text>
                  </View>
                </View>
                <View
                  style={{
                    flex: 2,
                    flexDirection: 'row',
                    justifyContent: 'flex-end',
                  }}>
                  <Text style={{color: '#ffad00', fontWeight: 'bold'}}>
                    $ {profitConverter(qnaIncome?.qnaTotalIncome)}
                  </Text>
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
                <View style={{flex: 1}}>
                  <Image
                    source={imagePath.Live}
                    style={{width: 20, height: 20}}
                  />
                </View>
                <View style={{flex: 2}}>
                  <Text style={{color: '#fff'}}>Live</Text>
                </View>

                <View style={{flex: 2}}>
                  <View style={{flexDirection: 'row'}}>
                    <AntDesign name={'caretup'} color={'#ffad00'} size={20} />
                    <Text style={{color: '#fff', marginHorizontal: 5}}>
                      $523
                    </Text>
                  </View>
                </View>
                <View
                  style={{
                    flex: 2,
                    flexDirection: 'row',
                    justifyContent: 'flex-end',
                  }}>
                  <Text style={{color: '#ffad00', fontWeight: 'bold'}}>
                    $ 75
                  </Text>
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
                <View style={{flex: 1}}>
                  <Image
                    source={imagePath.Greeting}
                    style={{width: 20, height: 20}}
                  />
                </View>
                <View style={{flex: 2}}>
                  <Text style={{color: '#fff'}}>Greeting</Text>
                </View>

                <View style={{flex: 2}}>
                  <View style={{flexDirection: 'row'}}>
                    <AntDesign name={'caretup'} color={'#ffad00'} size={20} />
                    <Text style={{color: '#fff', marginHorizontal: 5}}>
                      $ {greetingIncome?.greetingTotalIncome?.toFixed(2)}
                    </Text>
                  </View>
                </View>
                <View
                  style={{
                    flex: 2,
                    flexDirection: 'row',
                    justifyContent: 'flex-end',
                  }}>
                  <Text style={{color: '#ffad00', fontWeight: 'bold'}}>
                    $ {profitConverter(greetingIncome?.greetingTotalIncome)}
                  </Text>
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
                <View style={{flex: 1}}>
                  <Image
                    source={imagePath.Greeting}
                    style={{width: 20, height: 20}}
                  />
                </View>
                <View style={{flex: 2}}>
                  <Text style={{color: '#fff'}}>Star Showcase</Text>
                </View>

                <View style={{flex: 2}}>
                  <View style={{flexDirection: 'row'}}>
                    <AntDesign name={'caretup'} color={'#ffad00'} size={20} />
                    <Text style={{color: '#fff', marginHorizontal: 5}}>
                      $ {starShowcase?.totalIncome?.toFixed(2)}
                    </Text>
                  </View>
                </View>
                <View
                  style={{
                    flex: 2,
                    flexDirection: 'row',
                    justifyContent: 'flex-end',
                  }}>
                  <Text style={{color: '#ffad00', fontWeight: 'bold'}}>
                    $ {profitConverter(starShowcase?.totalIncome)}
                  </Text>
                </View>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
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
