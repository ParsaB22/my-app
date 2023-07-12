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

//check if email is associated with an account retrieve account
//have onPress take email from emailValue and send Email to it and then Navigate to next page('PasswordCode')

export default function ForgotPassword({ navigation }) {
  const [emailValue, setEmail] = useState("");
  //handle if email is good

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView scrollEnabled={false}>
        <View style={styles.box}>
          {/*will be a box for now*/}
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
        <TouchableOpacity
          onPress={() => {
            navigation.navigate("PasswordCode", { email: emailValue });
          }}
          style={styles.button}
        >
          <Text style={styles.paragraph}>Send</Text>
        </TouchableOpacity>
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
    marginTop: 30,
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
});
