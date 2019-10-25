// QUERIES
import fetchWeatherConditions from 'src/app/queries/fetch_weather_conditions_query'
import subscriptionPreview from 'src/app/queries/subscription_preview'
import subscriptionType from 'src/app/queries/subscription_type'
import subscriptionTypes from 'src/app/queries/subscription_types'
import subscriptionQuery from './subscription_query'

// MUTATIONS
import {
  applyTryOnPromoCode,
  applyRentalPromoCode
} from 'src/app/queries/apply_promo_code'
import createCustomerAttributePreferences from 'src/app/queries/create_customer_attribute_preferences'
import createInstantTransaction from 'src/app/queries/create_instant_transaction'
import sendRentalReferralInvitation from 'src/app/queries/send_rental_referral_invitation'
import signIn from 'src/app/queries/sign_in'
import updateCustomer from 'src/app/queries/update_customer'
import { currentCustomer } from './current_customer'
import sesameCredit from './sesameCredit'
import createSubscription from './create_subscription'
import savePromoCodeToWallet from './save_promo_code_wallet'
import saveReferralCode from './save_referral_code'
import * as operation from './operation'
import quizQueries from './get_qiuz_data'
import submitQuizResult from './submit_quiz_result'

export {
  applyRentalPromoCode,
  applyTryOnPromoCode,
  createCustomerAttributePreferences,
  createInstantTransaction,
  fetchWeatherConditions,
  sendRentalReferralInvitation,
  signIn,
  subscriptionPreview,
  subscriptionType,
  updateCustomer,
  currentCustomer,
  sesameCredit,
  createSubscription,
  subscriptionQuery,
  savePromoCodeToWallet,
  subscriptionTypes,
  saveReferralCode,
  operation,
  quizQueries,
  submitQuizResult
}
