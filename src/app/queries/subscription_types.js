export default `
query WebSubscriptionTypes($filter: SubscriptionTypesFilter!, $promo_code: String!) {
  subscription_types(filter: $filter) {
    accessory_count
    annual_subscription_type {
      id
      base_price
      display_name
      interval
    }
    base_price
    clothing_count
    display_name
    id
    internal_name
    interval
    is_adminable
    is_maternity
    is_signupable
    is_switchable
    notes
    quarterly_subscription_type {
      id
    }
    preview(promo_code: $promo_code) {
      cash_price
      final_price
      name
      expiration_date
      promo_code_price
    }
  }
}
`
