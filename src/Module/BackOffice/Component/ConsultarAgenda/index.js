import React from 'react';
import auth from "@react-native-firebase/auth";
import AgendaMedico from '../AgendaMedico';
import AgendaPaciente from '../AgendaPaciente';

const ConsultarAgenda = () => {
  if(auth().currentUser?.email.endsWith("@ideale.com")) {
    return (
      <AgendaMedico />
    );
  }

  return <AgendaPaciente />
};



export default ConsultarAgenda;