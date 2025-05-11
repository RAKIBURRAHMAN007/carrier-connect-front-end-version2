import {
  View,
  Text,
  Image,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
  StyleSheet,
  Alert,
  TextInput,
  Modal,
} from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import { useQuery } from "@tanstack/react-query";
import UseAxiosPublic from "../../hooks/AxiosPublic";
import Icon from "react-native-vector-icons/Feather";
import { useContext, useState } from "react";
import { AuthContext } from "../../Auth/AuthProvider";

const JobDetails = () => {
  const route = useRoute();
  const axiosPublic = UseAxiosPublic();
  const navigation = useNavigation();
  const { jobId } = route.params;
  const { user } = useContext(AuthContext);

  const [modalVisible, setModalVisible] = useState(false);
  const [formData, setFormData] = useState({
    name: user?.displayName || "",
    email: user?.email || "",
    cvLink: "",
  });

  const {
    data: job = {},
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["job", jobId],
    queryFn: async () => {
      const res = await axiosPublic.get(`jobById/${jobId}`);
      return res.data;
    },
  });

  const {
    hrEmail,
    jobTitle,
    jobDescription,
    company,
    salary,
    location,
    img,
    skills,
  } = job;

  const handleAddToWishlist = async () => {
    if (!user?.email) {
      Alert.alert("Error", "You must be logged in to add to wishlist.");
      return;
    }

    const data = {
      jobTitle,
      jobDescription,
      company,
      salary,
      location,
      img,
      skills,
      JobId: jobId,
      email: user.email,
    };

    try {
      const res = await axiosPublic.post("/wishlist", data);
      if (res.data.insertedId) {
        Alert.alert("Success", "Job added to wishlist successfully!");
        navigation.reset({
          routes: [{ name: "wishList" }],
        });
      }
    } catch (error) {
      console.error("Error adding to wishlist:", error);
      Alert.alert("Error", "Failed to add to wishlist.");
    }
  };

  const handleApply = async () => {
    if (!formData.name || !formData.email || !formData.cvLink) {
      Alert.alert("Missing Fields", "Please fill in all fields.");
      return;
    }

    try {
      const applicationData = {
        ...formData,
        jobTitle,
        jobId,
        company,
        hrEmail,
        img,
        status: "",
        feedback: "",
        appliedAt: new Date(),
      };

      const res = await axiosPublic.post("/appliedJobs", applicationData);

      if (res.data.insertedId) {
        Alert.alert("Success", "Your application has been submitted!");
        setModalVisible(false);
        setFormData({ ...formData, cvLink: "" });
        navigation.reset({
          routes: [{ name: "My Applied Jobs" }],
        });
      }
    } catch (error) {
      console.error("Application Error:", error);
      Alert.alert("Error", "Failed to submit application.");
    }
  };

  if (isLoading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#9475d6" />
      </View>
    );
  }

  if (isError) {
    return (
      <View style={styles.center}>
        <Text style={styles.errorText}>
          Something went wrong while loading job details.
        </Text>
      </View>
    );
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.imageContainer}>
        <Image source={{ uri: img }} style={styles.cardImage} />
      </View>

      <Text style={styles.title}>{jobTitle}</Text>

      <View style={styles.section}>
        <Text style={styles.fieldTitle}>Company:</Text>
        <Text style={styles.company}>{company}</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.fieldTitle}>Location:</Text>
        <Text style={styles.location}>{location}</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.fieldTitle}>Salary:</Text>
        <Text style={styles.salary}>{salary}$</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.fieldTitle}>Contact:</Text>
        <Text style={styles.contact}>📧 {hrEmail}</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Job Description</Text>
        <Text style={styles.description}>{jobDescription}</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Required Skills</Text>
        {skills?.map((skill, index) => (
          <Text key={index} style={styles.skill}>
            • {skill}
          </Text>
        ))}
      </View>

      <TouchableOpacity
        style={styles.button}
        onPress={() => setModalVisible(true)}
      >
        <Text style={styles.buttonText}>Apply Now</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.wishlistButton}
        onPress={handleAddToWishlist}
      >
        <Icon name="heart" size={24} color="#e74c3c" />
        <Text style={styles.wishlistText}>Add to Wishlist</Text>
      </TouchableOpacity>

      {/* Modal */}
      <Modal animationType="slide" transparent={true} visible={modalVisible}>
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Apply for {jobTitle}</Text>

            <TextInput
              style={styles.input}
              placeholder="Your Name"
              value={formData.name}
              onChangeText={(text) =>
                setFormData((prev) => ({ ...prev, name: text }))
              }
            />
            <TextInput
              style={styles.input}
              placeholder="Your Email"
              value={formData.email}
              onChangeText={(text) =>
                setFormData((prev) => ({ ...prev, email: text }))
              }
              keyboardType="email-address"
            />
            <TextInput
              style={styles.input}
              placeholder="CV Link (e.g., Google Drive)"
              value={formData.cvLink}
              onChangeText={(text) =>
                setFormData((prev) => ({ ...prev, cvLink: text }))
              }
            />

            <TouchableOpacity style={styles.submitButton} onPress={handleApply}>
              <Text style={styles.submitButtonText}>Submit Application</Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => setModalVisible(false)}
              style={styles.cancelButton}
            >
              <Text style={styles.cancelText}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    paddingBottom: 120,
    backgroundColor: "#fff",
  },
  imageContainer: {
    justifyContent: "center",
    alignItems: "center",
    padding: 5,
    marginBottom: 10,
    borderWidth: 3,
    borderColor: "#ddd",
    borderRadius: 5,
  },
  cardImage: {
    width: 80,
    height: 80,
    borderRadius: 5,
  },
  title: {
    fontSize: 26,
    fontWeight: "bold",
    color: "#9475d6",
  },
  section: {
    marginTop: 20,
  },
  fieldTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 6,
  },
  company: {
    fontSize: 18,
    color: "#666",
    marginBottom: 4,
  },
  location: {
    fontSize: 16,
    color: "#888",
    marginBottom: 4,
  },
  salary: {
    fontSize: 16,
    color: "#333",
    marginBottom: 4,
  },
  contact: {
    fontSize: 16,
    color: "#333",
    marginBottom: 12,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 8,
  },
  description: {
    fontSize: 16,
    color: "#444",
    lineHeight: 22,
    marginBottom: 12,
  },
  skill: {
    fontSize: 16,
    color: "#555",
    marginBottom: 4,
  },
  button: {
    backgroundColor: "#9475d6",
    paddingVertical: 14,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 30,
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "600",
  },
  wishlistButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 25,
    borderWidth: 1,
    borderColor: "#e74c3c",
    paddingVertical: 12,
    borderRadius: 8,
    backgroundColor: "#fff",
  },
  wishlistText: {
    fontSize: 16,
    marginLeft: 8,
    color: "#e74c3c",
    fontWeight: "600",
  },
  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  errorText: {
    color: "red",
    fontSize: 16,
  },
  modalOverlay: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "rgba(0,0,0,0.4)",
    padding: 20,
  },
  modalContent: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 20,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 12,
    color: "#9475d6",
    textAlign: "center",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontSize: 16,
    marginBottom: 12,
  },
  submitButton: {
    backgroundColor: "#9475d6",
    paddingVertical: 12,
    borderRadius: 10,
    alignItems: "center",
    marginBottom: 10,
  },
  submitButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
  cancelButton: {
    alignItems: "center",
    paddingVertical: 10,
  },
  cancelText: {
    color: "#888",
    fontSize: 16,
  },
});

export default JobDetails;
