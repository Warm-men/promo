const initialState = {
  id: null,
  email: '',
  password: '',
  isSubmitting: false,
  message: '',
  isSuccess: false,
  isLoaded: false,
  telephone: '',
  first_name: '',
  style: {},
  subscription: {},
  shipping_address: {},
  classifyPromoCode: {},
  isFreeUser: false,
  isFreeTote79: false,
  isSummerPlan: false
}

function reducer(state = initialState, action) {
  switch (action.type) {
    case 'API:SESSION:SUBMIT_EMAIL_AND_PASSWORD:SUCCESS':
      const customer =
        action.response.data.SignInCustomer ||
        action.response.data.CreateCustomer
      return {
        ...state,
        ...customer.customer,
        isLoaded: true
      }
    case 'APP:SET_SELECT_INTEREST':
      return {
        ...state,
        selectInterest: action.data
      }
    case 'API:PURCHASE_CHECKOUT:SUBMIT:SUCCESS':
      return setPaymentMethod(state, action)
    case 'API:SUBSCRIPTION:REACTIVATE:SUCCESS':
      return {
        ...state,
        subscription: action.response
      }
    case 'API:SUBSCRIPTION:RESUBSCRIBE:SUCCESS':
      return {
        ...state,
        subscription: action.response
      }
    case 'API:SUBSCRIPTION:HOLD:SUCCESS':
      return {
        ...state,
        subscription: action.response
      }
    case 'API:SUBSCRIPTION:CANCEL:SUCCESS':
      return {
        ...state,
        subscription: action.response
      }
    case 'API:SUBSCRIPTION:UPDATE:SUCCESS':
      return subscriptionUpdateSuccess(state, action)
    case 'API:SUBSCRIPTION_QUERY:SUCCESS':
      return querySubscription(state, action)
    case 'API:CUSTOMER:FETCH:SUCCESS':
      return {
        ...state,
        subscription: {
          ...state.subscription,
          ...action.response.subscription
        },
        isLoaded: true
      }
    case 'API:CUSTOMER:UPDATE:SUCCESS':
      return {
        ...state
      }
    case 'API:CUSTOMER:SAVE:SUCCESS':
      return {
        ...state,
        subscription: {
          ...state.subscription,
          ...action.response.subscription
        }
      }
    case 'CURRENT_CUSTOMER:SET':
      return {
        ...state,
        ...action.data
      }
    case 'API:CURRENT_CUSTOMER:SIGN_OUT:SUCCESS':
      return initialState
    case 'API:SUBSCRIPTION:CREATE:SUCCESS':
      return {
        ...state,
        message: action.response.message,
        isSubmitting: false,
        isSuccess: true,
        previousAction: 'create'
      }
    case 'API:SUBSCRIPTION:CREATE:ERROR':
      return {
        ...state,
        message: action.response.message,
        isSubmitting: false
      }
    case 'API:SUBSCRIPTION:QUERYCREATE:SUCCESS':
      const { data } = action.response
      return {
        ...state,
        ...data,
        message: action.response.message ? action.response.message[0] : '',
        isSubmitting: false,
        isSuccess: true,
        previousAction: 'create'
      }
    case 'API:SUBSCRIPTION:QUERYCREATE:ERROR':
      return {
        ...state,
        message: action.response.errors[0],
        isSubmitting: false
      }
    case 'API:SUBSCRIPTION:CREATE:STARTED':
      return {
        ...state,
        isSubmitting: true
      }
    case 'API:FETCH:CURRENT:CUSTOMER:STARTED':
      return {
        ...state,
        isSubmitting: true
      }
    case 'API:FETCH:CURRENT:CUSTOMER:ERROR':
      return {
        ...state,
        message: action.response.message,
        isSubmitting: false
      }
    case 'API:FETCH:CURRENT:CUSTOMER:SUCCESS':
      return setCurrentCustomer(state, action)
    case 'API:FETCH:USER:LINKED:SERVICE:SUCCESS':
      return {
        ...state,
        linked_service: {
          ...action.response.data.linked_service
        }
      }
    case 'API:WAITING_LIST:ADD:SUCCESS':
      return {
        ...state,
        ...action.response.data.AddToWaitingList
      }
    case 'API:ONBOARDING:SUBMIT_PARTIAL_STYLE:SUCCESS':
      return {
        ...state,
        style: {
          ...state.style,
          ...action.response.data.UpdateStyle.style
        },
        subscription: {
          ...state.subscription,
          ...action.response.data.UpdateStyle.style.subscription
        }
      }
    case 'API:SHIPPING:ADDRESS:UPDATE:SUCCESS':
      return {
        ...state,
        shipping_address: {
          ...state.shipping_address,
          ...action.response.data.UpdateShippingAddress.shipping_address
        }
      }
    case 'GET:SYLTE:PROFILE:INFO:SUCCESS':
      return {
        ...state,
        style: {
          ...state.style,
          ...action.response.style
        }
      }
    case 'API:BROWSER:SIGN:UP:SUCCESS':
      return {
        ...state,
        ...action.response
      }
    case 'API:ADD:TO:CUSTOMER:OPERATION:PLAN:SUCCESS':
      return {
        ...state,
        ...action.response.data.AddToCustomerOperationPlan
          .customer_operation_plan.customer
      }
    default:
      return state
  }
}

function setCurrentCustomer(state, action) {
  if (!action.response || !action.response.data.me) {
    return initialState
  }
  const data = action.response.data
  return {
    ...state,
    isFreeUser:
      data.me.subscription &&
      data.me.subscription.promo_code &&
      data.me.subscription.promo_code.toLowerCase() === 'ltcn_free_tote',
    isFreeTote79:
      data.me.subscription &&
      data.me.subscription.promo_code &&
      data.me.subscription.promo_code.toLowerCase() === 'ltcn_free_tote_79',
    ...data.me,
    isSummerPlan: _.includes(data.me.activities, 'summer_plan')
  }
}

function setPaymentMethod(state, action) {
  return {
    ...state,
    address: action.response.data.UpdateShippingAddress.shipping_address,
    payment_method: action.response.data.CreatePaymentMethod.payment_method
  }
}

function subscriptionUpdateSuccess(state, action) {
  const subscription = action.response || action.resp
  return {
    ...state,
    subscription,
    style: {
      ...state.style,
      ...action.data.style
    }
  }
}

function querySubscription(state, action) {
  const { me } = action.response.data
  return {
    ...state,
    subscription: {
      ...state.subscription,
      ...me.subscription
    }
  }
}

export default reducer
