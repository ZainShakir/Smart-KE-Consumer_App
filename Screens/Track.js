import { StyleSheet, Text, View, Dimensions } from "react-native";
import React, { useEffect } from "react";
import MapView from "react-native-maps";

const Track = () => {
  return (
    <View style={styles.container}>
      <View
        style={{
          flex: 0.7,
          backgroundColor: "#66D6AE",
        }}
      >
        <View style={{ marginTop: "5%", alignSelf: "center" }}>
          <Text>Track Driver</Text>
        </View>
        <View
          style={{
            flexDirection: "row",
            marginTop: "5%",
            marginLeft: "5%",
          }}
        >
          <Text style={{ fontSize: 20 }}>Complain No: </Text>
          <Text style={{ fontSize: 20, marginLeft: "5%" }}> 123456</Text>
        </View>
        <View
          style={{
            borderTopWidth: 1,
            borderColor: "white",
            marginLeft: "34%",
            marginRight: "10%",
          }}
        />
        <View
          style={{
            flexDirection: "row",
            marginTop: "5%",
            marginLeft: "5%",
          }}
        >
          <Text style={{ fontSize: 20 }}>Driver Name: </Text>
          <Text style={{ fontSize: 20, marginLeft: "5%" }}> Ahmed Ayan</Text>
        </View>
        <View
          style={{
            borderTopWidth: 1,
            borderColor: "white",
            marginLeft: "34%",
            marginRight: "10%",
          }}
        />
      </View>
      <View style={{ flex: 3 }}>
        <MapView
          style={styles.map}
          initialRegion={{
            latitude: 24.943476,
            longitude: 67.074632,
            latitudeDelta: 0.0222,
            longitudeDelta: 0.0221,
          }}
          showsUserLocation={true}
          provider="google"
        />
      </View>
    </View>
  );
};

export default Track;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height,
  },
});
