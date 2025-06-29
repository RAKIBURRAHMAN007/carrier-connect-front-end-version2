import { useQuery } from "@tanstack/react-query";
import { useContext } from "react";
import {
  FlatList,
  Linking,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Alert,
  Image,
} from "react-native";
import moment from "moment";
import { AuthContext } from "../../Auth/AuthProvider";
import UseAxiosPublic from "../../hooks/AxiosPublic";
import Ionicons from "react-native-vector-icons/Ionicons";

const MyAppliedJobs = () => {
  const { user } = useContext(AuthContext);
  const axiosPublic = UseAxiosPublic();

  const { data: seekerApplication = [], refetch } = useQuery({
    queryKey: ["seekerApplication", user?.email],
    queryFn: async () => {
      const res = await axiosPublic.get(`/seekerApplication/${user?.email}`);
      return res.data;
    },
  });

  const handleDelete = async (id) => {
    Alert.alert(
      "Delete Confirmation",
      "Are you sure you want to delete this application?",
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "Delete",
          style: "destructive",
          onPress: async () => {
            try {
              await axiosPublic.delete(`/seekerApplicationDelete/${id}`);
              refetch();
            } catch (error) {
              console.error("Delete failed:", error);
            }
          },
        },
      ]
    );
  };

  const renderItem = ({ item }) => {
    const {
      _id,
      email,
      cvLink,
      jobTitle,
      company,
      hrEmail,
      appliedAt,
      status,
      feedback,
      img,
    } = item;

    return (
      <View style={styles.card}>
        {img && (
          <Image
            source={{ uri: img }}
            style={styles.image}
            resizeMode="cover"
          />
        )}
        <View style={styles.cardContent}>
          <Text style={styles.jobTitle}>{jobTitle}</Text>
          <Text style={styles.label}>
            Company: <Text style={styles.value}>{company}</Text>
          </Text>
          <Text style={styles.label}>
            HR Email: <Text style={styles.value}>{hrEmail}</Text>
          </Text>
          <Text style={styles.label}>
            Your Email: <Text style={styles.value}>{email}</Text>
          </Text>
          <Text style={styles.label}>
            CV:
            <Text style={styles.link} onPress={() => Linking.openURL(cvLink)}>
              View CV
            </Text>
          </Text>
          <Text style={styles.label}>
            Applied At:
            <Text style={styles.value}>{moment(appliedAt).format("LLL")}</Text>
          </Text>

          <Text style={styles.status}>
            Status:
            <Text
              style={[
                styles.statusValue,
                status === "accepted" && { color: "#2ecc71" }, // green
                status === "rejected" && { color: "#e74c3c" }, // red
                status !== "accepted" &&
                  status !== "rejected" && { color: "#f39c12" }, // orange for pending
              ]}
            >
              {status === "accepted"
                ? "Accepted"
                : status === "rejected"
                ? "Rejected"
                : "Pending"}
            </Text>
          </Text>

          <Text style={styles.feedback}>
            Feedback:
            <Text style={styles.feedbackValue}>
              {feedback ? feedback : "No feedback available"}
            </Text>
          </Text>
        </View>

        <TouchableOpacity
          style={styles.deleteBtn}
          onPress={() => handleDelete(_id)}
        >
          <Ionicons name="trash-outline" size={20} color="#fff" />
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={seekerApplication}
        keyExtractor={(item) => item._id}
        renderItem={renderItem}
        contentContainerStyle={{ paddingBottom: 100 }}
      />
    </View>
  );
};

export default MyAppliedJobs;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 20,
    paddingHorizontal: 16,
    backgroundColor: "#f7f7f7",
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: 15,
    padding: 16,
    marginBottom: 20,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 3 },
    shadowRadius: 5,
    elevation: 3,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  image: {
    width: 80,
    height: 80,
    borderRadius: 10,
    marginRight: 15,
    borderWidth: 2,
    borderColor: "#ddd",
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 6,
    elevation: 5,
  },
  cardContent: {
    flex: 1,
  },
  jobTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 8,
  },
  label: {
    fontWeight: "600",
    color: "#555",
    marginBottom: 4,
  },
  value: {
    fontWeight: "400",
    color: "#222",
  },
  link: {
    color: "#007bff",
    textDecorationLine: "underline",
  },
  status: {
    marginTop: 6,
    color: "#4b0082",
  },
  statusValue: {
    fontWeight: "bold",
    color: "#4b0082",
  },
  feedback: {
    marginTop: 2,
    color: "#e67e22",
  },
  feedbackValue: {
    fontStyle: "italic",
  },
  deleteBtn: {
    backgroundColor: "#e74c3c",
    padding: 10,
    borderRadius: 50,
    alignItems: "center",
    justifyContent: "center",
    width: 40,
    height: 40,
    alignSelf: "flex-end",
  },
});
