// this is overridden by preloaded state, beware
const initialState = {
  subscription: { isSubmitting: false },
  customer: {
    isSubmitting: false,
    selectInterest: false
  },
  minimalHeader: false,
  message: undefined,
  saleActive: false,
  platform: 'mobile_web',
  isWechat: /MicroMessenger/i.test(navigator.userAgent)
}

function reducer(state = initialState, action) {
  switch (action.type) {
    case 'APP:SET_SELECT_INTEREST':
      return { ...state, customer: { selectInterest: true } }
    case 'API:CUSTOMER:SAVE:STARTED':
      return { ...state, customer: { isSubmitting: true } }
    case 'API:CUSTOMER:SAVE:COMPLETE':
      return { ...state, customer: { isSubmitting: false } }
    case 'API:SUBSCRIPTION:HOLD:STARTED':
    case 'API:SUBSCRIPTION:CANCEL:STARTED':
    case 'API:SUBSCRIPTION:UPDATE:STARTED':
      return { ...state, subscription: { isSubmitting: true } }
    case 'API:SUBSCRIPTION:HOLD:COMPLETE':
    case 'API:SUBSCRIPTION:CANCEL:COMPLETE':
    case 'API:SUBSCRIPTION:UPDATE:COMPLETE':
      return { ...state, subscription: { isSubmitting: false } }
    case 'APP:SET_MESSAGE':
      return { ...state, message: action.message }
    case 'APP:CLEAR_MESSAGE':
      return { ...state, message: undefined }
    case 'APP:MINIMAL_HEADER:TOGGLE':
      return { ...state, minimalHeader: !state.minimalHeader }
    case 'APP:MINIMAL_HEADER:OFF':
      return { ...state, minimalHeader: false }
    case 'APP:MINIMAL_HEADER:ON':
      return { ...state, minimalHeader: true }
    default:
      return state
  }
}

export default reducer
