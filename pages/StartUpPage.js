import React from "react";
import {
  Text,
  View,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { SvgUri, SvgXml } from "react-native-svg";

// add logo and name
export default function StartUp({ navigation }) {
  return (
    <View style={styles.container}>
      <View style={styles.logobox}>
        <SvgUri source={require("../assets/OmniMatrix.svg")} />
        <Text style={styles.logoname}>GYM APP NAME</Text>
      </View>
      <Text style={styles.colorWhite}>Welcome</Text>
      <TouchableOpacity
        onPress={() => {
          navigation.navigate("Login");
        }}
        style={styles.button}
      >
        {/* change to touchableHightlight if wanting to change onclick color*/}
        <Text style={styles.paragraph}>Login</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => {
          navigation.navigate("Register");
        }}
        style={styles.button}
      >
        <Text style={styles.paragraph}>Sign Up</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  logobox: {
    height: 450,
    backgroundColor: "#B8F14A",
    padding: 30,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    justifyContent: "flex-end",
    alignItems: "center",
  },
  container: {
    flex: 1,
    // justifyContent: 'center',
    backgroundColor: "#2C2C2E",
  },
  button: {
    marginTop: 20,
    backgroundColor: "#B8F14A",
    borderRadius: 50,
    marginLeft: 50,
    marginRight: 50,
  },
  paragraph: {
    margin: 20,
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
  },
  colorWhite: {
    marginTop: 20,
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
    color: "#FFFFFF",
  },
  logoname: {
    fontSize: 30,
    fontWeight: "bold",
    textAlign: "center",
    color: "#000000",
    bottom: 0,
  },
  circle: {
    height: 200,
    width: 200,
    backgroundColor: "#B8F14A",
    borderWidth: 20,
    borderColor: "#000000",
    padding: 30,
    margin: 30,
    justifyContent: "flex-end",
    borderRadius: 200,
  },
});
