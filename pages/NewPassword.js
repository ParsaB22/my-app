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
import BackButt from "../components/BackButton";

//Find account from email
//take password verification part from register and then when hitting change make sure everything is good
//if true change their password of the

export default function NewPass({ navigation, route }) {
  const { email } = route.params;
  const [passwordVal, setPassword] = useState("");
  const [confirmPass, setConfirmPass] = useState("");

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

  const handlePassword = () => {
    // Validate the entered values
    if (passwordVal === "" || confirmPass === "") {
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
    console.log("Password good");
    //update user account in database here by their email

    // Navigate to the next page
    navigation.navigate("PassVerified");
  };
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView scrollEnabled={false}>
        <View style={styles.box}>
          <BackButt navigation={navigation} />
          {/*will be a box for now*/}
          <View style={styles.mail} />
        </View>
        <Text style={styles.forgotText}>Enter a New Password</Text>
        <Text style={styles.dirText}>
          Your identity has been confirmed. Please enter a new password.
        </Text>
        <Text style={styles.userText}>New Password</Text>
        <View
          style={{
            backgroundColor: "#000000",
            marginTop: 7,
            marginLeft: 30,
            marginRight: 30,
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
        <View style={validState ? { marginTop: 15 } : { marginTop: 40 }}>
          {validState && (
            <View>
              <Text style={[styles.invalid, { marginBottom: 5 }]}>
                {errorMessage}
              </Text>
            </View>
          )}
          <TouchableOpacity onPress={handlePassword} style={styles.button}>
            <Text style={styles.paragraph}>Change</Text>
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
    marginLeft: 5,
    marginRight: 5,
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
  valid: {
    // marginTop: 10,
    padding: 5,

    fontSize: 12,
    fontWeight: "bold",
    textAlign: "center",
    color: "#00FF00",
  },
});
