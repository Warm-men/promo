export default `
  mutation SubmitQuizResult($input: SubmitQuizResultInput!) {
    SubmitQuizResult(input: $input) {
      success
    }
  }
`
