        // Initialize the FirebaseUI Widget using Firebase.
        var db = firebase.firestore();
        var ui = new firebaseui.auth.AuthUI(firebase.auth());
        //console.log(defaultProfilePhotoStorageRef.getDownloadURL());
        var uiConfig = {
  callbacks: {
    signInSuccessWithAuthResult: function(authResult, redirectUrl) {
      // User successfully signed in.
      // Return type determines whether we continue the redirect automatically
      // or whether we leave that to developer to handle.
      var user = authResult.user;
      //let profilePhotoStorageRef = firebase.storage().ref("Profile Photos/" + user.uid);
      //let defaultProfilePhotoStorageRef = firebase.storage().ref("Profile Photos/default_profile_pic.jpeg");
      //profilePhotoStorageRef.put(defaultProfilePhotoStorageRef.getDownloadURL());
      //console.log(defaultProfilePhotoStorageRef.getDownloadURL());
      //localStorage.clear();
      //localStorage.setItem("userId", user.uid);
        if (authResult.additionalUserInfo.isNewUser)
        {
            return true;
        }
        else 
        {
            return true;
        }
        return false
    },
    uiShown: function() {
      // The widget is rendered.
      // Hide the loader.
      document.getElementById('loader').style.display = 'none';
    }
  },
  // Will use popup for IDP Providers sign-in flow instead of the default, redirect.
  signInFlow: 'popup',
  signInSuccessUrl: 'main.html',
  signInOptions: [
    // Leave the lines as is for the providers you want to offer your users.
    firebase.auth.EmailAuthProvider.PROVIDER_ID,
  ],
  // Terms of service url.
  tosUrl: '<your-tos-url>',
  // Privacy policy url.
  privacyPolicyUrl: '<your-privacy-policy-url>'
};

firebase.auth().onAuthStateChanged(function(user) {
  if (user) {
    // User is signed in.
    localStorage.clear();
    localStorage.setItem("userId", user.uid);
    //store user's uid in the localStorage cache
    // ...
  } else {
    // User is signed out.
    // ...
    localStorage.clear();   //clear localstorage cache when logging out
  }
});
firebase.auth().setPersistence(firebase.auth.Auth.Persistence.LOCAL)
  .then(function() {
  });


// The start method will wait until the DOM is loaded.
ui.start('#firebaseui-auth-container', uiConfig);