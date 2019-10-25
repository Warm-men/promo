import dateFns from 'date-fns'

export const format = (time, type = 'YYYY-MM-DD') => dateFns.format(time, type)

export const distance_hold_days = time => {
  const hold_time = format(time),
    current_time = format(new Date()),
    differenceInDays = dateFns.differenceInDays(current_time, hold_time)
  return differenceInDays > 0 ? differenceInDays : -differenceInDays
}

export const newMembershipDays = time => {
  const vipTime = format(time, 'YYYY-MM-DD')
  const currentTime = format(new Date(), 'YYYY-MM-DD')
  return dateFns.differenceInDays(vipTime, currentTime) > 0
    ? dateFns.differenceInDays(vipTime, currentTime)
    : 0
}
