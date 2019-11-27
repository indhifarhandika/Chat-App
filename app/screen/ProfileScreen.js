import React from 'react'
import { View, Button, Text, AsyncStorage, Image } from 'react-native'
import styles from '../components/styles'
import User from '../data/User'

export default class ProfileScreen extends React.Component {
    // Logout
    _logout = async () => {
        // Remove data from database
        // firebase.database().ref('users/' + User.phone).remove()

        await AsyncStorage.clear()
        this.props.navigation.navigate('Login')
    }
    
    render() {
        return (
            <View style={styles.container} >
                <View>
                    <Image source={require('../../assets/akun.png')} style={{ width: 100, height: 100 }} />
                </View>
                <View>
                    <Text>Nama : {User.name}</Text>
                    <Text>Phone : {User.phone}</Text>
                </View>
                <Button
                    onPress={this._logout}
                    title='Logout'
                />
            </View>
        )
    }
}

ProfileScreen.navigationOptions = {
    title: 'Profile'
}