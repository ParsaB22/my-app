import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Alert,
  // FlatList,
  ScrollView,
  Image,
} from "react-native";
// import { catdata } from "../components/CatData";

// NEED TO FIX TEXT WRAPING DOWN

export default function CatagoryWorkouts({ navigation, route }) {
  const { cat } = route.params;
  const { adding } = route.params;
  const renderWorkBoxes = () => {
    return cat.workouts.map((workout, index) => (
      <TouchableOpacity
        key={index}
        onPress={() => {
          // Handle navigation to the page where workouts can be added to the selected routine
          navigation.navigate("WorkoutDetails", { workout, adding });
          // console.log("Navigate to routine page:", routine.name);
        }}
        style={[styles.catBox, { flexDirection: "row" }]}
      >
        <View style={styles.imageContainer}>
          <Image
            source={
              {
                /*workout.image*/
              }
            }
            style={styles.imageStyle}
          />
        </View>
        <View>
          <Text style={[styles.catTitle, { color: "#FFFFFF" }]}>
            {workout.workoutName}
          </Text>
        </View>
      </TouchableOpacity>
    ));
  };
  // console.log(route.params?.index);
  return (
    <View style={styles.container}>
      <View style={styles.headerBox}>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          {/* Back Button Below */}
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={{
              width: 50,
              height: 50,
              backgroundColor: "#FFFFFF",
              borderRadius: 100,
              borderColor: "#000000",
              borderWidth: 3,
              justifyContent: "center",
              left: 10,
            }}
          >
            <Text
              style={{ textAlign: "center", fontSize: 30, fontWeight: "bold" }}
            >
              B
            </Text>
          </TouchableOpacity>
          <Text style={styles.headerTitle}>{cat.name}</Text>
        </View>
        <View style={styles.searchbar}>
          <TextInput placeholder="Search" />
        </View>
      </View>
      {/* Must make into FlatList */}
      <ScrollView>{renderWorkBoxes()}</ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#2c2c2e",
    // paddingHorizontal: 20
    paddingTop: 40, //adjust for andriod and iphone{NEED TO BE UPDATED}
  },
  headerBox: {
    // flexDirection: "row",
    justifyContent: "space-evenly",
    // alignItems: "center",
    marginBottom: 20,
    height: 150,
    backgroundColor: "#B8F14A",
  },
  headerTitle: {
    flex: 1,
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    color: "#000000",
  },
  searchbar: {
    backgroundColor: "#FFFFFF",
    marginHorizontal: 30,
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 20,
  },
  addButton: {
    backgroundColor: "#FFFFFF",
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
    borderColor: "#000000",
    borderWidth: 5,
  },
  addButtonIcon: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#000000",
  },
  addOptions: {
    position: "absolute",
    top: 80,
    right: 40,
    backgroundColor: "#FFFFFF",
    padding: 10,
    zIndex: 9999,
    borderRadius: 5,
    elevation: 3,
  },
  optionButton: {
    paddingVertical: 5,
    paddingHorizontal: 10,
  },
  optionButtonText: {
    fontSize: 16,
  },
  catBox: {
    backgroundColor: "#434B53",
    padding: 20,
    marginBottom: 20,
    marginHorizontal: 10,
    borderRadius: 10,
    // height: 145,
    // flex: 1,
  },
  catTitle: {
    color: "#B8F14A",
    fontSize: 25,
    fontWeight: "bold",
    // textAlign: "center",
    flexWrap: "wrap",
  },
  button: {
    // marginTop: 40,
    backgroundColor: "#B8F14A",
    borderRadius: 50,
    // marginLeft: 50,
    // marginRight: 50,
  },
  paragraph: {
    margin: 20,
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
  },
  inp: {
    // marginTop: 7,
    backgroundColor: "#FFFFFF",
    borderRadius: 50,
    borderColor: "#000000",
    borderWidth: 2,
    marginLeft: 50,
    marginRight: 50,
    paddingLeft: 20,
    padding: 10,
    fontSize: 15,
  },
  imageContainer: {
    // flex: 1,
    // alignItems: "flex-start", // Align the image to the left
    // paddingLeft: 20, // Add some space between the image and the button edge
    marginRight: 10,
    borderRadius: 20,
    width: 75, // Adjust the width of the image as needed
    height: 75, // Adjust the height of the image as needed
  },
  imageStyle: {
    width: 75,
    height: 75,
    resizeMode: "contain", // Set the image resize mode
  },
});
