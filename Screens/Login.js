import { StatusBar } from "expo-status-bar";
import {
  ImageBackground,
  StyleSheet,
  Text,
  View,
  Image,
  Alert,
} from "react-native";
import Input_paper from "../components/ui/Input_paper";
import Flat_button from "../components/ui/Flat_button";
import React, { useContext, useState } from "react";
import { useFonts } from "expo-font";
import Button from "../components/ui/Button";
import LoginForm from "../components/forms/LoginForm";
import { AuthContext } from "../store/auth-context";
import LoadingOverlay from "../components/ui/LoadingOverlay";
const Login = () => {
  const authCtx = useContext(AuthContext);
  const [isAuthentication, setAuthentication] = useState(false);
  async function loginHandler({ email, password }) {
    setAuthentication(true);
    try {
      Alert.alert("Email:" + email + " Passsword:" + password);
      // const token = await loginUser(email, password);
    } catch (error) {
      Alert.alert("Login Failed", error.response.data);
      setAuthentication(false);
    }
  }
  if (isAuthentication) {
    return <LoadingOverlay message="Loggin you in ..." />;
  }
  return <LoginForm onAuthenticate={loginHandler} />;
};

export default Login;

const styles = StyleSheet.create({});
