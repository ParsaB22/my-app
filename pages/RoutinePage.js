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
  ActivityIndicator,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useIsFocused } from "@react-navigation/native";
import uuid from "uuid-js";

export default function RoutinePage({ navigation, route }) {
  //SOME VARIABLES
  const [showAddOptions, setShowAddOptions] = useState(false);
  const [routineName, setRoutineName] = useState("");
  const [routines, setRoutines] = useState([]);

  const isFocused = useIsFocused();

  // console.log(route.params?.index);
  const [showInputName, setShowInputName] = useState(false);

  const [userData, setUserData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  //API PATH TO HEROKU
  let bp = require("../components/Path.js");

  //GETTING USER DATA FROM LOCALSTORAGE/ASYNCSTORAGE
  const getUserData = async () => {
    try {
      const _ud = await AsyncStorage.getItem("user_data");
      // console.log(_ud);
      const ud = JSON.parse(_ud);
      //set
      setUserData(ud);
      setIsLoading(false);
    } catch (error) {
      console.error("Error retrieving user data:", error);
    }
  };
  //GETTING ROUTINE ARRAY
  const fetchRoutines = async () => {
    var obj = { userId: userData.id };
    var js = JSON.stringify(obj);
    // console.log(js);
    try {
      const response = await fetch(bp.buildPath("api/searchRoutines"), {
        method: "POST",
        body: js,
        headers: { "Content-Type": "application/json" },
      });
      // console.log(response.text()s);
      var data = JSON.parse(await response.text());

      // console.log(data);
      setRoutines(data.results);
    } catch (error) {
      console.error("Error fetching routines:", error);
    }
  };
  //ADD ROUTINE TO DATABASE
  const addRoutines = async () => {
    var obj = {
      userId: userData.id,
      routineID: uuid.create().toString(),
      name: routineName,
      days: [0, 0, 0, 0, 0, 0, 0],
    };
    var js = JSON.stringify(obj);
    try {
      const response = await fetch(bp.buildPath("api/addRoutine"), {
        method: "POST",
        body: js,
        headers: { "Content-Type": "application/json" },
      });
      // console.log(response);
      var data = JSON.parse(await response.text());
      console.log(data);
      fetchRoutines();
      if (data.error.length > 0) {
        console.log("Unable to add routine");
      } else {
        console.log("Routine has been added");
      }
    } catch (error) {
      console.error("Error adding routine:", error);
    }
  };
  //DELETE ALL WORKOUTS TIED TO ROUTINE FROM DATABASE
  const deleteAllWorkouts = async (routineId) => {
    var obj = {
      routineID: routineId,
    };
    var js = JSON.stringify(obj);
    try {
      const response = await fetch(bp.buildPath("api/deleteAllWorkouts"), {
        method: "POST",
        body: js,
        headers: { "Content-Type": "application/json" },
      });
      const data = await response.json();

      if (data.error) {
        // Handle the error here, if any
        console.log("Failed to delete workouts.");
      } else {
        // Deletion was successful
        console.log("All workouts deleted successfully.");
      }
    } catch (error) {
      console.error("Error deleting All workouts:", error);
    }
  };
  //DELETE ROUTINE AFTER ALL WORKOUTS ARE DELETED
  const deleteRoutine = async (routineId) => {
    var obj = {
      userID: userData.id,
      routineID: routineId,
    };
    var js = JSON.stringify(obj);
    try {
      const response = await fetch(bp.buildPath("api/deleteRoutine"), {
        method: "POST",
        body: js,
        headers: { "Content-Type": "application/json" },
      });
      const data = await response.json();

      if (data.error) {
        // Handle the error here, if any
        console.log("Failed to delete routine.");
      } else {
        // Deletion was successful
        console.log("routine deleted successfully.");
      }
      fetchRoutines();
    } catch (error) {
      console.error("Error deleting routine:", error);
    }
  };

  // console.log(routines); ////////////////////////////////////////////////////////////////////////////////////////////
  // Call the fetchRoutines function when the component mounts
  useEffect(() => {
    getUserData();
  }, []);

  //CALL FETCHROUTINES WHEN NAVIGATED TO PAGE
  useEffect(() => {
    if (userData) {
      fetchRoutines();
      // console.log(userData);
    }
  }, [userData]);

  useEffect(() => {
    // Fetch workouts whenever the page gains focus (i.e., whenever you navigate to this page)
    if (isFocused && userData) {
      fetchRoutines();
    }
  }, [isFocused, userData]);

  //Shows custom workout / preset
  const handleAddButton = () => {
    setShowAddOptions(true);
  };

  //handles when custom workout is clicked
  const handleAddCustom = () => {
    setShowAddOptions(false);
    setShowInputName(true);
  };

  //handles when preset is clicked
  const handleAddPreset = () => {
    setShowAddOptions(false);
  };
  //handles when you DONT want to create a routine
  const handleCancel = () => {
    setRoutineName("");
    setShowInputName(false);
  };

  //handles when you DO want to create a routine
  const handleConfirm = () => {
    // setRoutines([...routines, { name: routineName, workouts: [] }]);
    addRoutines();
    fetchRoutines();
    setRoutineName("");
    setShowInputName(false);
  };

  //Small loading page because fetchroutines and getuserdata isnt instant and will cause error cause some values are null
  if (isLoading) {
    return (
      <View
        style={{ flex: 1, justifyContent: "center", alignContent: "center" }}
      >
        <ActivityIndicator size={"large"} />
      </View>
    );
  }
  //RENDERS THE ARRAY OF ROUTINES
  const renderRoutineBoxes = () => {
    return routines.map((routine, index) => (
      <TouchableOpacity
        key={index}
        onPress={() => {
          // Handle navigation to the page where workouts can be added to the selected routine
          navigation.navigate("RoutineWorkouts", { routine });
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
              deleteAllWorkouts(routine.routineID);
              deleteRoutine(routine.routineID);
              fetchRoutines();
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
          <Text style={[styles.routineTitle, { color: "#FFFFFF" }]}>
            {routine.name}
          </Text>
          {/* <Text style={styles.routineTitle}>
          {/* {routine.workouts.length} Exercises
        </Text> */}
        </View>
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
      <ScrollView>
        <View style={{ paddingHorizontal: 20 }}>{renderRoutineBoxes()}</View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#2c2c2e",
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
    textAlign: "center",
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

// export default RoutinePage;
