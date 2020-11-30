import * as React from 'react'
import {Text, View, StyleSheet, Button, TouchableOpacity, Image} from 'react-native';
import * as Permissions from 'expo-permissions';
import {BarCodeScanner} from 'expo-barcode-scanner';
import { Header } from 'react-native-elements';

export default class ScanScreen extends React.Component {
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
        alert(`Bar code with type ${type} and data ${data} has been scanned!`);
    }

    render() {
        const hasCameraPermissions = this.state.hasCameraPermissions;
        const scanned = this.state.scanned;
        const buttonState = this.state.buttonState;
        if(buttonState === 'clicked' && hasCameraPermissions) {
            return (
                <BarCodeScanner onBarCodeScanned = {scanned ? undefined : this.handleBarcodeScanner}
                style = {StyleSheet.absoluteFillObject}/>
            );
        } else if(buttonState === 'normal'){
            return (
                <View style = {styles.container}>
                <Text style = {styles.title}>Bar Code Scanner</Text>
                <Image style = {styles.imageIcon} source={require('../assets/barcode-scanner.png')}/>
                <Text style = {styles.displayText}>{hasCameraPermissions === true ? this.state.scannedData : "Requesting for Camera Permission"}</Text>

                <TouchableOpacity style = {styles.scanButton} onPress = {this.getCameraPermission} title = "Bar Code Scanner">
                    <Text style = {styles.buttonText}>Scan Bar Code</Text>
                </TouchableOpacity>
                </View>
            );
        }
    }
  }

  const styles = StyleSheet.create({
    container : {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'pink'
    },
    displayText: {
        fontSize: 20,
        textDecorationLine: 'underline',
        marginTop: 30,
        color: '#7A003D'
    },
    scanButton: {
        backgroundColor: '#FA0079',
        padding: 10,
        margin: 10
    },
    imageIcon: {
        alignSelf: 'center',
        padding: 10,
        margin: 10,
        height: 200,
        width: 200
    },
    title: {
        alignSelf: 'center',
        marginBottom: 50,
        fontWeight: 'bold',
        fontSize: 30,
        color: '#C70063'
    },
    buttonText: {
        fontSize: 20,
        color: 'white'
    }
})