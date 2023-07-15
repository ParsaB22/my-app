import { useState, useEffect } from "react";
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  TouchableHighlight,
  TextInput,
  Platform,
  StatusBar,
} from "react-native";
import {
  sendVerificationEmail,
  generateRandomNumber,
} from "./EmailVerification";
import BackButt from "../components/BackButton";

//somehow store the code the was sent to email.
//have onPress for Verify button handle if the code from email matches user input let them change their password
//maybe also get the user associated with the email for next step in setting the new password.
//also make resend code button send another different email code then update emailCode to store new real code.

export default function PasswordCode({ navigation, route }) {
  const { email } = route.params;
  const [verificationCode, setVerificationCode] = useState(
    generateRandomNumber()
  );
  const [userInputCode, setUserInputCode] = useState("");

  // console.log(verificationCode);

  const [errorMessage, setErrorMessage] = useState("");
  const [validState, setValidState] = useState(false);
  // console.log(email);

  // Send the verification email when page loads
  useEffect(() => {
    sendVerificationEmail(email, verificationCode, "template_dwgx14q");
  }, []);

  // Function to resend a different verification code
  const handleResendCode = () => {
    setVerificationCode(generateRandomNumber());
    sendVerificationEmail(email, verificationCode, "template_dwgx14q");
  };

  // Function to handle verification
  const handleVerification = () => {
    if (userInputCode === "") {
      setValidState(true);
      setErrorMessage("Please enter Verification code");
      return;
    }
    if (verificationCode == userInputCode) {
      console.log("Verification code matches");
      // Proceed with account registration and data storage in the database HERE
      navigation.navigate("NewPassword", { email });
    } else {
      setValidState(true);
      setErrorMessage("Verification code does not match");
      console.log("Verification code does not match");
      return;
      // Display an error message or take appropriate action
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.box}>
        {/*will be a box for now*/}
        <BackButt navigation={navigation} />

        <Text style={{ alignSelf: "center" }}>Verify Your Email</Text>
        <View style={styles.mail} />
      </View>
      <Text style={styles.dirText}>
        Please enter the 4 digit code sent to your email.
      </Text>
      <TextInput
        placeholder="---   ---   ---   ---"
        placeholderTextColor="#FFFFFF"
        style={styles.inp}
        onChangeText={(val) => setUserInputCode(val)}
      />
      <View style={validState ? { marginTop: 15 } : { marginTop: 40 }}>
        {validState && (
          <View>
            <Text style={[styles.invalid, { marginBottom: 5 }]}>
              {errorMessage}
            </Text>
          </View>
        )}
        <TouchableOpacity onPress={handleVerification} style={styles.button}>
          <Text style={styles.paragraph}>Verify</Text>
        </TouchableOpacity>
      </View>
      <TouchableOpacity onPress={handleResendCode}>
        <Text style={styles.textButt}>
          <Text style={{ color: "#B8F14A" }}>Resend</Text> Code
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => {
          navigation.goBack();
        }}
      >
        {/**Resend button has width of screen need to fix */}
        <Text style={styles.textButt}>Change Email</Text>
      </TouchableOpacity>
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
  dirText: {
    margin: 10,
    marginLeft: 30,
    marginRight: 30,
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
    color: "#FFFFFF",
  },
  button: {
    // marginTop: 40,
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
    marginBottom: 100,
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
