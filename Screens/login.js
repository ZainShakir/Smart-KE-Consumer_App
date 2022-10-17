import { StatusBar } from "expo-status-bar";
import { ImageBackground, StyleSheet, Text, View, Image } from "react-native";
import React from "react";
import { useFonts } from "expo-font";
const login = () => {
  const [loaded] = useFonts({
    RussoOne: require("../assets/fonts/RussoOne-Regular.ttf"),
    Outfit: require("../assets/fonts/Outfit-SemiBold.ttf"),
    Outfit_reg: require("../assets/fonts/Outfit-Regular.ttf"),
  });

  if (!loaded) {
    return null;
  }
  return (
    <View style={styles.container}>
      <ImageBackground
        source={require("../assets/images/background.jpg")}
        resizeMode="cover"
        style={styles.image}
      >
        <Image
          style={styles.Logo}
          source={require("../assets/images/KE_LOGO.png")}
        />
        <Text
          style={{ fontFamily: "RussoOne", fontSize: 27, alignSelf: "center" }}
        >
          K-ElECTRIC
        </Text>
        <View style={styles.box}>
          <Text
            style={{
              fontFamily: "Outfit",
              fontSize: 18,
              alignSelf: "center",
              marginTop: "5%",
            }}
          >
            LOGIN
          </Text>
        </View>
        <Text
          style={{
            fontFamily: "Outfit_reg",
            fontSize: 15,
            alignSelf: "center",
            marginTop: "5%",
          }}
        >
          Powered By FAST FYP
        </Text>
      </ImageBackground>
      <StatusBar style="auto" />
    </View>
  );
};

export default login;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  image: {
    flex: 1,
  },
  Logo: {
    height: "30%",
    width: "40%",
    alignSelf: "center",
  },
  box: {
    marginTop: "5%",
    height: "55%",
    marginHorizontal: "5%",
    borderRadius: Platform.OS === "ios" ? "10%" : 10,
    backgroundColor: "white",
  },
});
