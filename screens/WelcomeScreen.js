import LottieView from "lottie-react-native";
import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import animation from "../src/animation/Animation - 1744818293968.json";
import { useNavigation } from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";

const WelcomeScreen = () => {
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <StatusBar style="light" backgroundColor="#E2E8F0" />
      <View style={styles.animationContainer}>
        <LottieView source={animation} autoPlay loop style={styles.animation} />
      </View>

      <Text style={styles.title}>✨ Welcome to Career Connect!</Text>
      <Text style={styles.subtitle}>
        Bridging Ambitions with Opportunities.
      </Text>

      <Text style={styles.description}>
        Start your journey with us — whether you're an HR professional looking
        to discover top talent or an job seeker aiming to land your dream role.
        Choose your path below and let's get started!
      </Text>

      <View style={styles.buttonContainer}>
        <TouchableOpacity
          onPress={() => navigation.navigate("hrRegister")}
          style={styles.button1}
        >
          <Text style={styles.buttonText}>Sign Up as HR</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => navigation.navigate("seekerRegister")}
          style={styles.button2}
        >
          <Text style={styles.buttonText}>Sign Up as Job Seeker</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 20,
    backgroundColor: "#F7F9FC",
  },
  animationContainer: {
    marginBottom: 10,
  },
  animation: {
    width: 260,
    height: 300,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#9475d6",
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 18,
    fontWeight: "medium",
    color: "#333",
    marginBottom: 10,
    textAlign: "center",
  },
  description: {
    fontSize: 12,
    color: "#666",
    marginBottom: 40,
    fontWeight: "bold",
    textAlign: "center",
    paddingHorizontal: 20,
  },
  buttonContainer: {
    width: "100%",
    alignItems: "center",
  },
  button2: {
    backgroundColor: "#333",
    paddingVertical: 12,

    borderRadius: 30,
    marginBottom: 15,
    width: "80%",
    alignItems: "center",
  },
  button1: {
    backgroundColor: "#9475d6",
    paddingVertical: 12,

    borderRadius: 30,
    marginBottom: 15,
    width: "80%",
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "600",
  },
});

export default WelcomeScreen;
