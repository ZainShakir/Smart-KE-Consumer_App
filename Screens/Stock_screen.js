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
import {
  Table,
  TableWrapper,
  Row,
  Rows,
  Col,
  Cols,
  Cell,
} from "react-native-table-component";

import Accordin from "../components/ui/Accordian";

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
  const [factor1, setfactor1] = useState("KEPrice");
  const [factor2, setfactor2] = useState();
  const [predicted, setPredicted] = useState();
  const [tableHead, setTableHead] = useState(["", "Value"]);
  const [widthArr, setwidthArr] = useState([
    windowWidth * 0.3,
    windowWidth * 0.7,
  ]);
  const [StockData, setStockData] = useState([]);

  useEffect(() => {
    predicted_value();
    Get_StockChart();
  }, []);

  const [loaded] = useFonts({
    Montserrat_m: require("../assets/fonts/Montserrat/static/Montserrat-Medium.ttf"),
  });

  if (!loaded) {
    return null;
  }

  async function getcorrelation(f1, f2) {
    await axios
      .get(`http://192.168.102.99:8000/matrix`)
      .then(function (response) {
        let temp;
        const size = Object.keys(response.data).length;
        for (var i = 0; i < size; i++) {
          if (response.data[i].Factor1 === f1) {
            if (response.data[i].Factor2 === f2) {
              temp = response.data[i].Relation_Value.toFixed(6);
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
      .get(`http://192.168.102.99:8000/prices/yearlyagg`)
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
      .get(`http://192.168.102.99:8000/predictvalue`)
      .then(function (response) {
        var x;
        x = JSON.parse(response.data);
        setPredicted(x[0][0]);
      })
      .catch(function (error) {
        console.log("Failed to retrieve Yearly Aggregate data");
      });
  }

  const submit = () => {
    if (factor1 && factor2) {
      getcorrelation(factor1, factor2);
      getYearVisuals(factor1, factor2);
    } else {
      alert("Please Select Valid Fields");
    }
  };

  async function Get_StockChart() {
    await axios
      .get(`http://192.168.102.99:9000/getKEStockDailyPrice`)
      .then(function (response) {
        // const tableData = [];
        // for (let i = 0; i < 30; i += 1) {
        //   const rowData = [];
        //   for (let j = 0; j < 9; j += 1) {
        //     rowData.push(`${i}${j}`);
        //   }
        //   tableData.push(rowData);
        // }

        const tableData = [];

        for (const key in response.data) {
          //  console.log(`${key}: ${response.data[key]}`);
          const rowData = [];
          rowData.push(`${key}`);
          rowData.push(`${response.data[key]}`);
          tableData.push(rowData);
        }

        const rowData = [];
        rowData.push("PREDICTED \nVALUE");
        rowData.push(`${predicted}`);
        tableData.push(rowData);
        setStockData(tableData);
      })
      .catch(function (error) {
        console.log("Failed to retrieve data");
      });
  }

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
            KE STOCK MODULE
          </Text>
        </View>
        <View style={{ borderBottomWidth: 1, borderColor: "gray" }} />

        <ScrollView>
          <Text
            style={{
              alignSelf: "center",
              marginTop: windowHeight * 0.03,
              fontSize: 25,
              fontWeight: "600",
            }}
          >
            STOCK PRICE
          </Text>
          <Accordin title={"What is Stock Price?"}>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                marginBottom: "5%",
              }}
            >
              <Text style={{ fontSize: 13 }}>
                A stock price is the current price at which a particular stock
                is trading on the market. It is typically quoted in terms of the
                local currency, and it is influenced by a variety of factors,
                including the performance of the company, the state of the
                economy, and investor sentiment. The stock price is important
                because it can give you an idea of the value of a company, and
                it can also be used to determine the return on investment for
                shareholders.
              </Text>
            </View>
          </Accordin>
          <View
            style={{ alignItems: "center", marginTop: windowHeight * 0.02 }}
          >
            <Table borderStyle={{ borderWidth: 1, borderColor: "#C1C0B9" }}>
              <Row
                data={tableHead}
                widthArr={widthArr}
                style={styles.header}
                textStyle={styles.text}
              />
            </Table>
            <Table borderStyle={{ borderWidth: 1, borderColor: "#C1C0B9" }}>
              {StockData.map((rowData, index) => (
                <Row
                  key={index}
                  data={rowData}
                  widthArr={widthArr}
                  style={[
                    styles.row,
                    index % 2 && { backgroundColor: "#F7F6E7" },
                  ]}
                  textStyle={styles.text1}
                />
              ))}
            </Table>
          </View>
          <Text
            style={{
              alignSelf: "flex-start",
              paddingVertical: windowHeight * 0.02,
              fontSize: 14,
            }}
          >
            <Text style={{ fontWeight: "bold" }}>* Note:</Text> Predicted Value
            is just a future estimate based on the previous stock attributes.
            It's not necessary that this value should always be accurate.
          </Text>
          <Accordin title={"What are the Types of Stock Analysis?"}>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                marginBottom: "5%",
              }}
            >
              <Text style={{ fontSize: 13 }}>
                There are two main types of stock analysis:{`\n`}
                {`\n`}
                1){" "}
                <Text style={{ fontWeight: "bold" }}>
                  Fundamental Analysis:
                </Text>{" "}
                It involves examining a company's financial and economic
                indicators to determine its intrinsic value. {`\n`}
                {`\n`}
                2){" "}
                <Text style={{ fontWeight: "bold" }}>
                  Technical Analysis:
                </Text>{" "}
                It involves using past price and volume data to identify trends
                and make predictions about the future direction of a stock's
                price
              </Text>
            </View>
          </Accordin>
          <View>
            <Text
              style={{
                alignSelf: "center",
                marginTop: windowHeight * 0.05,
                fontSize: 25,
                fontWeight: "600",
              }}
            >
              CORRELATION
            </Text>
            <Accordin title={"What is Correlation?"}>
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  marginBottom: "5%",
                }}
              >
                <Text style={{ fontSize: 13 }}>
                  In statistics, correlation refers to the degree to which two
                  variables are related. A correlation value is a statistical
                  measure that represents the strength and direction of this
                  relationship.
                  {`\n`}
                  The correlation value can range from -1 to +1. A value of +1
                  indicates a perfect positive correlation, which means that as
                  one variable increases, the other variable also increases by
                  the same amount. A value of -1 indicates a perfect negative
                  correlation, which means that as one variable increases, the
                  other variable decreases by the same amount. A value of 0
                  indicates no correlation, which means that there is no
                  relationship between the two variables
                </Text>
              </View>
            </Accordin>
            <View
              style={{
                backgroundColor: "black",
                justifyContent: "center",
                height: windowHeight * 0.05,
                marginTop: windowHeight * 0.04,
                alignSelf: "center",
                borderRadius: Platform.OS === "ios" ? "10%" : 10,
              }}
            >
              <Text
                style={{
                  fontSize: 20,
                  paddingHorizontal: 10,
                  color: "white",
                  fontFamily: "Montserrat_m",
                }}
              >
                Selected Factor 1 : K-Electric
              </Text>
            </View>
            <View
              style={{
                backgroundColor: "black",

                justifyContent: "center",
                height: windowHeight * 0.05,
                marginTop: windowHeight * 0.02,
                alignSelf: "center",

                borderRadius: Platform.OS === "ios" ? "10%" : 10,
              }}
            >
              <Text
                style={{
                  fontSize: 20,
                  paddingHorizontal: 10,
                  color: "white",
                  fontFamily: "Montserrat_m",
                }}
              >
                Selected Factor 2 : {factor2}
              </Text>
            </View>
          </View>
          <View>
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
                <Text style={{ fontSize: 20, color: "white" }}>
                  Find Correlation Value
                </Text>
              </Pressable>
            </View>
            {covalue ? (
              // <View
              //   style={{
              //     height: windowHeight * 0.04,
              //     marginTop: windowHeight * 0.02,
              //     alignItems: "center",
              //     justifyContent: "center",
              //   }}
              // >
              //   <Text style={{ fontSize: 20 }}>Correlation: {covalue}</Text>
              // </View>
              <View
                style={{
                  borderWidth: 1,
                  marginTop: windowHeight * 0.02,
                  height: windowHeight * 0.07,
                  alignItems: "center",
                  flexDirection: "row",
                }}
              >
                <View
                  style={{
                    borderWidth: 1,
                    width: windowWidth * 0.5,
                    height: windowHeight * 0.07,
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <Text style={{ fontSize: 20 }}>Correlation: </Text>
                </View>
                <View
                  style={{
                    borderWidth: 1,
                    width: windowWidth * 0.5,
                    height: windowHeight * 0.07,
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <Text style={{ fontSize: 20 }}>{covalue}</Text>
                </View>
              </View>
            ) : null}
          </View>
          <Text
            style={{
              alignSelf: "center",
              fontSize: 25,
              fontWeight: "600",
            }}
          >
            GRAPH ANALYSIS
          </Text>
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
  header: { height: 50, backgroundColor: "black" },
  text: { textAlign: "center", fontWeight: "400", color: "white" },
  text1: { textAlign: "center", fontWeight: "400" },
  dataWrapper: { marginTop: -1 },
  row: { height: 40, backgroundColor: "#E7E6E1" },

  wrapper1: { flexDirection: "row" },
  title1: { flex: 1, backgroundColor: "#f6f8fa" },
  row1: { height: 28 },
  text2: { textAlign: "center" },
});
