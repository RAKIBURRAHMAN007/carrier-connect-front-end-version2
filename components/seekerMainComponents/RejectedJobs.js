import React from "react";
import { Text, View } from "react-native";
import { StyleSheet } from "react-native";

const RejectedJobs = () => {
  return (
    <View style={styles.screenContainer}>
      <Text style={styles.screenText}>Rejected jobs</Text>
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
export default RejectedJobs;
