import React, { useEffect } from 'react'
import { signal, effect } from '@preact/signals-react'

import userService from '../services/users'

const googleCredential = signal(null)

const handleStorageChange = () => {
  googleCredential.value = JSON.parse(localStorage.getItem('googleCredential'))
}

effect(() => {
  // const user = {
  //   credential: googleCredential.value
  // }
  // console.log('user.credential', user.credential)
  if(googleCredential.value !== null) {
    userService
      .postUser(googleCredential.value)
      .then(res => console.log(res))
      .catch(err => console.log(err))
  }
})

export default function LoginGoogle() {
  
  useEffect(() => {
    const script = document.createElement('script')
    script.src = 'https://accounts.google.com/gsi/client'
    script.async = true
    document.head.appendChild(script)

    const googleButton = document.createElement('script')
    // TODO: change to dynamic url
    googleButton.src = 'http://localhost:5174/src/scripts/googleLoginButton.js'
    googleButton.async = true
    document.head.appendChild(googleButton)
  
    window.addEventListener('googleCredential', handleStorageChange)  
    
    return () => {
      document.head.removeChild(script)
      window.removeEventListener('googleCredential', handleStorageChange)
    }
  }, [])
  
  return (
    <>
      <div className="flex flex-col" >
        <div id="buttonDiv"></div>
      </div>
    </>
  )
}