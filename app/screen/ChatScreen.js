import React from 'react'
import { SafeAreaView, Text, TextInput, Dimensions, TouchableOpacity, View, FlatList, ImageBackground, Platform } from 'react-native'
import styles from '../components/styles'
import User from '../data/User'
import firebase from 'firebase'

export default class ChatScreen extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            person: {
                name: props.navigation.getParam('name'),
                phone: props.navigation.getParam('phone')
            },
            textMessage: '',
            messageList: []
        }
    }

    componentWillMount() {
        firebase.database().ref('messages').child(User.phone).child(this.state.person.phone).on('child_added', (value) => {
            this.setState((prevState) => {
                return {
                    messageList: [...prevState.messageList, value.val()]
                }
            })
        })
    }

    handleChange = key => val => {
        this.setState({ [key]: val })
    }

    convertTime = (time) => {
        let d = new Date(time)
        let c = new Date()
        let result = (d.getHours() < 10 ? '0' : '') + d.getHours() + ':'
        result += (d.getMinutes() < 10 ? '0' : '') + d.getMinutes()
        if (c.getDay() != d.getDay()) {
            result = d.getDay() + ' ' + d.getMonth() + ' ' + result
        }
        return result
    }

    sendMessage = async () => {
        if (this.state.textMessage.length > 0) {
            let msgId = firebase.database().ref('messages').child(User.phone).child(this.state.person.phone).push().key
            let updates = {}
            let message = {
                message: this.state.textMessage,
                time: firebase.database.ServerValue.TIMESTAMP,
                from: User.phone
            }
            updates['messages/' + User.phone + '/' + this.state.person.phone + '/' + msgId] = message
            updates['messages/' + this.state.person.phone + '/' +  User.phone + '/' + msgId] = message
            console.log(updates)
            console.log(this.state.messageList)
            firebase.database().ref().update(updates)
            this.setState({ textMessage: '' })
        }
    }

    renderRow = ({item}) => {
        return (
            <View style={{
                flexDirection: 'row',
                width: '60%',
                alignSelf: item.from === User.phone ? 'flex-end' : 'flex-start',
                backgroundColor: item.from === User.phone ? '#948895a1' : '#4cbbf699',
                borderRadius: 5,
                marginBottom: 10
            }}>
                <Text style={{ color: '#fff', padding: 7, fontSize: 16 }}>{item.message}</Text>
                <Text style={{ color: '#eee', padding: 3, fontSize: 10 }}>{this.convertTime(item.time)}</Text>
            </View>
        )
    }

    render() {
        let {height, width} = Dimensions.get('window')
        return (
            <ImageBackground source={require('../../assets/image2.jpg')} style={{ width: '100%', height: '100%' }}>
                <FlatList
                    style={{ padding: 10, height: height * 0.8 }}
                    data={this.state.messageList}
                    renderItem={this.renderRow}
                    keyExtractor={(item, index) => index.toString()}
                />
                <View style={{ flexDirection: 'row', alignItems: 'center', marginLeft: 15, marginBottom: Platform.OS === 'ios' ? 30 : 10 }} >
                    <TextInput
                        style={styles.input}
                        value={this.state.textMessage}
                        placeholderTextColor='white'
                        placeholder="Type message...."
                        onChangeText={this.handleChange('textMessage')}
                    />
                    <TouchableOpacity onPress={this.sendMessage} style={{ marginLeft: 15 }} >
                        <Text style={styles.btnTextGo}>Send</Text>
                    </TouchableOpacity>
                </View>
            </ImageBackground>
        )
    }
}

ChatScreen.navigationOptions = ({ navigation }) => {
    return {
        title: navigation.getParam('name', null)
    }
}