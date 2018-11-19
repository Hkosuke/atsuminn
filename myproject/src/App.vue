<template>
  <div id="app" class="container">
    <div class="page-header">
      <h1>Firebase Sample App</h1>
    </div>
    <div class="panel panel-default">
      <div class="panel-heading">
        <h3>Add Book</h3>
      </div>
      <div class="panel-body">
        <form id="form" class="form-inline" v-on:submit.prevent="addBook">
          <div class="form-group">
            <label for="bookTitle">Title:
            </label>
            <input type="text" id="bookTitle" class="form-control" v-model="newBook.title">
          </div>
          <div class="form-group">
            <label for="bookAuthor">Author:
            </label>
            <input type="text" id="bookAuthor" class="form-control" v-model="newBook.author">
          </div>
          <div class="form-group">
            <label for="bookUrl">Url:
            </label>
            <input type="text" id="bookUrl" class="form-control" v-model="newBook.url">
          </div>
          <input type="submit" class="btn btn-primary" value="Add Book">
        </form>
      </div>
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
              <ht>
                Delete
              </ht>
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
    <img src="./assets/logo.png">
    <router-view/>
  </div>
</template>
<script src="https://www.gstatic.com/firebasejs/5.5.8/firebase.js"></script>
<script>
import Firebase from 'firebase'

const config = {
  apiKey: "###",
  authDomain: "###",
  databaseURL: "###",
  projectId: "###",
  storageBucket: "###",
  messagingSenderId: "###"
}

const app = Firebase.initializeApp(config);
const db = app.database();
const booksRef = db.ref('books');

export default {
  name: 'App',
  firebase: {
    books: booksRef
  },
  data () {
    return {
      newBook: {
        title: '',
        author: '',
        url: ''
      }
    }
  },
  methods: {
    addBook: function(){
      booksRef.push(this.newBook);
      this.newBook.title = '';
      this.newBook.author = '';
      this.newBook.url = '';
    },
    removeBook: function(book){
      booksRef.child(book['.key']).remove();
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
