<template>
  <div class="about">
    <h1>This is an about page</h1>
    <!-- <button @click="xhr">xhr</button> -->
    <!-- <button @click="createFile">createFile</button> -->
    <!-- <firebase-auth /> -->
    <!-- <form @submit.prevent="updateUser">
      <input type="text" v-model="cred.displayName" />
      <input type="email" v-model="cred.email" />
      <input type="email" v-model="cred.phoneNumber" />
      <button>Send</button>
    </form>-->
    <!-- <button @click="handleSignoutClick" id="signout_button">Sign Out</button>
    <button @click="handleAuthClick" id="authorize_button">Authorize</button> -->
    <!-- <button @click="$store.dispatch('signInWithGoogle')">signInWithGoogle</button>
    <button @click="listFiles">LIST</button>-->
    <!-- <pre id="content" style="white-space: pre-wrap;"></pre>
    <input type="file" @input="onFileInput" /> -->
    <auth2-edpoint />
  </div>
</template>

<script>
import auth2Edpoint from '../components/auth2-edpoint'
import "../services/api";
import { clientId } from "../config/client-id";
import { apiKey } from "../config/api-key";
import firebase from "firebase";

var discoveryDocs = [
  "https://www.googleapis.com/discovery/v1/apis/drive/v3/rest"
  // "https://www.googleapis.com/upload/drive/v3/files?uploadType=multipart"
];

// Authorization scopes required by the API; multiple scopes can be
// included, separated by spaces.
var scope = "https://www.googleapis.com/auth/drive.metadata";
// var scope = "https://www.googleapis.com/auth/drive.metadata.readonly";
// var authorizeButton = document.getElementById("authorize_button");
// var signoutButton = document.getElementById("signout_button");

const { gapi } = window;

import { googleDriveService } from "../services/google-drive.service";
import firebaseAuth from "../components/firebase-auth.vue";
import { access_token } from "../config/access-token.js";
export default {
  data() {
    return {
      auth2: null,
      isSignIn: false,
      cred: { displayName: "", email: "", phoneNumber: "" }
    };
  },
  mounted() {
    // this.loadClientAuth2();
    // this.loadClient();
    // gapi.load("client:auth2", this.initClient);
  },
  methods: {
    xhr() {
      console.log(access_token, "access_token");
      // var user = gapi.auth2.getAuthInstance().currentUser.get();
      // var oauthToken = user.getAuthResponse().access_token;
      // console.log(oauthToken, 'oauthToken');
      var xhr = new XMLHttpRequest();
      console.log(xhr, "xhr");
      // xhr.open("POST", "https://www.googleapis.com/upload/drive/v3/files");
      xhr.open(
        "POST",
        `https://www.googleapis.com/upload/drive/v3/files?uploadType=multipart?access_token=${encodeURIComponent(access_token)}`
      );
      // xhr.setRequestHeader("Authorization", "Bearer " + access_token);
      xhr.send();
    },
    updateUser() {
      var user = firebase.auth().currentUser;
      console.log(user, "user");
      user
        .updateProfile({
          // displayName: this.cred.displayName,
          email: "yinoneliyhaoo@gmail.com"
          // isUploadVideo: true
        })
        .then(ev => {
          console.log("Update successful", ev);
          // Update successful.
        })
        .catch(error => {
          console.log("An error happened", error);
          // An error happened.
        });
    },
    async createFile(myFile) {
      var reader = new FileReader();
      //   var vm = this;
      console.log(reader, "reader");
      // console.log(vm, 'vm');

      reader.onload = e => {
        // console.log(e.target.result);
        var fileMetadata = {
          name: myFile.name
        };
        var media = {
          mimeType: myFile.type,
          // body: fs.createReadStream("files/photo.jpg")
          body: e.target.result
        };
        console.log(fileMetadata, "fileMetadata");
        console.log(media, "media");
        gapi.client.drive.files
          .create(
            {
              resource: fileMetadata,
              media: media,
              fields: "id"
            }
            // (err, file) => {
            //   if (err) {
            //     // Handle error
            //     console.error(err);
            //   } else {
            //     console.log("File Id: ", file.id);
            //   }
            // }
          )
          .then(response => {
            this.appendPre("Files:");
            var files = response.result.files;
            if (files && files.length > 0) {
              for (var i = 0; i < files.length; i++) {
                var file = files[i];
                this.appendPre(file.name + " (" + file.id + ")");
              }
            } else {
              this.appendPre("No files found.");
            }
          });
      };
      reader.readAsDataURL(myFile);
    },
    async onFileInput(ev) {
      console.log(ev.target.files[0], " ev.target.files[0]");
      this.createFile(ev.target.files[0]);
      // console.log( ev.target.parentNode, ' ev.target.parentNode.myFile');
      // const res = await  googleDriveService.uploadFiles(ev.target.files[0])
      // const res = await googleDriveService.uploadImg(ev);
      // console.log(res, "res");
    },
    initClient() {
      gapi.client
        .init({
          apiKey,
          clientId,
          discoveryDocs,
          scope
        })
        .then(
          () => {
            // Listen for sign-in state changes.
            gapi.auth2
              .getAuthInstance()
              .isSignedIn.listen(this.updateSigninStatus);
            // console.log(
            //   gapi.auth2
            //     .getAuthInstance()
            //     .currentUser.get()
            //     .getAuthResponse(),
            //   "gapi.auth2.getAuthInstance()"
            // );
            // gapi.auth2.getAuthInstance()
            // Handle the initial sign-in state.
            this.updateSigninStatus(
              gapi.auth2.getAuthInstance().isSignedIn.get()
            );
            // return gapi.client.request({
            //   path:
            //     "https://www.googleapis.com/upload/drive/v3/files?uploadType=multipart"
            // });
          },
          error => {
            this.appendPre(JSON.stringify(error, null, 2));
          }
        );
      // .then(
      //   function(response) {
      //     console.log(response.result);
      //   },
      //   function(reason) {
      //     console.log("Error: " + reason.result);
      //     // console.log("Error: " + reason.result.error.message);
      //   }
      // );
    },
    updateSigninStatus(isSignedIn) {
      if (isSignedIn) {
        this.isSignedIn = true;

        // this.listFiles();
      } else {
        this.isSignedIn = false;
      }
    },
    handleAuthClick(event) {
      gapi.auth2.getAuthInstance().signIn();
    },
    handleSignoutClick(event) {
      gapi.auth2.getAuthInstance().signOut();
    },
    appendPre(message) {
      var pre = document.getElementById("content");
      var textContent = document.createTextNode(message + "\n");
      pre.appendChild(textContent);
    },
    listFiles() {
      gapi.client.drive.files
        .list({
          pageSize: 1,
          fields: "nextPageToken, files(id, name)"
        })
        .then(response => {
          this.appendPre("Files:");
          var files = response.result.files;
          if (files && files.length > 0) {
            for (var i = 0; i < files.length; i++) {
              var file = files[i];
              this.appendPre(file.name + " (" + file.id + ")");
            }
          } else {
            this.appendPre("No files found.");
          }
        });
    }
    // loadClient() {
    //   gapi.load("client", _ => {
    //     gapi.client
    //       .init({
    //         apiKey,
    //         discoveryDocs: [
    //           "https://www.googleapis.com/discovery/v1/apis/translate/v2/rest"
    //         ]
    //       })
    //       .then(()=> {
    //         // Executes an API request, and returns a Promise.
    //         // The method name `language.translations.list` comes from the API discovery.
    //         return gapi.client.language.translations.list({
    //           q: "hello world",
    //           source: "en",
    //           target: "he"
    //         });
    //       })
    //       .then(
    //         function(response) {
    //           console.log(response.result.data.translations[0].translatedText);
    //         },
    //         function(reason) {
    //           console.log("Error: " + reason.result.error.message);
    //         }
    //       );
    //   });
    //   // Initializes the client with the API key and the Translate API.
    // },
    // loadClientAuth2() {
    //   gapi.load("client:auth2", async _ => {
    //     gapi.auth2
    //       .init({
    //         apiKey,
    //         clientId,
    //         discoveryDocs,
    //         scope
    //       })
    //       .then(res => {
    //         console.log(
    //           // res.getClient(),

    //           res.currentUser
    //             .get()

    //         );
    //         //   gapi.client.drive.files
    //         //     .list({
    //         //       pageSize: 10,
    //         //       fields: "nextPageToken, files(id, name)"
    //         //     })
    //         //     .then(function(response) {
    //         //       this.appendPre("Files:");
    //         //       var files = response.result.files;
    //         //       if (files && files.length > 0) {
    //         //         for (var i = 0; i < files.length; i++) {
    //         //           var file = files[i];
    //         //           this.appendPre(file.name + " (" + file.id + ")");
    //         //         }
    //         //       } else {
    //         //         this.appendPre("No files found.");
    //         //       }
    //         //     });
    //       });
    //     // console.log(auth2, "auth2");
    //     // const auth2 = await gapi.auth2.init({ client_id });
    //     // if (auth2) {
    //     //   this.auth2 = auth2;
    //     //   // commit({ type: "setAuth2", auth2 });
    //     //   if (auth2.isSignedIn.get()) {
    //     //     console.log(
    //     //       auth2.currentUser
    //     //         .get()
    //     //         .getBasicProfile()
    //     //         .getEmail()
    //     //     );
    //     //   }
    //     // }
    //   });
    // },
  },
  components: {
    firebaseAuth,
    auth2Edpoint
  }
};
</script>


