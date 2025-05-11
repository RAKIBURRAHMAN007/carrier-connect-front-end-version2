import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";

const SeekerJobCard = ({ availableJob }) => {
  const navigation = useNavigation();
  const { _id, jobTitle, company, location, img } = availableJob;

  return (
    <View style={styles.card}>
      <StatusBar style="light" backgroundColor="#9475d6" />
      <View style={styles.imageContainer}>
        {img && (
          <Image
            source={{ uri: img }}
            style={styles.cardImage}
            resizeMode="contain" // To ensure the image is not stretched
          />
        )}
      </View>
      <View style={styles.content}>
        <Text style={styles.title}>Job Title: {jobTitle}</Text>
        <Text style={styles.company}>Company Name:{company}</Text>
        <Text style={styles.location}>Location: {location}</Text>

        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate("JobDetails", { jobId: _id })}
        >
          <Text style={styles.buttonText}>View Details</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#fff",
    borderRadius: 12,
    overflow: "hidden",
    marginVertical: 10,
    marginHorizontal: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
    flexDirection: "row", // Aligns content side by side
    padding: 12, // Add padding for better spacing
  },
  imageContainer: {
    justifyContent: "center",
    alignItems: "center",
    padding: 5,
    marginRight: 12, // Space between image and content
    borderWidth: 2,
    borderColor: "#ddd",
    borderRadius: 8,
    overflow: "hidden", // Ensure the image is within the rounded corner
  },
  cardImage: {
    width: 80,
    height: 80,
    borderRadius: 8, // Rounded corners for the image
  },
  content: {
    flex: 1, // Take up the remaining space
    justifyContent: "flex-start", // Align text to the top
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 4,
  },
  company: {
    fontSize: 16,
    color: "#666",
    marginBottom: 2,
  },
  location: {
    fontSize: 14,
    color: "#888",
    marginBottom: 12,
  },
  button: {
    backgroundColor: "#9475d6",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
    alignSelf: "flex-start",
  },
  buttonText: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "600",
  },
});

export default SeekerJobCard;
