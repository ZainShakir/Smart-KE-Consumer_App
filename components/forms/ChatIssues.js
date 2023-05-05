import { StyleSheet, Text, View, Dimensions, Pressable } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import React from "react";
const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;
import { useNavigation } from "@react-navigation/native";
import Accordin from "../ui/Accordian";
import { AuthContext } from "../../store/auth-context";
import io from "socket.io-client";
import { ENV_IP } from "@env";
const socket = io.connect(`http://${ENV_IP}:3001`);

const ChatIssues = () => {
  const navigation = useNavigation();
  const authCtx = useContext(AuthContext);
  const token = authCtx.token;

  //const [email, setEmail] = useState("");
  const [perror, setError] = useState("");

  const joinRoom = () => {
    if (email !== "") {
      socket.emit("join_room", token);
    }
  };

  const create_Session = async () => {
    await axios
      .post(`http://${ENV_IP}:3300/create_session`, {
        email: email,
      })
      .then(function (response) {
        if (response.status === 200) {
          navigation.navigate("ChatWait", {
            socket: socket,
            token: token,
          });
          // navigation.navigate("ClientWaiting", {
          // socket: socket,
          // token: token,
          // });
        } else {
          Alert.alert(response.data);
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const validate = () => {
    joinRoom();
    create_Session();
  };

  return (
    <View style={styles.container}>
      <View style={styles.body}>
        <View style={{}}>
          <Pressable
            style={{
              position: "absolute",

              width: windowWidth * 0.1,
              height: windowHeight * 0.04,
            }}
            onPress={() => {
              navigation.goBack();
            }}
          >
            <AntDesign
              name="left"
              size={24}
              color="#66D6AE"
              style={{ alignSelf: "center" }}
            />
          </Pressable>
          <Text
            style={{
              fontFamily: "Montserrat_m",
              fontSize: 20,
              paddingHorizontal: windowWidth * 0.05,
              alignSelf: "center",
            }}
          >
            APP ISSUES
          </Text>
        </View>
        <View
          style={{
            borderBottomWidth: 1,
            borderColor: "#dcdcdc",
            marginTop: windowHeight * 0.01,
          }}
        />
        <View
          style={{
            paddingVertical: windowHeight * 0.05,
            paddingHorizontal: windowWidth * 0.02,
          }}
        >
          <Text style={{ fontSize: 18 }}>
            If your app isn't working as expected, try the follwong
            troubleshooting steps:
          </Text>
          <Text
            style={{
              paddingVertical: windowHeight * 0.0001,
              fontWeight: "bold",
              fontSize: 17,
            }}
          >
            {`\n` + `\u2022`} Close all apps on your phone, then reopen your KE
            app.
          </Text>
          <Text
            style={{
              paddingVertical: windowHeight * 0.0001,
              fontWeight: "bold",
              fontSize: 17,
            }}
          >
            {`\n` + `\u2022`} Sign out of your account, then log back in.
          </Text>
          <Text
            style={{
              paddingVertical: windowHeight * 0.0001,
              fontWeight: "bold",
              fontSize: 17,
            }}
          >
            {`\n` + `\u2022`} Restart your device.
          </Text>
          <Text
            style={{
              paddingVertical: windowHeight * 0.0001,
              fontWeight: "bold",
              fontSize: 17,
            }}
          >
            {`\n` + `\u2022`} Check for app updates and install the latest
            version. If none is available, check and update your phone's
            operating system.
          </Text>
          <Text
            style={{
              paddingVertical: windowHeight * 0.0001,
              fontWeight: "bold",
              fontSize: 17,
            }}
          >
            {`\n` + `\u2022`} Delete the app, then download it again.
          </Text>
        </View>
        <Pressable
          style={{
            backgroundColor: "#66D6AE",
            width: windowWidth * 0.9,
            alignSelf: "center",
            borderRadius: Platform.OS === "ios" ? "10%" : 10,
            marginTop: windowHeight * 0.05,
          }}
          onPress={() => validate()}
        >
          <Text style={{ padding: windowWidth * 0.05, alignSelf: "center" }}>
            Start Chat With Support Team
          </Text>
        </Pressable>
      </View>
    </View>
  );
};

export default ChatIssues;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  body: {
    paddingTop: windowHeight * 0.05,
    paddingHorizontal: windowWidth * 0.02,
  },
});
