let _global = undefined

if (typeof global !== 'undefined') _global = global
if (typeof window !== 'undefined') _global = window

if (!Date.now) {
  Date.now = function now() {
    return new Date().getTime()
  }
}

_global.__webpack_public_path__ = '/promo'
// process.env.NODE_ENV === 'production'
//   ? process.env.PUBLIC_URL || 'https://static.letote.cn'
//   : '/'

_global.ENV = 'development'

// NOTE：Default App Download Link
_global.AppDownloadLink =
  'http://a.app.qq.com/o/simple.jsp?pkgname=com.letotecn'

_global.LeToteExperiments = {
  newOnboardingBundle: false,
  enableZhiMaCredit: false,
  enableNewYearActivity: true
}

_global.analytics = {
  track: function(category, opt_label, action = null) {
    window._hmt &&
      window._hmt.push([
        '_trackEvent',
        category,
        action || category,
        JSON.stringify(opt_label)
      ])
  },
  trackLink: function(link, describe, object) {}
}

//questionnaire address
_global.questionnaireAddress = {
  dev: 'https://jinshuju.net/f/ZVI4OK',
  staging: 'https://jinshuju.net/f/M4zDYo',
  prod: 'https://jinshuju.net/f/un5pmz'
}

if (!window.requestAnimationFrame) {
  _global.requestAnimationFrame = function(fn) {
    setTimeout(fn, 17)
  }
}

export default _global
