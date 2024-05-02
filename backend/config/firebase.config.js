const dotenv = require("dotenv").config();

module.exports = {
  firebaseConfig: {
    apiKey: process.env.FBAPIKEY,
    authDomain: process.env.AUTHDOMAIN,
    projectId: process.env.PROJECTID,
    storageBucket: process.env.STORAGEBUCKET,
    messagingSenderId: process.env.MESSAGINGSENDERID,
    appId: process.env.FBAPPID,
  },
};
