import { StyleSheet, Text, View, Dimensions, Pressable } from "react-native";
import { useFonts } from "expo-font";
import {
  MaterialCommunityIcons,
  Entypo,
  MaterialIcons,
  AntDesign,
} from "@expo/vector-icons";
import React from "react";
import { useNavigation } from "@react-navigation/native";
const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

const ChatHome = () => {
  const navigation = useNavigation();
  const [loaded] = useFonts({
    Montserrat_m: require("../assets/fonts/Montserrat/static/Montserrat-Bold.ttf"),
    Montserrat_r: require("../assets/fonts/Montserrat/static/Montserrat-Regular.ttf"),
  });

  if (!loaded) {
    return null;
  }
  return (
    <View style={styles.container}>
      <View style={styles.body}>
        <View>
          <Text
            style={{
              fontFamily: "Montserrat_m",
              fontSize: 20,
              paddingHorizontal: windowWidth * 0.05,
              alignSelf: "center",
            }}
          >
            I'm having trouble
          </Text>
          <View
            style={{
              borderBottomWidth: 1,
              borderColor: "#dcdcdc",
              marginTop: windowHeight * 0.01,
            }}
          />
        </View>
        <Pressable
          style={styles.row}
          onPress={() => navigation.navigate("ChatIssues")}
        >
          <Text style={styles.font}>Account Issues</Text>

          <AntDesign name="right" size={24} color="#66D6AE" />
        </Pressable>

        <Pressable
          style={styles.row}
          onPress={() => navigation.navigate("ChatIssues")}
        >
          <Text style={styles.font}>Payment Issues</Text>

          <AntDesign name="right" size={24} color="#66D6AE" />
        </Pressable>

        <Pressable
          style={styles.row}
          onPress={() => navigation.navigate("ChatIssues")}
        >
          <Text style={styles.font}>App Issues</Text>

          <AntDesign name="right" size={24} color="#66D6AE" />
        </Pressable>

        <Pressable
          style={styles.row}
          onPress={() => navigation.navigate("ChatIssues")}
        >
          <Text style={styles.font}>Bill Issues</Text>

          <AntDesign name="right" size={24} color="#66D6AE" />
        </Pressable>
      </View>
    </View>
  );
};

export default ChatHome;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  body: {
    paddingTop: windowHeight * 0.05,
    paddingHorizontal: windowWidth * 0.02,
  },
  row: {
    flexDirection: "row",
    height: windowHeight * 0.1,
    paddingHorizontal: windowWidth * 0.04,
    alignItems: "center",
    justifyContent: "space-between",
    borderBottomWidth: 1,
    borderColor: "#dcdcdc",
  },
  font: {
    fontSize: 18,
    fontFamily: "Montserrat_r",
  },
});
