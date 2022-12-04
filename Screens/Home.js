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
  ActivityIndicator,
} from "react-native";
import React, { useContext, useState, useEffect } from "react";
import { AuthContext } from "../store/auth-context";
import {
  MaterialCommunityIcons,
  Entypo,
  MaterialIcons,
} from "@expo/vector-icons";
import Input_paper from "../components/ui/Input_paper";
import Button from "../components/ui/Button";
import Graph from "../components/ui/Graph";
import { FontAwesome } from "@expo/vector-icons";
import { get_prime, add_acc } from "../utils/auth";
import Add_account from "../components/forms/Add_account";

import { StripeProvider, useStripe } from "@stripe/stripe-react-native";

const Home = ({ navigation }) => {
  const [modalIsVisible, SetModal] = useState(false);
  const authCtx = useContext(AuthContext);
  const [acc_name, setacc] = useState("");
  const [address, setAddress] = useState("");
  const [acc_no, set_accno] = useState("");
  const [loader1, setloader1] = useState(false);

  const [name, setname] = useState("");
  const [accnum, setaccnum] = useState("");

  function submit(credentials) {
    let { accnum, name } = credentials;
    accnum = accnum.trim();
    name = name.trim();

    const numberisValid = accnum.length > 1;
    const nameisValid = name.length > 4;
    if (!numberisValid || !nameisValid) {
      Alert.alert("Invalid input", "Please check your entered credentials.");
      return;
    }
    Add_Account({ accnum, name });
  }

  async function Add_Account({ accnum, name }) {
    const token = authCtx.token;
    try {
      const response = await add_acc(token, accnum, name, false);
      if (response.status == 201) {
        alert(response.data);
      } else {
        alert(response.data);
      }
      setaccnum("");
      setname("");
    } catch (error) {
      console.log(error);
    }
  }

  const get_prime1 = async () => {
    const token = authCtx.token;
    try {
      setloader1(true);
      const response = await get_prime(token);
      if (response.status == 200) {
        const temp = response.data[0];
        setacc(temp.acc_name);
        setAddress(temp.c_address);
        set_accno(temp.account_no);
        authCtx.set_account(temp.account_no);
      }
      setloader1(false);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    get_prime1();
  }, []);

  const stripe = useStripe();

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
        <View style={{ flex: 0.4, paddingTop: "5%" }}>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              paddingHorizontal: "4%",
            }}
          >
            <Pressable onPress={() => navigation.toggleDrawer()}>
              <Entypo name="menu" size={26} color="black" />
            </Pressable>
            <Text style={{ fontSize: 20 }}>Home</Text>
            <Pressable onPress={() => authCtx.logout()}>
              <MaterialCommunityIcons name="logout" size={26} color="black" />
            </Pressable>
          </View>
          <View style={{ paddingHorizontal: "5%", paddingTop: "5%" }}>
            <Text style={{ fontSize: 24 }}>
              Hello{" "}
              {loader1 ? (
                <ActivityIndicator
                  size="small"
                  color="white"
                  style={{ paddingLeft: 20 }}
                />
              ) : (
                acc_name
              )}
            </Text>
            <View style={{ height: "10%" }} />
            <Text style={{ fontSize: 20 }}>
              Address:{" "}
              {loader1 ? (
                <ActivityIndicator
                  size="small"
                  color="white"
                  style={{ paddingLeft: 20 }}
                />
              ) : (
                address
              )}
            </Text>
            <View style={{ height: "10%" }} />
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
              }}
            >
              <Text style={{ fontSize: 20 }}>
                Account No:
                {loader1 ? (
                  <ActivityIndicator
                    size="small"
                    color="white"
                    style={{ paddingLeft: 20 }}
                  />
                ) : (
                  acc_no
                )}
              </Text>
              <Pressable onPress={() => SetModal(true)}>
                <MaterialIcons name="add" size={26} color="black" />
              </Pressable>
            </View>
            <Modal
              visible={modalIsVisible}
              animationType="fade"
              transparent={true}
            >
              <View style={styles.Modal}>
                <View style={styles.modal_body}>
                  <View
                    style={{
                      paddingVertical: "10%",
                      paddingLeft: "5%",
                    }}
                  >
                    <Text style={{ fontSize: 23 }}>Add Account</Text>
                    <Pressable
                      style={{
                        position: "absolute",
                        paddingLeft: "92%",
                        paddingTop: "10%",
                      }}
                      onPress={() => {
                        SetModal(false);
                      }}
                    >
                      <MaterialIcons name="cancel" size={24} color="black" />
                    </Pressable>
                    <View style={{ height: "10%" }} />
                    <Input_paper
                      label={"Account Number"}
                      icon_left={"account-circle"}
                      mode={"outlined"}
                      value={accnum}
                      onUpdateValue={(x) => {
                        setaccnum(x);
                      }}
                      keyboard={"numeric"}
                      // isInvalid={credentialsInvalid.email}
                    />
                    <View style={{ height: "10%" }} />
                    <Input_paper
                      label={"Account Name"}
                      icon_left={"account-circle"}
                      mode={"outlined"}
                      value={name}
                      onUpdateValue={(y) => {
                        setname(y);
                      }}

                      // isInvalid={credentialsInvalid.email}
                    />
                    <View style={{ height: "15%" }} />
                    <Button
                      onPress={() =>
                        submit({
                          accnum: accnum,
                          name: name,
                        })
                      }
                      backc={"#F0984A"}
                      width={"50%"}
                      font={"Outfit"}
                      fsize={15}
                      fcolor={"#FFFFFF"}
                    >
                      {"ADD"}
                    </Button>
                  </View>
                </View>
              </View>
            </Modal>
          </View>
        </View>
        <ScrollView style={styles.halfbody}>
          <ScrollView
            alwaysBounceHorizontal={true}
            horizontal={true}
            nestedScrollEnabled={true}
            showsHorizontalScrollIndicator={false}
            style={{ paddingVertical: 10 }}
          >
            <View style={styles.box}>
              <Text>Amount Payable</Text>
              <Text style={{ fontWeight: "600" }}>PKR</Text>
              <Text style={{ fontWeight: "200", fontSize: 16, marginTop: 5 }}>
                11,200.00
              </Text>
              <Text style={{ color: "red", fontSize: 12, marginTop: 5 }}>
                Due Date:12/05/2020
              </Text>
              <StripeProvider publishableKey="pk_test_51M4Q9GJbyEqQzB0WiFHVQrrz0n7UN4Uo4iz2WUdAE0lsDLt48ssvQEfurZaQPXt1JOw26TZxtGvgtOD5MzRQmYU300QBTgjXXI">
                <Pressable
                  style={styles.button}
                  onPress={() => bill_payment(11200)}
                >
                  <Text style={{ color: "#FFB714", alignSelf: "center" }}>
                    Pay Now
                  </Text>
                </Pressable>
              </StripeProvider>
            </View>
            <View style={styles.box}>
              <Text>Current Month Units</Text>
              <Text
                style={{ fontSize: 20, fontWeight: "300", marginTop: "5%" }}
              >
                442 Units
              </Text>
            </View>
            <View style={styles.box}>
              <Text>Last Month Units</Text>
              <Text
                style={{ fontSize: 20, fontWeight: "300", marginTop: "5%" }}
              >
                442 Units
              </Text>
            </View>
          </ScrollView>
          <View
            style={{
              width: "100%",
              backgroundColor: "white",
              padding: 30,
              shadowOpacity: 0.1,
              shadowRadius: 3,
              shadowOffset: { width: 0, height: 0 },
              shadowColor: "black",
              elevation: 5,
            }}
          >
            <View style={{ alignItems: "center" }}>
              <Text style={{ fontWeight: "bold", marginBottom: 10 }}>
                Current Power Status
              </Text>
              <FontAwesome name="power-off" size={120} color="red" />
              <Text
                style={{ fontWeight: "bold", marginBottom: 10, color: "red" }}
              >
                OFF
              </Text>
              <Text style={{ color: "orange" }}>
                Your Area is experiancing Outages
              </Text>
            </View>
          </View>
          <View style={{ width: "100%", marginBottom: "25%" }}>
            <Graph />
          </View>
        </ScrollView>
      </ImageBackground>
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#66D6AE",
  },
  image: {
    flex: 1,
  },
  halfbody: {
    flex: 2,
    backgroundColor: "#F1F6F7",
    borderTopRightRadius: Platform.OS === "ios" ? "20%" : 20,
    borderTopLeftRadius: Platform.OS === "ios" ? "20%" : 20,
    padding: 20,
  },
  Modal: {
    justifyContent: "center",
    padding: "5%",
    alignItems: "center",
    backgroundColor: "#000000aa",
    flex: 1,
    flexDirection: "column",
  },
  modal_body: {
    backgroundColor: "white",
    height: "50%",
    width: "90%",
    borderRadius: Platform.OS === "ios" ? "20%" : 20,
  },
  box: {
    backgroundColor: "white",
    height: 150,
    width: 150,
    marginHorizontal: 10,
    shadowOpacity: 0.1,
    shadowRadius: 3,
    shadowOffset: { width: 0, height: 0 },
    shadowColor: "black",
    elevation: 5,
    justifyContent: "center",
    alignItems: "center",
  },
  button: {
    borderWidth: 2,
    borderColor: "#FFB714",
    borderRadius: Platform.OS === "ios" ? "20%" : 20,
    width: "50%",
    marginTop: 5,
  },
});
