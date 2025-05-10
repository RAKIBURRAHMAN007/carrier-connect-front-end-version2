import React, { useContext, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput,
  Image,
  Alert,
} from "react-native";
import * as ImagePicker from "expo-image-picker"; // Make sure to install expo-image-picker
import { AuthContext } from "../Auth/AuthProvider";
import { useNavigation } from "@react-navigation/native";
import { useQuery } from "@tanstack/react-query";
import UseAxiosPublic from "../hooks/AxiosPublic";

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
    <View style={styles.container}>
      <View style={styles.profileContainer}>
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
              <Text style={styles.placeholderText}>No Image</Text>
            </View>
          )
        ) : loggedUser?.profileImage ? (
          <Image
            source={{ uri: loggedUser.profileImage }}
            style={styles.profileImage}
          />
        ) : (
          <View style={styles.placeholderImage}>
            <Text style={styles.placeholderText}>No Image</Text>
          </View>
        )}

        {editing && (
          <TouchableOpacity onPress={pickImage}>
            <Text style={styles.changePhotoText}>Change Photo</Text>
          </TouchableOpacity>
        )}

        <Text style={styles.profileTitle}>Profile</Text>

        <Text style={styles.profileInfo}>
          Name: {loggedUser?.name || "Not available"}
        </Text>
        <Text style={styles.profileInfo}>
          Email: {loggedUser?.email || "Not available"}
        </Text>

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
            <Text style={styles.saveButtonText}>Save</Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            style={styles.editButton}
            onPress={() => setEditing(true)}
          >
            <Text style={styles.editButtonText}>Edit Profile</Text>
          </TouchableOpacity>
        )}

        <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
          <Text style={styles.logoutButtonText}>Logout</Text>
        </TouchableOpacity>
      </View>
    </View>
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
    borderRadius: 10,
    elevation: 5,
    marginBottom: 20,
    alignItems: "center",
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 10,
  },
  placeholderImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: "#ccc",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 10,
  },
  placeholderText: {
    color: "#666",
  },
  changePhotoText: {
    color: "#9475d6",
    marginBottom: 10,
    textDecorationLine: "underline",
  },
  profileTitle: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#9475d6",
    textAlign: "center",
    marginBottom: 10,
  },
  profileInfo: {
    fontSize: 18,
    color: "#555",
    marginVertical: 5,
    textAlign: "left",
    alignSelf: "flex-start",
  },
  input: {
    width: "100%",
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 10,
    borderRadius: 8,
    marginVertical: 5,
    fontSize: 16,
  },
  buttonContainer: {
    alignItems: "center",
  },
  editButton: {
    backgroundColor: "#9475d6",
    paddingVertical: 12,
    paddingHorizontal: 40,
    borderRadius: 8,
    marginBottom: 10,
  },
  editButtonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
  saveButton: {
    backgroundColor: "#4caf50",
    paddingVertical: 12,
    paddingHorizontal: 40,
    borderRadius: 8,
    marginBottom: 10,
  },
  saveButtonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
  logoutButton: {
    backgroundColor: "#f44336",
    paddingVertical: 12,
    paddingHorizontal: 40,
    borderRadius: 8,
  },
  logoutButtonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
  },
});

export default Profile;
