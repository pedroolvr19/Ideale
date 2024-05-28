import auth from "@react-native-firebase/auth";
import { Alert } from "react-native";

/**
 * @async
 * @function
 * @description Cria um conta para o usuário
 * @param {UserCredentials} credentials - credenciais do usuário
 * @returns {Promise<object|"Error">}
 */

export const createUserWithEmailAndPassword = async ({email, senha}) => {
    try {
        const response = await auth()
            .createUserWithEmailAndPassword(email, senha)
        return response;
    } catch (error) {
        if (error.code === 'auth/email-already-in-use') {
            Alert.alert('Erro', 'Este email já está em uso.');
        } else if (error.code === 'auth/invalid-email') {
            Alert.alert('Erro', 'Email inválido.');
        } else {
            Alert.alert('Erro', 'Erro ao criar conta. Por favor, tente novamente mais tarde.');
            console.error('Erro ao criar conta:', error);
        }
        return "Error";
    }
}