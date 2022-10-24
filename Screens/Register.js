import { StyleSheet, Text, View } from "react-native";
import React, { useContext, useState } from "react";
import RegisterForm from "../components/forms/RegisterForm";
import { AuthContext } from "../store/auth-context";
import LoadingOverlay from "../components/ui/LoadingOverlay";

const Register = () => {
  const [isAuthentication, setAuthentication] = useState(false);
  const authCtx = useContext(AuthContext);
  async function registerHandler({
    firstname,
    lastname,
    email,
    password,
    cnic,
  }) {
    setAuthentication(true);
    try {
      Alert.alert("Email:" + email + " Passsword:" + password + "Cnic:" + cnic);
      // const token = await createUser({
      //   firstname,
      //   lastname,
      //   email,
      //   password,
      //   cnic,
      // });
      authCtx.authenticate(token);
    } catch (error) {
      Alert.alert("Sign Up Failed", error.response.data);
      setAuthentication(false);
    }
  }
  if (isAuthentication) {
    return <LoadingOverlay message="Creating User ..." />;
  }
  return <RegisterForm onAuthenticate={registerHandler} />;
};

export default Register;

const styles = StyleSheet.create({});
