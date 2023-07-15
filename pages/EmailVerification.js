import React, { useState, useEffect } from "react";
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  TextInput,
  Platform,
  StatusBar,
} from "react-native";
import BackButt from "../components/BackButton";
import axios from "axios";
import emailjs from "emailjs-com";
emailjs.init("z9ryOjh08tS00nneR");

export const generateRandomNumber = () => {
  const min = 0;
  const max = 9999;
  const randomNumber = Math.floor(Math.random() * (max - min + 1)) + min;
  // Pad the number with leading zeros to ensure it's 4 digits
  return randomNumber.toString().padStart(4, "0");
};

export const sendVerificationEmail = async (email, code, template) => {
  try {
    // Send verification email
    await emailjs.send(
      "service_myoq666",
      template,
      {
        to_email: email,
        codeMessage: code,
        from_name: "Gym App Name",
        // Additional template variables if required
      },
      "z9ryOjh08tS00nneR"
    );

    // Handle successful registration
    console.log("Email Sent");
  } catch (error) {
    // Handle email sending errors
    console.log("Error sending verification email:", error);
    // Display an error message or take appropriate action
  }
};

export default function EmailV({ navigation, route }) {
  const { accountData } = route.params;
  const [verificationCode, setVerificationCode] = useState(
    generateRandomNumber()
  ); //random int
  const [userInputCode, setUserInputCode] = useState("");
  // console.log(verificationCode);

  const [errorMessage, setErrorMessage] = useState("");
  const [validState, setValidState] = useState(false);

  useEffect(() => {
    sendVerificationEmail(
      accountData.email,
      verificationCode,
      "template_my7ye9b"
    );
  }, []);

  const handleResendCode = () => {
    setVerificationCode(generateRandomNumber());
    sendVerificationEmail(
      accountData.email,
      verificationCode,
      "template_my7ye9b"
    );
  };

  const handleVerification = () => {
    if (userInputCode === "") {
      setValidState(true);
      setErrorMessage("Please enter Verification code");
      return;
    }
    if (verificationCode == userInputCode) {
      console.log("Verification code matches");
      // Proceed with account registration and data storage in the database HERE
      navigation.navigate("EmailConfirmed", { accountData });
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
        <BackButt navigation={navigation} />

        <Text style={styles.boxText}>Verify Your Email</Text>
        <View style={styles.mail} />
      </View>

      <Text style={styles.dirText}>
        Please enter the 4-digit code sent to your email.
      </Text>

      <TextInput
        placeholder="---   ---   ---   ---"
        placeholderTextColor="#FFFFFF"
        style={styles.inp}
        value={userInputCode}
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

      <TouchableOpacity onPress={() => navigation.goBack()}>
        <Text style={styles.textButt}>Change Email</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
  boxText: {
    alignSelf: "center",
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
