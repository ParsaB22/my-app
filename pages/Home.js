import React, { useEffect, useRef, useState } from "react";
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
  ActivityIndicator,
} from "react-native";
// import { catdata } from "../components/CatData";
import { ImageData } from "../components/ImageData";
import { useIsFocused } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";

// NEED TO FIX TEXT WRAPING DOWN

export default function HomePage({ navigation, route }) {
  const scrollViewRef = useRef(null);
  const isFocused = useIsFocused();
  const [selectedDay, setSelectedDay] = useState(new Date().getDay());
  const [selectedRoutine, setSelectedRoutine] = useState(null);

  const [allRoutines, setAllRoutines] = useState([]);
  const [workouts, setWorkouts] = useState([]);

  const [userData, setUserData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thur", "Fri", "Sat"];
  const daysOfFullWeek = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  const [daysRoutines, setDaysRoutines] = useState([
    [],
    [],
    [],
    [],
    [],
    [],
    [],
  ]);

  /////////////////////////////////////API STUFF///////////////////////////////////
  //API PATH TO HEROKU/
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
      setAllRoutines(data.results);
    } catch (error) {
      console.error("Error fetching routines:", error);
    }
  };
  const fetchWorkouts = async (routineID) => {
    var obj = { routineId: routineID };
    var js = JSON.stringify(obj);
    console.log(js);
    try {
      const response = await fetch(bp.buildPath("api/searchWorkouts"), {
        method: "POST",
        body: js,
        headers: { "Content-Type": "application/json" },
      });
      var data = JSON.parse(await response.text());

      console.log(data);
      setWorkouts(data.results); // Update the routines state with the fetched data
    } catch (error) {
      console.error("Error fetching routines:", error);
    }
  };
  /////////////////////////////////////////Days Stuff/////////////////////////////////////////////////////
  const handleScrollToItem = (index) => {
    // Get the width of a single item (assumes all items have the same width)
    const itemWidth = 120;
    // Calculate the x position to scroll to
    const xPosition = index * itemWidth;
    // Scroll to the item using the scrollTo method
    scrollViewRef.current.scrollTo({ x: xPosition, animated: true });
  };

  const renderDays = () => {
    return daysOfWeek.map((day, index) => (
      <TouchableOpacity
        key={index}
        onPress={() => {
          // Handle navigation to the page where workouts can be added to the selected routine
          // console.log("Navigate to routine page:", routine.name);
          setSelectedDay(index);
          setSelectedRoutine(null);
          handleScrollToItem(index);
        }}
        style={[
          styles.daysBox,
          {
            backgroundColor: index % 2 == 0 ? "#B8F14A" : "#FFFFFF",
            borderWidth: selectedDay === index ? 5 : 0,
            borderColor:
              selectedDay === index
                ? index % 2 == 0
                  ? "#FFFFFF"
                  : "#B8F14A"
                : "transparent",
            // borderStyle: "dotted",
            width: selectedDay === index ? 110 : 100,
            height: selectedDay === index ? 110 : 100,
          },
        ]}
      >
        <View>
          <Text style={[styles.dayTitle]}>{day}</Text>
        </View>
      </TouchableOpacity>
    ));
  };

  ////////////////////////////////////////Routine Stuff//////////////////////////////////////////////
  const fillDays = () => {
    // Create an array to hold the routines for each day (Sun to Sat)
    const routinesForDays = [[], [], [], [], [], [], []];

    // Loop through all routines
    allRoutines.forEach((routine) => {
      const days = routine.days;
      if (Array.isArray(days)) {
        // If the 'days' property is an array, loop through it
        days.forEach((day, index) => {
          if (day === 1) {
            // Add the routine to the corresponding day array
            routinesForDays[index].push(routine);
          }
        });
      }
    });

    // Update the state with the filled routines
    setDaysRoutines(routinesForDays);
  };

  const renderSelectedDayRoutines = () => {
    const routines = daysRoutines[selectedDay];

    return routines.map((routine, index) => (
      <View key={index} style={[styles.routineBox]}>
        <TouchableOpacity
          onPress={() => {
            // Handle navigation to the page where workouts can be added to the selected routine
            // console.log("Navigate to routine page:", routine.name)
            handleRoutineClick(routine);
          }}
          style={[
            // styles.daysBox,
            // { backgroundColor: index % 2 == 0 ? "#B8F14A" : "#FFFFFF" },

            { backgroundColor: "#B8F14A", padding: 20, borderRadius: 10 },
          ]}
        >
          <View>
            <Text style={[styles.dayTitle]}>{routine.name}</Text>
          </View>
        </TouchableOpacity>
        {selectedRoutine === routine && renderWorkoutBoxes()}
      </View>
    ));
  };

  /////////////////////////////////////////Workout Stuff//////////////////////////////////////////

  const handleRoutineClick = async (routine) => {
    if (selectedRoutine === routine) {
      // Deselect the routine if it's already selected
      setSelectedRoutine(null);
      // setWorkouts(null);
    } else {
      // Fetch workouts for the selected routine
      fetchWorkouts(routine.routineID);
      setSelectedRoutine(routine);
    }
  };
  const renderWorkoutBoxes = () => {
    return workouts.map((workout, index) => (
      <View key={index} style={[]}>
        <View>
          <Text style={styles.paragraph}>{workout.workoutID}</Text>
          <Text style={styles.subtext}>
            Sets:{workout.NumSets} Reps:{workout.NumRepsPerSet} Weight:
            {workout.WeightLifted}
          </Text>
        </View>
      </View>
    ));
  };
  ///////////////////////////////////////////////////////////////////////////////////
  /////////////////////////////////USE EFFECTS///////////////////////////////////////
  useEffect(() => {
    getUserData();
  }, []);

  useEffect(() => {
    // Fetch workouts whenever the page gains focus (i.e., whenever you navigate to this page)
    if (isFocused && userData) {
      fetchRoutines();
      if (isLoading === false) {
        handleScrollToItem(new Date().getDay());
        setSelectedDay(new Date().getDay()); //remove if we dont want it to go to todays workout when renavigating// this is not when it initially loads
      }
    }
  }, [isFocused, userData]);
  useEffect(() => {
    if (isLoading === false) {
      handleScrollToItem(new Date().getDay());
    }
  }, [isLoading]);

  useEffect(() => {
    fillDays();
  }, [allRoutines]);

  // useEffect(() => {
  //   // Fetch workouts whenever a routine is selected
  //   if (selectedRoutine) {
  //     fetchWorkouts(selectedRoutine.routineID);
  //   } else {
  //     // If no routine is selected, reset the workouts state to an empty array
  //     setWorkouts([]);
  //   }
  // }, [selectedRoutine]);
  //////////////////////////////////////////////////////////////////////////////////////////
  ///////////////////////////////////loading//////////////////////////////////////////////
  // console.log(daysRoutines);

  if (isLoading) {
    return (
      <View
        style={{ flex: 1, justifyContent: "center", alignContent: "center" }}
      >
        <ActivityIndicator size={"large"} />
      </View>
    );
  }
  // console.log(new Date().getDay());

  /////////////////////////////////////////////////////////////////////////////////////
  return (
    <View style={styles.container}>
      <Text style={styles.headerTitle}>{userData.firstName}'s Schedule</Text>
      {/* <View></View> */}
      <ScrollView
        ref={scrollViewRef}
        horizontal
        contentContainerStyle={{ paddingHorizontal: 150 }}
        showsHorizontalScrollIndicator={false}
      >
        {renderDays()}
      </ScrollView>
      <View
        style={{
          backgroundColor: "#434B53",
          flex: 100,
          borderTopLeftRadius: 20,
          borderTopRightRadius: 20,
        }}
      >
        <ScrollView>
          <View style={styles.todayWorkoutTitle}>
            <Text style={[styles.todayWorkoutText]}>
              {selectedDay == new Date().getDay()
                ? "Today's"
                : daysOfFullWeek[selectedDay]}{" "}
              Routines
            </Text>
          </View>
          {renderSelectedDayRoutines()}
        </ScrollView>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#2c2c2e",
    // paddingHorizontal: 20
    paddingTop: 50, //adjust for andriod and iphone{NEED TO BE UPDATED}
  },
  headerTitle: {
    // flex: 1,
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    color: "#B8F14A",
    marginBottom: 30,
  },
  daysBox: {
    backgroundColor: "#FFFFFF",
    padding: 20,
    marginBottom: 20,
    marginHorizontal: 10,
    borderRadius: 10,
    borderColor: {},
    height: 100,
    width: 100,
    justifyContent: "center",
    alignContent: "center",
    alignItems: "center",
    // flex: 1,
  },
  dayTitle: {
    color: "#000000",
    fontSize: 25,
    fontWeight: "bold",
    textAlign: "center",
    flexWrap: "wrap",
  },
  paragraph: {
    marginTop: 5,
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
    color: "#FFFFFF",
  },
  subtext: {
    fontSize: 15,
    fontWeight: "bold",
    textAlign: "center",
    color: "#B8F14A",
    marginBottom: 10,
  },
  todayWorkoutTitle: {
    backgroundColor: "#2C2C2C",
    borderRadius: 20, // Increase the border radius for a bigger rounded box
    paddingVertical: 15, // Increase the padding for more height
    paddingHorizontal: 45,
    marginHorizontal: 25,
    marginTop: 20,
    borderColor: "#FFFFFF",
    borderWidth: 2,
    marginBottom: 10,
  },
  todayWorkoutText: {
    fontSize: 28, // Increase the font size for the text
    fontWeight: "bold",
    color: "#FFFFFF",
    textAlign: "center",
  },
  routineBox: {
    backgroundColor: "#2C2C2C",
    // padding: 20,
    marginHorizontal: 25,
    marginBottom: 20,
    borderRadius: 10,
  },
});
