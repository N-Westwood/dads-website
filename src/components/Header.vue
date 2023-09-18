<template>
  <v-app-bar
    app
    :color="bg"
    dark
    class="align-center"
    v-bind:id="headerId"
  >
  <v-col>
    <v-row>
      <v-col>
        <v-btn
          plain
          dark
          :ripple="false"
          to="/"
          class="name">
          {{titleText}}
        </v-btn>
      </v-col>
    </v-row>
    <v-row class="mt-n6 ml-2" v-if="isSurvey">
      <v-col cols="auto">
        <v-btn @click="openPrev" id="Previous" color="primary">
          Previous
        </v-btn>
      </v-col >
      <v-col cols="auto" class="ml-n4">
        <v-btn @click="saveResponses" id="Submit" color="primary">
          Home
        </v-btn>
      </v-col>
      <v-col cols="auto" class="ml-n4">
        <v-btn @click="openNext" id="Next" color="primary">
          Next
        </v-btn>
      </v-col>
    </v-row>
  </v-col>
  </v-app-bar>
</template>

<script>

export default {
  data: ()=>{
    return {
      drawer: null,
      group: null,
      bg: 'secondary',
      titleText: 'Assessments',
      surveyText: 'Assessments'
    }
  },
  methods:{
    openNext(){
      this.$root.$emit('NextSurvey')
    },
    openPrev(){
      this.$root.$emit('PreviousSurvey')
    },
    saveResponses(){
      this.$root.$emit('SubmitSurvey')
    }
  },
  created(){
    let routeName = this.$router.history.current.path
    if (routeName == '/')
        this.titleText = 'Emergency Preparedness Assessment'
      else if (routeName == '/survey'){
        this.titleText = 'Category Assessment', 
        this.surveyText = '${this.$route.query.id} ${this.$route.query.time} Assessment' 
      }
  },
  computed: {
    headerId(){
      return this.isSurvey ? "Survey" : "";
    },
    surveyMargin(){
      return this.isSurvey ? "mt-8" : "";
    },
    isSurvey(){
      return this.$route.name == "Survey";
    }
  },
  watch: {
    group() {
      this.drawer = false
    },
    $route(to){
      if (to.name == 'Home')
        this.titleText = 'Emergency Preparedness Assessment'
      else if (to.name == 'Survey'){
        this.titleText = 'Assessment', 
        this.surveyText = '${this.$route.query.id} ${this.$route.query.time} Assessment' 
      }
    },
  },
}
</script>

<style>
.v-btn.name {
  font-size: 20px;
  font-weight: bold;
  font-family: sans-serif;
}
#Survey {
  height: 100px !important;
}
.v-toolbar__content {
  height: auto !important;
  padding: 0 !important;
}
@media print {
  .v-toolbar {
    display: none !important;
  }
}
</style>