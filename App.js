import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { StatusBar } from "expo-status-bar";
import React, { useContext, useState, useEffect } from "react";
import { StyleSheet, Text, View } from "react-native";
import WelcomeScreen from "./screens/WelcomeScreen";
import HrLogin from "./components/HrLogin";
import SeekerLogin from "./components/SeekerLogin";
import HrRegister from "./components/HrRegister";
import SeekerRegister from "./components/SeekerRegister";
import AuthProvider, { AuthContext } from "./Auth/AuthProvider";
import MainScreenPage from "./screens/MainScreenPage";

import {
  QueryClient,
  QueryClientProvider,
  useQuery,
} from "@tanstack/react-query";
import JobDetails from "./components/seekerMainComponents/JobDetails";
import { NavigationContainer } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";

const queryClient = new QueryClient();
const Stack = createNativeStackNavigator();

const AppContent = () => {
  const [isUserLoggedIn, setIsUserLoggedIn] = useState(false);
  const { user } = useContext(AuthContext);

  useEffect(() => {
    if (user) {
      setIsUserLoggedIn(true);
    }
  }, [user]);

  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName={isUserLoggedIn ? "mainScreen" : "welcome"}
        screenOptions={{ headerShown: false }}
      >
        <Stack.Screen name="welcome" component={WelcomeScreen}></Stack.Screen>
        <Stack.Screen name="hrLogin" component={HrLogin}></Stack.Screen>
        <Stack.Screen name="seekerLogin" component={SeekerLogin}></Stack.Screen>
        <Stack.Screen name="hrRegister" component={HrRegister}></Stack.Screen>
        {/* <Stack.Screen
          name="JobDetails"
          options={{ headerShown: true, title: "Job Details" }}
          component={JobDetails}
        ></Stack.Screen> */}
        <Stack.Screen
          name="seekerRegister"
          component={SeekerRegister}
        ></Stack.Screen>
        <Stack.Screen
          name="mainScreen"
          component={MainScreenPage}
        ></Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <SafeAreaView style={{ flex: 1 }}>
          <StatusBar style="auto" />
          <AppContent />
        </SafeAreaView>
      </AuthProvider>
    </QueryClientProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
