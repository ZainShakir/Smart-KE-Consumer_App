import { StyleSheet, Text, View, Dimensions } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import React, { useState, useEffect, useContext } from "react";
import { AuthContext } from "../../store/auth-context";
import { get_count } from "../../utils/auth";
const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

const ComplaintDiary = () => {
  const authCtx = useContext(AuthContext);
  const [TotalComplain, setTotalComplain] = useState("");
  const [PendingComplain, setPendingComplain] = useState("");
  const [loadingdata, setloading] = useState(false);

  const gettotal = async () => {
    const token = authCtx.token;
    const acc_no = authCtx.primary_account;
    let isUnmounted = false;
    try {
      setloading(true);

      const response = await get_count(token, acc_no);
      if (!isUnmounted) {
        setTotalComplain(response.data.total_complain);
        setPendingComplain(response.data.pending_complain);
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
    gettotal();
  }, []);

  return (
    <View style={styles.container}>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "center",
          marginTop: windowHeight * 0.05,
        }}
      >
        <MaterialCommunityIcons
          name="message-processing-outline"
          size={24}
          color="lightgray"
        />
        <View style={{ width: windowWidth * 0.02 }} />
        <Text style={{ fontSize: 20, color: "lightgray", fontWeight: "bold" }}>
          Complaint's Diary
        </Text>
      </View>
      <View style={styles.box}>
        <Text style={{ color: "#14A2F9", fontSize: 30, fontWeight: "600" }}>
          {TotalComplain}
        </Text>
        <Text style={{ color: "#14A2F9", fontSize: 18 }}>Total Complaints</Text>
      </View>
      <View style={{ flexDirection: "row" }}>
        <View style={styles.smallbox}>
          <Text style={{ color: "#FCD633", fontSize: 30, fontWeight: "600" }}>
            {PendingComplain}
          </Text>
          <Text style={{ color: "#FCD633", fontSize: 18 }}>Pending</Text>
        </View>
        <View style={styles.smallbox}>
          <Text style={{ color: "green", fontSize: 30, fontWeight: "600" }}>
            0
          </Text>
          <Text style={{ color: "green", fontSize: 18 }}>In-Progress</Text>
        </View>
        <View style={styles.smallbox}>
          <Text style={{ color: "blue", fontSize: 30, fontWeight: "600" }}>
            0
          </Text>
          <Text style={{ color: "blue", fontSize: 18 }}>Resolved</Text>
        </View>
      </View>
    </View>
  );
};

export default ComplaintDiary;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  box: {
    backgroundColor: "white",
    borderRadius: Platform.OS === "android" ? 10 : "10",
    height: 120,
    shadowOpacity: 0.2,
    shadowRadius: 5,
    shadowOffset: { width: 0, height: 0 },
    shadowColor: "black",
    elevation: 10,
    marginHorizontal: "2%",
    marginTop: windowWidth * 0.05,
    width: windowWidth * 0.9,
    // padding: 10,
    alignSelf: "center",
    alignItems: "flex-end",
    paddingTop: windowHeight * 0.05,
    padding: 15,
  },
  smallbox: {
    backgroundColor: "white",
    borderRadius: Platform.OS === "android" ? 10 : "10",
    height: 120,
    shadowOpacity: 0.2,
    shadowRadius: 5,
    shadowOffset: { width: 0, height: 0 },
    shadowColor: "black",
    elevation: 10,
    marginHorizontal: "1%",
    marginTop: windowWidth * 0.05,
    // padding: 10,
    alignSelf: "center",
    alignItems: "flex-end",
    paddingTop: windowHeight * 0.05,
    padding: 15,
    width: windowWidth * 0.3,
  },
});
