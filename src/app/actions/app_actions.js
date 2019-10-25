const setMessage = (message, timeout) => {
  return (dispatch, data) => {
    switch (message.type) {
      case 'SUCCESS':
        message = {
          title: message.title || 'Success',
          text: message.text || 'Success! Updated your information.'
        }
        break
      case 'ERROR':
        message = {
          title: message.title || 'Error',
          text: message.text || data.message || 'Oops! Something went wrong.'
        }
        break
      default:
        return (message = {
          title: message.title || 'Error',
          text: message.text || data.message || 'Oops! Something went wrong.'
        })
    }

    dispatch({
      type: 'APP:SET_MESSAGE',
      message
    })

    if (timeout) {
      setTimeout(() => dispatch(clearMessage()), timeout)
    }
  }
}

const clearMessage = () => {
  return {
    type: 'APP:CLEAR_MESSAGE'
  }
}

const turnOnMinimalHeader = () => {
  return {
    type: 'APP:MINIMAL_HEADER:ON'
  }
}

const turnOffMinimalHeader = () => {
  return {
    type: 'APP:MINIMAL_HEADER:OFF'
  }
}

const toggleMinimalHeader = () => {
  return {
    type: 'APP:MINIMAL_HEADER:TOGGLE'
  }
}

const setSelectInterest = selectInterest => {
  return {
    type: 'APP:SET_SELECT_INTEREST',
    data: selectInterest
  }
}

export default {
  setMessage,
  setSelectInterest,
  clearMessage,
  toggleMinimalHeader,
  turnOffMinimalHeader,
  turnOnMinimalHeader
}
