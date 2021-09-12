import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
import 'firebase/compat/auth';


const config = {
    apiKey: "AIzaSyCcJYmCuYHQy24KbeM_6zsrxTdRue7MyO0",
    authDomain: "crwn-db-a4425.firebaseapp.com",
    projectId: "crwn-db-a4425",
    storageBucket: "crwn-db-a4425.appspot.com",
    messagingSenderId: "694003846360",
    appId: "1:694003846360:web:72370f8c35172df3ea5bad",
    measurementId: "G-GZMR3T7Q5Q"
  };

  export const createUserProfileDocument = async (userAuth,additionalData) =>{
    if(!userAuth) return;

    const userRef = firestore.doc(`users/${userAuth.uid}`);

    const snapShot = await userRef.get();

    if(!snapShot.exists){
      const {displayName,email}=userAuth;
      const createdAt = new Date();
      try{
          await userRef.set({
            displayName, email,createdAt,...additionalData
          });
      }
      catch(error){
        console.log('error creating user',error.message);
      }
    }
    return userRef;
  }

  firebase.initializeApp(config);

  export const auth = firebase.auth();
  export const firestore = firebase.firestore();

  const provider = new firebase.auth.GoogleAuthProvider();
  provider.setCustomParameters({prompt: 'select_account'});
  export const signInWithGoogle = ()=>auth.signInWithPopup(provider);

  export default firebase;
