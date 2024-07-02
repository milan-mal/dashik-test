import React, { useEffect } from 'react'
// import { signal, effect } from '@preact/signals-react'

import userService from '../services/users'

// const googleCredential = signal(null)

// const handleStorageChange = () => {
//   googleCredential.value = JSON.parse(localStorage.getItem('googleCredential'))
// }

const handleCredentialResponse = (response) => {
  console.log('handleCredentialResponse is running')
  console.log('response.body', response.body)
  userService
    .postUser(response.value)
    .then(res => {
      localStorage.setItem('USER_GIVEN_NAME', res.userGivenName || null)
    })
    .catch(err => console.log(err))
}

// effect(() => {
//   if(googleCredential.value !== null) {
//     userService
//       .postUser(googleCredential.value)
//       .then(res => {
//         localStorage.setItem('USER_GIVEN_NAME', res.userGivenName || null)
//       })
//       .catch(err => console.log(err))
//   }
// })

export default function LoginGoogle() {
  
  useEffect(() => {
    // Load the Sign in with Google script
    const script = document.createElement('script')
    script.src = 'https://accounts.google.com/gsi/client'
    script.async = true
    script.defer = true
    document.head.appendChild(script)
    
    // Load the Sign in with Google button and handleCredentialResponse script
    script.onload = () => {
      window.google.accounts.id.initialize({
        // TODO: change to .env variable
        client_id: '345551924505-srquoi6jtp37fpven1p11gab6fj5r6qd.apps.googleusercontent.com',
        callback: handleCredentialResponse,
        // use_fedcm_for_prompt: true
      })
      window.google.accounts.id.renderButton(
        document.getElementById('buttonDiv'),
        { theme: 'outline', size: 'medium', shape: 'pill' }
      )
      window.google.accounts.id.prompt() // also display the One Tap dialog
    }
    // const googleButton = document.createElement('script')
    // googleButton.src = '/src/scripts/googleLoginButton.js'
    // googleButton.async = true
    // document.head.appendChild(googleButton)
  
    // window.addEventListener('googleCredential', handleStorageChange)  
    
    return () => {
      document.head.removeChild(script)
      // window.removeEventListener('googleCredential', handleStorageChange)
    }
  }, [])
  
  return (
    <>
      <div id="buttonDiv"></div>
    </>
  )
}