import React, { useContext, useEffect, useState } from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { Ionicons } from "@expo/vector-icons"; // for icons
import { View, Text, StyleSheet } from "react-native";
import UseAxiosPublic from "../hooks/AxiosPublic";
import Profile from "../components/Profile";
import { AuthContext } from "../Auth/AuthProvider";
import PostNewJob from "../components/hrMainComponents/PostNewJob";

import ManagePostedJobs from "../components/hrMainComponents/ManagePostedJobs";
import JobApplications from "../components/hrMainComponents/JobApplications";
import AllAvilableJobs from "../components/seekerMainComponents/AllAvilableJobs";
import MyAppliedJobs from "../components/seekerMainComponents/MyAppliedJobs";
import RejectedJobs from "../components/seekerMainComponents/RejectedJobs";
import WhishList from "../components/seekerMainComponents/WhishList";
import HrAnalytics from "../components/hrMainComponents/HrAnalytics ";
import JobDetails from "../components/seekerMainComponents/JobDetails";
import CareerSupport from "../components/seekerMainComponents/CareerSupport";

const Drawer = createDrawerNavigator();

const MainScreenPage = () => {
  const [loggedUser, setLoggedUser] = useState([]);
  const axiosPublic = UseAxiosPublic();
  const { user } = useContext(AuthContext);
  useEffect(() => {
    if (user?.email) {
      axiosPublic
        .get(`/user/${user.email}`)
        .then((res) => {
          console.log("User data:", res.data); // Log the data returned from the API
          setLoggedUser(res.data);
        })
        .catch((error) => {
          console.error("Error fetching user data:", error);
        });
    }
  }, [user]);
  return (
    <Drawer.Navigator
      initialRouteName="Profile"
      screenOptions={{
        headerStyle: {
          backgroundColor: "#9475d6",
        },
        headerTintColor: "#fff",
        drawerActiveBackgroundColor: "#9475d6",
        drawerActiveTintColor: "#fff",
        drawerInactiveTintColor: "#555",
        drawerLabelStyle: {
          fontSize: 16,
          marginLeft: -10,
        },
      }}
    >
      <Drawer.Screen
        name="Profile"
        component={Profile} // Temporary placeholder component
        options={{
          drawerIcon: ({ color }) => (
            <Ionicons name="person-outline" size={22} color={color} />
          ),
        }}
      />
      {loggedUser?.role === "hr" && (
        <Drawer.Screen
          name="Post New Job"
          component={PostNewJob}
          options={{
            drawerIcon: ({ color }) => (
              <Ionicons name="add-circle-outline" size={22} color={color} />
            ),
          }}
        />
      )}

      {loggedUser?.role === "hr" && (
        <Drawer.Screen
          name="Manage Posted Jobs"
          component={ManagePostedJobs}
          options={{
            drawerIcon: ({ color }) => (
              <Ionicons name="construct-outline" size={22} color={color} />
            ),
          }}
        />
      )}
      {loggedUser?.role === "hr" && (
        <Drawer.Screen
          name="Job Applications"
          component={JobApplications}
          options={{
            drawerIcon: ({ color }) => (
              <Ionicons name="document-text-outline" size={22} color={color} />
            ),
          }}
        />
      )}
      {loggedUser?.role === "hr" && (
        <Drawer.Screen
          name="HR Analytics Overview"
          component={HrAnalytics}
          options={{
            drawerIcon: ({ color }) => (
              <Ionicons name="bar-chart-outline" size={22} color={color} />
            ),
          }}
        />
      )}
      {loggedUser?.role === "seeker" && (
        <Drawer.Screen
          name="All Available Jobs"
          component={AllAvilableJobs}
          options={{
            drawerIcon: ({ color }) => (
              <Ionicons name="search-outline" size={22} color={color} />
            ),
          }}
        />
      )}
      {loggedUser?.role === "seeker" && (
        <Drawer.Screen
          name="My Applied Jobs"
          component={MyAppliedJobs}
          options={{
            drawerIcon: ({ color }) => (
              <Ionicons name="briefcase-outline" size={22} color={color} />
            ),
          }}
        />
      )}
      {/* {loggedUser?.role === "seeker" && (
        <Drawer.Screen
          name="Rejected Jobs"
          component={RejectedJobs}
          options={{
            drawerIcon: ({ color }) => (
              <Ionicons name="sad-outline" size={22} color={color} />
            ),
          }}
        />
      )} */}
      {loggedUser?.role === "seeker" && (
        <Drawer.Screen
          name="wishList"
          component={WhishList}
          options={{
            drawerIcon: ({ color }) => (
              <Ionicons name="heart-outline" size={22} color={color} />
            ),
          }}
        />
      )}
      {loggedUser?.role === "seeker" && (
        <Drawer.Screen
          name="careerSupport"
          component={CareerSupport}
          options={{
            drawerIcon: ({ color }) => (
              <Ionicons
                name="chatbubble-ellipses-outline"
                size={22}
                color={color}
              />
            ),
          }}
        />
      )}

      {loggedUser?.role === "seeker" && (
        <Drawer.Screen
          name="JobDetails"
          component={JobDetails}
          options={{
            drawerItemStyle: { display: "none" },
            drawerIcon: ({ color }) => (
              <Ionicons
                name="information-circle-outline"
                size={22}
                color={color}
              />
            ),
          }}
        />
      )}
    </Drawer.Navigator>
  );
};

// Styles for temporary screens
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

export default MainScreenPage;
