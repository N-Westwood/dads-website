<template>
  <v-main>
    <div class="main">
      <v-row class="mt-15">
        <v-col sm="6" lg="3">
          <h2>Shelter/Clothing References</h2>
          <ul>
            <li>
              google
              <br />
              <a href="https://google.com" target="_blank" rel="noreferrer noopener">https://google.com</a>
            </li>
          </ul>
        </v-col>

        <v-col sm="6" lg="3">
          <h2>Heat/Light/Power/Fuel References</h2>
          <ul>
            <li>
              google
              <br />
              <a href="https://www.disasterpreparer.com" target="_blank" rel="noreferrer noopener">https://www.disasterpreparer.com</a>
            </li>
          </ul>
        </v-col>

        <v-col sm="6" lg="3">
          <h2>Transportation/Comm/Evac</h2>
          <ul>
            <li>
              google
              <br />
              <a href="https://urbanaquaponics.com" target="_blank" rel="noreferrer noopener">https://urbanaquaponics.com</a>
            </li>
            <li>
              google
              <br />
              <a href="https://google.com" target="_blank" rel="noreferrer noopener">https://google.com</a>
            </li>
            <li>
              google
              <br />
              <a href="https://beready.utah.gov" target="_blank" rel="noreferrer noopener">https://beready.utah.gov</a>
            </li>
          </ul>
        </v-col>
        
      </v-row>
    </div>
  </v-main>
</template>

<script>
import data from '../assets/data.json'

export default {
  name: 'App',
  components: {},
  data: () => ({
    categories: data.categories.filter((category) => category.links?.length)
  }),
  methods: {},
  watch: {},
  created() {}
}
</script>

<style scoped>
.main {
  padding: 0 8px;
}
</style>
