import { StatusBar } from "expo-status-bar";
import { ImageBackground, StyleSheet, Text, View, Image } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import * as SecureStore from "expo-secure-store";
import AuthContextProvider, { AuthContext } from "./store/auth-context";
import { useContext, useEffect, useState } from "react";
import * as SplashScreen from "expo-splash-screen";

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
  return (
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
    </Stack.Navigator>
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
