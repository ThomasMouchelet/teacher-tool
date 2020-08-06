import firebase from "../firebase";

function findAll(teamPath, isAdmin) {
  const db = firebase.firestore();
  db.collection("studentRequest").onSnapshot((snapshot) => {
    let requests = [];
    snapshot.forEach((doc) => {
      const request = doc.data();
      if (`/teams/${request.teamID}` == teamPath && isAdmin) {
        requests = [...requests, request.userID];
      }
    });
    return requests;
  });
}

export default {
  findAll,
};
