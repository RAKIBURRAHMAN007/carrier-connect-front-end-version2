import React, { useContext, useState } from "react";
import {
  Alert,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import LottieView from "lottie-react-native";
import anim from "../src/animation/Animation - 1744827972100.json";
import { auth, AuthContext } from "../Auth/AuthProvider";
import { sendPasswordResetEmail, signOut } from "firebase/auth";

const SeekerLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const navigation = useNavigation();
  const { userLogin, setUser, googleSignIn } = useContext(AuthContext);
  const handleLogin = () => {
    if (email.length === 0 || password.length === 0) {
      Alert.alert("All fields are required");
      return;
    }
    userLogin(email, password)
      .then((result) => {
        const user = result.user;
        if (user.emailVerified) {
          setUser(user);
          Alert.alert("Login Successful!");
          navigation.navigate("mainScreen");
        } else {
          Alert.alert(
            "Email Not Verified",
            "Please verify your email before logging in."
          );
          signOut(auth);
        }
      })
      .catch((error) => {
        Alert.alert("Login Error", error.message);
      });
  };
  const handleForgotPassword = () => {
    if (!email) {
      Alert.alert("Please enter your email address first.");
      return;
    }

    sendPasswordResetEmail(auth, email)
      .then(() => {
        Alert.alert(
          "Password Reset Email Sent",
          "Check your inbox to reset your password."
        );
      })
      .catch((error) => {
        console.error("Password reset error:", error);
        Alert.alert("Error", error.message);
      });
  };

  return (
    <View style={styles.container}>
      <View style={styles.animationContainer}>
        <LottieView
          style={styles.animation}
          autoPlay
          loop
          source={anim}
        ></LottieView>
      </View>
      <Text style={styles.title}>Job Seeker Login </Text>
      <Text style={styles.subtitle}>
        Welcome back! Please log in to your account.
      </Text>

      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
        />

        <View style={styles.passwordWrapper}>
          <TextInput
            style={[styles.input2, { flex: 1, marginBottom: 0 }]}
            placeholder="Password"
            value={password}
            onChangeText={setPassword}
            secureTextEntry={!showPassword} //if true show password else not
          />
          <TouchableOpacity
            onPress={() => setShowPassword(!showPassword)}
            style={styles.toggleButton}
          >
            <Text style={styles.toggleText}>
              {showPassword ? "Hide" : "Show"}
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      <TouchableOpacity onPress={handleLogin} style={styles.loginButton}>
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => handleForgotPassword()}>
        <Text style={styles.forgotPasswordText}>Forgot Password?</Text>
      </TouchableOpacity>
      <View style={styles.registerContainer}>
        <Text style={styles.registerText}>New to Career Connect?</Text>
        <TouchableOpacity onPress={() => navigation.navigate("seekerRegister")}>
          <Text style={styles.registerNow}>Register Now</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center", //horaizontaly center
    justifyContent: "center", //vertically center
    paddingHorizontal: 20, //padding from left right
    backgroundColor: "#F7F9FC",
  },
  animationContainer: {
    marginBottom: 3,
  },
  animation: {
    width: 260,
    height: 200,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#9475d6",
    marginBottom: 20,
  },
  subtitle: {
    fontSize: 16,
    color: "#333",
    textAlign: "center",
    marginBottom: 30,
  },
  inputContainer: {
    width: "100%",
    marginBottom: 20,
  },
  input: {
    height: 50,
    borderColor: "#ddd",
    borderWidth: 1,
    borderRadius: 30,
    marginBottom: 15,
    paddingHorizontal: 15,
    fontSize: 16,
    backgroundColor: "#fff",
  },
  input2: {
    height: 50,
    borderRadius: 30,
    marginBottom: 15,
    paddingHorizontal: 15,
    fontSize: 16,
    backgroundColor: "#fff",
  },
  passwordWrapper: {
    flexDirection: "row",
    alignItems: "center",
    borderColor: "#ddd",
    borderWidth: 1,
    borderRadius: 30,
    backgroundColor: "#fff",
    paddingHorizontal: 10,
    marginBottom: 15,
  },
  toggleButton: {
    padding: 10,
  },
  toggleText: {
    color: "#9475d6",
    fontWeight: "600",
  },
  loginButton: {
    backgroundColor: "#9475d6",
    paddingVertical: 12,
    borderRadius: 30,
    width: "80%",
    alignItems: "center",
    marginBottom: 20,
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "600",
  },
  registerContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  registerText: {
    fontSize: 14,
    color: "#666",
  },
  registerNow: {
    fontSize: 14,
    color: "#9475d6",
    fontWeight: "bold",
    marginLeft: 5,
  },
  forgotPasswordText: {
    color: "#9475d6",
    textAlign: "right",
    marginBottom: 20,
    fontWeight: "500",
  },
});

export default SeekerLogin;
