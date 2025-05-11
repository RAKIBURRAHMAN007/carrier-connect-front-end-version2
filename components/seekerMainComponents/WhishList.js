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
import Icon from "react-native-vector-icons/MaterialIcons"; // or Ionicons/Feather
import { StatusBar } from "expo-status-bar";

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
      <StatusBar style="light" backgroundColor="#9475d6" />
      {myWishlist.length === 0 ? (
        <Text style={styles.emptyText}>No jobs in your wishlist</Text>
      ) : (
        <FlatList
          data={myWishlist}
          keyExtractor={(item) => item._id}
          renderItem={({ item }) => (
            <View style={styles.card}>
              <View style={styles.imageContainer}>
                <Image
                  source={{ uri: item.img }}
                  style={styles.image}
                  resizeMode="contain"
                />
              </View>

              <View style={styles.content}>
                <Text style={styles.title}>Job Title: {item.jobTitle}</Text>
                <Text style={styles.company}>Company: {item.company}</Text>
                <Text style={styles.location}>Location: {item.location}</Text>

                <View style={styles.iconRow}>
                  <TouchableOpacity
                    onPress={() =>
                      navigation.navigate("JobDetails", {
                        jobId: item.JobId,
                      })
                    }
                    style={styles.iconButton}
                  >
                    <Icon name="info" size={22} color="#4f46e5" />
                  </TouchableOpacity>

                  <TouchableOpacity
                    onPress={() => handleDelete(item._id)}
                    style={styles.iconButton}
                  >
                    <Icon name="delete" size={22} color="#dc2626" />
                  </TouchableOpacity>
                </View>
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
    backgroundColor: "#f9f9f9",
  },
  scrollContainer: {
    paddingBottom: 100,
    paddingHorizontal: 10,
  },
  emptyText: {
    textAlign: "center",
    marginTop: 30,
    fontSize: 18,
    color: "#999",
  },
  card: {
    flexDirection: "row",
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 12,
    marginBottom: 12,
    marginHorizontal: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  imageContainer: {
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
    overflow: "hidden",
    marginRight: 12,
    borderWidth: 1,
    borderColor: "#ddd",
  },
  image: {
    width: 80,
    height: 80,
    borderRadius: 8,
  },
  content: {
    flex: 1,
    justifyContent: "center",
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
  },
  company: {
    fontSize: 15,
    color: "#666",
    marginTop: 2,
  },
  location: {
    fontSize: 14,
    color: "#888",
    marginTop: 2,
  },
  iconRow: {
    flexDirection: "row",
    marginTop: 10,
    gap: 12,
  },
  iconButton: {
    backgroundColor: "#f3f4f6",
    padding: 10,
    borderRadius: 50,
  },
});

export default WishList;
