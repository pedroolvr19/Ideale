import auth from "@react-native-firebase/auth";
import firestore from "@react-native-firebase/firestore";
export const refreshFCMToken = async (token) => {
    const userId = auth()?.currentUser?.uid;
    console.log(userId)
    try {
      const response = await firestore()
        .collection("Paciente")
        .doc(userId)
        .update({
          token_fcm: token
        })
      console.log("Atualização feita com sucesso!!")
      console.log(response)
    } catch (error) {
      console.warn("refreshToken error: ", error)
    }
  }