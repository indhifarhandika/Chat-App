import React from 'react'
import { View, Text } from 'react-native'

export default class HomeScreen extends React.Component {
    render() {
        return (
            <View>
                <Text>This is Home Screen</Text>
            </View>
        )
    }
}

HomeScreen.navigationOptions = {
    header: null
}