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
import { ImageData } from "../components/ImageData";

export default function WorkoutDetails({ navigation, route }) {
  const { adding } = route.params;
  const { workout } = route.params;
  const [newWorkout, setNewWorkout] = useState(workout);

  console.log(newWorkout);
  console.log(workout);
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
          <Text style={styles.headerTitle}>{workout.workoutName}</Text>
        </View>
      </View>
      {/* adding option */}
      {adding === "true" ? (
        <ScrollView>
          <View>
            <Text style={[styles.detailsText]}>Sets</Text>
            <View style={styles.dataContainer}>
              <TouchableOpacity
                onPress={() => {
                  setNewWorkout((prevWorkout) => ({
                    ...prevWorkout,
                    set: prevWorkout.set - 1,
                  }));
                }}
                style={styles.sub}
              >
                <Text style={styles.mathText}>-</Text>
              </TouchableOpacity>

              <View style={styles.detailContainer}>
                <Text style={styles.detailsValue}>{newWorkout.set}</Text>
              </View>

              <TouchableOpacity
                onPress={() => {
                  setNewWorkout((prevWorkout) => ({
                    ...prevWorkout,
                    set: prevWorkout.set + 1,
                  }));
                }}
                style={styles.add}
              >
                <Text style={styles.mathText}>+</Text>
              </TouchableOpacity>
            </View>

            <Text style={[styles.detailsText]}>Reps</Text>
            <View style={styles.dataContainer}>
              <TouchableOpacity
                onPress={() => {
                  setNewWorkout((prevWorkout) => ({
                    ...prevWorkout,
                    reps: prevWorkout.reps - 1,
                  }));
                }}
                style={styles.sub}
              >
                <Text style={styles.mathText}>-</Text>
              </TouchableOpacity>

              <View style={styles.detailContainer}>
                <Text style={styles.detailsValue}>{newWorkout.reps}</Text>
              </View>

              <TouchableOpacity
                onPress={() => {
                  setNewWorkout((prevWorkout) => ({
                    ...prevWorkout,
                    reps: prevWorkout.reps + 1,
                  }));
                }}
                style={styles.add}
              >
                <Text style={styles.mathText}>+</Text>
              </TouchableOpacity>
            </View>

            <Text style={[styles.detailsText]}>Weight</Text>
            <View style={styles.dataContainer}>
              <TouchableOpacity
                onPress={() => {
                  setNewWorkout((prevWorkout) => ({
                    ...prevWorkout,
                    weight: prevWorkout.weight - 5,
                  }));
                }}
                style={styles.sub}
              >
                <Text style={styles.mathText}>-</Text>
              </TouchableOpacity>

              <View style={styles.detailContainer}>
                <Text style={styles.detailsValue}>{newWorkout.weight}</Text>
              </View>

              <TouchableOpacity
                onPress={() => {
                  setNewWorkout((prevWorkout) => ({
                    ...prevWorkout,
                    weight: prevWorkout.weight + 5,
                  }));
                }}
                style={styles.add}
              >
                <Text style={styles.mathText}>+</Text>
              </TouchableOpacity>
            </View>
          </View>
          <TouchableOpacity
            // onPress={() => navigation.navigate("RoutineWorkouts")}
            style={styles.button}
          >
            <Text style={styles.paragraph}>Add</Text>
          </TouchableOpacity>
        </ScrollView>
      ) : (
        // {/* looking at detail option */}
        <View
          style={{
            // backgroundColor: "#ffffff",
            // justifyContent: "center",
            alignItems: "center",
            // alignContent: "space-between",
          }}
        >
          <Image
            source={
              ImageData[
                workout.workoutName.toLowerCase().replace(/\s+/g, "") +
                  "details"
              ]
            }
          />
          <Text style={[styles.paragraph, { color: "#ffffff" }]}>
            {
              ImageData[
                workout.workoutName.toLowerCase().replace(/\s+/g, "") + "text"
              ]
            }
          </Text>
        </View>
      )}
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
    height: 100,
    backgroundColor: "#B8F14A",
  },
  headerTitle: {
    flex: 1,
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    color: "#000000",
  },
  button: {
    // marginTop: 40,
    backgroundColor: "#B8F14A",
    borderRadius: 50,
    marginLeft: 50,
    marginRight: 50,
  },
  paragraph: {
    // margin: 20,
    padding: 20,
    fontSize: 30,
    fontWeight: "bold",
    textAlign: "center",
  },
  //===========================================================================================MOST STYLINGS BELOW======
  sub: {
    width: 45,
    height: 45,
    borderRadius: 100,
    backgroundColor: "#2c2c2e",
    justifyContent: "center",
    alignContent: "center",
    borderColor: "#B8F14A",
    borderWidth: 4,
    margin: 5,
  },
  add: {
    width: 45,
    height: 45,
    borderRadius: 20,
    backgroundColor: "#2c2c2e",
    justifyContent: "center",
    alignContent: "center",
    borderColor: "#B8F14A",
    borderWidth: 4,
    margin: 5,
  },
  mathText: {
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 25,
    color: "#B8F14A",
  },
  dataContainer: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "center",
    marginBottom: 20,
    marginTop: 20,
  },
  detailsText: {
    flex: 1,
    fontSize: 35,
    fontWeight: "bold",
    textAlign: "center",
    color: "#FFFFFF",
  },
  detailContainer: {
    width: 150,
    height: 100,
    borderRadius: 10,
    backgroundColor: "#434B53",
    justifyContent: "center",
  },
  detailsValue: {
    fontSize: 40,
    fontWeight: "bold",
    textAlign: "center",
    color: "#FFFFFF",
  },
});
