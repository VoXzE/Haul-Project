import { haulsRef, authRef, provider, storageRef } from "../config/firebase";
import { FETCH_HAULS, FETCH_USER, FETCH_HAUL } from "./types";
import * as firebase from "firebase";

const addHaulItemImage = (images, itemid) => {

  return new Promise((resolve, reject) => {
    let uploadTask = storageRef.child(`images/${itemid}`).put(images[0], { contentType: images[0].type });
  
    uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED, (snapshot) => {
      let progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
      console.log(`File Upload is: ${progress}% done`);
      switch (snapshot.state) {
        case firebase.storage.TaskState.PAUSED: // or 'paused'
          console.log('Upload is paused');
          break;
        case firebase.storage.TaskState.RUNNING: // or 'running'
          console.log('Upload is running');
          break;
      }
    }, (error) => {
      switch (error.code) {
        case 'storage/unauthorized':
          console.log('storage/unauthorized');
          break;
        case 'storage/canceled':
          console.log('storage/canceled');
          break;
        case 'storage/unknown':
          console.log('storage/unknown');
          break;
      }
    }, () => {
      uploadTask.snapshot.ref.getDownloadURL().then(function (url) {
        resolve(url)
      });
    })
  })
};

export const createHaul = (title, uid, isPrivate) => async dispatch => {
  let createHaul = haulsRef.push({title, uid, isPrivate});
  let createHaulID = createHaul.key;
  let updateHaul = haulsRef.child(createHaulID).update({id: `${createHaulID}`});
  updateHaul;
  return await createHaulID;
};


export const addHaulItem = (id, item, images) => async dispatch => {
  let addItemRef = haulsRef.child(id).child("items").push(item);
  let addItemID = addItemRef.key;
  let updateID = haulsRef.child(id).child("items").child(addItemID).update({id: `${addItemID}`})
  updateID;
  await addHaulItemImage(images, addItemID).then(url => {
    haulsRef.child(id).child("items").child(addItemID).update({image: `${url}`})
  });

};


export const removeHaulItem = (id, item) => async dispatch => {
  haulsRef.child(id).child("items").child(item).remove();
};

export const deleteHaul = (id) => async dispatch => {
  haulsRef.child(id).remove();
};

export const fetchHauls = uid => async dispatch => {
  haulsRef.orderByChild("uid").equalTo(uid).once("value", snapshot => {
    dispatch({
      type: FETCH_HAULS,
      payload: snapshot.val()
    });
    console.log(snapshot.val())
  });
};

export const fetchHaul = id => async dispatch => {
  haulsRef.child(id).on("value", snapshot => {
    dispatch({
      type: FETCH_HAUL,
      payload: snapshot.val()
    });
  });
};


export const fetchUser = () => dispatch => {
  authRef.onAuthStateChanged(user => {
    if (user) {
      dispatch({
        type: FETCH_USER,
        payload: user
      });
    } else {
      dispatch({
        type: FETCH_USER,
        payload: null
      });
    }
  });
};

export const signIn = () => dispatch => {
  authRef
    .signInWithPopup(provider)
    .then(result => {})
    .catch(error => {
      console.log(error);
    });
};

export const signOut = () => dispatch => {
  authRef
    .signOut()
    .then(() => {
      // Sign-out successful.
    })
    .catch(error => {
      console.log(error);
    });
};
