import {
  StyleSheet,
  Text,
  View,
  ActivityIndicator,
  ImageBackground,
} from "react-native";
import React from "react";

const LoadingOverlay = ({ message }) => {
  return (
    <View style={styles.container}>
      <ImageBackground
        source={require("../../assets/images/background.jpg")}
        resizeMode="cover"
        style={styles.image}
      >
        <Image
          style={styles.Logo}
          source={require("../../assets/images/KE_LOGO.png")}
        />
        <Text style={styles.message}>{message}</Text>
        <ActivityIndicator size="large" />
      </ImageBackground>
    </View>
  );
};

export default LoadingOverlay;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  image: {
    flex: 1,
  },
  Logo: {
    height: "30%",
    width: "44%",
    alignSelf: "center",
  },
  message: {
    fontSize: 16,
    marginBottom: 12,
    alignSelf: "center",
  },
});
