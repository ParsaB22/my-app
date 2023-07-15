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
//make onPress register button check if evrerything is good then send Email to email then go to next page
//but do not store values into database yet
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

  const [requirementBox, setRequirmentBox] = useState(false);
  const [passLength, setPassLength] = useState(false);
  const [passNum, setPassNum] = useState(false);
  const [passSpecial, setPassSpecial] = useState(false);
  const [passUpper, setPassUpper] = useState(false);

  const [showPass, setShowPass] = useState(false);

  const [errorMessage, setErrorMessage] = useState("");
  const [validState, setValidState] = useState(false);

  const validatePassword = (password) => {
    // Implement password validation logic
    const specialChar = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/;
    const hasNumber = /\d/;
    const hasUpper = /^(?=.*[a-z])(?=.*[A-Z])/;
    if (password.length >= 8) {
      setPassLength(true);
      // console.log(passLength);
      // console.log(password.length);
    } else {
      setPassLength(false);
    }
    if (specialChar.test(password)) {
      setPassSpecial(true);
      // console.log(passSpecial);
    } else {
      setPassSpecial(false);
    }
    if (hasUpper.test(password)) {
      setPassUpper(true);
    } else {
      setPassUpper(false);
    }
    if (hasNumber.test(password)) {
      setPassNum(true);
    } else {
      setPassNum(false);
    }
    if (passLength && passNum && passSpecial && passUpper) {
      return true;
    } else {
      return false;
    }
    // Return true if password meets the requirements, otherwise false
    //probably need a regular expression to check if there is no bad values in password
  };

  // Function to handle registration
  const handleRegistration = async () => {
    // Validate the entered values
    if (
      usernameVal === "" ||
      passwordVal === "" ||
      confirmPass === "" ||
      emailValue === ""
    ) {
      // Display fill fields
      setValidState(true);
      setErrorMessage("Please fill in all fields");
      console.log("Please fill in all fields");
      return;
    }

    if (validatePassword(passwordVal) === false) {
      // Invalid password
      setValidState(true);
      setErrorMessage("Enter Valid Password");
      console.log("Enter Valid Password");
      return;
    }

    if (passwordVal !== confirmPass) {
      // Passwords do not match
      setValidState(true);
      setErrorMessage("Passwords do not match");
      console.log("Passwords do not match");
      return;
    }

    if (validateEmail(emailValue) === false) {
      // Invalid email
      setValidState(true);
      setErrorMessage("Invalid Email");
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
      <ScrollView>
        <View style={styles.circle} />
        <Text style={styles.logoname}>GYM APP NAME</Text>
        <Text style={styles.userText}>Username</Text>
        <TextInput
          placeholder="Ex. John Doe"
          style={styles.inp}
          onChangeText={(val) => setUsername(val)}
        />
        <Text style={styles.userText}>Password</Text>
        <View
          style={{
            backgroundColor: "#000000",
            marginTop: 7,
            marginLeft: 50,
            marginRight: 50,
            borderRadius: 50,
          }}
        >
          <TextInput
            placeholder="Ex. $Password123"
            style={[
              styles.inp,
              { marginLeft: 0, marginRight: 0, marginTop: 0 },
            ]}
            onChangeText={(val) => {
              setPassword(val);
              validatePassword(val);
            }}
            onFocus={() => {
              setRequirmentBox(true);
            }}
            onBlur={() => {
              setRequirmentBox(false);
            }}
            secureTextEntry={true}
          />
          {requirementBox && (
            <View>
              <Text style={passLength ? styles.valid : styles.invalid}>
                must be at least 8 characters
              </Text>
              <Text style={passNum ? styles.valid : styles.invalid}>
                need one one digit
              </Text>
              <Text style={passSpecial ? styles.valid : styles.invalid}>
                need one special character
              </Text>
              <Text style={passUpper ? styles.valid : styles.invalid}>
                need one upper/lowercase
              </Text>
            </View>
          )}
        </View>

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

        <View style={validState ? { marginTop: 15 } : { marginTop: 40 }}>
          {validState && (
            <View>
              <Text style={[styles.invalid, { marginBottom: 5 }]}>
                {errorMessage}
              </Text>
            </View>
          )}
          <TouchableOpacity onPress={handleRegistration} style={styles.button}>
            <Text style={styles.paragraph}>Register</Text>
          </TouchableOpacity>
        </View>
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
    // marginTop: 40,
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
  invalid: {
    // marginTop: 10,
    padding: 5,
    fontSize: 12,
    fontWeight: "bold",
    textAlign: "center",
    color: "#FF0000",
  },
  valid: {
    // marginTop: 10,
    padding: 5,

    fontSize: 12,
    fontWeight: "bold",
    textAlign: "center",
    color: "#00FF00",
  },
});
