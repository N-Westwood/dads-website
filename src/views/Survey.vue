<template>
  <v-main class="mt-16 ml-5">
    <!-- Text outside form, use v-row and v-col-->
    <h2 class="mt-12">{{ surveyText }}</h2>
    <v-form ref="form" class="mt-4" v-on:submit.prevent="saveResponses">
      <!-- Text inside form, use <p>-->
      <v-radio-group
        v-for="question in surveyQuestions"
        :key="question.id"
        v-model="answers[question.id]"
      >
        {{ question.question }}
        <v-radio label="yes" :value="1"> </v-radio>
        <v-radio label="no" :value="0"> </v-radio>
      </v-radio-group>
      <!--Insert a line here to seperate the tickle questions from the master question  -->
      <v-radio-group v-model="answers.overall[surveyId][timeFrame]">
        <!--     Do you feel you are prepared in a {{timeFrame}}-term time frame in this area? -->
        <!--      <br/> -->
        --------------------------------------------------------------------------------------
        <br />
        How do you rate your overall preparedness in this section?
        <!--category for the {{timeFrame}}-term? -->
        <v-radio label="Reasonably Prepared" :value="1"> </v-radio>
        <v-radio label="Somewhat Prepared" :value="2"> </v-radio>
        <v-radio label="Not Prepared" :value="3"> </v-radio>
      </v-radio-group>
    </v-form>
  </v-main>
</template>

<script>
import data from '../assets/data.json'
import { getAnswers, saveAnswers } from '../lib/answers.js'

const categoriesById = Object.fromEntries(
  data.categories.map((category) => [category.id, category])
)
const timeLabelsById = Object.fromEntries(
  data.periods.map((time) => [time.id, time.label])
)

export default {
  name: 'App',
  components: {},
  data: () => ({
    graphData: {},
    surveyQuestions: [],
    timeFrame: 'short',
    prepared: 1,
    surveyId: 'shelter'
  }),
  methods: {
    getSurveyData() {
      if (this.$route.query.id) this.surveyId = this.$route.query.id
      if (this.$route.query.time) this.timeFrame = this.$route.query.time
      // console.log({id: this.$route.query.id, time: this.$route.query.time})
      this.surveyQuestions =
        categoriesById[this.surveyId].questions[this.timeFrame]
      this.answers = getAnswers()
    },
    saveResponses() {
      saveAnswers(this.answers)
      this.$router.push('/')
    },
    openNext() {
      this.saveResponses()

      if (this.timeFrame == 'long') {
        const currentCategoryIndex = data.categories.findIndex(
          (c) => c.id === this.surveyId
        )
        const nextCategory = data.categories[currentCategoryIndex + 1]
        if (!nextCategory) {
          this.$router.push(`/`)
        } else {
          this.$router.push(`/survey?time=short&id=${nextCategory.id}`)
        }
      } else if (this.timeFrame == 'intermediate') {
        this.$router.push(`/survey?time=long&id=${this.surveyId}`)
      } else if (this.timeFrame == 'short') {
        this.$router.push(`/survey?time=intermediate&id=${this.surveyId}`)
      }
    },
    openPrev() {
      this.saveResponses()
      if (this.timeFrame == 'short') {
        const currentCategoryIndex = data.categories.findIndex(
          (c) => c.id === this.surveyId
        )
        const prevCategory = data.categories[currentCategoryIndex - 1]
        if (!prevCategory) {
          this.$router.push(`/`)
        } else {
          this.$router.push(`/survey?time=long&id=${prevCategory.id}`)
        }
      } else if (this.timeFrame == 'intermediate') {
        this.$router.push(`/survey?time=short&id=${this.surveyId}`)
      } else if (this.timeFrame == 'long') {
        this.$router.push(`/survey?time=intermediate&id=${this.surveyId}`)
      }
    }
  },
  watch: {
    '$route.query': {
      handler() {
        this.getSurveyData()
        this.surveyText = `${categoriesById[this.$route.query.id].label} ${
          timeLabelsById[this.$route.query.time]
        } Assessment`
      }
    }
  },
  created() {
    this.getSurveyData()
    this.surveyText = `${categoriesById[this.$route.query.id].label} ${
      timeLabelsById[this.$route.query.time]
    } Assessment`
  },
  mounted() {
    this.$root.$on('NextSurvey', this.openNext)
    this.$root.$on('PreviousSurvey', this.openPrev)
    this.$root.$on('SubmitSurvey', this.saveResponses)
  }
}
</script>

<style scoped>
#ButtonRow {
  position: fixed;
}
.v-btn {
  opacity: 1;
}
</style>
