import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";

import Bottom_nav from "./Bottom_nav";
import Manage_Accounts from "../../Screens/Manage_Accounts";
import Manage_Complains from "../../Screens/Manage_Complains";
import Profile from "../../Screens/Profile";

// import Testing from "../../Screens/Testing";

const Drawer = createDrawerNavigator();
const Drawer_nav = () => {
  return (
    <Drawer.Navigator
      initialRouteName="Home"
      screenOptions={{
        headerShown: false,
        drawerActiveBackgroundColor: "#66D6AE",
        drawerActiveTintColor: "black",
      }}
    >
      <Drawer.Screen name="Home" component={Bottom_nav} />
      <Drawer.Screen name="Manage Accounts" component={Manage_Accounts} />
      <Drawer.Screen name="Manage Complains" component={Manage_Complains} />
      <Drawer.Screen name="Profile" component={Profile} />
    </Drawer.Navigator>
  );
};

export default Drawer_nav;

const styles = StyleSheet.create({});
