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
    auth.onAuthStateChanged(async (userAuth) => {
      if (userAuth) {
        const user = await generateUserDocument(userAuth);
        const { uid, displayName, email, photoURL } = user;
        dispatch(setUser({ uid, displayName, email, photoURL }));
      }
    });
  }, [dispatch]);

  return (
    <Drawer.Navigator>
      {user !== null && <Drawer.Screen name="Home" component={TabNavigator} />}
      {user === null && <Drawer.Screen name="Signin" component={Signin} />}
      {user === null && <Drawer.Screen name="Signup" component={Signup} />}
    </Drawer.Navigator>
  );
}
