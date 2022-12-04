import { StyleSheet, Text, View, Dimensions, Pressable } from "react-native";
import React, { useState, useContext, useEffect } from "react";
import { useFonts } from "expo-font";
import {
  MaterialCommunityIcons,
  Entypo,
  MaterialIcons,
} from "@expo/vector-icons";

//import DropDownPicker from "react-native-custom-dropdown";

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

const Stock_screen = ({ navigation }) => {
  const [loaded] = useFonts({
    Montserrat_m: require("../assets/fonts/Montserrat/static/Montserrat-Medium.ttf"),
  });

  if (!loaded) {
    return null;
  }
  return (
    <View style={styles.container}>
      <View style={styles.body}>
        <View>
          <Pressable>
            <Pressable
              onPress={() => navigation.toggleDrawer()}
              style={{ position: "absolute" }}
            >
              <Entypo name="menu" size={26} color="black" />
            </Pressable>
          </Pressable>
          <Text
            style={{
              fontFamily: "Montserrat_m",
              fontSize: 24,
              alignSelf: "center",
            }}
          >
            KE STOCK ANALYSIS
          </Text>
        </View>
      </View>
    </View>
  );
};

export default Stock_screen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  body: {
    paddingTop: windowHeight * 0.05,
    paddingHorizontal: windowWidth * 0.02,
  },
});
