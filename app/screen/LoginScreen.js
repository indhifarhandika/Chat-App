import React from 'react';
import {
  View,
  TextInput,
  Alert,
  Text,
  TouchableOpacity,
  StyleSheet,
  AsyncStorage,
  ImageBackground
} from 'react-native'

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
    if (this.state.phone.length < 11) {
      Alert.alert('Error', 'Wrong phone number')
    }else if(this.state.name.length < 4) {
      Alert.alert('Error', 'Wrong name')
    }else{
      // Save user data
      await AsyncStorage.setItem('userPhone', this.state.phone)
      this.props.navigation.navigate('Home')
    }
  }

  render() {
    return (
      <ImageBackground source={ require('../../assets/image1.jpg') } style={styles.container}>
        <View>
          <Text style={styles.brandText}>GoChat</Text>
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF'
  },
  brandText: {
    fontSize: 30,
    marginBottom: 25,
    color: 'white'
  },
  input: {
    padding: 10,
    borderWidth: 1,
    borderColor: "#ccc",
    color: 'white',
    width: '90%',
    marginVertical: 5,
    borderRadius: 5
  },
  btnTextGo: {
    fontSize: 20,
    color: "rgba(43, 243, 36, 1)"
  }
})


