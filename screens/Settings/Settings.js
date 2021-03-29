import React, { Component } from "react";
import {
  ScrollView,
  Switch,
  StyleSheet,
  Text,
  View,
  Image,
} from "react-native";
import { Avatar, ListItem, Badge } from "react-native-elements";
import PropTypes from "prop-types";

import BaseIcon from "./Icon";
import Chevron from "./Chevron";
import InfoText from "./InfoText";

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

class SettingsScreen extends Component {
  static propTypes = {
    avatar: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    navigation: PropTypes.object.isRequired,
    emails: PropTypes.arrayOf(
      PropTypes.shape({
        email: PropTypes.string.isRequired,
      })
    ).isRequired,
  };

  state = {
    pushNotifications: true,
  };

  onPressSetting = () => {
    this.props.navigation.navigate("Options");
  };

  onChangePushNotifications = () => {
    this.setState((state) => ({
      pushNotifications: !state.pushNotifications,
    }));
  };

  render() {
    const {
      avatar,
      name,
      emails: [firstEmail],
    } = this.props;
    return (
      <ScrollView style={styles.scroll}>
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
              onValueChange={this.onChangePushNotifications}
              value={this.state.pushNotifications}
            />
          </ListItem>

          <ListItem
            rightTitle="USD"
            onPress={() => this.onPressSetting()}
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
            onPress={() => this.onPressSetting()}
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
            onPress={() => this.onPressSetting()}
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
            onPress={() => this.onPressSetting()}
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
            onPress={() => this.onPressSetting()}
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
            onPress={() => this.onPressSetting()}
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
            onPress={() => this.onPressSetting()}
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
            onPress={() => this.onPressSetting()}
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
            <Badge status="primary" value="99+" />
            <Chevron />
          </ListItem>
        </View>
      </ScrollView>
    );
  }
}

export default SettingsScreen;
