import firestore from "@react-native-firebase/firestore"
import auth from "@react-native-firebase/auth"
export const buscarPdfDoPaciente = async () => {
    const userId = auth()?.currentUser?.uid
    const response = await firestore()
    .collection("Paciente")
    .doc(userId)
    .get()
    let urlPdf;
    if(response.exists) {
        const data = response.data();
        urlPdf = data.pdf_file;
        console.log(urlPdf)
    }
    return urlPdf ?? "";
}