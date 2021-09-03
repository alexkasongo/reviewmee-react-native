import React, { useEffect } from "react";
import {
  FlatList,
  Text,
  View,
  Image,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import styles from "./styles";
import { categories } from "./dataArrays";
import { getNumberOfContracts } from "./MockDataAPI";

// redux
import { useSelector, useDispatch } from "react-redux";
import { selectUser, setUnsignedUserDocs } from "../../firebase/firebaseSlice";
// redux end

// firebase
import { searchForDocumentToSign } from "../../firebase/firebase";
// firebase end
const { width } = Dimensions.get("window");

export default function CategoriesScreen(props) {
  // get user data
  const user = useSelector(selectUser);
  const dispatch = useDispatch();

  // on mount do this
  useEffect(() => {
    searchForDocumentToSign(user.email).then((res) => {
      dispatch(setUnsignedUserDocs(res));
    });
  }, [dispatch]);

  const onPressCategory = (item) => {
    const title = item.name;
    const category = item;
    props.navigation.navigate("Contracts", { category, title });
  };

  const renderCategory = ({ item }) => (
    <TouchableOpacity onPress={() => onPressCategory(item)}>
      <View style={styles.categoriesItemContainer}>
        <Image
          style={styles.categoriesPhoto}
          source={{ uri: item.photo_url }}
        />
        <Text style={styles.categoriesName}>{item.name}</Text>
        <Text style={styles.categoriesInfo}>
          {getNumberOfContracts(item.id)} contracts
        </Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View>
      <FlatList
        data={categories}
        renderItem={renderCategory}
        keyExtractor={(item) => `${item.id}`}
        style={{
          // remove this when you add more categories
          height: "100%", 
        }}
        // horizontal={true}
        // showsHorizontalScrollIndicator={false}
        // decelerationRate={0}
        // snapToInterval={width - 30}
        // snapToAlignment={"center"}
        // contentInset={{
        //   top: 0,
        //   left: 5,
        //   bottom: 0,
        //   right: 5,
        // }}
      />
      {/* <FlatList
        data={categories}
        renderItem={renderCategory}
        keyExtractor={(item) => `${item.id}`}
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        decelerationRate={0}
        snapToInterval={width - 30}
        snapToAlignment={"center"}
        contentInset={{
          top: 0,
          left: 5,
          bottom: 0,
          right: 5,
        }}
      /> */}
    </View>
  );
}
