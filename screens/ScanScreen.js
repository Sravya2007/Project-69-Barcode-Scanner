import * as React from 'react'
import {Text, View, StyleSheet, Button, TouchableOpacity} from 'react-native';
import * as Permissions from 'expo-permissions';
import {BarCodeScanner} from 'expo-barcode-scanner';

export default class App extends React.Component {
    constructor() {
        super();
        this.state = {
            hasCameraPermissions: null,
            scanned: false,
            scannedData: '',
            buttonState: 'normal'
        }
    }

    getCameraPermission = async() => {
        const {status} = await Permissions.askAsync(Permissions.CAMERA)
        //gives true if user has granted permission false if user has not granted permission
        this.setState({
            hasCameraPermissions: status === 'granted',
            scanned: false,
            buttonState: 'clicked'
        })
    }

    handleBarcodeScanner = async({type, data}) => {
        this.setState({
            scanned: true,
            scannedData: data,
            buttonState: 'normal'
        })
    }

    render() {
      return (
        <AppContainer/>
      );
    }
  }