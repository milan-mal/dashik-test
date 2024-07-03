import React from 'react'
import { effect } from '@preact/signals-react'

import userService from '../services/users'

const handleCredentialResponse = (response) => {
  userService
    .postUser(response.credential)
    .then(res => {
      localStorage.setItem('USER_GIVEN_NAME', res.userGivenName || null)
    })
    .catch(err => console.log(err))
}

export default function LoginGoogle() {
  
  effect(() => {
    // Load the Sign in with Google script
    const script = document.createElement('script')
    script.src = 'https://accounts.google.com/gsi/client'
    script.async = true
    script.defer = true
    document.head.appendChild(script)
    
    // Load the Sign in with Google button and handleCredentialResponse script
    script.onload = () => {
      window.google.accounts.id.initialize({
        client_id: import.meta.env.VITE_GOOGLE_SIGN_IN_ID,
        callback: handleCredentialResponse,
        // use_fedcm_for_prompt: true
      })
      window.google.accounts.id.renderButton(
        document.getElementById('buttonDiv'),
        { theme: 'outline', size: 'medium', shape: 'pill' }
      )
      // also display the One Tap dialog
      // window.google.accounts.id.prompt()
    } 
    
    return () => {
      document.head.removeChild(script)
    }
  })
  
  return (
    <>
      <div id="buttonDiv"></div>
    </>
  )
}