import { Dimensions, StyleSheet, View, Text } from "react-native"
import Pdf from "react-native-pdf";

export const ArquivoDoPaciente = ({ navigation, route }) => {
    if (!route.params.uri) {
        return (
            <View style={styles.container}>
                <Text>PDF não encontrado</Text>
            </View>
        )
    }
    return (
        <View style={styles.container}>
            <Pdf
                trustAllCerts={false}
                source={{uri: route.params.uri}}
                onError={(error) => {
                    console.warn(error);
                }}
                style={styles.pdf} />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'center',
        marginTop: 25,
    },
    pdf: {
        flex: 1,
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height,
    }
});