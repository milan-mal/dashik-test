import React, {useEffect} from 'react'


export default function LoginGoogle() {
  
  useEffect(() => {
    const script = document.createElement('script')
    script.src = 'https://accounts.google.com/gsi/client'
    script.async = true
    document.head.appendChild(script)

    const onClickScript = document.createElement('script')
    onClickScript.src = 'http://localhost:5173/src/onClickGoogleButton.js'
    onClickScript.async = true
    document.head.appendChild(onClickScript)

    return () => {
      document.head.removeChild(script)
    }
  }, [])

  return (
    // TODO: change to javascript implementation
    <>
      <div id="g_id_onload"
        data-client_id="345551924505-srquoi6jtp37fpven1p11gab6fj5r6qd.apps.googleusercontent.com"
        data-login_uri="http://localhost:3001/api/users"
        data-ux_mode="popup"
        data-auto_prompt="false"
      >
      </div>
      <div className="g_id_signin"
        data-type="standard"
        data-shape="pill"
        data-theme="outline"
        data-text="continue_with"
        data-size="large"
        data-logo_alignment="left"
        data-click_listener="onClickGoogleButton"
      >
      </div>
    </>
  )
}