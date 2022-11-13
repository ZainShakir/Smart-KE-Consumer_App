import React, { useRef, useEffect, useState } from "react";
import {
  Alert,
  Animated,
  StyleSheet,
  TouchableOpacity,
  View,
  Text,
  Modal,
  Pressable,
} from "react-native";
import { CurvedBottomBar } from "react-native-curved-bottom-bar";
import Ionicons from "react-native-vector-icons/Ionicons";
import { NavigationContainer } from "@react-navigation/native";
import LottieView from "lottie-react-native";
import { MaterialIcons } from "@expo/vector-icons";
import Home from "../../Screens/Home";
import Track from "../../Screens/Track";
import Complain from "../../Screens/Complain";
import { useNavigation } from "@react-navigation/native";
const Test1 = () => {
  return (
    <View style={{ flex: 1, backgroundColor: "#BFEFFF" }}>
      <Text>Hello</Text>
    </View>
  );
};
const Test2 = () => {
  return (
    <View style={{ flex: 1, backgroundColor: "#FFEBCD" }}>
      <Text>Hello</Text>
    </View>
  );
};

const Bottom_nav = () => {
  const animationRef = useRef(null);
  const navigation = useNavigation();

  useEffect(() => {
    animationRef.current?.play();
  }, []);

  const _renderIcon = (routeName: string, selectedTab: string) => {
    let icon = "";

    switch (routeName) {
      case "Hom":
        icon = "ios-home-outline";
        break;
      case "title2":
        icon = "ios-chatbox-ellipses-outline";
        break;
      case "Track":
        icon = "ios-map-outline";
        break;
      case "title4":
        icon = "ios-newspaper-outline";
        break;
    }

    return (
      <Ionicons
        name={icon}
        size={25}
        color={routeName === selectedTab ? "black" : "gray"}
      />
    );
  };
  const renderTabBar = ({ routeName, selectedTab, navigate }: any) => {
    return (
      <TouchableOpacity
        onPress={() => navigate(routeName)}
        style={{
          flex: 1,
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {_renderIcon(routeName, selectedTab)}
      </TouchableOpacity>
    );
  };

  return (
    <View style={{ flex: 1 }}>
      <CurvedBottomBar.Navigator
        style={styles.bottomBar}
        screenOptions={{ headerShown: false }}
        strokeWidth={0.5}
        strokeColor="#DDDDDD"
        height={55}
        circleWidth={55}
        bgColor="white"
        initialRouteName="Hom"
        borderTopLeftRight
        renderCircle={({ selectedTab, navigate }) => (
          <Animated.View style={styles.btnCircle}>
            <TouchableOpacity
              style={{
                flex: 1,
                justifyContent: "center",
              }}
              onPress={() => navigation.navigate("Complain")}
            >
              <LottieView
                style={{
                  height: 50,
                  width: 50,
                }}
                autoPlay
                loop={false}
                ref={(animation) => {
                  animationRef.current = animation;
                }}
                source={require("../../assets/complain.json")}
              />
            </TouchableOpacity>
          </Animated.View>
        )}
        tabBar={renderTabBar}
      >
        <CurvedBottomBar.Screen name="Hom" position="LEFT" component={Home} />
        <CurvedBottomBar.Screen
          name="Track"
          component={Track}
          position="LEFT"
        />
        <CurvedBottomBar.Screen
          name="title4"
          component={Test2}
          position="RIGHT"
        />
        <CurvedBottomBar.Screen
          name="title2"
          component={Test2}
          position="RIGHT"
        />
      </CurvedBottomBar.Navigator>
    </View>
  );
};

export default Bottom_nav;

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  button: {
    marginVertical: 5,
  },
  bottomBar: {},
  btnCircle: {
    width: 60,
    height: 60,
    borderRadius: 35,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "white",
    padding: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 0.5,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    elevation: 1,
    bottom: 30,
  },
  imgCircle: {
    width: 30,
    height: 30,
    tintColor: "gray",
  },
  img: {
    width: 30,
    height: 30,
  },
  Modal: {
    backgroundColor: "white",
    flex: 1,
    flexDirection: "column",
  },
});
