import { StyleSheet, Text, View, Button } from "react-native";
import React, { useContext } from "react";
import { AuthContext } from "../store/auth-context";

const Home = () => {
  const authCtx = useContext(AuthContext);
  return (
    <View>
      <Text>Home</Text>
      <Button title="Logout" onPress={() => authCtx.logout()} />
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({});
