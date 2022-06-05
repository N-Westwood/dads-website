<template>
<v-main>
  <!-- Text outside form, use v-row and v-col-->
  <v-form ref="form" class="mt-16 ml-5" v-on:submit.prevent="saveResponses">
    <!-- Text inside form, use <p>-->

    <v-radio-group v-for="question in surveyQuestions" :key="question[0]" v-model="question[1]">
      {{question[0]}}
      <v-radio label="yes" :value='1'>
      </v-radio>
      <v-radio label="no" :value='0'>
      </v-radio>
    </v-radio-group>
    <!--Insert a line here to seperate the tickle questions from the master question  -->
    <v-radio-group v-model='prepared'>
 <!--     Do you feel you are prepared in a {{timeFrame}}-term time frame in this area? -->
        <br/>
        --------------------------------------------------------------------------------------
        <br/>
        How do you rate your overall preparedness in this section? <!--category for the {{timeFrame}}-term? -->
      <v-radio label="Reasonably Prepared" :value='1'>
      </v-radio>
      <v-radio label="Somewhat Prepared" :value='2'>
      </v-radio>
      <v-radio label="Not Prepared" :value='3'>
      </v-radio>
    </v-radio-group>
     <v-btn @click="openPrev">
      Previous
    </v-btn>
    <v-btn type="submit">
      Home
    </v-btn>
    <v-btn @click="openNext">
      Next
    </v-btn>
  </v-form>
</v-main>
</template>

<script>
import defaultData from '../assets/defaultData.json';
import defaultSurveys from '../assets/defaultSurveys.json'

export default {
  name: 'App',
  components: {

  },
  data: () => ({
    graphData: {},
    surveyQuestions: [
      ["Do you have somewhere to stay for 3 days?", 0],
      ["Do you have clothing in case of bad weather?", 0]
    ],
    timeFrame: "short",
    prepared: 1,
    surveyId: 'Shelter',
    surveyList: {}
  }),
  methods: {
    getGraphData(){
      if (localStorage.getItem('PreparednessData'))
        this.graphData = JSON.parse(localStorage.getItem('PreparednessData'))
      else {
        this.graphData = defaultData
        localStorage.setItem('PreparednessData', JSON.stringify(defaultData))
      }

      let preparednessLevel = this.graphData.children.findIndex(level=>level.name == this.surveyId);
      if(this.timeFrame == 'short')
        this.prepared = this.graphData.children[preparednessLevel].prepared
      else if(this.timeFrame == 'intermediate')
        this.prepared = this.graphData.children[preparednessLevel].children[0].prepared
      else if(this.timeFrame == 'long')
        this.prepared = this.graphData.children[preparednessLevel].children[0].children[0].prepared
    },
    getSurveyData(){
      if (localStorage.getItem('SurveyAnswers'))
        this.surveyList = JSON.parse(localStorage.getItem('SurveyAnswers'))
      else {
        this.surveyList = defaultSurveys
        localStorage.setItem('SurveyAnswers', JSON.stringify(defaultSurveys))
      }

      if (this.$route.query.id)
        this.surveyId = this.$route.query.id
      if (this.$route.query.time)
        this.timeFrame = this.$route.query.time
      // console.log({id: this.$route.query.id, time: this.$route.query.time})
      this.surveyQuestions = this.surveyList[this.surveyId][this.timeFrame]
    },
    saveResponses(){
      this.surveyList[this.surveyId][this.timeFrame] = this.surveyQuestions
      localStorage.setItem('SurveyAnswers', JSON.stringify(this.surveyList))

      this.$router.push('/')
    },
    openNext(){
      this.saveResponses();
      
      // Check if it's long
      if(this.timeFrame == "long"){
        //Do a lot more stuff
        var currentIndex = this.graphData.children.findIndex(level=>level.name == this.surveyId);
        currentIndex++;
        if (currentIndex == this.graphData.children.length){
          // currentIndex == 0
          this.$router.push(`/`)
        }
        this.$router.push(`/survey?time=short&id=${this.graphData.children[currentIndex].name}`)

      }
      else if (this.timeFrame == "intermediate"){
        this.$router.push(`/survey?time=long&id=${this.surveyId}`)
      }
      else if (this.timeFrame == "short"){
        this.$router.push(`/survey?time=intermediate&id=${this.surveyId}`)
      }
    },
    openPrev(){
      this.saveResponses();
      
      // Check if it's short
      if(this.timeFrame == "short"){
        //Do a lot more stuff
        var currentIndex = this.graphData.children.findIndex(level=>level.name == this.surveyId);
        currentIndex--;
 //       if (currentIndex == this.graphData.children.length){
        if (currentIndex == 0){
         // currentIndex == 0
          this.$router.push(`/`)
        }
        this.$router.push(`/survey?time=long&id=${this.graphData.children[currentIndex].name}`)

      }
      else if (this.timeFrame == "intermediate"){
        this.$router.push(`/survey?time=short&id=${this.surveyId}`)
      }
      else if (this.timeFrame == "long"){
        this.$router.push(`/survey?time=intermediate&id=${this.surveyId}`)
      }
    }
  },
  watch:{
    prepared(newValue){
      let preparednessLevel = this.graphData.children.findIndex(level=>level.name == this.surveyId);
      // console.log({preparednessLevel, term: this.timeFrame})
      if(this.timeFrame == 'short')
        this.graphData.children[preparednessLevel].prepared = newValue
      else if(this.timeFrame == 'intermediate')
        this.graphData.children[preparednessLevel].children[0].prepared = newValue
      else if(this.timeFrame == 'long')
        this.graphData.children[preparednessLevel].children[0].children[0].prepared = newValue
      localStorage.setItem('PreparednessData', JSON.stringify(this.graphData))
    },
      '$route.query': {
        handler(){
          this.getSurveyData()
          this.getGraphData()
        }
      }
  },
  created(){
    this.getSurveyData()
    this.getGraphData()
  }
};
</script>

<style scoped>

</style>
