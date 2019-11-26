import React from 'react'
import { createStackNavigator } from 'react-navigation'
import LoginScreen from './app/screen/LoginScreen'
import HomeScreen from './app/screen/HomeScreen'

const AppNavigation = createStackNavigator({
  Login: LoginScreen,
  Home: HomeScreen
},{
  initialRouteName: 'Login'
})

export default class App extends React.Component {
  render() {
    return (
      <AppNavigation />
    )
  }
}