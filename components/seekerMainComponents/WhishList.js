import { useQuery } from "@tanstack/react-query";
import {
  FlatList,
  StyleSheet,
  View,
  Text,
  Image,
  TouchableOpacity,
  Alert,
} from "react-native";
import UseAxiosPublic from "../../hooks/AxiosPublic";
import { useContext } from "react";
import { AuthContext } from "../../Auth/AuthProvider";
import { useNavigation } from "@react-navigation/native";

const WishList = () => {
  const axiosPublic = UseAxiosPublic();
  const { user } = useContext(AuthContext);
  const navigation = useNavigation();

  const { data: myWishlist = [], refetch } = useQuery({
    queryKey: ["myWishlist"],
    queryFn: async () => {
      const res = await axiosPublic.get(`/myWishlist/${user.email}`);
      return res.data;
    },
  });

  const handleDelete = async (id) => {
    Alert.alert("Confirm Delete", "Are you sure you want to delete this job?", [
      { text: "Cancel", style: "cancel" },
      {
        text: "Delete",
        style: "destructive",
        onPress: async () => {
          try {
            const res = await axiosPublic.delete(`/wishlist/${id}`);
            if (res.data.deletedCount > 0) {
              refetch();
            }
          } catch (error) {
            console.error("Delete failed:", error);
          }
        },
      },
    ]);
  };

  return (
    <View style={styles.container}>
      {myWishlist.length === 0 ? (
        <Text style={styles.emptyText}>No jobs in your wishlist</Text>
      ) : (
        <FlatList
          data={myWishlist}
          keyExtractor={(item) => item._id}
          renderItem={({ item }) => (
            <View style={styles.card}>
              <Image
                source={{ uri: item.img }}
                style={styles.image}
                resizeMode="cover"
              />
              <Text style={styles.title}>Job Title: {item.jobTitle}</Text>
              <Text>Company Name: {item.company}</Text>
              <Text>Job Location: {item.location}</Text>

              <View style={styles.buttonRow}>
                <TouchableOpacity
                  style={styles.detailsButton}
                  onPress={() =>
                    navigation.navigate("JobDetails", { jobId: item.JobId })
                  }
                >
                  <Text style={styles.detailsText}>Details</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={styles.deleteButton}
                  onPress={() => handleDelete(item._id)}
                >
                  <Text style={styles.deleteText}>Delete</Text>
                </TouchableOpacity>
              </View>
            </View>
          )}
          contentContainerStyle={styles.scrollContainer}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 40,
    backgroundColor: "#fff",
  },
  card: {
    backgroundColor: "#fff",
    padding: 15,
    marginBottom: 10,
    borderRadius: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.5,
    elevation: 5,
  },
  image: {
    width: "100%",
    height: 180,
    borderRadius: 8,
    marginBottom: 10,
  },
  title: {
    fontWeight: "bold",
    fontSize: 16,
    marginBottom: 5,
  },
  scrollContainer: {
    paddingBottom: 100,
    paddingHorizontal: 10,
  },
  emptyText: {
    textAlign: "center",
    marginTop: 20,
    fontSize: 18,
    color: "#888",
  },
  buttonRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10,
  },
  detailsButton: {
    flex: 1,
    backgroundColor: "#4f46e5",
    paddingVertical: 8,
    borderRadius: 5,
    marginRight: 5,
    alignItems: "center",
  },
  deleteButton: {
    flex: 1,
    backgroundColor: "#dc2626",
    paddingVertical: 8,
    borderRadius: 5,
    marginLeft: 5,
    alignItems: "center",
  },
  detailsText: {
    color: "#fff",
    fontWeight: "600",
  },
  deleteText: {
    color: "#fff",
    fontWeight: "600",
  },
});

export default WishList;
