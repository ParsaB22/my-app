const app_name = "cop4331-11-5d7eed2a3d7c";
exports.buildPath = function buildPath(route) {
  if (process.env.NODE_ENV === "production") {
    return "https://" + app_name + ".herokuapp.com/" + route;
  } else {
    // return "http://localhost:5000/" + route;
    return "https://" + app_name + ".herokuapp.com/" + route;
  }
};
