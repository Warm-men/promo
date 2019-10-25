import app from './app_actions'
import customer from './customer_actions'
import promoCode from './promo_code_actions'
import subscriptionTypes from './subscription_types_actions'
import currentCustomer from './current_customer'
import sesameCredit from './sesamecredit_actions'
import tips from './tips_actions'
import * as operation from './operation'
import quiz from './quiz'
//h5
import browserCustomer from './h5/customer'
import KolActivity from './kol_activity_action'

const Actions = {
  app,
  customer,
  promoCode,
  subscriptionTypes,
  currentCustomer,
  sesameCredit,
  tips,
  browserCustomer,
  operation,
  KolActivity,
  quiz
}

export default Actions
