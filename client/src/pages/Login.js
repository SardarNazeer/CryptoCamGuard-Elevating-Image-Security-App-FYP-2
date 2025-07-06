import React, { useState } from "react";
import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Image,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useNavigation } from "@react-navigation/native";
import Toast from "react-native-toast-message";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigation = useNavigation();

  const handleCreateAccount = () => {
    navigation.navigate("Signup");
  };

  const handleSubmit = async () => {
    if (!email || !password) {
      Toast.show({
        type: "error",
        text1: "Login Failed",
        text2: "Please fill in both fields.",
      });
      return;
    }

    setIsLoading(true);

    setTimeout(() => {
      if (
        email.trim().toLowerCase() === "alisher@gmail.com" &&
        password === "12345"
      ) {
        navigation.navigate("Home");
        setEmail("");
        setPassword("");
        Toast.show({
          type: "success",
          text1: "Login Success",
          text2: "Welcome Admin!",
        });
      } else {
        Toast.show({
          type: "error",
          text1: "Login Failed",
          text2: "Invalid email or password.",
        });
      }
      setIsLoading(false);
    }, 1000); // Simulate network delay
  };

  return (
    <LinearGradient
      colors={["#0D1B2A", "#10E0F0"]}
      start={{ x: 0.5, y: 0.3 }}
      end={{ x: 0.5, y: 1 }}
      style={{ flex: 1 }}
    >
      <View style={styles.container}>
        <StatusBar style="auto" />
        <Image source={require("../../images/logo.png")} style={styles.logo} />
        <Text style={styles.title}>CryptoCamGuard</Text>
        <TextInput
          placeholder="Enter Email"
          style={styles.input}
          keyboardType="email-address"
          value={email}
          onChangeText={(text) => setEmail(text)}
          autoCapitalize="none"
        />
        <TextInput
          placeholder="Password"
          style={styles.input}
          secureTextEntry
          value={password}
          onChangeText={(text) => setPassword(text)}
          autoCapitalize="none"
        />
        <TouchableOpacity
          style={[styles.button, isLoading && styles.buttonDisabled]}
          onPress={handleSubmit}
          disabled={isLoading}
        >
          <Text style={styles.buttonText}>
            {isLoading ? "Logging In..." : "Login"}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity>
          <Text style={styles.forgotPasswordText}>Forgot Password?</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.createAccountButton}
          onPress={handleCreateAccount}
        >
          <Text style={styles.buttonText}>Create New Account</Text>
        </TouchableOpacity>
      </View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 80,
    alignItems: "center",
    paddingHorizontal: 20,
  },
  logo: {
    width: 200,
    height: 200,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#fff",
    marginBottom: 30,
  },
  input: {
    width: "80%",
    height: 35,
    backgroundColor: "#fff",
    borderRadius: 8,
    paddingHorizontal: 15,
    color: "black",
    marginBottom: 20,
  },
  button: {
    width: "80%",
    height: 40,
    backgroundColor: "#0d1b2a",
    borderRadius: 20,
    marginTop: 10,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 10,
  },
  buttonDisabled: {
    backgroundColor: "#555",
  },
  buttonText: {
    color: "#ffffff",
    fontSize: 16,
    fontWeight: "bold",
  },
  createAccountButton: {
    width: "80%",
    height: 40,
    backgroundColor: "#0d1b2a",
    borderRadius: 20,
    marginTop: 70,
    justifyContent: "center",
    alignItems: "center",
  },
  forgotPasswordText: {
    color: "#fff",
    marginBottom: 20,
    marginTop: 20,
  },
});

export default Login;
