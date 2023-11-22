import React, {useEffect} from 'react'

export default function LoginGoogle() {

  useEffect(() => {
    const script = document.createElement('script')
    script.src = 'https://accounts.google.com/gsi/client'
    script.async = true
    document.head.appendChild(script)

    function parseJwt (token) {
      var base64Url = token.split('.')[1]
      var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/')
      var jsonPayload = decodeURIComponent(window.atob(base64).split('').map(function(c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2)
      }).join(''))
  
      return JSON.parse(jsonPayload)
    }

    window.handleCredentialResponse = (response) => {
      const responsePayload = parseJwt(response.credential)

      console.log('ID: ' + responsePayload.sub)
      console.log('Full Name: ' + responsePayload.name)
      console.log('Given Name: ' + responsePayload.given_name)
      console.log('Family Name: ' + responsePayload.family_name)
      console.log('Image URL: ' + responsePayload.picture)
      console.log('Email: ' + responsePayload.email)
    }

    return () => {
      document.head.removeChild(script)
      delete window.handleCredentialResponse
    }
  }, [])

  return (
    <>
      <div id="g_id_onload"
        data-client_id="345551924505-srquoi6jtp37fpven1p11gab6fj5r6qd.apps.googleusercontent.com"
        // data-context="signin"
        data-ux_mode="popup"
        data-callback="handleCredentialResponse"
        // data-auto_prompt="false"
      >
      </div>
      <div className="g_id_signin"
        data-type="standard"
        data-shape="pill"
        data-theme="outline"
        data-text="signin_with"
        data-size="large"
        data-logo_alignment="left">
      </div>
    </>
  )
}