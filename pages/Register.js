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
} from "react-native";

//Do password validation and email validation functions
//make onPress register button check if everything is good then send Email to email then go to next page
//but do not store values into database yet
export const validatePassword = (password) => {
  // Implement password validation logic
  if ((password.length = 0)) {
    return false;
  }
  // Return true if password meets the requirements, otherwise false
  //probably need a regular expression to check if there is no bad values in password
  return true;
};

// Function to validate email
export const validateEmail = (email) => {
  // Implement email validation logic
  // Return true if email is valid, otherwise false
  // Example: Use regex pattern matching to validate email format
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export default function Register({ navigation }) {
  const [usernameVal, setUsername] = useState("");
  const [passwordVal, setPassword] = useState("");
  const [confirmPass, setConfirmPass] = useState("");
  const [emailValue, setEmail] = useState("");

  // Function to handle registration
  const handleRegistration = () => {
    // Validate the entered values
    if (
      usernameVal === "" ||
      passwordVal === "" ||
      confirmPass === "" ||
      emailValue === ""
    ) {
      // Display fill fields
      console.log("Please fill in all fields");
      return;
    }

    if (validatePassword(passwordVal) === false) {
      // Invalid password
      console.log("Enter Valid Password");
      return;
    }

    if (passwordVal !== confirmPass) {
      // Passwords do not match
      console.log("Passwords do not match");
      return;
    }

    if (validateEmail(emailValue) === false) {
      // Invalid email
      console.log("Invalid email");
      return;
    }

    // Proceed with registration
    // Send email verification, store data in the database, etc.
    console.log("Registration successful");
    const accountData = {
      username: usernameVal,
      password: passwordVal,
      email: emailValue,
    };
    // Navigate to the next page
    navigation.navigate("EmailVerification", { accountData });
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.circle} />
        <Text style={styles.logoname}>GYM APP NAME</Text>
        <Text style={styles.userText}>Username</Text>
        <TextInput
          placeholder="Ex. John Doe"
          style={styles.inp}
          onChangeText={(val) => setUsername(val)}
        />
        <Text style={styles.userText}>Password</Text>
        <TextInput
          placeholder="Ex. $Password123"
          style={styles.inp}
          onChangeText={(val) => setPassword(val)}
          secureTextEntry={true}
        />
        <Text style={styles.userText}>Confirm Password</Text>
        <TextInput
          placeholder="Ex. $Password123"
          style={styles.inp}
          onChangeText={(val) => setConfirmPass(val)}
          secureTextEntry={true}
        />
        <Text style={styles.userText}>Email</Text>
        <TextInput
          placeholder="Ex. JohnDoe@hotmail.com"
          style={styles.inp}
          onChangeText={(val) => setEmail(val)}
        />
        <TouchableOpacity onPress={handleRegistration} style={styles.button}>
          <Text style={styles.paragraph}>Register</Text>
        </TouchableOpacity>
      </ScrollView>
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
