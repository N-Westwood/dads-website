<template>
<v-main>
  <v-form ref="form" class="mt-16 ml-5" v-on:submit.prevent="saveResponses">
    <v-radio-group v-for="question in surveyQuestions" :key="question[0]" v-model="question[1]">
      {{question[0]}}
      <v-radio label="yes" :value='1'>
      </v-radio>
      <v-radio label="no" :value='0'>
      </v-radio>
    </v-radio-group>
    <v-radio-group v-model='prepared'>
      Do you feel you are prepared in a {{timeFrame}}-term time frame in this area?
      <v-radio label="yes" :value='1'>
      </v-radio>
      <v-radio label="somewhat" :value='2'>
      </v-radio>
      <v-radio label="no" :value='3'>
      </v-radio>
    </v-radio-group>
    <v-btn type="submit">
      Submit
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
      console.log({id: this.$route.query.id, time: this.$route.query.time})
      this.surveyQuestions = this.surveyList[this.surveyId][this.timeFrame]
    },
    saveResponses(){
      this.surveyList[this.surveyId][this.timeFrame] = this.surveyQuestions
      localStorage.setItem('SurveyAnswers', JSON.stringify(this.surveyList))

      this.$router.push('/')
    }
  },
  watch:{
    prepared(newValue){
      let preparednessLevel = this.graphData.children.findIndex(level=>level.name == this.surveyId);
      console.log({preparednessLevel, term: this.timeFrame})
      if(this.timeFrame == 'short')
        this.graphData.children[preparednessLevel].prepared = newValue
      else if(this.timeFrame == 'intermediate')
        this.graphData.children[preparednessLevel].children[0].prepared = newValue
      else if(this.timeFrame == 'long')
        this.graphData.children[preparednessLevel].children[0].children[0].prepared = newValue
      localStorage.setItem('PreparednessData', JSON.stringify(this.graphData))
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
