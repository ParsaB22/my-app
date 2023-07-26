import React, { useEffect, useState } from "react";
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
import { useIsFocused } from "@react-navigation/native";

const RoutineWorkouts = ({ navigation, route }) => {
  //   console.log(route.params);
  const { routine } = route.params;
  const [workouts, setWorkouts] = useState([]);
  const isFocused = useIsFocused();

  const [showDetails, setShowDetails] = useState("");
  const [dayss, setDays] = useState(routine.days);
  // Array(routine.workouts.length).fill(false)

  // console.log(dayss);
  let bp = require("../components/Path.js");
  const fetchWorkouts = async () => {
    var obj = { routineId: routine.routineID };
    var js = JSON.stringify(obj);
    // console.log(js);
    try {
      const response = await fetch(bp.buildPath("api/searchWorkouts"), {
        method: "POST",
        body: js,
        headers: { "Content-Type": "application/json" },
      });
      var data = JSON.parse(await response.text());

      // console.log(data);
      setWorkouts(data.results); // Update the routines state with the fetched data
    } catch (error) {
      console.error("Error fetching routines:", error);
    }
  };

  const deleteWorkout = async (id) => {
    try {
      // Make a DELETE request to the API endpoint with the workoutId to be deleted
      const response = await fetch(bp.buildPath(`api/deleteworkout/${id}`), {
        method: "DELETE",
      });
      if (response.ok) {
        console.log("Workout deleted successfully");
        // Perform any additional actions after successful deletion
      } else {
        console.log("Failed to delete workout");
        // Handle the error or display a message to the user
      }
      fetchWorkouts();
    } catch (error) {
      console.error("Error deleting workout:", error);
    }
  };

  const handleDayClick = (index) => {
    // Create a copy of the days array to avoid mutating the state directly
    const updatedDays = [...dayss];
    // Toggle the value between 0 and 1 for the clicked day
    updatedDays[index] = updatedDays[index] === 0 ? 1 : 0;
    // Update the state with the new days array
    setDays(updatedDays);
    // Call the function to update the routine with the new days array
  };

  const updateRoutine = async (event) => {
    // console.log(routine);
    var obj = {
      userId: routine.userID,
      routineId: routine.routineID,
      name: routine.name,
      days: dayss,
    };
    var js = JSON.stringify(obj);
    // console.log(js);
    try {
      const response = await fetch(bp.buildPath("api/updateRoutine"), {
        method: "POST",
        body: js,
        headers: { "Content-Type": "application/json" },
      });
      // console.log(response);
      var data = JSON.parse(await response.text());
      // console.log(data);
      if (response.ok) {
        console.log("Routine has been updated");
      } else {
        console.log("Unable to update routine");
      }
    } catch (error) {
      console.error("Error updating routine:", error);
    }
  };

  useEffect(() => {
    fetchWorkouts();
  }, []);

  useEffect(() => {
    // Fetch workouts whenever the page gains focus (i.e., whenever you navigate to this page)
    if (isFocused) {
      fetchWorkouts();
    }
  }, [isFocused]);
  // console.log(workouts);
  useEffect(() => {
    // console.log("Updated dayss:", dayss);
    updateRoutine();
  }, [dayss]);

  const showAlert = (workout) => {
    Alert.alert(
      "Delete Workout?", // Title of the alert
      `${workout.workoutID}`, // Message of the alert
      [
        // Buttons for the alert
        {
          text: "Yes",
          onPress: () => {
            deleteWorkout(workout._id);
            fetchWorkouts();
          },
          // style: "cancel",
        },
        {
          text: "No",
          onPress: () => console.log("Cancle Pressed"),
          style: "cancel",
        },
      ],
      { cancelable: true } // Specifies whether the alert can be dismissed by tapping outside the popup
    );
  };

  const renderWorkoutBoxes = () => {
    return workouts.map((workout, index) => (
      <View
        key={index}
        style={{ backgroundColor: "#000000", margin: 20, borderRadius: 20 }}
      >
        <TouchableOpacity
          //   key={index}
          onPress={() => {
            // Handle navigation to the page where workouts can be added to the selected routine
            //   navigation.navigate("RoutineWorkouts", { routine, index });
            // // console.log("Navigate to routine page:", routine.name);
            /////////////////////////////////////////////////////////
            // const updatedShowDetails = [...showDetails];
            // updatedShowDetails[index] = !updatedShowDetails[index];
            // setShowDetails(updatedShowDetails);
          }}
          style={styles.routineBox}
        >
          <View
            style={{
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <TouchableOpacity
              style={[
                styles.days,
                { backgroundColor: "#FF0000", position: "absolute", left: 0 },
              ]}
              onPress={() => {
                showAlert(workout);
              }}
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
            <Text
              style={[
                styles.routineTitle,
                { color: "#FFFFFF", textAlign: "center" },
              ]}
            >
              {workout.workoutID}
            </Text>
          </View>
          {!showDetails[index] && (
            <Text style={[styles.routineTitle, { textAlign: "center" }]}>
              Sets:{workout.NumSets} Reps:{workout.NumRepsPerSet} Weight:
              {workout.WeightLifted}
            </Text>
          )}
        </TouchableOpacity>
        {/* Sets,Reps,Weight Adjustments Below */}
        {/* {showDetails[index] && (
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
        )} */}
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
            onPress={() => navigation.navigate("RoutinePage", { routine })}
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
                routine,
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
              +
            </Text>
          </TouchableOpacity>
        </View>
        <View style={{ flexDirection: "row" }}>
          <TouchableOpacity
            style={[
              styles.days,
              { backgroundColor: dayss[0] === 1 ? "#000000" : "#FFFFFF" },
            ]}
            onPress={() => {
              // console.log("Before:" + dayss);
              handleDayClick(0);
            }}
          >
            <Text
              style={{
                textAlign: "center",
                fontWeight: "bold",
                fontSize: 20,
                color: dayss[0] === 1 ? "#B8F14A" : "#000000",
              }}
            >
              S
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.days,
              { backgroundColor: dayss[1] === 1 ? "#000000" : "#FFFFFF" },
            ]}
            onPress={() => {
              handleDayClick(1);
            }}
          >
            <Text
              style={{
                textAlign: "center",
                fontWeight: "bold",
                fontSize: 20,
                color: dayss[1] === 1 ? "#B8F14A" : "#000000",
              }}
            >
              M
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.days,
              { backgroundColor: dayss[2] === 1 ? "#000000" : "#FFFFFF" },
            ]}
            onPress={() => {
              handleDayClick(2);
            }}
          >
            <Text
              style={{
                textAlign: "center",
                fontWeight: "bold",
                fontSize: 20,
                color: dayss[2] === 1 ? "#B8F14A" : "#000000",
              }}
            >
              T
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.days,
              { backgroundColor: dayss[3] === 1 ? "#000000" : "#FFFFFF" },
            ]}
            onPress={() => {
              handleDayClick(3);
            }}
          >
            <Text
              style={{
                textAlign: "center",
                fontWeight: "bold",
                fontSize: 20,
                color: dayss[3] === 1 ? "#B8F14A" : "#000000",
              }}
            >
              W
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.days,
              { backgroundColor: dayss[4] === 1 ? "#000000" : "#FFFFFF" },
            ]}
            onPress={() => {
              handleDayClick(4);
            }}
          >
            <Text
              style={{
                textAlign: "center",
                fontWeight: "bold",
                fontSize: 20,
                color: dayss[4] === 1 ? "#B8F14A" : "#000000",
              }}
            >
              T
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.days,
              { backgroundColor: dayss[5] === 1 ? "#000000" : "#FFFFFF" },
            ]}
            onPress={() => {
              handleDayClick(5);
            }}
          >
            <Text
              style={{
                textAlign: "center",
                fontWeight: "bold",
                fontSize: 20,
                color: dayss[5] === 1 ? "#B8F14A" : "#000000",
              }}
            >
              F
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.days,
              { backgroundColor: dayss[6] === 1 ? "#000000" : "#FFFFFF" },
            ]}
            onPress={() => {
              handleDayClick(6);
            }}
          >
            <Text
              style={{
                textAlign: "center",
                fontWeight: "bold",
                fontSize: 20,
                color: dayss[6] === 1 ? "#B8F14A" : "#000000",
              }}
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
