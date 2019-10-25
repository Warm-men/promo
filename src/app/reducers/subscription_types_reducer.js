const initialState = []

function reducer(state = initialState, action) {
  switch (action.type) {
    case 'API:SUBSCRIPTION_TYPES:FETCH:SUCCESS':
      return setPlans(state, action)
    default:
      return state
  }
}

function setPlans(state, action) {
  let plans = action.response.data.subscription_types || action.resp
  return [...plans]
}

export default reducer
