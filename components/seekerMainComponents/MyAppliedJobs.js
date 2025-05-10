import { StyleSheet, Text, View } from "react-native";

const MyAppliedJobs = () => {
  return (
    <View style={styles.screenContainer}>
      <Text style={styles.screenText}>My applied jobs</Text>
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
export default MyAppliedJobs;
