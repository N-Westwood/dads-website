<template>
    <v-card class='cardContainer' elevation="0">
      <v-row no-gutters>
        <v-col cols='auto'>
          <v-icon>
            {{mdiName}}
          </v-icon>
          <h2>{{type}}</h2>
          <ul>
            <li><a :href='`/survey?time=short&id=${surveyId}`'>Short-Term</a></li>
            <li><a :href='`/survey?time=intermediate&id=${surveyId}`'>Itermediate-Term</a></li>
            <li><a :href='`/survey?time=long&id=${surveyId}`'>Long-Term</a></li>
          </ul>
        </v-col>
      </v-row>
    </v-card>
</template>

<script>
export default {
  props: ['mdiName', 'type', 'surveyId'],
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

a {
  text-decoration: none;
  color: black;
}
</style>