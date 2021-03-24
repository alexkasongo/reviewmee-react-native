import { createDrawerNavigator } from "react-navigation-drawer";
import { createAppContainer } from "react-navigation";
import Loginstack from "./loginStack";
import Signupstack from "./signupStack";
import Homestack from "./homeStack";
import AboutStack from "./aboutStack";

const RootDrawerNavigator = createDrawerNavigator({
  Login: {
    screen: Loginstack,
  },
  Signup: {
    screen: Signupstack,
  },
  Home: {
    screen: Homestack,
  },
  About: {
    screen: AboutStack,
  },
});

export default createAppContainer(RootDrawerNavigator);
