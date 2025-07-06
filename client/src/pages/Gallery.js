import React, { useContext } from "react";
import {
  View,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
} from "react-native";
import { ImageContext } from "../context/ImageContext";
import DefaultLayout from "../components/DefaultLayout";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";

const Gallery = () => {
  const { images, encryptImage } = useContext(ImageContext);

  const handleEncrypted = (photoId) => {
    encryptImage(photoId);
  };

  const unencryptedImages = images.filter((img) => !img.isEncrypted);

  return (
    <DefaultLayout>
      <ScrollView contentContainerStyle={styles.container}>
        {unencryptedImages.length > 0 ? (
          unencryptedImages.map((imageData) => (
            <View key={imageData.id} style={styles.imageContainer}>
              <Image source={{ uri: imageData.imageLink }} style={styles.image} />
              <View style={styles.imageDetails}>
                <Text style={styles.imageId}>Image {imageData.photoId}</Text>
                <TouchableOpacity onPress={() => handleEncrypted(imageData.photoId)}>
                  <MaterialCommunityIcons
                    name="shield-lock"
                    size={24}
                    color="white"
                  />
                </TouchableOpacity>
              </View>
            </View>
          ))
        ) : (
          <Text style={styles.noImagesText}>No images to display</Text>
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
    marginBottom: 20,
    borderWidth: 0.5,
    borderColor: "#ccc",
    padding: 10,
    borderRadius: 10,
    backgroundColor: "#333",
  },
  image: {
    width: 120,
    height: 160,
    marginBottom: 10,
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

export default Gallery;
