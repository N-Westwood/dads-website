<template>
<v-main>
    <div class="main">
        <v-row class="mt-15">
            <v-col v-for="category in categories" :key="category.id" sm='6' lg="3">
                
                <h2 id="short-shelter">{{ category.label }} References</h2>
                <p v-for="link in category.links" :key="link">
                    <a :href=link>{{ link }}</a>
                </p>
            </v-col>
        </v-row>
    </div>
</v-main>
</template>

<script>
import labelData from '../assets/labelData.json'

export default {
  name: 'App',
  components: {

  },
  data: () => ({
    categories: labelData.categories.filter(category => category.links)
  }),
  methods: {
    
  },
  watch:{
    
  },
  created(){

    }
};
</script>

<style scoped>
.main {
  padding: 0 8px;
}
</style>
