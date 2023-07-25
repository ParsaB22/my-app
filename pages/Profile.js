//profile
import { StatusBar } from "expo-status-bar";
import React, { useContext, useState, useEffect } from "react";
import {
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  View,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import { AuthContext } from "./context/AuthContext";
import AsyncStorage from "@react-native-async-storage/async-storage";

const ProfilePage = () => {
  const { logout } = useContext(AuthContext);

  const [userData, setUserData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [pw, setPW] = useState("");
  const [email, setEmail] = useState("");

  const getUserData = async () => {
    try {
      const _ud = await AsyncStorage.getItem("user_data");
      console.log(_ud);
      const ud = JSON.parse(_ud);
      //set
      setUserData(ud);
      setIsLoading(false);

      console.log("ud: " + ud);
      console.log(userData);
      // setName(userData.firstName + " " + userData.lastName);
      // setUsername(userData.userNamer)
      // setEmail(userData.email);
    } catch (error) {
      console.error("Error retrieving user data:", error);
    }
  };
  // getUserData();
  useEffect(() => {
    getUserData();
  }, []);

  useEffect(() => {
    // After fetching the user data, set the values for name, username, pw, and email
    if (userData) {
      setName(userData.firstName + " " + userData.lastName);
      // setUsername(userData.username);
      // setPW(userData.pw);
      setEmail(userData.email);
      console.log(userData);
    }
  }, [userData]);

  if (isLoading) {
    return (
      <View
        style={{ flex: 1, justifyContent: "center", alignContent: "center" }}
      >
        <ActivityIndicator size={"large"} />
      </View>
    );
  }

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.container}>
        <View style={styles.circle} />
        <View style={styles.profile} />
        <View style={styles.navBar} />

        <TextInput
          style={styles.firstEntryBox}
          placeholder="Full Name"
          placeholderTextColor="white"
          textAlign="center"
          onChangeText={(val) => setName(val)}
          value={name}
          color="white"
        />

        <TextInput
          style={styles.secondEntryBox}
          placeholder="Username"
          placeholderTextColor="white"
          textAlign="center"
          onChangeText={(val2) => setUsername(val2)}
          value={username}
          color="white"
        />

        <TextInput
          style={styles.thirdEntryBox}
          placeholder="Password"
          placeholderTextColor="white"
          textAlign="center"
          onChangeText={(val3) => setPW(val3)}
          value={pw}
          color="white"
        />

        <TextInput
          style={styles.fourthEntryBox}
          placeholder="Email"
          placeholderTextColor="white"
          textAlign="center"
          onChangeText={(val4) => setEmail(val4)}
          value={email}
          color="white"
        />

        <View style={styles.signOut} />

        <TouchableOpacity onPress={() => logout()} style={styles.button}>
          <Text style={styles.buttonText}>Sign Out</Text>
        </TouchableOpacity>

        <Text style={styles.additionalText}>
          {userData.firstName + " " + userData.lastName}
        </Text>
        <View style={styles.poo} />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "#1e1e1e",
    // justifyContent: "center",
  },
  circle: {
    width: 470,
    height: 470,
    bottom: 240,
    borderRadius: 470,
    backgroundColor: "#B8F14A",
    transform: [{ scaleX: 1.2 }],
  },
  profile: {
    width: 150,
    height: 150,
    borderRadius: 150,
    bottom: 305,
    backgroundColor: "#1e1e1e",
    shadowColor: "#000",
    shadowOffset: { width: 2, height: 2 },
    shadowOpacity: 0.5,
    shadowRadius: 4,
  },
  navBar: {
    width: 500,
    height: 92,
    top: 170,
    backgroundColor: "#1e1e1e1",
  },
  firstEntryBox: {
    width: 332,
    height: 56,
    bottom: 365,
    borderRadius: 20,
    borderWidth: 3,
    borderColor: "#757575",
  },
  secondEntryBox: {
    width: 332,
    height: 56,
    bottom: 348,
    borderRadius: 20,
    borderWidth: 3,
    borderColor: "#757575",
  },
  thirdEntryBox: {
    width: 332,
    height: 56,
    bottom: 331,
    borderRadius: 20,
    borderWidth: 3,
    borderColor: "#757575",
  },

  fourthEntryBox: {
    width: 332,
    height: 56,
    bottom: 314,
    borderRadius: 20,
    borderWidth: 3,
    borderColor: "#757575",
  },

  button: {
    width: 217,
    height: 60,
    borderRadius: 10,
    backgroundColor: "#B8F14A",
    bottom: 259,
  },

  buttonText: {
    textAlign: "center",
    textAlignVertical: "center",
    top: 9,
    color: "black",
    fontSize: 32,
    fontWeight: "bold",
  },

  additionalText: {
    textAlign: "center",
    color: "black",
    fontSize: 40,
    fontWeight: "bold",
    bottom: 950,
  },
});

export default ProfilePage;
