import React, { useState, useContext } from "react";
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  TouchableHighlight,
  TextInput,
  ScrollView,
  Button,
  ActivityIndicator,
} from "react-native";
import BackButt from "../components/BackButton";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { AuthContext } from "./context/AuthContext";
import { Circle, Path, Svg, SvgXml } from "react-native-svg";
const svgXml = `<svg width="144" height="95" viewBox="0 0 144 95" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M7.29466 75.0232L1.09218 58.0413C0.805797 57.2579 1.209 56.3955 1.99279 56.1092L3.11196 55.7025C3.89574 55.4163 4.75867 55.8192 5.04505 56.6026L11.2475 73.5845C11.5339 74.3679 11.1307 75.2304 10.3469 75.5166L9.22775 75.9234C8.44396 76.2058 7.58104 75.8028 7.29466 75.0232Z" fill="black" stroke="black" stroke-width="0.659243" stroke-miterlimit="10"/>
<path d="M13.9041 77.8667L3.37197 49.0325C3.08558 48.2491 3.48877 47.3866 4.27255 47.1004L5.93057 46.4978C6.71436 46.2115 7.57728 46.6145 7.86367 47.3979L18.3958 76.2322C18.6822 77.0155 18.279 77.878 17.4952 78.1642L15.8372 78.7668C15.0534 79.0531 14.1905 78.6501 13.9041 77.8667Z" fill="black" stroke="black" stroke-width="0.659243" stroke-miterlimit="10"/>
<path d="M20.8149 79.957L7.31337 42.9877C7.02699 42.2043 7.43019 41.3419 8.21398 41.0556L12.2836 39.5717C13.0674 39.2855 13.9303 39.6885 14.2167 40.4719L27.7182 77.4412C28.0046 78.2246 27.6014 79.087 26.8176 79.3733L22.748 80.8572C21.9679 81.1396 21.1012 80.7404 20.8149 79.957Z" fill="black" stroke="black" stroke-width="0.659243" stroke-miterlimit="10"/>
<path d="M68.5684 93.3606C68.4596 93.355 68.1049 93.345 67.6458 93.3378C67.6374 93.2686 67.6346 93.2025 67.639 93.1435C67.7206 92.9175 67.9502 92.6209 68.0586 92.5381C68.2151 92.4348 68.3663 92.4031 68.3793 92.4004L68.3802 92.4002C68.4229 92.3904 68.4569 92.3856 68.4715 92.3836C68.5032 92.3794 68.5278 92.3778 68.5348 92.3773C68.5448 92.3767 68.5534 92.3763 68.5594 92.3761L68.5684 93.3606ZM68.6527 92.3751C68.6169 92.3725 68.5863 92.3714 68.5744 92.371L68.5705 92.3708C68.4834 92.3672 68.3391 92.3629 68.1592 92.3587C67.797 92.3502 67.27 92.3416 66.7238 92.3402C66.3273 92.3391 65.9134 92.3418 65.5421 92.3515L91.2108 1.02728C94.7172 1.04572 98.9961 1.03377 100.855 1.02858C101.29 1.02736 101.593 1.02652 101.722 1.02652C105.145 1.02652 108.571 1.02335 111.998 0.996545L86.32 92.359C83.731 92.3408 81.1427 92.3345 78.5552 92.3345C75.2578 92.3345 71.954 92.3419 68.6527 92.3751ZM68.5651 92.376C68.5699 92.3758 68.5732 92.3759 68.5651 92.376Z" fill="#B8F14A" stroke="black" stroke-width="1.97773"/>
<path d="M132.961 78.7933L142.886 54.7722C143.203 54.0039 142.837 53.1226 142.068 52.8063L140.968 52.3506C140.199 52.0342 139.318 52.3995 139.001 53.1678L129.076 77.1888C128.759 77.9572 129.125 78.8385 129.893 79.1548L130.994 79.6105C131.762 79.9307 132.644 79.5616 132.961 78.7933Z" fill="black" stroke="black" stroke-width="0.659243" stroke-miterlimit="10"/>
<path d="M126.781 80.0135L139.367 49.556C139.683 48.7877 139.318 47.9064 138.549 47.59L136.917 46.9159C136.149 46.5995 135.267 46.9648 134.95 47.7332L122.364 78.1907C122.048 78.959 122.413 79.8403 123.182 80.1566L124.814 80.8308C125.582 81.1471 126.464 80.7818 126.781 80.0135Z" fill="black" stroke="black" stroke-width="0.659243" stroke-miterlimit="10"/>
<path d="M18.4863 61.4461C18.4863 61.4461 65.977 25.2903 124.991 61.0242" stroke="black" stroke-width="11.8664" stroke-miterlimit="10"/>
<path d="M120.461 80.1566L134.988 44.9989C135.304 44.2305 134.939 43.3493 134.17 43.0329L131.48 41.9219C130.711 41.6055 129.829 41.9708 129.513 42.7391L114.986 77.8969C114.67 78.6652 115.035 79.5465 115.804 79.8629L118.494 80.9739C119.263 81.2902 120.145 80.9249 120.461 80.1566Z" fill="black" stroke="black" stroke-width="0.659243" stroke-miterlimit="10"/>
<path d="M56.9664 92.359L31.4694 0.996606C34.8695 1.02336 38.2686 1.02652 41.6645 1.02652C41.7933 1.02652 42.0942 1.02736 42.5267 1.02858C44.3731 1.03377 48.6173 1.0457 52.0954 1.02731L77.5853 92.3514C77.2184 92.3418 76.8103 92.3391 76.4194 92.3402C75.8771 92.3416 75.354 92.3502 74.9943 92.3587C74.8158 92.3629 74.6725 92.3672 74.5858 92.3708C74.579 92.3711 74.5451 92.3722 74.5043 92.3751C71.222 92.3419 67.9444 92.3345 64.6694 92.3345C62.1013 92.3345 59.5355 92.3408 56.9664 92.359ZM75.5218 93.1604C75.525 93.2146 75.522 93.2747 75.5143 93.3376C75.0536 93.3449 74.6971 93.3549 74.5884 93.3606L74.5975 92.3761C74.6036 92.3763 74.6125 92.3767 74.6229 92.3774C74.63 92.3779 74.6548 92.3795 74.6869 92.3838C74.7017 92.3858 74.7362 92.3907 74.7794 92.4008C74.7829 92.4016 74.942 92.4328 75.1058 92.5429C75.2152 92.6283 75.4434 92.9313 75.5218 93.1604ZM74.5955 92.376C74.5875 92.3759 74.5872 92.3758 74.592 92.376L74.5955 92.376Z" fill="#B8F14A" stroke="black" stroke-width="1.97773"/>
<path d="M58.3137 70.955H85.3427V91.3915H58.3137V70.955Z" fill="#B8F14A"/>
<rect x="74.1357" y="91.3915" width="3.29621" height="1.97773" fill="black"/>
</svg>
`;
//i think just need to fetch from database to check if username exists
//so probably need a function here for the onPress the Login button that handles that
export default function Login({ navigation }) {
  const { login } = useContext(AuthContext);
  const [isLoading, setIsLoading] = useState(false);

  const [userVal, setUserVal] = useState("");
  const [passVal, setPassVal] = useState("");

  const [errorMessage, setErrorMessage] = useState("");
  const [validState, setValidState] = useState(false);

  const [message, setMessage] = useState("");

  let bp = require("../components/Path.js");
  var storage = require("../tokenStorage.js");

  const doLogin = async (event) => {
    var obj = { login: userVal, password: passVal };
    var js = JSON.stringify(obj);
    console.log(js);

    try {
      // const response = await fetch("http://localhost:5000/api/login", {
      setIsLoading(true);

      const response = await fetch(bp.buildPath("api/login"), {
        method: "POST",
        body: js,
        headers: { "Content-Type": "application/json" },
      });

      console.log();
      var res = JSON.parse(await response.text());
      console.log(res);

      if (res.id <= 0) {
        setValidState(true);
        setErrorMessage("User/Password combination incorrect");
        console.log("User/Password combination incorrect");
        setIsLoading(false);

        return;
      } else {
        // console.log(res.accessToken);
        setIsLoading(true);
        storage.storeToken(res);

        let userId = res.id;
        let firstName = res.fn;
        let lastName = res.ln;
        let userName = res.un;
        let password = res.pw;
        let email = res.em;
        // console.log(res.em);

        var user = {
          firstName: res.fn,
          lastName: res.ln,
          id: res.id,
          userName: res.un,
          password: res.pw,
          email: res.em,
        };
        console.log(user);

        await AsyncStorage.setItem("user_data", JSON.stringify(user));

        setMessage("");
        // window.location.href = '/cards';
        login();
      }
    } catch (e) {
      console.log(e.toString());
      // alert(e.toString());
      return;
    }
  };
  if (isLoading) {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignContent: "center",
          backgroundColor: "#2c2c2e",
        }}
      >
        <ActivityIndicator
          size={"large"}
          color={"#B8F14A"}
          //   style={{ backgroundColor: "#0000 }}
        />
      </View>
    );
  }
  return (
    <SafeAreaView style={styles.container}>
      <TouchableOpacity
        onPress={() => navigation.navigate("StartUp")}
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
          top: 30,
          zIndex: 1,
        }}
      >
        <Text style={{ textAlign: "center", fontSize: 30, fontWeight: "bold" }}>
          {"<"}
        </Text>
      </TouchableOpacity>
      <View>
        <ScrollView>
          {/* logo in here */}
          <View
            style={{
              width: 180,
              height: 180,
              alignSelf: "center",
              borderColor: "#000000",
              borderWidth: 10,
              borderRadius: 1000,
              backgroundColor: "#B8F14A",
              alignContent: "center",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <SvgXml xml={svgXml} />
          </View>
          {/*Remove after have logo */}
          <View>
            <Text
              style={[styles.logoname, { marginTop: 20, color: "#FFFFFF" }]}
            >
              VENOM <Text style={[{ color: "#039700" }]}>GAINS</Text>
            </Text>
          </View>
          <Text style={styles.userText}>Username</Text>
          <TextInput
            onChangeText={(val) => setUserVal(val)}
            placeholder="Ex. John Doe"
            style={styles.inp}
          />
          <Text style={styles.userText}>Password</Text>
          <TextInput
            onChangeText={(val) => setPassVal(val)}
            style={styles.inp}
            placeholder="Ex. $Password123"
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

            <TouchableOpacity
              onPress={() => {
                doLogin();
                //login();
              }}
              style={styles.button}
            >
              <Text style={styles.paragraph}>Login</Text>
            </TouchableOpacity>
          </View>
          <TouchableOpacity>
            {/**has width of screen need to fix */}
            <Text
              onPress={() => {
                navigation.navigate("ForgotPassword");
              }}
              style={styles.forgot}
            >
              Forgot Password
            </Text>
          </TouchableOpacity>
        </ScrollView>
      </View>
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
    // marginTop: 30,
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
});
