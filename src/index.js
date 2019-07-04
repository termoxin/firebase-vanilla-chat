import * as firebase from "firebase";
import { initRoutes, route } from "./router";
import Auth from "./Auth";
import Chat from "./Chat";
import "./styles.css";

const config = {
  apiKey: "AIzaSyDYhhbi44SM8GosqoPnGGoETNs3ajGCR_4",
  authDomain: "js-chat-a64ff.firebaseapp.com",
  databaseURL: "https://js-chat-a64ff.firebaseio.com",
  projectId: "js-chat-a64ff",
  storageBucket: "",
  messagingSenderId: "231002170518",
  appId: "1:231002170518:web:573cc814f1f3c5bd"
};

class Firechat {
  constructor(config) {
    this.messages = null;
    this.online = null;
    this.error = null;

    firebase.initializeApp(config);
    this.init();
    this.listen();
    route("/login", Auth.bind(this));
    route("/chat", Chat.bind(this));
  }

  init() {
    this.get("Messages").then(messages => {
      this.messages = messages;
      initRoutes();
      this.render();
    });
  }

  redirect(path, state) {
    window.history.pushState(state, null, path);
    initRoutes();
  }

  render() {
    // this.checkOnline(() => {
    //   let online = [];

    //   this.get("/status").then(status => {
    //     for (let key in status) {
    //       if (status[key].state === "online") {
    //         online.push(status[key]);
    //       }
    //     }
    //   });
    //   this.online = online;
    // });
    Chat.call(this);
  }

  checkOnline(callback) {
    const uid = firebase.auth().currentUser.uid;

    const userStatusDatabaseRef = firebase.database().ref("/status/" + uid);

    const isOfflineForDatabase = {
      id: uid,
      state: "offline",
      last_changed: firebase.database.ServerValue.TIMESTAMP
    };

    const isOnlineForDatabase = {
      id: uid,
      state: "online",
      last_changed: firebase.database.ServerValue.TIMESTAMP
    };

    firebase
      .database()
      .ref(".info/connected")
      .on("value", function(snapshot) {
        if (snapshot.val() == false) {
          return;
        }
        userStatusDatabaseRef
          .onDisconnect()
          .set(isOfflineForDatabase)
          .then(function() {
            userStatusDatabaseRef.set(isOnlineForDatabase);
            callback();
          });
      });
  }

  listen() {
    firebase
      .database()
      .ref("Messages")
      .on("value", data => {
        this.messages = data.val();
        this.render();
      });
  }

  set(ref, obj) {
    return new Promise((resolve, reject) => {
      firebase
        .database()
        .ref(ref)
        .set(obj);
      resolve();
    });
  }

  get(path) {
    return new Promise((resolve, reject) => {
      firebase
        .database()
        .ref(path)
        .once("value", snapshot => {
          resolve(snapshot.val());
        });
    });
  }

  signUp(email, password) {
    return new Promise((resolve, reject) => {
      firebase
        .auth()
        .createUserWithEmailAndPassword(email, password)
        .then(() => {
          resolve(false);
        })
        .catch(error => {
          reject(error);
        });
    });
  }

  signIn(email, password) {
    return new Promise((resolve, reject) => {
      firebase
        .auth()
        .signInWithEmailAndPassword(email, password)
        .then(() => {
          resolve(false);
        })
        .catch(error => {
          reject(error);
        });
    });
  }
}

const firechat = new Firechat(config);
