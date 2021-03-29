import React, { Component } from "react";
import { Dimensions, FlatList, StyleSheet, View } from "react-native";
import PropTypes from "prop-types";

import Post from "./Post";

const space = 1;
const postContainerWidth = (Dimensions.get("window").width - space * 2) / 2;

const styles = StyleSheet.create({
  container: {},
  postContainer: {
    marginBottom: 1,
    padding: 0,
    borderWidth: 0,
  },
});

// const testPosts = this.props.posts || {};

class Posts extends Component {
  componentDidMount() {
    // console.log(`Profile.js - 68 - 🍎`, this.props.posts);
    // this.props.posts.map((item) => {
    //   console.log(`Posts.js - 28 - 🥶`, item.id);
    // });
  }

  static propTypes = {
    containerStyle: PropTypes.oneOfType([PropTypes.object, PropTypes.number]),
    posts: PropTypes.arrayOf(
      PropTypes.shape({
        image: PropTypes.string,
        imageHeight: PropTypes.number,
        imageWidth: PropTypes.number,
      })
    ),
  };

  static defaultProps = {
    containerStyle: {},
  };

  render() {
    return (
      <View style={{ flex: 1 }}>
        <FlatList
          scrollEnabled={false}
          removeClippedSubviews={false}
          contentContainerStyle={[styles.container, this.props.containerStyle]}
          data={this.props.posts}
          renderItem={(list) => {
            return (
              <Post
                key={`post-${list.item.id} `}
                containerStyle={styles.postContainer}
                postWidth={postContainerWidth}
                {...list.item}
              />
            );
          }}
        />
      </View>
    );
  }
}

export default Posts;
