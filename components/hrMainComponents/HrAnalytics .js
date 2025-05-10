import { useQuery } from "@tanstack/react-query";
import { StyleSheet, Text, View, Dimensions, ScrollView } from "react-native";
import { PieChart } from "react-native-chart-kit";
import UseAxiosPublic from "../../hooks/AxiosPublic";
import { useContext } from "react";
import { AuthContext } from "../../Auth/AuthProvider";

const screenWidth = Dimensions.get("window").width;

const HrAnalytics = () => {
  const axiosPublic = UseAxiosPublic();
  const { user } = useContext(AuthContext);

  const { data: hrAnalytics = {} } = useQuery({
    queryKey: ["heAnalytics", user?.email],
    queryFn: async () => {
      const res = await axiosPublic.get(`/hr-stats/${user?.email}`);
      return res.data;
    },
    enabled: !!user?.email,
  });

  const {
    totalPosts = 0,
    totalApplicants = 0,
    pendingApplicants = 0,
    acceptedApplicants = 0,
    rejectedApplicants = 0,
  } = hrAnalytics;

  const pieData = [
    {
      name: "Posts",
      population: totalPosts,
      color: "#9475d6",
      legendFontColor: "#333",
      legendFontSize: 15,
    },
    {
      name: "Application",
      population: totalApplicants,
      color: "#cba3f4",
      legendFontColor: "#333",
      legendFontSize: 15,
    },
    {
      name: "Pending",
      population: pendingApplicants,
      color: "#fcd34d",
      legendFontColor: "#333",
      legendFontSize: 15,
    },
    {
      name: "Accepted",
      population: acceptedApplicants,
      color: "#4ade80",
      legendFontColor: "#333",
      legendFontSize: 15,
    },
    {
      name: "Rejected",
      population: rejectedApplicants,
      color: "#f87171",
      legendFontColor: "#333",
      legendFontSize: 15,
    },
  ];

  return (
    <View style={styles.container}>
      <Text style={styles.title}>HR Activity</Text>
      <PieChart
        data={pieData}
        width={screenWidth}
        height={220}
        chartConfig={{
          color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`, //dynamic legend color in pie
        }}
        accessor={"population"} //for making pie slide according to value
        backgroundColor={"transparent"}
        paddingLeft={"20"}
        absolute //show actual value
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
  },
  title: {
    fontSize: 24,
    textAlign: "center",
    color: "#9475d6",
    marginVertical: 20,
  },
});

export default HrAnalytics;
