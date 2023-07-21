// Screen2Navigator.js
import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import CatagoriesPage from "../Catagories";
import CatagoryWorkouts from "../CatagoryWorkouts";
import WorkoutDetails from "../WorkoutDetails";
const Stack = createNativeStackNavigator();

const ExerciseNav = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="CatagoriesPage"
        component={CatagoriesPage}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="CatagoryWorkouts"
        component={CatagoryWorkouts}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="WorkoutDetails"
        component={WorkoutDetails}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
};

export default ExerciseNav;
