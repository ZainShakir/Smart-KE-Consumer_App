import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  Pressable,
  ScrollView,
  Platform,
} from "react-native";
import React, { useState, useContext, useEffect } from "react";
import { useFonts } from "expo-font";
import {
  MaterialCommunityIcons,
  Entypo,
  MaterialIcons,
} from "@expo/vector-icons";
import axios from "axios";

import { Picker } from "@react-native-picker/picker";

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

//chart
import Line_chart from "../components/charts/Line_chart";
import { LineChart } from "react-native-gifted-charts";
import Bar_chart from "../components/charts/Bar_chart";

const Stock_screen = ({ navigation }) => {
  const [covalue, setcovalue] = useState("");
  const [selectedfactor1, setSelectedFactor1] = useState([]);
  const [selectedfactor2, setSelectedFactor2] = useState([]);
  const [factor1, setfactor1] = useState();
  const [factor2, setfactor2] = useState();
  const [predicted, setPredicted] = useState();
  const [loaded] = useFonts({
    Montserrat_m: require("../assets/fonts/Montserrat/static/Montserrat-Medium.ttf"),
  });

  if (!loaded) {
    return null;
  }

  async function getcorrelation(f1, f2) {
    await axios
      .get(`http://192.168.10.7:9000/matrix`)
      .then(function (response) {
        let temp;
        const size = Object.keys(response.data).length;
        for (var i = 0; i < size; i++) {
          if (response.data[i].Factor1 === f1) {
            if (response.data[i].Factor2 === f2) {
              temp = response.data[i].Relation_Value;
              break;
            }
          }
        }

        setcovalue(temp);
      })
      .catch(function (error) {
        console.log("Failed to retrieve Correlation Value");
      });
  }
  async function getYearVisuals(f1, f2) {
    await axios
      .get(`http://192.168.10.7:9000/prices/yearlyagg`)
      .then(function (response) {
        let fact1 = [];
        let fact2 = [];

        for (var i = 0; i < response.data.length; i++) {
          let obj = {};
          let obj1 = {};
          obj["value"] = response.data[i][f1];
          obj["label"] = response.data[i].Date;
          obj1["value"] = response.data[i][f2];
          obj1["label"] = response.data[i].Date;
          fact1.push(obj);
          fact2.push(obj1);
        }
        setSelectedFactor1(fact1);
        setSelectedFactor2(fact2);
      })
      .catch(function (error) {
        console.log("Failed to retrieve Yearly Aggregate data");
      });
  }
  async function predicted_value() {
    await axios
      .get(`http://192.168.10.7:9000/predictvalue`)
      .then(function (response) {
        console.log(response.data);
      })
      .catch(function (error) {
        console.log("Failed to retrieve Yearly Aggregate data");
      });
  }

  const submit = () => {
    if (factor1 && factor2) {
      getcorrelation(factor1, factor2);
      getYearVisuals(factor1, factor2);
      predicted_value();
    } else {
      alert("Please Select Valid Fields");
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.body}>
        <View>
          <Pressable>
            <Pressable
              onPress={() => navigation.toggleDrawer()}
              style={{ position: "absolute" }}
            >
              <Entypo name="menu" size={26} color="black" />
            </Pressable>
          </Pressable>
          <Text
            style={{
              fontFamily: "Montserrat_m",
              fontSize: 24,
              alignSelf: "center",
            }}
          >
            KE STOCK ANALYSIS
          </Text>
        </View>
        <ScrollView>
          <View>
            <View
              style={{
                backgroundColor: "black",

                justifyContent: "center",
                height: windowHeight * 0.05,
                marginTop: windowHeight * 0.04,
                alignSelf: "flex-start",
                alignSelf: "center",
                borderRadius: Platform.OS === "ios" ? "10%" : 10,
              }}
            >
              <Text
                style={{
                  fontSize: 20,
                  paddingHorizontal: 10,

                  color: "white",
                }}
              >
                Select Factor 1 :
              </Text>
            </View>
            <Picker
              selectedValue={factor1}
              onValueChange={(itemValue, itemIndex) => setfactor1(itemValue)}
              themeVariant="dark"
            >
              <Picker.Item label="K Electric" value="KEPrice" />
              <Picker.Item label="Interest Rate" value="InterestRate" />
              <Picker.Item label="Crude Oil" value="CrudeOil" />
              <Picker.Item label="Gold Rate" value="GoldRate" />
              <Picker.Item label="PSX Equity" value="PSXEquity" />
              <Picker.Item label="KSE Price" value="KSEPrice" />
            </Picker>
          </View>
          <View>
            <View
              style={{
                backgroundColor: "black",

                justifyContent: "center",
                height: windowHeight * 0.05,
                marginTop: windowHeight * 0.04,
                alignSelf: "flex-start",
                alignSelf: "center",
                borderRadius: Platform.OS === "ios" ? "10%" : 10,
              }}
            >
              <Text
                style={{
                  fontSize: 20,
                  paddingHorizontal: 10,
                  color: "white",
                }}
              >
                Select Factor 2 :
              </Text>
            </View>
            <Picker
              selectedValue={factor2}
              onValueChange={(itemValue, itemIndex) => setfactor2(itemValue)}
              themeVariant="dark"
            >
              <Picker.Item label="Interest Rate" value="InterestRate" />
              <Picker.Item label="Crude Oil" value="CrudeOil" />
              <Picker.Item label="Gold Rate" value="GoldRate" />
              <Picker.Item label="PSX Equity" value="PSXEquity" />
              <Picker.Item label="KSE Price" value="KSEPrice" />
              <Picker.Item label="K Electric" value="KEPrice" />
            </Picker>
          </View>
          <View style={{ marginBottom: windowHeight * 0.05 }}>
            <View style={{ alignSelf: "center" }}>
              <Pressable
                style={{
                  backgroundColor: "#28A745",
                  alignSelf: "flex-start",
                  borderRadius: Platform.OS === "ios" ? "30%" : 30,
                  padding: windowHeight * 0.02,
                }}
                onPress={() => {
                  submit();
                }}
              >
                <Text style={{ fontSize: "20", color: "white" }}>
                  Find Correlation Value
                </Text>
              </Pressable>
            </View>
            {covalue ? (
              <View
                style={{
                  height: windowHeight * 0.04,
                  marginTop: windowHeight * 0.02,
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Text style={{ fontSize: 20 }}>Correlation: {covalue}</Text>
              </View>
            ) : null}
          </View>
          <View
            style={{
              paddingBottom: Platform.OS === "ios" ? windowHeight * 0.06 : 0,
            }}
          >
            {selectedfactor1.length > 0 && selectedfactor2.length > 0 ? (
              <Line_chart
                fact1={selectedfactor1}
                fact2={selectedfactor2}
                factor1label={factor1}
                factor2label={factor2}
              />
            ) : null}
          </View>
          <View
            style={{
              paddingBottom: Platform.OS === "ios" ? windowHeight * 0.06 : 0,
            }}
          >
            {selectedfactor1.length > 0 && selectedfactor2.length > 0 ? (
              <Bar_chart
                fact1={selectedfactor1}
                fact2={selectedfactor2}
                factor1label={factor1}
                factor2label={factor2}
              />
            ) : null}
          </View>
        </ScrollView>
      </View>
    </View>
  );
};

export default Stock_screen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  body: {
    paddingTop: windowHeight * 0.05,
    paddingHorizontal: windowWidth * 0.02,
  },
});
