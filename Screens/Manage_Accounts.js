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
} from "react-native";
import React from "react";
import {
  MaterialCommunityIcons,
  Entypo,
  MaterialIcons,
} from "@expo/vector-icons";

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
              marginTop: "5%",
            }}
          >
            <Entypo name="menu" size={26} color="black" />
          </Pressable>
          <Text style={{ fontSize: 20, alignSelf: "center" }}>
            Manage Accounts
          </Text>
        </View>
        <ScrollView style={styles.halfbody}></ScrollView>
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
    padding: 20,
  },
});
