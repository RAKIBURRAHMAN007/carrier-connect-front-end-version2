import { useQuery } from "@tanstack/react-query";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  ActivityIndicator,
  Image,
} from "react-native";
import UseAxiosPublic from "../../hooks/AxiosPublic";
import { useContext } from "react";
import { AuthContext } from "../../Auth/AuthProvider";
import HrJobCard from "./HrJobCard";
import { FlatList } from "react-native";

const ManagePostedJobs = () => {
  const axiosPublic = UseAxiosPublic();
  const { user } = useContext(AuthContext);

  const {
    data: jobs = [],

    refetch,
  } = useQuery({
    queryKey: ["jobs", user?.email],

    queryFn: async () => {
      const res = await axiosPublic.get(`/jobs/${user.email}`);
      return res.data;
    },
  });

  return (
    <View style={styles.container}>
      <FlatList
        data={jobs} // Set the jobs array as the data prop
        contentContainerStyle={styles.scrollContainer}
        keyExtractor={(item) => item._id.toString()} // Use _id as key for each item
        renderItem={({ item }) => (
          <HrJobCard key={item._id} job={item} refetch={refetch} />
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 40,
    paddingHorizontal: 5,
    backgroundColor: "#fff",
  },

  scrollContainer: {
    paddingBottom: 100,
    paddingHorizontal: 10,
  },
});

export default ManagePostedJobs;
