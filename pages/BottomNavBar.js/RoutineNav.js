import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import RoutinePage from "../RoutinePage";
import RoutineWorkouts from "../RoutineWorkouts";
import CatagoryWorkouts from "../CatagoryWorkouts";
import WorkoutDetails from "../WorkoutDetails";

const Stack = createNativeStackNavigator();

const RoutineNav = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="RoutinePage"
        component={RoutinePage}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="RoutineWorkouts"
        component={RoutineWorkouts}
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

export default RoutineNav;
