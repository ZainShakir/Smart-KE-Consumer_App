import React, { useState, useContext, useEffect } from "react";
import {
  View,
  Text,
  Pressable,
  SafeAreaView,
  Button,
  ActivityIndicator,
  Modal,
  StyleSheet,
  ScrollView,
} from "react-native";
// import AppContext from "./AppContext";
import { Avatar, TextInput } from "react-native-paper";
import * as ImagePicker from "expo-image-picker";
import { Platform } from "react-native";
import ProfileContext from "../store/profile-context";
import {
  MaterialCommunityIcons,
  Entypo,
  MaterialIcons,
} from "@expo/vector-icons";

const Profile = ({ navigation }) => {
  const edit = async () => {
    // console.log(new Date().toString());
    // await axios
    //   .patch(
    //     `https://crowd-funding-api.herokuapp.com/profile/editprofile/'sm0076@gmail.com'`,
    //     {
    // profilecontext.setname(name);
    profilecontext.setcontactno(contactno);
    profilecontext.setpassword(password);
    //   }
    // )
    // .then(function (response) {
    //   console.log(new Date().toString());
    //   // console.log(firstname);
    //   // console.log(lastname);
    //   alert(response.data);
    // })
    // .catch(function (error) {
    //   console.log(error);
    // });
  };
  // const edit_image = async () => {
  //   await axios
  //     .patch(
  //       `https://crowd-funding-api.herokuapp.com/profile/editprofile/'sm0076@gmail.com'`,
  //       {
  //         image: profilecontext.pickedImagePath,
  //       }
  //     )
  //     .then(function (response) {
  //       alert(response.data);
  //     })
  //     .catch(function (error) {
  //       console.log(error);
  //     });
  // };
  useEffect(() => {
    setfirstname(profilecontext.firstname);
    setcontactno(profilecontext.contactno);
    setcnic(profilecontext.cnic);
    setpassword(profilecontext.password);
    setEmail(profilecontext.email);
  }, []);
  useEffect(() => {}, [errprompt]);
  const [credentialsInvalid, setCredentialsInvalid] = useState({
    fname: false,
    lname: false,
    contact: false,
    pass: false,
    cpass: false,
  });
  const profilecontext = useContext(ProfileContext);
  const [firstname, setfirstname] = useState("");
  const [lastname, setlastname] = useState("");
  const [email, setEmail] = useState("");
  const [text, settext] = useState(true);
  const [contactno, setcontactno] = useState("");
  const [password, setpassword] = useState("");
  const [cnic, setcnic] = useState("");
  const [conpass, setconpass] = useState("");
  const [errprompt, seterrprompt] = useState({});
  const [sec, setsecure] = useState(true);

  const showImagePicker = async () => {
    profilecontext.setimageset(true);
    profilecontext.setPickedImagePath(null);
    const permissionResult =
      await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (permissionResult.granted === false) {
      alert("You've refused to allow this appp to access your photos!");
      return;
    }
    const result = await ImagePicker.launchImageLibraryAsync();
    if (!result.cancelled) {
      profilecontext.setPickedImagePath(result);
    }
  };
  function checkcredentials(e1, e2, e3, e4, e5) {
    var errors = {};
    const fnamenot = e1 === "";
    const lnamenot = e2 === "";
    const connot = e3.lenght !== 11 || e3 === "";
    const passnot = e4 === "" || (e4.length < 8 && e4.length > 15);
    const cpassnot = e4 !== e5;
    if (e1 === "") {
      errors.firstname = "FirstName is required";
      settext(false);
    }
    if (e2 === "") {
      errors.lastname = "LastName is required";
      settext(false);
    }
    if (e3.lenght !== 11) {
      errors.contactno = "contact number must be 11 numbers";
      settext(false);
    } else if (e3 === "") {
      errors.contactno = "Contact number is required";
      settext(false);
    }
    if (e4 === "") {
      errors.password = "Password is required";
      settext(false);
    } else if (e4.length < 8 && e4.length > 15) {
      errors.password = "Password length should be between 8 and 15";
      settext(false);
    } else if (e4 !== e5) {
      errors.conpass = "Password didnt match";
      settext(false);
    }
    setCredentialsInvalid({
      fname: fnamenot,
      lname: lnamenot,
      contact: connot,
      pass: passnot,
      cpass: cpassnot,
    });
    return errors;
  }
  const submit = () => {
    settext(true);
    seterrprompt(
      checkcredentials(firstname, lastname, contactno, password, conpass)
    );
    console.log(credentialsInvalid);
    if (text) {
      edit();
    }
    // settext(true);
  };
  const [show, setshow] = useState(false);
  return (
    <SafeAreaView style={styles.container}>
      <Pressable
        onPress={() => navigation.toggleDrawer()}
        style={styles.drawer_icon}
      >
        <Entypo name="menu" size={26} color="black" />
      </Pressable>
      <View style={{ flex: 0.4, alignItems: "center", marginTop: "4%" }}>
        {profilecontext.pickedImagePath !== null ? (
          <Avatar.Image size={100} source={profilecontext.pickedImagePath} />
        ) : (
          <Avatar.Image size={100} source={require("../assets/Userr.png")} />
        )}
        <Pressable onPress={() => setshow(true)}>
          <Text
            style={{
              color: "#FFB714",
              marginTop: "5%",
              fontWeight: "bold",
              fontSize: 15,
            }}
          >
            Change Profile Photo
          </Text>
        </Pressable>
      </View>
      <ScrollView
        alwaysBounceVertical={false}
        keyboardShouldPersistTaps={"never"}
        style={{
          flex: 1,
          backgroundColor: "#ffffff",
          borderTopWidth: 1,
          borderColor: "#dcdcdc",
        }}
      >
        <View style={styles.row}>
          <Text style={{ marginLeft: "3%", fontSize: 17 }}>First Name : </Text>
          <TextInput
            value={firstname}
            onChangeText={(element) => {
              setfirstname(element);
            }}
            placeholder="Enter First Name"
            style={styles.textinput}
            activeUnderlineColor={"black"}
          />
        </View>
        {credentialsInvalid.fname ? (
          <View style={{ marginLeft: "30%", marginTop: "1%" }}>
            <Text style={{ color: "red", fontSize: 14, fontWeight: "bold" }}>
              {errprompt.firstname}
            </Text>
          </View>
        ) : null}
        <View style={styles.row}>
          <Text style={{ marginLeft: "3%", fontSize: 17 }}>Last Name : </Text>
          <TextInput
            activeOutlineColor={"black"}
            value={lastname}
            onChangeText={(element) => {
              setlastname(element);
            }}
            placeholder="Enter Last Name"
            style={styles.textinput}
            activeUnderlineColor={"black"}
          />
        </View>
        {credentialsInvalid.lname ? (
          <View style={{ marginLeft: "30%", marginTop: "1%" }}>
            <Text style={{ color: "red", fontSize: 14, fontWeight: "bold" }}>
              {errprompt.lastname}
            </Text>
          </View>
        ) : null}
        <View style={styles.row}>
          <Text style={{ marginLeft: "3%", fontSize: 17 }}>Contact No: </Text>
          <TextInput
            value={contactno}
            onChangeText={(element) => {
              setcontactno(element);
            }}
            placeholder="Enter Contact Number"
            style={styles.textinput}
          />
        </View>
        {credentialsInvalid.contact ? (
          <View style={{ marginLeft: "30%", marginTop: "1%" }}>
            <Text style={{ color: "red", fontSize: 14, fontWeight: "bold" }}>
              {errprompt.contactno}
            </Text>
          </View>
        ) : null}
        <View style={styles.row}>
          <Text style={{ marginLeft: "3%", fontSize: 17 }}>Password : </Text>
          <TextInput
            value={password}
            secureTextEntry={sec}
            onChangeText={(element) => {
              setpassword(element);
            }}
            placeholder="Enter Password"
            style={styles.textinput}
            right={
              sec ? (
                <TextInput.Icon
                  name="eye"
                  onPress={() => {
                    setsecure(!sec);
                    return false;
                  }}
                />
              ) : (
                <TextInput.Icon
                  name="eye-off"
                  onPress={() => {
                    setsecure(!sec);
                    return false;
                  }}
                />
              )
            }
          />
        </View>
        {credentialsInvalid.pass ? (
          <View style={{ marginLeft: "30%", marginTop: "1%" }}>
            <Text style={{ color: "red", fontSize: 14, fontWeight: "bold" }}>
              {errprompt.password}
            </Text>
          </View>
        ) : null}
        <View style={styles.row}>
          <Text style={{ marginLeft: "3%", fontSize: 17 }}>
            Confirm Password :
          </Text>
          <TextInput
            value={conpass}
            secureTextEntry={true}
            onChangeText={(element) => {
              setconpass(element);
            }}
            placeholder="Confirm Password"
            style={{
              backgroundColor: "#ffffff",
              width: "60%",
              height: 40,
              paddingLeft: 10,
            }}
            right={
              sec ? (
                <TextInput.Icon
                  name="eye"
                  onPress={() => {
                    setsecure(!sec);
                    return false;
                  }}
                />
              ) : (
                <TextInput.Icon
                  name="eye-off"
                  onPress={() => {
                    setsecure(!sec);
                    return false;
                  }}
                />
              )
            }
          />
        </View>
        {credentialsInvalid.cpass ? (
          <View style={{ marginLeft: "30%", marginTop: "1%" }}>
            <Text style={{ color: "red", fontSize: 14, fontWeight: "bold" }}>
              {errprompt.conpass}
            </Text>
          </View>
        ) : null}
        <View style={styles.row}>
          <Text style={{ marginLeft: "3%", fontSize: 17 }}>CNIC : </Text>
          <Text
            style={[
              styles.textinput,
              {
                fontSize: 16,
                color: "#708090",
                paddingTop: "3%",
              },
            ]}
          >
            {cnic}
          </Text>
        </View>
        <View style={styles.row}>
          <Text style={{ marginLeft: "3%", fontSize: 17 }}>Email : </Text>
          <Text
            style={[
              styles.textinput,
              {
                fontSize: 16,
                color: "#708090",
                paddingTop: "3%",
              },
            ]}
          >
            {email}
          </Text>
        </View>
        <View style={styles.divider} />
        <Pressable
          style={{
            width: "50%",
            alignItems: "center",
            alignSelf: "center",
          }}
          onPress={() => {
            submit();
          }}
        >
          <Text
            style={{
              color: "#FFB714",
              marginTop: "3%",
              fontWeight: "bold",
              fontSize: 17,
            }}
          >
            SUBMIT
          </Text>
        </Pressable>
      </ScrollView>

      <Modal visible={show} animationType="fade" transparent={true}>
        <View style={styles.modal_body}>
          <View style={styles.body1}>
            <View style={{ alignItems: "center", marginTop: "5%" }}>
              {profilecontext.pickedImagePath !== null ? (
                <Avatar.Image
                  size={100}
                  source={profilecontext.pickedImagePath}
                />
              ) : (
                <Avatar.Image
                  size={100}
                  source={require("../assets/Userr.png")}
                />
              )}
            </View>
            <View style={{ alignItems: "center", marginTop: "4%" }}>
              <Text
                style={{
                  fontWeight: "bold",
                  fontFamily: Platform.OS === "ios" ? "Arial" : "serif",
                  fontSize: 14,
                }}
              >
                Synced Profile Photo
              </Text>
            </View>
            <Pressable
              style={styles.button}
              onPress={() => {
                profilecontext.setimageset(false);
                profilecontext.setPickedImagePath(null);
              }}
            >
              <Text style={styles.text}>Remove Photo</Text>
            </Pressable>
            <Pressable
              style={{
                backgroundColor: "#20BA84",
                height: "23%",
                borderColor: "#dcdcdc",
                justifyContent: "center",
              }}
              onPress={showImagePicker}
            >
              <Text style={styles.text}>Upload Photo</Text>
            </Pressable>
          </View>
          <Pressable
            style={{
              borderRadius: 9,
              marginHorizontal: "5%",
              marginBottom: "2%",
              height: "5.5%",
              backgroundColor: "#F0984A",
              justifyContent: "center",
            }}
            onPress={() => edit_image()}
          >
            <Text style={styles.text}>Save</Text>
          </Pressable>
          <Pressable
            style={{
              backgroundColor: "#ffffff",
              borderRadius: 10,
              marginHorizontal: "5%",
              marginBottom: "3%",
              height: "5%",
            }}
            onPress={() => setshow(false)}
          >
            <Text
              style={{
                fontWeight: "normal",
                fontFamily: Platform.OS === "ios" ? "Arial" : "serif",
                fontSize: 18,
                textAlign: "center",
                marginTop: "1.5%",
              }}
            >
              Cancel
            </Text>
          </Pressable>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

export default Profile;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
  },
  drawer_icon: {
    position: "absolute",
    marginHorizontal: "4%",
    marginTop: "6%",
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: "4%",
  },
  textinput: {
    marginLeft: "8%",
    backgroundColor: "#ffffff",
    width: "60%",
    height: 40,
    paddingLeft: 10,
  },
  divider: {
    marginTop: "2%",
    marginBottom: "5%",
    borderTopWidth: 1,
    borderColor: "#dcdcdc",
  },
  modal_body: {
    backgroundColor: "#000000aa",
    flex: 1,
    flexDirection: "column",
  },
  body1: {
    marginHorizontal: "5%",
    marginTop: "83%",
    marginBottom: "8%",
    backgroundColor: "#ffffff",
    borderRadius: 9,
    flex: 4,
  },
  button: {
    backgroundColor: "#20BA84",
    height: "23%",
    borderColor: "#dcdcdc",
    borderTopWidth: 1,
    borderBottomWidth: 1,
    marginTop: "5%",
    justifyContent: "center",
  },
  text: {
    fontWeight: "normal",
    fontFamily: Platform.OS === "ios" ? "Arial" : "serif",
    fontSize: 18,
    textAlign: "center",
    // marginTop: "5.5%",
    color: "#f5f5f5",
  },
});
