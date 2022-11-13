import { StyleSheet, Text, View, Modal, Pressable } from "react-native";
import React from "react";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
const Tab = createMaterialTopTabNavigator();
import { Ionicons } from "@expo/vector-icons";
import Billing_Complain from "./Billing_Complain";

const Test1 = () => {
  return (
    <View style={{ flex: 1, backgroundColor: "#BFEFFF" }}>
      <Text>Hello</Text>
    </View>
  );
};
const Complain = ({ navigation }) => {
  return (
    <View style={styles.Modal}>
      <View style={{ backgroundColor: "#66D6AE" }}>
        <Text
          style={{
            position: "absolute",
            fontSize: 20,
            marginTop: "6%",
            marginLeft: "40%",
          }}
        >
          Complain
        </Text>
        <Pressable
          style={{
            marginTop: "6%",
            alignSelf: "flex-end",
            paddingRight: "4%",
          }}
          onPress={() => {
            navigation.goBack();
          }}
        >
          <Ionicons name="md-arrow-back" size={30} color="black" />
        </Pressable>
      </View>
      <View
        style={{
          borderTopWidth: 1,
          borderColor: "#dcdcdc",
        }}
      />
      <Tab.Navigator keyboardDismissMode="on-drag">
        <Tab.Screen name="Electricity Complain" component={Test1} />
        <Tab.Screen name="Billing Complain" component={Billing_Complain} />
      </Tab.Navigator>
    </View>
  );
};

export default Complain;

const styles = StyleSheet.create({
  Modal: {
    backgroundColor: "white",
    flex: 1,
    flexDirection: "column",
  },
});
