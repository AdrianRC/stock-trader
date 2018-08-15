import * as firebase from "firebase";

// Initialize Firebase
const config = {
  apiKey: "AIzaSyDAuwFQ_vaCpUAchV0v5i4U8A0Qrz2yWvQ",
  authDomain: "vue-stock-trader-fb.firebaseapp.com",
  databaseURL: "https://vue-stock-trader-fb.firebaseio.com",
  projectId: "vue-stock-trader-fb"
};
firebase.initializeApp(config);

export default firebase;
