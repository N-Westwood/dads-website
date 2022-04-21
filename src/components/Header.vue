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
          David Westwood
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
    <v-row no-gutters justify="end" class='d-none d-md-flex'>
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
    </v-row>
    <v-app-bar-nav-icon class='d-md-none' @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
    <v-navigation-drawer
      absolute
      temporary
      right
      color='secondary'
      v-model='drawer'
      height='100vh'>
      <v-list
        nav
        dense
      >
        <v-list-item-group
          v-model="group"
        >
          <v-list-item
            to='/'>
            <v-list-item-avatar>
                <!-- <v-img src="../assets/Sitting By Rocks.jpeg"></v-img> -->
              </v-list-item-avatar>
              <v-list-item-title>
                David Westwood
              </v-list-item-title>
          </v-list-item>

          <v-divider class='my-5'/>

          <v-list-item 
            v-for='directory in directories'
            :key='directory[0]'
            :to='directory[1]'
            >
            <v-list-item-title>{{directory[0]}}</v-list-item-title>
          </v-list-item>
        </v-list-item-group>
      </v-list>
      <v-row class='mt-2'>
        <v-spacer />
        <v-btn
          class="white--text mt-n1"
          href="https://www.linkedin.com/in/david-westwood-01354b225"
          target="_blank"
          icon
        >
          <v-icon size="24px">
            mdi-linkedin
          </v-icon>
        </v-btn>
        <v-btn 
          to='/contact'
          color='success'>
          Get in touch
        </v-btn>
        <v-spacer />
      </v-row>
    </v-navigation-drawer>
  </v-app-bar>
</template>

<script>
export default {
  data: ()=>{
    return {
      // directories: [
      //   ["Resume", "/resume"],
      //   ["Portfolio", "/portfolio"],
      //   ["Contact", "/contact"]
      // ],
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
  // mounted() {
  //   window.onscroll = () => {
  //     this.changeColor();
  //   };
  // },
  // methods: {
  //   changeColor() {
  //     if (
  //       document.body.scrollTop > 50 ||
  //       document.documentElement.scrollTop > 50
  //     ) {
  //       this.bg = 'secondary';
  //     } else {
  //       this.bg = 'transparent';
  //     }
  //   },
  // },
}
</script>

<style>
.v-btn.name {
  font-size: 20px;
  font-weight: bold;
  font-family: sans-serif;
}
</style>