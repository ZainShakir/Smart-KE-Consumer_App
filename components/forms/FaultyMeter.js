import {
  StyleSheet,
  Text,
  View,
  ImageBackground,
  Pressable,
  TextInput,
} from "react-native";
import React, { useState, useEffect, useContext } from "react";
import { Ionicons } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import Button from "../ui/Button";
import { AuthContext } from "../../store/auth-context";
import { create_complain } from "../../utils/auth";
const FaultyMeter = ({ navigation }) => {
  const authCtx = useContext(AuthContext);
  const token = authCtx.token;
  const account_no = authCtx.primary_account;
  const fixed = 100;
  const [selectedImage, setPickedImage] = useState("");
  const [comment, setComment] = useState("");
  const [imagename, setImagename] = useState(null);
  const [len, setlength] = useState(100);
  function updateInputValueHandler(inputType, enteredValue) {
    switch (inputType) {
      case "comment":
        setComment(enteredValue);
        setlength(fixed - enteredValue.length);
        break;
    }
  }
  const [errprompt, seterrprompt] = useState({});
  const [text, settext] = useState(true);
  const [credentialsInvalid, setCredentialsInvalid] = useState({
    commnot: false,
    imgnot: false,
  });

  const generate_complain = async () => {
    try {
      const response = await create_complain(
        token,
        account_no,
        "Faulty Meter",
        comment
      );
      if (response.status === 200) {
        alert("Complain Successfully Created");
      }
    } catch (error) {
      console.log(error);
    }
  };

  function checkcredentials(e1, e2) {
    var errors = {};
    const commnot = e1.length < 5;
    const imgnot = e2 === "";
    if (e1.length < 5) {
      errors.comment = "Comments Character Should be greater than 25";
      settext(true);
    }
    if (e2 === "") {
      errors.image = "Image Proof is required";
      settext(true);
    }
    setCredentialsInvalid({
      commnot: commnot,
      imgnot: imgnot,
    });
    return errors;
  }

  const submit = () => {
    settext(false);
    seterrprompt(checkcredentials(comment, selectedImage));

    // settext(true);
  };
  useEffect(() => {
    if (!text) {
      setCredentialsInvalid({
        commnot: false,
        imgnot: false,
      });
      seterrprompt({});
      generate_complain();
      setComment("");
      settext(true);
    }
  }, [text]);

  const showImagePicker = async () => {
    // Ask the user for the permission to access the media library
    const permissionResult =
      await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (permissionResult.granted === false) {
      alert("You've refused to allow this appp to access your photos!");
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({ base64: true });

    //  Explore the result
    console.log(result.fileName);

    if (!result.cancelled) {
      setPickedImage(result.base64);
      setImagename(result.fileName);
    }
  };
  return (
    <View style={styles.container}>
      <ImageBackground
        source={require("../../assets/images/5555.jpg")}
        resizeMode="cover"
        style={styles.image}
      >
        <Text
          style={{
            alignSelf: "center",
            marginTop: "8%",
            fontSize: 20,
            fontWeight: "bold",
          }}
        >
          LODGE COMPLAINT
        </Text>
        <Pressable
          style={{
            position: "absolute",
            marginTop: "8%",
            marginLeft: "3%",
          }}
          onPress={() => {
            navigation.goBack();
          }}
        >
          <Ionicons name="md-arrow-back" size={25} color="black" />
        </Pressable>
        <View style={styles.box}>
          <Text style={{ fontSize: 20, fontWeight: "500" }}>Faulty Meter</Text>
          <Text style={{ fontWeight: "200", marginTop: "5%" }}>
            Lodge meter fault complaint in case of meter related issues such as
            meter defective/damaged OR meter glass broken etc.You just need to
            elaborate meter problem in comments and attach image of meter.
          </Text>
          <View style={{ paddingVertical: "5%" }}>
            <Text>Meter Reading Snapshot</Text>
            <Pressable
              onPress={showImagePicker}
              style={{
                height: 30,
                width: "55%",
                justifyContent: "center",
                marginRight: 5,
                marginTop: "3%",
              }}
            >
              <Text
                style={{
                  fontWeight: "bold",
                  color: "#0097FF",
                }}
              >
                Select Image From Gallery
              </Text>
            </Pressable>
            {imagename ? (
              <Text style={{ marginTop: "3%" }}>File Name: {imagename}</Text>
            ) : null}
            {credentialsInvalid.imgnot ? (
              <View style={{ marginTop: "1%" }}>
                <Text
                  style={{ color: "red", fontSize: 14, fontWeight: "bold" }}
                >
                  {errprompt.image}
                </Text>
              </View>
            ) : null}
          </View>
          <View style={{ paddingVertical: "5%" }}>
            <Text>Comments</Text>
            <TextInput
              style={styles.input}
              onChangeText={updateInputValueHandler.bind(this, "comment")}
              value={comment}
              placeholder="Explanation of your Problem"
              maxLength={100}
            />
            <Text style={{ marginTop: "3%", fontWeight: "200", fontSize: 13 }}>
              Remainig Characters :{len}
            </Text>
            {credentialsInvalid.commnot ? (
              <View style={{ marginTop: "1%" }}>
                <Text
                  style={{ color: "red", fontSize: 14, fontWeight: "bold" }}
                >
                  {errprompt.comment}
                </Text>
              </View>
            ) : null}
          </View>
        </View>
        <View style={{ marginTop: "10%" }}>
          <Button
            onPress={() => submit()}
            backc={"#F0984A"}
            width={"60%"}
            font={"Outfit"}
            fsize={15}
            fcolor={"#FFFFFF"}
          >
            {"Submit"}
          </Button>
        </View>
      </ImageBackground>
    </View>
  );
};

export default FaultyMeter;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#66D6AE",
  },
  image: {
    flex: 1,
  },
  box: {
    marginTop: "10%",
    height: "55%",
    width: "90%",
    backgroundColor: "white",
    alignSelf: "center",
    borderRadius: Platform.OS === "ios" ? "10%" : 10,
    padding: "5%",
  },
  input: {
    height: 40,
    marginTop: 10,

    borderBottomWidth: 1,
    padding: 5,
  },
});
