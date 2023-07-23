import StartUp from "../StartUpPage";
import Login from "../Login";
import Register from "../Register";
import EmailV from "../EmailVerification";
import Confirmed from "../EmailConfirmed";
import ForgotPassword from "../ForgotPassword";
import NewPass from "../NewPassword";
import PassVerified from "../PassVerified";
import PasswordCode from "../PasswordCode";
// import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

const Stack = createNativeStackNavigator();

export default function LoginNav() {
  return (
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
  );
}
