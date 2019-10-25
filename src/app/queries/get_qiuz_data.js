export default `
query Quiz($slug: String) {
  quiz(slug: $slug) {
    id
    slug
    title
    complete_hint
    submit_text
    questions {
      id
      content
      optional
      q_type
      options {
        content
        id
      }
    }
  }
}
`
