import React, { useContext, useState } from "react";
import {
  View,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
} from "react-native";
import DefaultLayout from "../components/DefaultLayout";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { ImageContext } from "../context/ImageContext";
import Toast from "react-native-toast-message";

const EncryptedImages = () => {
  const { images, decryptImage } = useContext(ImageContext);
  const [showImageState, setShowImageState] = useState({});

  const encryptedImages = images.filter((img) => img.isEncrypted);

  const toggleShowImage = (photoId) => {
    setShowImageState((prev) => ({
      ...prev,
      [photoId]: !prev[photoId],
    }));
  };

  const handleDecrypt = (photoId) => {
    decryptImage(photoId);
    Toast.show({
      type: "success",
      text1: `Image ${photoId} decrypted successfully!`,
    });
  };

  return (
    <DefaultLayout>
      <ScrollView contentContainerStyle={styles.container}>
        {encryptedImages.length > 0 ? (
          encryptedImages.map((imageData) => (
            <View key={imageData.id} style={styles.imageContainer}>
              {!showImageState[imageData.photoId] ? (
                <>
                  <FontAwesome
                    name="eye"
                    size={64}
                    color="white"
                    onPress={() => toggleShowImage(imageData.photoId)}
                  />
                  <Text style={styles.imageId}>Image {imageData.photoId}</Text>
                </>
              ) : (
                <>
                  <Image
                    source={{ uri: imageData.imageLink }}
                    style={styles.image}
                  />
                  <View style={styles.imageDetails}>
                    <FontAwesome
                      name="eye-slash"
                      size={24}
                      color="white"
                      onPress={() => toggleShowImage(imageData.photoId)}
                    />
                    <TouchableOpacity onPress={() => handleDecrypt(imageData.photoId)}>
                      <MaterialCommunityIcons
                        name="shield-lock-open"
                        size={24}
                        color="white"
                      />
                    </TouchableOpacity>
                  </View>
                </>
              )}
            </View>
          ))
        ) : (
          <Text style={styles.noImagesText}>No Encrypted images yet</Text>
        )}
      </ScrollView>
    </DefaultLayout>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    padding: 10,
  },
  imageContainer: {
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 20,
    borderWidth: 0.5,
    borderColor: "#ccc",
    padding: 10,
    borderRadius: 10,
    backgroundColor: "#333",
    width: 150,
    height: 200,
  },
  image: {
    width: 120,
    height: 160,
    resizeMode: "contain",
    borderRadius: 4,
  },
  imageDetails: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: 140,
  },
  imageId: {
    color: "white",
    fontWeight: "bold",
    fontSize: 16,
  },
  noImagesText: {
    fontSize: 18,
    color: "#fff",
    textAlign: "center",
    marginTop: 20,
  },
});

export default EncryptedImages;
