<template>
  <v-container fluid>
    <v-layout row wrap>
      <v-flex xs12 class="text-xs-center" mt-5>
          
        <h1>this is teacher page</h1>
        <appform />
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import Appform from './Appform.vue'
export default {
components:{Appform}
}
</script>