const isValidUserName = name => {
  if (!name || typeof name !== 'string') {
    return false
  } else {
    if (
      name.match('先生') ||
      name.match('小姐') ||
      name.match('女士') ||
      name.match(/[A-Za-z0-9]/) ||
      name.length === 1
    ) {
      return false
    } else {
      return true
    }
  }
}

export default isValidUserName
