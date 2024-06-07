import React, { useEffect } from 'react'
import { computed, signal, useSignal } from '@preact/signals-react'

const googleCredential = signal(null)
const isLoggedIn = computed(() => googleCredential.value !== null ? 'true' : 'false')

const handleStorageChange = () => {
  console.log('handleStorageChange is running')
  googleCredential.value = localStorage.getItem('googleCredential')
  console.log('googleCredential.value', googleCredential.value)
}

export default function LoginGoogle() {
  const isLoggedInValue = useSignal(isLoggedIn)
  
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
        <div className="text-center" >{isLoggedInValue}</div>
        <div id="buttonDiv"></div>
      </div>
    </>
  )
}