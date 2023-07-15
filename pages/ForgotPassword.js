import { useState } from "react";
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  TouchableHighlight,
  TextInput,
  ScrollView,
  StatusBar,
  Platform,
} from "react-native";
import { validateEmail } from "./Register";
import BackButt from "../components/BackButton";

//check if email is associated with an account retrieve account
//have onPress take email from emailValue and send Email to it and then Navigate to next page('PasswordCode')

export default function ForgotPassword({ navigation }) {
  const [emailValue, setEmail] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [validState, setValidState] = useState(false);
  //handle if email is good

  const handleEmail = async () => {
    // Validate the entered values
    if (emailValue === "") {
      // Display fill fields
      setValidState(true);
      setErrorMessage("Please fill in Email fields");
      console.log("Please fill in all Email fields");
      return;
    }

    if (validateEmail(emailValue) === false) {
      // Invalid email
      setValidState(true);
      setErrorMessage("Invalid Email");
      console.log("Invalid email");
      return;
    }
    navigation.navigate("PasswordCode", { email: emailValue });
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView scrollEnabled={false}>
        <View style={styles.box}>
          {/*will be a box for now*/}
          <BackButt navigation={navigation} />

          <View style={styles.mail} />
        </View>
        <Text style={styles.forgotText}>Forgot Password?</Text>
        <Text style={styles.dirText}>
          Enter the email associated with your account. We will send you a 4
          digit code.
        </Text>
        <Text style={styles.userText}>Email</Text>
        <TextInput
          placeholder="Enter Your Email Here"
          placeholderTextColor="#FFFFFF"
          style={styles.inp}
          onChangeText={(val) => setEmail(val)}
        />
        <View style={validState ? { marginTop: 15 } : { marginTop: 40 }}>
          {validState && (
            <View>
              <Text style={[styles.invalid, { marginBottom: 5 }]}>
                {errorMessage}
              </Text>
            </View>
          )}
          <TouchableOpacity onPress={handleEmail} style={styles.button}>
            <Text style={styles.paragraph}>Send</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // justifyContent: 'center',
    // alignContent:'center',
    backgroundColor: "#2C2C2E",
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
  },
  inp: {
    marginTop: 7,
    backgroundColor: "#2C2C2E",
    borderRadius: 20,
    borderWidth: 3,
    borderColor: "#757575",
    marginLeft: 30,
    marginRight: 30,
    paddingLeft: 20,
    padding: 10,
    fontSize: 15,
    textAlign: "center",
    color: "#FFFFFF",
  },
  forgotText: {
    marginTop: 20, //change distance
    fontSize: 36,
    fontWeight: "bold",
    textAlign: "center",
    color: "#FFFFFF",
  },
  userText: {
    marginTop: 10,
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    color: "#B8F14A",
  },
  dirText: {
    margin: 10,
    marginLeft: 30,
    marginRight: 30,
    fontSize: 16,
    // fontWeight: 'bold',
    textAlign: "center",
    color: "#FFFFFF",
  },
  button: {
    // marginTop: 30,
    marginBottom: 15,
    backgroundColor: "#B8F14A",
    borderRadius: 10,
    marginLeft: 75,
    marginRight: 75,
  },
  paragraph: {
    margin: 20,
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
  },
  textButt: {
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
    color: "#FFFFFF",
  },
  box: {
    height: 200,
    backgroundColor: "#B8F14A",
    // marginBottom:100,
  },
  mail: {
    height: 150,
    width: 200,
    backgroundColor: "#B8F14A",
    borderWidth: 10,
    borderColor: "#000000",
    margin: 20,
    alignSelf: "center",
  },
  invalid: {
    // marginTop: 10,
    padding: 5,
    fontSize: 12,
    fontWeight: "bold",
    textAlign: "center",
    color: "#FF0000",
  },
});
