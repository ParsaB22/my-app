import React from "react";
import {
  Text,
  View,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { Path, Svg, SvgUri, SvgXml } from "react-native-svg";
const svgXml = `<svg width="305" height="202" viewBox="0 0 305 202" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M14.4049 159.767L1.19631 123.603C0.586431 121.935 1.44508 120.098 3.11421 119.489L5.49756 118.622C7.16669 118.013 9.00434 118.871 9.61421 120.539L22.8228 156.703C23.4326 158.372 22.574 160.208 20.9049 160.818L18.5216 161.684C16.8524 162.286 15.0148 161.427 14.4049 159.767Z" fill="black" stroke="black" stroke-width="1.4039" stroke-miterlimit="10"/>
<path d="M28.4799 165.823L6.05105 104.418C5.44117 102.75 6.29977 100.913 7.9689 100.304L11.4998 99.0203C13.1689 98.4107 15.0065 99.2689 15.6164 100.937L38.0453 162.342C38.6552 164.01 37.7966 165.847 36.1274 166.456L32.5966 167.739C30.9274 168.349 29.0898 167.491 28.4799 165.823Z" fill="black" stroke="black" stroke-width="1.4039" stroke-miterlimit="10"/>
<path d="M43.1972 170.274L14.4448 91.5453C13.835 89.8771 14.6936 88.0404 16.3627 87.4308L25.0294 84.2708C26.6985 83.6612 28.5361 84.5194 29.146 86.1877L57.8984 164.916C58.5082 166.585 57.6496 168.421 55.9805 169.031L47.3138 172.191C45.6527 172.792 43.8071 171.942 43.1972 170.274Z" fill="black" stroke="black" stroke-width="1.4039" stroke-miterlimit="10"/>
<path d="M144.892 198.818C144.66 198.806 143.905 198.785 142.927 198.769C142.909 198.622 142.903 198.481 142.913 198.355C143.086 197.874 143.575 197.243 143.806 197.066C144.14 196.846 144.462 196.779 144.489 196.773L144.491 196.773C144.582 196.752 144.654 196.741 144.685 196.737C144.753 196.728 144.805 196.725 144.82 196.724C144.842 196.723 144.86 196.722 144.873 196.721L144.892 198.818ZM145.071 196.719C144.995 196.714 144.93 196.711 144.905 196.71L144.896 196.71C144.711 196.702 144.403 196.693 144.02 196.684C143.249 196.666 142.127 196.648 140.963 196.645C140.119 196.643 139.238 196.648 138.447 196.669L193.11 2.18766C200.577 2.22692 209.69 2.20148 213.649 2.19042C214.575 2.18784 215.22 2.18604 215.495 2.18604C222.784 2.18604 230.08 2.1793 237.378 2.12221L182.695 196.685C177.182 196.646 171.67 196.633 166.159 196.633C159.137 196.633 152.102 196.648 145.071 196.719Z" fill="#B8F14A" stroke="black" stroke-width="4.21171"/>
<path d="M282.019 167.796L303.156 116.641C303.83 115.005 303.052 113.128 301.415 112.455L299.072 111.484C297.435 110.81 295.557 111.588 294.883 113.225L273.746 164.379C273.072 166.015 273.85 167.892 275.487 168.566L277.83 169.536C279.467 170.218 281.345 169.432 282.019 167.796Z" fill="black" stroke="black" stroke-width="1.4039" stroke-miterlimit="10"/>
<path d="M268.859 170.394L295.661 105.533C296.335 103.897 295.557 102.02 293.92 101.346L290.445 99.9107C288.808 99.237 286.93 100.015 286.256 101.651L259.454 166.513C258.78 168.149 259.558 170.025 261.195 170.699L264.67 172.135C266.307 172.809 268.185 172.031 268.859 170.394Z" fill="black" stroke="black" stroke-width="1.4039" stroke-miterlimit="10"/>
<path d="M38.2383 130.854C38.2383 130.854 139.373 53.8574 265.047 129.955" stroke="black" stroke-width="25.2703" stroke-miterlimit="10"/>
<path d="M255.401 170.699L286.336 95.8283C287.01 94.1921 286.232 92.3153 284.595 91.6416L278.865 89.2756C277.228 88.6019 275.351 89.3798 274.676 91.016L243.741 165.887C243.067 167.523 243.846 169.4 245.483 170.074L251.212 172.44C252.849 173.113 254.727 172.335 255.401 170.699Z" fill="black" stroke="black" stroke-width="1.4039" stroke-miterlimit="10"/>
<path d="M120.184 196.685L65.8864 2.12234C73.1272 2.17931 80.3658 2.18604 87.5977 2.18604C87.8719 2.18604 88.5128 2.18784 89.4338 2.19043C93.3659 2.20148 102.404 2.22688 109.811 2.18774L164.094 196.669C163.312 196.648 162.443 196.643 161.611 196.645C160.456 196.648 159.342 196.666 158.576 196.684C158.196 196.693 157.89 196.702 157.706 196.71L157.698 196.71C157.673 196.711 157.609 196.714 157.532 196.719C150.542 196.648 143.563 196.633 136.588 196.633C131.119 196.633 125.655 196.646 120.184 196.685ZM159.699 198.391C159.706 198.507 159.7 198.635 159.683 198.769C158.702 198.784 157.943 198.806 157.711 198.818L157.731 196.721C157.744 196.722 157.763 196.723 157.785 196.724C157.79 196.724 157.801 196.725 157.815 196.726C157.84 196.728 157.878 196.732 157.921 196.738C157.953 196.742 158.026 196.752 158.118 196.774L158.12 196.774C158.147 196.78 158.475 196.849 158.813 197.077C159.046 197.258 159.532 197.904 159.699 198.391Z" fill="#B8F14A" stroke="black" stroke-width="4.21171"/>
<path d="M123.054 151.104H180.614V194.625H123.054V151.104Z" fill="#B8F14A"/>
<rect x="156.748" y="194.625" width="7.01951" height="4.21171" fill="black"/>
</svg>
`;

// add logo and name
export default function StartUp({ navigation }) {
  return (
    <View style={styles.container}>
      <View style={styles.logobox}>
        <SvgXml xml={svgXml} />

        <Text style={[styles.logoname, { marginTop: 20 }]}>
          VENOM <Text style={[{ color: "#039700" }]}>GAINS</Text>
        </Text>
      </View>
      <Text style={styles.colorWhite}>Welcome</Text>
      <TouchableOpacity
        onPress={() => {
          navigation.navigate("Login");
        }}
        style={styles.button}
      >
        {/* change to touchableHightlight if wanting to change onclick color*/}
        <Text style={styles.paragraph}>Login</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => {
          navigation.navigate("Register");
        }}
        style={styles.button}
      >
        <Text style={styles.paragraph}>Sign Up</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  logobox: {
    height: 450,
    backgroundColor: "#B8F14A",
    padding: 30,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    justifyContent: "flex-end",
    alignItems: "center",
    // alignContent: "flex-end",
  },
  container: {
    flex: 1,
    // justifyContent: 'center',
    backgroundColor: "#2C2C2E",
  },
  button: {
    marginTop: 20,
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
  colorWhite: {
    marginTop: 20,
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
    color: "#FFFFFF",
  },
  logoname: {
    fontSize: 30,
    fontWeight: "bold",
    textAlign: "center",
    color: "#000000",
    // bottom: 0,
  },
  circle: {
    height: 200,
    width: 200,
    backgroundColor: "#B8F14A",
    borderWidth: 20,
    borderColor: "#000000",
    padding: 30,
    margin: 30,
    justifyContent: "flex-end",
    borderRadius: 200,
  },
});
