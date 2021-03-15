import { createStackNavigator } from "react-navigation-stack";
import { createAppContainer } from "react-navigation";
import Home from "../screens/home";
import ReviewDetails from "../screens/reviewDetails";

const screens = {
  // every screen automatically gets navigation property on the
  // props assigned to it
  Home: {
    screen: Home,
  },
  ReviewDetails: {
    screen: ReviewDetails,
  },
};

const Homestack = createStackNavigator(screens);

export default createAppContainer(Homestack);
