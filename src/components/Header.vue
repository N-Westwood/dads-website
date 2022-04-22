<template>
  <v-app-bar
    app
    :color="bg"
    dark
    class="align-center"
  >
    <v-row>
      <v-col>
        <v-btn
          plain
          dark
          :ripple="false"
          to="/"
          class="name">
          Emergency Preparedness
        </v-btn>
      </v-col>
    </v-row>
    
    <!-- <v-row justify="center" class="d-none d-md-flex">
      <v-col
        cols='auto'
        v-for="directory in directories" 
        :key="directory[0]"
        class='mx-n3 mt-n5'
        >
        <v-btn 
          plain dark 
          :to="directory[1]"
          :ripple="false"
          class='directoryText'
          >
            {{directory[0]}}
        </v-btn>
      </v-col>
    </v-row> -->
    <!-- <v-row no-gutters justify="end" class='d-none d-md-flex'>
      <v-col cols='2'>
        <v-btn
          class="white--text"
          href="https://www.linkedin.com/in/david-westwood-01354b225"
          target="_blank"
          icon
        >
          <v-icon size="24px">
            mdi-linkedin
          </v-icon>
        </v-btn>
      </v-col>
      <v-col cols='auto' class='mt-1'>
        <v-btn 
          to='/contact'
          color='success'>
          Get in touch
        </v-btn>
      </v-col>
    </v-row> -->
  </v-app-bar>
</template>

<script>
export default {
  data: ()=>{
    return {
      drawer: null,
      group: null,
      bg: 'secondary'
    }
  },
  watch: {
    group() {
      this.drawer = false
    }
  },
}
</script>

<style>
.v-btn.name {
  font-size: 20px;
  font-weight: bold;
  font-family: sans-serif;
}
</style>