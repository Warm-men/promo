import { currentCustomer as currentCustomerQuery } from 'src/app/queries/queries.js'

const fetchMe = (success = () => {}, error = () => {}) => {
  return {
    type: 'API:FETCH:CURRENT:CUSTOMER',
    API: true,
    method: 'POST',
    url: '/api/query',
    success,
    error,
    data: {
      query: currentCustomerQuery
    }
  }
}

export default {
  fetchMe
}
