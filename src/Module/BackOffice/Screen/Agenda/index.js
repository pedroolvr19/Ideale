import auth from "@react-native-firebase/auth";
import ConfirmarAgendamento from "../../Component/ConfirmarAgendamento";
import ConsultarAgenda from "../../Component/ConsultarAgenda";

export const Agenda = () => {
    if(auth().currentUser?.email === "gestor@ideale.com") { 
        return (
            <ConfirmarAgendamento />
        );
     }

     return (
        <ConsultarAgenda />
     );
}