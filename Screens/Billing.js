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
} from "react-native";
import React, { useState } from "react";
import {
  MaterialCommunityIcons,
  Entypo,
  MaterialIcons,
} from "@expo/vector-icons";
import Button from "../components/ui/Button";
import { StripeProvider, useStripe } from "@stripe/stripe-react-native";
import { DataTable, Divider } from "react-native-paper";

const Billing = ({ navigation }) => {
  const stripe = useStripe();
  const [paid, setpaid] = useState(true);
  const bill_payment = async (bill_amount) => {
    try {
      const finalAmount = parseInt(bill_amount);
      // console.log(finalAmount);
      if (finalAmount < 1)
        return Alert.alert("You Bill Amount Should be greater than 1");
      const response = await fetch("http://192.168.10.4:5000/pay_bill", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ amount: finalAmount, name: "Zain" }),
      });
      const data = await response.json();
      if (!response.ok) {
        return Alert.alert(data.message);
      }
      const initSheet = await stripe.initPaymentSheet({
        paymentIntentClientSecret: data.clientSecret,
        merchantDisplayName: "anything",
      });
      if (initSheet.error) {
        console.error(initSheet.error);
        return Alert.alert(initSheet.error.message);
      }
      const presentSheet = await stripe.presentPaymentSheet({
        clientSecret: data.clientSecret,
      });
      if (presentSheet.error) {
        console.error(presentSheet.error);
        return Alert.alert(presentSheet.error.message);
      }

      console.log("Payment done");
    } catch (err) {
      console.error(err);
      Alert.alert("Payment failed!");
    }
  };
  return (
    <View style={styles.container}>
      <ImageBackground
        source={require("../assets/images/5555.jpg")}
        resizeMode="cover"
        style={styles.image}
      >
        <View style={{ flex: 0.9 }}>
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
          <Text style={{ fontSize: 20, alignSelf: "center", marginTop: "8%" }}>
            My Billing
          </Text>
          <View style={{ marginTop: "4%" }}>
            <Text style={{ alignSelf: "center", fontSize: 18 }}>
              Zahab Shakir
            </Text>
            <Text
              style={{ alignSelf: "center", fontSize: 18, marginTop: "2%" }}
            >
              Acc No:013212323422342
            </Text>
          </View>
          <View style={styles.name}>
            <View style={{ flexDirection: "row" }}>
              <View style={{ width: "50%", flexDirection: "column" }}>
                <Text style={{ fontWeight: "bold" }}>Invoice Number:</Text>
                <Text>0123123132</Text>
                <Text style={{ fontWeight: "bold", marginTop: "4%" }}>
                  Issue Date:
                </Text>
                <Text>10-Nov-2022</Text>
                <Text style={{ fontWeight: "bold", marginTop: "4%" }}>
                  Bill Month:
                </Text>
                <Text>Nov-22</Text>
              </View>
              <View style={{ justifyContent: "center" }}>
                <StripeProvider publishableKey="pk_test_51M4Q9GJbyEqQzB0WiFHVQrrz0n7UN4Uo4iz2WUdAE0lsDLt48ssvQEfurZaQPXt1JOw26TZxtGvgtOD5MzRQmYU300QBTgjXXI">
                  <Button
                    onPress={() => bill_payment(11200)}
                    backc={paid ? "#EFCE66" : "#F0984A"}
                    width={"89%"}
                    font={"Outfit"}
                    fsize={20}
                    fcolor={"#FFFFFF"}
                    isdis={paid}
                  >
                    {"Pay Now"}
                  </Button>
                </StripeProvider>
              </View>
            </View>
          </View>
        </View>
        <ScrollView style={styles.body}>
          <ScrollView
            alwaysBounceHorizontal={true}
            horizontal={true}
            nestedScrollEnabled={true}
            showsHorizontalScrollIndicator={false}
            style={{ paddingVertical: 10 }}
          >
            <View style={styles.box}>
              <Text>Amount Payable</Text>
              <Text
                style={{ fontSize: 18, fontWeight: "300", marginTop: "5%" }}
              >
                PKR
              </Text>
              <Text
                style={{ fontSize: 20, fontWeight: "200", marginTop: "5%" }}
              >
                11,619
              </Text>
            </View>
            <View style={styles.box}>
              <Text>Due Date</Text>
              <Text
                style={{ fontSize: 20, fontWeight: "300", marginTop: "5%" }}
              >
                24th
              </Text>
              <Text
                style={{ fontSize: 18, fontWeight: "200", marginTop: "5%" }}
              >
                Nov-2022
              </Text>
            </View>
            <View style={styles.box}>
              <Text>Payable After Due Date</Text>
              <Text
                style={{ fontSize: 18, fontWeight: "300", marginTop: "5%" }}
              >
                PKR
              </Text>
              <Text
                style={{ fontSize: 20, fontWeight: "200", marginTop: "5%" }}
              >
                11,619
              </Text>
            </View>
            <Pressable
              style={styles.box}
              onPress={() => {
                alert("Hello");
              }}
            >
              <Text style={{ color: "#FFB714" }}>Press Me</Text>
              <Text style={{ color: "#FFB714" }}>For</Text>
              <Text style={{ color: "#FFB714" }}>Detailed</Text>
              <Text style={{ color: "#FFB714" }}>Explanation</Text>
            </Pressable>
          </ScrollView>
          <Divider />
          <Text
            style={{
              paddingLeft: "10%",
              fontWeight: "500",
              marginBottom: "3%",
              fontSize: 20,
              marginTop: "3%",
            }}
          >
            Bill And Payment History
          </Text>
          <Divider />
          <DataTable style={{ paddingBottom: 40 }}>
            <DataTable.Header>
              <DataTable.Title>Dessert</DataTable.Title>
              <DataTable.Title numeric>Calories</DataTable.Title>
            </DataTable.Header>

            <DataTable.Row>
              <DataTable.Cell>Frozen yogurt</DataTable.Cell>
              <DataTable.Cell numeric>159</DataTable.Cell>
            </DataTable.Row>

            <DataTable.Row>
              <DataTable.Cell>Ice cream sandwich</DataTable.Cell>
              <DataTable.Cell numeric>237 {"\n"} 345</DataTable.Cell>
            </DataTable.Row>
          </DataTable>
        </ScrollView>
      </ImageBackground>
    </View>
  );
};

export default Billing;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#66D6AE",
  },
  image: {
    flex: 1,
  },
  name: {
    backgroundColor: "white",
    height: "40%",
    marginHorizontal: "5%",
    marginTop: "6%",
    borderRadius: Platform.OS === "ios" ? "10%" : 10,
    padding: "3%",
  },
  body: {
    flex: 2,
    backgroundColor: "#F1F6F7",
    paddingBottom: 50,
  },
  box: {
    backgroundColor: "white",
    borderRadius: Platform.OS === "ios" ? "10%" : 10,
    height: 120,
    width: 120,
    marginHorizontal: 10,
    shadowOpacity: 0.1,
    shadowRadius: 3,
    shadowOffset: { width: 0, height: 0 },
    shadowColor: "black",
    elevation: 5,
    justifyContent: "center",
    alignItems: "center",
    padding: 5,
  },
});
