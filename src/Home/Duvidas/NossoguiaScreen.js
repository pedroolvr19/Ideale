import React from 'react';
import { ScrollView, Image, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const NossoguiaScreen = () => {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        <Image
          source={require('../Duvidas/img/pdf1.png')}
          style={styles.image} // Ajuste a altura conforme necessário
        />
        <Image
          source={require('../Duvidas/img/pdf2.png')}
          style={styles.image} // Ajuste a altura conforme necessário
        />
        <Image
          source={require('../Duvidas/img/pdf3.png')}
          style={styles.image} // Ajuste a altura conforme necessário
        />
        <Image
          source={require('../Duvidas/img/pdf4.png')}
          style={styles.image} // Ajuste a altura conforme necessário
        />
        <Image
          source={require('../Duvidas/img/pdf5.png')}
          style={styles.image} // Ajuste a altura conforme necessário
        />
        <Image
          source={require('../Duvidas/img/pdf6.png')}
          style={styles.image} // Ajuste a altura conforme necessário
        />
        <Image
          source={require('../Duvidas/img/pdf7.png')}
          style={styles.image} // Ajuste a altura conforme necessário
        />
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    
    backgroundColor: '#17322D', // Define o fundo como preto
  },
  scrollViewContent: {
    flexGrow: 1,
  },
  image: {
    width: '100%',
    height: 600, // Ajuste a altura conforme necessário
  },
});

export default NossoguiaScreen;
