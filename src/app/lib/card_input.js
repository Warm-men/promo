import validator from 'card-validator'

/*
 * Takes the card number without any spaces and adds spaces for display
 * Default: '411111111' => '4111 1111 1'
 * Amex:    '378282246' => '3782 82246 '
 * Trims the input at the end so the user can hit backspace
 */
const numberToDisplay = full_number => {
  const guessedCard = validator.number(full_number).card

  if (guessedCard && guessedCard.isAmex) {
    return full_number
      .replace(/(.{4})(.{6})?(.{5})?/g, (match, p1, p2, p3) => {
        let result = `${p1} `
        if (p2) result += `${p2} `
        if (p3) result += `${p3} `
        return result
      })
      .trim()
  } else {
    return full_number.replace(/(.{4})/g, '$1 ').trim()
  }
}

/*
 * Correct value to use for the maxLength attribute on an input field
 * inclusive of spaces. Use with numberToDisplay
 */
const maxLengthForDisplay = full_number => {
  const guessedCard = validator.number(full_number).card

  if (guessedCard && guessedCard.isAmex) {
    return 17
  } else {
    return 19
  }
}

/*
 * Given a card number, gives the maxLength to use for CVV
 */
const maxLengthForCvv = full_number => {
  const guessedCard = validator.number(full_number).card

  if (guessedCard && guessedCard.isAmex) {
    return 4
  } else {
    return 3
  }
}

/*
 * Removes spaces from number for submitting to server
 */
const numberToSubmit = full_number => full_number.replace(/\W/g, '')

/*
 * Returns 'valid' or 'invalid' or ''. Only for display purposes
 */
const classNameForDisplay = (input, showSuccess = false) => {
  const fullNumber = numberToSubmit(input)
  if (fullNumber.length > 0) {
    const valid = validator.number(fullNumber).isValid
    if (!valid) return 'invalid'
    if (showSuccess) return 'valid'
  }
  return ''
}

/*
 * Given the new value and the old value, format the expiration date by adding a slash
 */
const expirationToSubmit = (expiration, oldExpiration) => {
  const isDeleting = expiration.length < oldExpiration.length

  if (!isDeleting && expiration.length === 2) {
    expiration = `${expiration}/`
  }

  if (!isDeleting && oldExpiration.length === 2) {
    expiration = `/${expiration}`
  }

  return expiration.slice(0, 5)
}

/*
 * Given the new value and the old value, format the telephone by adding dashes
 */
const telephoneToSubmit = (telephone, oldTelephone) => {
  const isDeleting = telephone.length < oldTelephone.length

  if (!isDeleting && (telephone.length === 3 || telephone.length === 8)) {
    telephone += '-'
  }

  return telephone.slice(0, 13)
}

/*
 * Given a card number, gives the correct icon name corresponding to image
 */
const iconNameForDisplay = full_number => {
  const card = validator.number(full_number).card || { type: undefined }

  switch (card.type) {
    case 'american-express':
      return 'amex'
    case 'discover':
      return 'discover'
    case 'master-card':
      return 'mastercard'
    case 'visa':
      return 'visa'
    default:
      return 'default'
  }
}

export {
  numberToDisplay,
  maxLengthForDisplay,
  maxLengthForCvv,
  numberToSubmit,
  classNameForDisplay,
  expirationToSubmit,
  telephoneToSubmit,
  iconNameForDisplay
}
