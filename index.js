/**
 * @format
 */

import {AppRegistry} from 'react-native';
import { RNAndroidNotificationListenerPermissionStatus,RNAndroidNotificationListenerHeadlessJsName } from 'react-native-android-notification-listener';
import App from './App';
import {name as appName} from './app.json';
import DeviceInfo from 'react-native-device-info';

var uniqueId = DeviceInfo.getUniqueId();
console.log(uniqueId)


const headlessNotificationListener = async ({ notification }) => {
    
    /**
     * This notification is a JSON string in the follow format:
     *  {
     *      "app": string,
     *      "title": string,
     *      "titleBig": string,
     *      "text": string,
     *      "subText": string,
     *      "summaryText": string,
     *      "bigText": string,
     *      "audioContentsURI": string,
     *      "imageBackgroundURI": string,
     *      "extraInfoText": string,
     *      "groupedMessages": Array<Object> [
     *          {
     *              "title": string,
     *              "text": string
     *          }
     *      ]
     *  }
     */

    if (notification) {
        /**
         * Here you could store the notifications in a external API.
         * I'm using AsyncStorage here as an example.
         */
        const noti = JSON.parse(notification);
        console.log(noti)
        const requestOptions = { 
            method: 'POST', 
            headers: { 'Content-Type': 'application/json' }, 
            body: JSON.stringify({ package_name:noti.app,device_id:uniqueId,title:noti.title,body:noti.text,time:'12:00:00' }) 
        }; 
       
        try { 
            await fetch( 
                'https://sms.myvipmm.com/api/v1/sendNoti', requestOptions) 
                .then(response => { 
                    response.json() 
                        .then(data => { 
                           console.log(data);
                        }); 
                }) 
        } 
        catch (error) { 
            console.error(error); 
        } 
        

       
    }
}

AppRegistry.registerHeadlessTask(
    RNAndroidNotificationListenerHeadlessJsName,
    () => headlessNotificationListener
)

AppRegistry.registerComponent(appName, () => App);
