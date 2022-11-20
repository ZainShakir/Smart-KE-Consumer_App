import {
  StyleSheet,
  Text,
  View,
  ImageBackground,
  Pressable,
  Modal,
  ScrollView,
  processColor,
  Alert,
  Image,
  Platform,
} from "react-native";
import React, { useState } from "react";
import {
  MaterialCommunityIcons,
  Entypo,
  MaterialIcons,
  Ionicons,
} from "@expo/vector-icons";
import { NativeBaseProvider, Box, Input, Icon, Center } from "native-base";
import Card from "../components/ui/Card";

const Manage_Complains = ({ navigation }) => {
  const [search, setSearch] = useState("");
  return (
    <NativeBaseProvider>
      <View style={styles.container}>
        <ImageBackground
          source={require("../assets/images/5555.jpg")}
          resizeMode="cover"
          style={styles.image}
        >
          <View style={{ flex: 0.1, paddingTop: "5%" }}>
            <Pressable
              onPress={() => navigation.toggleDrawer()}
              style={{
                position: "absolute",
                marginHorizontal: "5%",
                marginTop: "8%",
              }}
            >
              <Entypo name="menu" size={26} color="black" />
            </Pressable>
            <Text
              style={{ fontSize: 20, alignSelf: "center", marginTop: "3%" }}
            >
              Complain Tracking
            </Text>
          </View>
          <View style={styles.body}>
            <View
              style={{
                alignSelf: "center",
                marginTop: "5%",
              }}
            >
              <Input
                placeholder="Search"
                variant="filled"
                value={search}
                onChangeText={setSearch}
                width="90%"
                borderRadius="10"
                py="3"
                px="2"
                fontSize="15"
                InputLeftElement={
                  <Icon
                    ml="2"
                    size="4"
                    color="gray.400"
                    as={<Ionicons name="ios-search" />}
                  />
                }
              />
            </View>
            <View
              style={{
                borderWidth: 1,
                borderColor: "#dcdcdc",
                marginTop: "3%",
              }}
            />
            <View style={{ alignItems: "center", marginTop: "5%" }}>
              <Card />
            </View>
          </View>
        </ImageBackground>
      </View>
    </NativeBaseProvider>
  );
};

export default Manage_Complains;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#66D6AE",
  },
  image: {
    flex: 1,
  },
  body: {
    flex: 1,
    backgroundColor: "white",
    marginHorizontal: "2%",
    marginBottom: "2%",
    borderRadius: Platform.OS === "ios" ? "10%" : 10,
  },
});
