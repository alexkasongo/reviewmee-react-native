import { createStackNavigator } from "react-navigation-stack";
import About from "../screens/about";

const screens = {
  // every screen automatically gets navigation property on the
  // props assigned to it
  About: {
    screen: About,
    navigationOptions: {
      title: "About",
      // uncommenting the style below will overide the default style
      // headerStyle: {
      //   backgroundColor: "#eee",
      // },
    },
  },
};

const AboutStack = createStackNavigator(screens, {
  defaultNavigationOptions: {
    headerTintColor: "#444",
    headerStyle: {
      backgroundColor: "#eee",
      height: 60,
    },
  },
});

export default AboutStack;
