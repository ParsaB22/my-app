import { useState, useEffect } from "react";
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  TouchableHighlight,
  TextInput,
} from "react-native";
import { sendVerificationEmail } from "./EmailVerification";

//somehow store the code the was sent to email.
//have onPress for Verify button handle if the code from email matches user input let them change their password
//maybe also get the user associated with the email for next step in setting the new password.
//also make resend code button send another different email code then update emailCode to store new real code.

export default function PasswordCode({ navigation, route }) {
  const { email } = route.params;
  const [verificationCode, setVerificationCode] = useState("");
  const [userInputCode, setUserInputCode] = useState("");
  console.log(email);

  // Send the verification email when page loads
  useEffect(() => {
    sendVerificationEmail(email);
  }, []);

  // Function to resend a different verification code
  const handleResendCode = () => {
    sendVerificationEmail(email);
  };

  // Function to handle verification
  const handleVerification = () => {
    // Implement code to check if the entered code matches the verificationCode
    // If the codes match send accountData to database
    // Otherwise, display an error message or take appropriate action
    console.log("Verification code:", verificationCode, userInputCode);
    console.log("Registration successful");
    //
    // Navigate to the next screen
    navigation.navigate("NewPassword", { email });
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.box}>
        {/*will be a box for now*/}
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
      <TouchableOpacity onPress={handleVerification} style={styles.button}>
        <Text style={styles.paragraph}>Verify</Text>
      </TouchableOpacity>
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
    marginTop: 40,
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
});
