import { updateCustomer } from 'src/app/queries/queries.js'

// FIXME：测试清理Cookie，退出登录,后面需要清理
const gqsignout = (input, success) => {
  return {
    type: 'API:CURRENT_CUSTOMER:SIGN_OUT',
    API: true,
    method: 'POST',
    url: '/api/query',
    data: {
      query: `
        mutation WebSignOut($input: SignOutCustomerInput!) {
          SignOutCustomer(input: $input) {
            clientMutationId
          }
        }
      `,
      variables: {
        input
      }
    },
    success
  }
}

const update = (customer, success, error) => {
  return {
    type: 'API:CUSTOMER:UPDATE',
    API: true,
    method: 'POST',
    url: '/api/query',
    data: {
      query: updateCustomer,
      variables: {
        customer
      }
    },
    success,
    error
  }
}

export default {
  gqsignout,
  update
}
