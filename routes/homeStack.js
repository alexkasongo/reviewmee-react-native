import { createStackNavigator } from "react-navigation-stack";
import Home from "../screens/home";
import ReviewDetails from "../screens/reviewDetails";

const screens = {
  // every screen automatically gets navigation property on the
  // props assigned to it
  Home: {
    screen: Home,
    navigationOptions: {
      title: "ReviewMee",
      // uncommenting the style below will overide the default style
      // headerStyle: {
      //   backgroundColor: "#eee",
      // },
    },
  },
  ReviewDetails: {
    screen: ReviewDetails,
    navigationOptions: {
      title: "Review Details",
      // headerStyle: {
      //   backgroundColor: "#eee",
      // },
    },
  },
};

const Homestack = createStackNavigator(screens, {
  defaultNavigationOptions: {
    headerTintColor: "#444",
    headerStyle: {
      backgroundColor: "#eee",
      // height: 60,
    },
  },
});

export default Homestack;
