import { useEffect } from "react";
import { View } from "react-native"
import { WebView } from "react-native-webview";

export const ArquivoDoPaciente = ({navigation, route}) => {
    useEffect(() => {console.log("entrou")}, [])
    return (
        <WebView 
            source={{ uri: route.params?.url_pdf + "&embedded=true" }}
        />
    );
}