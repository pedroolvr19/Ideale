import firestore from "@react-native-firebase/firestore";

export const ConsultarAgenda = async (tipoDoUsuario, payload) => {
    try {
        const pacienteOuMedico = tipoDoUsuario === "paciente" ? "paciente" : "medico_resposanvel"
        const response = await firestore()
            .collection("Agenda")
            .where(pacienteOuMedico, "==", payload.email)
            .get()
            console.log(response.lenght)
        let listaDeConsultas = [];
        for(let currentData of response.docs) {
            console.log(currentData.data())
            listaDeConsultas.push(currentData.data())
        }
        return listaDeConsultas
    } catch (error) {
        console.warn("error: " + error)
    }
}