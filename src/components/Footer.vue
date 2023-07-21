<template>
  <v-footer
    dark
    padless
  >
    <v-card
      flat
      tile
      color="secondary"
      class="lighten-1 white--text text-center"
      width='100%'
      height='5em'
    >
      <router-link class="white--text" :to="{ name: 'References'}">References</router-link>
      <v-card-text class="white--text pt-8">
        Salt Lake City Area | Neal Westwood | Alph 7_21_23
      </v-card-text>
    </v-card>
  </v-footer>
</template>

<script>
export default {
  data: ()=> {
    return {
      icons: [
        ['mdi-github', 'https://github.com/david3214'],
        ['mdi-linkedin', 'https://www.linkedin.com/in/david-westwood-01354b225'],
      ]
    }
  }
}
</script>
