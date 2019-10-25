const changeTips = data => {
  return dispatch => {
    dispatch({
      data: data || null,
      type: 'TIPS:CHANGETIP'
    })
  }
}

export default {
  changeTips
}
