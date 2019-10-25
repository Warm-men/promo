const initialState = {
  arm_focus: null,
  back_focus: null,
  bra_size: null,
  cleavage_focus: null,
  cup_size: null,
  dress_size: null,
  height_inches: null,
  hip_size_inches: null,
  inseam: null,
  instagram_url: null,
  jean_size: null,
  leg_focus: null,
  pant_size: null,
  pinterest_url: null,
  maternity_interest: false,
  shoulder_focus: null,
  skirt_size: null,
  social_focus: null,
  style_types: [],
  top_size: null,
  top_fit: null,
  tummy_focus: null,
  waist_size: null,
  weekend_focus: null,
  weight: null,
  work_focus: null,
  workwear: null,
  customer_color_shade_preferences: {
    neutral: null,
    warm: null,
    cool: null,
    pastel: null,
    bright: null
  },
  print_size: {
    small: null,
    large: null
  },
  customer_color_family_preferences: {
    black: null,
    gray: null,
    white: null,
    cream: null,
    brown: null,
    yellow: null,
    orange: null,
    red: null,
    pink: null,
    purple: null,
    blue: null,
    green: null
  },
  tops: {
    denim: false,
    trench: false,
    bomber: false,
    car_coats: false,
    jacket: false,
    cape: false
    // ruffles: false,
    // tanks: false,
    // offTheShoulder: false,
    // flowy: false,
    // tunics: false,
    // sweatshirts: false,
    // collaredShirts: false,
    // boho: false
  },
  sweaters: {
    drapeFront: false,
    dusters: false,
    oversized: false,
    ponchos: false,
    turtlenecks: false,
    cardigans: false,
    coldShoulder: false,
    graphic: false
  },
  jackets: {
    fauxLeather: false,
    bombers: false,
    blazers: false,
    carCoats: false,
    vests: false,
    jacketCropped: false,
    denim: false,
    trenchCoats: false
  },
  pants: {
    leggings: false,
    jean: false,
    trousers: false,
    jumpsuits: false
    // skinnyJeans: false,
    // joggers: false,
    // wideLeg: false,
    // pantCropped: false,
    // boyfriendJeans: false,
  },
  skirts: {
    pencil: false,
    circle: false,
    mini: false,
    midi: false,
    maxi: false,
    wrap: false,
    aLine: false,
    yoke: false
  },
  dresses: {
    maxi: false,
    fit_and_flare: false,
    sheath: false,
    shift: false
    // fitAndFlare: false,
    // bodycon: false,
    // maxiDresses: false,
    // elasticWaist: false
  },
  accessories: {
    everyday: false,
    statement: false
  },
  customer_attribute_preferences: [],
  WAIST_SIZES: [],
  INSEAM_SIZES: [],
  JEAN_SIZES: [],
  BRA_SIZES: [],
  CUP_SIZES: [],
  SKIRT_SIZES: [],
  DRESS_SIZES: [],
  PANT_SIZES: [],
  HIP_SIZES: [],
  TOP_SIZES: [],
  TOP_SIZES_ABBR: []
}

const validKeys = Object.keys(initialState)

function reducer(state = initialState, action) {
  const { data, response } = action
  switch (action.type) {
    case 'CUSTOMER_STYLE_INFO:ADD':
      return addStyleType(state, data.styleType)
    case 'CUSTOMER_STYLE_INFO:SET':
      return setCustomerStyleInfo(state, data)
    case 'CUSTOMER_STYLE_INTEREST:SET':
      return setCustomerStyleInterest(state, data)
    case 'CUSTOMER_ATTRIBUTE_PREFERENCES:SET':
      return setCustomerAttributePreferences(state, data)
    case 'API:CUSTOMER_STYLE_INFO:SUCCESS':
      return { ...state, ...action.response.data.style }
    case 'API:ONBOARDING:SUBMIT_PARTIAL_STYLE:SUCCESS':
      return { ...state, ...response.data.UpdateStyle.style }
    default:
      // sets initialState when state already initialized by store
      return { ...initialState, ...state }
  }
}

function addStyleType(state, styleType) {
  if (!styleType || _.includes(state.style_types, styleType)) return state

  return _.extend({}, state, {
    style_types: [...state.style_types, styleType]
  })
}

function setCustomerStyleInfo(state, data) {
  data = _.pickBy(data, (val, key) => {
    return (
      _.includes(validKeys, key) &&
      (val || val === false || val === 0 || val === null || val === '')
    )
  })
  return _.extend({}, state, data)
}

function setCustomerStyleInterest(state, data) {
  return {
    ...state,
    tops: { ...state.tops, ...data.tops },
    sweaters: { ...state.sweaters, ...data.sweaters },
    dresses: { ...state.dresses, ...data.dresses },
    jackets: { ...state.jackets, ...data.jackets },
    pants: { ...state.pants, ...data.pants },
    accessories: { ...state.accessories, ...data.accessories },
    skirts: { ...state.skirts, ...data.skirts }
  }
}

function setCustomerAttributePreferences(state, data) {
  let preferences
  if (state.customer_attribute_preferences.includes(data)) {
    preferences = state.customer_attribute_preferences.filter(
      style => style !== data
    )
  } else {
    preferences = state.customer_attribute_preferences.concat(data)
  }
  return {
    ...state,
    customer_attribute_preferences: preferences
  }
}

export default reducer
