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
    >
      <v-card-text>
        <v-btn
          v-for="icon in icons"
          :key="icon[0]"
          class="mx-4 white--text"
          :href="icon[1]"
          target="_blank"
          icon
        >
          <v-icon size="24px">
            {{ icon[0] }}
          </v-icon>
        </v-btn>
      </v-card-text>

      <v-card-text class="white--text pt-0">
        Salt Lake City Area | David Westwood
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
