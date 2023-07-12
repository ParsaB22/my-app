import React, { useState } from "react";
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  TouchableHighlight,
  TextInput,
  ScrollView,
  Button,
} from "react-native";

//i think just need to fetch from database to check if username exists
//so probably need a function here for the onPress the Login button that handles that
export default function Login({ navigation }) {
  const [userVal, setUserVal] = useState("");
  const [passVal, setPassVal] = useState("");

  return (
    <SafeAreaView style={styles.container}>
      <View>
        <ScrollView>
          <View style={styles.circle} />
          {/*Remove after have logo */}
          <Text style={styles.logoname}>GYM APP NAME</Text>
          <Text style={styles.userText}>Username</Text>
          <TextInput
            onChangeText={(val) => setUserVal(val)}
            placeholder="Ex. John Doe"
            style={styles.inp}
          />
          <Text style={styles.userText}>Password</Text>
          <TextInput
            onChangeText={(val) => setPassVal(val)}
            style={styles.inp}
            placeholder="Ex. $Password123"
            secureTextEntry={true}
          />
          <TouchableOpacity onPress={() => {}} style={styles.button}>
            <Text style={styles.paragraph}>Login</Text>
          </TouchableOpacity>
          <TouchableOpacity>
            {/**has width of screen need to fix */}
            <Text
              onPress={() => {
                navigation.navigate("ForgotPassword");
              }}
              style={styles.forgot}
            >
              Forgot Password
            </Text>
          </TouchableOpacity>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignContent: "center",
    backgroundColor: "#2C2C2E",
  },
  inp: {
    marginTop: 7,
    backgroundColor: "#FFFFFF",
    borderRadius: 50,
    marginLeft: 50,
    marginRight: 50,
    paddingLeft: 20,
    padding: 15,
    fontSize: 15,
  },
  userText: {
    marginTop: 10,
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    color: "#B8F14A",
  },
  button: {
    marginTop: 40,
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
  logoname: {
    fontSize: 36,
    fontWeight: "bold",
    textAlign: "center",
    color: "#B8F14A",
  },
  forgot: {
    marginTop: 20,
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
    color: "#FFFFFF",
  },
  circle: {
    height: 150,
    width: 150,
    backgroundColor: "#B8F14A",
    borderWidth: 10,
    borderColor: "#000000",
    margin: 20,
    borderRadius: 200,
    alignSelf: "center",
  },
});
