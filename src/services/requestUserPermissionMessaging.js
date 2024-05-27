import messaging from "@react-native-firebase/messaging";
import {PermissionsAndroid, Platform} from 'react-native';
import { refreshFCMToken } from "./refreshFcmToken";

export const getFCMToken = async () => {
    const token = await messaging().getToken();
    console.log(token)
    return token;
}

export const requestPermissionPushNotification = async () => {
    let initialAuthStatus = await messaging().hasPermission();
    let enabled =
        initialAuthStatus === messaging.AuthorizationStatus.AUTHORIZED
        || initialAuthStatus === messaging.AuthorizationStatus.PROVISIONAL
    if(!enabled) {
        const authStatus= Platform.OS === "android" 
        ? await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS)
        : await messaging().requestPermission();
        if(typeof enabled === "number") {
            enabled =
                authStatus === messaging.AuthorizationStatus.AUTHORIZED
                || authStatus === messaging.AuthorizationStatus.PROVISIONAL
        } else {
            enabled = 
                authStatus === "granted"
        }
    }
    if (enabled) {
        console.log("entrou")
        const token = await getFCMToken();
        console.log("Indo para o refresh", token)
        await refreshFCMToken(token);
    }
}

export const startNotifications = () => {
    console.log("Start")
    requestPermissionPushNotification();
    messaging()
        .onMessage(async(message) => {
            console.log(message);
        })
    messaging()
        .setBackgroundMessageHandler(async(message) => {
            console.log("backgroundMessage", message)
        })

}