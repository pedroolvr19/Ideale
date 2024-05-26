import firestore from "@react-native-firebase/firestore";
import auth from "@react-native-firebase/auth";

export const buscarPacientePeloId = async () => {
    const userId = auth()?.currentUser?.uid
    try {
        const reponse = await firestore().collection("Paciente").doc(userId).get()
        if(reponse.exists) {
            console.log("response", reponse.data())
            return reponse;
        }
    } catch (error) {
        console.warn("erro; " + error)
    }
}