import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  ActivityIndicator,
  TouchableOpacity,
  Image,
  Alert,
  ScrollView,
  FlatList,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { addSignee, selectAssignees } from "./AssignSlice";
import { globalStyles } from "../../styles/global";

// form stuff
import { Formik } from "formik";
import * as yup from "yup";
import FlatButton from "../button";
// form stuff end

// a schema is a set of rules defined in an object
const signupSchema = yup.object({
  name: yup.string().required().min(3),
  email: yup.string().required().min(4),
});
// schema end

// dummy data
const dummyData = [
  {
    id: 1,
    name: "Mark Doe",
    status: "active",
    image: "https://bootdey.com/img/Content/avatar/avatar7.png",
  },
  {
    id: 2,
    name: "Clark Man",
    status: "active",
    image: "https://bootdey.com/img/Content/avatar/avatar6.png",
  },
  {
    id: 3,
    name: "Jaden Boor",
    status: "active",
    image: "https://bootdey.com/img/Content/avatar/avatar5.png",
  },
  {
    id: 4,
    name: "Srick Tree",
    status: "active",
    image: "https://bootdey.com/img/Content/avatar/avatar4.png",
  },
  {
    id: 5,
    name: "Erick Doe",
    status: "active",
    image: "https://bootdey.com/img/Content/avatar/avatar3.png",
  },
  {
    id: 6,
    name: "Francis Doe",
    status: "active",
    image: "https://bootdey.com/img/Content/avatar/avatar2.png",
  },
  {
    id: 8,
    name: "Matilde Doe",
    status: "active",
    image: "https://bootdey.com/img/Content/avatar/avatar1.png",
  },
  {
    id: 9,
    name: "John Doe",
    status: "active",
    image: "https://bootdey.com/img/Content/avatar/avatar4.png",
  },
  {
    id: 10,
    name: "Fermod Doe",
    status: "active",
    image: "https://bootdey.com/img/Content/avatar/avatar7.png",
  },
  {
    id: 11,
    name: "Danny Doe",
    status: "active",
    image: "https://bootdey.com/img/Content/avatar/avatar1.png",
  },
];
// dummy data end

const Assign = ({ navigate }) => {
  // const [email, setEmail] = useState("");
  // const [displayName, setDisplayName] = useState("");
  // const [showToast, setShowToast] = useState(false);
  // const assignees = useSelector(selectAssignees);
  // const dispatch = useDispatch();
  const [calls, setCalls] = useState(dummyData);

  // const prepare = () => {
  //   if (assignees.length > 0) {
  //     navigate(`Profile`);
  //     // navigate(`prepareDocument`);
  //   } else {
  //     setShowToast(true);
  //     setTimeout(() => setShowToast(false), 1000);
  //   }
  // };

  // const addUser = (name, email) => {
  //   const key = `${new Date().getTime()}${email}`;
  //   if (name !== "" && email !== "") {
  //     dispatch(addSignee({ key, name, email }));
  //     setEmail("");
  //     setDisplayName("");
  //   }
  // };

  const renderItem = ({ item }) => {
    return (
      <TouchableOpacity>
        <View style={styles.row}>
          <Image source={{ uri: item.image }} style={styles.pic} />
          <View>
            <View style={styles.nameContainer}>
              <Text
                style={styles.nameTxt}
                numberOfLines={1}
                ellipsizeMode="tail"
              >
                {item.name}
              </Text>
              <Text style={styles.mblTxt}>Mobile</Text>
            </View>
            <View style={styles.msgContainer}>
              <Text style={styles.msgTxt}>{item.status}</Text>
            </View>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      {/* <Box padding={3}>
        <Container>
          <Box padding={3}>
            <Heading size="md">Who needs to sign?</Heading>
          </Box>
          <Box padding={2}>
            <TextField
              id="displayName"
              onChange={(event) => setDisplayName(event.value)}
              placeholder="Enter recipient's name"
              label="Name"
              value={displayName}
              type="text"
            />
          </Box>
          <Box padding={2}>
            <TextField
              id="email"
              onChange={(event) => setEmail(event.value)}
              placeholder="Enter recipient's email"
              label="Email"
              value={email}
              type="email"
            />
          </Box>
          <Box padding={2}>
            <Button
              onClick={(event) => {
                addUser(displayName, email);
              }}
              text="Add user"
              color="blue"
              inline
            />
          </Box>
          <Box padding={2}>
            <Table>
              <Table.Header>
                <Table.Row>
                  <Table.HeaderCell>
                    <Text weight="bold">Name</Text>
                  </Table.HeaderCell>
                  <Table.HeaderCell>
                    <Text weight="bold">Email</Text>
                  </Table.HeaderCell>
                </Table.Row>
              </Table.Header>
              <Table.Body>
                {assignees.map((user) => (
                  <Table.Row key={user.key}>
                    <Table.Cell>
                      <Text>{user.name}</Text>
                    </Table.Cell>
                    <Table.Cell>
                      <Text>{user.email}</Text>
                    </Table.Cell>
                  </Table.Row>
                ))}
              </Table.Body>
            </Table>
          </Box>
          <Box padding={2}>
            <Button onClick={prepare} text="Continue" color="blue" inline />
          </Box>
          <Box
            fit
            dangerouslySetInlineStyle={{
              __style: {
                bottom: 50,
                left: "50%",
                transform: "translateX(-50%)",
              },
            }}
            paddingX={1}
            position="fixed"
          >
            {showToast && (
              <Toast color="red" text={<>Please add at least one user</>} />
            )}
          </Box>
        </Container>
      </Box> */}

      <View style={globalStyles.container}>
        <Formik
          initialValues={{
            name: "",
            email: "",
            password: "",
          }}
          validationSchema={signupSchema}
          onSubmit={(values, actions) => {
            actions.resetForm();
            signup(values);
          }}
        >
          {/* if validation fails, yup passes errors in props.errors below */}
          {(props) => (
            <View>
              <View style={styles.header}>
                <Text style={styles.headerTitle}>Who needs to sign?</Text>
              </View>
              <TextInput
                style={globalStyles.input}
                placeholder="name"
                onChangeText={props.handleChange("name")}
                value={props.values.name}
                onBlur={props.handleBlur("name")}
              />
              <Text style={globalStyles.errorText}>
                {props.touched.name && props.errors.name}
              </Text>
              <TextInput
                style={globalStyles.input}
                placeholder="Email"
                onChangeText={props.handleChange("email")}
                value={props.values.email}
                onBlur={props.handleBlur("email")}
              />
              <Text style={globalStyles.errorText}>
                {props.touched.email && props.errors.email}
              </Text>
              <Text style={globalStyles.errorText}>
                {props.touched.password && props.errors.password}
              </Text>
              <FlatButton text="Add user" onPress={props.handleSubmit} />
            </View>
          )}
        </Formik>
        <View style={{ flex: 1, marginTop: 30 }}>
          <FlatList
            showsVerticalScrollIndicator={false}
            // extraData={calls}
            data={calls}
            keyExtractor={(item) => {
              return item.id;
            }}
            renderItem={renderItem}
          />
        </View>
        <View style={{ marginTop: 30 }}>
          <FlatButton text="Continue" />
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};

export default Assign;

const styles = StyleSheet.create({
  inputStyle: {
    width: "100%",
    marginBottom: 15,
    paddingBottom: 15,
    alignSelf: "center",
    borderColor: "#ccc",
    borderBottomWidth: 1,
  },
  loginText: {
    color: "#3740FE",
    marginTop: 25,
    textAlign: "center",
  },
  preloader: {
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    position: "absolute",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#fff",
  },
  header: {
    padding: 30,
    marginBottom: 30,
    alignItems: "center",
    backgroundColor: "#00BFFF",
  },
  headerTitle: {
    fontSize: 30,
    color: "#FFFFFF",
    marginTop: 10,
  },
  // contact list
  row: {
    flexDirection: "row",
    alignItems: "center",
    borderColor: "#DCDCDC",
    backgroundColor: "#fff",
    borderBottomWidth: 1,
    padding: 10,
  },
  pic: {
    borderRadius: 30,
    width: 60,
    height: 60,
  },
  nameContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: 280,
  },
  nameTxt: {
    marginLeft: 15,
    fontWeight: "600",
    color: "#222",
    fontSize: 18,
    width: 170,
  },
  mblTxt: {
    fontWeight: "200",
    color: "#777",
    fontSize: 13,
  },
  msgContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  msgTxt: {
    fontWeight: "400",
    color: "#008B8B",
    fontSize: 12,
    marginLeft: 15,
  },
  // contact list end
});
