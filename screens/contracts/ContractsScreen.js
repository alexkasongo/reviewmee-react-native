import React, { useEffect } from "react";
import { FlatList, Text, View, Image, TouchableOpacity } from "react-native";
import styles from "./styles";
import { categories } from "./dataArrays";
import { getNumberOfRecipes } from "./MockDataAPI";

// redux
import { useSelector, useDispatch } from "react-redux";
import { selectUser, setUserDocs } from "../../firebase/firebaseSlice";
// redux end

// firebase
import { searchForDocumentToSign } from "../../firebase/firebase";
// firebase end

export default function ContractsScreen(props) {
  // get user data
  const user = useSelector(selectUser);
  const dispatch = useDispatch();

  // on mount do this
  useEffect(() => {
    searchForDocumentToSign(user.email).then((res) => {
      dispatch(setUserDocs(res));
    });
  }, [dispatch]);

  const onPressCategory = (item) => {
    const title = item.name;
    const category = item;
    props.navigation.navigate("Modal", { category, title });
  };

  const renderCategory = ({ item }) => (
    <TouchableOpacity onPress={() => onPressCategory(item)}>
      <View style={styles.categoriesItemContainer}>
        {/* <Image
          style={styles.categoriesPhoto}
          source={{ uri: item.photo_url }}
        /> */}
        <Text style={styles.categoriesName}>{item.name}</Text>
        <Text style={styles.categoriesInfo}>
          {getNumberOfRecipes(item.id)} contracts
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
      />
    </View>
  );
}
