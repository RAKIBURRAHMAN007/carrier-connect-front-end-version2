import React, { useContext, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput,
  Image,
  Alert,
  ScrollView,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import { AuthContext } from "../Auth/AuthProvider";
import { useNavigation } from "@react-navigation/native";
import { useQuery } from "@tanstack/react-query";
import UseAxiosPublic from "../hooks/AxiosPublic";
import { FontAwesome5, MaterialIcons, Ionicons } from "@expo/vector-icons";
import { StatusBar } from "expo-status-bar";

const Profile = () => {
  const { user, logOut } = useContext(AuthContext);
  const navigation = useNavigation();
  const axiosPublic = UseAxiosPublic();
  const [editing, setEditing] = useState(false);
  const [phone, setPhone] = useState(user?.phone || "");
  const [address, setAddress] = useState(user?.address || "");
  const [image, setImage] = useState(null);

  const { data: loggedUser = [], refetch } = useQuery({
    queryKey: [user?.email],
    queryFn: async () => {
      const res = await axiosPublic.get(`/user/${user?.email}`);
      return res.data;
    },
  });

  const handleLogout = () => {
    logOut();
    navigation.navigate("welcome");
  };

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ["images"],
      allowsEditing: true,
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  const handleSave = async () => {
    let profileImageUrl = loggedUser.profileImage;

    if (image) {
      const formData = new FormData();
      formData.append("file", {
        uri: image,
        type: "image/png",
        name: `profile_${Date.now()}.png`,
      });
      formData.append("upload_preset", "carrierConnect");

      try {
        const response = await fetch(
          "https://api.cloudinary.com/v1_1/dgmpw9vls/image/upload",
          {
            method: "POST",
            body: formData,
          }
        );
        const data = await response.json();
        if (data.secure_url) {
          profileImageUrl = data.secure_url;
        }
      } catch (error) {
        console.error("Image upload failed:", error);
        Alert.alert("Error", "Failed to upload image.");
        return;
      }
    }

    const userData = {
      name: loggedUser.name,
      email: loggedUser.email,
      role: loggedUser.role,
      address: address,
      phone: phone,
      profileImage: profileImageUrl,
    };

    try {
      const res = await axiosPublic.patch(
        `/updateUser/${user.email}`,
        userData
      );
      if (res.data.modifiedCount > 0) {
        refetch();
        Alert.alert("Success", "Profile updated!");
        setEditing(false);
      }
    } catch (error) {
      console.error("Profile update failed:", error);
      Alert.alert("Error", "An error occurred while updating profile.");
    }
  };

  return (
    <ScrollView style={styles.container}>
      <StatusBar style="light" backgroundColor="#9475d6" />
      <View style={styles.profileContainer}>
        <View style={styles.imageWrapper}>
          {editing ? (
            image ? (
              <Image source={{ uri: image }} style={styles.profileImage} />
            ) : loggedUser?.profileImage ? (
              <Image
                source={{ uri: loggedUser.profileImage }}
                style={styles.profileImage}
              />
            ) : (
              <View style={styles.placeholderImage}>
                <FontAwesome5 name="user-alt" size={50} color="#aaa" />
              </View>
            )
          ) : loggedUser?.profileImage ? (
            <Image
              source={{ uri: loggedUser.profileImage }}
              style={styles.profileImage}
            />
          ) : (
            <View style={styles.placeholderImage}>
              <FontAwesome5 name="user-alt" size={50} color="#aaa" />
            </View>
          )}
          {editing && (
            <TouchableOpacity onPress={pickImage}>
              <Text style={styles.changePhotoText}>Change Photo</Text>
            </TouchableOpacity>
          )}
        </View>

        <Text style={styles.profileTitle}>Welcome, {loggedUser?.name}</Text>
        <Text style={styles.profileInfo}>Email: {loggedUser?.email}</Text>

        {editing ? (
          <>
            <TextInput
              style={styles.input}
              placeholder="Phone Number"
              value={phone}
              onChangeText={setPhone}
              keyboardType="phone-pad"
            />
            <TextInput
              style={styles.input}
              placeholder="Address"
              value={address}
              onChangeText={setAddress}
            />
          </>
        ) : (
          <>
            <Text style={styles.profileInfo}>
              Phone: {loggedUser.phone || "Not available"}
            </Text>
            <Text style={styles.profileInfo}>
              Address: {loggedUser.address || "Not available"}
            </Text>
          </>
        )}
      </View>

      <View style={styles.buttonContainer}>
        {editing ? (
          <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
            <MaterialIcons name="save" size={20} color="#fff" />
            <Text style={styles.buttonText}> Save</Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            style={styles.editButton}
            onPress={() => setEditing(true)}
          >
            <Ionicons name="create" size={20} color="#fff" />
            <Text style={styles.buttonText}> Edit Profile</Text>
          </TouchableOpacity>
        )}

        <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
          <Ionicons name="log-out-outline" size={20} color="#f44336" />
          <Text style={{ color: "#f44336" }}> Logout</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f4f4f9",
    padding: 20,
  },
  profileContainer: {
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 16,
    elevation: 5,
    alignItems: "center",
    marginBottom: 30,
    paddingTop: 120,
  },
  imageWrapper: {
    alignItems: "center",
    marginBottom: 15,
  },
  profileImage: {
    width: 110,
    height: 110,
    borderRadius: 55,
    marginBottom: 10,
  },
  placeholderImage: {
    width: 110,
    height: 110,
    borderRadius: 55,
    backgroundColor: "#ddd",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 10,
  },
  changePhotoText: {
    color: "#7b4fdd",
    fontWeight: "500",
    textDecorationLine: "underline",
  },
  profileTitle: {
    fontSize: 24,
    fontWeight: "700",
    color: "#444",
    marginBottom: 8,
  },
  profileInfo: {
    fontSize: 16,
    color: "#666",
    marginVertical: 4,
    textAlign: "center",
  },
  input: {
    width: "100%",
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 10,
    borderRadius: 8,
    marginVertical: 6,
    fontSize: 16,
  },
  buttonContainer: {
    gap: 12,
  },
  editButton: {
    backgroundColor: "#7b4fdd",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 12,
    borderRadius: 10,
  },
  saveButton: {
    backgroundColor: "#4caf50",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 12,
    borderRadius: 10,
  },
  logoutButton: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 12,
    borderRadius: 10,
    borderColor: "#f44336",

    borderWidth: 1,
  },
  buttonText: {
    color: "#fff",
    fontSize: 17,
    fontWeight: "600",
    marginLeft: 8,
  },
});

export default Profile;
