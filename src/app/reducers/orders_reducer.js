const initialState = {
  orders: [],
  loadedOrders: false
}

function reducer(state = initialState, action) {
  switch (action.type) {
    case 'API:PAYMENT:PENDING:ORDERS:SUCCESS':
      return getNeedPaymentProduct(state, action)
    case 'INITIAL:ORDERS:DATA':
      return {
        ...state,
        loadedOrders: false
      }
    default:
      return state
  }
}

const getNeedPaymentProduct = (state, action) => {
  const orders = action.response.data.orders
  let hadMakeAnAppointmentToReturn = []
  orders.forEach((item, index) => {
    const line_item = item.line_items,
      tote = item.tote
    let line_item_product_id = []
    //拿到line_item的product id, refunded === false need payment
    line_item.forEach(
      products =>
        !products.refunded && line_item_product_id.push(products.product.id)
    )
    //比较line_items和tote
    line_item_product_id.length !== 0 &&
      tote.tote_products
        .filter(
          products => line_item_product_id.indexOf(products.product.id) === -1
        )
        .map(filter_item => hadMakeAnAppointmentToReturn.push(filter_item))
    //插入当前obj
    orders[index].hadMakeAnAppointmentToReturn = hadMakeAnAppointmentToReturn
  })
  return {
    ...state,
    loadedOrders: true,
    orders: [...orders]
  }
}

export default reducer
