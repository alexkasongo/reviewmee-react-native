import React from "react";
import { TextInput, View, Text } from "react-native";
import { globalStyles } from "../styles/global";
import { Form, Formik } from "formik";
import * as yup from "yup";
import FlatButton from "../shared/button";

// a schema is a set of rules defined in an object
const ReviewSchema = yup.object({
  title: yup.string().required().min(4),
  body: yup.string().required().min(8),
  rating: yup
    .string()
    .required()
    .test("is-num-1-5", "Rating must be a number 1 - 5", (val) => {
      return parseInt(val) < 6 && parseInt(val) > 0;
    }),
});

export default function ReviewForm({ addReview }) {
  return (
    <View style={globalStyles.container}>
      <Formik
        initialValues={{
          title: "",
          body: "",
          rating: "",
        }}
        validationSchema={ReviewSchema}
        onSubmit={(values, actions) => {
          // add the review here using the addReview() prop
          actions.resetForm();
          addReview(values);
          // console.log(`reviewForm.js - 23 - 🍎`);
        }}
      >
        {/* if validation fails, yup passes errors in props.errors below */}
        {(props) => (
          <View>
            <TextInput
              style={globalStyles.input}
              placeholder="Review title"
              onChangeText={props.handleChange("title")}
              value={props.values.title}
              onBlur={props.handleBlur("title")}
            />
            <Text style={globalStyles.errorText}>
              {props.touched.title && props.errors.title}
            </Text>
            <TextInput
              multiline
              minHeight={60}
              style={globalStyles.input}
              placeholder="Review body"
              onChangeText={props.handleChange("body")}
              value={props.values.body}
              onBlur={props.handleBlur("body")}
            />
            <Text style={globalStyles.errorText}>
              {props.touched.body && props.errors.body}
            </Text>
            <TextInput
              style={globalStyles.input}
              placeholder="Rating (1-5)"
              onChangeText={props.handleChange("rating")}
              value={props.values.rating}
              keyboardType="numeric"
              onBlur={props.handleBlur("rating")}
            />
            <Text style={globalStyles.errorText}>
              {props.touched.rating && props.errors.rating}
            </Text>
            {/* <Button title="submit" onPress={props.handleSubmit} /> */}
            <FlatButton text="submit" onPress={props.handleSubmit} />
          </View>
        )}
      </Formik>
    </View>
  );
}
