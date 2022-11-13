import {
  StyleSheet,
  Text,
  View,
  ImageBackground,
  Pressable,
  TextInput,
} from "react-native";
import React, { useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import Button from "../ui/Button";

const Wrong_Bill = ({ navigation }) => {
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
          <Text style={{ fontSize: 20, fontWeight: "500" }}>
            Bill Related issue
          </Text>
          <Text style={{ fontWeight: "200", marginTop: "5%" }}>
            Lodge This Complaint if you have any issues related to your bill
            amount or bill payment ,Add a snapshot of your bill on which you
            have issue with and add comment elaborating your Problem.
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
              {imagename ? (
                <Text style={{ marginTop: "3%" }}>File Name: {imagename}</Text>
              ) : null}
            </Pressable>
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
          </View>
        </View>
        <View style={{ marginTop: "10%" }}>
          <Button
            onPress={() => alert("Hello")}
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

export default Wrong_Bill;

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
    height: "50%",
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
