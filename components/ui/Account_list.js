import React, { useEffect, useState, useContext, useRef } from "react";
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableHighlight,
  View,
} from "react-native";
import { AntDesign } from "@expo/vector-icons";

import { SwipeListView } from "react-native-swipe-list-view";
import { accounts, setprime } from "../../utils/auth";
import { AuthContext } from "../../store/auth-context";
import LottieView from "lottie-react-native";

export default function Basic() {
  const AuthCtx = useContext(AuthContext);
  const animation = useRef(null);
  const [accs, setaccounts] = useState([]);
  const [loadingdata, setloading] = useState(false);

  const setprimary = async (acc_no) => {
    const token = AuthCtx.token;

    let isUnmounted = false;
    try {
      const response = await setprime(token, acc_no);
      if (!isUnmounted) {
        console.log(response.data);
        getaccounts();
      }
    } catch (error) {
      console.log(error);
    }
    return () => {
      isUnmounted = true;
    };
  };

  const getaccounts = async () => {
    const token = AuthCtx.token;
    let isUnmounted = false;
    try {
      setloading(true);
      const response = await accounts(token);
      if (!isUnmounted) {
        let temp = [];
        for (var i = 0; i < response.data.length; i++) {
          response.data[i]["key"] = `${i}`;
          temp.push(response.data[i]);
        }
        setaccounts(temp);
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
    getaccounts();
  }, []);
  useEffect(() => {
    animation.current?.play();
  }, []);

  const [listData, setListData] = useState(
    Array(5)
      .fill("")
      .map((_, i) => ({ key: `${i}`, text: `01023456${i}` }))
  );

  const closeRow = (rowMap, rowKey, data) => {
    setprimary(data.item.account_no);
    if (rowMap[rowKey]) {
      rowMap[rowKey].closeRow();
    }
  };

  const deleteRow = (rowMap, rowKey) => {
    closeRow(rowMap, rowKey);
    const newData = [...listData];
    const prevIndex = listData.findIndex((item) => item.key === rowKey);
    newData.splice(prevIndex, 1);
    setListData(newData);
  };

  const onRowDidOpen = (rowKey) => {
    console.log("This row opened", rowKey);
  };

  const renderItem = (data) => (
    <TouchableHighlight
      onPress={() => console.log("You touched me")}
      style={styles.rowFront}
      underlayColor={"#AAA"}
    >
      <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
        <View style={{ flexDirection: "row" }}>
          <AntDesign
            name="star"
            size={24}
            color={data.item.primary_status ? "lightgreen" : "orange"}
            style={{ paddingTop: "1.5%" }}
          />
          <View style={{ paddingLeft: "5%" }}>
            <Text style={{ fontWeight: "500", fontSize: 18 }}>
              {data.item.acc_name}
            </Text>
            <Text style={{ fontSize: 15, fontWeight: "300" }}>
              ACC No: {data.item.account_no}
            </Text>
          </View>
        </View>

        <View
          style={{
            alignSelf: "center",
          }}
        >
          <AntDesign name="doubleleft" size={24} color="black" />
        </View>
      </View>
    </TouchableHighlight>
  );

  const renderHiddenItem = (data, rowMap) => (
    <View style={styles.rowBack}>
      <Text>Left</Text>
      <TouchableOpacity
        style={[styles.backRightBtn, styles.backRightBtnLeft]}
        onPress={() => closeRow(rowMap, data.item.key, data)}
      >
        <Text style={styles.backTextWhite}>Set Primary</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[styles.backRightBtn, styles.backRightBtnRight]}
        onPress={() => deleteRow(rowMap, data.item.key)}
      >
        <Text style={styles.backTextWhite}>Delete</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
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
      ) : (
        <SwipeListView
          data={accs}
          renderItem={renderItem}
          renderHiddenItem={renderHiddenItem}
          leftOpenValue={0}
          rightOpenValue={-150}
          previewRowKey={"0"}
          previewOpenValue={-40}
          previewOpenDelay={3000}
          onRowDidOpen={onRowDidOpen}
          stopLeftSwipe={1}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    flex: 1,
  },
  backTextWhite: {
    color: "#FFF",
  },
  rowFront: {
    backgroundColor: "white",
    borderBottomColor: "black",
    borderBottomWidth: 1,
    height: 60,
    justifyContent: "center",
    paddingHorizontal: 10,
  },
  rowBack: {
    alignItems: "center",
    backgroundColor: "#DDD",
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    paddingLeft: 15,
  },
  backRightBtn: {
    alignItems: "center",
    bottom: 0,
    justifyContent: "center",
    position: "absolute",
    top: 0,
    width: 75,
  },
  backRightBtnLeft: {
    backgroundColor: "#26CC00",
    right: 75,
  },
  backRightBtnRight: {
    backgroundColor: "red",
    right: 0,
  },
});
