import React, { useState } from 'react';
import { View, Text, Button, Image, StyleSheet, Alert } from 'react-native';
import { launchImageLibrary } from 'react-native-image-picker';



export default function ArquivosM() {
  const [imageUri, setImageUri] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [transferred, setTransferred] = useState(0);

  const selectImage = () => {
    launchImageLibrary({ mediaType: 'photo' }, response => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else {
        const source = { uri: response.assets[0].uri };
        setImageUri(source.uri);
      }
    });
  };

  const uploadImage = async () => {
    if (imageUri == null) {
      return null;
    }
    const uploadUri = imageUri;
    let filename = uploadUri.substring(uploadUri.lastIndexOf('/') + 1);

    setUploading(true);
    setTransferred(0);

    const storageRef = storage().ref(`uploads/${filename}`);
    const task = storageRef.putFile(uploadUri);

    task.on('state_changed', snapshot => {
      setTransferred(
        Math.round(snapshot.bytesTransferred / snapshot.totalBytes) * 100
      );
    });

    try {
      await task;
      Alert.alert(
        'Foto enviada!',
        'Sua foto foi enviada para o Firebase Cloud Storage!'
      );
      setImageUri(null);
    } catch (e) {
      console.error(e);
    }
    setUploading(false);
  };

  return (
    <LinearGradient
      colors={['#10C2A2', '#11D26E']}
      style={styles.container}
    >
      <View style={styles.container}>
        <Text style={styles.title}>Upload de Arquivos</Text>
        <View style={styles.subtitleContainer}>
          <Text style={styles.subtitle}>Selecione uma imagem e faça o upload.</Text>
        </View>
        <Button title="Selecione uma imagem" onPress={selectImage} />
        {imageUri && (
          <Image source={{ uri: imageUri }} style={styles.image} />
        )}
        <Button
          title="Upload"
          onPress={uploadImage}
          disabled={uploading}
        />
        {uploading && (
          <View style={styles.progressBarContainer}>
            <View style={[styles.progressBar, { width: `${transferred}%` }]} />
          </View>
        )}
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  input: {
    width: 320,
    height: 45,
    borderColor: 'white',
    borderWidth: 1,
    marginBottom: 15,
    paddingHorizontal: 10,
    backgroundColor: '#fff',
    borderRadius: 15,
  },
  button: {
    backgroundColor: '#17322D',
    padding: 10,
    borderRadius: 20,
    height: 50,
    width: '60%',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#fff',
    textShadowColor: '#000',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 1,
    marginTop: 10,
  },
  subtitleContainer: {
    backgroundColor: '#fff',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 10,
    marginBottom: 15,
  },
  subtitle: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#235239',
    textAlign: 'center',
  },
  image: {
    width: 200,
    height: 200,
    marginBottom: 20,
  },
  progressBarContainer: {
    marginTop: 20,
    width: '100%',
    height: 20,
    backgroundColor: '#e0e0e0',
    borderRadius: 5,
  },
  progressBar: {
    height: 20,
    borderRadius: 5,
    backgroundColor: '#3b5998',
  },
});