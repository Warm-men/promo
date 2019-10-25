import {
  applyTryOnPromoCode as applyTryOnPromoCodeQuery,
  applyRentalPromoCode as applyRentalPromoCodeQuery,
  savePromoCodeToWallet
} from 'src/app/queries/queries'

const applyTryOn = code => ({
  type: 'API:PROMO_CODE:APPLY',
  API: true,
  url: '/api/query',
  method: 'POST',
  data: {
    query: applyTryOnPromoCodeQuery,
    variables: {
      input: {
        code
      }
    }
  }
})

const getPromoCodeToWallet = ({ promo_code, success, error }) => ({
  type: 'API:GET:PROMO:CODE:TO:WALLET',
  API: true,
  url: '/api/query',
  method: 'POST',
  success,
  error,
  data: {
    query: savePromoCodeToWallet,
    variables: {
      input: {
        promo_code
      }
    }
  }
})

const applyRental = (code, subscriptionTypeId, success) => ({
  type: 'API:PROMO_CODE:APPLY',
  API: true,
  url: '/api/query',
  method: 'POST',
  success,
  data: {
    query: applyRentalPromoCodeQuery,
    variables: {
      input: {
        code,
        subscription_type_id: subscriptionTypeId,
        insurance: false
      }
    }
  }
})

const set = code => ({
  type: 'PROMO_CODE:SET',
  code
})

const reset = () => ({
  type: 'PROMO_CODE:RESET'
})

const expandInput = () => ({
  type: 'PROMO_CODE:INPUT:EXPAND'
})

export default {
  applyTryOn,
  getPromoCodeToWallet,
  applyRental,
  expandInput,
  set,
  reset
}
