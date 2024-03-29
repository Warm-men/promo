const currentCustomer = `
query FetchCurrentCustomer{
  me {
    avatar_url
    id
    first_name
    last_name
    nickname
    activities
    is_reminded_with_size_filter
    products_size_filter
    finished_onboarding_questions
    jd_credit_score {
      score
      id
      credit_rank
      name
    }
    referral_banner {
      lock_banner_url
      lock_banner_image
      referral_program_jump_url
      referral_program_banner_url
      referred_program_entry_banner_url
    }
    valid_coupons{
      coupon_id
      customer_coupon_id
      expired_at
      rules
      status
      sub_title
      title
      type
      valid_days
    }
    expired_coupons{
      coupon_id
      customer_coupon_id
      expired_at
      rules
      status
      sub_title
      title
      type
      valid_days
    }
    used_coupons{
      coupon_id
      customer_coupon_id
      expired_at
      rules
      status
      sub_title
      title
      type
      valid_days
    }
    can_view_newest_products
    enable_payment_contract {
      id
      can_disable
    }
    available_purchase_credit {
      amount
      cents
      currency
      formatted
    }
    time_cash_transactions{
      amount
      created_at
      id
      income
      transaction_type
      updated_at
    }
    spent_purchase_credit {
      amount
      cents
      currency
      formatted
    }
    expired_purchase_credit {
      amount
      cents
      currency
      formatted
    }
    referrals {
      avatar_url
      first_name
      last_name
      nickname
      status
      friend_registered_at
      friend_subscription_started_on
      redeemed_at
    }
    referral_url
    expired_promo_codes{
      admin_note
      code
      description
      discount_amount
      expiration_date
      explainer
      is_referral
      status
      rules
      title
      tote_purchase_credit
      type
      condition_display
      mini_purchase_amount
    }
    used_promo_codes{
      admin_note
      code
      description
      discount_amount
      expiration_date
      explainer
      is_referral
      status
      rules
      title
      tote_purchase_credit
      type
      condition_display
      mini_purchase_amount
    }
    valid_promo_codes{
      admin_note
      code
      description
      discount_amount
      expiration_date
      explainer
      is_referral
      status
      rules
      title
      tote_purchase_credit
      type
      condition_display
      mini_purchase_amount
      subscription_type_ids
    }
    payment_methods {
      id
      payment_gateway
    }
    credit_scores {
      id
      telephone
      score
    }
    closet(filters:{per_page:2000}){
      id
    }
    shipping_address{
      address_1
      address_2
      city
      company
      country
      customer_id
      district
      full_name
      id
      state
      telephone
      verified
      zip_code
    }
    email
    telephone
    attribute_preferences{
      name
    }
    style {
      constellation
      age_range
      bust_size_number
      shoulder_size
      arm_focus
      back_focus
      birthday
      bra_size
      brand
      celebrity
      cleavage_focus
      created_at
      cup_size
      customer_comment
      customer_id
      designer
      dress_size
      earring
      from
      height_inches
      hip_size
      hip_size_inches
      id
      inseam
      instagram_url
      jean_size
      large_prints_focus
      leg_focus
      maternity_due_date
      mom
      marital_status
      occupation
      pant_size
      pinterest_url
      product_filters_complete
      shape
      shoulder_focus
      skirt_size
      small_prints_focus
      social_focus
      thigh_size
      top_fit
      top_size
      tummy_focus
      updated_at
      waist_size
      weekend_focus
      weight
      work
      work_focus
      workwear
      occupation
      marital_status
    }
    customer_product_filters{
      accessory_categories
      accessory_colors
      clothing_categories
      clothing_colors
      prints
    }
    subscription {
      id
      on_hold
      promo_code
      hold_date
      status
      billing_date
      current_subscription_type_name
      display_interval
      display_name
      billing_date_extending
      fast_shipping{
        fast_shipping
        reminded
      }
      contract_display{
        menu_display
        order_display
        tote_display
      }
      summer_plan
      next_tote_status {
          message
          code
          final_code
          can_create_tote
       }
      subscription_type {
        clothing_count
        accessory_count
        occasion
        days_interval
        banner_url
        sub_display_name
        operation_plan{
          id
          name
          slug
          image_url
          banner_url
        }
        available_promo_codes {
          code
          description
          discount_amount
          expiration_date
          status
          title
          rules
          type
          condition_display
          discount_percent
        }
        annual_subscription_type {
          id
          base_price
          original_price
          display_name
          interval
          internal_name
          sub_display_name
          clothing_count
          accessory_count
          banner_url
          available_promo_codes {
            code
            description
            discount_amount
            expiration_date
            status
            title
            rules
            type
            condition_display
            discount_percent
          }
          preview {
            cash_price
            final_price
            name
            expiration_date
            promo_code_price
          }
          operation_plan{
            id
            name
            slug
            image_url
            banner_url
            icon_url
          }
        }
        base_price
        original_price
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
        operation_plan{
          id
          name
          slug
          image_url
          banner_url
          icon_url
        }
        quarterly_subscription_type {
          id
          interval
          base_price
          original_price
          internal_name
          display_name
          sub_display_name
          clothing_count
          accessory_count
          banner_url
          available_promo_codes {
            code
            description
            discount_amount
            expiration_date
            status
            title
            rules
            type
            condition_display
            discount_percent
          }
          preview {
            cash_price
            final_price
            name
            expiration_date
            promo_code_price
          }
          operation_plan{
            id
            name
            slug
            image_url
            banner_url
            icon_url
          }
        }
        monthly_subscription_type{
          id
          interval
          base_price
          original_price
          internal_name
          display_name
          sub_display_name
          clothing_count
          accessory_count
          banner_url
          available_promo_codes {
            code
            description
            discount_amount
            expiration_date
            status
            title
            rules
            type
            condition_display
            discount_percent
          }
          preview {
            cash_price
            final_price
            name
            expiration_date
            promo_code_price
          }
          operation_plan{
            id
            name
            slug
            image_url
            banner_url
            icon_url
          }
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

export { currentCustomer }
