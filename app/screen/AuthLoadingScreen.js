import React from 'react'
import { ActivityIndicator, AsyncStorage, StatusBar, StyleSheet, View } from 'react-native'
import firebase from 'firebase'
import User from '../data/User'

class AuthLoadingScreen extends React.Component {
    constructor(props) {
        super(props)
        this._bootstrapAsync()
    }

    componentWillMount() {
        // Firebase configuration
        var firebaseConfig = {
            apiKey: "AIzaSyCMgP7MryQVFlg3lnfjbYiN7J1vyG6dszI",
            authDomain: "ifr-chatapp-v1.firebaseapp.com",
            databaseURL: "https://ifr-chatapp-v1.firebaseio.com",
            projectId: "ifr-chatapp-v1",
            storageBucket: "ifr-chatapp-v1.appspot.com",
            messagingSenderId: "667964914156",
            appId: "1:667964914156:web:7be2321cf9a12ab224e8c9"
        }
        // Initialize Firebase
        firebase.initializeApp(firebaseConfig)
    }

    _bootstrapAsync = async () => {
        User.phone = await AsyncStorage.getItem('userPhone')

        this.props.navigation.navigate(User.phone ? 'Home' : 'Login')
    }

    render() {
        return (
            <View>
                <ActivityIndicator />
                <StatusBar barStyle='default' />
            </View>
        )
    }
}
export default AuthLoadingScreen