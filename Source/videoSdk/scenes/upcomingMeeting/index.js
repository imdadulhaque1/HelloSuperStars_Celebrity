import React, { useEffect, useState } from "react";
import {
  View,

  SafeAreaView,

  Linking,

} from "react-native";

import UpcomingMeetingList from "./components/UpcomingMeetingList";

import StartorJoinMeetingActionSheet from "./components/StartorJoinMeetingActionSheet";
import { SCREEN_NAMES } from "../../navigators/screenNames";

import { handleLinking } from "../../utils/common";

export default function UpComingMeeting({ navigation }) {
  const [visible, setvisible] = useState(false);
  const [meetingId, setmeetingId] = useState("");




  const _handleLinkingListner = ({ url }) => {
    const { meetingId, domain } = handleLinking({ url });


   
    navigation.navigate(SCREEN_NAMES.MeetingInfo, {
      meetingId,
      domain,
    });
  };

  useEffect(() => {
    Linking.addEventListener("url", _handleLinkingListner);
    return () => {
      Linking.removeEventListener("url", _handleLinkingListner);
    };

  
  }, []);

  const navigateToMeeting = () => {
    setvisible(false);
    let meetingID = "";
    if (meetingId.includes("/")) {
      meetingID = meetingId.split("/")[4];
    } else {
      meetingID = meetingId;
    }

    navigation.push(SCREEN_NAMES.MeetingInfo, {
      meetingId: meetingID,
    });
  };



  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#F6F6FF" }}>

      <View style={{ flex: 1, marginTop: 16 }}>

        <UpcomingMeetingList setvisible={setvisible} />

      </View>
      <StartorJoinMeetingActionSheet
        visible={visible}
        setvisible={setvisible}
        setmeetingId={setmeetingId}
        meetingId={meetingId}
        navigateToMeeting={navigateToMeeting}
      />
    </SafeAreaView>
  );
}
