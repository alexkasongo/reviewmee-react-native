import React, { useState, useEffect } from "react";
import {
  Text,
  View,
  Image,
  Animated,
  FlatList,
  StyleSheet,
  Dimensions,
  ScrollView,
  ImageBackground,
  TouchableOpacity,
} from "react-native";
import { TabView, TabBar, SceneMap } from "react-native-tab-view";

import profileStyles from "./ProfileStyle";

import { useSelector, useDispatch } from "react-redux";
import { setUser, selectUser } from "../../firebase/firebaseSlice";

const styles = StyleSheet.create({ ...profileStyles });

export default function Profile(props) {
  const user = useSelector(selectUser);

  useEffect(() => {
    console.log(`login.js - 42 - 🌎Hopefully this works`, user);
    // setpostsMasonry(props.posts);
  });

  const initialState = {
    tabs: {
      index: 0,
      routes: [
        { key: "1", title: "Consents", count: 12 },
        { key: "2", title: "Signed", count: 10 },
        { key: "3", title: "Pending", count: 4 },
      ],
    },
    postsMasonry: {},
  };

  // State
  const [tabs, setTabs] = useState(initialState.tabs);

  const handleIndexChange = (index) => {
    setTabs({
      tabs: {
        ...initialState.tabs,
        index,
      },
    });
  };

  // renderscene fix
  const FirstRoute = () => (
    <View style={[styles.scene]}>
      {/* <Text>Hello Aleko 😊</Text> */}
      <FlatList
        vertical
        showsVerticalScrollIndicator={false}
        numColumns={2}
        removeClippedSubviews={false}
        // contentContainerStyle={[styles.container]}
        data={props.posts}
        renderItem={({ item }) => (
          <ScrollView
            showsVerticalScrollIndicator={false}
            showsHorizontalScrollIndicator={false}
            style={styles.scroll}
          >
            <TouchableOpacity onPress={() => props.navigation.navigate("Home")}>
              <View style={RecipeCard.container}>
                <Image style={RecipeCard.photo} source={{ uri: item.image }} />
                <Text style={RecipeCard.title}>{item.user.name}</Text>
                <Text style={RecipeCard.category}>{item.user.email}</Text>
              </View>
            </TouchableOpacity>
          </ScrollView>
        )}
        // keyExtractor={(item) => item.id}
      />
    </View>
  );

  const SecondRoute = () => (
    <View style={[styles.scene, { backgroundColor: "#673ab7" }]} />
  );
  const ThirdRoute = () => (
    <View style={[styles.scene, { backgroundColor: "#ff4081" }]} />
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

  const renderLabel = (props) => ({ route }) => {
    const routes = props.navigationState.routes;

    let labels = [];
    routes.forEach((e, index) => {
      labels.push(index === props.navigationState.index ? "black" : "gray");
    });

    const currentIndex = parseInt(route.key) - 1;
    const color = labels[currentIndex];

    return (
      <View style={styles.tabRow}>
        <Animated.Text style={[styles.tabLabelNumber, { color }]}>
          {route.count}
        </Animated.Text>
        <Animated.Text style={[styles.tabLabelText, { color }]}>
          {route.title}
        </Animated.Text>
      </View>
    );
  };

  // render scene fix
  const [index, setIndex] = useState(0);
  const [routes] = useState([
    { key: "first", title: "Consents", count: 12 },
    { key: "second", title: "Signed", count: 8 },
    { key: "third", title: "Pending", count: 4 },
  ]);

  const renderScene = SceneMap({
    first: FirstRoute,
    second: SecondRoute,
    third: ThirdRoute,
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
    <View style={[styles.container]}>
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
const RECIPE_ITEM_HEIGHT = 150;
const RECIPE_ITEM_MARGIN = 20;

// 2 photos per width
const RecipeCard = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-between",
    alignItems: "center",
    marginLeft: RECIPE_ITEM_MARGIN,
    marginTop: 20,
    width:
      (SCREEN_WIDTH - (recipeNumColums + 1) * RECIPE_ITEM_MARGIN) /
      recipeNumColums,
    height: RECIPE_ITEM_HEIGHT + 75,
    borderColor: "#cccccc",
    borderWidth: 0.5,
    borderRadius: 15,
  },
  photo: {
    width:
      (SCREEN_WIDTH - (recipeNumColums + 1) * RECIPE_ITEM_MARGIN) /
      recipeNumColums,
    height: RECIPE_ITEM_HEIGHT,
    borderRadius: 15,
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
  },
  title: {
    flex: 1,
    fontSize: 17,
    fontWeight: "bold",
    textAlign: "center",
    color: "#444444",
    marginTop: 3,
    marginRight: 5,
    marginLeft: 5,
  },
  category: {
    marginTop: 5,
    marginBottom: 5,
  },
});
