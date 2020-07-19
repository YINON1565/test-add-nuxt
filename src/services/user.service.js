import {storageService} from './storage.service'
// import {utilService} from './util.service'

const KEY_LOGGEDIN = "loggedinUser";
const KEY_USERS = "users-1";
const KEY_USER = "user-1";
// const KEY_USERS_COUNT = 'usersCount'

// import httpService from "./http.service.js";

async function getById(userId) {
  var user = storageService.load(KEY_USER)
  if (!user){
    user = await httpService.get(`user/${userId}`);
    storageService.store(KEY_USER, user)
  }
  return user

  // return httpService.get(`user/${userId}`);
}

async function getByEmail(email) {
  // return httpService.get(`user/${email}`);
}

function removeUser(userId) {
  // return httpService.delete(`user/${userId}`);
}

async function saveUser(user){
  
  return await user._id ? _updateUser(user): _addUser(user)
}

async function _updateUser(user) {
  // return await httpService.put(`user/${user._id}`, user);
}

async function _addUser(user) {
  // return await httpService.post(`user`, user);
}

async function login(credentials) {
  // user.myActivities.push(_setActivity(credentials, 'login'))
  // credentials.lastLoginAt = Date.now();
  // const user = await httpService.post("auth/login", credentials);
  // return _handleLogin(user);
}

// function _setActivity(user, type, activity){
//   return {
//     _id: utilService.makeId(),
//     type,
//     date: Date.now(),
//     miniActivity
//     : {
//         _id: activity._id,
//         name: activity.name,
//         name: activity.title,
//         description: activity.name,
//         photoURL: activity.photoURL,
//         photoURLs: activity.photoURLs
//       }
//     }
// }


async function signup(credentials) {
  sessionStorage.clear();
  credentials.joinAt = Date.now();
  credentials.lastLoginAt = Date.now();
  // credentials.joinAt = _getNewDate();
  // credentials.lastLoginAt = _getNewDate();
  console.log(credentials, "credentials");

  // const user = await httpService.post('auth/signup', credentials)
  // return _handleLogin(user)
}

async function signInWithGoogle(auth2) {
    try {
    return await auth2.signIn();
  } catch (err) {
    console.error("Error signing in", err);
  }
}

async function logout() {
  // const msg = await httpService.post("auth/logout");
  // sessionStorage.clear();
  // return msg;
}

async function getUsers() {
    // var users = storageService.load(KEY_USERS)
    // if (!users) {
    //   users = await httpService.get("user"); 
    //   storageService.store(KEY_USERS, users)
    // }
    // return users
//   return httpService.get("user");
}

function getLoggeinUser() {
  return storageService.loadSession(KEY_LOGGEDIN)
}

function getMinimalUser(user) {
  return {
    _id: user._id,
    displayName: user.displayName,
    photoURL: user.photoURL,
  };
}

function getEmptyUser() {
  return {
    displayName: '',
    // displayName: {he: '', en: ''},
    // description: {he: '', en: ''},
    password: '',
    email: '',
    phoneNumber: '',
    photoURL: '',
    isAdmin: false,
    permissions: [],
    authResponse: {},
    term: {},
    notifications: [],
    preference: {},
    shoppingCart: [],
    community: '',
    friends: [],
    family: [],
    birthday: null,
    bio: '',
    uid: null,
    posts: [],
    videos: [],
    myActivities: [],
    joinAt: null,
    lastJoinAt: null
  };
}

function _handleLogin(user) {
  storageService.storeSession(KEY_LOGGEDIN, user)
  return user;
}

function _getNewDate() {
  return { date: _getValidDate(new Date()), time: _getValidtime(new Date()) };
}

function _getValidDate(date) {
  return (
    date.getFullYear() +
    "-" +
    _padNum(date.getMonth() + 1) +
    "-" +
    _padNum(date.getDate())
  );
}

function _getValidtime(time) {
  return _padNum(time.getHours()) + ":" + _padNum(time.getMinutes());
}

function _padNum(num) {
  return num < 10 ? "0" + num : num;
}

export const userService = {
  login,
  logout,
  signup,
  getUsers,
  getById,
  getByEmail,
  getEmptyUser,
  removeUser,
  saveUser,
  getLoggeinUser,
  getMinimalUser,
  signInWithGoogle,
  // loadPermissions
  // firebaseLogin,
  // getBy,
  // getUsersCount,
  // changeUsersCount
};

// , קהילה,  העדפות, רכישות
