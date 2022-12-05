import { StyleSheet, View } from "react-native";
import React, { useContext, useState, useEffect } from "react";
import { DrawerContentScrollView, DrawerItem } from "@react-navigation/drawer";
import {
  Avatar,
  Title,
  Caption,
  Paragraph,
  Drawer,
  Text,
  TouchableRipple,
  Switch,
} from "react-native-paper";
import { AuthContext } from "../../store/auth-context";
import {
  MaterialCommunityIcons,
  Entypo,
  MaterialIcons,
  AntDesign,
} from "@expo/vector-icons";
import ProfileContext from "../../store/profile-context";

const DrawerContent = (props) => {
  const authCtx = useContext(AuthContext);
  const profilecontext = useContext(ProfileContext);

  return (
    <View style={{ flex: 1 }}>
      <DrawerContentScrollView {...props}>
        <View style={styles.drawerContent}>
          <View style={styles.userInfoSection}>
            <View style={{ flexDirection: "row", marginTop: 15 }}>
              {profilecontext.pickedImagePath !== null ? (
                <Avatar.Image
                  size={50}
                  source={{
                    uri: `data:image/gif;base64,${profilecontext.pickedImagePath}`,
                  }}
                />
              ) : (
                <Avatar.Image
                  size={50}
                  source={require("../../assets/Userr.png")}
                />
              )}

              <View style={{ flexDirection: "column", marginLeft: 15 }}>
                <Title style={styles.title}>
                  {profilecontext.firstname + " " + profilecontext.lastname}
                </Title>
                <Caption style={styles.caption}>{profilecontext.email}</Caption>
              </View>
            </View>
          </View>
          <Drawer.Section style={styles.drawerSection}>
            <Drawer.Item
              icon={({ color, size }) => (
                <MaterialCommunityIcons
                  name="home-outline"
                  size={size}
                  color={color}
                />
              )}
              label="Home"
              onPress={() => {
                props.navigation.navigate("Home");
              }}
            />
            <Drawer.Item
              icon={({ color, size }) => (
                <AntDesign name="notification" size={size} color={color} />
              )}
              label="Manage Complaints"
              onPress={() => {
                props.navigation.navigate("Manage Complains");
              }}
            />
            <Drawer.Item
              icon={({ color, size }) => (
                <AntDesign name="paperclip" size={size} color={color} />
              )}
              label="Manage Accounts"
              onPress={() => {
                props.navigation.navigate("Manage Accounts");
              }}
            />
            <Drawer.Item
              icon={({ color, size }) => (
                <AntDesign name="barschart" size={size} color={color} />
              )}
              label="KE Stocks"
              onPress={() => {
                props.navigation.navigate("KE Stocks");
              }}
            />
            <Drawer.Item
              icon={({ color, size }) => (
                <MaterialCommunityIcons
                  name="account-outline"
                  size={size}
                  color={color}
                />
              )}
              label="Profile"
              onPress={() => {
                props.navigation.navigate("Profile");
              }}
            />
            <Drawer.Item
              icon={({ color, size }) => (
                <MaterialCommunityIcons
                  name="account-outline"
                  size={size}
                  color={color}
                />
              )}
              label="charts"
              onPress={() => {
                props.navigation.navigate("charts");
              }}
            />
          </Drawer.Section>
        </View>
      </DrawerContentScrollView>
      <Drawer.Section style={styles.bottomDrawerSection}>
        <Drawer.Item
          icon={({ color, size }) => (
            <MaterialCommunityIcons
              name="exit-to-app"
              size={size}
              color={color}
            />
          )}
          label="Sign Out"
          onPress={() => {
            authCtx.logout();
          }}
        />
      </Drawer.Section>
    </View>
  );
};

export default DrawerContent;

const styles = StyleSheet.create({
  drawerContent: {
    flex: 1,
  },
  userInfoSection: {
    paddingLeft: 20,
  },
  title: {
    fontSize: 16,
    marginTop: 3,
    fontWeight: "bold",
  },
  caption: {
    fontSize: 14,
    lineHeight: 14,
  },
  row: {
    marginTop: 20,
    flexDirection: "row",
    alignItems: "center",
  },
  section: {
    flexDirection: "row",
    alignItems: "center",
    marginRight: 15,
  },
  paragraph: {
    fontWeight: "bold",
    marginRight: 3,
  },
  drawerSection: {
    marginTop: 15,
  },
  bottomDrawerSection: {
    marginBottom: 15,
    borderTopColor: "#f4f4f4",
    borderTopWidth: 1,
  },
  preference: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
});
