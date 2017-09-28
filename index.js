import { Alert, Linking, Platform, } from 'react-native';
var DeviceInfo = require('react-native-device-info');
const cheerio = require('react-native-cheerio');

var content = {
    title: "Update",
    description: "There was Update",
    cancelText: "CANCEL",
    okText: "OK"
}

export default function (param) {
    content = param;
    console.log("UPDATE CONTROL PARAM", param)

    console.log(DeviceInfo.getBundleId() + "  " + DeviceInfo.getVersion());
    if (DeviceInfo) {
        this.controlStore(DeviceInfo.getBundleId()).then((data) => {
            if (data && parseFloat(DeviceInfo.getVersion()) < parseFloat(data.version) && data.storeUrl)
                Alert.alert(
                    content.title +" "+ data.version,
                    content.description,
                    [
                        { text: content.cancelText, onPress: () => console.log('Cancel Pressed'), style: 'cancel' },
                        {
                            text: content.okText, onPress: () => {
                                Linking.canOpenURL(data.storeUrl).then(value => {
                                    if (value)
                                        Linking.openURL(data.storeUrl)
                                    else
                                        console.log("Cant open url")

                                })
                            }
                        },
                    ],
                    { cancelable: false }
                )
        })
    }
}

controlStore = (appId) => {
    if (Platform.OS == "ios")
        return controlStoreIOS(appId);
    else if (Platform.OS == "android") {
        return controlStoreAndroid(appId);
    }
}

controlStoreIOS = (appId) => {
    return fetch("https://itunes.apple.com/tr/lookup?bundleId=" + appId,
        { method: "GET" })
        .then((response) => response.json())
        .then((responseData) => {
            return {
                "platform": "ios",
                "bundleId": responseData.results[0].bundleId,
                "version": responseData.results[0].version,
                "storeUrl": responseData.results[0].trackViewUrl
            }
        })
        .catch((ex) => {
            return null;
            { throw ex }
        });
}


controlStoreAndroid = (appId) => {
    let queryUrl = 'https://play.google.com/store/apps/details?id=' + appId;
    return fetch(queryUrl,
        { method: "GET" })
        .then((responseData) => {
            console.log(responseData)
            const $ = cheerio.load(responseData._bodyText);
            let androidVersion = $("div[itemprop=softwareVersion]").text().trim();
            //let androidVersionCode = $("div[itemprop=softwareVersion]").text().trim();
            console.log(androidVersion)
            if (androidVersion) {
                return mappedResult = {
                    "platform": "android",
                    "bundleId": appId,
                    "version": androidVersion,
                    "storeUrl": queryUrl
                }
            }
            else {
                return null
            }


        })
        .catch((ex) => {
            return null;
            { throw ex }
        });
}

