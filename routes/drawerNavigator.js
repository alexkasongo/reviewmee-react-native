import React from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";
// navigation
import TabNavigator from "../routes/tabNavigator";
import Signin from "../screens/signin";
import Signup from "../screens/signup";

// redux
import { useSelector, useDispatch } from "react-redux";

const Drawer = createDrawerNavigator();

export default function DrawerNavigator() {
  const { userInfo } = useSelector((state) => state.user);

  return (
    <Drawer.Navigator>
      <Drawer.Screen name="Home" component={TabNavigator} />
      <Drawer.Screen name="Signin" component={Signin} />
      <Drawer.Screen name="Signup" component={Signup} />
      {/* {userInfo !== null && (
        <Drawer.Screen name="Home" component={TabNavigator} />
        )} */}
      {/* {userInfo === null && <Drawer.Screen name="Signin" component={Signin} />}
      {userInfo === null && <Drawer.Screen name="Signup" component={Signup} />} */}
    </Drawer.Navigator>
  );
}
