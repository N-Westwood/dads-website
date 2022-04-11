<template>
    <v-card class='cardContainer' elevation="0">
      <v-row>
        <v-col :order='$vuetify.breakpoint.xs || leftImg ? "first" : "last"' cols='12' sm="7">
          <v-img
            :src='require(`@/assets/${src}`)'
            class='image'>
          </v-img>
        </v-col>
        <v-col cols='12' sm='5' align='center' class='my-auto'>
          <h2 class='my-5'>{{title}}</h2>
          <h4 class='my-5 description'>{{description}}</h4>
          <v-btn
            v-if='btnText'
            color='success'
            :to='destination'>
            {{btnText}}
          </v-btn>
        </v-col>
      </v-row>
    </v-card>
</template>

<script>
export default {
  props: ['src', 'leftImg', 'description', 'title', 'btnText', 'destination'],
  data: ()=> {
    return {}
  }
}
</script>

<style scoped>
.image {
  width: 100%;
  height: 300px;
}
.cardContainer {
  margin-block: 75px;
  margin-inline: 5%;
  padding-right: 10px;
  padding-left: 10px;
}
.description {
  font-weight: normal;
}
</style>