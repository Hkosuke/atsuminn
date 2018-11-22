
<template>
<div id="app">
  <v-app id="inspire">
    <v-navigation-drawer
      fixed
      v-model="drawer"
      app
    >
      <v-list dense>
        <v-list-tile @click="">
          <v-list-tile-action>
            <v-icon>home</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>Home</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
        <v-list-tile @click="signOut">
          <v-list-tile-action>
            <v-icon>exit_to_app</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>Sign Out</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
      </v-list>
    </v-navigation-drawer>
    <v-toolbar color="indigo" dark fixed app>
      <v-toolbar-side-icon @click.stop="drawer = !drawer"></v-toolbar-side-icon>
      <v-toolbar-title>Creative Avdulla System</v-toolbar-title>
    </v-toolbar>
    <v-content>
      <v-container fluid ma-0 pa-0 fill-height>
        <v-layout
          justify-center
          align-center
        >
  <div id="Appform" class="container">
    <div class="page-header">
      <h1>Firebase Sample App</h1>
    </div>
    <div class="panel panel-default">
      <div class="panel-heading">
        <h3>Add Book</h3>
      </div>
      <router-view/>
    </div>
    <div class="panel panel-default">
      <div class="panel-heading">
        <h3>Books Lists</h3>
      </div>
      <div class="panel-body">
        <table class="table table-striped">
          <thead>
            <tr>
              <th>
                Title
              </th>
              <th>
                Author
              </th>
              <th>
                Delete
              </th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="book in books">
              <td>
                <a v-bind:href="book.url">{{book.title}}</a>
              </td>
              <td>
                {{book.author}}
              </td>
              <td>
                <span class="glyphicom glyphicon-trash" v-on:click="removeBook(book)"></span>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>

          
        </v-layout>
      </v-container>
    </v-content>
    <v-footer color="indigo" app inset>
      <span class="white--text">&copy; 2018</span>
    </v-footer>
  </v-app>
</div>


</template>
<script src="https://www.gstatic.com/firebasejs/5.5.8/firebase.js"></script>
<script>
import firebase from 'firebase'
import {config} from '../firebase/firebase_config'

/*
export const config = {
  apiKey: "AIzaSyB8ZVjhyO5CvSpO4Iu6n0MmmsO_uOLPyPs",
  authDomain: "fk6-co.firebaseapp.com",
  databaseURL: "https://fk6-co.firebaseio.com",
  projectId: "fk6-co",
  storageBucket: "fk6-co.appspot.com",
  messagingSenderId: "810812087591"
}
*/
const app = firebase.initializeApp(config);
const db = app.database();
const booksRef = db.ref('books');
export default {
  name: 'Appform',
  firebase: {
    books: booksRef
  },
  data () {
    return {
      dialog: false,
      drawer: false,
    }
  },
  methods: {
    removeBook: function(book){
      booksRef.child(book['.key']).remove();
    },
    signOut: function () {
      firebase.auth().signOut().then(() => {
        this.$router.push('/signin')
      })
    }
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
