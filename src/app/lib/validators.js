import CardValidator from 'card-validator'

function isPresent(value) {
  return value.replace(/\W/g, '').length !== 0
}

function isValidAddress(value) {
  const regex = /\d+/
  return regex.test(value)
}

function isValidCardNumber(cardNumber) {
  return CardValidator.number(cardNumber).isValid
}

function isValidCvv(cvv) {
  return CardValidator.cvv(cvv, 3).isValid || CardValidator.cvv(cvv, 4).isValid
}

function isValidEmail(email) {
  const regex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  return regex.test(email)
}

function isValidExpirationDate(expirationDate) {
  return CardValidator.expirationDate(expirationDate).isValid
}

function isValidPassword(password) {
  return password.length > 7
}

function isValidStateAbbreviation(stateAbbreviation) {
  const regex = /^(?:A[KLRZ]|C[AOT]|D[CE]|FL|GA|HI|I[ADLN]|K[SY]|LA|M[ADEINOST]|N[CDEHJMVY]|O[HKR]|PA|RI|S[CD]|T[NX]|UT|V[AT]|W[AIVY])*$/
  return regex.test(stateAbbreviation)
}

function isValidZipcode(zipcode) {
  return zipcode.length === 5
}

function isValidTelephone(telephone) {
  return telephone.replace(/\D/g, '').length === 11
}

export {
  isPresent,
  isValidAddress,
  isValidCardNumber,
  isValidCvv,
  isValidEmail,
  isValidExpirationDate,
  isValidPassword,
  isValidStateAbbreviation,
  isValidTelephone,
  isValidZipcode
}
