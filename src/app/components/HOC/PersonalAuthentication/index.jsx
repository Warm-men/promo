import RequireMobile from './check_mobile'
import ZhiMaCredit from './zhima_credit'

//NOTE: AB Test
export default (window.USE_CREDIT_OR_MOBILE ? ZhiMaCredit : RequireMobile)
