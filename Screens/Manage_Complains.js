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
  FlatList,
} from "react-native";
import {
  MaterialCommunityIcons,
  Entypo,
  MaterialIcons,
  Ionicons,
} from "@expo/vector-icons";
import { NativeBaseProvider, Box, Input, Icon, Center } from "native-base";
import Card from "../components/ui/Card";
import React, { useContext, useState, useEffect, useRef } from "react";
import LottieView from "lottie-react-native";
import { AuthContext } from "../store/auth-context";
import { get_complains } from "../utils/auth";

const Manage_Complains = ({ navigation }) => {
  const [filteredData, setfilteredData] = useState([]);
  const [masterData, setmasterData] = useState([]);
  const [search, setSearch] = useState("");
  const [complain, setcomplain] = useState([]);
  const authCtx = useContext(AuthContext);

  const [loadingdata, setloading] = useState(false);
  const animation = useRef(null);

  const getcomplains = async () => {
    const token = authCtx.token;
    const acc_no = authCtx.primary_account;
    let isUnmounted = false;
    try {
      setloading(true);

      const response = await get_complains(token, acc_no);
      if (!isUnmounted) {
        let temp = [];
        for (var i = 0; i < response.data.length; i++) {
          response.data[i]["key"] = `${i}`;
          temp.push(response.data[i]);
        }
        setcomplain(temp);

        setTimeout(() => {
          setloading(false);
        }, 2500);
      }
    } catch (error) {
      console.log(error);
    }
    return () => {
      isUnmounted = true;
    };
  };
  useEffect(() => {
    getcomplains();
  }, []);

  useEffect(() => {
    animation.current?.play();
  }, []);

  const ItemSeparatorView = () => {
    return <View style={{ height: 10, width: "100%" }} />;
  };
  const ItemView = ({ item }) => {
    console.log(item);
    return <Card />;
  };

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
            {loadingdata ? (
              <View style={{ alignItems: "center", marginTop: "40%" }}>
                <LottieView
                  autoPlay
                  loop={loadingdata}
                  ref={(animate) => {
                    animation.current = animate;
                  }}
                  style={{
                    width: 200,
                    height: 200,
                    backgroundColor: "#FFFFFF",
                  }}
                  source={require("../assets/loading1.json")}
                />
              </View>
            ) : (
              <View
                style={{ alignItems: "center", marginTop: "5%", width: "100%" }}
              >
                {/* <Card /> */}
                <FlatList
                  data={complain}
                  keyExtractor={(Item, index) => index.toString()}
                  ItemSeparatorComponent={ItemSeparatorView}
                  renderItem={ItemView}
                  maxToRenderPerBatch={5}
                  showsVerticalScrollIndicator={false}
                  showsHorizontalScrollIndicator={false}
                />
              </View>
            )}
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
