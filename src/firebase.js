import firebase from "firebase";

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBa05Eoop-QUW5-QN2q9AwHafjgeXVFQw8",
  authDomain: "live-calc.firebaseapp.com",
  databaseURL: "https://live-calc.firebaseio.com",
  projectId: "live-calc",
  storageBucket: "live-calc.appspot.com",
  messagingSenderId: "3684644207",
  appId: "1:3684644207:web:ac337a8304576089ad649a",
  measurementId: "G-11KGCPLN3M",
};

// TODO: Replace the following with your app's Firebase project configuration
const firebaseApp = firebase.initializeApp(firebaseConfig);

const db = firebaseApp.firestore();

//this function makes it so i dont export db directly, haddles uploading expressions and results
const uploadCalculations = (expression, results) => {
  // Add a second document with a generated ID.
  db.collection("resultsFeed")
    .add({
      expression: expression,
      results: results,
    })
    .then(function (docRef) {
      console.log("Document written with ID: ", docRef.id);
    })
    .catch(function (error) {
      console.error("Error adding document: ", error);
    });
};

//
const getCalculations = () => {
    db.collection("resultFeed").get()
} 

export {uploadCalculations,getCalculations}
