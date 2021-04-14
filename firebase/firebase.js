import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import "firebase/storage";

// import { mergeAnnotations } from "../components/MergeAnnotations/MergeAnnotations";

const firebaseConfig = {
  apiKey: "AIzaSyA6D4YPfnPY9NymQBh_WSUrFphR27qx9Eg",
  authDomain: "consentmee.firebaseapp.com",
  projectId: "consentmee",
  storageBucket: "consentmee.appspot.com",
  messagingSenderId: "341422949639",
  appId: "1:341422949639:web:b0b3cf4e9279c0394fb1a2",
};
// Initialize Firebase
if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

export const auth = firebase.auth();
export const firestore = firebase.firestore();
export const storage = firebase.storage();

const provider = new firebase.auth.GoogleAuthProvider();

// Signin with Google
export const signInWithGoogle = () => {
  auth.signInWithPopup(provider);
};

// Generate user document
export const generateUserDocument = async (user, additionalData) => {
  if (!user) return;
  const userRef = firestore.doc(`users/${user.uid}`);
  const snapshot = await userRef.get();
  if (!snapshot.exists) {
    const { email, displayName, photoURL } = user;
    try {
      await userRef.set({
        displayName,
        email,
        photoURL,
        ...additionalData,
      });
    } catch (error) {
      console.error("Error creating user document", error);
    }
  }
  return getUserDocument(user.uid);
};

// Get user document
const getUserDocument = async (uid) => {
  if (!uid) return null;
  try {
    const userDocument = await firestore.doc(`users/${uid}`).get();
    return {
      uid,
      ...userDocument.data(),
    };
  } catch (error) {
    console.error("Error fetching user", error);
  }
};

// Add document to sign
export const addDocumentToSign = (uid, email, doc, docRef) => {
  console.log(`firebase.js - 63 - 🍎 >>You are here<<`, {
    uid,
    email,
    doc,
    docRef,
  });
  // if user doesn't exist stop
  if (!uid) return;
  // if user exists continue
  const signed = false;
  const signedBy = [];
  const requestedTime = new Date();
  const signedTime = "";
  // const emails = emails
  firestore
    .collection("documentsToSign")
    .add({
      uid,
      email,
      doc,
      docRef,
      signedBy,
      signed,
      requestedTime,
      signedTime,
    })
    .then(function (docRef) {
      console.log("💯 Document written with ID: ", docRef.id);
    })
    .catch(function (error) {
      console.error("🥶 Error adding document: ", error);
    });
};
// Update document to sign
export const updateDocumentToSign = async (docId, email, xfdfSigned) => {
  const documentRef = firestore.collection("documentsToSign").doc(docId);
  documentRef
    .get()
    .then(async (doc) => {
      if (doc.exists) {
        const { signedBy, emails, xfdf, docRef } = doc.data();
        if (!signedBy.includes(email)) {
          const signedByArray = [...signedBy, email];
          const xfdfArray = [...xfdf, xfdfSigned];
          await documentRef.update({
            xfdf: xfdfArray,
            signedBy: signedByArray,
          });

          if (signedByArray.length === emails.length) {
            const time = new Date();
            await documentRef.update({
              signed: true,
              signedTime: time,
            });

            // mergeAnnotations(docRef, xfdfArray);
          }
        }
      } else {
        console.log("No such document!");
      }
    })
    .catch(function (error) {
      console.log("Error getting document:", error);
    });
};

// Search for document to sign
export const searchForDocumentToSign = async (email) => {
  console.log(`firebase.js - 139 - 🥶`, email);
  const documentsRef = firestore.collection("documentsToSign");
  const query = documentsRef
    .where("emails", "array-contains", email)
    .where("signed", "==", false);

  const querySigned = documentsRef.where("signedBy", "array-contains", email);

  const docIds = [];
  const docIdSigned = [];

  await querySigned
    .get()
    .then(function (querySnapshot) {
      querySnapshot.forEach(function (doc) {
        const docId = doc.id;
        docIdSigned.push(docId);
      });
    })
    .catch(function (error) {
      console.log("Error getting documents: ", error);
    });

  await query
    .get()
    .then(function (querySnapshot) {
      console.log(`firebase.js - 152 - 😍`);

      querySnapshot.forEach(function (doc) {
        const { docRef, email, requestedTime } = doc.data();
        const docId = doc.id;
        if (!docIdSigned.includes(docId)) {
          docIds.push({ docRef, email, requestedTime, docId });
        }
      });
    })
    .catch(function (error) {
      console.log("Error getting documents: ", error);
    });
  return docIds;
};

// Search for signed document
export const searchForDocumentsSigned = async (email) => {
  const documentsRef = firestore.collection("documentsToSign");

  const docIds = [];

  let query = documentsRef
    .where("email", "==", email)
    .where("signed", "==", true);

  await query
    .get()
    .then(function (querySnapshot) {
      querySnapshot.forEach(function (doc) {
        const { docRef, emails, signedTime } = doc.data();
        const docId = doc.id;
        docIds.push({ docRef, emails, signedTime, docId });
      });
    })
    .catch(function (error) {
      console.log("Error getting documents: ", error);
    });

  return docIds;
};
