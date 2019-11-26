import React from 'react'
import { View, Text, TouchableOpacity, AsyncStorage } from 'react-native'
import User from '../data/User'
import styles from '../components/styles'

export default class HomeScreen extends React.Component {
    
    // Logout
    _logout = async () => {
        await AsyncStorage.clear()
        this.props.navigation.navigate('Login')
    }
    
    render() {
        return (
            <View style={styles.container}>
                <Text>Welcome, { User.phone }</Text>
                <TouchableOpacity onPress={this._logout} >
                    <Text>Logout</Text>
                </TouchableOpacity>
            </View>
        )
    }
}

HomeScreen.navigationOptions = {
    title: "GoChat"
}