import React, { useEffect } from "react";
import messaging from "@react-native-firebase/messaging";
import { RootNavigate } from "./src/routes";
export default function App() {

  messaging().setBackgroundMessageHandler(async remoteMessage => {
    console.log("recebi um notificação por background: ", JSON.stringify(remoteMessage));
  })

  useEffect(() => {
    const unsubscribe = messaging().onMessage(async remoteMessage => {
      console.log("recebi um notifi: ", JSON.stringify(remoteMessage));
    })
    return unsubscribe;
  })

  return <RootNavigate />;
}