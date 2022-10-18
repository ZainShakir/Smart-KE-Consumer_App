import { StyleSheet, Text, View, Pressable } from "react-native";
import React from "react";
import { useFonts } from "expo-font";

const Flat_button = ({ children, onPress, wid, color, font }) => {
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
      style={({ pressed }) => [pressed && styles.pressed, {}]}
    >
      <View>
        <Text style={{ fontFamily: font, color: color, fontSize: wid }}>
          {children}
        </Text>
      </View>
    </Pressable>
  );
};

export default Flat_button;

const styles = StyleSheet.create({});
