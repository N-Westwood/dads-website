import data from '../assets/data.json'

export function getAnswers() {
  const rawSurveyAnswers = localStorage.getItem('answers')
  if (rawSurveyAnswers) return JSON.parse(rawSurveyAnswers)
  return migrateOldData() || getDefaultAnswers()
}

function getDefaultAnswers() {
  return {
    overall: Object.fromEntries(
      data.categories.map((category) => [
        category.id,
        Object.fromEntries(data.periods.map((period) => [period.id, 3]))
      ])
    )
  }
}

function migrateOldData() {
  const rawOldPreparednessData = localStorage.getItem('PreparednessData')
  const rawOldSurveyAnswers = localStorage.getItem('SurveyAnswers')
  if (!rawOldSurveyAnswers || !rawOldPreparednessData) return
  const surveyAnswers = JSON.parse(rawOldSurveyAnswers)
  const preparednessData = JSON.parse(rawOldPreparednessData)
  const questionIdsByQuestion = Object.fromEntries(
    data.categories.flatMap((category) =>
      Object.values(category.questions)
        .flat()
        .map((question) => [question.question, question.id])
    )
  )
  const answers = Object.fromEntries(
    Object.values(surveyAnswers)
      .flatMap((group) => Object.values(group).flat())
      .flatMap(([question, value]) => {
        const key = questionIdsByQuestion[question]
        return key ? [[key, value]] : []
      })
  )
  answers.overall = Object.fromEntries(
    data.categories.map((category) => {
      const preparednessLevel = preparednessData.children.find(
        (child) => child.name === category.id
      )
      return [
        category.id,
        Object.fromEntries(
          data.periods.map((period) => {
            if (!preparednessLevel) return [period.id, 3]
            let value = 3
            switch (period.id) {
              case 'short':
                value = preparednessLevel.prepared
                break
              case 'intermediate':
                value = preparednessLevel.children[0].prepared
                break
              case 'long':
                value = preparednessLevel.children[0].children[0].prepared
            }
            return [period.id, value]
          })
        )
      ]
    })
  )
  saveAnswers(answers)
  return answers
}

export function saveAnswers(answers) {
  localStorage.setItem('answers', JSON.stringify(answers))
}
