import React, { useState } from "react";
import { useRoute } from "@react-navigation/native";
import { useQuery } from "@tanstack/react-query";
import {
  View,
  Text,
  Image,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
  StyleSheet,
  TextInput,
  Button,
} from "react-native";
import UseAxiosPublic from "../../hooks/AxiosPublic";
import Modal from "react-native-modal"; // Import the Modal component

const JobDetails = () => {
  const route = useRoute();
  const axiosPublic = UseAxiosPublic();
  const { jobId } = route.params;

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

  const [isModalVisible, setModalVisible] = useState(false); // State for modal visibility
  const [email, setEmail] = useState(""); // State for email input
  const [cvLink, setCvLink] = useState(""); // State for CV link input

  const toggleModal = () => {
    setModalVisible(!isModalVisible); // Toggle modal visibility
  };

  const handleApply = () => {
    // Handle the apply logic here (e.g., sending email and CV link to server)
    console.log("Email:", email, "CV Link:", cvLink);
    toggleModal(); // Close modal after applying
  };

  if (isLoading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#007AFF" />
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

      <TouchableOpacity style={styles.button} onPress={toggleModal}>
        <Text style={styles.buttonText}>Apply Now</Text>
      </TouchableOpacity>

      {/* Modal for application form */}
      <Modal isVisible={isModalVisible} onBackdropPress={toggleModal}>
        <View style={styles.modalContent}>
          <Text style={styles.modalTitle}>Apply for {jobTitle}</Text>

          <TextInput
            style={styles.input}
            placeholder="Enter your email"
            value={email}
            onChangeText={setEmail}
          />

          <TextInput
            style={styles.input}
            placeholder="Enter CV link"
            value={cvLink}
            onChangeText={setCvLink}
          />

          <Button title="Submit Application" onPress={handleApply} />
          <Button title="Cancel" onPress={toggleModal} />
        </View>
      </Modal>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    paddingBottom: 200,
    marginTop: 20,
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
  modalContent: {
    backgroundColor: "white",
    padding: 20,
    borderRadius: 10,
    alignItems: "center",
  },
  modalTitle: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 20,
  },
  input: {
    width: "100%",
    padding: 10,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
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
});

export default JobDetails;
