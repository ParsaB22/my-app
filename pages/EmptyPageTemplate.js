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

export default function Page() {
  return (
    <View style={styles.container}>
      <View
        style={{
          height: 90,
          backgroundColor: "#000000",
          position: "absolute",
          bottom: 0,
          width: "100%",
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        <TouchableOpacity>H</TouchableOpacity>
        <TouchableOpacity>C</TouchableOpacity>
        <TouchableOpacity>R</TouchableOpacity>
        <TouchableOpacity>P</TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // justifyContent: 'center',
    // alignContent:'center',
    backgroundColor: "#2C2C2E",
  },
});
