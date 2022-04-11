<template>
  <v-app>
    <router-view/>
    <Header />
    <Footer/>
  </v-app>
</template>

<script>
import Footer from './components/Footer.vue'
import Header from './components/Header.vue'

export default {
  name: 'App',

  components: {
    Footer,
    Header
  },

  data: () => ({
  }),
};
</script>

<style>
.v-main {
  padding: 0px !important;
}

html {
  overflow: overlay;
  overscroll-behavior: none;
}

*::-webkit-scrollbar {
  display: block;
  width: 6px;
}

*::-webkit-scrollbar-button {
  display: none;
}

*::-webkit-scrollbar-track {
  background-color: #00000000;
}

*::-webkit-scrollbar-track-piece {
  background-color: #00000000;
}

*::-webkit-scrollbar-thumb {
  background-color: #00000040;
  border-radius: 24px;
}
</style>