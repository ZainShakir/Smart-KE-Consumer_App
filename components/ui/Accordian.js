import React, { useState, useEffect } from "react";
import {
  View,
  TouchableOpacity,
  Text,
  FlatList,
  StyleSheet,
  LayoutAnimation,
  Platform,
  UIManager,
  Dimensions,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

// if (Platform.OS === "android") {
//   UIManager.setLayoutAnimationEnabledExperimental(true);
// }

const Accordin = (props) => {
  const [expanded, setExpanded] = useState(false);

  const toggleExpand = () => {
    // LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setExpanded(!expanded);
  };

  return (
    <View style={{ marginTop: "4%" }}>
      <TouchableOpacity style={styles.button} onPress={() => toggleExpand()}>
        {props.isInvalid ? (
          <AntDesign name="exclamationcircle" size={24} color="red" />
        ) : null}

        <Text style={[styles.title]}>{props.title}</Text>

        <Ionicons
          name={expanded ? "caret-up" : "caret-down"}
          size={24}
          color="white"
        />
      </TouchableOpacity>

      <View style={styles.parentHr} />
      {expanded && props.children ? (
        <View style={styles.childHr}>{props.children}</View>
      ) : null}
    </View>
  );
};

export default Accordin;

const styles = StyleSheet.create({
  title: {
    fontSize: 14,
    fontWeight: "bold",
    color: "white",
  },

  button: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    height: 60,
    alignSelf: "center",
    paddingLeft: 25,
    paddingRight: 18,
    alignItems: "center",
    backgroundColor: "black",
    marginHorizontal: "5%",
    borderRadius: Platform.OS === "ios" ? "10%" : 10,
    shadowOpacity: 0.7,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 0 },
    shadowColor: "black",
    elevation: 5,
  },
  parentHr: {
    height: 2,
    width: "100%",
  },
  childHr: {
    width: "98%",
    alignSelf: "center",
    marginTop: 10,
    paddingVertical: "4%",
    paddingLeft: 15,
    marginHorizontal: "5%",
    backgroundColor: "white",
    borderRadius: Platform.OS === "ios" ? "10%" : 10,
    shadowOpacity: 0.2,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 0 },
    shadowColor: "black",
  },
});
