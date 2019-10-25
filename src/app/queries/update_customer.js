export default `
  mutation WebUpdateCustomer($customer: UpdateCustomerInput!) {
    UpdateCustomer(input: $customer) {
	    clientMutationId
      errors
    }
  }
`
