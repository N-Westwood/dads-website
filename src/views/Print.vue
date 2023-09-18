<template>
  <v-main class="mt-16 pb-16 pl-8 pr-8">
    <table class="w-100 table">
      <colgroup></colgroup>
      <thead>
        <tr>
          <th></th>
        </tr>
      </thead>
      <tbody>
        <template v-for="category in categories">
          <tr :key="category.id" class="pagebreak">
            <td
              colspan="3"
              class="text-center font-weight-bold text-h4 pt-8 inline-block"
            >
              {{ category.label }}
            </td>
          </tr>
          <template v-for="(period, key) in category.periods">
            <tr :key="category.id + key">
              <td colspan="2">
                <span class="font-weight-bold text-h5 inline-block pr-4">{{
                  period.label
                }}</span>
                <span>{{ period.overall }}</span>
              </td>
            </tr>
            <template v-for="question in period.questions">
              <tr :key="category.id + key + question.id">
                <td class="px-4 bordered">
                  {{
                    question.answer === 1
                      ? 'yes'
                      : question.answer === 0
                      ? 'no'
                      : 'unanswered'
                  }}
                </td>
                <td class="px-4 bordered">{{ question.question }}</td>
              </tr>
            </template>
          </template>
        </template>
      </tbody>
    </table>
  </v-main>
</template>

<script>
import data from '../assets/data.json'
import { getAnswers } from '../lib/answers.js'

const overallLabels = {
  1: 'Reasonably Prepared',
  2: 'Somewhat Prepared',
  3: 'Not Prepared'
}

export default {
  name: 'Print',
  data: () => {
    const answers = getAnswers()
    const periodsById = data.periods.reduce((map, period) => {
      map[period.id] = period
      return map
    }, {})
    return {
      categories: data.categories.map((category) => ({
        id: category.id,
        label: category.label,
        answers: answers.overall[category.id],
        periods: {
          short: {
            label: periodsById.short.label,
            overall: overallLabels[answers.overall[category.id].short ?? 3],
            questions: category.questions.short.map((question) => ({
              id: question.id,
              question: question.question,
              answer: answers[question.id]
            }))
          },
          intermediate: {
            label: periodsById.intermediate.label,
            overall:
              overallLabels[answers.overall[category.id].intermediate ?? 3],
            questions: category.questions.intermediate.map((question) => ({
              id: question.id,
              question: question.question,
              answer: answers[question.id]
            }))
          },
          long: {
            label: periodsById.long.label,
            overall: overallLabels[answers.overall[category.id].long ?? 3],
            questions: category.questions.long.map((question) => ({
              id: question.id,
              question: question.question,
              answer: answers[question.id]
            }))
          }
        }
      }))
    }
  }
}
</script>

<style scoped>
@media print {
  .pagebreak {
    page-break-before: always;
  }
}
.bordered {
  border: 1px solid black;
}
.table {
  border-collapse: collapse;
}
</style>
