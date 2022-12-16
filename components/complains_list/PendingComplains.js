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
import Card from "../ui/Card";
import React, { useContext, useState, useEffect, useRef } from "react";
import { AuthContext } from "../../store/auth-context";
import { get_complains } from "../../utils/auth";
import LottieView from "lottie-react-native";
const PendingComplains = () => {
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
        var k = 0;
        for (var i = 0; i < response.data.length; i++) {
          //   response.data[i]["key"] = `${i}`;
          //   temp.push(response.data[i]);

          if (response.data[i].complain_status === "Pending") {
            response.data[k]["key"] = `${k}`;
            temp.push(response.data[k]);
            k += 1;
          }
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
    return <Card {...item} />;
  };
  return (
    <View style={styles.body}>
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
            source={require("../../assets/loading1.json")}
          />
        </View>
      ) : complain.length === 0 ? (
        <View style={{ marginTop: "50%", alignItems: "center" }}>
          <Text>No Complains Found</Text>
        </View>
      ) : (
        <View style={{ alignItems: "center", marginTop: "5%" }}>
          {/* <Card /> */}
          <FlatList
            data={complain}
            keyExtractor={(Item, index) => index.toString()}
            ItemSeparatorComponent={ItemSeparatorView}
            renderItem={ItemView}
            maxToRenderPerBatch={5}
            showsVerticalScrollIndicator={false}
            showsHorizontalScrollIndicator={false}
            refreshing={loadingdata}
            onRefresh={getcomplains}
          />
        </View>
      )}
    </View>
  );
};

export default PendingComplains;

const styles = StyleSheet.create({
  body: {
    flex: 1,
    backgroundColor: "white",
  },
});
