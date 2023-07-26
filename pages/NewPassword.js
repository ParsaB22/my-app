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
import { SvgUri, SvgXml } from "react-native-svg";
const svgXml = `<svg width="215" height="215" viewBox="0 0 215 215" fill="none" xmlns="http://www.w3.org/2000/svg">
<g filter="url(#filter0_d_0_1)">
<path d="M143.333 71.6667V36.875C143.333 32.161 143.333 29.8039 141.869 28.3395C140.404 26.875 138.047 26.875 133.333 26.875H81.6666C76.9526 26.875 74.5956 26.875 73.1311 28.3395C71.6666 29.8039 71.6666 32.161 71.6666 36.875V71.6667" stroke="#222222" stroke-width="6" stroke-linecap="round"/>
<path d="M26.875 68.7084C26.875 65.8799 26.875 64.4657 27.7537 63.5871C28.6324 62.7084 30.0466 62.7084 32.875 62.7084H182.125C184.953 62.7084 186.368 62.7084 187.246 63.5871C188.125 64.4657 188.125 65.8799 188.125 68.7084V189.083C188.125 192.855 188.125 194.74 186.953 195.912C185.782 197.083 183.896 197.083 180.125 197.083H34.875C31.1038 197.083 29.2181 197.083 28.0466 195.912C26.875 194.74 26.875 192.855 26.875 189.083V68.7084Z" fill="#222222"/>
</g>
<path d="M105.888 137.696C105.888 134.816 106.624 132.48 108.096 130.688C109.632 128.896 111.872 126.976 114.816 124.928C117.568 123.072 119.616 121.344 120.96 119.744C122.368 118.144 123.072 116.128 123.072 113.696C123.072 110.368 122.08 107.872 120.096 106.208C118.112 104.544 115.008 103.712 110.784 103.712C106.944 103.712 103.808 104.8 101.376 106.976C99.0079 109.088 97.8239 112.032 97.8239 115.808C97.8239 117.024 97.8879 118.048 98.0159 118.88C97.6959 118.944 97.2479 118.976 96.6719 118.976C94.4959 118.976 92.6719 118.432 91.1999 117.344C89.7279 116.192 88.9919 114.656 88.9919 112.736C88.9919 109.664 89.9839 106.848 91.9679 104.288C94.0159 101.664 96.7039 99.616 100.032 98.144C103.36 96.672 106.944 95.936 110.784 95.936C116.992 95.936 122.08 97.472 126.048 100.544C130.016 103.616 132 107.872 132 113.312C132 115.744 131.488 117.888 130.464 119.744C129.504 121.536 128.32 123.04 126.912 124.256C125.568 125.472 123.808 126.848 121.632 128.384C119.264 130.048 117.504 131.488 116.352 132.704C115.2 133.856 114.624 135.2 114.624 136.736V138.656C114.624 142.624 111.712 144.608 105.888 144.608V137.696ZM110.112 164.864C108.128 164.864 106.464 164.256 105.12 163.04C103.84 161.76 103.2 160.16 103.2 158.24C103.2 156.384 103.84 154.816 105.12 153.536C106.464 152.256 108.128 151.616 110.112 151.616C112.096 151.616 113.76 152.256 115.104 153.536C116.448 154.816 117.12 156.384 117.12 158.24C117.12 160.16 116.448 161.76 115.104 163.04C113.76 164.256 112.096 164.864 110.112 164.864Z" fill="#B8F14A"/>
<defs>
<filter id="filter0_d_0_1" x="-4" y="0" width="223" height="223" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
<feFlood flood-opacity="0" result="BackgroundImageFix"/>
<feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
<feOffset dy="4"/>
<feGaussianBlur stdDeviation="2"/>
<feComposite in2="hardAlpha" operator="out"/>
<feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"/>
<feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_0_1"/>
<feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_0_1" result="shape"/>
</filter>
</defs>
</svg>
`;

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

  let bp = require("../components/Path.js");
  const updateUserPassword = async (emailV, passwordVal) => {
    console.log(emailV);
    console.log(passwordVal);
    var obj = { email: emailV, newPassword: passwordVal };
    var js = JSON.stringify(obj);
    // console.log(js);
    try {
      const response = await fetch(bp.buildPath("api/updatePassword"), {
        method: "POST",
        body: js,
        headers: { "Content-Type": "application/json" },
      });
      var data = JSON.parse(await response.text());
      console.log(data);
      if (response.ok) {
        console.log("Password Changed");
        navigation.navigate("PassVerified");
      } else {
        // setValidState(true);
        // setErrorMessage("");
        console.log("Password Did not Change");
      }
    } catch (error) {
      console.error("Error fetching routines:", error);
    }
  };
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
    updateUserPassword(email, passwordVal);
    // Navigate to the next page
  };
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView scrollEnabled={false}>
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
          {/*will be a box for now*/}
          <SvgXml style={{ alignSelf: "center" }} xml={svgXml} />
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
            placeholderTextColor={"#FFFFFF"}
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
          placeholderTextColor={"#FFFFFF"}
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
