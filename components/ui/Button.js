import { StyleSheet, Text, View, Pressable } from "react-native";
import React from "react";
import { useFonts } from "expo-font";

const Button = ({ onPress, children, backc, width, font, fsize, fcolor }) => {
  const [loaded] = useFonts({
    RussoOne: require("../../assets/fonts/RussoOne-Regular.ttf"),
    Outfit: require("../../assets/fonts/Outfit-SemiBold.ttf"),
    Outfit_reg: require("../../assets/fonts/Outfit-Regular.ttf"),
  });

  if (!loaded) {
    return null;
  }
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [
        pressed && styles.pressed,
        { width: width, alignSelf: "center" },
      ]}
    >
      <View style={[styles.button, { backgroundColor: backc }]}>
        <Text
          style={{
            color: fcolor,
            alignSelf: "center",
            fontFamily: font,
            fontSize: fsize,
          }}
        >
          {children}
        </Text>
      </View>
    </Pressable>
  );
};

export default Button;

const styles = StyleSheet.create({
  button: {
    padding: "5%",
    borderRadius: Platform.OS === "ios" ? "10%" : 10,
    shadowOpacity: 0.4,
    shadowRadius: 5,
    shadowOffset: { width: 0, height: 0 },
    shadowColor: "black",
    elevation: 5,
  },
  pressed: {
    opacity: 0.5,
  },
});
