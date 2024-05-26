import firestore from "@react-native-firebase/firestore"
import { buscarPacientePeloId } from "./buscarPacientePeloId";
export const buscarPdfDoPaciente = async () => {
    const userData = await buscarPacientePeloId();
    let urlPDFList = [];
    for(let currentReference of userData.data().reference) {
        const infoArray = currentReference.split("/")
        const response = await firestore()
        .collection(infoArray[0])
        .doc(infoArray[1])
        .get()
        if(response.exists) {
            const data = response.data();
            urlPdf = data.exame_link;
            urlPDFList.push({link: urlPdf, name: data.nome_arquivo});
            console.log(urlPdf)
        }
    }
    return urlPDFList ?? [];
}