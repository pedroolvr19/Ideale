import firestore from "@react-native-firebase/firestore";
import auth from "@react-native-firebase/auth";

export const vincularExames = async (payload) => {
    const userId = auth()?.currentUser?.uid;
    //somente o medico
    const responseMedico = await firestore()
    .collection("Paciente")
    .doc(userId)
    .get()

    console.log("Referencia para o medico")
    await firestore()
    .collection("Paciente")
    .doc(userId)
    .update({
        reference: [...responseMedico.data().reference ?? "", `Exames/${payload.referenciaParaExames}`],
    })
    //somente o paciente
    console.log("Buscar paciente")
    const responsePaciente = await firestore()
    .collection("Paciente")
    .where("email", "==", payload.emailPaciente)
    .get()
    
    const documentId = responsePaciente.docs[0].id;
    await firestore()
    .collection("Paciente")
    .doc(documentId)
    .update({
        reference: [...responsePaciente.docs[0].data().reference ?? "", `Exames/${payload.referenciaParaExames}`],
    })
}

//[`Exames/${payload.referenciaParaExames}`]