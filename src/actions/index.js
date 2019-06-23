import { haulsRef, authRef, provider } from "../config/firebase";
import { FETCH_HAULS, FETCH_USER, FETCH_HAUL } from "./types";

export const createHaul = (title, uid, isPrivate) => async dispatch => {
  let createHaul = haulsRef.push({title, uid, isPrivate});
  let createHaulID = createHaul.key;
  let updateHaul = haulsRef.child(createHaulID).update({id: `${createHaulID}`});
  updateHaul;
  return await createHaulID;
};


export const addHaulItem = (id, item) => async dispatch => {
  let addItemRef = haulsRef.child(id).child("items").push(item);
  let addItemID = addItemRef.key;
  let updateID = haulsRef.child(id).child("items").child(addItemID).update({id: `${addItemID}`})
  updateID;
};

export const removeHaulItem = (id, item) => async dispatch => {
  haulsRef.child(id).child("items").child(item).remove();
}

export const deleteHaul = (id) => async dispatch => {
  haulsRef.child(id).remove();
}

export const fetchHauls = uid => async dispatch => {
  haulsRef.orderByChild("uid").equalTo(uid).once("value", snapshot => {
    dispatch({
      type: FETCH_HAULS,
      payload: snapshot.val()
    });
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
