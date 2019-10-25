export default `
query FetchSubscription{
    me {
        subscription {
            id
            on_hold
            hold_date
            promo_code
            status
            billing_date
            next_tote_status {
                message
                code
                final_code
                can_create_tote
            }
            subscription_type {
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
                preview {
                    cash_price
                    final_price
                    name
                    expiration_date
                    promo_code_price
                }
            }
        }
    }
}
`
