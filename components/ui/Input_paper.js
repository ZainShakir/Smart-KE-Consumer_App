import { StyleSheet, Text, View, Pressable } from "react-native";
import { TextInput } from "react-native-paper";
import React, { useState } from "react";

const Input_paper = ({
  label,
  icon_left,
  mode,
  secure,
  onUpdateValue,
  value,
  keyboard,
  isInvalid,
}) => {
  const [sec, setsecure] = useState(true);
  return (
    <View>
      <TextInput
        style={styles.input}
        label={label}
        left={<TextInput.Icon name={icon_left} />}
        keyboardType={keyboard}
        right={
          secure ? (
            sec ? (
              <TextInput.Icon
                name="eye"
                onPress={() => {
                  setsecure(!sec);
                  return false;
                }}
              />
            ) : (
              <TextInput.Icon
                name="eye-off"
                onPress={() => {
                  setsecure(!sec);
                  return false;
                }}
              />
            )
          ) : null
        }
        mode={mode}
        secureTextEntry={secure ? sec : false}
        value={value}
        onChangeText={onUpdateValue}
        activeOutlineColor={"black"}
        error={isInvalid}
        autoCapitalize="none"
      />
    </View>
  );
};

export default Input_paper;

const styles = StyleSheet.create({
  input: {
    width: "90%",
    backgroundColor: "#F5F5F5",
    alignSelf: "center",
    // height: 50,
    // borderRadius: Platform.OS === "ios" ? "10%" : 10,
  },
});
