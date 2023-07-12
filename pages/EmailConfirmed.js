import { Text, View, StyleSheet, TouchableOpacity, SafeAreaView,TouchableHighlight, TextInput} from 'react-native';
import { SvgUri } from 'react-native-svg';

export default function Confirmed({navigation}) {
  return (
    <SafeAreaView style={styles.container}>
    
    <View style={styles.box}>{/*will be a box for now*/}
    <View style={styles.circle}/>{/**Add drop shadow properties */}
    <Text style={styles.dirText}>Verified!</Text>
    <Text style={styles.subText}>Thank you for signing up with us.</Text>
    </View>
      <TouchableOpacity onPress={()=>{navigation.navigate('Login')}} style={styles.button}>
        <Text style={styles.paragraph}>Back to Login</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    // alignContent:'center',
    backgroundColor: '#2C2C2E',

  },
  dirText:{
    fontSize: 36,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#000000',
  }, 
  subText: {
    margin: 5,
    fontSize: 20,
    // fontWeight: 'bold',
    textAlign: 'center',
  },
  button: {
    marginTop:40,
    marginBottom: 15,
    backgroundColor: '#B8F14A',
    borderRadius: 10,
    marginLeft:75,
    marginRight:75,

  },
  paragraph: {
    margin: 20,
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  box:{
    height:430,
    backgroundColor: '#B8F14A',
    borderRadius:10,
    justifyContent:'center',
    margin:24,
  },
  circle: {
    height: 200,
    width:200,
    backgroundColor: '#1E1E1E',
    // borderWidth: 10,
    // borderColor: '#000000',
    borderRadius:100,
    margin: 20,
    alignSelf:'center',
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.5,
    shadowRadius: 8,//blur
    // elevation: 4,

  }
});