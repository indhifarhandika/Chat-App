import { StyleSheet } from 'react-native'

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
      borderColor: "rgba(43, 243, 36, 1)",
      color: 'white',
      width: '80%',
      marginVertical: 5,
      borderRadius: 5
    },
    inputChat: {
        padding: 10,
        borderWidth: 1,
        borderColor: "black",
        width: '80%',
        marginVertical: 5,
        borderRadius: 5
      },
    btnTextGo: {
      fontSize: 23,
      color: "rgba(43, 243, 36, 1)"
    }
})

export default styles