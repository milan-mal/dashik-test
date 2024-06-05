// eslint-disable-next-line no-unused-vars
function handleCredentialResponse(response) {
  console.log('Encoded JWT ID token: ' + response.credential)
}
window.onload = function () {
  google.accounts.id.initialize({
    client_id: '345551924505-srquoi6jtp37fpven1p11gab6fj5r6qd.apps.googleusercontent.com',
    callback: handleCredentialResponse
  })
  google.accounts.id.renderButton(
    document.getElementById('buttonDiv'),
    { theme: 'outline', size: 'large', shape: 'pill' }  // customization attributes
  )
  google.accounts.id.prompt() // also display the One Tap dialog
}