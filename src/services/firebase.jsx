import { initializeApp } from 'firebase/app'
import { getAuth, signInWithPopup, GoogleAuthProvider, signOut, onAuthStateChanged } from 'firebase/auth'
// import { getAnalytics } from 'firebase/analytics'

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyCVDTLiwxa0XYdrEDMGyv414vdZmG-T6vQ',
  authDomain: 'dashik-test.firebaseapp.com',
  projectId: 'dashik-test',
  storageBucket: 'dashik-test.appspot.com',
  messagingSenderId: '345551924505',
  appId: '1:345551924505:web:6d7ce03c96a08699c8a988',
  measurementId: 'G-8HW1E08N9Q'
}

const firebaseApp = initializeApp(firebaseConfig)
// const analytics = getAnalytics(app)
const auth = getAuth(firebaseApp)

const provider = new GoogleAuthProvider()

export const signInWithGoogle = () => {
  signInWithPopup(auth, provider)
    .then((result) => {
      // const credential = GoogleAuthProvider.credentialFromResult(result)
      // const token = credential.accessToken
      // const user = result.user
    }).catch((error) => {
      console.log(error)
      // const errorCode = error.code
      // const errorMessage = error.message
      // const email = error.customData.email
      // const credential = GoogleAuthProvider.credentialFromError(error)
    })
}

export const signOutGoogle = () => { 
  signOut(auth).then(() => {
    console.log('Sign-out successful.')
  }).catch((error) => {
    console.log(error)
  })  
}

export const authStatusGoogle = () => {
  onAuthStateChanged(auth, (user) => {
    if (user) {
      // User is signed in, see docs for a list of available properties
      // https://firebase.google.com/docs/reference/js/auth.user
      // const uid = user.uid
    } else {
      // User is signed out
    }
  })
}
