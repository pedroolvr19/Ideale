import { Alert } from "react-native";
import { createUserDocument } from "../../../services/createUserDocument";
import { getFCMToken } from "../../../services/requestUserPermissionMessaging";
import { createUserWithEmailAndPassword } from "./firebase/createUserWithEmailAndPassword";
import auth from "@react-native-firebase/auth"
/**
 * @async
 * @function signUpService
 * @param {Object} param
 * @param {string} param.email - email do usuário
 * @param {string} param.senha - senha do usuário
 * @param {string} param.confirmarSenha - confirmação de senha
 * @param {string} param.nome - nome do usuário
 * @param {string} param.numero - numero do usuário.
 * @returns {Promise<void>}
 */

export const signUpService = async ({ email, senha, confirmarSenha, nome, numero }) => {
    if (!email || !senha || !confirmarSenha || !nome || !numero) {
        Alert.alert('Erro', 'Por favor, preencha todos os campos.');
        return;
    }

    if (senha.length < 5) {
        Alert.alert('Erro', 'A senha deve ter no mínimo 5 caracteres.');
        return;
    }

    if (senha !== confirmarSenha) {
        Alert.alert('Erro', 'As senhas não coincidem. Por favor, tente novamente.');
        return;
    }

    const userData = await createUserWithEmailAndPassword({ email, senha });
    if (userData !== "Error") {
        console.log("Usuário criado");
        const userId = auth().currentUser?.uid;
        const tokenFCM = await getFCMToken();
        const payload = {
            nome: nome,
            telefone: numero,
            email: email,
            token_fcm: tokenFCM
        }
        await createUserDocument(payload, userId)
    }
};