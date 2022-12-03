import { StatusBar } from "expo-status-bar";
import {
  ImageBackground,
  StyleSheet,
  Text,
  View,
  Image,
  KeyboardAvoidingView,
  Alert,
} from "react-native";
import Input_paper from "../ui/Input_paper";
import Flat_button from "../ui/Flat_button";
import React, { useState } from "react";
import { useFonts } from "expo-font";
import Button from "../ui/Button";
import { useNavigation } from "@react-navigation/native";

const LoginForm = ({ onAuthenticate }) => {
  const [credentialsInvalid, setCredentialsInvalid] = useState({
    email: false,
    password: false,
  });
  const [enteredEmail, setEnteredEmail] = useState("");
  const [enteredPassword, setEnteredPassword] = useState("");
  function submitHandler(credentials) {
    let { email, password } = credentials;

    email = email.trim();
    password = password.trim();

    let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/;

    const emailIsValid = reg.test(email);
    const passwordIsValid = password.length > 5;

    if (!emailIsValid || !passwordIsValid) {
      Alert.alert("Invalid input", "Please check your entered credentials.");
      setCredentialsInvalid({
        email: !emailIsValid,
        password: !passwordIsValid,
      });
      return;
    }
    onAuthenticate({ email, password });
  }

  function updateInputValueHandler(inputType, enteredValue) {
    switch (inputType) {
      case "email":
        setEnteredEmail(enteredValue);
        break;
      case "password":
        setEnteredPassword(enteredValue);
        break;
    }
  }

  const navigation = useNavigation();
  const [loaded] = useFonts({
    RussoOne: require("../../assets/fonts/RussoOne-Regular.ttf"),
    Outfit: require("../../assets/fonts/Outfit-SemiBold.ttf"),
    Outfit_reg: require("../../assets/fonts/Outfit-Regular.ttf"),
    Roboto: require("../../assets/fonts/RobotoSlab-VariableFont_wght.ttf"),
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
        <Image
          style={styles.Logo}
          source={require("../../assets/images/KE_LOGO.png")}
        />
        <Text
          style={{
            fontFamily: "RussoOne",
            fontSize: 27,
            alignSelf: "center",
          }}
        >
          K-ELECTRIC
        </Text>

        <View style={styles.box}>
          <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            style={[]}
            keyboardVerticalOffset={70}
          >
            <Text
              style={{
                fontFamily: "Outfit",
                fontSize: 18,
                alignSelf: "center",
                marginTop: "5%",
              }}
            >
              LOGIN
            </Text>
            {/* <View
                style={{
                  height: 50,
                  backgroundColor: "#F5F5F5",
                  width: 330,
                  alignSelf: "center",
                  borderRadius: Platform.OS === "ios" ? "10%" : 10,
                  padding: 10,
                }}
              >
                  </View> */}
            <View style={{ height: "5%" }} />
            <Input_paper
              label={"Email"}
              icon_left={"email"}
              mode={"outlined"}
              value={enteredEmail}
              onUpdateValue={updateInputValueHandler.bind(this, "email")}
              keyboard={"email-address"}
              isInvalid={credentialsInvalid.email}
            />
            <View style={{ height: "5%" }} />
            <Input_paper
              label={"Password"}
              icon_left={"lock"}
              mode={"outlined"}
              secure={true}
              onUpdateValue={updateInputValueHandler.bind(this, "password")}
              value={enteredPassword}
              isInvalid={credentialsInvalid.password}
            />
            <View style={{ marginTop: "6%", paddingLeft: "7%" }}>
              <Flat_button
                font={"Outfit"}
                wid={15}
                color={"#F0984A"}
                onPress={() => navigation.navigate("Reset")} //cchange that to replace in replace you cant swipe back
              >
                {"Forgot Your Password ?"}
              </Flat_button>
            </View>
            <View style={{ marginTop: "5%" }}>
              <Button
                onPress={() =>
                  submitHandler({
                    email: enteredEmail,
                    password: enteredPassword,
                  })
                }
                backc={"#F0984A"}
                width={"89%"}
                font={"Outfit"}
                fsize={15}
                fcolor={"#FFFFFF"}
              >
                {"LOGIN"}
              </Button>
            </View>
            <View
              style={{
                marginTop: "6%",
                paddingLeft: "7%",
                flexDirection: "row",
              }}
            >
              <Text
                style={{
                  fontFamily: "Outfit",
                  fontSize: 15,
                  paddingRight: "2%",
                }}
              >
                Don't Have An Account ?
              </Text>
              <Flat_button
                font={"Outfit"}
                wid={15}
                color={"#F0984A"}
                onPress={() => navigation.replace("Register")} //cchange that to replace in replace you cant swipe back
              >
                {"Register"}
              </Flat_button>
            </View>
          </KeyboardAvoidingView>
        </View>

        <Text
          style={{
            fontFamily: "Outfit_reg",
            fontSize: 15,
            alignSelf: "center",
            marginTop: "5%",
          }}
        >
          Powered By FAST FYP
        </Text>
      </ImageBackground>
    </View>
  );
};

export default LoginForm;

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
    width: "44%",
    alignSelf: "center",
  },
  box: {
    marginTop: "5%",
    height: "55%",
    marginHorizontal: "5%",
    borderRadius: Platform.OS === "ios" ? "10%" : 10,
    backgroundColor: "white",
  },
});
