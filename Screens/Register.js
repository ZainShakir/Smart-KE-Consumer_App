import { StyleSheet, Text, View } from "react-native";
import React from "react";
import RegisterForm from "../components/forms/RegisterForm";

const Register = () => {
  async function registerHandler({
    firstname,
    lastname,
    email,
    password,
    cnic,
  }) {
    try {
      const token = await createUser({
        firstname,
        lastname,
        email,
        password,
        cnic,
      });
    } catch (error) {
      Alert.alert("Sign Up Failed", error.response.data);
    }
  }
  return <RegisterForm onAuthenticate={registerHandler} />;
};

export default Register;

const styles = StyleSheet.create({});
