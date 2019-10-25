import { quizQueries, submitQuizResult } from 'src/app/queries/queries'

const getQuizData = (slug, success, error) => ({
  type: 'API:Quiz:GET',
  API: true,
  url: '/api/query',
  method: 'POST',
  success,
  error,
  data: {
    query: quizQueries,
    variables: {
      slug
    }
  }
})

const confirmQuestionResult = (input, success, error) => ({
  type: 'API:Quiz:CONFIRMQUESTIONRESULT',
  API: true,
  url: '/api/query',
  method: 'POST',
  success,
  error,
  data: {
    query: submitQuizResult,
    variables: {
      input
    }
  }
})

export default {
  getQuizData,
  confirmQuestionResult
}
