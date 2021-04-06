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

  // useEffect(() => {
  //   auth.onAuthStateChanged(async (res) => {
  //     if (res) {
  //       console.log(`drawerNavigator.js - 22 - 🏝`, user);
  //       // const user = await generateUserDocument(userAuth);
  //       const { uid, displayName, email, photoURL } = res;
  //       // dispatch(setUser({ uid, displayName, email, photoURL }));
  //       console.log(
  //         `drawerNavigator.js - 25 - 🍎 doing this just to push up code`,
  //         uid,
  //         displayName,
  //         email,
  //         photoURL
  //       );

  //       dispatch(setUser({ uid, displayName, email, photoURL }));
  //     }
  //   });
  // }, [dispatch]);

  // let user = null;

  // useEffect(() => {
  //   auth.onAuthStateChanged(async (res) => {
  //     if (res) {
  //       console.log(`drawerNavigator.js - 22 - 🏝 user EXISTS`);
  //       // user = res;
  //     } else {
  //       // user = null;
  //       console.log(`drawerNavigator.js - 48 - 🌦 user is NULL`);
  //     }
  //   });
  // }, [user]);

  // return (
  //   <Drawer.Navigator>
  //     <Drawer.Screen name="Home" component={TabNavigator} />
  //     <Drawer.Screen name="Signin" component={Signin} />
  //     <Drawer.Screen name="Signup" component={Signup} />
  //     {/* {user !== null && <Drawer.Screen name="Home" component={TabNavigator} />}
  //     {user === null && <Drawer.Screen name="Signin" component={Signin} />}
  //     {user === null && <Drawer.Screen name="Signup" component={Signup} />} */}
  //   </Drawer.Navigator>
  // );

  // if (state.isLoading) {
  //   // We haven't finished checking for the token yet
  //   return <SplashScreen />;
  // }

  return (
    <Drawer.Navigator>
      {user == null ? (
        // No token found, user isn't signed in
        <Drawer.Screen name="Signin" component={Signin} />
      ) : (
        // <Drawer.Screen name="Signup" component={Signup} />
        // User is signed in
        <Drawer.Screen name="Home" component={TabNavigator} />
      )}
    </Drawer.Navigator>
  );
}
