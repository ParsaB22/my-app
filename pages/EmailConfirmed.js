import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  TouchableHighlight,
  TextInput,
} from "react-native";
import { SvgUri, SvgXml } from "react-native-svg";
const svgXml = `<svg width="220" height="220" viewBox="0 0 220 220" fill="none" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" clip-rule="evenodd" d="M110 219.5C170.475 219.5 219.5 170.475 219.5 110C219.5 49.5248 170.475 0.5 110 0.5C49.5248 0.5 0.5 49.5248 0.5 110C0.5 170.475 49.5248 219.5 110 219.5ZM100.522 148.741L161.355 75.7406L155.978 71.2594L97.5981 141.315L63.8082 107.525L58.8585 112.475L95.3585 148.975L98.0685 151.685L100.522 148.741Z" fill="#222222"/>
</svg>`;

export default function Confirmed({ navigation }) {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.box}>
        {/*will be a box for now*/}
        <SvgXml style={styles.circle} xml={svgXml} />

        <Text style={styles.dirText}>Verified!</Text>
        <Text style={styles.subText}>Thank you for signing up with us.</Text>
      </View>
      <TouchableOpacity
        onPress={() => {
          navigation.navigate("Login");
        }}
        style={styles.button}
      >
        <Text style={styles.paragraph}>Back to Login</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    // alignContent:'center',
    backgroundColor: "#2C2C2E",
  },
  dirText: {
    fontSize: 26,
    fontWeight: "bold",
    textAlign: "center",
    color: "#000000",
  },
  subText: {
    margin: 5,
    fontSize: 15,
    // fontWeight: 'bold',
    textAlign: "center",
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
  box: {
    height: 430,
    backgroundColor: "#B8F14A",
    borderRadius: 10,
    justifyContent: "center",
    margin: 24,
  },
  circle: {
    // height: 200,
    // width:200,
    backgroundColor: "#B8F14A",
    // borderWidth: 10,
    // borderColor: '#000000',
    borderRadius: 100,
    margin: 20,
    alignSelf: "center",
    shadowColor: "#000000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.5,
    shadowRadius: 8, //blur
    // elevation: 4,
  },
});
