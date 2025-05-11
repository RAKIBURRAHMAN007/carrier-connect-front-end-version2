import { useQuery } from "@tanstack/react-query";
import { FlatList, StyleSheet, View, TextInput, Text } from "react-native";
import { useState } from "react";
import UseAxiosPublic from "../../hooks/AxiosPublic";
import SeekerJobCard from "./SeekerJobCard";

const AllAvilableJobs = () => {
  const axiosPublic = UseAxiosPublic();
  const [searchQuery, setSearchQuery] = useState("");

  const { data: allAvailableJobs = [], refetch } = useQuery({
    queryKey: ["allAvailableJobs"],
    queryFn: async () => {
      const res = await axiosPublic.get("/allAvailableJobs");
      return res.data;
    },
  });

  const filteredJobs = allAvailableJobs.filter((job) => {
    const query = searchQuery.toLowerCase();
    return (
      job.jobTitle.toLowerCase().includes(query) ||
      job.company.toLowerCase().includes(query)
    );
  });

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.searchInput}
        placeholder="Search by job title or company"
        value={searchQuery}
        onChangeText={setSearchQuery}
      />

      {filteredJobs.length === 0 ? (
        <Text style={styles.noResult}>No jobs found</Text>
      ) : (
        <FlatList
          data={filteredJobs}
          keyExtractor={(item) => item._id}
          renderItem={({ item }) => <SeekerJobCard availableJob={item} />}
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
  scrollContainer: {
    paddingBottom: 100,
    paddingHorizontal: 10,
  },
  searchInput: {
    height: 40,
    marginHorizontal: 10,
    marginBottom: 10,
    paddingHorizontal: 12,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    backgroundColor: "#f9f9f9",
  },
  noResult: {
    textAlign: "center",
    marginTop: 20,
    color: "#999",
    fontSize: 16,
  },
});

export default AllAvilableJobs;
