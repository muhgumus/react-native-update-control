React Native Update Control
=========

Version Control from App Store and Play Store for React Native apps

## Installation
Step 1 
    `npm install react-native-device-info` 
    `react-native link`

Step 2    
    `npm install react-native-update-control`

## Usage

    import UpdateControl from 'react-native-update-control';

    UpdateControl({
        title:"App Update Title", 
        description:"App Update Description",
        cancelText:"CANCEL",
        okText:"UPDATE"
        });

