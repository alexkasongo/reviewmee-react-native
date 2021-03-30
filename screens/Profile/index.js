import React from "react";
import PropTypes from "prop-types";

import contactData from "./contact.json";

import Profile from "./Profile";

const ProfileScreen = (props) => <Profile {...contactData} {...props} />;

ProfileScreen.navigationOptions = () => ({
  header: null,
});

ProfileScreen.propTypes = {
  navigation: PropTypes.object.isRequired,
};

export default ProfileScreen;
