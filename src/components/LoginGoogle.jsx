import React, {useState, useEffect} from 'react'
// import { signal } from '@preact/signals-react'

// const googleCredential = signal(null)

export default function LoginGoogle() {
  const [googleCredentialState, setGoogleCredentialState] = useState('')
  
  const handleStorageChange = () => {
    console.log('handleStorageChange is running')
    // googleCredential.value = localStorage.getItem('googleCredential')
    // console.log('googleCredential.value', googleCredential.value)
    setGoogleCredentialState(localStorage.getItem('googleCredential'))
    console.log('googleCredentialState', googleCredentialState)
  }
  
  useEffect(() => {
    const script = document.createElement('script')
    script.src = 'https://accounts.google.com/gsi/client'
    script.async = true
    document.head.appendChild(script)

    const googleButton = document.createElement('script')
    googleButton.src = 'http://localhost:5173/src/scripts/googleLoginButton.js'
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
        <div className="text-center" >{googleCredentialState ? 'Logged in' : 'Not logged in'}</div>
        <div id="buttonDiv"></div>
      </div>
    </>
  )
}