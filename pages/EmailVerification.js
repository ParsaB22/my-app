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
import emailjs from "emailjs-com";
import uuid from "uuid-js";
import { Path, Rect, Svg } from "react-native-svg";

emailjs.init("z9ryOjh08tS00nneR");

let bp = require("../components/Path.js");

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
const registerUser = async (account) => {
  var obj = {
    userID: uuid.create().toString(),
    firstName: account.firstname,
    lastName: account.lastname,
    login: account.username,
    password: account.password,
    email: account.email,
  };
  var js = JSON.stringify(obj);
  try {
    const response = await fetch(bp.buildPath("api/register"), {
      method: "POST",
      body: js,
      headers: { "Content-Type": "application/json" },
    });
    // console.log(response);
    var data = JSON.parse(await response.text());
    console.log(data);
    if (data.error.length > 0) {
      console.log("Unable to add account");
    } else {
      console.log("Account has been added");
    }
  } catch (error) {
    console.error("Error adding Account:", error);
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
      registerUser(accountData);
      navigation.navigate("EmailConfirmed");
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
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={{
            position: "absolute",
            width: 50,
            height: 50,
            backgroundColor: "#FFFFFF",
            borderRadius: 100,
            borderColor: "#000000",
            borderWidth: 3,
            justifyContent: "center",
            left: 30,
            top: 10,
            zIndex: 1,
          }}
        >
          <Text
            style={{ textAlign: "center", fontSize: 30, fontWeight: "bold" }}
          >
            {"<"}
          </Text>
        </TouchableOpacity>
        <Text
          style={[
            styles.dirText,
            {
              position: "absolute",
              alignSelf: "center",
              fontSize: 26,
              color: "#000000",
            },
          ]}
        >
          Verify Your Email
        </Text>
        <View style={{ alignSelf: "center", position: "absolute" }}>
          <Svg
            width="210"
            height="210"
            viewBox="0 0 210 210"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <Rect
              x="35"
              y="52.5"
              width="140"
              height="105"
              rx="2"
              stroke="black"
              strokeWidth={5}
            />
            <Path
              d="M35 78.75L104.106 113.303C104.669 113.584 105.331 113.584 105.894 113.303L175 78.75"
              stroke="black"
              strokeWidth={5}
            />
          </Svg>
        </View>
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
