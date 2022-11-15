import { StyleSheet, Text, View, Pressable, Alert } from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";

const Electricity_complain = () => {
  const navigation = useNavigation();
  return (
    <View style={styles.body}>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          marginHorizontal: "5%",
          marginVertical: "5%",
        }}
      >
        <Pressable
          style={styles.box}
          onPress={() => {
            navigation.navigate("Volatge");
          }}
        >
          <Text style={{ alignSelf: "center" }}>Voltage Complaint</Text>
        </Pressable>
        <Pressable
          style={styles.box}
          onPress={() => {
            navigation.navigate("Phase");
          }}
        >
          <Text style={{ alignSelf: "center" }}>Phase Complaint</Text>
        </Pressable>
      </View>

      <Pressable
        style={[styles.box, { marginVertical: "5%", marginHorizontal: "5%" }]}
        onPress={() => {
          navigation.navigate("Supply");
        }}
      >
        <Text style={{ alignSelf: "center" }}>Supply Off</Text>
      </Pressable>
    </View>
  );
};

export default Electricity_complain;

const styles = StyleSheet.create({
  body: {
    flex: 1,
    backgroundColor: "#F1F6F7",
  },
  box: {
    shadowOpacity: 0.2,
    shadowRadius: 5,
    shadowOffset: { width: 0, height: 0 },
    shadowColor: "black",
    backgroundColor: "white",
    height: 150,
    width: 150,
    justifyContent: "center",
  },
});
