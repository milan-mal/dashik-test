// eslint-disable-next-line no-unused-vars
function handleCredentialResponse(response) {
  localStorage.setItem('googleCredential', JSON.stringify(response.credential))
  window.dispatchEvent(new Event('googleCredential'))
}
window.onload = function () {
  // eslint-disable-next-line no-undef
  google.accounts.id.initialize({
    client_id: '345551924505-srquoi6jtp37fpven1p11gab6fj5r6qd.apps.googleusercontent.com',
    callback: handleCredentialResponse,
    // use_fedcm_for_prompt: true
  })
  // eslint-disable-next-line no-undef
  google.accounts.id.renderButton(
    document.getElementById('buttonDiv'),
    { theme: 'outline', size: 'medium', shape: 'pill' }  // customization attributes
  )
  // eslint-disable-next-line no-undef
  google.accounts.id.prompt() // also display the One Tap dialog
}