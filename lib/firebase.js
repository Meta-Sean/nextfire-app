import firebase from 'firebase/app'
import 'firebase/auth';
import 'firebase/firestore';
import 'firebase/storage';

const firebaseConfig = {
    apiKey: "AIzaSyAsSFUq83I15-Y1JFlxESCeICDejAOHTq4",
    authDomain: "nextfire-25063.firebaseapp.com",
    projectId: "nextfire-25063",
    storageBucket: "nextfire-25063.appspot.com",
    messagingSenderId: "676641675796",
    appId: "1:676641675796:web:09838044b9a9a6597aa501",
    measurementId: "G-HC729WK5N2"
};

if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig)
}

export const auth = firebase.auth();
export const googleAuthProvider = new firebase.auth.GoogleAuthProvider();

export const firestore = firebase.firestore();
export const storage = firebase.storage();
export const serverTimestamp = firebase.firestore.FieldValue.serverTimestamp;
export const STATE_CHANGED = firebase.storage.TaskEvent.STATE_CHANGED;
export const fromMillis = firebase.firestore.Timestamp.fromMillis;
export const increment = firebase.firestore.FieldValue.increment;

/**`
 * Gets a users/{uid} document with username
 * @param  {string} username
 */
 export async function getUserWithUsername(username) {
    const usersRef = firestore.collection('users');
    const query = usersRef.where('username', '==', username).limit(1);
    const userDoc = (await query.get()).docs[0];
    return userDoc;
  }

/**`
 * Converts a firestore document to JSON
 * @param  {DocumentSnapshot} doc
 */
 export function postToJSON(doc) {
  const data = doc.data();
  return {
    ...data,
    // Gotcha! firestore timestamp NOT serializable to JSON. Must convert to milliseconds
    createdAt: data?.createdAt.toMillis() || 0,
    updatedAt: data?.updatedAt.toMillis() || 0,
  };
}

