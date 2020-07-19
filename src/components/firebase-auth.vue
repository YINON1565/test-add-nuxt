<template lang="html">
  <div id="firebaseui-auth-container"></div>
</template>
<script>
import firebase from "firebase";
import * as firebaseui from "firebaseui";
import "firebaseui/dist/firebaseui.css";

export default {
  name: "auth",
  created() {
    firebase.auth().languageCode = 'iw';
  },
  async mounted() {
    
    let ui = firebaseui.auth.AuthUI.getInstance();
    if (!ui) {
      ui = new firebaseui.auth.AuthUI(firebase.auth());
    }
    var uiConfig = {
      signInFlow: "popup",
      signInSuccessUrl: "/",
      signInOptions: [
        // firebase.auth.GoogleAuthProvider.PROVIDER_ID,
        // {
        //   provider: firebase.auth.FacebookAuthProvider.PROVIDER_ID,
        //   scopes: ["public_profile", "email", "user_likes", "user_friends"],
        //   // customParameters: {
        //   //   // Forces password re-entry.
        //   //   auth_type: "reauthenticate"
        //   // }
        // },
        // firebase.auth.FacebookAuthProvider.PROVIDER_ID
        // firebase.auth.EmailAuthProvider.PROVIDER_ID,
        // firebase.auth.TwitterAuthProvider.PROVIDER_ID,
        // firebase.auth.GithubAuthProvider.PROVIDER_ID,
        {
          provider: firebase.auth.PhoneAuthProvider.PROVIDER_ID,
          defaultCountry: "IL",
          //   defaultNationalNumber: '1234567890',
          recaptchaParameters: {
            type: "image", // 'audio'
            size: "normal", // 'invisible' or 'compact'
            badge: "bottomleft" //' bottomright' or 'inline' applies to invisible.
          }
        }
        // firebaseui.auth.AnonymousAuthProvider.PROVIDER_ID,
        // "apple.com",
        // "microsoft.com",
        // "yahoo.com"
      ]
      //   callbacks: {
      //     // signInFailure callback must be provided to handle merge conflicts which
      //     // occur when an existing credential is linked to an anonymous user.
      //     signInFailure: function(error) {
      //       // For merge conflicts, the error.code will be
      //       // 'firebaseui/anonymous-upgrade-merge-conflict'.
      //       if (error.code != "firebaseui/anonymous-upgrade-merge-conflict") {
      //         return Promise.resolve();
      //       }
      //       // The credential the user tried to sign in with.
      //       var cred = error.credential;
      //       // Copy data from anonymous user to permanent user and delete anonymous
      //       // user.
      //       // ...
      //       // Finish sign-in after data is copied.
      //       return firebase.auth().signInWithCredential(cred);
      //     }
      //   }
    };
    // var ui = new firebaseui.auth.AuthUI(firebase.auth());
    ui.start("#firebaseui-auth-container", uiConfig);
  }
};
</script>