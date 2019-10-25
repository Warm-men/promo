export default `
  query WebSubscriptionType(
    $id: ID!,
  ) {
    subscription_type(
      id: $id,
    ) {
      id
      accessory_count
      clothing_count
      is_maternity
      quarterly_subscription_type {
        id
        base_price
        display_name
        interval
      }
      preview {
        cash_price
        final_price
        name
        expiration_date
        promo_code_price
      }
    }
  }
`
