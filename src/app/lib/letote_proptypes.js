import PropTypes from 'prop-types'

const LTPropTypes = {}
LTPropTypes.OccasionFocus = PropTypes.oneOf([
  'rarely',
  'sometimes',
  'often',
  -1,
  0,
  1
])

LTPropTypes.CustomerStyleInfo = PropTypes.shape({
  maternity_interest: PropTypes.bool,
  work_focus: LTPropTypes.OccasionFocus,
  weekend_focus: LTPropTypes.OccasionFocus,
  social_focus: LTPropTypes.OccasionFocus,
  WAIST_SIZES: PropTypes.arrayOf(PropTypes.number),
  HIP_SIZES: PropTypes.arrayOf(PropTypes.number),
  INSEAM_SIZES: PropTypes.arrayOf(PropTypes.number)
})

LTPropTypes.Customer = PropTypes.shape({
  selectInterest: PropTypes.bool
})

export { LTPropTypes, PropTypes }

export default LTPropTypes
