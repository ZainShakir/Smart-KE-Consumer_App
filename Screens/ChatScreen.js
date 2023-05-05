import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  TextInput,
  ScrollView,
  Pressable,
} from "react-native";
import { Avatar, Appbar } from "react-native-paper";
import { Ionicons } from "@expo/vector-icons";
import react, { useState } from "react";
const ChatScreen = ({ route, navigation }) => {
  const { socket, sname, vendor_email, email } = route.params;
  const [currentMessage, setCurrentMessage] = useState("");
  const [messageList, setMessageList] = useState([]);
  const sendMessage = () => {
    if (currentMessage !== "") {
      const messageData = {
        room: "123",
        author: "Zahab",
        message: currentMessage,
        time:
          new Date(Date.now()).getHours() +
          ":" +
          new Date(Date.now()).getMinutes(),
      };
      // await socket.emit("send_message",messageData);
      setMessageList((List) => [...List, messageData]);
      setCurrentMessage("");
    }
  };
  const exitchat = async () => {
    const test = {
      room: sname,
      email: email,
    };
    await socket.emit("leave_room", test);
    Alert.alert("Leaving Chat in 6 Seconds...");
    // end_message();
    setTimeout(() => {
      navigation.navigate("FeedbackScreen", {
        sname: sname,
        vendor_email: vendor_email,
        email: email,
      });
    }, 6000);
  };
  useEffect(() => {
    socket.on("receive_message", (data) => {
      setMessageList((List) => [...List, data]);
    });
  }, [socket]);
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.body}>
        <ScrollView
          alwaysBounceHorizontal={false}
          keyboardDismissMode={"on-drag"}
          ref={(ref) => {
            this.scrollView = ref;
          }}
          onContentSizeChange={() =>
            this.scrollView.scrollToEnd({ animated: true })
          }
        >
          {messageList.map((messageContent, i) => {
            return (
              <View key={i}>
                <View>
                  {messageContent.author === email ? (
                    <View style={styles.msgbody1}>
                      <Text style={{ color: "white" }}>You</Text>
                      <Text
                        style={{
                          fontSize: 20,
                          marginHorizontal: "1%",
                          color: "white",
                        }}
                      >
                        {messageContent.message}
                      </Text>
                      <Text
                        style={{
                          alignSelf: "flex-end",
                          marginLeft: "12%",
                          color: "white",
                        }}
                      >
                        {messageContent.time}
                      </Text>
                    </View>
                  ) : (
                    <View style={styles.msgbody}>
                      <Text style={{ color: "green" }}>
                        {messageContent.author}
                      </Text>
                      <Text
                        style={{
                          fontSize: 20,
                          marginHorizontal: "1%",
                        }}
                      >
                        {messageContent.message}
                      </Text>
                      <Text
                        style={{ alignSelf: "flex-end", marginLeft: "12%" }}
                      >
                        {messageContent.time}
                      </Text>
                    </View>
                  )}
                </View>
              </View>
            );
          })}
        </ScrollView>
      </View>
      <View style={styles.inputbody}>
        <View style={{ flexDirection: "row" }}>
          <TextInput
            placeholder="Enter Message..."
            value={currentMessage}
            style={styles.input}
            onChangeText={(text) => setCurrentMessage(text)}
          />
          <Pressable
            style={{ margin: 12, justifyContent: "center" }}
            onPress={() => sendMessage()}
          >
            <Ionicons name="send" size={30} color="black" />
          </Pressable>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default ChatScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F1EFF1",
    overflow: "hidden",
  },
  header: {
    backgroundColor: "#fff",
    height: 47,
  },
  body: {
    flex: 1,
  },
  inputbody: {
    flex: 0.13,
  },
  msgbody: {
    margin: "2%",
    borderRadius: Platform.OS === "ios" ? "10%" : 10,
    backgroundColor: "white",
    paddingHorizontal: "3%",
    paddingVertical: "1%",
    alignSelf: "flex-start",
  },
  input: {
    height: 40,
    padding: 10,
    margin: 12,
    backgroundColor: "white",
    width: "80%",
    borderRadius: Platform.OS === "ios" ? "10%" : 10,
  },
  msgbody1: {
    margin: "2%",
    borderRadius: Platform.OS === "ios" ? "10%" : 10,
    backgroundColor: "#139EF8",
    paddingHorizontal: "3%",
    paddingVertical: "1%",
    alignSelf: "flex-end",
  },
});
