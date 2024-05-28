import React, { useState } from "react";
import { Button, Image, View, Alert } from "react-native";
import * as ImagePicker from "expo-image-picker";
import { API_URL } from "../data/api"; // Ensure this is the correct path to your API_URL
import { useUsersContext } from "../context/UserContext"; // Ensure this is the correct path to your context
export default function ImageUploader() {
  const [image, setImage] = useState(null);
  const [uploading, setUploading] = useState(false);
  const { user } = useUsersContext();
  const pickImage = async () => {
    const permissionResult =
      await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!permissionResult.granted) {
      Alert.alert("Permission to access gallery is required!");
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
    formData.append("image", {
      uri: image,
      name: "photo.jpg",
      type: "image/jpeg",
    });



    try {
      const response = await fetch(`${API_URL}/users/upload-avatar/${user.user.id}`, {
        method: 'PUT',
        body: formData
      });

      if (response.ok) {
        const responseData = await response.json();
        const data = response.data;
        console.log(data.user._id, "sfs");
        const id = data.user._id;
        console.log("id:", id);
        dispatchUser({
          type: "login_success",
          payload: { user: data, id: id },
        });
        console.log("Upload success", responseData);
        Alert.alert("Image uploaded successfully!");
      } else {
        const errorText = await response.text();
        console.error("Upload error:", response.status, errorText);
        Alert.alert(`Image upload failed: ${response.statusText}`);
      }
    } catch (error) {
      console.error("Upload error:", error);
      Alert.alert("Image upload failed!");
    } finally {
      setUploading(false);
    }
  };
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Button title="Pick an image from camera roll" onPress={pickImage} />
      {image && (
        <Image
          source={{ uri: image }}
          style={{ width: 200, height: 200, marginVertical: 10 }}
        />
      )}
      {image && (
        <Button
          title="Upload Image"
          onPress={uploadImage}
          disabled={uploading}
        />
      )}
    </View>
  );
}
