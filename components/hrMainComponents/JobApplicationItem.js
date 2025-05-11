import { useState } from "react";
import {
  Alert,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  StyleSheet,
  Linking,
} from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";

const JobApplicationItem = ({ item, axiosPublic, refetch }) => {
  const [feedbackText, setFeedbackText] = useState("");

  const handleAction = async (id, action, feedbackText = "") => {
    if (feedbackText.trim() === "") {
      Alert.alert(
        "Error",
        "Please provide feedback before changing the status."
      );
      return;
    }

    try {
      await axiosPublic.patch(`/jobStatus/${id}`, {
        status: action,
        feedback: feedbackText,
      });

      refetch(); // Refresh the data
      Alert.alert(
        "Success",
        `Application has been ${
          action === "accepted"
            ? "accepted"
            : action === "rejected"
            ? "rejected"
            : "updated"
        } successfully!`
      );
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <View style={styles.card}>
      <Image source={{ uri: item.img }} style={styles.image} />
      <View style={styles.content}>
        <Text style={styles.title}>{item.jobTitle}</Text>
        <Text style={styles.text}>👤 Applicant Name: {item.name}</Text>
        <Text style={styles.text}>✉️ Applicant Email: {item.email}</Text>
        <Text style={styles.text}>🏢 Company Name: {item.company}</Text>
        <Text style={styles.text}>📌 Status: {item.status}</Text>

        <TouchableOpacity
          style={styles.cvButton}
          onPress={() => Linking.openURL(item.cvLink)}
        >
          <Text style={{ color: "#fff" }}>View CV</Text>
        </TouchableOpacity>

        <TextInput
          style={styles.input}
          placeholder="Write feedback..."
          value={feedbackText}
          onChangeText={setFeedbackText}
        />

        <View style={styles.iconButtons}>
          <TouchableOpacity
            onPress={() => handleAction(item._id, "accepted", feedbackText)}
            style={styles.iconBtn}
          >
            <Ionicons name="checkmark-circle" size={28} color="#4CAF50" />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => handleAction(item._id, "rejected", feedbackText)}
            style={styles.iconBtn}
          >
            <Ionicons name="close-circle" size={28} color="#F44336" />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => handleAction(item._id, item.status, feedbackText)}
            style={styles.iconBtn}
          >
            <Ionicons name="send" size={24} color="#2196F3" />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#fff",
    marginBottom: 16,
    borderRadius: 14,
    flexDirection: "row",
    padding: 14,
    elevation: 4,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 6,
    marginHorizontal: 10,
  },
  image: {
    width: 70,
    height: 70,
    borderRadius: 10,
    marginRight: 12,
  },
  content: {
    flex: 1,
  },
  title: {
    fontSize: 17,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 6,
  },
  text: {
    fontSize: 14,
    marginBottom: 2,
    color: "#555",
  },
  cvButton: {
    backgroundColor: "#9475d6",
    padding: 8,
    borderRadius: 6,
    alignSelf: "flex-start",
    marginVertical: 6,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: 6,
    marginVertical: 6,
  },
  iconButtons: {
    flexDirection: "row",
    gap: 12,
    marginTop: 4,
  },
  iconBtn: {
    padding: 4,
  },
});

export default JobApplicationItem;
