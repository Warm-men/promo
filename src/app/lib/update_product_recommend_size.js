const updateProductRecommandSize = (state, action) => {
  let products = state.products
  const product_id = action.data.variables.product_id,
    recommand_size =
      action.response.data &&
      action.response.data.realtime_product_recommended_size &&
      action.response.data.realtime_product_recommended_size.name

  if (products[product_id]) {
    products[product_id].recommended_size = recommand_size

    products[product_id].product_sizes.forEach((item, index) => {
      if (item.size.name === recommand_size) {
        products[product_id].product_sizes[index].recommended = true
      } else {
        products[product_id].product_sizes[index].recommended = false
      }
    })
    return {
      ...state,
      products: { ...products, ..._.pick(products, [product_id]) }
    }
  }
  return { ...state, products }
}

export default updateProductRecommandSize
