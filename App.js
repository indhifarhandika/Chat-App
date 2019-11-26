import React from 'react'
import { createStackNavigator } from 'react-navigation'
import LoginScreen from './app/screen/LoginScreen'
import HomeScreen from './app/screen/HomeScreen'
import AuthLoadingScreen from './app/screen/AuthLoadingScreen'
import ChatScreen from './app/screen/ChatScreen'

const AppNavigation = createStackNavigator({
  AuthLoading: AuthLoadingScreen,
  Login: LoginScreen,
  Home: HomeScreen,
  Chat: ChatScreen
},{
  initialRouteName: 'AuthLoading'
})

export default class App extends React.Component {
  render() {
    return (
      <AppNavigation />
    )
  }
}