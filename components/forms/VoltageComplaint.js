import {
  StyleSheet,
  Text,
  View,
  ImageBackground,
  Pressable,
  TextInput,
} from "react-native";
import React, { useState } from "react";
import { Picker } from "@react-native-picker/picker";
import { Ionicons } from "@expo/vector-icons";
import Button from "../ui/Button";

const VoltageComplaint = ({ navigation }) => {
  const fixed = 100;
  const [problem, setProblem] = useState();
  const [comment, setComment] = useState("");
  const [len, setlength] = useState(100);
  function updateInputValueHandler(inputType, enteredValue) {
    switch (inputType) {
      case "comment":
        setComment(enteredValue);
        setlength(fixed - enteredValue.length);
        break;
    }
  }

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
            Voltage Complaint
          </Text>
          <Text style={{ fontWeight: "200", marginTop: "5%" }}>
            Register this complaint if you are experiencing voltage issue
            (low,high,fluctuation or neutral missing).
          </Text>
          <Text>Affected Area:</Text>
          <Picker
            selectedValue={problem}
            onValueChange={(itemValue, itemIndex) => setProblem(itemValue)}
          >
            <Picker.Item label="Your house" value="house" />
            <Picker.Item label="Complete Block" value="Area" />
          </Picker>

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

export default VoltageComplaint;

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
    height: "70%",
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
