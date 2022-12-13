/* eslint-disable prettier/prettier */
import {View, Text} from 'react-native';
import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Dashboard from '../../Screens/Dashboard/Dashboard';
import MainNavigationString from '../../Constants/MainNavigationString';
import Post from './../../Screens/Post/Post';
import LiveChat from './../../Screens/Live-chat/LiveChat';
import Audition from './../../Screens/Audition/Audition';
import StarShowcase from './../../Screens/Star-Showcase/Showcase';
import Learning from './../../Screens/Learning/Learning';
import Live from './../../Screens/Live/Live';
import Meetup from './../../Screens/MeetUp/Meetup';
import Qna from './../../Screens/QnA/Qna';
import Fangroup from './../../Screens/Fangroup/Fangroup';
import Greetings from './../../Screens/Greetings/Greetings';
import LearningAll from '../../Screens/Learning/LearningAll';

import PostApproved from '../../Screens/Post/PostApproved';
import PostRejected from '../../Screens/Post/PostRejected';
import PostCreate from '../../Screens/Post/PostCreate';
import AuditionAll from '../../Screens/Audition/AuditionAll';
import AuditionLiveEvents from '../../Screens/Audition/AuditionLiveEvents';
import AuditionApproved from '../../Screens/Audition/AuditionApproved';
import AuditionPending from '../../Screens/Audition/AuditionPending';
import AuditionCreate from '../../Screens/Audition/AuditionCreate';
import GreetingsAll from '../../Screens/Greetings/GreetingsAll';
import GreetingsApproved from '../../Screens/Greetings/GreetingsApproved';
import GreetingsPending from '../../Screens/Greetings/GreetingsPending';
import GreetingsCompleted from '../../Screens/Greetings/GreetingsCompleted';
import GreetingsRegistered from '../../Screens/Greetings/GreetingsRegistered';
import GreetingsForwardToUser from '../../Screens/Greetings/GreetingsForwardToUser';
import GreetingsEvaluation from '../../Screens/Greetings/GreetingsEvaluation';
import GreetingsCreate from '../../Screens/Greetings/GreetingsCreate';
import QnaAll from '../../Screens/QnA/QnaAll';
import QnaApproved from '../../Screens/QnA/QnaApproved';
import QnaPending from '../../Screens/QnA/QnaPending';
import QnaCompleted from '../../Screens/QnA/QnaCompleted';
import QnaRejected from '../../Screens/QnA/QnaRejected';
import QnaCreate from '../../Screens/QnA/QnaCreate';
import ApprovedCard from '../../Components/Reusable/ReuseCard';
import ReuseCard from '../../Components/Reusable/ReuseCard';
import VoiceCallList from '../../Components/Reusable/VoiceCallList';
import LiveChatAll from '../../Screens/Live-chat/LiveChatAll';
import ReuseApproved from '../../Components/Reusable/ReuseApproved';
import VoiceMsg from '../../Components/Reusable/VoiceMsg';
import CreateReusableForm from '../../Components/Reusable/CreateReusableForm';
import CompletedCard from '../../Components/Reusable/CompletedCard';
import EditCard from '../../Components/Reusable/EditCard';
import PendingCard from '../../Components/Reusable/PendingCard';
import Setting from '../../Screens/Setting/Setting';
import Schedule from '../../Screens/Schedule/Schedule';
import MonthSchedule from '../../Screens/Schedule/MonthSchedule';
import Auction from '../../Screens/Star-Showcase/Auction';
import MarketPlace from '../../Screens/Star-Showcase/MarketPlace';
import PendingRequest from '../../Screens/Star-Showcase/PendingRequest';
import AuctionSoldProduct from '../../Screens/Star-Showcase/AuctionSoldProduct';
import AuctionLiveBidding from '../../Screens/Star-Showcase/AuctionLiveBidding';
import AuctionAddProduct from '../../Screens/Star-Showcase/AuctionAddProduct';
import MarketPlaceSoldProduct from '../../Screens/Star-Showcase/MarketPlaceSoldProduct';
import MarketPlaceUnsoldProduct from '../../Screens/Star-Showcase/MarketPlaceUnsoldProduct';
import MarketPlaceAddProduct from '../../Screens/Star-Showcase/MarketPlaceAddProduct';
import EditProduct from '../../Screens/Star-Showcase/EditProduct';
import Rejected from './../../Screens/Fangroup/Rejected';
import RejectedCard from './../../Screens/Fangroup/RejectedCard';
import Invitation from './../../Screens/Fangroup/Invitation';
import InvitationCard from './../../Screens/Fangroup/InvitationCard';
import EditInvitation from './../../Screens/Fangroup/EditInvitation';
import Accepted from './../../Screens/Fangroup/Accepted';
import AcceptedCard from './../../Screens/Fangroup/AcceptedCard';
import AllDataFanGroup from './../../Screens/Fangroup/AllDataFanGroup';
import UpdateReusableForm from '../../Components/Reusable/UpdateReusableForm';
import MeetUpCreateForm from '../../Components/Reusable/MeetUpCreateForm';
import QnaCreateForm from '../../Components/Reusable/QnaCreateForm';
import MeetUpUpdateForm from '../../Components/Reusable/MeetUpUpdateForm';
import QnaUpdateForm from '../../Components/Reusable/QnaUpdateForm';
import LearningCreate from '../../Screens/Learning/LearningCreate';
import AuctionPending from '../../Screens/Star-Showcase/Pending';
import Pending from '../../Screens/Star-Showcase/Pending';
import Souvenir from '../../Screens/Star-Showcase/Souvenir';
import Orders from '../../Screens/Star-Showcase/Orders';
import SouvenirDetails from '../../Screens/Star-Showcase/SouvenirDetails';
import GreetingsDetails from '../../Screens/Greetings/GreetingsDetails';
import AuditionCard from '../../Components/Reusable/AuditionCard';
import AuditionVideos from '../../Components/Reusable/AuditionVideos';
import TotalAuditions from '../../Components/Reusable/Rounds';
import RoundInstructions from '../../Screens/Audition/RoundInstructions';
import DetailsFanGroup from '../../Screens/Fangroup/DetailsFanGroup';

const StackDashbord = createNativeStackNavigator();

const DashboardStack = () => {
  return (
    <StackDashbord.Navigator
      screenOptions={{headerShown: false}}
      initialRouteName={MainNavigationString.DASHBORD}>
      <StackDashbord.Screen
        name={MainNavigationString.DASHBORD}
        component={Dashboard}
      />

      {/*=========== //post route=============  */}
      <StackDashbord.Screen name={MainNavigationString.POST} component={Post} />
      <StackDashbord.Screen
        name={MainNavigationString.VIEWCARD}
        component={ReuseCard}
      />
      <StackDashbord.Screen
        name={MainNavigationString.POSTAPPROVED}
        component={PostApproved}
      />
      {/* <StackDashbord.Screen
        name={MainNavigationString.POSTPENDING}
        component={ReuseCard}
      /> */}
      <StackDashbord.Screen
        name={MainNavigationString.POSTREJECTED}
        component={PostRejected}
      />
      <StackDashbord.Screen
        name={MainNavigationString.POSTCREATE}
        component={PostCreate}
      />

      {/* ============Live chat route===========  */}
      <StackDashbord.Screen
        name={MainNavigationString.LIVECHAT}
        component={LiveChat}
      />

      <StackDashbord.Screen
        name={MainNavigationString.LIVECHATALL}
        component={LiveChatAll}
      />
      <StackDashbord.Screen
        name={MainNavigationString.UPADTEFORM}
        component={UpdateReusableForm}
      />

      {/*====================== Audition==================  */}
      {/* Audition  */}
      <StackDashbord.Screen
        name={MainNavigationString.AUDITIONCARD}
        component={AuditionCard}
      />
      <StackDashbord.Screen
        name={MainNavigationString.AUDITIONVIDEOS}
        component={AuditionVideos}
      />
      <StackDashbord.Screen
        name={MainNavigationString.TOTALAUDITIONS}
        component={TotalAuditions}
      />
      <StackDashbord.Screen
        name={MainNavigationString.AUDITION}
        component={Audition}
      />
      <StackDashbord.Screen
        name={MainNavigationString.ROUNDINSTRUCTIONS}
        component={RoundInstructions}
      />
      <StackDashbord.Screen
        name={MainNavigationString.AUDITIONALL}
        component={AuditionAll}
      />
      <StackDashbord.Screen
        name={MainNavigationString.AUDITIONLIVEEVENT}
        component={AuditionLiveEvents}
      />
      <StackDashbord.Screen
        name={MainNavigationString.AUDITIONAPPROVED}
        component={AuditionApproved}
      />
      <StackDashbord.Screen
        name={MainNavigationString.AUDITIONPENDING}
        component={AuditionPending}
      />
      <StackDashbord.Screen
        name={MainNavigationString.AUDITIONCREATE}
        component={AuditionCreate}
      />

      {/*====================== Star Showcase==================  */}
      <StackDashbord.Screen
        name={MainNavigationString.STARSHOWCASE}
        component={StarShowcase}
      />
      <StackDashbord.Screen
        name={MainNavigationString.AUCTION}
        component={Auction}
      />
      <StackDashbord.Screen
        name={MainNavigationString.MARKETPLACE}
        component={MarketPlace}
      />
      <StackDashbord.Screen
        name={MainNavigationString.PENDINGREQUEST}
        component={PendingRequest}
      />
      <StackDashbord.Screen
        name={MainNavigationString.AUCTIONSOLDPRODUCT}
        component={AuctionSoldProduct}
      />
      <StackDashbord.Screen
        name={MainNavigationString.PENDING}
        component={Pending}
      />
      <StackDashbord.Screen
        name={MainNavigationString.AUCTIONLIVEBIDDING}
        component={AuctionLiveBidding}
      />
      <StackDashbord.Screen
        name={MainNavigationString.AUCTIONADDPRODUCT}
        component={AuctionAddProduct}
      />
      <StackDashbord.Screen
        name={MainNavigationString.MARKETPLACESOLDPRODUCT}
        component={MarketPlaceSoldProduct}
      />
      <StackDashbord.Screen
        name={MainNavigationString.MARKETPLACEUNSOLDPRODUCT}
        component={MarketPlaceUnsoldProduct}
      />
      <StackDashbord.Screen
        name={MainNavigationString.MARKETPLACEADDPRODUCT}
        component={MarketPlaceAddProduct}
      />
      <StackDashbord.Screen
        name={MainNavigationString.EDITPRODUCT}
        component={EditProduct}
      />
      <StackDashbord.Screen
        name={MainNavigationString.SOUVENIR}
        component={Souvenir}
      />
      <StackDashbord.Screen
        name={MainNavigationString.ORDERS}
        component={Orders}
      />
      <StackDashbord.Screen
        name={MainNavigationString.SOUVENIRDETAILS}
        component={SouvenirDetails}
      />

      {/* =======================Learning =============================== */}
      <StackDashbord.Screen
        name={MainNavigationString.LEARNING}
        component={Learning}
      />
      <StackDashbord.Screen
        name={MainNavigationString.LEARNINGALL}
        component={LearningAll}
      />

      {/* =======================Live =============================== */}
      <StackDashbord.Screen name={MainNavigationString.LIVE} component={Live} />

      {/* =======================MeetUp =============================== */}
      <StackDashbord.Screen
        name={MainNavigationString.MEETUP}
        component={Meetup}
      />

      {/* =======================Greetings=============================== */}
      <StackDashbord.Screen
        name={MainNavigationString.GREETINGS}
        component={Greetings}
      />
      <StackDashbord.Screen
        name={MainNavigationString.GREETINGSALL}
        component={GreetingsAll}
      />
      <StackDashbord.Screen
        name={MainNavigationString.GREETINGSAPPROVED}
        component={GreetingsApproved}
      />
      <StackDashbord.Screen
        name={MainNavigationString.GREETINGSPENDING}
        component={GreetingsPending}
      />
      <StackDashbord.Screen
        name={MainNavigationString.GREETINGSCOMPLETED}
        component={GreetingsCompleted}
      />
      <StackDashbord.Screen
        name={MainNavigationString.GREETINGSREGISTERED}
        component={GreetingsRegistered}
      />
      <StackDashbord.Screen
        name={MainNavigationString.GREETINGSDETAILS}
        component={GreetingsDetails}
      />
      <StackDashbord.Screen
        name={MainNavigationString.GREETINGSFORWARD}
        component={GreetingsForwardToUser}
      />
      <StackDashbord.Screen
        name={MainNavigationString.GREETINGSEVALUATION}
        component={GreetingsEvaluation}
      />
      <StackDashbord.Screen
        name={MainNavigationString.GREETINGSCREATE}
        component={GreetingsCreate}
      />

      {/* =======================QnA=============================== */}
      <StackDashbord.Screen name={MainNavigationString.QNA} component={Qna} />
      <StackDashbord.Screen
        name={MainNavigationString.QNAALL}
        component={QnaAll}
      />
      <StackDashbord.Screen
        name={MainNavigationString.QNAAPPROVED}
        component={QnaApproved}
      />
      <StackDashbord.Screen
        name={MainNavigationString.QNAPENDING}
        component={QnaPending}
      />
      <StackDashbord.Screen
        name={MainNavigationString.QNACOMPLETED}
        component={QnaCompleted}
      />
      <StackDashbord.Screen
        name={MainNavigationString.QNAREJECTED}
        component={QnaRejected}
      />
      <StackDashbord.Screen
        name={MainNavigationString.QNACREATE}
        component={QnaCreate}
      />

      {/*============== Wallet==============  */}
     

      {/*============== Setting==============  */}
      <StackDashbord.Screen
        name={MainNavigationString.SETTING}
        component={Setting}
      />

      {/*============== Setting==============  */}
      <StackDashbord.Screen
        name={MainNavigationString.SCHEDULE}
        component={Schedule}
      />
      <StackDashbord.Screen
        name={MainNavigationString.MONTHSCHEDULE}
        component={MonthSchedule}
      />

      {/*============== Reuse==============  */}
      <StackDashbord.Screen
        name={MainNavigationString.REUSEAPPROVED}
        component={ReuseApproved}
      />
      <StackDashbord.Screen
        name={MainNavigationString.VOICECALLLIST}
        component={VoiceCallList}
      />
      <StackDashbord.Screen
        name={MainNavigationString.VOICEMSG}
        component={VoiceMsg}
      />
      <StackDashbord.Screen
        name={MainNavigationString.CREATEFORM}
        component={CreateReusableForm}
      />
      <StackDashbord.Screen
        name={MainNavigationString.LEARNINGCREATE}
        component={LearningCreate}
      />
      <StackDashbord.Screen
        name={MainNavigationString.COMPLETEDCARD}
        component={CompletedCard}
      />
      <StackDashbord.Screen
        name={MainNavigationString.EDITCARD}
        component={EditCard}
      />
      <StackDashbord.Screen
        name={MainNavigationString.PENDINGCARD}
        component={PendingCard}
      />
      <StackDashbord.Screen
        name={MainNavigationString.MEETUPCREATEFORM}
        component={MeetUpCreateForm}
      />
      <StackDashbord.Screen
        name={MainNavigationString.QNACREATEFORM}
        component={QnaCreateForm}
      />

      {/*============== Fangroup ================== */}
      <StackDashbord.Screen
        name={MainNavigationString.FANGROUP}
        component={Fangroup}
      />
      <StackDashbord.Screen
        name={MainNavigationString.DETAILSFANGROUP}
        component={DetailsFanGroup}
      />
      <StackDashbord.Screen
        name={MainNavigationString.REJECTED}
        component={Rejected}
      />
      <StackDashbord.Screen
        name={MainNavigationString.REJECTEDCARD}
        component={RejectedCard}
      />
      <StackDashbord.Screen
        name={MainNavigationString.INVITATION}
        component={Invitation}
      />
      <StackDashbord.Screen
        name={MainNavigationString.INVITATIONCARD}
        component={InvitationCard}
      />
      <StackDashbord.Screen
        name={MainNavigationString.EDITINVITATION}
        component={EditInvitation}
      />
      <StackDashbord.Screen
        name={MainNavigationString.ACCEPTED}
        component={Accepted}
      />
      <StackDashbord.Screen
        name={MainNavigationString.ACCEPTEDCARD}
        component={AcceptedCard}
      />
      <StackDashbord.Screen
        name={MainNavigationString.ALLDATAFANGROUP}
        component={AllDataFanGroup}
      />

      <StackDashbord.Screen
        name={MainNavigationString.MEETUPUPDATE}
        component={MeetUpUpdateForm}
      />
      <StackDashbord.Screen
        name={MainNavigationString.QNAUPDATE}
        component={QnaUpdateForm}
      />
    </StackDashbord.Navigator>
  );
};

export default DashboardStack;
