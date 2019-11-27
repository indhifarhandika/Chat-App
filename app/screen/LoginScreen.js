import React from 'react'
import {
    View,
    TextInput,
    Alert,
    Text,
    TouchableOpacity,
    AsyncStorage,
    ImageBackground
} from 'react-native'
import firebase from 'firebase'
import User from '../data/User'
import styles from '../components/styles'

export default class LoginScreen extends React.Component {
    // State
    state = {
        phone: '',
        name: ''
    }
    // Handler TextInput
    handlerChange = key => val => {
        this.setState({ [key]: val })
    }

    // Handler Form
    submitForm = async () => {
        // Validasi Nomor & Nama
        if (this.state.phone.length < 11) {
            Alert.alert('Error', 'Wrong phone number')
        } else if (this.state.name.length < 4) {
            Alert.alert('Error', 'Wrong name')
        } else {
            // Save user data
            await AsyncStorage.setItem('userPhone', this.state.phone)
            // Set Phone Number
            User.phone = this.state.phone
            // Insert data to firebase DB
            firebase.database().ref('users/' + User.phone).set({ name: this.state.name })
            // Move Screen
            this.props.navigation.navigate('Home')
        }
    }

    render() {
        return (
            <ImageBackground source={require('../../assets/image1.jpg')} style={styles.container}>
                <View>
                    <Text style={styles.brandText}><Text style={{ color: 'rgba(43, 243, 36, 1)' }}>Go</Text>Chat</Text>
                </View>
                <TextInput
                    placeholder="Phone Number"
                    keyboardType='number-pad'
                    placeholderTextColor='white'
                    style={styles.input}
                    value={this.state.phone}
                    onChangeText={this.handlerChange('phone')}
                />
                <TextInput
                    placeholder="Name"
                    placeholderTextColor='white'
                    style={styles.input}
                    value={this.state.name}
                    onChangeText={this.handlerChange('name')}
                />
                <View>
                    <TouchableOpacity
                        onPress={this.submitForm}
                        style={{ marginTop: 10 }}
                    >
                        <Text style={styles.btnTextGo}>Go</Text>
                    </TouchableOpacity>
                </View>
            </ImageBackground>
        )
    }
}

LoginScreen.navigationOptions = {
    header: null
}




