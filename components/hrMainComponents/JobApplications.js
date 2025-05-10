import { StyleSheet, Text, View } from "react-native";

const JobApplications = () => {
  return (
    <View style={styles.screenContainer}>
      <Text style={styles.screenText}>Job applications</Text>
    </View>
  );
};
const styles = StyleSheet.create({
  screenContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  screenText: {
    fontSize: 24,
    color: "#9475d6",
  },
});

export default JobApplications;
