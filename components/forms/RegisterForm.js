import {
  StyleSheet,
  Text,
  View,
  ImageBackground,
  Pressable,
  ScrollView,
  KeyboardAvoidingView,
} from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import { useFonts } from "expo-font";
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import Input_paper from "../ui/Input_paper";
import Flat_button from "../ui/Flat_button";
import Button from "../ui/Button";

const RegisterForm = () => {
  const navigation = useNavigation();
  const [loaded] = useFonts({
    RussoOne: require("../../assets/fonts/RussoOne-Regular.ttf"),
    Outfit: require("../../assets/fonts/Outfit-SemiBold.ttf"),
    Outfit_reg: require("../../assets/fonts/Outfit-Regular.ttf"),
  });

  if (!loaded) {
    return null;
  }
  return (
    <View style={styles.container}>
      <ImageBackground
        source={require("../../assets/images/background.jpg")}
        resizeMode="cover"
        style={styles.image}
      >
        <View
          style={{
            marginTop: "7%",
          }}
        >
          <Pressable
            style={{ position: "absolute", marginLeft: "5%" }}
            onPress={() => navigation.replace("Login")}
          >
            <Ionicons name="arrow-back" size={27} color="#F0984A" />
          </Pressable>
          <Text style={styles.heading}>K-ELECTRIC</Text>
        </View>
        <View style={styles.box}>
          <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            style={{ flex: 1 }}
            keyboardVerticalOffset={70}
          >
            <ScrollView>
              <Text style={styles.sub_heading}>REGISTER</Text>
              <View style={{ height: "3%" }} />
              <Input_paper
                label={"First Name"}
                icon_left={"account"}
                mode={"outlined"}
              />
              <View style={{ height: "2%" }} />
              <Input_paper
                label={"Last Name"}
                icon_left={"account"}
                mode={"outlined"}
              />
              <View style={{ height: "2%" }} />
              <Input_paper
                label={"Email"}
                icon_left={"email"}
                mode={"outlined"}
              />
              <View style={{ height: "2%" }} />
              <Input_paper
                label={"Password"}
                icon_left={"lock"}
                mode={"outlined"}
                secure={true}
              />
              <View style={{ height: "2%" }} />
              <Input_paper
                label={"Confirm Password"}
                icon_left={"lock"}
                mode={"outlined"}
                secure={true}
              />
              <View style={{ height: "2%" }} />
              <Input_paper
                label={"CNIC"}
                icon_left={"smart-card-outline"}
                mode={"outlined"}
                keyboard={"numeric"}
              />
              <View style={{ marginTop: "6%" }}>
                <Button
                  onPress={() => alert("Hello")}
                  backc={"#F0984A"}
                  width={"80%"}
                  font={"Outfit"}
                  fsize={15}
                  fcolor={"#FFFFFF"}
                >
                  {"REGISTER"}
                </Button>
              </View>
              <View
                style={{
                  marginTop: "6%",
                  flexDirection: "row",
                  justifyContent: "center",
                }}
              >
                <Text
                  style={{
                    fontFamily: "Outfit",
                    fontSize: 15,
                    paddingRight: "2%",
                  }}
                >
                  Already Have An Account ?
                </Text>
                <Flat_button
                  font={"Outfit"}
                  wid={15}
                  color={"#F0984A"}
                  onPress={() => navigation.replace("Login")} //cchange that to replace in replace you cant swipe back
                >
                  {"Login"}
                </Flat_button>
              </View>
            </ScrollView>
          </KeyboardAvoidingView>
        </View>
      </ImageBackground>
    </View>
  );
};

export default RegisterForm;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#66D6AE",
  },
  image: {
    flex: 1,
  },
  box: {
    marginTop: "5%",
    height: "85%",
    marginHorizontal: "5%",
    borderRadius: Platform.OS === "ios" ? "10%" : 10,
    backgroundColor: "white",
  },
  heading: {
    fontFamily: "RussoOne",
    fontSize: 27,
    alignSelf: "center",
  },
  sub_heading: {
    fontFamily: "Outfit",
    fontSize: 20,
    alignSelf: "center",
    marginTop: "5%",
  },
});
