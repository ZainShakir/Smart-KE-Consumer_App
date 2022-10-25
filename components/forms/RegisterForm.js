import {
  StyleSheet,
  Text,
  View,
  ImageBackground,
  Pressable,
  ScrollView,
  KeyboardAvoidingView,
  Alert,
} from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import { useFonts } from "expo-font";
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import Input_paper from "../ui/Input_paper";
import Flat_button from "../ui/Flat_button";
import Button from "../ui/Button";

const RegisterForm = ({ onAuthenticate }) => {
  const [credentialsInvalid, setCredentialsInvalid] = useState({
    firstname: false,
    lastname: false,
    email: false,
    password: false,
    confirmpassword: false,
    cnic: false,
  });
  const [enteredEmail, setEnteredEmail] = useState("");
  const [enteredFirstname, setEnteredFirstname] = useState("");
  const [enteredLastname, setEnteredLastname] = useState("");
  const [enteredPassword, setEnteredPassword] = useState("");
  const [enteredConfirmPassword, setEnteredConfirmPassword] = useState("");
  const [enteredCnic, setEnteredCnic] = useState("");

  function submitHandler(credentials) {
    let { firstname, lastname, email, password, confirmpassword, cnic } =
      credentials;

    firstname = firstname.trim();
    lastname = lastname.trim();
    email = email.trim();
    password = password.trim();
    confirmpassword = confirmpassword.trim();
    cnic = cnic.trim();

    let reg_email = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/;
    let reg_cnic = /^[0-9]+$/;

    const firstnameIsValid = firstname.length > 1;
    const lastnameIsValid = lastname.length > 1;
    const emailIsValid = reg_email.test(email);
    const passwordIsValid = password.length > 5;
    const passwordsAreEqual = confirmpassword === password;
    const cnicIsValid =
      reg_cnic.test(cnic) && cnic.length > 11 && cnic.length <= 14;

    if (
      !emailIsValid ||
      !passwordIsValid ||
      !firstnameIsValid ||
      !lastnameIsValid ||
      !passwordsAreEqual ||
      !cnicIsValid
    ) {
      Alert.alert("Invalid input", "Please check your entered credentials.");
      setCredentialsInvalid({
        firstname: !firstnameIsValid,
        lastname: !lastnameIsValid,
        email: !emailIsValid,
        password: !passwordIsValid,
        confirmpassword: !passwordIsValid || !passwordsAreEqual,
        cnic: !cnicIsValid,
      });
      return;
    }
    onAuthenticate({ firstname, lastname, email, password, cnic });
  }

  function updateInputValueHandler(inputType, enteredValue) {
    switch (inputType) {
      case "firstname":
        setEnteredFirstname(enteredValue);
        break;
      case "lastname":
        setEnteredLastname(enteredValue);
        break;
      case "email":
        setEnteredEmail(enteredValue);
        break;
      case "password":
        setEnteredPassword(enteredValue);
        break;
      case "confirmpassword":
        setEnteredConfirmPassword(enteredValue);
        break;
      case "cnic":
        setEnteredCnic(enteredValue);
        break;
    }
  }
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
            <ScrollView
              alwaysBounceVertical={false}
              keyboardShouldPersistTaps={"never"}
              // contentContainerStyle={{
              //   paddingBottom: Platform.OS === "ios" ? "0%" : "25%",
              // }}
            >
              <Text style={styles.sub_heading}>REGISTER</Text>
              <View style={{ paddingTop: "3%" }} />
              <Input_paper
                label={"First Name"}
                icon_left={"account"}
                mode={"outlined"}
                onUpdateValue={updateInputValueHandler.bind(this, "firstname")}
                value={enteredFirstname}
                isInvalid={credentialsInvalid.firstname}
              />
              <View style={{ paddingTop: "3%" }} />
              <Input_paper
                label={"Last Name"}
                icon_left={"account"}
                mode={"outlined"}
                onUpdateValue={updateInputValueHandler.bind(this, "lastname")}
                value={enteredLastname}
                isInvalid={credentialsInvalid.lastname}
              />
              <View style={{ paddingTop: "3%" }} />
              <Input_paper
                label={"Email"}
                icon_left={"email"}
                mode={"outlined"}
                onUpdateValue={updateInputValueHandler.bind(this, "email")}
                value={enteredEmail}
                keyboard={"email-address"}
                isInvalid={credentialsInvalid.email}
              />
              <View style={{ paddingTop: "3%" }} />
              <Input_paper
                label={"Password"}
                icon_left={"lock"}
                mode={"outlined"}
                secure={true}
                onUpdateValue={updateInputValueHandler.bind(this, "password")}
                value={enteredPassword}
                isInvalid={credentialsInvalid.password}
              />
              <View style={{ paddingTop: "3%" }} />
              <Input_paper
                label={"Confirm Password"}
                icon_left={"lock"}
                mode={"outlined"}
                secure={true}
                onUpdateValue={updateInputValueHandler.bind(
                  this,
                  "confirmpassword"
                )}
                value={enteredConfirmPassword}
                isInvalid={credentialsInvalid.confirmpassword}
              />
              <View style={{ paddingTop: "3%" }} />
              <Input_paper
                label={"CNIC"}
                icon_left={"smart-card-outline"}
                mode={"outlined"}
                keyboard={"numeric"}
                onUpdateValue={updateInputValueHandler.bind(this, "cnic")}
                value={enteredCnic}
                isInvalid={credentialsInvalid.cnic}
              />
              <View
                style={{
                  //    padding: "5%",
                  //   marginTop: "6%",
                  paddingTop: "6%",
                }}
              >
                <Button
                  onPress={() =>
                    submitHandler({
                      firstname: enteredFirstname,
                      lastname: enteredLastname,
                      email: enteredEmail,
                      password: enteredPassword,
                      confirmpassword: enteredConfirmPassword,
                      cnic: enteredCnic,
                    })
                  }
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
                  // marginTop: "6%",
                  padding: "5%",
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
