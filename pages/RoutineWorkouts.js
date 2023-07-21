import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Alert,
  FlatList,
  ScrollView,
} from "react-native";
import BackButt from "../components/BackButton";
import { catdata } from "../components/CatData";

const RoutineWorkouts = ({ navigation, route }) => {
  //   console.log(route.params);
  const { routine } = route.params;
  const { index } = route.params;
  const [workoutss, setWorkoutss] = useState(routine.workouts);

  const [showDetails, setShowDetails] = useState(
    Array(routine.workouts.length).fill(false)
  );

  //   console.log(index);
  //   routine.name = "Hoe";
  const renderWorkoutBoxes = () => {
    return routine.workouts.map((workout, index) => (
      <View
        key={index}
        style={{ backgroundColor: "#000000", margin: 20, borderRadius: 20 }}
      >
        <TouchableOpacity
          //   key={index}
          onPress={() => {
            // Handle navigation to the page where workouts can be added to the selected routine
            //   navigation.navigate("RoutineWorkouts", { routine, index });
            // console.log("Navigate to routine page:", routine.name);
            const updatedShowDetails = [...showDetails];
            updatedShowDetails[index] = !updatedShowDetails[index];
            setShowDetails(updatedShowDetails);
          }}
          style={styles.routineBox}
        >
          {/* <TouchableOpacity
            style={[styles.days, { backgroundColor: "#FF0000" }]}
          >
            <Text
              style={{ textAlign: "center", fontWeight: "bold", fontSize: 20 }}
            >
              -
            </Text>
          </TouchableOpacity> */}
          <Text
            style={[
              styles.routineTitle,
              { color: "#FFFFFF", textAlign: "center" },
            ]}
          >
            {workout.name}
          </Text>
          {!showDetails[index] && (
            <Text style={[styles.routineTitle, { textAlign: "center" }]}>
              Sets:{workout.sets} Reps:{workout.reps} Weight:{workout.weight}
            </Text>
          )}
        </TouchableOpacity>
        {/* Sets,Reps,Weight Adjustments Below */}
        {showDetails[index] && (
          <View>
            <Text style={[styles.detailsText, { fontSize: 15 }]}>Sets</Text>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-evenly",
                alignItems: "center",
              }}
            >
              <TouchableOpacity
                onPress={() => workout.sets--}
                style={[styles.days, { backgroundColor: "#FF0000" }]}
              >
                <Text
                  style={{
                    textAlign: "center",
                    fontWeight: "bold",
                    fontSize: 20,
                  }}
                >
                  -
                </Text>
              </TouchableOpacity>
              <Text style={styles.detailsValue}>{workout.sets}</Text>
              <TouchableOpacity
                onPress={() => {
                  workout.sets++;
                }}
                style={[styles.days, { backgroundColor: "#FF0000" }]}
              >
                <Text
                  style={{
                    textAlign: "center",
                    fontWeight: "bold",
                    fontSize: 20,
                  }}
                >
                  +
                </Text>
              </TouchableOpacity>
            </View>

            <Text style={[styles.detailsText, { fontSize: 15 }]}>Reps</Text>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-evenly",
                alignItems: "center",
              }}
            >
              <TouchableOpacity
                onPress={() => workout.reps--}
                style={[styles.days, { backgroundColor: "#FF0000" }]}
              >
                <Text
                  style={{
                    textAlign: "center",
                    fontWeight: "bold",
                    fontSize: 20,
                  }}
                >
                  -
                </Text>
              </TouchableOpacity>

              <Text style={styles.detailsValue}>{workout.reps}</Text>

              <TouchableOpacity
                onPress={() => workout.reps++}
                style={[styles.days, { backgroundColor: "#FF0000" }]}
              >
                <Text
                  style={{
                    textAlign: "center",
                    fontWeight: "bold",
                    fontSize: 20,
                  }}
                >
                  +
                </Text>
              </TouchableOpacity>
            </View>

            <Text style={[styles.detailsText, { fontSize: 15 }]}>Weight</Text>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-evenly",
                alignItems: "center",
              }}
            >
              <TouchableOpacity
                onPress={() => (workout.weight -= 5)}
                style={[styles.days, { backgroundColor: "#FF0000" }]}
              >
                <Text
                  style={{
                    textAlign: "center",
                    fontWeight: "bold",
                    fontSize: 20,
                  }}
                >
                  -
                </Text>
              </TouchableOpacity>

              <Text style={styles.detailsValue}>{workout.weight}</Text>

              <TouchableOpacity
                onPress={() => (workout.weight += 5)}
                style={[styles.days, { backgroundColor: "#FF0000" }]}
              >
                <Text
                  style={{
                    textAlign: "center",
                    fontWeight: "bold",
                    fontSize: 20,
                  }}
                >
                  +
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      </View>
    ));
  };

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
          <TouchableOpacity
            onPress={() =>
              navigation.navigate("RoutinePage", { routine, index })
            }
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

          <Text style={styles.headerTitle}>{routine.name}</Text>

          <TouchableOpacity
            onPress={() => {
              navigation.navigate("CatagoryWorkouts", {
                cat: catdata[0],
                adding: "true",
              });
            }}
            style={{
              width: 50,
              height: 50,
              backgroundColor: "#FFFFFF",
              borderRadius: 100,
              borderColor: "#000000",
              borderWidth: 3,
              justifyContent: "center",
              right: 10,
            }}
          >
            <Text
              style={{ textAlign: "center", fontSize: 30, fontWeight: "bold" }}
            >
              E
            </Text>
          </TouchableOpacity>
        </View>
        <View style={{ flexDirection: "row" }}>
          <TouchableOpacity style={styles.days}>
            <Text
              style={{ textAlign: "center", fontWeight: "bold", fontSize: 20 }}
            >
              S
            </Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.days}>
            <Text
              style={{ textAlign: "center", fontWeight: "bold", fontSize: 20 }}
            >
              M
            </Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.days}>
            <Text
              style={{ textAlign: "center", fontWeight: "bold", fontSize: 20 }}
            >
              T
            </Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.days}>
            <Text
              style={{ textAlign: "center", fontWeight: "bold", fontSize: 20 }}
            >
              W
            </Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.days}>
            <Text
              style={{ textAlign: "center", fontWeight: "bold", fontSize: 20 }}
            >
              T
            </Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.days}>
            <Text
              style={{ textAlign: "center", fontWeight: "bold", fontSize: 20 }}
            >
              F
            </Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.days}>
            <Text
              style={{ textAlign: "center", fontWeight: "bold", fontSize: 20 }}
            >
              S
            </Text>
          </TouchableOpacity>
        </View>
      </View>
      <ScrollView>{renderWorkoutBoxes()}</ScrollView>
    </View>
  );
};

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
    alignItems: "center",
    marginBottom: 20,
    height: 175,
    backgroundColor: "#B8F14A",
  },
  headerTitle: {
    flex: 1,
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    color: "#000000",
  },
  detailsText: {
    flex: 1,
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    color: "#FFFFFF",
  },
  detailsValue: {
    width: 50,
    // paddingTop: 2,
    // paddingBottom: 2,
    borderRadius: 10,
    backgroundColor: "#FFFFFF",
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    justifyContent: "center",
    color: "#000000",
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
  routineBox: {
    backgroundColor: "#000000",
    padding: 20,
    // marginBottom: 20,
    borderRadius: 20,
  },
  routineTitle: {
    color: "#B8F14A",
    fontSize: 18,
    fontWeight: "bold",
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
  days: {
    width: 35,
    height: 35,
    borderRadius: 100,
    backgroundColor: "#FFFFFF",
    justifyContent: "center",
    alignContent: "center",
    borderColor: "#000000",
    borderWidth: 4,
    margin: 5,
  },
});

export default RoutineWorkouts;
