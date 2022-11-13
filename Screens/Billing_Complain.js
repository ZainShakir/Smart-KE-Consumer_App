import { StyleSheet, Text, View, Pressable, Alert } from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";

const Billing_Complain = () => {
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
            navigation.navigate("WrongReading");
          }}
        >
          <Text style={{ alignSelf: "center" }}>Wrong Reading</Text>
        </Pressable>
        <Pressable
          style={styles.box}
          onPress={() => {
            navigation.navigate("FaultyMeter");
          }}
        >
          <Text style={{ alignSelf: "center" }}>Faulty Meter</Text>
        </Pressable>
      </View>

      <Pressable
        style={[styles.box, { marginVertical: "5%", marginHorizontal: "5%" }]}
        onPress={() => {
          navigation.navigate("Wrong_Bill");
        }}
      >
        <Text style={{ alignSelf: "center" }}>Wrong Bill Amount</Text>
      </Pressable>
    </View>
  );
};

export default Billing_Complain;

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
