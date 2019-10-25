import { subscriptionTypes } from 'src/app/queries/queries.js'

const fetchSubscriptionTypes = (filter, promo_code = '', success, error) => {
  return {
    type: 'API:SUBSCRIPTION_TYPES:FETCH',
    API: true,
    method: 'POST',
    url: '/api/query',
    success,
    error,
    data: {
      query: subscriptionTypes,
      variables: {
        filter,
        promo_code
      }
    }
  }
}
const fetchAll = () => {
  return {
    type: 'API:SUBSCRIPTION_TYPES:FETCH',
    API: true,
    method: 'GET',
    url: '/api/subscription_types'
  }
}

export default {
  fetchAll,
  fetchSubscriptionTypes
}
