const {
  default: AsyncStorage,
} = require("@react-native-async-storage/async-storage");

exports.storeToken = function (tok) {
  try {
    AsyncStorage.setItem("token_data", tok.accessToken);
  } catch (e) {
    console.log(e.message);
  }
};

exports.retrieveToken = function () {
  var ud;
  try {
    ud = AsyncStorage.getItem("token_data");
  } catch (e) {
    console.log(e.message);
  }
  return ud;
};
