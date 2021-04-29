import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Button,
  Alert,
  ActivityIndicator,
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

const Assign = ({ navigate }) => {
  // const [email, setEmail] = useState("");
  // const [displayName, setDisplayName] = useState("");
  // const [showToast, setShowToast] = useState(false);
  // const assignees = useSelector(selectAssignees);
  // const dispatch = useDispatch();

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

      <View style={globalStyles.containerCenter}>
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
              <FlatButton text="Signup" onPress={props.handleSubmit} />
              <Text
                style={styles.loginText}
                onPress={() => navigation.navigate("Signin")}
              >
                Already Registered? Click here to login
              </Text>
            </View>
          )}
        </Formik>
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
});
