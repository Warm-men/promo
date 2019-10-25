import asyncComponent from './AsyncComponent'

export const AsyncKolContainer = asyncComponent(() =>
  import('src/app/containers/kol_activity/index.jsx')
)
export const AsyncSeventyNine = asyncComponent(() =>
  import('src/app/containers/seventy_nine/index.jsx')
)
export const AsyncVacation = asyncComponent(() =>
  import('src/app/containers/vacation/index.jsx')
)
export const AsyncSingleBtnPage = asyncComponent(() =>
  import('src/app/containers/single_btn_page/index.jsx')
)
export const AsyncJdEmail = asyncComponent(() =>
  import('src/app/containers/jd_email')
)
export const AsyncNewYearActivity = asyncComponent(() =>
  import('src/app/containers/newyear_activity/index.jsx')
)
export const AsyncCouponSuccess = asyncComponent(() =>
  import('src/app/containers/success/coupon/index.jsx')
)
export const AsyncCouponFail = asyncComponent(() =>
  import('src/app/containers/success/coupon/fail.jsx')
)
export const AsyncQuiz = asyncComponent(() =>
  import('src/app/containers/quiz/index.jsx')
)
export const AsyncVideoPages = asyncComponent(() =>
  import('src/app/containers/video_page/index.jsx')
)
export const AsyncVideoPagesTwoPlayer = asyncComponent(() =>
  import('src/app/containers/video_page_two_player/index.jsx')
)
export const AsyncAgreementPages = asyncComponent(() =>
  import('src/app/containers/agreement_pages')
)
