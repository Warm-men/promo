import { savePromoCodeToWallet } from 'src/app/queries/queries'

const getActivityConfig = (url, success, error) => ({
  type: 'API:Activity:Config',
  API: true,
  method: 'GET',
  url,
  success,
  error
})

const getPromoCodeToWallet = (input, success, error) => ({
  type: 'API:Activity:Save',
  API: true,
  url: '/api/query',
  method: 'POST',
  success,
  error,
  data: {
    query: savePromoCodeToWallet,
    variables: {
      input
    }
  }
})

export default {
  getActivityConfig,
  getPromoCodeToWallet
}
