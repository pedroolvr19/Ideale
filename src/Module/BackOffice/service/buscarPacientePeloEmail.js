import firestore from "@react-native-firebase/firestore";

export const buscarPacientePeloEmail = async ({pacienteEmail}) => {
    console.log(pacienteEmail);
    try {
        const reponse = await firestore().collection("Paciente").where("email", "==", pacienteEmail).get()
        return reponse;
    } catch (error) {
        console.warn("erro; " + error)
    }
}