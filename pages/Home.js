import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
} from "react-native"; // Update the import statement
import Icon from "react-native-vector-icons/MaterialCommunityIcons"; // Update the import statement to use MaterialCommunityIcons

const workoutExercises = [
  { name: "Bench Press", icon: "weight-lifter" },
  { name: "Incline Press", icon: "weight-lifter" },
  { name: "Dips", icon: "weight-lifter" },
  { name: "Flies", icon: "weight-lifter" },
];

const HomePage = () => {
  const [personSchedule, setPersonSchedule] = useState([]);

  // Function to generate schedule data for 'n' days from the current date
  const generateScheduleData = (numberOfDays) => {
    const currentDate = new Date();
    const scheduleData = [];
    const daysOfWeek = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];
    const currentDayName = daysOfWeek[currentDate.getDay()]; // Get the current day name

    for (let i = 0; i < numberOfDays; i++) {
      const date = new Date(currentDate);
      date.setDate(currentDate.getDate() + i);
      const dayName = daysOfWeek[date.getDay()]; // Get the day name based on the day of the week
      scheduleData.push({ day: dayName, activity: "Not workout selected" }); // Replace 'Some Activity' with actual activities
    }

    return { scheduleData, currentDayName };
  };

  useEffect(() => {
    const numberOfDaysToShow = 7; // You can adjust this number to show more or fewer days
    const { scheduleData, currentDayName } =
      generateScheduleData(numberOfDaysToShow);
    setPersonSchedule(scheduleData);
    setCurrentDay(currentDayName);
  }, []);

  const [currentDay, setCurrentDay] = useState("");

  const renderScheduleItem = ({ item }) => {
    return (
      <View
        style={[
          styles.scheduleItem,
          item.day === currentDay && styles.currentDay,
        ]}
      >
        <Text style={styles.day}>{item.day}</Text>
        <Text style={styles.activity}>{item.activity}</Text>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <Text style={styles.heading}>Hello Loser</Text>

      {/* Main Content */}
      <View style={styles.contentContainer}>
        <Text style={styles.subHeading}>Your Schedule:</Text>

        {/* Calendar Boxes */}
        <FlatList
          data={personSchedule}
          renderItem={renderScheduleItem}
          keyExtractor={(item, index) => index.toString()}
          horizontal
          contentContainerStyle={styles.scheduleContainer}
        />

        {/* Today's Workout Title */}
        <View style={styles.todayWorkoutContainer}>
          <View style={styles.todayWorkoutTitle}>
            <Text style={styles.todayWorkoutText}>Todays Workout</Text>
          </View>
        </View>

        {/* Workout Exercises */}
        <View style={styles.workoutExercisesContainer}>
          {workoutExercises.map((exercise, index) => (
            <TouchableOpacity
              key={index}
              style={styles.workoutExerciseItem}
              onPress={() => console.log(`${exercise.name} is selected!`)} // Replace console.log with your desired action
            >
              <Icon name={exercise.icon} size={18} color="#FFFFFF" />
              <Text style={styles.workoutExerciseText}>{exercise.name}</Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Add some space between the title and other headings */}
        <View style={styles.separator} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 20,
    backgroundColor: "#565656",
    paddingTop: 30, // Add some padding at the top to make space for the header
  },
  contentContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
  },

  heading: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    color: "#FFFFFF",
  },
  subHeading: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
    color: "#FFFFFF",
  },
  scheduleContainer: {
    marginTop: 10,
  },
  todayWorkoutContainer: {
    position: "absolute",
    top: 175, // Adjust this value to move the title higher or lower
    left: 0, // Optional, if you want to align it to the left
    right: 0, // Optional, if you want to align it to the right
    alignItems: "center",
  },
  todayWorkoutTitle: {
    backgroundColor: "#2C2C2C",
    borderRadius: 60, // Increase the border radius for a bigger rounded box
    paddingVertical: 15, // Increase the padding for more height
    paddingHorizontal: 45, // Increase the padding for more width
    alignItems: "center",
    borderWidth: 2, // Add a white border with a width of 2 pixels
    borderColor: "#FFFFFF", // Set the border color to white
  },
  todayWorkoutText: {
    fontSize: 38, // Increase the font size for the text
    fontWeight: "bold",
    color: "#FFFFFF",
  },
  separator: {
    marginTop: 20,
  },
  scheduleItem: {
    width: 150,
    height: 100,
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: 10,
    borderRadius: 15,
    backgroundColor: "#ffffff", // White background color
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 2,
    elevation: 2,
  },
  currentDay: {
    backgroundColor: "#B8F14A", // Light green background color for the current day
  },
  day: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 5,
  },
  activity: {
    fontSize: 14,
    color: "#555555", // Dark gray text color
  },

  workoutExercisesContainer: {
    alignItems: "center",
    marginTop: 15,
    position: "absolute",
  },
  workoutExerciseItem: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#B8F14A",
    borderRadius: 10,
    padding: 8,
    marginVertical: 5,
    width: "90%", // Adjust the width to your preference
    borderRadius: 60, // Increase the border radius for a bigger rounded box
    paddingVertical: 15, // Increase the padding for more height
    paddingHorizontal: 45, // Increase the padding for more width
    alignItems: "center",
    borderWidth: 2, // Add a white border with a width of 2 pixels
    borderColor: "#FFFFFF",
  },
  workoutExerciseText: {
    fontSize: 20, // Increase the font size for the text
    fontWeight: "bold",
    color: "#FFFFFF",
  },
});

export default HomePage;
