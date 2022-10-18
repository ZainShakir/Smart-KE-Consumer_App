import {
  StyleSheet,
  Text,
  View,
  ImageBackground,
  Image,
  Pressable,
} from "react-native";
import React from "react";
import Input_paper from "../components/ui/Input_paper";
import Flat_button from "../components/ui/Flat_button";
import { useFonts } from "expo-font";
import Button from "../components/ui/Button";
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
const Reset = () => {
  const navigation = useNavigation();
  const [loaded] = useFonts({
    RussoOne: require("../assets/fonts/RussoOne-Regular.ttf"),
    Outfit: require("../assets/fonts/Outfit-SemiBold.ttf"),
    Outfit_reg: require("../assets/fonts/Outfit-Regular.ttf"),
  });

  if (!loaded) {
    return null;
  }
  return (
    <View style={styles.container}>
      <ImageBackground
        source={require("../assets/images/background.jpg")}
        resizeMode="cover"
        style={styles.image}
      >
        <Pressable
          style={{ position: "absolute", marginLeft: "5%", marginTop: "7%" }}
          onPress={() => navigation.replace("Login")}
        >
          <Ionicons name="arrow-back" size={27} color="#F0984A" />
        </Pressable>
        <Image
          style={styles.Logo}
          source={require("../assets/images/KE_LOGO.png")}
        />
        <Text style={styles.heading}>K-ELECTRIC</Text>
        <View style={styles.box}>
          <Text style={styles.sub_heading}>RESET PASSWORD</Text>
          <Text
            style={{
              fontFamily: "Outfit_reg",
              fontSize: 15,
              alignSelf: "center",
              marginTop: "3%",
            }}
          >
            Please Enter Your Registered Email-Address:
          </Text>
          <View style={{ height: "2%" }} />
          <Input_paper label={"Email"} icon_left={"email"} mode={"outlined"} />
          <View style={{ marginTop: "6%" }}>
            <Button
              onPress={() => alert("Hello")}
              backc={"#F0984A"}
              width={"85%"}
              font={"Outfit"}
              fsize={15}
              fcolor={"#FFFFFF"}
            >
              {"RESET PASSWORD"}
            </Button>
          </View>
        </View>
        <Text
          style={{
            fontFamily: "Outfit_reg",
            fontSize: 15,
            alignSelf: "center",
            position: "absolute",
            bottom: "3%",
          }}
        >
          Powered By FAST FYP
        </Text>
      </ImageBackground>
    </View>
  );
};

export default Reset;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#66D6AE",
  },
  image: {
    flex: 1,
  },
  Logo: {
    height: "30%",
    width: "40%",
    alignSelf: "center",
  },
  heading: {
    fontFamily: "RussoOne",
    fontSize: 27,
    alignSelf: "center",
  },
  box: {
    marginTop: "5%",
    height: "35%",
    marginHorizontal: "5%",
    borderRadius: Platform.OS === "ios" ? "10%" : 10,
    backgroundColor: "white",
  },
  sub_heading: {
    fontFamily: "Outfit",
    fontSize: 20,
    alignSelf: "center",
    marginTop: "5%",
  },
});
