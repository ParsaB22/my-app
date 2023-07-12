import { TouchableOpacity, View } from "react-native";


function Navbar(){
    return(
        //the nav box
        <View>
            <TouchableOpacity>
                Home
            </TouchableOpacity>
            <TouchableOpacity>
                Calender
            </TouchableOpacity>
            <TouchableOpacity>
                Dumbell
            </TouchableOpacity>
            <TouchableOpacity>
                Profile
            </TouchableOpacity>
        </View>
    );
}

export default Navbar;