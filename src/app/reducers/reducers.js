import app from './app_reducer'
import customer from './customer_reducer'
import customerStyleInfo from './customer_style_info_reducer'
import promoCode from './promo_code_reducer'
import subscriptionTypes from './subscription_types_reducer'
import tips from './tips_reducer'
import orders from './orders_reducer'
import PersistReducers from 'src/app/lib/persist_reducer'
import operation from './operation_reducer'

/**
 * persist black list options
 */
const CUSTOMER = ['closet', 'password', 'classifyPromoCode', 'shipping_address']

export default {
  app,
  customer: PersistReducers({
    key: 'customer',
    name: customer,
    blacklist: CUSTOMER
  }),
  customerStyleInfo,
  promoCode,
  subscriptionTypes,
  tips,
  orders,
  operation: PersistReducers({
    key: 'operation',
    name: operation,
    storageType: 'session'
  })
}
