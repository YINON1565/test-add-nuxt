import Vue from 'vue'
import Vuex from 'vuex'
import {userService} from '../services/user.service'
import {ipService} from '../services/ip.service'
import '../services/api';
const { gapi } = window;

import { clientId } from '../config/client-id';
import { apiKey } from '../config/client-id';

// Array of API discovery doc URLs for APIs used by the quickstart
var discoveryDocs = ["https://www.googleapis.com/discovery/v1/apis/drive/v3/rest"];

// Authorization scopes required by the API; multiple scopes can be
// included, separated by spaces.
var scope = 'https://www.googleapis.com/auth/drive.metadata.readonly';


Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    auth2: null,
    ip: null,
  },
  getters: {
    auth2(state) {
          return state.auth2;
        },
        ip(state) {
          return state.ip;
        },
  },
  mutations: {
    setAuth2(state, { auth2 }) {
      state.auth2 = auth2;
    },
    setIp(state, { ip }) {
      state.ip = ip;
    },
  },
  actions: {
    async loadClientAuth2({commit}) {
      console.log('hi');
      gapi.load('client:auth2', async (_) => {
        const auth2 = await gapi.auth2.init({ 
          apiKey,
          clientId,
          discoveryDocs,
          scope }
          );
          console.log(auth2, 'auth2');
        // const auth2 = await gapi.auth2.init({ client_id });
        if (auth2) {
          commit({ type: 'setAuth2', auth2 });
          if (auth2.isSignedIn.get()) {
            console.log(auth2.isSignedIn.get(), 'auth2.isSignedIn.get()');
            console.log(auth2.currentUser.get().getBasicProfile().getEmail());
            // if (!state.loggedinUser) {
                  // await dispatch({type: 'login', credentials: {email: auth2.currentUser.get().getBasicProfile().getEmail(), isWithGoogle: true}})
              // }
          } 
//           else {
//       const resFromGoogle = await userService.signInWithGoogle(auth2);
// console.log(resFromGoogle, 'resFromGoogle');
//           }
        }
      });
    },
    async signInWithGoogle({state, dispatch}) {
      var user = {};
      const resFromGoogle = await userService.signInWithGoogle(state.auth2);
      if (resFromGoogle && resFromGoogle !== 'err') {
          const profile = resFromGoogle.getBasicProfile();
          user.email = profile.getEmail();
          user.displayName = profile.getName();
          user.uid = profile.getId();
          user.photoURL = profile.getImageUrl();
          user.authResponse = resFromGoogle.getAuthResponse();
          // var userLogin = await dispatch({type: 'login', credentials: {email: user.email, isWithGoogle: true}})
          //   if (userLogin && userLogin !== 'err') {
          //       user = userLogin
          //   } 
          return user;
      } else {
          console.log('Error at Sign In With Google');
      }
    },
    async listFiles() {
      gapi.client.drive.files.list({
        'pageSize': 10,
        'fields': "nextPageToken, files(id, name)"
      }).then(function(response) {
        appendPre('Files:');
        var files = response.result.files;
        if (files && files.length > 0) {
          for (var i = 0; i < files.length; i++) {
            var file = files[i];
            appendPre(file.name + ' (' + file.id + ')');
          }
        } else {
          appendPre('No files found.');
        }
      });
    },
    async fetchUser({ commit }, user) {
      // console.log(user, 'user');
      if (user) {
          user = {
              uid: user.uid,
              displayName: user.displayName,
              email: user.email,
              phoneNumber: user.phoneNumber,
              photoURL: user.photoURL,
              metadata: user.metadata,
              // allData: user
            }
            // console.log(user, 'user in store');
            // var userLogin = await userService.firebaseLogin(user)
          // commit({type: 'setUser', userLogin})
      //     commit("setUser", {
      //     _id: user.uid,
      //     displayName: user.displayName,
      //     email: user.email,
      //     phoneNumber: user.phoneNumber,
      //     photoURL: user.photoURL,
      //     metadata: user.metadata
      //   });
      // } else {
      //   commit("setUser", null);
      }
    },
    async getIp({commit}){
      const ip = await ipService.getIp()
      commit({type: 'setIp', ip})
    }
  },
  modules: {
  }
})
