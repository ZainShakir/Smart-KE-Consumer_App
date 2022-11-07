import {
  StyleSheet,
  Text,
  View,
  ImageBackground,
  Pressable,
  Modal,
} from "react-native";
import React, { useContext, useState } from "react";
import { AuthContext } from "../store/auth-context";
import {
  MaterialCommunityIcons,
  Entypo,
  MaterialIcons,
} from "@expo/vector-icons";
import Input_paper from "../components/ui/Input_paper";
import Button from "../components/ui/Button";

const Home = ({ navigation }) => {
  const [modalIsVisible, SetModal] = useState(false);
  const authCtx = useContext(AuthContext);
  return (
    <View style={styles.container}>
      <ImageBackground
        source={require("../assets/images/5555.jpg")}
        resizeMode="cover"
        style={styles.image}
      >
        <View style={{ flex: 1, paddingTop: "5%" }}>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              paddingHorizontal: "4%",
            }}
          >
            <Pressable onPress={() => navigation.toggleDrawer()}>
              <Entypo name="menu" size={26} color="black" />
            </Pressable>
            <Pressable onPress={() => authCtx.logout()}>
              <MaterialCommunityIcons name="logout" size={26} color="black" />
            </Pressable>
          </View>
          <View style={{ paddingHorizontal: "5%", paddingTop: "5%" }}>
            <Text style={{ fontSize: 24 }}>Hello Zain Shakir</Text>
            <View style={{ height: "10%" }} />
            <Text style={{ fontSize: 20 }}>
              Address: R-264 Block 17 Fb-Area
            </Text>
            <View style={{ height: "10%" }} />
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
              }}
            >
              <Text style={{ fontSize: 20 }}>Account No:</Text>
              <Pressable onPress={() => SetModal(true)}>
                <MaterialIcons name="add" size={26} color="black" />
              </Pressable>
            </View>
            <Modal
              visible={modalIsVisible}
              animationType="fade"
              transparent={true}
            >
              <View style={styles.Modal}>
                <View style={styles.modal_body}>
                  <View
                    style={{
                      paddingVertical: "10%",
                      paddingLeft: "5%",
                    }}
                  >
                    <Text style={{ fontSize: 23 }}>Add Account</Text>
                    <Pressable
                      style={{
                        position: "absolute",
                        paddingLeft: "92%",
                        paddingTop: "10%",
                      }}
                      onPress={() => {
                        SetModal(false);
                      }}
                    >
                      <MaterialIcons name="cancel" size={24} color="black" />
                    </Pressable>
                    <View style={{ height: "10%" }} />
                    <Input_paper
                      label={"Account Number"}
                      icon_left={"account-circle"}
                      mode={"outlined"}
                      //   value={enteredEmail}
                      //onUpdateValue={updateInputValueHandler.bind(this, "email")}
                      keyboard={"numeric"}
                      // isInvalid={credentialsInvalid.email}
                    />
                    <View style={{ height: "15%" }} />
                    <Button
                      onPress={() => alert("Button Pressed")}
                      backc={"#F0984A"}
                      width={"50%"}
                      font={"Outfit"}
                      fsize={15}
                      fcolor={"#FFFFFF"}
                    >
                      {"ADD"}
                    </Button>
                  </View>
                </View>
              </View>
            </Modal>
          </View>
        </View>
        <View style={styles.halfbody}></View>
      </ImageBackground>
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#66D6AE",
  },
  image: {
    flex: 1,
  },
  halfbody: {
    flex: 2,
    backgroundColor: "white",
    borderTopRightRadius: Platform.OS === "ios" ? "20%" : 20,
    borderTopLeftRadius: Platform.OS === "ios" ? "20%" : 20,
  },
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
    height: "35%",
    width: "90%",
    borderRadius: Platform.OS === "ios" ? "20%" : 20,
  },
});
