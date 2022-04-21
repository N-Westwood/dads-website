<template>
    <v-card class='cardContainer' elevation="0">
      <v-row no-gutters>
        <v-col cols='auto'>
          <v-icon>
            {{mdiName}}
          </v-icon>
          <h2>{{type}}</h2>
          <ul>
            <li>Short-Term</li>
            <li>Itermediate-Term</li>
            <li>Long-Term</li>
          </ul>
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
.cardContainer {
  width: 100%;
}

li{
  list-style-type: none;
}
</style>