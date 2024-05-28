import auth from "@react-native-firebase/auth";
import { Alert } from "react-native";

/**
 * @async
 * @function
 * @description Realizar o login do usuário por meio do email e senha
 * @param {Object} payload - informações do usuário
 * @param {string} payload.email - email do usuário
 * @param {string} payload.senha - senha do usuário
 * @returns {Promise<void>} retorna nada
 */
export const signInWithEmailAndPassword = async ({email, senha}) => {
    await auth()
      .signInWithEmailAndPassword(email, senha)
      .then(() => {
        console.log("Entrou com sucesso");
      })
      .catch((error) => {
        if (error.code === "auth/invalid-credential") {
          console.log("Credenciais inválidas");
          Alert.alert(
            "Erro",
            "Credenciais inválidas"
          );
        }

        if (error.code === "auth/invalid-email") {
          console.log("That email address is invalid!");
          Alert.alert(
            "Erro",
            "Email não reconhecido. Por favor, verifique o email e tente novamente."
          );
        }

        console.error(error);
      });
}