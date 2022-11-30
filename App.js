import { StatusBar } from "expo-status-bar";
import { ImageBackground, StyleSheet, Text, View, Image } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import * as SecureStore from "expo-secure-store";
import AuthContextProvider, { AuthContext } from "./store/auth-context";
import React, { useContext, useEffect, useState } from "react";
import * as SplashScreen from "expo-splash-screen";
import ProfileContext from "./store/profile-context";
import { GetDetails } from "./utils/auth";

//screens
import Login from "./Screens/Login";
import Register from "./Screens/Register";
import Reset from "./Screens/Reset";
import Home from "./Screens/Home";
import Drawer_nav from "./components/navigation/Drawer_nav";
import WrongReading from "./components/forms/WrongReading";
import Complain from "./Screens/Complain";
import FaultyMeter from "./components/forms/FaultyMeter";
import Wrong_Bill from "./components/forms/Wrong_Bill";
import VoltageComplaint from "./components/forms/VoltageComplaint";
import Supplyoff from "./components/forms/Supplyoff";
import PhaseComplaint from "./components/forms/PhaseComplaint";
import axios from "axios";

const Stack = createNativeStackNavigator();

function AuthStack() {
  return (
    <Stack.Navigator
      initialRouteName="Login"
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="Register" component={Register} />
      <Stack.Screen name="Reset" component={Reset} />
    </Stack.Navigator>
  );
}
function AuthenticatedStack() {
  const authCtx = useContext(AuthContext);
  const token = authCtx.token;
  const [Is_data, SetIs_data] = useState(true);
  const [imageset, setimageset] = useState(true);
  const [email, setEmail] = useState("");
  const [check, setcheck] = useState("");
  const [pickedImagePath, setPickedImagePath] = useState(null);
  const [firstname, setfirstname] = useState("");
  const [lastname, setlastname] = useState("");
  const [contactno, setcontactno] = useState("");
  const [cnic, setcnic] = useState("");
  const imagesettings = {
    imageset,
    setimageset,
    firstname,
    setfirstname,
    lastname,
    setlastname,
    contactno,
    setcontactno,
    email,
    setEmail,
    check,
    setcheck,
    pickedImagePath,
    setPickedImagePath,
    Is_data,
    SetIs_data,
    cnic,
    setcnic,
  };
  const integratee = async () => {
    try {
      const response = await GetDetails(token);
      const temp = response.data[0];
      console.log(temp);
      setfirstname(temp.first_name);
      setlastname(temp.last_name);
      if (temp.contactno === undefined) {
        setcontactno("");
      } else {
        setcontactno(temp.contactno);
      }

      setEmail(temp.email);
      setcnic(temp.cnic);
      setPickedImagePath(temp.photo);
    } catch (error) {
      console.log(error.response.data.msg);
    }
  };
  useEffect(() => {
    integratee();
  }, []);

  return (
    <ProfileContext.Provider value={imagesettings}>
      <Stack.Navigator
        initialRouteName="Drawer_nav"
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen name="Drawer_Nav" component={Drawer_nav} />
        <Stack.Screen name="WrongReading" component={WrongReading} />
        <Stack.Screen name="FaultyMeter" component={FaultyMeter} />
        <Stack.Screen name="Wrong_Bill" component={Wrong_Bill} />
        <Stack.Screen name="Complain" component={Complain} />
        <Stack.Screen name="Volatge" component={VoltageComplaint} />
        <Stack.Screen name="Phase" component={PhaseComplaint} />
        <Stack.Screen name="Supply" component={Supplyoff} />
      </Stack.Navigator>
    </ProfileContext.Provider>
  );
}

function Navigation() {
  const authCtx = useContext(AuthContext);
  return (
    <NavigationContainer>
      {!authCtx.isAuthenticated && <AuthStack />}
      {authCtx.isAuthenticated && <AuthenticatedStack />}
    </NavigationContainer>
  );
}

function Root() {
  const [isTryingLogin, SetIsTryingLogin] = useState(true);
  const authCtx = useContext(AuthContext);
  useEffect(() => {
    async function fetchToken() {
      const storedToken = await SecureStore.getItemAsync("token");
      if (storedToken) {
        authCtx.authenticate(storedToken);
      }
      SetIsTryingLogin(false);
      await SplashScreen.hideAsync();
    }
    fetchToken();
  }, []);

  if (isTryingLogin) {
    SplashScreen.preventAutoHideAsync();
  }
  return <Navigation />;
}

export default function App() {
  return (
    <>
      <StatusBar style="auto" />
      <AuthContextProvider>
        <Root />
      </AuthContextProvider>
    </>
  );
}

const styles = StyleSheet.create({});
