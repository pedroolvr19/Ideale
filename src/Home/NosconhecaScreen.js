import React, { useEffect } from 'react';
import { View, Text, StyleSheet, Image, ScrollView, Platform } from 'react-native';
import WebView from 'react-native-webview';

const NosconhecaScreen = () => {
  useEffect(() => {
    const GoogleAerialViewScript = ({ apiKey }) => {
      useEffect(() => {
        const fetchAerialView = async () => {
          const PARAMETER_VALUE = '1600 Amphitheatre Parkway, Mountain View, CA 94043';
          const parameterKey = videoIdOrAddress(PARAMETER_VALUE);
          const urlParameter = new URLSearchParams();
          urlParameter.set(parameterKey, PARAMETER_VALUE);
          urlParameter.set('key', apiKey);
          const response = await fetch(`https://aerialview.googleapis.com/v1/videos:lookupVideo?${urlParameter.toString()}`);
          const videoResult = await response.json();

          if (videoResult.state === 'PROCESSING') {
            alert('Video still processing..');
          } else if (videoResult.error && videoResult.error.code === 404) {
            alert('Video not found. To generate video for an address, call on Aerial view renderVideo method.');
          } else {
            const videoUri = Platform.OS === 'android' ? videoResult.uris.MP4_MEDIUM.landscapeUri : videoResult.uris.MP4_MEDIUM.portraitUri;
            document.getElementById('aerial-view').src = videoUri;
          }
        };
        fetchAerialView();
      }, [apiKey]);

      return null;
    };

    const videoIdOrAddress = (value) => {
      const videoIdRegex = /[0-9a-zA-Z-_]{22}/;
      return value.match(videoIdRegex) ? 'videoId' : 'address';
    };

    const apiKey = 'AIzaSyDiEWQzagRuUAu2-Xn2FJhDJcz2ELE8mKg';

    return (
      <GoogleAerialViewScript apiKey={apiKey} />
    );
  }, []);

  return (
    <ScrollView style={styles.container}>
      <View style={styles.textBox}>
        <Text style={styles.text}>O Hospital Ideale oferece um atendimento com foco na melhor experiência do paciente, por meio do jeito Ideale de cuidar. Um compromisso assumido nas relações com o médico, colaborador , cliente, fornecedor e sociedade como um todo, baseado nos pilares: Gentileza, respeito e competência.
Contamos com uma equipe de profissionais experientes e qualificados e trabalhamos com afeto e transparência.</Text>
      </View>
      <View style={styles.mapContainer}>
        <WebView
          source={{ uri: 'https://www.google.com/maps/place/Hospital+Ideale+-+Terapia+Humanizada/@-7.9531204,-35.0056259,3a,75y,90t/data=!3m8!1e2!3m6!1sAF1QipN9bWx6tA7OndmFPUpBz6Txm1hyufeKL6EfGmle!2e10!3e12!6shttps:%2F%2Flh5.googleusercontent.com%2Fp%2FAF1QipN9bWx6tA7OndmFPUpBz6Txm1hyufeKL6EfGmle%3Dw203-h134-k-no!7i3200!8i2128!4m7!3m6!1s0x7ab11b70df183c7:0x3348ebdf7bd15167!8m2!3d-7.9532641!4d-35.0054757!10e5!16s%2Fg%2F11kdlmpv6t?entry=ttu' }}
          style={styles.map}
          javaScriptEnabled={true}
          domStorageEnabled={true}
          allowsFullscreenVideo={true}
          mediaPlaybackRequiresUserAction={false}
        />
      </View>
      <View style={styles.textBox}>
        <Text style={styles.text}>Localização:Rua Júlio Ribeiro, Vera Cruz, 936
        Camaragibe/PE - CEP:54.786-160 </Text>
      </View>
      <View style={styles.sliderContainer}>
        {/* Slider aqui */}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#2E8145',
  },
  mapContainer: {
    width: 300,
    height: 350,
    alignSelf: 'center',
    marginBottom: 20,
    borderRadius: 10,
    overflow: 'hidden',
  },
  map: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  textBox: {
    width: '80%',
    alignSelf: 'center',
    backgroundColor: '#FFF',
    padding: 20,
    borderRadius: 10,
    marginBottom: 20,
  },
  text: {
    fontSize: 16,
  },
  sliderContainer: {
    flex: 1,
  },
});

export default NosconhecaScreen;