import * as firebase from 'firebase'
import 'firebase/firestore'

const FIREBASE_CONFIG = {
  apiKey: "AIzaSyCWCIDOQJB1FjhNHzBSwaar_DQp4lMQgGs",
  authDomain: "antelope-valley-happenings.firebaseapp.com",
  databaseURL: "https://antelope-valley-happenings.firebaseio.com",
  projectId: "antelope-valley-happenings",
  storageBucket: "antelope-valley-happenings.appspot.com",
  messagingSenderId: "606765909886"
}

firebase.initializeApp(FIREBASE_CONFIG)

const database = firebase.firestore()
export const userAuth = firebase.auth()
export const usersDB = database.collection('users')
export const threadsDB = database.collection('threads')
export const timestamp = firebase.firestore.FieldValue.serverTimestamp()

/**
 * Firebase: Delete a collection, in batches of batchSize. Note that this
 * does NOT recursively delete subcollections of documents in the collection
 */
 
export function deleteCollection(db, collectionPath, batchSize) {
   var collectionRef = db.collection(collectionPath);
   var query = collectionRef.orderBy('__name__').limit(batchSize);

   return new Promise((resolve, reject) => {
       deleteQueryBatch(db, query, batchSize, resolve, reject);
   });
}

function deleteQueryBatch(db, query, batchSize, resolve, reject) {
   query.get()
       .then((snapshot) => {
           // When there are no documents left, we are done
           if (snapshot.size === 0) {
               return 0;
           }

           // Delete documents in a batch
           var batch = database.batch();
           snapshot.docs.forEach((doc) => {
               batch.delete(doc.ref);
           });

           return batch.commit().then(() => {
               return snapshot.size;
           });
       }).then((numDeleted) => {
           if (numDeleted === 0) {
               resolve();
               return;
           }

           // Recurse on the next process tick, to avoid
           // exploding the stack.
           process.nextTick(() => {
               deleteQueryBatch(db, query, batchSize, resolve, reject);
           });
       })
       .catch(reject);
}