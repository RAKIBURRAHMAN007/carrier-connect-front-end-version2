import { useQuery } from "@tanstack/react-query";
import { useContext } from "react";
import { FlatList, StyleSheet, Text, View } from "react-native";
import { AuthContext } from "../../Auth/AuthProvider";
import UseAxiosPublic from "../../hooks/AxiosPublic";
import JobApplicationItem from "./JobApplicationItem";

const JobApplications = () => {
  const { user } = useContext(AuthContext);
  const axiosPublic = UseAxiosPublic();

  if (!user?.email) {
    return <Text>User not available</Text>;
  }

  const {
    data: hrAppliedJobs = [],
    refetch,
    isError,
    error,
  } = useQuery({
    queryKey: ["hrAppliedJobs", user?.email],
    queryFn: async () => {
      if (!user?.email) return [];
      const res = await axiosPublic.get(`/hrAppliedJobs/${user.email}`);
      return res.data;
    },
    enabled: !!user?.email, // Only run the query if user.email is available
  });

  if (isError) {
    console.log(error); // Log the error for debugging
    return <Text>Error loading job applications</Text>;
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={hrAppliedJobs}
        keyExtractor={(item) => item._id}
        renderItem={({ item }) => (
          <JobApplicationItem
            item={item}
            axiosPublic={axiosPublic}
            refetch={refetch}
          />
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#f9f9f9",
  },
});

export default JobApplications;
