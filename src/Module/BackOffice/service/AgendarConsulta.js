import firestore from "@react-native-firebase/firestore";

export const AgendarConsulta = (tipoDoUsuario, payload) => {
    console.log(payload)
    if (tipoDoUsuario === "paciente") {
        firestore()
            .collection("Agenda")
            .doc()
            .set({
                data_da_consulta: payload.dataConsulta,
                medico_resposanvel: payload.medico,
                paciente: payload.email,
                nome_paciente: payload.nomePaciente,
                
            })
    }
}