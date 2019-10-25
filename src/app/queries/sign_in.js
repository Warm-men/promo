export default `
  mutation SignIn($input: SignInCustomerInput!) {
    SignInCustomer(input: $input) {
      customer {
        id
        email
      }
    }
  }
`
