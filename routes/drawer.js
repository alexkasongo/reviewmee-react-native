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

// const Drawer = createDrawerNavigator();

// function Navigator() {
//   return (
// <Drawer.Navigator>
//   <Drawer.Screen name="Login" component={Loginstack} />
//   <Drawer.Screen name="Signup" component={Signupstack} />
//   <Drawer.Screen name="Home" component={Homestack} />
//   <Drawer.Screen name="About" component={AboutStack} />
// </Drawer.Navigator>
//   );
// }

// export default createAppContainer(Navigator);
