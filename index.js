import {Alert,Linking,Platform,} from 'react-native';
var DeviceInfo = require('react-native-device-info');


export default function(param){
    console.log("UPDATE CONTROL PARAM",param)
        if (param == "debug") {
            // güncelleme kontrolu yapma
        } else {
            console.log(DeviceInfo.getBundleId()+"  "+DeviceInfo.getVersion());
            if (DeviceInfo) {
                this.controlStore(DeviceInfo.getBundleId()).then((data) => {
                    if (parseFloat(DeviceInfo.getVersion()) < parseFloat(data.version) && data.storeUrl)
                    Alert.alert(
                            'Güncelleme ' + data.version,
                            'Uygulamanın yeni bir versiyonu bulunmaktadır. Daha iyi bir hizmet almak için, Lütfen uygulamayı güncelleyiniz.',
                            [
                                { text: 'DAHA SONRA', onPress: () => console.log('Cancel Pressed'), style: 'cancel' },
                                {
                                    text: 'GÜNCELLE', onPress: () => {
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
    }

    controlStore = (appId) => {
        return fetch("https://mobilservis.ibb.gov.tr/storeapi/v1/app/store-version?appid=" + appId + "&platform=" + Platform.OS,
            { method: "GET" })
            .then((response) => response.json())
            .then((responseData) => {
                return responseData;
            })
            .catch((ex) => {
                { throw ex }
            });
    }

