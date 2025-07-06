import React, { useContext } from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import DefaultLayout from "../components/DefaultLayout";
import AntDesign from "@expo/vector-icons/AntDesign";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import * as ImagePicker from "expo-image-picker";
import { ImageContext } from "../context/ImageContext";
import Camera from "../../images/camera.png";
import Toast from "react-native-toast-message";

const HomePage = () => {
  const { selectedImage, setSelectedImage, addImage } = useContext(ImageContext);

  const openImagePicker = async () => {
    const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (!permissionResult.granted) {
      Toast.show({ type: "error", text1: "Permission Denied", text2: "Gallery access is required." });
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 5],
      quality: 1,
    });

    if (!result.canceled) {
      setSelectedImage(result.assets[0].uri);
    }
  };

  const handleCameraLaunch = async () => {
    const permissionResult = await ImagePicker.requestCameraPermissionsAsync();

    if (!permissionResult.granted) {
      Toast.show({ type: "error", text1: "Permission Denied", text2: "Camera access is required." });
      return;
    }

    const result = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      aspect: [4, 5],
      quality: 1,
    });

    if (!result.canceled) {
      setSelectedImage(result.assets[0].uri);
    }
  };

  const handleUpload = () => {
    if (!selectedImage) {
      Toast.show({ type: "error", text1: "Error", text2: "No image selected." });
      return;
    }

    addImage(selectedImage);
    setSelectedImage(null);

    Toast.show({ type: "success", text1: "Success", text2: "Image saved successfully!" });
  };

  return (
    <DefaultLayout>
      <View style={styles.container}>
        <View style={styles.previewBox}>
          {selectedImage ? (
            <>
              <MaterialIcons name="cancel" style={{ marginLeft: "auto" }} size={24} color="red" onPress={() => setSelectedImage(null)} />
              <Image source={{ uri: selectedImage }} style={styles.image} resizeMode="contain" />
            </>
          ) : (
            <Image source={Camera} style={styles.image} resizeMode="contain" />
          )}
        </View>

        <View style={{ gap: 20 }}>
          {selectedImage ? (
            <TouchableOpacity style={styles.buttons} onPress={handleUpload}>
              <AntDesign name="download" size={24} color="white" />
              <Text style={styles.buttonText}>Save</Text>
            </TouchableOpacity>
          ) : (
            <>
              <TouchableOpacity style={styles.buttons} onPress={handleCameraLaunch}>
                <AntDesign name="camerao" size={24} color="white" />
                <Text style={styles.buttonText}>Camera</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.buttons} onPress={openImagePicker}>
                <AntDesign name="upload" size={24} color="white" />
                <Text style={styles.buttonText}>Upload</Text>
              </TouchableOpacity>
            </>
          )}
        </View>
      </View>
    </DefaultLayout>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-between",
    paddingTop: 30,
    paddingBottom: 70,
    alignItems: "center",
  },
  previewBox: {
    padding: 30,
    paddingTop: 10,
    borderWidth: 1,
    borderColor: "#fff",
    borderRadius: 20,
    gap: 10,
  },
  buttons: {
    backgroundColor: "#0a6c76",
    padding: 16,
    paddingHorizontal: 24,
    borderRadius: 10,
    gap: 10,
    flexDirection: "row",
    justifyContent: "center",
    borderWidth: 0.5,
    borderColor: "#fff",
  },
  buttonText: {
    fontWeight: "bold",
    color: "#fff",
    fontSize: 20,
  },
  image: {
    width: 200,
    height: 250,
    borderRadius: 10,
  },
});

export default HomePage;
