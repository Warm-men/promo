export default `
  query WebFetchWeatherConditions($zip_code: String!) {
    weather_conditions(zip_code: $zip_code) {
     location
     conditions
    }
  }
`
