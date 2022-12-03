import {
  StyleSheet,
  Text,
  View,
  ImageBackground,
  Pressable,
  Modal,
  ScrollView,
  processColor,
  Alert,
  Image,
} from "react-native";
import React, { useContext, useEffect, useState } from "react";
import {
  MaterialCommunityIcons,
  Entypo,
  MaterialIcons,
} from "@expo/vector-icons";

import { SwipeListView } from "react-native-swipe-list-view";
import Basic from "../components/ui/Account_list";

const Manage_Accounts = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <ImageBackground
        source={require("../assets/images/5555.jpg")}
        resizeMode="cover"
        style={styles.image}
      >
        <View style={{ flex: 0.1, paddingTop: "5%" }}>
          <Pressable
            onPress={() => navigation.toggleDrawer()}
            style={{
              position: "absolute",
              marginHorizontal: "5%",
              marginTop: "8%",
            }}
          >
            <Entypo name="menu" size={26} color="black" />
          </Pressable>
          <Text style={{ fontSize: 20, alignSelf: "center", marginTop: "3%" }}>
            Manage Accounts
          </Text>
        </View>
        <Basic />
      </ImageBackground>
    </View>
  );
};

export default Manage_Accounts;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#66D6AE",
  },
  image: {
    flex: 1,
  },
  halfbody: {
    flex: 1,
    backgroundColor: "#F1F6F7",
    borderTopRightRadius: Platform.OS === "ios" ? "20%" : 20,
    borderTopLeftRadius: Platform.OS === "ios" ? "20%" : 20,
    paddingTop: 25,
  },

  deleteButton: {
    alignSelf: "flex-end",
    width: 75,
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "red",
    marginVertical: 3,
  },
});
