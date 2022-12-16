import {
  StyleSheet,
  Text,
  View,
  Pressable,
  Alert,
  Modal,
  TextInput,
  ToastAndroid,
  Dimensions,
  ScrollView,
} from "react-native";
import React, { useState, useContext } from "react";
import { LinearGradient } from "expo-linear-gradient";
import { MaterialIcons } from "@expo/vector-icons";
import ProgressBar from "react-native-progress/Bar";

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

const Card = (props) => {
  const [progress, setProgress] = useState(0);
  const date = new Date(props.complain_date);
  const [modalIsVisible, SetModal] = useState(false);
  return (
    <Pressable style={styles.container} onPress={() => SetModal(true)}>
      <Text style={{ fontSize: 16, fontWeight: "500" }}>
        Complaint Type: {props.complain_type}
      </Text>
      <View style={{ flexDirection: "row", alignItems: "center" }}>
        <Text style={{ fontSize: 16, fontWeight: "500", paddingVertical: 3 }}>
          Complain Status:
        </Text>
        <Text style={{ fontSize: 15 }}>{props.complain_status}</Text>
      </View>
      <View style={{ flexDirection: "row", alignItems: "center" }}>
        <Text style={{ fontSize: 16, fontWeight: "500" }}>Description: </Text>
        <Text numberOfLines={2} style={{ fontSize: 15 }}>
          {props.details}
        </Text>
      </View>
      <View style={{ flexDirection: "row", alignItems: "center" }}>
        <Text style={{ fontSize: 16, fontWeight: "500" }}>Date: </Text>
        <Text style={{ fontSize: 15 }}>{date.toDateString()}</Text>
      </View>
      <View style={{ flexDirection: "row", alignItems: "center" }}>
        <Text style={{ fontSize: 16, fontWeight: "500" }}>
          Estimated Time :{" "}
        </Text>
        <Text style={{ fontSize: 15 }}>--</Text>
      </View>
      <Modal
        visible={modalIsVisible}
        animationType="fade"
        transparent={true}
        alwaysBounceVertical={false}
      >
        <View style={styles.Modal}>
          <ScrollView style={styles.modal_body}>
            <Pressable
              style={{
                position: "absolute",
                paddingLeft: "93%",
                paddingTop: "1%",
              }}
              onPress={() => {
                SetModal(false);
              }}
            >
              <MaterialIcons name="cancel" size={24} color="black" />
            </Pressable>
            <Text
              style={{ alignSelf: "center", fontSize: 20, fontWeight: "bold" }}
            >
              Complaint Details
            </Text>
            <View
              style={{
                flexDirection: "row",
                paddingTop: 18,
                paddingBottom: windowHeight * 0.012,
              }}
            >
              <Text style={{ fontSize: 18, fontWeight: "bold" }}>
                Complaint Type:
              </Text>
              <Text style={{ fontSize: 17 }}> {props.complain_type}</Text>
            </View>
            <View
              style={{
                flexDirection: "row",
                paddingBottom: windowHeight * 0.012,
              }}
            >
              <Text style={{ fontSize: 18, fontWeight: "bold" }}>
                Estimated Time:
              </Text>
              <Text style={{ fontSize: 18 }}> --</Text>
            </View>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                paddingBottom: 10,
              }}
            >
              <Text
                style={{ fontSize: 18, fontWeight: "bold", paddingRight: 10 }}
              >
                Progress:
              </Text>
              <Text>{progress * 100} %</Text>
              <View style={{ width: 10 }} />
              <ProgressBar
                progress={progress === 1 ? progress : progress + 0.02}
                width={windowWidth * 0.5}
                color={progress === 1 ? "green" : "#E7614A"}
                borderWidth={0}
                height={3}
              />
            </View>
            <View
              style={{
                flexDirection: "row",
                paddingBottom: windowHeight * 0.012,
              }}
            >
              <Text style={{ fontSize: 18, fontWeight: "bold" }}>
                Description:
              </Text>
              <Text style={{ fontSize: 18 }}> {props.details}</Text>
            </View>
            <View
              style={{
                flexDirection: "row",
                paddingBottom: windowHeight * 0.012,
              }}
            >
              <Text style={{ fontSize: 18, fontWeight: "bold" }}>
                Supervisor Name:
              </Text>
              <Text style={{ fontSize: 18 }}> --</Text>
            </View>
            <Pressable
              style={{
                alignSelf: "center",
                marginTop: windowHeight * 0.02,
                borderWidth: 1,
                borderRadius: Platform.OS === "android" ? 20 : "20",
                borderColor: "orange",
                padding: 8,
              }}
            >
              <Text style={{ fontSize: 17, color: "orange" }}>
                Track this Complain
              </Text>
            </Pressable>
            <Text
              style={{
                alignSelf: "center",
                fontSize: 20,
                fontWeight: "bold",
                marginTop: windowHeight * 0.03,
                marginBottom: windowHeight * 0.02,
              }}
            >
              Progress Alerts
            </Text>
            <View style={{ borderTopWidth: 1, borderColor: "#dcdcdc" }} />
          </ScrollView>
        </View>
      </Modal>
    </Pressable>
  );
};

export default Card;

const styles = StyleSheet.create({
  container: {
    //  width: "90%",
    backgroundColor: "white",
    borderRadius: Platform.OS === "android" ? 10 : "10",
    height: 130,
    shadowOpacity: 0.2,
    shadowRadius: 5,
    shadowOffset: { width: 0, height: 0 },
    shadowColor: "black",
    elevation: 10,
    marginHorizontal: "2%",
    marginVertical: "1%",
    width: windowWidth * 0.9,
    padding: 10,

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
  Modal: {
    justifyContent: "center",
    padding: "5%",
    alignItems: "center",
    backgroundColor: "#000000aa",
    flex: 1,
    flexDirection: "column",
  },
  modal_body: {
    backgroundColor: "white",
    width: windowWidth * 0.9,
    borderRadius: Platform.OS === "ios" ? "20%" : 20,
    paddingHorizontal: 10,
    paddingVertical: 20,
  },
});
