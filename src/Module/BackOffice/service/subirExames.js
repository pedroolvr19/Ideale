import firestore from "@react-native-firebase/firestore";
import auth from "@react-native-firebase/auth";

export const subirExames = async (payload) => {
    const userEmail = auth()?.currentUser?.email;
    const response = await firestore()
    .collection("Exames")
    .add({
        nome_arquivo: payload.nomeArquivo,
        medico_email: userEmail,
        paciente_email: payload.pacienteEmail,
        exame_link: payload.urlPDF
    })
    console.log(response.id)
    return response.id;
} 