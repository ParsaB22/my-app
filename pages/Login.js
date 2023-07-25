import React, { useState, useContext } from "react";
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
import BackButt from "../components/BackButton";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { AuthContext } from "./context/AuthContext";

//i think just need to fetch from database to check if username exists
//so probably need a function here for the onPress the Login button that handles that
export default function Login({ navigation }) {
  const { login } = useContext(AuthContext);

  const [userVal, setUserVal] = useState("");
  const [passVal, setPassVal] = useState("");

  const [errorMessage, setErrorMessage] = useState("");
  const [validState, setValidState] = useState(false);

  const [message, setMessage] = useState("");

  let bp = require("../components/Path.js");
  var storage = require("../tokenStorage.js");

  const doLogin = async (event) => {
    var obj = { login: userVal, password: passVal };
    var js = JSON.stringify(obj);
    console.log(js);

    try {
      // const response = await fetch("http://localhost:5000/api/login", {
      const response = await fetch(bp.buildPath("api/login"), {
        method: "POST",
        body: js,
        headers: { "Content-Type": "application/json" },
      });

      console.log();
      var res = JSON.parse(await response.text());
      console.log(res);

      if (res.id <= 0) {
        setValidState(true);
        setErrorMessage("User/Password combination incorrect");
        console.log("User/Password combination incorrect");
        return;
      } else {
        // console.log(res.accessToken);
        storage.storeToken(res);

        let userId = res.id;
        let firstName = res.fn;
        let lastName = res.ln;
        let userName = res.un;
        let password = res.pw;
        let email = res.em;
        // console.log(res.em);

        var user = {
          firstName: res.fn,
          lastName: res.ln,
          id: res.id,
          userName: res.un,
          password: res.pw,
          email: res.em,
        };
        // console.log(user);

        await AsyncStorage.setItem("user_data", JSON.stringify(user));

        setMessage("");
        // window.location.href = '/cards';
        login();
      }
    } catch (e) {
      console.log(e.toString());
      // alert(e.toString());
      return;
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <BackButt navigation={navigation} />

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
          <TouchableOpacity
            onPress={() => {
              doLogin();
              //login();
            }}
            style={styles.button}
          >
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
