import {
  StyleSheet,
  Text,
  View,
  Pressable,
  Alert,
  Modal,
  TextInput,
  ToastAndroid,
} from "react-native";
import React, { useState, useContext } from "react";
import { LinearGradient } from "expo-linear-gradient";
import { MaterialIcons } from "@expo/vector-icons";
import ProgressBar from "react-native-progress/Bar";

const Card = () => {
  const [progress, setProgress] = useState(1);
  return (
    <View style={styles.container}>
      <View style={progress === 1 ? styles.box : styles.box1}>
        <LinearGradient
          // Button Linear Gradient
          colors={
            progress === 1
              ? ["#F59B3D", "#E76549", "#DD3C52"]
              : ["white", "white", "white"]
          }
          style={{ flex: 1, borderRadius: Platform.OS === "ios" ? "8%" : 8 }}
        >
          <View style={{ flexDirection: "row" }}>
            <Text
              style={[
                styles.text,
                progress === 1 ? { color: "white" } : { color: "black" },
              ]}
            >
              Estimated Time:4 Hrs
            </Text>
          </View>
          <Text
            style={[
              { fontSize: 14, fontWeight: "bold", marginHorizontal: 5 },
              progress === 1 ? { color: "white" } : { color: "black" },
            ]}
          >
            Status:
          </Text>
          <Text
            style={[
              { fontSize: 12, marginHorizontal: 5 },
              progress === 1 ? { color: "white" } : { color: "black" },
            ]}
          >
            {progress === 1 ? "Completed" : "Active"}
          </Text>
          <View style={{ marginHorizontal: 5, marginTop: 5 }}>
            <ProgressBar
              progress={progress === 1 ? progress : progress + 0.02}
              width={80}
              color={progress === 1 ? "white" : "#E7614A"}
              borderWidth={0}
              height={3}
            />
          </View>
        </LinearGradient>
      </View>
      <View style={styles.half_body}>
        <Text style={{ fontSize: 16, fontWeight: "500" }}>
          Type:Voltage Complaint
        </Text>
        <Text style={{ marginTop: "4%" }}>
          Description:wirebreakasadasdadasd sadasd
        </Text>
      </View>
    </View>
  );
};

export default Card;

const styles = StyleSheet.create({
  container: {
    width: "90%",
    backgroundColor: "white",
    borderRadius: Platform.OS === "android" ? 10 : "10",
    height: 120,
    shadowOpacity: 0.2,
    shadowRadius: 5,
    shadowOffset: { width: 0, height: 0 },
    shadowColor: "black",
    elevation: 10,
    flexDirection: "row",

    //   marginBottom: "2%",
    //  backgroundColor: "red",
  },
  box: {
    width: 100,
    height: "90%",
    alignSelf: "center",
    marginLeft: "3%",
  },
  text: {
    fontSize: 14,
    marginTop: "25%",
    marginLeft: "5%",
  },
  box1: {
    width: 100,
    height: "90%",
    alignSelf: "center",
    marginLeft: "3%",
    shadowOpacity: 0.2,
    shadowRadius: 5,
    shadowOffset: { width: 0, height: 0 },
    shadowColor: "grey",
    elevation: 10,
    backgroundColor: "white",
    borderRadius: Platform.OS === "android" ? 10 : "10",
  },
  text_box: {
    marginLeft: "5%",
    width: 220,
    paddingTop: "8%",
  },
  half_body: { width: "65%", marginLeft: "3%", paddingTop: "5%" },
});
