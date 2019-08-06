import * as firebase from "firebase";

import { FirebaseConfig } from "../config/keys";
firebase.initializeApp(FirebaseConfig);

const databaseRef = firebase.database().ref();
export const haulsRef = databaseRef.child("hauls");
export const authRef = firebase.auth();
export const provider = new firebase.auth.GoogleAuthProvider();
export const storageRef = firebase.storage().ref();