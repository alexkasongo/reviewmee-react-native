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

const Drawer = createDrawerNavigator();

export default function DrawerNavigator() {
  const user = useSelector(selectUser);
  const dispatch = useDispatch();

  useEffect(() => {
    auth.onAuthStateChanged(async (res) => {
      if (res) {
        // console.log(`drawerNavigator.js - 22 - 🏝 user LOGGED IN`);
        // const user = await generateUserDocument(userAuth);
        // const { uid, displayName, email, photoURL } = res;
        // dispatch(setUser({ uid, displayName, email, photoURL }));
        // console.log(
        //   `drawerNavigator.js - 25 - 🍎 doing this just to push up code`,
        //   uid,
        //   displayName,
        //   email,
        //   photoURL
        // );
        // dispatch(setUser({ uid, displayName, email, photoURL }));
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
        // <Drawer.Screen name="Signup" component={Signup} />
        // User is signed in
        <Drawer.Screen name="Home" component={TabNavigator} />
      )}
    </Drawer.Navigator>
  );
}
