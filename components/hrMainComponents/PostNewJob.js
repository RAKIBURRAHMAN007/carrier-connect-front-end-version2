import React, { useContext, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Image,
  Alert,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import UseAxiosPublic from "../../hooks/AxiosPublic";
import { AuthContext } from "../../Auth/AuthProvider";

import { useNavigation } from "@react-navigation/native";

const PostNewJob = () => {
  const [jobTitle, setJobTitle] = useState("");
  const [jobDescription, setJobDescription] = useState("");
  const [company, setCompany] = useState("");
  const [salary, setSalary] = useState("");
  const [location, setLocation] = useState("");
  const [logo, setLogo] = useState(null);
  const [skills, setSkills] = useState("");

  const axiosPublic = UseAxiosPublic();
  const { user } = useContext(AuthContext);
  const navigation = useNavigation();
  const pickLogo = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ["images"],
      allowsEditing: true,
      quality: 1,
    });

    if (!result.canceled) {
      setLogo(result.assets[0].uri);
    }
  };

  // const handlePostJob = async () => {
  //   console.log("Job Posted:", {
  //     jobTitle,
  //     jobDescription,
  //     company,
  //     salary,
  //     location,
  //     logo,
  //   });

  //   const formData = new FormData();
  //   formData.append("image", {
  //     uri: logo,
  //     type: "image/png", // Add MIME type for the image
  //     name: `logo_${Date.now()}.png`, // Add a name for the image file
  //   });

  //   try {
  //     const imgResponse = await axiosPublic.post(imgHostingApi, formData, {
  //       headers: {
  //         "Content-Type": "multipart/form-data",
  //       },
  //     });

  //     if (imgResponse.data && imgResponse.data.success) {
  //       const imageUrl = imgResponse.data.data.url;
  //       const jobData = {
  //         hrEmail: user.email,
  //         jobTitle: jobTitle,
  //         jobDescription: jobDescription,
  //         company: company,
  //         salary: salary,
  //         location: location,
  //         img: imageUrl,
  //       };
  //       axiosPublic.post("/jobs", jobData).then((res) => {
  //         if (res.data.insertedId) {
  //           Alert.alert("Success", "Job posted successfully!");
  //           navigation.reset({
  //             routes: [{ name: "Post New Job" }],
  //           });
  //         }
  //       });
  //     } else {
  //       Alert.alert("Error", "Failed to upload the image.");
  //     }
  //   } catch (error) {
  //     console.error("Error during job post:", error);
  //     Alert.alert("Error", "An error occurred while posting the job.");
  //   }
  // };
  const handlePostJob = async () => {
    console.log("Job Posted:", {
      jobTitle,
      jobDescription,
      company,
      salary,
      location,
      logo,
    });

    const formData = new FormData();
    formData.append("file", {
      uri: logo,
      type: "image/png",
      name: `logo_${Date.now()}.png`,
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
        const imageUrl = data.secure_url;
        const jobData = {
          hrEmail: user.email,
          jobTitle: jobTitle,
          jobDescription: jobDescription,
          company: company,
          salary: salary,
          location: location,
          img: imageUrl,
          skills: skills.split(",").map((skill) => skill.trim()),
        };
        axiosPublic.post("/jobs", jobData).then((res) => {
          if (res.data.insertedId) {
            Alert.alert("Success", "Job posted successfully!");
            navigation.reset({
              routes: [{ name: "Post New Job" }],
            });
          }
        });
      } else {
        Alert.alert("Error", "Failed to upload the image to Cloudinary.");
      }
    } catch (error) {
      console.error("Error during job post:", error);
      Alert.alert("Error", "An error occurred while posting the job.");
    }
  };

  return (
    <View style={styles.screenContainer}>
      <TextInput
        style={styles.inputField}
        placeholder="Job Title"
        value={jobTitle}
        onChangeText={setJobTitle}
      />
      <TextInput
        style={styles.inputField}
        placeholder="Job Description"
        value={jobDescription}
        onChangeText={setJobDescription}
        multiline
      />
      <TextInput
        style={styles.inputField}
        placeholder="Skills (comma separated)"
        value={skills}
        onChangeText={setSkills}
      />

      <TextInput
        style={styles.inputField}
        placeholder="Company Name"
        value={company}
        onChangeText={setCompany}
      />
      <TextInput
        style={styles.inputField}
        placeholder="Salary"
        value={salary}
        onChangeText={setSalary}
        keyboardType="numeric"
      />
      <TextInput
        style={styles.inputField}
        placeholder="Location"
        value={location}
        onChangeText={setLocation}
      />

      <TouchableOpacity style={styles.uploadButton} onPress={pickLogo}>
        <Text style={styles.uploadButtonText}>
          {logo ? "Change Company Logo" : "Upload Company Logo"}
        </Text>
      </TouchableOpacity>

      {logo && <Image source={{ uri: logo }} style={styles.logoPreview} />}

      <TouchableOpacity style={styles.submitButton} onPress={handlePostJob}>
        <Text style={styles.submitButtonText}>Post Job</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  screenContainer: {
    flex: 1,
    padding: 20,
    backgroundColor: "#f4f4f9",
  },
  screenText: {
    fontSize: 24,
    color: "#9475d6",
    textAlign: "center",
    marginBottom: 20,
  },
  inputField: {
    width: "100%",
    padding: 12,
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    marginVertical: 8,
    fontSize: 16,
  },
  uploadButton: {
    backgroundColor: "#aaa",
    padding: 10,
    borderRadius: 8,
    alignItems: "center",
    marginVertical: 10,
  },
  uploadButtonText: {
    color: "#fff",
    fontSize: 16,
  },
  logoPreview: {
    width: 100,
    height: 60,
    resizeMode: "contain",
    marginVertical: 10,
    alignSelf: "center",
    borderRadius: 8,
  },
  submitButton: {
    backgroundColor: "#9475d6",
    paddingVertical: 12,
    paddingHorizontal: 40,
    borderRadius: 8,
    elevation: 3,
    marginTop: 20,
    alignItems: "center",
  },
  submitButtonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
});

export default PostNewJob;
