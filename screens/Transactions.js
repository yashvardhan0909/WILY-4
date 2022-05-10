import * as React from 'react'
import { StyleSheet, Text, View, TouchableOpacity, TextInput } from 'react-native';
import * as Permissions from 'expo-permissions'
import { BarCodeScanner } from 'expo-barcode-scanner';
 
 
 
export default class Transaction extends React.Component {
    constructor() {
        super()
        this.state = {
            scanned: false, cameraPermission: null, buttonState: 'normal',
            scannedStudentId: '',
            scannedBookId: ''
        }
    }
    getCameraPermission = async (id) => {
 
        const { status } = await Permissions.askAsync(Permissions.CAMERA)
 
        this.setState({
            cameraPermission: status == 'granted' ? true : false,
            buttonState: id,
            scanned:false
        })
 
    }
 
    handleBarCodeScanned = async ({ type, data }) => {
        if(this.state.buttonState==='bookId'){
            this.setState({
                scanned: true,
                scannedBookId: data,
                buttonState: 'normal'
            })
        }
        else{
            this.setState({
                scanned: true,
                scannedStudentId: data,
                buttonState: 'normal'
            })
        }
       
    }
 
 
 
 
    render() {
 
        var bs = this.state.buttonState;
        var cp = this.state.cameraPermission
 
        if (bs!='normal' && cp) {
            return (
                <BarCodeScanner onBarCodeScanned={this.state.scanned ? undefined : this.handleBarCodeScanned}
                    style={StyleSheet.absoluteFillObject} />
            )
        }
        else {
            return (
                <View>
                    <View style={{flexDirection:'row',marginTop:100}}>
                    <TextInput
                        placeholder='Enter book id'
                        onChangeText={(text) => {
                            this.setState({
                                scannedBookId: text
                            })
 
                        }}
                        style={styles.input}
                        value={this.state.scannedBookId}
                    />
                    <TouchableOpacity onPress={()=>this.getCameraPermission('bookId')}
                    style={styles.button}>
                        <Text>Scan</Text>
                    </TouchableOpacity>
                    </View>
                    <View style={{flexDirection:'row',marginTop:100}}>
                    <TextInput
                        placeholder='Enter student id'
                        onChangeText={(text) => {
                            this.setState({
                                scannedStudentId: text
                            })
                        }}
 
                        value={this.state.scannedStudentId}
                        style={styles.input}
                    />
                    <TouchableOpacity onPress={()=>this.getCameraPermission('studentId')}
                     style={styles.button}>
                        <Text>Scan</Text>
                    </TouchableOpacity>
                    </View>
                </View>
            )
        }
 
    }
 
}
 
const styles=StyleSheet.create({
    input:{
        borderWidth:2,
       margin:50,
       width:150
    },
    button:{
        margin:50,
        borderWidth:2,
        width:50,
        alignItems:'center'
    }
})
 
