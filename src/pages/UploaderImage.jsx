// App.js
import React, { useState } from 'react';
import { Button, Image, View } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { API_URL } from '../data/api';
import axios from 'axios';
import { useUsersContext } from '../context/UserContext';

export default function ImageUploader() {
  const [image, setImage] = useState(null);
  const [uploading, setUploading] = useState(false);
  const { avatarImg, user } = useUsersContext();

  const pickImage = async () => {
    // Request permission to access the gallery
    const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (permissionResult.granted === false) {
      alert("Permission to access gallery is required!");
      return;
    }

    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  const uploadImage = async () => {
    if (!image) return;

    setUploading(true);

    let formData = new FormData();
    formData.append('image', {
      uri: image,
      name: `photo.jpg`,
      type: `image/jpeg`,
    });

    try {
      const response = await axios.put(
        `${API_URL}/users/${user.user.id}`,
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }
      );
      console.log('Upload success', response.data);
      alert('Image uploaded successfully!');
    } catch (error) {
      console.error('Upload error', error);
      alert('Image upload failed!');
    } finally {
      setUploading(false);
    }
  };

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Button title="Pick an image from camera roll" onPress={pickImage} />
      {image && <Image source={{ uri: image }} style={{ width: 200, height: 200 }} />}
      {image && (
        <Button title="Upload Image" onPress={uploadImage} disabled={uploading} />
      )}
    </View>
  );
}
