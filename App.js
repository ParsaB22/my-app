import StartUp from "./pages/StartUpPage";
import Login from "./pages/Login";
import Register from "./pages/Register";
import EmailV from "./pages/EmailVerification";
import Confirmed from "./pages/EmailConfirmed";
import ForgotPassword from "./pages/ForgotPassword";
import NewPass from "./pages/NewPassword";
import PassVerified from "./pages/PassVerified";
import PasswordCode from "./pages/PasswordCode";
import BackButt from "./components/BackButton";
// import CatagoriesPage from "./pages/Catagories";
// import RoutinePage from "./pages/RoutinePage";
// import RoutineWorkouts from "./pages/RoutineWorkouts";
// import CatagoryWorkouts from "./pages/CatagoryWorkouts";
// import WorkoutDetails from "./pages/WorkoutDetails";

import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

const Stack = createNativeStackNavigator();
const Tabs = createBottomTabNavigator();
// Collaberate together to make the design better below:
// make navigation transitions better
//get better way to get svg images
//work on navigation propertys
import HomePage from "./pages/Home";
import RoutineNav from "./pages/BottomNavBar.js/RoutineNav";
import ExerciseNav from "./pages/BottomNavBar.js/ExerciseNav";
import ProfilePage from "./pages/Profile";
//Paths
//StartUp -> login -> Home(home not yet created)
//Startup -> login -> forgotPassword -> PasswordCode -> NewPassword -> pass Verified -> login
//Startup -> register -> emailVerfication -> emailConfirmation -> login

export default function App() {
  return (
    // <NavigationContainer>
    //   <Tabs.Navigator>
    //     <Tabs.Screen
    //       name="Home"
    //       component={HomePage}
    //       options={{ headerShown: false }}
    //     />
    //     <Tabs.Screen
    //       name="Routine"
    //       component={RoutineNav}
    //       options={{ headerShown: false }}
    //     />
    //     <Tabs.Screen
    //       name="Exercise"
    //       component={ExerciseNav}
    //       options={{ headerShown: false }}
    //     />
    //     <Tabs.Screen
    //       name="Profile"
    //       component={ProfilePage}
    //       options={{ headerShown: false }}
    //     />
    //   </Tabs.Navigator>
    // </NavigationContainer>
    // <CatagoriesPage />

    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="StartUp"
          component={StartUp}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Login"
          component={Login}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Register"
          component={Register}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="ForgotPassword"
          component={ForgotPassword}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="EmailVerification"
          component={EmailV}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="EmailConfirmed"
          component={Confirmed}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="PasswordCode"
          component={PasswordCode}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="NewPassword"
          component={NewPass}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="PassVerified"
          component={PassVerified}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
{
  /**All TouchOpacities with just Text and no style have width of screen need to fix it to just width of inside Text */
}
