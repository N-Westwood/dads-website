<template>
    <v-card class='cardContainer' elevation="0">
      <v-row no-gutters>
        <v-col cols='auto'>
          <v-icon>
            {{mdiName}}
          </v-icon>
          <h2>{{type}}</h2>
          <ul>
            <li v-for="period in periods" :key="period.id">
              <router-link :to="{ name: 'Survey', query: {id: surveyId, time: period.id}}">{{period.label}}</router-link>
            </li>
          </ul>
        </v-col>
      </v-row>
    </v-card>
</template>

<script>
import data from '../assets/data.json'

export default {
  props: ['mdiName', 'type', 'surveyId'],
  data: ()=> {
    return {
      periods: data.periods
    }
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