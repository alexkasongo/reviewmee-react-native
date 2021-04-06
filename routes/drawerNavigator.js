import React, { useEffect } from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";
// navigation
import TabNavigator from "../routes/tabNavigator";
import Signin from "../screens/signin";
import Signup from "../screens/signup";

// redux
import { useSelector, useDispatch } from "react-redux";
import { auth, generateUserDocument } from "../firebase/firebase";
import { setUser, selectUser } from "../firebase/firebaseSlice";
// redux end

const Drawer = createDrawerNavigator();

export default function DrawerNavigator() {
  const user = useSelector(selectUser);
  const dispatch = useDispatch();

  useEffect(() => {
    console.log(`drawerNavigator.js - 23 - 🩳`, user);
    auth.onAuthStateChanged(async (res) => {
      if (res) {
        // user is logged, you can perform some action here
      } else {
        dispatch(setUser(null));
      }
    });
  }, [dispatch]);

  return (
    <Drawer.Navigator>
      {user == null ? (
        // No token found, user isn't signed in
        <>
          <Drawer.Screen name="Signin" component={Signin} />
          <Drawer.Screen name="Signup" component={Signup} />
        </>
      ) : (
        // User is signed in
        <Drawer.Screen name="Home" component={TabNavigator} />
      )}
    </Drawer.Navigator>
  );
}
