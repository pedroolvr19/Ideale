import { Alert } from "react-native";
import { signInWithEmailAndPassword } from "./firebase/signInWithEmailAndPassword";

/**
 * @async
 * @function
 * @description Validar os dados inseridos para chamar a função signInWithEmailAndPassword.
 * @param {Object} params - informações do usuário
 * @param {string} params.email - email do usuário
 * @param {string} params.senha - senha do usuário
 * @param {boolean} params.isChecked - se os termos foram aceitos
 * @returns {Promise<void>} retorna nada
 */

export const signInService = async ({isChecked, email, senha}) => {
    if (!isChecked) {
      Alert.alert("Erro", "Por favor, aceite os termos para fazer login.");
      return;
    }

    if (!email || !senha) {
      Alert.alert("Erro", "Por favor, preencha todos os campos.");
      return;
    }

    await signInWithEmailAndPassword({email, senha})
  };