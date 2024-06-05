import React, {useEffect} from 'react'


export default function LoginGoogle() {
  
  useEffect(() => {
    const script = document.createElement('script')
    script.src = 'https://accounts.google.com/gsi/client'
    script.async = true
    document.head.appendChild(script)

    const googleButton = document.createElement('script')
    googleButton.src = 'http://localhost:5173/src/scripts/googleLoginButton.js'
    googleButton.async = true
    document.head.appendChild(googleButton)

    return () => {
      document.head.removeChild(script)
    }
  }, [])

  return (
    <>
      <div id="buttonDiv"></div>
    </>
  )
}