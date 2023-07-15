import { View, Text, TouchableOpacity, StyleSheet } from "react-native";

export default function BackButt({ navigation }) {
  return (
    <TouchableOpacity
      onPress={() => {
        navigation.goBack();
      }}
      style={styles.container}
    >
      <Text style={{ textAlign: "center", fontSize: 30, fontWeight: "bold" }}>
        {"<"}
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    top: 50,
    left: 50,
    width: 50,
    height: 50,
    backgroundColor: "#FFFFFF",
    borderRadius: 100,
    borderColor: "#000000",
    borderWidth: 3,
    justifyContent: "center",
  },
});
