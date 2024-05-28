import firestore from "@react-native-firebase/firestore";

/**
 * @async
 * @function
 * @description Cria um documento para o usuário na coleção "Paciente"
 * @param {Object} payload
 * @param {string} payload.nome - nome do usuário
 * @param {string} payload.email - email do usuário
 * @param {string} payload.telefone - número do telefone do usuário
 * @param {string} payload.token_fcm - token fcm do usuário
 * @param {string} documentId - ID de autenticação do usuário
 * @returns {Promise<void>}
 */

export const createUserDocument = async (payload, documentId) => {
    await firestore().collection("Paciente").doc(documentId).set(payload)
        .then(() => {
            console.log("Dados do paciente salvos no Firestore");
        })
        .catch((error) => {
            console.error("Erro ao salvar os dados do paciente:", error);
        });
}