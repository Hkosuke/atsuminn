
<template>
<div id="app">
  <v-app id="inspire">
    <v-navigation-drawer
      fixed
      dark
      v-model="drawer"
      app
    >
      <v-list subheader>
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
    <v-toolbar color="dark" dark fixed app>
      <v-toolbar-side-icon @click.stop="drawer = !drawer"></v-toolbar-side-icon>
      <v-toolbar-title>Creative Avdulla System</v-toolbar-title>
    </v-toolbar>
    <v-content>
      <v-container fluid ma-0 pa-0 fill-height>
        <v-layout
          justify-center
          align-center
        >
  <template>
  <v-card>
    <v-card-title>
      App list
      <v-spacer></v-spacer>
      <v-text-field
        v-model="search"
        append-icon="search"
        label="Search"
        single-line
        hide-details
      ></v-text-field>
    </v-card-title>
    <v-data-table
      :headers="headers"
      :items="reports"
      :search="search"
      class="elevation-1"
    >
      <template slot="items" slot-scope="props">
          <td class="text-xs-left">{{props.item.studentid}}</td>
          <td class="text-xs-left">{{props.item.company}}</td>
          <td class="text-xs-left">{{props.item.place}}</td>
          <td class="text-xs-left">{{props.item.startdate}}</td>
          <td class="text-xs-left">{{props.item.enddate}}</td>
          <td class="text-xs-left">{{props.item.content}}</td>
          <td class="text-xs-left">{{props.item.status}}</td>
        <td class="justify-center layout px-0">
          <v-icon
            small
            @click="removeReport(props.item)"
          >
            delete
          </v-icon>
        </td>
      </template>
      <v-alert slot="no-results" :value="true" color="error" icon="warning">
        Your search for "{{ search }}" found no results.
      </v-alert>
    </v-data-table>
        <router-view/>
  </v-card>
</template>
        </v-layout>
      </v-container>
    </v-content>
    <v-footer color="dark" dark app inset>
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
const reportsRef = db.ref('report');
export default {
  name: 'Appform',
  firebase: {
    reports: reportsRef
  },
  data () {
    return {
      dialog: false,
      drawer: false,
      search: '',
      headers: [
        {
          text:'Studentid',value:'studentid'
        },
        {
          text:'Company',value:'company'  
        },
        {
          text:'Place',value:'place' 
        },
        {
          text:'Startdate',value:'startdate' 
        },
        {
          text:'Enddate',value:'enddate' 
        },
        {
          text:'Content',value:'content' 
        },
        {
          text:'status',value:'status' 
        },
        {
          text:'Delete',value:'Delete',sortable: false
        },
      ]
    }
  },
  methods: {
    removeReport: function(app){
      reportsRef.child(app['.key']).remove();
    },
    signOut: function () {
      firebase.auth().signOut().then(() => {
        this.$router.push('/signin')
      })
    }
  }
}
</script>
<!--
<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  /*
  color: #2c3e50;
  */
  margin-top: 60px;
}
</style>
-->