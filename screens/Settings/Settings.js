import React, { useState } from "react";
import { ScrollView, Switch, StyleSheet, Text, View } from "react-native";
import { Avatar, ListItem, Badge } from "react-native-elements";

import BaseIcon from "./Icon";
import Chevron from "./Chevron";
import InfoText from "./InfoText";

import { useDispatch } from "react-redux";
import { signout } from "../../redux/reducers/userReducer";
import firebase from "../../database/firebase";

const styles = StyleSheet.create({
  scroll: {
    backgroundColor: "white",
  },
  userRow: {
    alignItems: "center",
    flexDirection: "row",
    paddingBottom: 8,
    paddingLeft: 15,
    paddingRight: 15,
    paddingTop: 6,
  },
  userImage: {
    marginRight: 12,
  },
  listItemContainer: {
    height: 55,
    borderWidth: 0.5,
    borderColor: "#ECECEC",
  },
});

export default function Settings(props) {
  const dispatch = useDispatch();
  const [isEnabled, setIsEnabled] = useState(true);

  // logout user
  const signOut = () => {
    firebase
      .auth()
      .signOut()
      .then(() => {
        dispatch(signout());
        navigation.navigate("Login");
      })
      .catch((error) => {
        console.log(`home.js - 70 - 🥶`, error);
      });
  };
  // logout user end

  const onPressSetting = () => {
    const data = {
      name: "Aleko Love",
      age: "29",
      wife: "Rebecca Holt",
    };
    props.navigation.navigate("Options", data);
  };

  const toggleSwitch = () => setIsEnabled((previousState) => !previousState);

  const {
    avatar,
    name,
    emails: [firstEmail],
  } = props;
  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      showsHorizontalScrollIndicator={false}
      style={styles.scroll}
    >
      <View style={styles.userRow}>
        <View style={styles.userImage}>
          <Avatar rounded size="large" source={{ uri: avatar }} />
        </View>
        <View>
          <Text style={{ fontSize: 16 }}>{name}</Text>
          <Text
            style={{
              color: "gray",
              fontSize: 16,
            }}
          >
            {firstEmail.email}
          </Text>
        </View>
      </View>
      <InfoText text="Account" />
      <View>
        <ListItem containerStyle={styles.listItemContainer}>
          <BaseIcon
            containerStyle={{
              backgroundColor: "#FFADF2",
            }}
            icon={{
              type: "material",
              name: "notifications",
            }}
          />
          <ListItem.Content>
            <ListItem.Title>Push Notifications</ListItem.Title>
          </ListItem.Content>
          <Switch
            trackColor={{ false: "#767577", true: "#81b0ff" }}
            thumbColor={isEnabled ? "#f5dd4b" : "#f4f3f4"}
            ios_backgroundColor="#3e3e3e"
            onValueChange={toggleSwitch}
            value={isEnabled}
          />
        </ListItem>

        <ListItem
          rightTitle="USD"
          onPress={() => onPressSetting()}
          containerStyle={styles.listItemContainer}
        >
          <BaseIcon
            containerStyle={{ backgroundColor: "#FAD291" }}
            icon={{
              type: "font-awesome",
              name: "money",
            }}
          />
          <ListItem.Content>
            <ListItem.Title>Currency</ListItem.Title>
          </ListItem.Content>
          <Chevron />
        </ListItem>

        <ListItem
          rightTitle="New York"
          onPress={() => onPressSetting()}
          containerStyle={styles.listItemContainer}
        >
          <BaseIcon
            containerStyle={{ backgroundColor: "#57DCE7" }}
            icon={{
              type: "material",
              name: "place",
            }}
          />
          <ListItem.Content>
            <ListItem.Title>Location</ListItem.Title>
          </ListItem.Content>
          <Chevron />
        </ListItem>

        <ListItem
          rightTitle="English"
          onPress={() => onPressSetting()}
          containerStyle={styles.listItemContainer}
        >
          <BaseIcon
            containerStyle={{ backgroundColor: "#FEA8A1" }}
            icon={{
              type: "material",
              name: "language",
            }}
          />
          <ListItem.Content>
            <ListItem.Title>Language</ListItem.Title>
          </ListItem.Content>
          <Chevron />
        </ListItem>
      </View>
      <InfoText text="More" />
      <View>
        <ListItem
          onPress={() => onPressSetting()}
          containerStyle={styles.listItemContainer}
        >
          <BaseIcon
            containerStyle={{ backgroundColor: "#A4C8F0" }}
            icon={{
              type: "ionicon",
              name: "md-information-circle",
            }}
          />
          <ListItem.Content>
            <ListItem.Title>About US</ListItem.Title>
          </ListItem.Content>
          <Chevron />
        </ListItem>

        <ListItem
          onPress={() => onPressSetting()}
          containerStyle={styles.listItemContainer}
        >
          <BaseIcon
            containerStyle={{ backgroundColor: "#C6C7C6" }}
            icon={{
              type: "entypo",
              name: "light-bulb",
            }}
          />
          <ListItem.Content>
            <ListItem.Title>Terms and Policies</ListItem.Title>
          </ListItem.Content>
          <Chevron />
        </ListItem>

        <ListItem
          onPress={() => onPressSetting()}
          containerStyle={styles.listItemContainer}
        >
          <BaseIcon
            containerStyle={{
              backgroundColor: "#C47EFF",
            }}
            icon={{
              type: "entypo",
              name: "share",
            }}
          />
          <ListItem.Content>
            <ListItem.Title>Share our App</ListItem.Title>
          </ListItem.Content>
          <Chevron />
        </ListItem>

        <ListItem
          onPress={() => onPressSetting()}
          containerStyle={styles.listItemContainer}
        >
          <BaseIcon
            containerStyle={{
              backgroundColor: "#FECE44",
            }}
            icon={{
              type: "entypo",
              name: "star",
            }}
          />
          <ListItem.Content>
            <ListItem.Title>Rate Us</ListItem.Title>
          </ListItem.Content>
          <Chevron />
        </ListItem>

        <ListItem
          onPress={() => onPressSetting()}
          containerStyle={styles.listItemContainer}
        >
          <BaseIcon
            containerStyle={{
              backgroundColor: "#00C001",
            }}
            icon={{
              type: "materialicon",
              name: "feedback",
            }}
          />
          <ListItem.Content>
            <ListItem.Title>Send FeedBack</ListItem.Title>
          </ListItem.Content>
          <Badge status="primary" value="999+" />
          <Chevron />
        </ListItem>
        <ListItem onPress={signOut} containerStyle={styles.listItemContainer}>
          <BaseIcon
            containerStyle={{
              backgroundColor: "#808080",
            }}
            icon={{
              type: "materialicon",
              name: "logout",
            }}
          />
          <ListItem.Content>
            <ListItem.Title>Logout</ListItem.Title>
          </ListItem.Content>
        </ListItem>
      </View>
    </ScrollView>
  );
}
