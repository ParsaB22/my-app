import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Alert,
  // FlatList,
  ScrollView,
} from "react-native";
import axios from "axios";

export default function RoutinePage({ navigation, route }) {
  const [showAddOptions, setShowAddOptions] = useState(false);
  const [routineName, setRoutineName] = useState("");
  const [routines, setRoutines] = useState([]);

  // console.log(route.params?.index);
  const [showInputName, setShowInputName] = useState(false);

  let bp = require("../components/Path.js");

  // const fetchRoutines = async () => {
  //   try {
  //     // Replace 'your-api-endpoint' with the actual API endpoint on your server
  //     // const response = await axios.get(bp.buildPath("api/searchRoutines"));
  //     const response = await fetch(bp.buildPath("api/searchRoutines"), {
  //       method: "GET",
  //       body: js,
  //       headers: { "Content-Type": "application/json" },
  //     });
  //     console.log(response);
  //     const { data } = response;
  //     setRoutines(data); // Update the routines state with the fetched data
  //   } catch (error) {
  //     console.error("Error fetching routines:", error);
  //   }
  // };

  // // Call the fetchRoutines function when the component mounts
  // useEffect(() => {
  //   fetchRoutines();
  // }, []);

  const handleAddButton = () => {
    setShowAddOptions(true);
  };

  const handleAddCustom = () => {
    setShowAddOptions(false);
    setShowInputName(true);
    // Perform necessary actions when adding custom routine
    // You can store the routine name in 'routineName' state
    // and create a new routine object in 'routines' state

    // setRoutines([...routines, { name: routineName, type: "custom" }]);
    // setRoutineName();
  };

  const handleAddPreset = () => {
    setShowAddOptions(false);
    // Perform necessary actions when adding preset routine
    // For example, navigate to a preset workout selection page
    // and handle the selected preset workout to be added to routines
  };
  const handleCancel = () => {
    setRoutineName("");
    setShowInputName(false);
  };
  const handleConfirm = () => {
    setRoutines([...routines, { name: routineName, workouts: [] }]);
    setRoutineName("");
    setShowInputName(false);
  };

  const renderRoutineBoxes = () => {
    return routines.map((routine, index) => (
      <TouchableOpacity
        key={index}
        onPress={() => {
          // Handle navigation to the page where workouts can be added to the selected routine
          navigation.navigate("RoutineWorkouts", { routine });
          // console.log("Navigate to routine page:", routine.name);
        }}
        style={styles.routineBox}
      >
        <Text style={[styles.routineTitle, { color: "#FFFFFF" }]}>
          {routine.name}
        </Text>
        <Text style={styles.routineTitle}>
          {routine.workouts.length} Exercises
        </Text>
      </TouchableOpacity>
    ));
  };

  return (
    <View style={styles.container}>
      {showAddOptions && (
        <View style={styles.addOptions}>
          <TouchableOpacity
            onPress={handleAddCustom}
            style={styles.optionButton}
          >
            <Text style={styles.optionButtonText}>Add Custom</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={handleAddPreset}
            style={styles.optionButton}
          >
            <Text style={styles.optionButtonText}>Add Preset</Text>
          </TouchableOpacity>
        </View>
      )}
      <View style={styles.headerBox}>
        <Text style={styles.headerTitle}>Routines</Text>
        <TouchableOpacity onPress={handleAddButton} style={styles.addButton}>
          <Text style={styles.addButtonIcon}>+</Text>
        </TouchableOpacity>
      </View>
      {showInputName && (
        <View
          style={{
            position: "absolute",
            alignSelf: "center",
            justifyContent: "center",
            alignContent: "center",
            top: 150,
            width: "80%",
            height: 175,
            backgroundColor: "#FFFFFF",
            elevation: 4,
            borderRadius: 10,
            zIndex: 1,
          }}
        >
          <Text
            style={{
              marginTop: 10,
              fontSize: 20,
              fontWeight: "bold",
              textAlign: "center",
              color: "#000000",
            }}
          >
            Please input name of New Workout
          </Text>
          <TextInput
            placeholder="Custom Name"
            style={[styles.inp, { textAlign: "center" }]}
            onChangeText={(val) => setRoutineName(val)}
            // secureTextEntry={true}
          />
          <View
            style={{
              flexDirection: "row",
              justifyContent: "center",
              alignContent: "space-between",
            }}
          >
            <TouchableOpacity style={styles.button} onPress={handleCancel}>
              <Text style={styles.paragraph}>Cancel</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={handleConfirm}>
              <Text style={styles.paragraph}>Confirm</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}
      <ScrollView>{renderRoutineBoxes()}</ScrollView>
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
    flexDirection: "row",
    alignItems: "center",
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
    marginBottom: 30,
    borderRadius: 10,
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
});

// export default RoutinePage;
