import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  TouchableWithoutFeedback,
  Pressable,
} from "react-native";
import React, { useState, useContext, useEffect } from "react";
import { useFonts } from "expo-font";
import { TextInput } from "react-native-paper";
import { Keyboard } from "react-native";
import { add_acc } from "../../utils/auth";
import { AuthContext } from "../../store/auth-context";
import {
  MaterialCommunityIcons,
  Entypo,
  MaterialIcons,
} from "@expo/vector-icons";

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

const Add_account = () => {
  const [loaded] = useFonts({
    Roboto: require("../../assets/fonts/RobotoSlab-Regular.ttf"),
    Roboto_m: require("../../assets/fonts/RobotoSlab-Medium.ttf"),
    Roboto_b: require("../../assets/fonts/RobotoSlab-Black.ttf"),
  });
  const [errprompt, seterrprompt] = useState({});
  const [text, settext] = useState(true);
  const [acc_no, setacc] = useState("");
  const [name, setname] = useState("");
  const [credentialsInvalid, setCredentialsInvalid] = useState({
    account: false,
    name: false,
  });
  const AuthCtx = useContext(AuthContext);
  useEffect(() => {
    if (!text) {
      setCredentialsInvalid({
        account: false,
        name: false,
      });
      seterrprompt({});
      add_account(acc_no, name);
      settext(true);
    }
  }, [text]);
  const add_account = async (accnum, name) => {
    const token = AuthCtx.token;

    try {
      const response = await add_acc(token, accnum, name, true);
      if (response.status === 201) {
        alert(response.data);
      } else {
        AuthCtx.setprimary(true);
        alert(response.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const submit = () => {
    settext(false);
    seterrprompt(checkcredentials(acc_no, name));

    // settext(true);
  };

  function checkcredentials(e1, e2) {
    var errors = {};
    const accnot = e1 === "" || e1.length < 5 || e1.length > 10;
    const namenot = e2 === "" || e2.length < 5 || e2.length > 15;

    if (e1 === "") {
      errors.account = "Account Number is required";
      settext(true);
    } else if (e1.length < 5 || e1.length > 10) {
      errors.account = "Account number should be between 5 to 10 digits";
      settext(true);
    }
    if (e2 === "") {
      errors.name = "Name Field is required";
      settext(true);
    } else if (e2.length < 5 || e2.length > 15) {
      errors.name = "Name Should be between 5 to 15 characters";
      settext(true);
    }
    setCredentialsInvalid({
      account: accnot,
      name: namenot,
    });
    return errors;
  }

  if (!loaded) {
    return null;
  }

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <View style={styles.container}>
        <View style={styles.body}>
          <View
            style={{ flexDirection: "row", justifyContent: "space-between" }}
          >
            <Text
              style={{
                fontFamily: "Roboto",
                fontSize: 30,
              }}
            >
              ADD ACCOUNT:
            </Text>
            <Pressable
              onPress={() => AuthCtx.logout()}
              style={{ alignSelf: "center" }}
            >
              <MaterialCommunityIcons name="logout" size={26} color="black" />
            </Pressable>
          </View>
          <Text style={{ fontSize: 15, marginTop: windowHeight * 0.01 }}>
            Note: From Your Electricity Bill Enter the Account Number and a Name
            you would to assign to that account in order to identify that
            account throught out the app.
          </Text>
          <View style={{ marginTop: windowHeight * 0.02 }}>
            <Text
              style={{
                fontFamily: "Roboto_m",
                fontSize: 17,
                marginBottom: windowHeight * 0.01,
              }}
            >
              Account No :
            </Text>

            <TextInput
              style={styles.input}
              label="Account Number"
              left={<TextInput.Icon name={"account"} color="#2DC2AB" />}
              keyboardType="numeric"
              mode="outlined"
              activeOutlineColor={"#2DC2AB"}
              value={acc_no}
              onChangeText={(x) => {
                setacc(x);
              }}
              error={credentialsInvalid.account}
            />
            {credentialsInvalid.account ? (
              <View style={{ marginTop: "1%" }}>
                <Text
                  style={{ color: "red", fontSize: 14, fontWeight: "bold" }}
                >
                  {errprompt.account}
                </Text>
              </View>
            ) : null}
          </View>
          <View style={{ marginTop: windowHeight * 0.02 }}>
            <Text
              style={{
                fontFamily: "Roboto_m",
                fontSize: 17,
                marginBottom: windowHeight * 0.01,
              }}
            >
              Account Name :
            </Text>

            <TextInput
              style={styles.input}
              label="Account Name"
              value={name}
              onChangeText={(x) => {
                setname(x);
              }}
              left={<TextInput.Icon name={"alpha-a-box"} color="#2DC2AB" />}
              mode="outlined"
              activeOutlineColor={"#2DC2AB"}
              error={credentialsInvalid.name}
            />
            {credentialsInvalid.name ? (
              <View style={{ marginTop: "1%" }}>
                <Text
                  style={{ color: "red", fontSize: 14, fontWeight: "bold" }}
                >
                  {errprompt.name}
                </Text>
              </View>
            ) : null}
          </View>
          <Pressable
            onPress={() => {
              submit();
            }}
          >
            <View
              style={{
                backgroundColor: "#2DC2AB",
                padding: windowHeight * 0.03,
                marginTop: windowHeight * 0.05,
              }}
            >
              <Text
                style={{
                  alignSelf: "center",
                  fontFamily: "Roboto_b",
                  fontSize: 18,
                }}
              >
                ADD ACCOUNT
              </Text>
            </View>
          </Pressable>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};

export default Add_account;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  body: {
    marginTop: windowHeight * 0.05,
    paddingHorizontal: windowWidth * 0.05,
  },
  input: {
    width: windowWidth * 0.9,
    backgroundColor: "#F5F5F5",
    alignSelf: "center",
    // height: 50,
    // borderRadius: Platform.OS === "ios" ? "10%" : 10,
  },
});
