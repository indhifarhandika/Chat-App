import React from 'react'
import { View, Text, TouchableOpacity, FlatList, AsyncStorage, Button, Image, SafeAreaView } from 'react-native'
import firebase from 'firebase'
import User from '../data/User'
import styles from '../components/styles'

export default class HomeScreen extends React.Component {

    state = {
        users: []
    }

    componentWillMount() {
        let dbRef = firebase.database().ref('users')
        dbRef.on('child_added', (val) => {
            let person = val.val()
            person.phone = val.key
            if (person.phone === User.phone) {
                User.name = person.name
            }else{
                this.setState((prevState) => {
                    return {
                        users: [...prevState.users, person]
                    }
                })
            }
        })
    }

    renderRow = ({ item }) => {
        return (
            <TouchableOpacity
                style={{ padding: 10, borderBottomColor: '#ccc', borderBottomWidth: 1 }}
                onPress={() => this.props.navigation.navigate('Chat', item)}
            >
                <Text style={{ fontSize: 20 }}>{item.name}</Text>
            </TouchableOpacity>
        )
    }

    render() {
        return (
            <SafeAreaView>
                <FlatList
                    data={this.state.users}
                    renderItem={this.renderRow}
                    keyExtractor={(item) => item.phone}
                />
            </SafeAreaView>
        )
    }
}

HomeScreen.navigationOptions = ({ navigation }) => {
    return {
        title: "GoChat",
        headerRight: (
            <TouchableOpacity style={{marginRight: 20}} onPress={() => console.log(navigation.navigate('Profile'))}>
                <Image source={ require('../../assets/akun.png') } style={{ width: 30, height: 30 }} />
            </TouchableOpacity>
        ),
        headerLeft: null
    }
}