export default function(amt, showZeroCents = false) {
  return i18nCurrency(amt, 'en-US', 'USD', showZeroCents)
}

export const i18nCurrency = (amt, locale, currency, showZeroCents = false) => {
  amt = amt === null || amt === undefined ? 0 : amt
  const onlyZeroes = parseFloat(amt) === parseInt(amt, 10)
  const fractionalDigits = onlyZeroes && !showZeroCents ? 0 : 2
  const opts = {
    style: 'currency',
    currency: currency,
    minimumFractionDigits: fractionalDigits,
    maximumFractionDigits: 2
  }

  return amt.toLocaleString(locale, opts)
}
