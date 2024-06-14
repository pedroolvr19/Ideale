import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
    },
    content: {
      alignItems: "center",
    },
    title: {
      fontSize: 35,
      fontWeight: "bold",
      marginBottom: 30,
      color: "#fff",
      textShadowColor: "#000",
      textShadowOffset: { width: 1, height: 1 },
      textShadowRadius: 1,
    },
    input: {
      width: 250,
      height: 40,
      borderColor: "white",
      borderWidth: 1,
      marginBottom: 15,
      paddingHorizontal: 10,
      backgroundColor: "#fff",
      borderRadius: 15,
    },
    button: {
      backgroundColor: "#17322D",
      padding: 10,
      borderRadius: 20,
      height: 50,
      width: 120,
      alignItems: "center",
      justifyContent: "center",
      marginTop: 20,
    },
    buttonText: {
      color: "#fff",
      fontWeight: "bold",
    },
    logo: {
      width: 500,
      height: 300,
      marginBottom: 0,
      marginTop: -70,
    },
    openTermsButton: {
      color: "#fff",
      textDecorationLine: "underline",
      fontWeight: "bold",
      marginTop: 0,
    },
    modalContainer: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: "rgba(0, 0, 0, 0.5)",
    },
    modalContent: {
      backgroundColor: "#fff",
      padding: 20,
      borderRadius: 10,
      elevation: 5,
    },
    modalText: {
      fontSize: 16,
      marginBottom: 10,
    },
    acceptButton: {
      fontSize: 18,
      color: "#17322D",
      textAlign: "center",
    },
    footerLink: {
      color: "#102114",
      textDecorationLine: "underline",
      marginTop: 25,
      fontSize: 17,
    },
    checkboxContainer: {
      flexDirection: "row",
      alignItems: "center",
      marginBottom: 15,
    },
    checkbox: {
      width: 20,
      height: 20,
      borderRadius: 5,
      borderWidth: 2,
      borderColor: "#fff",
      marginRight: 10,
    },
    checked: {
      backgroundColor: "#17322D",
    },
    checkboxLabel: {
      fontSize: 16,
      color: "#fff",
      fontWeight: "bold",
    },
    footerLink: {
      color: '#fff',
      fontWeight: 'bold', // Adicione esta linha
      textAlign: 'center',
      marginTop: 10,
  },
  });