import { View, Text, ActivityIndicator } from "react-native";
import React, { useContext } from "react";

import { NavigationContainer } from "@react-navigation/native";
import LoginNav from "./LoginNav";
import MainAppNav from "./MainAppNav";
import { AuthContext } from "../context/AuthContext";
import ProfilePage from "../Profile";

export default function AppNav() {
  const { isLoading, userToken } = useContext(AuthContext);

  if (isLoading) {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignContent: "center",
          backgroundColor: "#2c2c2e",
        }}
      >
        <ActivityIndicator
          size={"large"}
          color={"#B8F14A"}
          //   style={{ backgroundColor: "#0000 }}
        />
      </View>
    );
  }

  return (
    <NavigationContainer>
      {userToken !== null ? <MainAppNav /> : <LoginNav />}
    </NavigationContainer>
    // <ProfilePage />
  );
}
