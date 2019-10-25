import dateFns from 'date-fns'

/**
 * 用户权限
 * @param {*obj} customer
 */
const authentication = customer => ({
  isValidSubscriber: isValidSubscriber(customer),
  isExpiredSubscriber: isExpiredSubscriber(customer),
  isSubscriber: isSubscriber(customer),
  expiresInDays: expiresInDays(customer)
})

/**
 * 订阅天数
 * @param {*obj} customer
 */
const differenceDays = customer => {
  const { subscription } = customer
  if (!subscription) return false
  const currentTime = dateFns.format(new Date(), 'YYYY-MM-DD')
  const subcriberTime = dateFns.format(subscription.billing_date, 'YYYY-MM-DD')
  return dateFns.differenceInDays(currentTime, subcriberTime)
}

/**
 * 是否订阅 true or false
 * @param {*obj} customer
 */
const isValidSubscriber = customer => {
  if (isSubscriber(customer)) {
    const { status } = customer.subscription
    return (
      status === 'trial' ||
      status === 'active' ||
      status === 'pending_hold' ||
      status === 'on_hold'
    )
  }
  return false
}

/**
 * 是否过期 true or false，status:trial, active, pending_hold, on_hold都是会员期内
 * @param {*obj} customer
 */
const isExpiredSubscriber = customer => {
  if (isSubscriber(customer)) {
    const { status } = customer.subscription
    if (
      status === 'trial' ||
      status === 'active' ||
      status === 'pending_hold' ||
      status === 'on_hold'
    ) {
      return false
    }
    return true
  } else {
    return false
  }
}

/**
 * 是否订阅
 * @param {*obj} customer
 */
const isSubscriber = customer =>
  customer.subscription && customer.subscription.id ? true : false

/**
 * 过期天数
 * @param {*obj} customer
 */
const expiresInDays = customer =>
  differenceDays(customer) > 0 ? differenceDays(customer) : -1

export default authentication
