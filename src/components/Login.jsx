import React from 'react'
// import { initializeApp } from 'firebase/app'
import { getAuth, signInWithPopup, GoogleAuthProvider } from 'firebase/auth'
// import { getAnalytics } from 'firebase/analytics'

// Web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
// const firebaseConfig = {
//   apiKey: 'AIzaSyCVDTLiwxa0XYdrEDMGyv414vdZmG-T6vQ',
//   authDomain: 'dashik-test.firebaseapp.com',
//   projectId: 'dashik-test',
//   storageBucket: 'dashik-test.appspot.com',
//   messagingSenderId: '345551924505',
//   appId: '1:345551924505:web:6d7ce03c96a08699c8a988',
//   measurementId: 'G-8HW1E08N9Q'
// }

// Initialize Firebase
// const firebaseApp = initializeApp(firebaseConfig)
// const analytics = getAnalytics(app)
const provider = new GoogleAuthProvider()

const auth = getAuth()
signInWithPopup(auth, provider)
  .then((result) => {
    const credential = GoogleAuthProvider.credentialFromResult(result)
    const token = credential.accessToken
    const user = result.user
  }).catch((error) => {
    const errorCode = error.code
    const errorMessage = error.message
    const email = error.customData.email
    const credential = GoogleAuthProvider.credentialFromError(error)
  })

export default function Login() {
  <>
  </>
}