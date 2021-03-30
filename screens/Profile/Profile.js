import React, { useState, useEffect } from "react";
import {
  Animated,
  Image,
  ImageBackground,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import {
  TabView,
  TabBar,
  TabViewPagerScroll,
  TabViewPagerPan,
} from "react-native-tab-view";
import PropTypes from "prop-types";
import { image } from "../../utils";

import profileStyles from "./ProfileStyle";
import Posts from "./Posts";

const styles = StyleSheet.create({ ...profileStyles });

export default function Profile(props) {
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

  const [postsMasonry, setpostsMasonry] = useState(initialState.postsMasonry);
  const [tabs, setTabs] = useState(initialState.tabs);

  useEffect(() => {
    console.log(`login.js - 42 - 👀 Hopefully this works`);
    setpostsMasonry(props.posts, "imageHeight");
  });

  const handleIndexChange = (index) => {
    setTabs({
      tabs: {
        ...initialState.tabs,
        index,
      },
    });
  };

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

  const renderScene = ({ route: { key } }) => {
    switch (key) {
      case "1":
        return renderMansonry2Col();
      case "2":
        return renderMansonry2Col();
      case "3":
        return renderMansonry2Col();
      default:
        return <View />;
    }
  };

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
        <View style={styles.profileImageContainer}>
          <Image source={{ uri: avatar }} style={styles.profileImage} />
        </View>
      </View>
    );
  };

  const renderMansonry2Col = () => {
    return (
      <View style={styles.masonryContainer}>
        <View>
          <Posts
            containerStyle={styles.sceneContainer}
            posts={postsMasonry.leftCol}
          />
        </View>
        <View>
          <Posts
            containerStyle={styles.sceneContainer}
            posts={postsMasonry.rightCol}
          />
        </View>
      </View>
    );
  };

  return (
    <ScrollView style={styles.scroll}>
      <View style={[styles.container]}>
        <View style={styles.cardContainer}>
          {renderContactHeader()}
          {/* <TabView
          style={[styles.tabContainer]}
          navigationState={tabs}
          renderScene={renderScene}
          renderTabBar={renderTabBar}
          onIndexChange={handleIndexChange}
        /> */}
        </View>
      </View>
    </ScrollView>
  );
}
