import { useQuery } from "@tanstack/react-query";
import { FlatList, StyleSheet, View } from "react-native";
import UseAxiosPublic from "../../hooks/AxiosPublic";
import SeekerJobCard from "./SeekerJobCard";

const AllAvilableJobs = () => {
  const axiosPublic = UseAxiosPublic();

  const { data: allAvailableJobs = [], refetch } = useQuery({
    queryKey: ["allAvailableJobs"], // ✅ queryKey is an array
    queryFn: async () => {
      const res = await axiosPublic.get("/allAvailableJobs");
      return res.data;
    },
  });

  return (
    <View style={styles.container}>
      <FlatList
        data={allAvailableJobs}
        keyExtractor={(item) => item._id}
        renderItem={({ item }) => <SeekerJobCard availableJob={item} />}
        contentContainerStyle={styles.scrollContainer}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 40,
    backgroundColor: "#fff",
  },
  scrollContainer: {
    paddingBottom: 100,
    paddingHorizontal: 10,
  },
});

export default AllAvilableJobs;
