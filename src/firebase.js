// Import the functions you need from the SDKs you need

import { initializeApp } from 'firebase/app'

import { getAnalytics } from 'firebase/analytics'

// TODO: Add SDKs for Firebase products that you want to use

// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration

// For Firebase JS SDK v7.20.0 and later, measurementId is optional

const firebaseConfig = {
  apiKey: 'AIzaSyConfk-AACwT1JbcruOC6mLT5KS7W77P38',

  authDomain: 'myfirstwebsite-4557d.firebaseapp.com',

  projectId: 'myfirstwebsite-4557d',

  storageBucket: 'myfirstwebsite-4557d.appspot.com',

  messagingSenderId: '1000077770276',

  appId: '1:1000077770276:web:b85d8423d18404b82de2b1',

  measurementId: 'G-RJKHS9FHJE',
}

// Initialize Firebase

const app = initializeApp(firebaseConfig)

const analytics = getAnalytics(app)
