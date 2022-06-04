<template>
    <v-card class='cardContainer' elevation="0">
      <v-row no-gutters>
        <v-col cols='auto'>
          <v-icon>
            {{mdiName}}
          </v-icon>
          <h2>{{type}}</h2>
          <ul>
            <li><router-link :to="{ name: 'Survey', query: {id: surveyId, time: 'short'} }">Short-term</router-link></li>
            <li><router-link :to="{ name: 'Survey', query: {id: surveyId, time: 'intermediate'} }">Intermediate-Term</router-link></li>
            <li><router-link :to="{ name: 'Survey', query: {id: surveyId, time: 'long'} }">Long-Term</router-link></li>
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