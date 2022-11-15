import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";

import Bottom_nav from "./Bottom_nav";
import Testing from "../../Screens/Testing";

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
    </Drawer.Navigator>
  );
};

export default Drawer_nav;

const styles = StyleSheet.create({});
