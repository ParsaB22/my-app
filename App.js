// Collaberate together to make the design better below:
// make navigation transitions better
//get better way to get svg images
//work on navigation propertys

import { AuthProvider } from "./pages/context/AuthContext";
import AppNav from "./pages/NavigationStuff/AppNav";

export default function App() {
  return (
    <AuthProvider>
      <AppNav />
    </AuthProvider>
  );
}
{
  /**All TouchOpacities with just Text and no style have width of screen need to fix it to just width of inside Text */
}
