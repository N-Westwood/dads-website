<template>
    <v-card class='cardContainer' elevation="0">
      <v-row>
        <v-col cols='12' sm="7">
          <v-icon>
            {{mdiName}}
          </v-icon>
        </v-col>
        <v-col cols='12' sm='5' align='center' class='my-auto'>
          <h2>{{type}}</h2>
          <ol>
            <li>Short-Term</li>
            <li>Itermediate-Term</li>
            <li>Long-Term</li>
          </ol>
        </v-col>
      </v-row>
    </v-card>
</template>

<script>
export default {
  props: ['mdiName', 'type'],
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
</style>