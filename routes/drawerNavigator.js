import React from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";
// navigation
import TabNavigator from "../routes/tabNavigator";
// import Home from "../screens/home";
import Login from "../screens/login";
import Signup from "../screens/signup";

// redux
import { useSelector, useDispatch } from "react-redux";

const Drawer = createDrawerNavigator();

export default function DrawerNavigator() {
  const { userInfo } = useSelector((state) => state.user);

  return (
    <Drawer.Navigator>
      {userInfo !== null && (
        <Drawer.Screen name="Home" component={TabNavigator} />
      )}
      {userInfo === null && <Drawer.Screen name="Login" component={Login} />}
      {userInfo === null && <Drawer.Screen name="Signup" component={Signup} />}
    </Drawer.Navigator>
  );
}
