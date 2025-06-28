import React, { useState } from "react";
import {
  Alert,
  Image,
  Modal,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import UseAxiosPublic from "../../hooks/AxiosPublic";

const HrJobCard = ({ job, refetch }) => {
  const axiosPublic = UseAxiosPublic();
  const {
    _id,
    hrEmail,
    jobTitle,
    jobDescription,
    company,
    salary,
    location,
    img,
    skills,
  } = job;

  const [modalVisible, setModalVisible] = useState(false);
  const [updatedJobTitle, setUpdatedJobTitle] = useState(jobTitle);
  const [updatedSalary, setUpdatedSalary] = useState(salary);
  const [updatedCompany, setUpdatedCompany] = useState(company);
  const [updatedDescription, setUpdatedDescription] = useState(jobDescription);
  const [updatedLocation, setUpdatedLocation] = useState(location);
  const [updatedSkills, setUpdatedSkills] = useState(
    skills ? skills.join(", ") : ""
  );

  const handleDelete = () => {
    axiosPublic.delete(`/deleteJob/${_id}`).then((res) => {
      if (res.data.deletedCount > 0) {
        refetch();
        Alert.alert("Success", "Job post deleted successfully!");
      }
    });
  };

  const handleUpdate = () => {
    const updatedData = {
      jobTitle: updatedJobTitle,
      salary: updatedSalary,
      company: updatedCompany,
      jobDescription: updatedDescription,
      location: updatedLocation,
      hrEmail: hrEmail,
      skills: updatedSkills.split(",").map((skill) => skill.trim()),
    };

    axiosPublic.patch(`/updateJob/${_id}`, updatedData).then((res) => {
      if (res.data.modifiedCount > 0) {
        refetch();
        Alert.alert("Success", "Job post updated!");
        setModalVisible(false);
      }
    });
  };

  return (
    <View style={styles.cardContainer}>
      <View style={styles.imageContainer}>
        <Image source={{ uri: img }} style={styles.cardImage} />
      </View>

      <View style={styles.cardContent}>
        <Text style={styles.jobTitle}>Job Title: {jobTitle}</Text>
        <Text style={styles.company}>Company: {company}</Text>
        <Text style={styles.jobDescription}>Description: {jobDescription}</Text>
        <Text style={styles.salary}>Salary: {salary} Tk</Text>
        <Text style={styles.location}>Location: {location}</Text>
        {skills && (
          <View style={{ marginBottom: 12 }}>
            <Text style={styles.skillsTitle}>Skills:</Text>
            <View style={{ flexDirection: "row", flexWrap: "wrap", gap: 5 }}>
              {skills.map((skill, index) => (
                <View key={index} style={styles.skillBadge}>
                  <Text style={styles.skillText}>{skill}</Text>
                </View>
              ))}
            </View>
          </View>
        )}

        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={styles.updateButton}
            onPress={() => setModalVisible(true)}
          >
            <Icon name="edit" size={20} color="#fff" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.deleteButton} onPress={handleDelete}>
            <Icon name="trash" size={20} color="#fff" />
          </TouchableOpacity>
        </View>
      </View>

      {/* Modal */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)} //for close using back button
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Update Job Info</Text>

            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>Job Title</Text>
              <TextInput
                style={styles.input}
                value={updatedJobTitle}
                onChangeText={setUpdatedJobTitle}
                placeholder="Enter job title"
              />
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>Company</Text>
              <TextInput
                style={styles.input}
                value={updatedCompany}
                onChangeText={setUpdatedCompany}
                placeholder="Enter company name"
              />
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>Description</Text>
              <TextInput
                style={styles.input}
                value={updatedDescription}
                onChangeText={setUpdatedDescription}
                placeholder="Enter job description"
                multiline
              />
            </View>
            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>Skills (comma separated)</Text>
              <TextInput
                style={styles.input}
                value={updatedSkills}
                onChangeText={setUpdatedSkills}
                placeholder="e.g. React, Node.js, MongoDB"
              />
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>Salary</Text>
              <TextInput
                style={styles.input}
                value={updatedSalary}
                onChangeText={setUpdatedSalary}
                placeholder="Enter salary"
                keyboardType="numeric"
              />
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>Location</Text>
              <TextInput
                style={styles.input}
                value={updatedLocation}
                onChangeText={setUpdatedLocation}
                placeholder="Enter location"
              />
            </View>

            <TouchableOpacity
              style={styles.updateButtonModal}
              onPress={handleUpdate}
            >
              <Text style={{ color: "#fff" }}>Update</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => setModalVisible(false)}>
              <Text
                style={{ marginTop: 15, color: "red", textAlign: "center" }}
              >
                Cancel
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    backgroundColor: "#fff",
    borderRadius: 15,
    marginBottom: 20,
    elevation: 5,
    flexDirection: "column",
    padding: 20,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 5,
    marginTop: 5,
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
  cardContent: {
    flex: 1,
    justifyContent: "flex-start",
  },
  jobTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 8,
  },
  company: {
    fontSize: 16,
    color: "#555",
    marginBottom: 8,
  },
  jobDescription: {
    fontSize: 14,
    color: "#777",
    marginBottom: 12,
    lineHeight: 20,
  },
  salary: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#28a745",
    marginBottom: 8,
  },
  location: {
    fontSize: 14,
    color: "#007bff",
    marginBottom: 12,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "flex-end",
    marginTop: 10,
    gap: 4,
  },
  updateButton: {
    backgroundColor: "#007bff",
    paddingVertical: 10,
    paddingHorizontal: 10,
    borderRadius: 10,
    marginLeft: 10,
    flexDirection: "row",
    alignItems: "center",
  },
  deleteButton: {
    backgroundColor: "#dc3545",
    paddingVertical: 12,
    paddingHorizontal: 12,
    borderRadius: 10,
    flexDirection: "row",
    alignItems: "center",
  },
  modalOverlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  modalContent: {
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 10,
    width: "90%",
    elevation: 10,
  },
  modalTitle: {
    fontSize: 18,
    marginBottom: 10,
    fontWeight: "bold",
  },
  inputGroup: {
    marginBottom: 12,
  },
  inputLabel: {
    marginBottom: 4,
    fontWeight: "bold",
    color: "#333",
  },
  input: {
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
    backgroundColor: "#f9f9f9",
  },
  updateButtonModal: {
    backgroundColor: "#007bff",
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 10,
  },
});

export default HrJobCard;
