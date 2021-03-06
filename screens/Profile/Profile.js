import React, { useState, useEffect } from "react";
import {
  Text,
  View,
  Modal,
  Image,
  Button,
  Keyboard,
  FlatList,
  Animated,
  StyleSheet,
  Dimensions,
  ScrollView,
  ImageBackground,
  TouchableOpacity,
} from "react-native";
import { useFocusEffect } from "@react-navigation/native";
import { TabView, TabBar, SceneMap } from "react-native-tab-view";


import profileStyles from "./ProfileStyle";

import { useSelector, useDispatch } from "react-redux";
import {
  setUser,
  selectUser,
  setUnsignedUserDocs,
  setSignedUserDocs,
  selectUserDocs,
  selectSignedUserDocs,
} from "../../firebase/firebaseSlice";

import { setCurrentPdf } from "../../shared/pdfReader/pdfReaderSlice";

// components
import Pending from "../../shared/Pending/pending";
// components end

// from firebase
import {
  searchForDocumentToSign,
  searchForDocumentsSigned,
} from "../../firebase/firebase";

const styles = StyleSheet.create({ ...profileStyles });

export default function UserProfile(props) {
  // get user data 
  const user = useSelector(selectUser);
  const userDocs = useSelector(selectUserDocs);
  const signedUserDocs = useSelector(selectSignedUserDocs);
  const dispatch = useDispatch();

  // only runs if the screen is currently focused.
  useFocusEffect(
    React.useCallback(() => {
      // console.log(`Profile.js - 58 - 🌿`);
    }, [])
  );

  // on mount do this
  useEffect(() => {
    searchForDocumentToSign(user.email).then((res) => {
      dispatch(setUnsignedUserDocs(res));
    });

    searchForDocumentsSigned(user.email).then((res) => {
      dispatch(setSignedUserDocs(res));
    });
  }, [dispatch]);

  const initialState = {
    tabs: {
      index: 0,
      // initial routes state, no longer in use
      // routes: [
      //   { key: "1", title: "Consents", count: 12 },
      //   { key: "2", title: "Signed", count: 10 },
      //   { key: "3", title: "Pending", count: 4 },
      // ],
    },
    postsMasonry: {},
  };

  // State
  const [modalOpen, setModalOpen] = useState(false);
  const [tabs, setTabs] = useState(initialState.tabs);
  // State end

  // open pdf viewer
  const openPdfViewer = (pdfDocRef) => {
    dispatch(setCurrentPdf(pdfDocRef)), setModalOpen(true);
    props.navigation.navigate("PdfReader");
  };
  // open pdf viewer end

  const handleIndexChange = (index) => {
    //  set the index here to use for changing color/opacity
    setIndex(index);

    setTabs({
      tabs: {
        ...initialState.tabs,
        index,
      },
    });
  };
  // NOTE decide on whether to keep this code 
  // renderscene fix - updated this to have same logic as Secondroute
  // const FirstRoute = () => (
  //   <View style={[styles.scene]}>
  //     {/* <Text>Hello Aleko 😊</Text> */}
  //     <FlatList
  //       vertical
  //       showsVerticalScrollIndicator={false}
  //       numColumns={2}
  //       removeClippedSubviews={false}
  //       // contentContainerStyle={[styles.container]}
  //       data={props.posts}
  //       renderItem={({ item }) => (
  //         <ScrollView
  //           showsVerticalScrollIndicator={false}
  //           showsHorizontalScrollIndicator={false}
  //           style={styles.scroll}
  //         >
  //           <TouchableOpacity>
  //             <View style={ProfileCard.main}>
  //               <View style={ProfileCard.signedContainer}>
  //                 <TouchableOpacity
  //                   onPress={() => console.log(`Profile.js - 130 - ✅`, item)}
  //                   // onPress={() => openPdfViewer(`${item.docRef}`)}
  //                 >
  //                   <Image
  //                     style={ProfileCard.photo}
  //                     source={{ uri: item.image }}
  //                   />
  //                 </TouchableOpacity>
  //                 <View style={[ProfileCard.btmContainer]}>
  //                   <Text style={ProfileCard.title}>Signed by:</Text>
  //                   <Text style={ProfileCard.category}>{item.user.name}</Text>
  //                 </View>
  //               </View>
  //             </View>
  //           </TouchableOpacity>
  //         </ScrollView>
  //       )}
  //       // keyExtractor={(item) => item.id}
  //     />
  //   </View>
  // ); 

  // First route 
  const FirstRoute = () => (
    <View style={[styles.scene]}>
      <FlatList
        vertical
        showsVerticalScrollIndicator={false}
        numColumns={2}
        removeClippedSubviews={false}
        data={signedUserDocs}
        renderItem={({ item }) => (
          <ScrollView
            showsVerticalScrollIndicator={false}
            showsHorizontalScrollIndicator={false}
            style={styles.scroll}
          >
            <View style={ProfileCard.signedContainer}>
              <TouchableOpacity 
              onPress={() => console.log(`Profile.js - 168 - 🏖`, item)}
              // onPress={() => openPdfViewer(`${item.docRef}`)}
              >
                <Image
                  style={ProfileCard.photo}
                  source={{ uri: item.photoURL }}
                />
              </TouchableOpacity>
              <View style={[ProfileCard.btmContainer]}>
                <Text style={ProfileCard.title}>Signed by:</Text>
                <Text style={ProfileCard.category}>{item.signerName}</Text>
              </View>
            </View>
          </ScrollView>
        )}
        keyExtractor={(item) => item.docId}
      />
    </View>
  );
  
  // Second route
  const SecondRoute = () => (
    <View style={[styles.scene]}>
      <FlatList
        vertical
        showsVerticalScrollIndicator={false}
        numColumns={2}
        removeClippedSubviews={false}
        data={signedUserDocs}
        renderItem={({ item }) => (
          <ScrollView
            showsVerticalScrollIndicator={false}
            showsHorizontalScrollIndicator={false}
            style={styles.scroll}
          >
            <View style={ProfileCard.signedContainer}>
              <TouchableOpacity 
              onPress={() => console.log(`Profile.js - 168 - 🏖`, item)}
              // onPress={() => openPdfViewer(`${item.docRef}`)}
              >
                <Image
                  style={ProfileCard.photo}
                  source={{ uri: item.photoURL }}
                />
              </TouchableOpacity>
              <View style={[ProfileCard.btmContainer]}>
                <Text style={ProfileCard.title}>Signed by:</Text>
                <Text style={ProfileCard.category}>{item.signerName}</Text>
              </View>
            </View>
          </ScrollView>
        )}
        keyExtractor={(item) => item.docId}
      />
    </View>
  );
  
  // Third Route
  const ThirdRoute = () => (
    <View style={[styles.scene]}>
      <FlatList
        vertical
        showsVerticalScrollIndicator={false}
        numColumns={2}
        removeClippedSubviews={false}
        data={userDocs}
        renderItem={({ item }) => (
          <ScrollView
            showsVerticalScrollIndicator={false}
            showsHorizontalScrollIndicator={false}
            style={styles.scroll}
          >
            <View style={ProfileCard.container}>
              <TouchableOpacity onPress={() => openPdfViewer(`${item.docRef}`)}>
                <Image
                  style={ProfileCard.photo}
                  source={{ uri: item.photoURL }}
                />
              </TouchableOpacity>
              <View style={[ProfileCard.btmContainer]}>
                <Text style={ProfileCard.title}>{item.doc}</Text>
                <Text style={ProfileCard.category}>{item.email}</Text>
                <Button
                  title="sign"
                  onPress={() => props.navigation.navigate("PendingToSign")}
                />
              </View>
            </View>
          </ScrollView>
        )}
        keyExtractor={(item) => item.docId}
      />
    </View>
  );

  const initialLayout = { width: Dimensions.get("window").width };
  // renderscene fix end

  const renderTabBar = (props) => {
    return (
      <TabBar
        indicatorStyle={styles.indicatorTab}
        renderLabel={renderLabel(props)}
        pressOpacity={0.8}
        style={styles.tabBar}
        {...props}
      />
    );
  };

  const renderLabel =
    (props) =>
    ({ route }) => {
      const routes = props.navigationState.routes;

      let labels = [];
      routes.forEach((e, index) => {
        labels.push(index === props.navigationState.index ? "black" : "gray");
      });

      const currentIndex = parseInt(route.key) - 1;

      const color = labels[currentIndex];

      return (
        <View style={styles.tabRow}>
          <Animated.Text style={([styles.tabLabelNumber], { color })}>
            {route.count}
          </Animated.Text>
          <Animated.Text style={([styles.tabLabelText], { color })}>
            {route.title}
          </Animated.Text>
        </View>
      );
    };

  // render scene fix here
  const [index, setIndex] = useState(0);
  const [routes] = useState([
    { key: "1", title: "Consents", count: 12 },
    { key: "2", title: "Signed", count: 8 },
    { key: "3", title: "Pending", count: 4 },
  ]);

  const renderScene = SceneMap({
    1: FirstRoute,
    2: SecondRoute,
    3: ThirdRoute,
  });

  const renderContactHeader = () => {
    const { avatar, avatarBackground, name, bio } = props;

    return (
      <View style={styles.headerContainer}>
        <View style={styles.coverContainer}>
          <ImageBackground
            source={{ uri: avatarBackground }}
            style={styles.coverImage}
          >
            <View style={styles.coverTitleContainer}>
              <Text style={styles.coverTitle} />
            </View>
            <View style={styles.coverMetaContainer}>
              <Text style={styles.coverName}>{name}</Text>
              <Text style={styles.coverBio}>{bio}</Text>
            </View>
          </ImageBackground>
        </View>
        <TouchableOpacity
          onPress={() => props.navigation.navigate("Settings")}
          style={styles.profileImageContainer}
        >
          <Image source={{ uri: avatar }} style={styles.profileImage} />
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <View style={styles.cardContainer}>
      {renderContactHeader()}
      <TabView
        style={[styles.tabContainer]}
        navigationState={{ index, routes }}
        renderScene={renderScene}
        renderTabBar={renderTabBar}
        onIndexChange={handleIndexChange}
      />
    </View>
  );
}

// screen sizing
const { width, height } = Dimensions.get("window");
// screen half height
const halfHeight = height / 1.4;
// orientation must fixed
const SCREEN_WIDTH = width < height ? width : height;

const recipeNumColums = 2;
// item size
const CONTRACT_ITEM_HEIGHT = 125;
const RECIPE_ITEM_MARGIN = 10;

// 2 photos per width
const ProfileCard = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    // marginLeft: RECIPE_ITEM_MARGIN,
    marginRight: 5,
    marginLeft: 5,
    marginTop: 20,
    width:
      (SCREEN_WIDTH - (recipeNumColums + 1) * RECIPE_ITEM_MARGIN) /
      recipeNumColums,
    height: CONTRACT_ITEM_HEIGHT + 100,
    borderColor: "#cccccc",
    borderWidth: 0.5,
    borderRadius: 15,
  },
  signedContainer: {
    flex: 1,
    alignItems: "center",
    // marginLeft: RECIPE_ITEM_MARGIN,
    marginRight: 5,
    marginLeft: 5,
    marginTop: 20,
    width:
      (SCREEN_WIDTH - (recipeNumColums + 1) * RECIPE_ITEM_MARGIN) /
      recipeNumColums,
    height: CONTRACT_ITEM_HEIGHT + 70,
    borderColor: "#cccccc",
    borderWidth: 0.5,
    borderRadius: 15,
  },
  photo: {
    width:
      (SCREEN_WIDTH - (recipeNumColums + 1) * RECIPE_ITEM_MARGIN) /
      recipeNumColums,
    height: CONTRACT_ITEM_HEIGHT,
    borderRadius: 15,
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
  },
  title: {
    // flex: 1,
    fontSize: 17,
    fontWeight: "bold",
    textAlign: "center",
    color: "#444444",
  },
  category: {
    // marginTop: 5,
  },
  btmContainer: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "space-between",
    alignItems: "center",
    paddingTop: 10,
    paddingBottom: 10,
  },
  modalToggle: {
    marginBottom: 10,
    borderWidth: 1,
    borderColor: "#f2f2f2",
    padding: 10,
    borderRadius: 10,
    alignSelf: "center",
  },
  modalClose: {
    marginTop: 40,
    marginBottom: 10,
  },
});
