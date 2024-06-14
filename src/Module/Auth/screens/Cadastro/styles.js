import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      padding: 20,
    },
    title: {
      fontSize: 30,
      fontWeight: 'bold',
      marginBottom: 20,
      color: '#17322D',
    },
    input: {
      width: 300,
      height: 40,
      borderColor: '#fff',
      borderWidth: 1,
      marginBottom: 15,
      paddingHorizontal: 10,
      backgroundColor: '#fff',
      borderRadius: 15,
    },
    passwordContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      width: 300,
      borderColor: '#fff',
      borderWidth: 1,
      marginBottom: 15,
      paddingHorizontal: 10,
      backgroundColor: '#fff',
      borderRadius: 15,
    },
    inputPassword: {
      flex: 1,
      height: 40,
    },
    button: {
      backgroundColor: '#17322D',
      padding: 15,
      borderRadius: 20,
      width: 300,
      alignItems: 'center',
      justifyContent: 'center',
      marginTop: 20,
    },
    buttonText: {
      color: '#fff',
      fontWeight: 'bold',
      fontSize: 18,
    },
    logo: {
      width: 460,
      height: 300,
      marginBottom: 10,
    },
    footerLink: {
      color: '#fff',
      textDecorationLine: 'underline',
      marginTop: 20,
    },
  });