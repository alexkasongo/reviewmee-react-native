import React, { useState, useEffect } from "react";
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
const assignSchema = yup.object({
  displayName: yup.string().required().min(3),
  email: yup.string().required().min(4),
});
// schema end

const Assign = ({ navigate }) => {
  useEffect(() => {
    console.log(`Profile.js - 42 - 👀`, assignees);
  }, []);

  // const [email, setEmail] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [showToast, setShowToast] = useState(false);
  const assignees = useSelector(selectAssignees);
  const dispatch = useDispatch();
  const [calls, setCalls] = useState();

  // const prepare = () => {
  //   if (assignees.length > 0) {
  //     navigate(`Profile`);
  //     // navigate(`prepareDocument`);
  //   } else {
  //     setShowToast(true);
  //     setTimeout(() => setShowToast(false), 1000);
  //   }
  // };

  const dummyData = [
    {
      key: 1,
      name: "Mark Doe",
      email: "mark@yahoo.com",
      image: "https://bootdey.com/img/Content/avatar/avatar7.png",
    },
    {
      key: 2,
      name: "Clark Man",
      email: "clark@yahoo.com",
      image: "https://bootdey.com/img/Content/avatar/avatar6.png",
    },
    {
      key: 3,
      name: "Jaden Boor",
      email: "jaden@yahoo.com",
      image: "https://bootdey.com/img/Content/avatar/avatar5.png",
    },
    {
      key: 4,
      name: "Srick Tree",
      email: "srick@yahoo.com",
      image: "https://bootdey.com/img/Content/avatar/avatar4.png",
    },
    {
      key: 5,
      name: "Erick Doe",
      email: "erick@yahoo.com",
      image: "https://bootdey.com/img/Content/avatar/avatar3.png",
    },
    {
      key: 6,
      name: "Francis Doe",
      email: "francis@yahoo.com",
      image: "https://bootdey.com/img/Content/avatar/avatar2.png",
    },
    {
      key: 8,
      name: "Matilde Doe",
      email: "matilda@yahoo.com",
      image: "https://bootdey.com/img/Content/avatar/avatar1.png",
    },
    {
      key: 9,
      name: "John Doe",
      email: "john@yahoo.com",
      image: "https://bootdey.com/img/Content/avatar/avatar4.png",
    },
    {
      key: 10,
      name: "Fermod Doe",
      email: "fermod@yahoo.com",
      image: "https://bootdey.com/img/Content/avatar/avatar7.png",
    },
    {
      key: 11,
      name: "Danny Doe",
      email: "danny@yahoo.com",
      image: "https://bootdey.com/img/Content/avatar/avatar1.png",
    },
  ];

  const addUser = (name, email) => {
    console.log(`Assign.js - 117 - 🌦`, name, email);
    const key = `${new Date().getTime()}${email}`;
    if (name !== "" && email !== "") {
      dispatch(addSignee({ key, name, email }));
      // setEmail("");
      // setDisplayName("");
    }
  };

  // ###################################
  // <Box padding={3}>
  //   <Container>
  //     <Box padding={3}>
  //       <Heading size="md">Who needs to sign?</Heading>
  //     </Box>
  //     <Box padding={2}>
  //       <TextField
  //         id="displayName"
  //         onChange={(event) => setDisplayName(event.value)}
  //         placeholder="Enter recipient's name"
  //         label="Name"
  //         value={displayName}
  //         type="text"
  //       />
  //     </Box>
  //     <Box padding={2}>
  //       <TextField
  //         id="email"
  //         onChange={(event) => setEmail(event.value)}
  //         placeholder="Enter recipient's email"
  //         label="Email"
  //         value={email}
  //         type="email"
  //       />
  //     </Box>
  //     <Box padding={2}>
  //       <Button
  //         onClick={(event) => {
  //           addUser(displayName, email);
  //         }}
  //         text="Add user"
  //         color="blue"
  //         inline
  //       />
  //     </Box>
  //     <Box padding={2}>
  //       <Table>
  //         <Table.Header>
  //           <Table.Row>
  //             <Table.HeaderCell>
  //               <Text weight="bold">Name</Text>
  //             </Table.HeaderCell>
  //             <Table.HeaderCell>
  //               <Text weight="bold">Email</Text>
  //             </Table.HeaderCell>
  //           </Table.Row>
  //         </Table.Header>
  //         <Table.Body>
  //           {assignees.map((user) => (
  //             <Table.Row key={user.key}>
  //               <Table.Cell>
  //                 <Text>{user.name}</Text>
  //               </Table.Cell>
  //               <Table.Cell>
  //                 <Text>{user.email}</Text>
  //               </Table.Cell>
  //             </Table.Row>
  //           ))}
  //         </Table.Body>
  //       </Table>
  //     </Box>
  //     <Box padding={2}>
  //       <Button onClick={prepare} text="Continue" color="blue" inline />
  //     </Box>
  //     <Box
  //       fit
  //       dangerouslySetInlineStyle={{
  //         __style: {
  //           bottom: 50,
  //           left: "50%",
  //           transform: "translateX(-50%)",
  //         },
  //       }}
  //       paddingX={1}
  //       position="fixed"
  //     >
  //       {showToast && (
  //         <Toast color="red" text={<>Please add at least one user</>} />
  //       )}
  //     </Box>
  //   </Container>
  // </Box>;
  // ###################################

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
              <Text style={styles.emailTxt}>{item.email}</Text>
            </View>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={globalStyles.container}>
        <Formik
          initialValues={{
            displayName: "",
            email: "",
          }}
          validationSchema={assignSchema}
          onSubmit={(values, actions) => {
            actions.resetForm();
            addUser(values.displayName, values.email);
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
                placeholder="Enter recipient's name"
                onChangeText={props.handleChange("displayName")}
                value={props.values.displayName}
                onBlur={props.handleBlur("displayName")}
              />
              <Text style={globalStyles.errorText}>
                {props.touched.name && props.errors.name}
              </Text>
              <TextInput
                style={globalStyles.input}
                placeholder="Enter recipient's email"
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
            data={assignees}
            keyExtractor={(item) => {
              return item.key.toString();
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
    backgroundColor: "#3b5998",
    borderRadius: 8,
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
  emailTxt: {
    fontWeight: "400",
    color: "#008B8B",
    fontSize: 14,
    marginLeft: 15,
  },
  // contact list end
});
